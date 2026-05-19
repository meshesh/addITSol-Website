import { motion } from "framer-motion";
import { ArrowRight, Compass } from "lucide-react";

const HERO_BG =
  "https://static.prod-images.emergentagent.com/jobs/0794aeb0-1d8e-4e80-995a-e13876cfbdc0/images/6632f011e15db9aceff1f13afe54163667e952360c972bb5bf1691c2f7bfbdb0.png";

export default function Hero() {
  return (
    <section
      id="home"
      data-testid="hero-section"
      className="relative pt-28 md:pt-36 pb-20 md:pb-28 overflow-hidden"
    >
      {/* Background visual */}
      <div className="absolute inset-0 pointer-events-none">
        <img
          src={HERO_BG}
          alt=""
          className="w-full h-full object-cover opacity-40 md:opacity-55"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#071120]/60 via-[#071120]/70 to-[#071120]" />
        <div className="absolute inset-0 grid-bg opacity-30" />
      </div>

      <div className="container-pad relative">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-3 mb-6"
        >
          <div className="h-px w-10 bg-[#E7B85C]" />
          <span className="label-eyebrow">Enterprise Delivery Excellence</span>
        </motion.div>

        <motion.h1
          data-testid="hero-headline"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.05 }}
          className="font-heading text-[2.5rem] leading-[1.05] sm:text-5xl md:text-6xl lg:text-[5.25rem] lg:leading-[1] font-semibold tracking-tight max-w-5xl"
        >
          Driving Enterprise Delivery
          <br className="hidden sm:block" /> Excellence Through{" "}
          <span className="text-[#E7B85C]">Agile Transformation</span> & PMO
          Consulting
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.18 }}
          className="mt-7 md:mt-9 text-base sm:text-lg md:text-xl leading-relaxed text-[#B8C2D1] max-w-2xl"
        >
          We help enterprises improve execution, scale agile transformation,
          strengthen PMO governance, and deploy experienced project leadership
          resources across critical initiatives.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.32 }}
          className="mt-9 md:mt-12 flex flex-col sm:flex-row gap-3 sm:gap-4"
        >
          <a
            href="#contact"
            data-testid="hero-cta-primary"
            className="btn-gold"
          >
            Schedule Consultation
            <ArrowRight size={18} strokeWidth={2} />
          </a>
          <a
            href="#services"
            data-testid="hero-cta-secondary"
            className="btn-outline-blue"
          >
            <Compass size={16} strokeWidth={1.6} />
            Explore Services
          </a>
        </motion.div>

        {/* Tri-pillars hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.7 }}
          className="mt-16 md:mt-24 grid grid-cols-1 md:grid-cols-4 gap-3 md:gap-4 max-w-6xl"
        >
          {[
            {
              n: "01",
              t: "Transformation",
              d: "Scaled agile adoption.",
            },
            {
              n: "02",
              t: "Governance",
              d: "PMO maturity & portfolio control.",
            },
            {
              n: "03",
              t: "Resources",
              d: "Specialized delivery leadership.",
            },
            {
              n: "04",
              t: "AI Readiness",
              d: "Enterprise AI adoption strategy.",
            },
          ].map((p) => (
            <div
              key={p.n}
              className="surface-card p-5 md:p-6 flex items-start gap-4"
            >
              <span className="font-heading text-xs font-medium text-[#E7B85C]/90 mt-1">
                {p.n}
              </span>
              <div>
                <div className="font-heading text-base font-medium">{p.t}</div>
                <div className="text-sm text-[#B8C2D1] mt-1">{p.d}</div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
