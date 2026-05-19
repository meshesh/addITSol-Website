import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
// import { useState } from "react";
import { toast } from "sonner";
import { ArrowRight, MessageCircle, Loader2 } from "lucide-react";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

// const API = `${process.env.REACT_APP_BACKEND_URL}/api`;
const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

const initialState = {
  full_name: "",
  company_name: "",
  business_email: "",
  phone_number: "",
  requirement_type: "",
  resource_type: "",
  description: "",
};

export default function ConsultationForm() {
  // const [opts, setOpts] = useState({
  //     requirement_types: [],
  //     resource_types: [],
  // });
  // const [form, setForm] = useState(initialState);
  // const [submitting, setSubmitting] = useState(false);

  // useEffect(() => {
  //     axios
  //         .get(`${API}/options`)
  //         .then((r) => setOpts(r.data))
  //         .catch(() => {
  //             /* fail silently — fallback hardcoded below */
  //         });
  // }, []);

  const requirementOptions = [
    {
      value: "agile_transformation",
      label: "Agile Transformation",
    },
    {
      value: "dedicated_resources",
      label: "Dedicated Resources",
    },
    {
      value: "pmo_consulting",
      label: "PMO Consulting",
    },
    {
      value: "project_delivery",
      label: "Project Delivery",
    },
    {
      value: "program_governance",
      label: "Program Governance",
    },
    {
      value: "delivery_assessment",
      label: "Delivery Assessment",
    },
    {
      value: "other",
      label: "Other",
    },
  ];

  const resourceOptions = [
    {
      value: "project_manager",
      label: "Project Manager",
    },
    {
      value: "ai_project_manager",
      label: "AI Project Manager",
    },
    {
      value: "technical_project_manager",
      label: "Technical Project Manager",
    },
    {
      value: "scrum_master",
      label: "Scrum Master",
    },
    {
      value: "pmo_specialist",
      label: "PMO Specialist",
    },
    {
      value: "pmo_leadership",
      label: "PMO Leadership",
    },
    {
      value: "technical_program_manager",
      label: "Technical Program Manager",
    },
    {
      value: "project_coordinator",
      label: "Project Coordinator",
    },
    {
      value: "delivery_manager",
      label: "Delivery Manager",
    },
    {
      value: "release_manager",
      label: "Release Manager",
    },
    {
      value: "business_analyst",
      label: "Business Analyst",
    },
    {
      value: "other",
      label: "Other",
    },
  ];

  const [form, setForm] = useState(initialState);

  const [submitting, setSubmitting] = useState(false);

  const set = (k) => (e) =>
    setForm((f) => ({
      ...f,
      [k]: e?.target ? e.target.value : e,
    }));

  const showResource = form.requirement_type === "dedicated_resources";

  const onSubmit = async (e) => {
    e.preventDefault();
    if (submitting) return;

    const payload = { ...form };
    if (!showResource) delete payload.resource_type;
    else if (!payload.resource_type) {
      toast.error("Please select a resource type.");
      return;
    }

    try {
      setSubmitting(true);
      const r = await axios.post(`${API}/leads`, payload);
      toast.success(
        "Consultation request received. Our team will reach out shortly.",
        { duration: 5000 },
      );
      setForm(initialState);
      console.log("Lead created", r.data);
    } catch (err) {
      const msg =
        err?.response?.data?.detail ||
        "Something went wrong. Please try again or use WhatsApp.";
      toast.error(typeof msg === "string" ? msg : "Submission failed");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section
      id="contact"
      data-testid="consultation-section"
      className="relative section-pad border-t border-white/5"
    >
      <div className="container-pad">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
          <div className="lg:col-span-5">
            <div className="label-eyebrow mb-4">Request Consultation</div>
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight">
              Request Delivery & Resource Consultation
            </h2>
            <p className="mt-5 text-base md:text-lg text-[#B8C2D1] leading-relaxed">
              Tell us about your project delivery, PMO, agile transformation, or
              resource requirements. Our consultants will connect with you to
              discuss the right engagement model.
            </p>

            <div className="mt-8 space-y-4 text-sm text-[#B8C2D1]">
              <div className="flex gap-3">
                <span className="text-[#E7B85C] font-medium w-24">
                  Response
                </span>
                <span>Within 1 business day</span>
              </div>
              <div className="flex gap-3">
                <span className="text-[#E7B85C] font-medium w-24">
                  Discovery
                </span>
                <span>Free 30-minute consultation</span>
              </div>
              <div className="flex gap-3">
                <span className="text-[#E7B85C] font-medium w-24">
                  Coverage
                </span>
                <span>Global — remote & hybrid delivery</span>
              </div>
            </div>
          </div>

          <motion.form
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            onSubmit={onSubmit}
            data-testid="consultation-form"
            className="lg:col-span-7 surface-card p-6 md:p-10 space-y-5"
          >
            {/* Requirement Type */}
            <div>
              <label className="block text-xs uppercase tracking-[0.18em] text-[#B8C2D1] mb-2">
                Requirement Type
              </label>
              <Select
                value={form.requirement_type}
                onValueChange={(v) =>
                  setForm((f) => ({
                    ...f,
                    requirement_type: v,
                    resource_type: "",
                  }))
                }
              >
                <SelectTrigger
                  data-testid="form-requirement-type"
                  className="h-12 bg-[#0a1429] border-white/10 hover:border-[#E7B85C]/40 focus:ring-[#E7B85C]/40 text-white"
                >
                  <SelectValue placeholder="Select a requirement" />
                </SelectTrigger>
                <SelectContent className="bg-[#0F1B33] border-white/10 text-white">
                  {requirementOptions.map((o) => (
                    <SelectItem key={o.value} value={o.value}>
                      {o.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Conditional resource type */}
            {showResource && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                transition={{ duration: 0.35 }}
              >
                <label className="block text-xs uppercase tracking-[0.18em] text-[#B8C2D1] mb-2">
                  Resource Type
                </label>
                <Select
                  value={form.resource_type}
                  onValueChange={(v) =>
                    setForm((f) => ({
                      ...f,
                      resource_type: v,
                    }))
                  }
                >
                  <SelectTrigger
                    data-testid="form-resource-type"
                    className="h-12 bg-[#0a1429] border-white/10 hover:border-[#E7B85C]/40 text-white"
                  >
                    <SelectValue placeholder="Select a resource" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#0F1B33] border-white/10 text-white">
                    {resourceOptions.map((o) => (
                      <SelectItem key={o.value} value={o.value}>
                        {o.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </motion.div>
            )}

            {/* Name + Company */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <Field
                id="full_name"
                label="Full Name"
                value={form.full_name}
                onChange={set("full_name")}
                required
              />
              <Field
                id="company_name"
                label="Company Name"
                value={form.company_name}
                onChange={set("company_name")}
                required
              />
            </div>

            {/* Email + Phone */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <Field
                id="business_email"
                label="Business Email"
                type="email"
                value={form.business_email}
                onChange={set("business_email")}
                required
              />
              <Field
                id="phone_number"
                label="Phone Number"
                type="tel"
                value={form.phone_number}
                onChange={set("phone_number")}
                required
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-xs uppercase tracking-[0.18em] text-[#B8C2D1] mb-2">
                Project Requirement Description
              </label>
              <textarea
                data-testid="form-description"
                value={form.description}
                onChange={set("description")}
                placeholder="Briefly describe your delivery, transformation, or resource requirements."
                rows={5}
                minLength={10}
                required
                className="w-full bg-[#0a1429] border border-white/10 rounded-md px-4 py-3 text-sm text-white placeholder:text-[#B8C2D1]/40 focus:outline-none focus:border-[#E7B85C]/50 focus:ring-2 focus:ring-[#E7B85C]/15 transition resize-y"
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between pt-2">
              <button
                type="submit"
                disabled={submitting}
                data-testid="form-submit"
                className="btn-gold w-full sm:w-auto disabled:opacity-60"
              >
                {submitting ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    Submitting…
                  </>
                ) : (
                  <>
                    Schedule Consultation
                    <ArrowRight size={16} />
                  </>
                )}
              </button>

              <a
                href="https://api.whatsapp.com/send/?phone=%2B918309813723&text=Hello%2C%20I%E2%80%99m%20interested%20in%20learning%20more%20about%20your%20PMO%20and%20Agile%20consulting%20services.%20Please%20share%20more%20details.&type=phone_number&app_absent=0"
                target="_blank"
                rel="noreferrer"
                data-testid="form-whatsapp-link"
                className="inline-flex items-center gap-2 text-sm text-[#B8C2D1] hover:text-white transition-colors"
              >
                <MessageCircle
                  size={16}
                  strokeWidth={1.5}
                  className="text-[#4D7CFE]"
                />
                Prefer WhatsApp? Connect directly
              </a>
            </div>
          </motion.form>
        </div>
      </div>
    </section>
  );
}

function Field({ id, label, value, onChange, type = "text", required }) {
  return (
    <div>
      <label
        htmlFor={id}
        className="block text-xs uppercase tracking-[0.18em] text-[#B8C2D1] mb-2"
      >
        {label}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        required={required}
        data-testid={`form-${id.replace(/_/g, "-")}`}
        className="w-full h-12 bg-[#0a1429] border border-white/10 rounded-md px-4 text-sm text-white placeholder:text-[#B8C2D1]/40 focus:outline-none focus:border-[#E7B85C]/50 focus:ring-2 focus:ring-[#E7B85C]/15 transition"
      />
    </div>
  );
}
