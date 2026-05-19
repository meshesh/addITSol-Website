import { motion } from "framer-motion";
import { ArrowRight, Phone } from "lucide-react";

export default function FinalCTA() {
    return (
        <section
            data-testid="final-cta-section"
            className="relative section-pad"
        >
            <div className="container-pad">
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7 }}
                    className="relative surface-card p-8 md:p-14 lg:p-20 overflow-hidden"
                >
                    <div className="absolute inset-0 grid-bg opacity-40" />
                    <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-[#E7B85C]/10 blur-[120px]" />

                    <div className="relative max-w-3xl">
                        <div className="label-eyebrow mb-4">
                            Partner With Us
                        </div>
                        <h2 className="font-heading text-3xl md:text-5xl lg:text-6xl font-semibold tracking-tight leading-[1.05]">
                            Ready to strengthen your delivery organization?
                        </h2>
                        <p className="mt-6 text-base md:text-lg text-[#B8C2D1] leading-relaxed max-w-2xl">
                            Connect with our consultants to discuss agile
                            transformation, PMO strategy, or enterprise project
                            resource requirements.
                        </p>
                        <div className="mt-9 flex flex-col sm:flex-row gap-3 sm:gap-4">
                            <a
                                href="#contact"
                                data-testid="final-cta-schedule"
                                className="btn-gold"
                            >
                                Schedule Consultation
                                <ArrowRight size={16} />
                            </a>
                            <a
                                href="#contact"
                                data-testid="final-cta-contact"
                                className="btn-outline-blue"
                            >
                                <Phone size={15} strokeWidth={1.5} />
                                Contact Us
                            </a>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
