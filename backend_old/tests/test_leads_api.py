"""Backend tests for Add IT Solutions API."""
import os
import pytest
import requests

BASE_URL = os.environ.get("REACT_APP_BACKEND_URL", "https://transform-enterprise-2.preview.emergentagent.com").rstrip("/")
API = f"{BASE_URL}/api"


@pytest.fixture(scope="module")
def session():
    s = requests.Session()
    s.headers.update({"Content-Type": "application/json"})
    return s


# --- Service status ---
class TestServiceStatus:
    def test_root_ok(self, session):
        r = session.get(f"{API}/")
        assert r.status_code == 200
        data = r.json()
        assert data["status"] == "ok"
        assert data["service"] == "Add IT Solutions API"


# --- Options endpoint ---
class TestOptions:
    def test_options_structure(self, session):
        r = session.get(f"{API}/options")
        assert r.status_code == 200
        data = r.json()
        assert "requirement_types" in data
        assert "resource_types" in data
        assert len(data["requirement_types"]) == 7
        assert len(data["resource_types"]) == 7
        # each item has value+label
        for item in data["requirement_types"] + data["resource_types"]:
            assert "value" in item and "label" in item
        # dedicated_resources present
        values = [x["value"] for x in data["requirement_types"]]
        assert "dedicated_resources" in values


# --- Leads CRUD / validation ---
class TestLeadsCreate:
    def _valid_payload(self, **overrides):
        base = {
            "full_name": "TEST_John Doe",
            "company_name": "TEST_Acme Corp",
            "business_email": "test_john@example.com",
            "phone_number": "+1-555-1234",
            "requirement_type": "agile_transformation",
            "description": "We need a comprehensive agile transformation across multiple teams.",
        }
        base.update(overrides)
        return base

    def test_create_valid_non_resource(self, session):
        r = session.post(f"{API}/leads", json=self._valid_payload())
        assert r.status_code == 200, r.text
        data = r.json()
        assert "id" in data and isinstance(data["id"], str) and len(data["id"]) > 0
        assert "created_at" in data
        assert "delivery_status" in data
        ds = data["delivery_status"]
        assert ds["telegram"] == "skipped"
        assert ds["email"] == "skipped"
        assert ds["google_sheets"] == "skipped"

        # Verify persisted via GET
        list_r = session.get(f"{API}/leads")
        assert list_r.status_code == 200
        ids = [x["id"] for x in list_r.json()]
        assert data["id"] in ids

    def test_create_dedicated_resources_valid(self, session):
        payload = self._valid_payload(
            requirement_type="dedicated_resources",
            resource_type="scrum_master",
        )
        r = session.post(f"{API}/leads", json=payload)
        assert r.status_code == 200, r.text
        data = r.json()
        assert data["delivery_status"]["telegram"] == "skipped"

    def test_create_dedicated_resources_missing_resource(self, session):
        payload = self._valid_payload(requirement_type="dedicated_resources")
        r = session.post(f"{API}/leads", json=payload)
        assert r.status_code == 422

    def test_create_invalid_requirement_type(self, session):
        payload = self._valid_payload(requirement_type="bogus_type")
        r = session.post(f"{API}/leads", json=payload)
        assert r.status_code == 422

    def test_create_malformed_email(self, session):
        payload = self._valid_payload(business_email="not-an-email")
        r = session.post(f"{API}/leads", json=payload)
        assert r.status_code == 422

    def test_create_missing_required_fields(self, session):
        # missing description
        bad = {
            "full_name": "Jane",
            "company_name": "X",
            "business_email": "x@y.com",
            "phone_number": "12345",
            "requirement_type": "agile_transformation",
        }
        r = session.post(f"{API}/leads", json=bad)
        assert r.status_code == 422


class TestLeadsList:
    def test_list_excludes_mongo_id_and_sorted_desc(self, session):
        r = session.get(f"{API}/leads")
        assert r.status_code == 200
        rows = r.json()
        assert isinstance(rows, list)
        # _id must be excluded
        for row in rows:
            assert "_id" not in row
            assert "id" in row
            assert "created_at" in row
        # sorted descending by created_at
        if len(rows) >= 2:
            created = [row["created_at"] for row in rows]
            assert created == sorted(created, reverse=True)
