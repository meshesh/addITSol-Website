import { motion } from "framer-motion";

const POINTS = [
    {
        n: "01",
        t: "Enterprise-Focused Consulting",
        d: "Built for complex, regulated, and global delivery environments.",
    },
    {
        n: "02",
        t: "Certified & Experienced Consultants",
        d: "PMP, CSM, SAFe, and PMI-ACP certified senior practitioners.",
    },
    {
        n: "03",
        t: "Flexible Engagement Models",
        d: "Advisory, embedded, or fully managed delivery formats.",
    },
    {
        n: "04",
        t: "Faster Deployment",
        d: "Mobilized teams ready to engage within days, not quarters.",
    },
    {
        n: "05",
        t: "Transformation-Driven Approach",
        d: "Outcome-anchored programs, not staff augmentation.",
    },
    {
        n: "06",
        t: "Cost-Effective Scaling",
        d: "Onshore standards delivered with offshore economics.",
    },
    {
        n: "07",
        t: "Offshore Delivery Advantage",
        d: "Mature distributed delivery practices and tooling.",
    },
    {
        n: "08",
        t: "Hybrid PM + Agile Expertise",
        d: "Traditional rigor blended with adaptive frameworks.",
    },
];

const SYSTEMS =
    "https://static.prod-images.emergentagent.com/jobs/0794aeb0-1d8e-4e80-995a-e13876cfbdc0/images/25342c5692d6d9417ce1e595a050cd409e2b301e465cc68b364fc035c32905f7.png";

export default function WhyChooseUs() {
    return (
        <section
            data-testid="why-section"
            className="relative section-pad overflow-hidden"
        >
            <div className="absolute -right-40 top-20 w-[640px] h-[640px] opacity-25 pointer-events-none hidden md:block">
                <img
                    src={SYSTEMS}
                    alt=""
                    className="w-full h-full object-cover"
                />
            </div>
            <div className="container-pad relative">
                <div className="max-w-3xl mb-12 md:mb-16">
                    <div className="label-eyebrow mb-4">
                        Why Enterprises Partner With Us
                    </div>
                    <h2 className="font-heading text-3xl md:text-5xl font-semibold tracking-tight">
                        A trusted partner for delivery transformation at scale.
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-0 border-t border-white/5">
                    {POINTS.map((p, i) => (
                        <motion.div
                            key={p.n}
                            initial={{ opacity: 0, y: 14 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-40px" }}
                            transition={{ duration: 0.5, delay: i * 0.04 }}
                            data-testid={`why-point-${i}`}
                            className={`py-7 md:py-9 px-1 md:px-6 border-b border-white/5 md:[&:nth-child(odd)]:border-r flex items-start gap-5 hover:bg-white/[0.02] transition-colors`}
                        >
                            <span className="font-heading text-xs font-medium text-[#E7B85C]/80 mt-1 shrink-0">
                                {p.n}
                            </span>
                            <div>
                                <div className="font-heading text-lg md:text-xl font-medium">
                                    {p.t}
                                </div>
                                <div className="text-sm md:text-base text-[#B8C2D1] mt-2 leading-relaxed">
                                    {p.d}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
