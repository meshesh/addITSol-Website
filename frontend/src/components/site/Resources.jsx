import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const RES = [
  // {
  //     title: "Project Manager",
  //     d: "Senior PMs experienced across regulated, technology, and transformation programs. PMP and Agile certified, accountable for delivery, scope, schedule, and stakeholder alignment.",
  //     tags: ["PMP", "Agile", "Hybrid Delivery"],
  // },
  // {
  //     title: "Technical Project Manager",
  //     d: "PMs with deep technical fluency to lead engineering, platform, and integration initiatives end-to-end across distributed teams.",
  //     tags: ["Engineering", "Platforms", "Integrations"],
  // },
  // {
  //     title: "Technical Project Coordinator",
  //     d: "Coordination and tracking specialists supporting senior PMs and TPMs with rituals, artifacts, RAID logs, and operational hygiene.",
  //     tags: ["RAID", "Ceremonies", "Tracking"],
  // },
  // {
  //     title: "Scrum Master",
  //     d: "Certified Scrum Masters with experience facilitating high-performing teams, removing impediments, and embedding agile rituals at scale.",
  //     tags: ["CSM", "PSM", "Team Health"],
  // },
  // {
  //     title: "Project Coordinator",
  //     d: "Skilled coordinators driving program operations, reporting cadences, and stakeholder communications across initiatives.",
  //     tags: ["Reporting", "Comms", "Ops"],
  // },
  // {
  //     title: "Agile Coach",
  //     d: "Enterprise coaches enabling teams, leaders, and portfolios to adopt scaled agile frameworks with measurable delivery outcomes.",
  //     tags: ["SAFe", "LeSS", "Scaling"],
  // },
  // {
  //     title: "PMO Specialist",
  //     d: "PMO practitioners experienced in governance, portfolio management, KPI design, and PMO maturity uplift.",
  //     tags: ["Governance", "KPI", "Maturity"],
  // },
  // {
  //     title: "Program Manager",
  //     d: "Senior program leaders running multi-stream initiatives with executive visibility, risk control, and outcome ownership.",
  //     tags: ["Programs", "Stakeholders", "Outcomes"],
  // },
  // {
  //     title: "Technical Program Manager",
  //     d: "TPMs accountable for large-scale technical programs spanning platform, infrastructure, and product engineering teams.",
  //     tags: ["TPM", "Architecture", "Cross-team"],
  // },
  {
    title: "Project Manager",
    d: "Experienced project leaders managing scope, timelines, budgets, and stakeholder alignment across enterprise transformation initiatives.",
    tags: ["PMP", "Stakeholder Management", "Delivery"],
  },
  {
    title: "AI Project Managers",
    d: "Specialized PMs driving AI and digital transformation programs with cross-functional coordination and execution oversight.",
    tags: ["AI Programs", "Digital Transformation", "Execution"],
  },
  {
    title: "Technical Project Managers",
    d: "Technical delivery managers leading engineering programs, integrations, and platform initiatives across distributed teams.",
    tags: ["Engineering", "Platforms", "Integrations"],
  },
  {
    title: "Scrum Master",
    d: "Certified Scrum Masters enabling agile adoption, facilitating ceremonies, and improving team collaboration and delivery flow.",
    tags: ["Scrum", "Agile Coaching", "Team Enablement"],
  },
  {
    title: "Business Analysts",
    d: "Business analysts bridging operational requirements and technical execution through process analysis, documentation, and stakeholder alignment.",
    tags: ["Requirements", "Process Analysis", "Stakeholders"],
  },
  {
    title: "PMO Specialists",
    d: "PMO professionals supporting governance, reporting structures, resource tracking, and enterprise delivery operations.",
    tags: ["Governance", "Reporting", "PMO Operations"],
  },
  {
    title: "PMO Leadership",
    d: "Senior PMO leaders driving portfolio governance, delivery oversight, and organizational execution maturity.",
    tags: ["Portfolio Management", "Governance", "Leadership"],
  },
  {
    title: "Technical Program Managers",
    d: "Strategic program managers overseeing complex technical initiatives across infrastructure, platforms, and product ecosystems.",
    tags: ["Technical Programs", "Cross-functional", "Architecture"],
  },
  {
    title: "Project Coordinators",
    d: "Operational coordinators ensuring smooth execution through tracking, scheduling, documentation, and stakeholder communication.",
    tags: ["Coordination", "Tracking", "Operations"],
  },
  {
    title: "Delivery Managers",
    d: "Delivery leaders focused on execution excellence, delivery predictability, and cross-team program alignment.",
    tags: ["Delivery Excellence", "Execution", "Operations"],
  },
  {
    title: "Release Managers",
    d: "Release management specialists coordinating deployments, release planning, and production readiness across environments.",
    tags: ["Release Planning", "Deployments", "Production Readiness"],
  },
  {
    title: "Cloud Engineers",
    d: "Certified cloud professionals supporting AWS, Azure, and GCP environments with scalable infrastructure, migrations, and cloud optimization initiatives.",
    tags: ["AWS", "Azure", "Cloud Infrastructure"],
  },
  {
    title: "DevOps Engineers",
    d: "DevOps specialists streamlining CI/CD pipelines, infrastructure automation, deployment workflows, and platform reliability operations.",
    tags: ["CI/CD", "Automation", "Infrastructure"],
  },
  {
    title: "Software Developers",
    d: "Frontend, backend, and full-stack developers building scalable enterprise applications, APIs, platforms, and digital products.",
    tags: ["Frontend", "Backend", "Full Stack"],
  },
  {
    title: "Frontend Developers",
    d: "UI-focused engineers creating responsive, accessible, and high-performance web applications with modern frontend frameworks.",
    tags: ["React", "Next.js", "UI Engineering"],
  },
  {
    title: "Backend Developers",
    d: "Backend specialists developing APIs, microservices, integrations, and secure enterprise-grade application architectures.",
    tags: ["Node.js", "APIs", "Microservices"],
  },
  {
    title: "Data Engineers",
    d: "Data engineering professionals building scalable pipelines, ETL workflows, and enterprise data platforms for analytics and AI readiness.",
    tags: ["ETL", "Data Pipelines", "Analytics"],
  },
  {
    title: "AI / ML Engineers",
    d: "AI engineers developing intelligent systems, automation workflows, machine learning models, and enterprise AI integrations.",
    tags: ["Machine Learning", "LLMs", "Automation"],
  },
  {
    title: "QA Engineers",
    d: "Quality assurance professionals ensuring software reliability through manual testing, automation frameworks, and release validation.",
    tags: ["Automation Testing", "QA", "Validation"],
  },
  {
    title: "Cybersecurity Specialists",
    d: "Security professionals supporting enterprise cybersecurity initiatives, risk management, compliance, and infrastructure protection.",
    tags: ["Security", "Compliance", "Risk Management"],
  },
  {
    title: "SAP Consultants",
    d: "SAP specialists supporting enterprise transformation programs across implementation, customization, integration, and support services.",
    tags: ["SAP", "ERP", "Enterprise Systems"],
  },
];

