import { motion } from "framer-motion";
import {
    Settings2,
    Briefcase,
    Scale,
    BarChart3,
    AlertTriangle,
    SlidersHorizontal,
} from "lucide-react";

const VISUAL =
    "https://static.prod-images.emergentagent.com/jobs/0794aeb0-1d8e-4e80-995a-e13876cfbdc0/images/0fee3ee12a4712f1c25f2e2d7f86c7d3429527b98af1ec1bd92f9a3411f60015.png";

const ITEMS = [
    {
        icon: Settings2,
        title: "PMO Design & Setup",
        d: "Tailored operating models calibrated to your portfolio.",
    },
    {
        icon: Briefcase,
        title: "Portfolio Management",
        d: "Prioritization, capacity, and investment governance.",
    },
    {
        icon: Scale,
        title: "Governance Frameworks",
        d: "Decision rights, gating, and assurance models.",
    },
    {
        icon: BarChart3,
        title: "KPI & Reporting Models",
        d: "Executive dashboards built on signal, not noise.",
    },
    {
        icon: AlertTriangle,
        title: "Risk & Dependency Management",
        d: "Proactive cross-team risk control at scale.",
    },
    {
        icon: SlidersHorizontal,
        title: "Process Optimization",
        d: "Lean, repeatable execution standards.",
    },
];

export default function PMOConsulting() {
    return (
        <section
            id="pmo"
            data-testid="pmo-section"
            className="relative section-pad"
        >
            <div className="container-pad">
                <div className="max-w-3xl mb-12 md:mb-16">
                    <div className="label-eyebrow mb-4">
                        PMO Strategy & Governance
                    </div>
                    <h2 className="font-heading text-3xl md:text-5xl font-semibold tracking-tight">
                        Governance frameworks aligned to business outcomes.
                    </h2>
                    <p className="mt-5 text-base md:text-lg text-[#B8C2D1] leading-relaxed">
                        Our PMO consulting services help enterprises establish
                        governance frameworks, improve portfolio visibility,
                        standardize execution practices, and align strategic
                        initiatives with business objectives.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 md:gap-5">
                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="lg:col-span-5 surface-card relative overflow-hidden p-0 min-h-[260px] md:min-h-full"
                    >
                        <img
                            src={VISUAL}
                            alt="PMO governance"
                            className="absolute inset-0 w-full h-full object-cover opacity-90"
                        />
                        <div className="absolute inset-0 bg-gradient-to-tr from-[#071120] via-[#071120]/40 to-transparent" />
                        <div className="relative p-8 md:p-10 h-full flex flex-col justify-end">
                            <div className="label-eyebrow mb-3">
                                Governance OS
                            </div>
                            <div className="font-heading text-xl md:text-2xl font-medium max-w-xs">
                                A structured operating layer for enterprise
                                delivery.
                            </div>
                        </div>
                    </motion.div>

                    <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
                        {ITEMS.map((it, i) => (
                            <motion.div
                                key={it.title}
                                initial={{ opacity: 0, y: 14 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-60px" }}
                                transition={{
                                    duration: 0.5,
                                    delay: i * 0.06,
                                }}
                                data-testid={`pmo-item-${i}`}
                                className="surface-card p-6"
                            >
                                <it.icon
                                    size={20}
                                    strokeWidth={1.4}
                                    className="text-[#E7B85C]"
                                />
                                <div className="font-heading text-base md:text-lg font-medium mt-4">
                                    {it.title}
                                </div>
                                <div className="text-sm text-[#B8C2D1] mt-2 leading-relaxed">
                                    {it.d}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
