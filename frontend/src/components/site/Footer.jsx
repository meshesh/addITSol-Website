import { Linkedin, Mail, Phone } from "lucide-react";

const COLS = [
    {
        title: "Services",
        links: [
            { l: "Agile Transformation", h: "#agile" },
            { l: "PMO Consulting", h: "#pmo" },
            { l: "Project Delivery", h: "#services" },
            { l: "Specialized Resources", h: "#resources" },
        ],
    },
    {
        title: "Company",
        links: [
            { l: "Home", h: "#home" },
            { l: "Why Us", h: "#services" },
            { l: "Engagement Models", h: "#services" },
            { l: "Contact", h: "#contact" },
        ],
    },
];

export default function Footer() {
    return (
        <footer
            data-testid="site-footer"
            className="relative border-t border-white/5 pt-20 pb-10"
        >
            <div className="container-pad">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10">
                    <div className="lg:col-span-5">
                        <a
    href="#home"
    className="flex items-center mb-8"
>
    <img
        src="/img/addit-logo.png"
        alt="AddIT Solutions Logo"
        className="h-24 w-auto object-contain"
    />
</a>
                        <p className="text-sm md:text-base text-[#B8C2D1] leading-relaxed max-w-md">
                            Add IT Solutions is an enterprise consulting partner
                            specializing in Agile Transformation, PMO
                            Consulting, Project Delivery Governance, and
                            Specialized Project Leadership Resources.
                        </p>

                        <div className="mt-7 flex items-center gap-3">
                            <a
                                href="https://www.linkedin.com/bhushanjha"
                                target="_blank"
                                rel="noreferrer"
                                data-testid="footer-linkedin"
                                aria-label="LinkedIn"
                                className="w-10 h-10 grid place-items-center rounded-md border border-white/10 text-[#B8C2D1] hover:text-white hover:border-[#E7B85C]/50 transition"
                            >
                                <Linkedin size={16} strokeWidth={1.5} />
                            </a>
                            <a
                                href="mailto:contact@additsol.com"
                                data-testid="footer-email"
                                className="inline-flex items-center gap-2 text-sm text-[#B8C2D1] hover:text-white transition px-3 h-10 rounded-md border border-white/10"
                            >
                                <Mail size={14} strokeWidth={1.5} />
                                contact@additsol.com
                            </a>
                        </div>
                    </div>

                    {COLS.map((c) => (
                        <div
                            key={c.title}
                            className="lg:col-span-2"
                        >
                            <div className="label-eyebrow mb-5">{c.title}</div>
                            <ul className="space-y-3">
                                {c.links.map((l) => (
                                    <li key={l.l}>
                                        <a
                                            href={l.h}
                                            className="text-sm text-[#B8C2D1] hover:text-white transition-colors"
                                        >
                                            {l.l}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}

                    <div className="lg:col-span-3">
                        <div className="label-eyebrow mb-5">Contact</div>
                        <ul className="space-y-3 text-sm text-[#B8C2D1]">
                            <li className="flex items-start gap-3">
                                <Mail
                                    size={14}
                                    strokeWidth={1.5}
                                    className="mt-1 text-[#E7B85C]"
                                />
                                contact@additsol.com
                            </li>
                            <li className="flex items-start gap-3">
                                <Phone
                                    size={14}
                                    strokeWidth={1.5}
                                    className="mt-1 text-[#E7B85C]"
                                />
                                +(91) 8309813723
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="mt-14 pt-6 border-t border-white/5 flex flex-col md:flex-row md:items-center md:justify-between gap-3 text-xs text-[#B8C2D1]/70">
                    <div>
                        © {new Date().getFullYear()} Add IT Solutions. All
                        rights reserved.
                    </div>
                    <div className="font-heading tracking-tight">
                        Enterprise Delivery Excellence
                    </div>
                </div>
            </div>
        </footer>
    );
}
