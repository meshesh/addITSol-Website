import { motion } from "framer-motion";
import {
    Activity,
    Compass,
    Layers3,
    GraduationCap,
    Gauge,
    Workflow,
    Users2,
    ShieldCheck,
} from "lucide-react";

const VISUAL =
    "https://static.prod-images.emergentagent.com/jobs/0794aeb0-1d8e-4e80-995a-e13876cfbdc0/images/8de1ab202e592658b49b2b0f31ded33664ae7088d507034d46a66521bec335ac.png";

// const CAPS = [
//     { icon: Activity, label: "Agile Maturity Assessment" },
//     { icon: Compass, label: "Scrum Adoption" },
//     { icon: Layers3, label: "SAFe Enablement" },
//     { icon: GraduationCap, label: "Agile Coaching" },
//     { icon: Gauge, label: "Delivery Optimization" },
//     { icon: Workflow, label: "Team Transformation" },
//     { icon: Users2, label: "Leadership Alignment" },
//     { icon: ShieldCheck, label: "Agile Governance" },
// ];

const CAPS = [
    {
        icon: Activity,
        label: "Agile Maturity Assessment",
        oneliner: "Evaluate agile adoption, processes, and delivery maturity.",
    },
    {
        icon: Compass,
        label: "Scrum Adoption",
        oneliner: "Implement scalable Scrum practices across teams.",
    },
    {
        icon: Layers3,
        label: "SAFe Enablement",
        oneliner: "Align enterprise delivery through SAFe frameworks.",
    },
    {
        icon: GraduationCap,
        label: "Agile Coaching",
        oneliner: "Enable agile mindset transformation and team agility.",
    },
    {
        icon: Gauge,
        label: "Delivery Optimization",
        oneliner: "Improve execution speed, predictability, and efficiency.",
    },
    {
        icon: Workflow,
        label: "Team Transformation",
        oneliner: "Build collaborative, adaptive, and high-performing teams.",
    },
    {
        icon: Users2,
        label: "Leadership Alignment",
        oneliner: "Align leadership with agile delivery and governance goals.",
    },
    {
        icon: ShieldCheck,
        label: "Agile Governance",
        oneliner: "Establish structured agile controls and delivery oversight.",
    },
];

export default function AgileTransformation() {
    return (
        <section
            id="agile"
            data-testid="agile-section"
            className="relative section-pad border-t border-white/5"
        >
            <div className="container-pad">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
                    <div className="lg:col-span-5 lg:sticky lg:top-28">
                        <div className="label-eyebrow mb-4">
                            Capability — Transformation
                        </div>
                        <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight">
                            Enterprise Agile Transformation
                        </h2>
                        <p className="mt-5 text-base md:text-lg text-[#B8C2D1] leading-relaxed">
                            We help organizations transition from traditional
                            delivery models to scalable agile frameworks that
                            improve collaboration, transparency, adaptability,
                            and execution efficiency.
                        </p>

                        <div className="mt-8 relative overflow-hidden rounded-xl border border-white/5">
                            <img
                                src={VISUAL}
                                alt="Agile transformation visual"
                                className="w-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#071120] via-transparent to-transparent" />
                        </div>
                    </div>

                    <div className="lg:col-span-7 h-full">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4 h-full">
                            {CAPS.map((c, i) => (
                                <motion.div
                                    key={c.label}
                                    initial={{ opacity: 0, y: 14 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, margin: "-60px" }}
                                    transition={{
                                        duration: 0.5,
                                        delay: i * 0.05,
                                    }}
                                    data-testid={`agile-cap-${i}`}
                                    className="surface-card p-5 md:p-6 flex items-start gap-4 h-full"
                                >
                                    <div className="w-10 h-10 grid place-items-center rounded-md border border-white/10">
                                        <c.icon
                                            size={18}
                                            strokeWidth={1.4}
                                            className="text-[#4D7CFE]"
                                        />
                                    </div>
                                    {/* <div>
                                        <div className="text-[11px] tracking-[0.18em] text-[#E7B85C]/80 font-medium mb-1">
                                            0{i + 1}
                                        </div>
                                        <div className="font-heading text-[15px] md:text-base font-medium leading-tight">
                                            {c.label}
                                        </div>
                                    </div> */}
                                    <div>
    <div className="text-[11px] tracking-[0.18em] text-[#E7B85C]/80 font-medium mb-1">
        0{i + 1}
    </div>

    <div className="font-heading text-[15px] md:text-base font-medium leading-tight">
        {c.label}
    </div>

    <p className="mt-2 text-sm leading-relaxed text-[#B8C2D1]">
        {c.oneliner}
    </p>
</div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
