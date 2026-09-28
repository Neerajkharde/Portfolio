import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './Navbar.css';

const NAV_ITEMS = [
    { label: 'About', href: 'about' },
    { label: 'Experience', href: 'work' },
    { label: 'Stack', href: 'stack' },
    { label: 'Projects', href: 'projects' },
];

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        // Scrolled state triggers deeper glass effect
        const onScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', onScroll, { passive: true });
        // Trigger once on mount
        onScroll();
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    const scrollTo = (id) => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
        setMenuOpen(false);
    };

    return (
        <>
            <motion.nav
                className={`navbar${scrolled ? ' scrolled' : ''}`}
                initial={{ y: -80, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
            >
                {/* Logo */}
                <div className="navbar__logo" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                    Neeraj Kharde
                </div>

                {/* Desktop links */}
                <ul className="navbar__links">
                    {NAV_ITEMS.map((item) => (
                        <li key={item.label}>
                            <span
                                className="navbar__link"
                                onClick={() => scrollTo(item.href)}
                            >
                                {item.label}
                            </span>
                        </li>
                    ))}
                </ul>

                {/* Burger */}
                <button
                    className={`navbar__burger${menuOpen ? ' open' : ''}`}
                    onClick={() => setMenuOpen((v) => !v)}
                    aria-label="Toggle navigation"
                >
                    <span /><span /><span />
                </button>
            </motion.nav>

            {/* Mobile Drawer */}
            <AnimatePresence>
                {menuOpen && (
                    <motion.div
                        className="navbar__mobile-drawer"
                        initial={{ opacity: 0, y: -16 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -16 }}
                        transition={{ duration: 0.25 }}
                    >
                        {NAV_ITEMS.map((item) => (
                            <span
                                key={item.label}
                                className="navbar__mobile-link"
                                onClick={() => scrollTo(item.href)}
                            >
                                {item.label}
                            </span>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
