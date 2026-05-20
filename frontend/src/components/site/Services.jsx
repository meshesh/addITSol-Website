import { motion } from "framer-motion";
import {
  GitBranch,
  LayoutGrid,
  ClipboardList,
  Users,
  ArrowUpRight,
} from "lucide-react";

const SERVICES = [
  {
    icon: Users,
    title: "Specialized Project Resources",
    desc: "Access experienced project delivery professionals aligned with enterprise delivery standards and agile methodologies.",
    items: [
      "Project Managers",
      "AI Project Managers",
      "Technical Project Managers",
      "Scrum Masters",
      "PMO Specialists",
      "PMO Leadership",
      "Technical Program Managers",
      "Project Coordinators",
      "Delivery Managers",
      "Release Managers",
    ],
    anchor: "#resources",
  },
  {
    icon: GitBranch,
    title: "Technical Project Resources",
    desc: "Specialized technical professionals supporting enterprise engineering, cloud modernization, and scalable product delivery.",
    items: [
      "Data Analyst",
      "Data, ML Engineer",
      "Full Stack Engineer",
      "Front-End Engineer",
      "Devops Engineer",
      "AI/ML Engineer",
      "QA Engineer",
      "Cyber Sequrity Specialist",
      "SAP Consultant",
    ],
    anchor: "#technical",
  },
  {
    icon: ClipboardList,
    title: "Domain Expertise",
    desc: "Specialized consulting capabilities tailored for high-impact enterprise transformation programs.",
    items: [
      "BFSI",
      "NBFC",
      "Healthcare",
      "E-Commerce",
      "FMCG",
      "Fin-Tech",
      "Telecom",
      "Insurance",
      "Ed-Tech",
      "Hospitality",
    ],
    anchor: "#contact",
  },
  {
    icon: LayoutGrid,
    title: "PMO Consulting",
    desc: "Strategic PMO consulting services designed to improve governance, visibility, execution control, and portfolio alignment.",
    items: [
      "PMO Setup",
      "PMO Maturity Assessment",
      "Portfolio Governance",
      "Delivery Frameworks",
      "Reporting Structures",
    ],
    anchor: "#pmo",
  },
];

export default function Services() {
  return (
    <section
      id="services"
      data-testid="services-section"
      className="relative section-pad"
    >
      <div className="container-pad">
        <div className="max-w-3xl mb-12 md:mb-16">
          <div className="label-eyebrow mb-4">
            Enterprise Consulting Services
          </div>
          <h2 className="font-heading text-3xl md:text-5xl font-semibold tracking-tight">
            We partner with organizations to elevate delivery performance.
          </h2>
          <p className="mt-5 text-base md:text-lg text-[#B8C2D1] leading-relaxed">
            Improve delivery performance, establish scalable governance
            frameworks, accelerate agile adoption, and provide specialized
            project leadership resources.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
          {SERVICES.map((s, i) => (
            <motion.a
              key={s.title}
              href={s.anchor}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.55, delay: i * 0.08 }}
              data-testid={`service-card-${i}`}
              className="surface-card group relative p-7 md:p-9 flex flex-col gap-5 overflow-hidden"
            >
              <div className="flex items-start justify-between">
                <div className="w-12 h-12 grid place-items-center rounded-lg border border-[#E7B85C]/25 bg-[#E7B85C]/5">
                  <s.icon
                    size={22}
                    strokeWidth={1.4}
                    className="text-[#E7B85C]"
                  />
                </div>
                <ArrowUpRight
                  size={20}
                  className="text-white/40 group-hover:text-[#E7B85C] group-hover:-translate-y-1 group-hover:translate-x-1 transition-all"
                />
              </div>

              <div>
                <h3 className="font-heading text-2xl md:text-[1.65rem] font-medium leading-tight">
                  {s.title}
                </h3>
                <p className="mt-3 text-[#B8C2D1] text-sm md:text-base leading-relaxed">
                  {s.desc}
                </p>
              </div>

              <ul className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2 text-sm">
                {s.items.map((it) => (
                  <li
                    key={it}
                    className="flex items-center gap-2 text-[#B8C2D1]"
                  >
                    <span className="w-1 h-1 rounded-full bg-[#E7B85C]" />
                    {it}
                  </li>
                ))}
              </ul>

              <div className="absolute -bottom-12 -right-12 w-48 h-48 rounded-full bg-[#4D7CFE]/0 group-hover:bg-[#4D7CFE]/5 transition-colors blur-2xl" />
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
