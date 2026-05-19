import { motion } from "framer-motion";

const MODELS = [
    {
        title: "Consulting Engagements",
        d: "Time-boxed advisory programs scoped to specific business outcomes.",
    },
    {
        title: "Dedicated Resources",
        d: "Embedded senior practitioners aligned with your delivery org.",
    },
    {
        title: "Transformation Programs",
        d: "Multi-quarter engagements driving operating model evolution.",
    },
    {
        title: "PMO Advisory",
        d: "Strategic PMO uplift, maturity, and governance acceleration.",
    },
    {
        title: "Managed Delivery Support",
        d: "Outcome-based managed services with delivery accountability.",
    },
];

export default function EngagementModels() {
    return (
        <section
            data-testid="engagement-section"
            className="relative section-pad border-t border-white/5"
        >
            <div className="container-pad">
                <div className="max-w-3xl mb-10 md:mb-14">
                    <div className="label-eyebrow mb-4">Engagement Models</div>
                    <h2 className="font-heading text-3xl md:text-5xl font-semibold tracking-tight">
                        Flexible Engagement Models
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-3 md:gap-4">
                    {MODELS.map((m, i) => (
                        <motion.div
                            key={m.title}
                            initial={{ opacity: 0, y: 16 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-60px" }}
                            transition={{ duration: 0.55, delay: i * 0.06 }}
                            data-testid={`engagement-model-${i}`}
                            className={`surface-card p-7 md:p-9 flex flex-col gap-4 ${
    i < 3
        ? "lg:col-span-2"
        : "lg:col-span-3"
}`}
                        >
                            <div className="flex items-center justify-between">
                                <span className="font-heading text-xs font-medium text-[#E7B85C]/80 tracking-[0.2em]">
                                    M.0{i + 1}
                                </span>
                                <span className="h-px w-10 bg-white/10" />
                            </div>
                            <div className="font-heading text-xl md:text-2xl font-medium leading-tight">
                                {m.title}
                            </div>
                            <div className="text-sm md:text-base text-[#B8C2D1] leading-relaxed">
                                {m.d}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
