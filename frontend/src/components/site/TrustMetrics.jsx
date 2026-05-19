import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

const METRICS = [
    { value: 200, suffix: "+", label: "Teams Transformed" },
    // { value: 98, suffix: "%", label: "Client Satisfaction" },
    { value: 50, suffix: "+", label: "Certified Coaches" },
    // { value: 8, suffix: "+", label: "Years Experience" },
    { value: 22, suffix: "+", label: "Active Clients" },
    { value: 500, suffix: "+", label: "Active Resource Profiles" },
    { value: 200, suffix: "+", label: "Expert Resources Ready" },
];

function Counter({ value, suffix, active }) {
    const [n, setN] = useState(0);
    useEffect(() => {
        if (!active) return;
        const duration = 1400;
        const start = performance.now();
        let raf;
        const step = (t) => {
            const p = Math.min(1, (t - start) / duration);
            const eased = 1 - Math.pow(1 - p, 3);
            setN(Math.round(eased * value));
            if (p < 1) raf = requestAnimationFrame(step);
        };
        raf = requestAnimationFrame(step);
        return () => cancelAnimationFrame(raf);
    }, [active, value]);
    return (
        <span className="font-heading text-3xl md:text-5xl font-semibold text-white tabular-nums">
            {n}
            <span className="text-[#E7B85C]">{suffix}</span>
        </span>
    );
}

export default function TrustMetrics() {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: "-80px" });

    return (
        <section
            data-testid="trust-metrics-section"
            ref={ref}
            className="relative section-pad border-t border-white/5"
        >
            <div className="container-pad">
                <div className="flex items-baseline justify-between flex-wrap gap-3 mb-10 md:mb-14">
                    <div>
                        <div className="label-eyebrow mb-3">By the Numbers</div>
                        <h2 className="font-heading text-3xl md:text-4xl font-semibold tracking-tight max-w-2xl">
                            Operating at enterprise scale.
                        </h2>
                    </div>
                    <p className="text-sm text-[#B8C2D1] max-w-sm">
                        Trusted delivery outcomes across transformation
                        programs, PMOs, and strategic initiatives.
                    </p>
                </div>

                {/* Mobile horizontal scroll */}
                {/* Mobile stacked grid */}
<div className="md:hidden grid grid-cols-2 gap-3">
                        {METRICS.map((m, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 12 }}
                                animate={
                                    inView
                                        ? { opacity: 1, y: 0 }
                                        : { opacity: 0, y: 12 }
                                }
                                transition={{
                                    duration: 0.5,
                                    delay: i * 0.05,
                                }}
                                data-testid={`metric-card-${i}`}
                                className="surface-card p-4 flex flex-col gap-3 min-h-[180px]"
                            >
                                <div className="flex items-center justify-between">
                                    <span className="text-[10px] font-medium text-[#E7B85C]/80 tracking-[0.2em]">
                                        0{i + 1}
                                    </span>
                                    <span className="h-px w-8 bg-white/10" />
                                </div>
                                <Counter
                                    value={m.value}
                                    suffix={m.suffix}
                                    active={inView}
                                />
                                <div className="text-sm text-[#B8C2D1] leading-snug">
                                    {m.label}
                                </div>
                            </motion.div>
                        ))}
                </div>

                {/* Desktop asymmetric grid */}
                <div className="hidden md:grid grid-cols-12 gap-4 lg:gap-5">
                    {METRICS.map((m, i) => {
                        const span =
                            [
                                // "col-span-4",
                                // "col-span-4",
                                "col-span-4",
                                "col-span-4",
                                "col-span-4",
                                "col-span-6",
                                "col-span-6",
                            ][i] || "col-span-4";
                        return (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 16 }}
                                animate={
                                    inView
                                        ? { opacity: 1, y: 0 }
                                        : { opacity: 0, y: 16 }
                                }
                                transition={{
                                    duration: 0.6,
                                    delay: i * 0.06,
                                }}
                                data-testid={`metric-card-desktop-${i}`}
                                className={`${span} surface-card p-6 lg:p-8 flex items-end justify-between gap-6`}
                            >
                                <div>
                                    <Counter
                                        value={m.value}
                                        suffix={m.suffix}
                                        active={inView}
                                    />
                                    <div className="text-sm md:text-base text-[#B8C2D1] mt-3">
                                        {m.label}
                                    </div>
                                </div>
                                <div className="text-[11px] tracking-[0.2em] text-[#E7B85C]/80 font-medium">
                                    0{i + 1}
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
