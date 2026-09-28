import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
    FiGithub, FiLinkedin, FiMail, FiInstagram, FiDownload,
    FiCode
} from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import './Hero.css';

/* ── Typewriter ── */
function useTypewriter(words, speed = 75, pause = 2000) {
    const [displayed, setDisplayed] = useState('');
    const [wordIdx, setWordIdx] = useState(0);
    const [charIdx, setCharIdx] = useState(0);
    const [deleting, setDeleting] = useState(false);

    useEffect(() => {
        const current = words[wordIdx];
        let timeout;

        if (!deleting && charIdx < current.length) {
            timeout = setTimeout(() => setCharIdx((c) => c + 1), speed);
        } else if (!deleting && charIdx === current.length) {
            timeout = setTimeout(() => setDeleting(true), pause);
        } else if (deleting && charIdx > 0) {
            timeout = setTimeout(() => setCharIdx((c) => c - 1), speed / 2);
        } else {
            setDeleting(false);
            setWordIdx((w) => (w + 1) % words.length);
        }

        setDisplayed(current.slice(0, charIdx));
        return () => clearTimeout(timeout);
    }, [charIdx, deleting, wordIdx, words, speed, pause]);

    return displayed;
}

const ROLES = [
    'Backend Engineer',
    'Scalable Systems',
    'Problem Solver',
    'Java Spring Boot · C++ ',
];

const SOCIAL = [
    { icon: FiGithub, href: 'https://github.com/Neerajkharde', tooltip: 'GitHub', label: 'github' },
    { icon: FiLinkedin, href: 'https://www.linkedin.com/in/neerajkharde/', tooltip: 'LinkedIn', label: 'linkedin' },
    { icon: FiMail, href: 'mailto:neerajkharde7@gmail.com', tooltip: 'Email', label: 'email' },
    { icon: FiInstagram, href: 'https://instagram.com/', tooltip: 'Instagram', label: 'instagram' },
    { icon: FiCode, href: 'https://leetcode.com/u/neeraj_g0091e/', tooltip: 'Code Profile', label: 'Leetcode' },
];

const infoVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.13 } },
};

const item = {
    hidden: { opacity: 0, y: 26 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.4, 0, 0.2, 1] } },
};

export default function Hero() {
    const role = useTypewriter(ROLES);

    return (
        <section className="hero" id="hero">
            <div className="hero__inner">

                {/* ════════════════════════════════════════
            LEFT — photo frame
        ════════════════════════════════════════ */}
                <motion.div
                    className="hero__photo-col"
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.9, ease: [0.4, 0, 0.2, 1] }}
                >
                    <div className="photo-frame">
                        {/* ambient glow */}
                        <div className="photo-frame__glow" />

                        {/* photo / initials */}
                        <img
                            src="/profile1.jpg"
                            alt="Neeraj Kharde"
                            className="photo-frame__img"
                            onError={(e) => {
                                e.target.style.display = 'none';
                                const sib = e.target.parentElement.querySelector('.photo-frame__initials');
                                if (sib) sib.style.display = 'flex';
                            }}
                        />

                        {/* initials fallback */}
                        <div className="photo-frame__initials">
                            <span className="photo-frame__initials-text">NK</span>
                        </div>

                        {/* subtle soft vignette overlay instead of blue tint */}
                        <div className="photo-frame__overlay" />
                    </div>
                </motion.div>

                {/* ════════════════════════════════════════
            RIGHT — info
        ════════════════════════════════════════ */}
                <motion.div
                    className="hero__info-col"
                    variants={infoVariants}
                    initial="hidden"
                    animate="visible"
                >
                    <motion.h1 className="hero__name" variants={item}>
                        Hey, I'm<br />
                        <span>Neeraj Kharde</span>
                    </motion.h1>

                    <motion.div className="hero__title" variants={item}>
                        <strong>{role}</strong>
                        <span
                            aria-hidden="true"
                            style={{
                                display: 'inline-block',
                                width: '2px',
                                height: '1em',
                                background: 'var(--accent-cyan)',
                                marginLeft: '2px',
                                verticalAlign: 'middle',
                                animation: 'blink 1.1s step-end infinite',
                            }}
                        />
                    </motion.div>

                    <motion.p className="hero__desc" variants={item}>
                        I design and build{' '}
                        <strong style={{ color: 'var(--text-primary)', fontWeight: 600 }}>
                            scalable distributed systems
                        </strong>
                        {' '}— working deeply with{' '}
                        <span style={{ color: 'var(--accent-cyan)' }}>Java | SpringBoot</span>,{' '}
                        <span style={{ color: 'var(--accent-cyan)' }}>C++</span>,{' '}
                        <span style={{ color: 'var(--accent-cyan)' }}>Golang</span>.
                        {' '}I think in systems, architect for scale, and obsess over performance.
                    </motion.p>

                    <motion.div className="hero__actions" variants={item}>
                        <a
                            className="btn-primary"
                            href="/C2K231253_NeerajKharde_Resume.pdf"
                            download="Neeraj_Kharde_Resume.pdf"
                        >
                            <FiDownload size={15} />
                            MY RESUME
                        </a>
                    </motion.div>
                </motion.div>

            </div>

            {/* ══════════════════════════════════════════
          SOCIAL STRIP — centralised below split
      ══════════════════════════════════════════ */}
            <motion.div
                className="hero__social-strip"
                initial={{ opacity: 0, y: 22 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.0, duration: 0.65 }}
            >
                <div className="hero__social-divider" />
                {SOCIAL.map(({ icon: Icon, href, tooltip, label }) => (
                    <a
                        key={label}
                        href={href}
                        className="social-link"
                        target="_blank"
                        rel="noreferrer"
                        data-tooltip={tooltip}
                        aria-label={tooltip}
                    >
                        <Icon size={22} />
                    </a>
                ))}
                <div className="hero__social-divider right" />
            </motion.div>

            {/* Scroll hint */}
            <motion.div
                className="hero__scroll-hint"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5, duration: 1 }}
            >
                <div className="scroll-hint-track">
                    <div className="scroll-hint-dot" />
                </div>
            </motion.div>
        </section>
    );
}
