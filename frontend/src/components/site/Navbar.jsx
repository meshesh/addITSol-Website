import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowUpRight } from "lucide-react";

const LINKS = [
    { label: "Home", href: "#home" },
    { label: "Services", href: "#services" },
    { label: "Agile", href: "#agile" },
    { label: "PMO", href: "#pmo" },
    { label: "Resources", href: "#resources" },
    { label: "Contact", href: "#contact" },
];

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 14);
        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    useEffect(() => {
        document.body.style.overflow = open ? "hidden" : "";
        return () => {
            document.body.style.overflow = "";
        };
    }, [open]);

    return (
        <>
            <header
                data-testid="site-navbar"
                className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
                    scrolled
                        ? "backdrop-blur-xl bg-[#071120]/80 border-b border-white/5"
                        : "bg-transparent"
                }`}
            >
                <div className="container-pad flex items-center justify-between h-16 md:h-20">
                    <a
    href="#home"
    data-testid="navbar-logo"
    className="flex items-center group"
>
    <img
        src="/img/addit-logo.png"
        alt="AddIT Solutions Logo"
        className="h-10 w-auto object-contain"
    />
</a>

                    <nav className="hidden md:flex items-center gap-1">
                        {LINKS.map((l) => (
                            <a
                                key={l.href}
                                href={l.href}
                                data-testid={`navlink-${l.label.toLowerCase()}`}
                                className="px-3.5 py-2 text-sm text-[#B8C2D1] hover:text-white transition-colors rounded-md hover:bg-white/5"
                            >
                                {l.label}
                            </a>
                        ))}
                    </nav>

                    <div className="hidden md:block">
                        <a
                            href="#contact"
                            data-testid="navbar-cta-desktop"
                            className="btn-gold !py-2.5 !px-4 text-sm"
                        >
                            Schedule Consultation
                            <ArrowUpRight size={16} strokeWidth={2} />
                        </a>
                    </div>

                    <button
                        data-testid="navbar-menu-toggle"
                        aria-label="Toggle menu"
                        onClick={() => setOpen((v) => !v)}
                        className="md:hidden grid place-items-center w-10 h-10 rounded-md border border-white/10 hover:bg-white/5"
                    >
                        {open ? <X size={18} /> : <Menu size={18} />}
                    </button>
                </div>
            </header>

            <AnimatePresence>
                {open && (
                    <motion.div
                        data-testid="mobile-menu-overlay"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="fixed inset-0 z-40 md:hidden bg-[#071120]/95 backdrop-blur-2xl"
                    >
                        <div className="pt-24 px-6 h-full flex flex-col">
                            <div className="label-eyebrow mb-6">Navigation</div>
                            <nav className="flex flex-col">
                                {LINKS.map((l, i) => (
                                    <motion.a
                                        key={l.href}
                                        initial={{ opacity: 0, x: -16 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{
                                            delay: 0.05 + i * 0.05,
                                            duration: 0.4,
                                        }}
                                        href={l.href}
                                        onClick={() => setOpen(false)}
                                        data-testid={`mobile-navlink-${l.label.toLowerCase()}`}
                                        className="font-heading text-3xl font-semibold py-4 border-b border-white/5 flex items-center justify-between"
                                    >
                                        {l.label}
                                        <ArrowUpRight
                                            size={20}
                                            className="text-[#E7B85C]/80"
                                        />
                                    </motion.a>
                                ))}
                            </nav>
                            <div className="mt-auto pb-10 pt-8">
                                <a
                                    href="#contact"
                                    onClick={() => setOpen(false)}
                                    data-testid="mobile-menu-cta"
                                    className="btn-gold w-full"
                                >
                                    Schedule Consultation
                                </a>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