export default function Resources() {
  return (
    <section
      id="resources"
      data-testid="resources-section"
      className="relative section-pad border-t border-white/5"
    >
      <div className="container-pad">
        <div className="max-w-3xl mb-10 md:mb-14">
          <div className="label-eyebrow mb-4">Specialized Delivery Roles</div>
          <h2 className="font-heading text-3xl md:text-5xl font-semibold tracking-tight">
            Specialized Technology & Delivery Resources
          </h2>
          <p className="mt-5 text-base md:text-lg text-[#B8C2D1] leading-relaxed">
            Deploy experienced professionals across project delivery, cloud,
            engineering, AI, and enterprise technology domains to accelerate
            execution and transformation initiatives.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="surface-card overflow-hidden"
        >
          <Accordion type="single" collapsible className="w-full">
            {RES.map((r, i) => (
              <AccordionItem
                key={r.title}
                value={`item-${i}`}
                data-testid={`resource-accordion-${i}`}
                className="border-white/5 px-6 md:px-8 last:border-b-0"
              >
                <AccordionTrigger className="py-6 hover:no-underline group">
                  <div className="flex items-center gap-5 text-left">
                    <span className="text-xs tracking-[0.2em] font-medium text-[#E7B85C]/80">
                      0{i + 1}
                    </span>
                    <span className="font-heading text-lg md:text-xl font-medium group-hover:text-[#E7B85C] transition-colors">
                      {r.title}
                    </span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pb-7 pl-10 md:pl-14">
                  <p className="text-[#B8C2D1] text-sm md:text-base leading-relaxed max-w-3xl">
                    {r.d}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {r.tags.map((t) => (
                      <span
                        key={t}
                        className="text-[11px] font-medium tracking-wider uppercase px-3 py-1 rounded-full border border-[#4D7CFE]/30 text-[#B8C2D1]"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
}
