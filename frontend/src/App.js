import "@/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/sonner";
import LandingPage from "@/pages/LandingPage";

export default function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<LandingPage />} />
                </Routes>
            </BrowserRouter>
            <Toaster
                position="top-center"
                theme="dark"
                toastOptions={{
                    style: {
                        background: "#0F1B33",
                        border: "1px solid rgba(231,184,92,0.25)",
                        color: "#ffffff",
                    },
                }}
            />
        </div>
    );
}
