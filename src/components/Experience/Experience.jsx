import { useState, useRef, useEffect } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { FiZap, FiAward, FiClock, FiArrowLeft, FiArrowRight, FiServer, FiDatabase, FiLayers, FiCpu, FiGitBranch, FiCloud } from 'react-icons/fi';
import './Experience.css';

const expo = [0.16, 1, 0.3, 1];

/* ──────────────────────────────────────────
   Logo image — drop mc-logo.png in /public
────────────────────────────────────────── */
function McLogoImg({ size = 52 }) {
    return (
        <img
            src="/mc-logo.png"
            alt="Mastercard"
            className="exp-feature__logo-img"
            style={{ width: size, height: size, objectFit: 'contain' }}
            onError={(e) => {
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'flex';
            }}
        />
    );
}

function LogoPlaceholder({ label = 'MC' }) {
    return (
        <span className="exp-feature__logo-fallback" style={{ display: 'none' }}>
            {label}
        </span>
    );
}

/* ── LMS highlights ── */
const LMS_HIGHLIGHTS = [
    { label: 'Real-time Authorization Engine', desc: 'Checks whether upstream system(s) has enough money to clear a payment - instantly - before it settles.' },
    { label: 'Distributed Processing using Apache Ignite', desc: 'Processes transactions concurrently across multiple nodes, distributing workload to reduce contention and enabling horizontal scaling as transaction volume grows.' },
    { label: 'High Level Architecture', desc: '' },
    { label: 'Multi-Currency Support', desc: 'Independent per-currency balances - each settled on it\'s own ledger, in real time.' },
];
const LMS_STACK = ['Java', 'Spring Boot', 'PostgreSQL', 'Kafka', 'REST APIs', 'Docker'];

/* ── Animated reveal wrapper ── */
function Reveal({ children, delay = 0, className = '', style, y = 32 }) {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: '-40px' });
    return (
        <motion.div
            ref={ref}
            className={className}
            style={style}
            initial={{ opacity: 0, y }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: expo, delay }}
        >
            {children}
        </motion.div>
    );
}

/* ══════════════════════════════════════════
   1. MASTERCARD INTERNSHIP — expandable
══════════════════════════════════════════ */
function MastercardIntern({ onOpenArch }) {
    const [showDetail, setShowDetail] = useState(false);
    const blockRef = useRef(null);
    const inView = useInView(blockRef, { once: true, margin: '-80px' });

    return (
        <motion.div
            layout
            className="exp-feature"
            ref={blockRef}
            initial={{ opacity: 0, y: 50 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ layout: { duration: 0.5, ease: expo }, opacity: { duration: 0.9, ease: expo } }}
        >
            {/* ── PERSISTENT HEADER ── */}
            <motion.div layout="position" className="exp-feature__header" style={{ zIndex: 2, marginBottom: '28px' }}>
                <div className="exp-feature__logo-wrap">
                    <McLogoImg size={48} />
                    <LogoPlaceholder label="MC" />
                </div>
                <div className="exp-feature__header-text">
                    <h3 className="exp-feature__title">Software Engineering Intern</h3>
                    <span className="exp-feature__dept">Payment Networks, Mastercard</span>
                </div>
            </motion.div>

            {/* ── DYNAMIC BODY ── */}
            <div style={{ position: 'relative' }}>
                <AnimatePresence mode="popLayout" initial={false}>

                    {/* OVERVIEW BODY */}
                    {!showDetail && (
                        <motion.div
                            key="overview"
                            layout="position"
                            initial={{ opacity: 0, filter: 'blur(4px)' }}
                            animate={{ opacity: 1, filter: 'blur(0px)' }}
                            exit={{ opacity: 0, filter: 'blur(4px)' }}
                            transition={{ duration: 0.4, ease: "easeInOut" }}
                            style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}
                        >
                            <p className="exp-feature__desc">
                                Secured an internship at Mastercard for the role of Software Development
                                Engineering Intern based on performance in the{' '}
                                <strong>Code for Change 12&#8209;hour Hackathon</strong> where we built
                                innovative solutions helping NGOs; creating a social impact.
                            </p>

                            <button
                                className="exp-feature__know-more"
                                onClick={() => {
                                    setShowDetail(true);
                                }}
                            >
                                Project
                                <FiArrowRight size={16} />
                            </button>
                        </motion.div>
                    )}

                    {/* DETAIL BODY (LMS) */}
                    {showDetail && (
                        <motion.div
                            key="detail"
                            layout="position"
                            initial={{ opacity: 0, filter: 'blur(4px)' }}
                            animate={{ opacity: 1, filter: 'blur(0px)' }}
                            exit={{ opacity: 0, filter: 'blur(4px)' }}
                            transition={{ duration: 0.4, ease: "easeInOut" }}
                            style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}
                        >
                            <div className="exp-feature__project-heading">
                                <div className="exp-feature__project-dot" />
                                <h4>Liquidity Management System (LMS)</h4>
                            </div>

                            <p className="exp-feature__project-desc">
                                Developed a Spring Boot microservice (POC) to enable same-day (T+0) fund settlement eligibility by validating liquidity and communicating real-time decisions via gRPC.

                                It's a distributed backend service designed using Spring Boot, Apache Ignite Cache; satisfying the SLA : 5ms-120 ms latency, 10K peak TPS, and 99.999% availability.
                            </p>

                            <div className="exp-feature__highlights">
                                {LMS_HIGHLIGHTS.map((h, i) => (
                                    <motion.div
                                        key={i}
                                        className="exp-feature__highlight"
                                        initial={{ opacity: 0, y: 16 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.4, ease: expo, delay: 0.1 + i * 0.05 }}
                                    >
                                        <FiZap size={13} className="exp-feature__hi-icon" />
                                        <div style={{ flex: 1 }}>
                                            <strong>{h.label}</strong>
                                            <span>{h.desc}</span>
                                            {h.label === 'High Level Architecture' && (
                                                <button
                                                    className="exp-feature__img-btn"
                                                    onClick={onOpenArch}
                                                >
                                                    View Architecture
                                                </button>
                                            )}
                                        </div>
                                    </motion.div>
                                ))}
                            </div>

                            <button className="exp-feature__back" onClick={() => {
                                setShowDetail(false);
                                setTimeout(() => blockRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 50);
                            }}>
                                <FiArrowLeft size={15} />
                                Back
                            </button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </motion.div>
    );
}

/* ══════════════════════════════════════════
   2. MASTERCARD SWE I — same structure, no expand
══════════════════════════════════════════ */
function MastercardFullTime() {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: '-60px' });

    return (
        <motion.div
            className="exp-feature exp-feature--upcoming"
            ref={ref}
            initial={{ opacity: 0, y: 50 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, ease: expo, delay: 0.1 }}
        >
            <div className="exp-feature__view">
                <div className="exp-feature__header">
                    <div className="exp-feature__logo-wrap">
                        <McLogoImg size={48} />
                        <LogoPlaceholder label="MC" />
                    </div>
                    <div className="exp-feature__header-text">
                        <h3 className="exp-feature__title">Software Engineer I</h3>
                        <span className="exp-feature__dept">Payment Networks, Mastercard</span>
                    </div>
                    <span className="exp-feature__upcoming-badge">Upcoming</span>
                </div>

                <p className="exp-feature__desc">
                    Will be updated soon.
                </p>
            </div>
        </motion.div>
    );
}

/* ══════════════════════════════════════════
   3. AICTE — simple card
══════════════════════════════════════════ */
function AICTECard() {
    return (
        <Reveal className="exp-card" style={{ '--exp-color': '#4f8ef7' }}>
            <div className="exp-card__top">
                <div className="exp-card__icon-wrap" style={{ '--exp-color': '#4f8ef7' }}>
                    <FiAward size={18} />
                </div>
                <div className="exp-card__titles">
                    <span className="exp-card__company">AICTE Virtual Internship</span>
                    <span className="exp-card__role">Java Full Stack Development</span>
                </div>
            </div>
            <p className="exp-card__summary">
                Completed AICTE's Virtual Internship in Java Full Stack Development, covering HTML, CSS, Bootstrap, JavaScript, jQuery, Core & Advanced Java, Spring Framework, Spring Boot, and Hibernate. Strengthened my understanding of Java-based application development and enterprise application architecture.
            </p>
        </Reveal>
    );
}

/* ══════════════════════════════════════════
   MAIN SECTION
══════════════════════════════════════════ */
export default function Experience() {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: '-80px' });
    const [isArchModalOpen, setArchModalOpen] = useState(false);

    // Prevent body scroll & close on Escape key when modal is open
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') {
                setArchModalOpen(false);
            }
        };

        if (isArchModalOpen) {
            document.body.style.overflow = 'hidden';
            window.addEventListener('keydown', handleKeyDown);
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [isArchModalOpen]);

    return (
        <section className="exp" id="work" ref={ref}>
            {/* System Design background ghost watermark & icons */}
            <div className="exp__bg-decorations" aria-hidden="true">
                <div className="exp__bg-word">EXPERIENCE</div>
                <div className="exp__bg-icon exp__bg-icon--1"><FiServer size={150} /></div>
                <div className="exp__bg-icon exp__bg-icon--2"><FiDatabase size={130} /></div>
                <div className="exp__bg-icon exp__bg-icon--3"><FiLayers size={140} /></div>
                <div className="exp__bg-icon exp__bg-icon--4"><FiCpu size={120} /></div>
                <div className="exp__bg-icon exp__bg-icon--5"><FiGitBranch size={110} /></div>
                <div className="exp__bg-icon exp__bg-icon--6"><FiCloud size={130} /></div>
            </div>

            <div className="exp__inner">

                {/* Heading */}
                <div className="exp__heading-block">
                    <motion.div
                        className="exp__rule"
                        initial={{ scaleX: 0 }}
                        animate={inView ? { scaleX: 1 } : {}}
                        transition={{ duration: 1.2, ease: expo }}
                    />
                    <motion.h2
                        className="exp__heading"
                        initial={{ opacity: 0, y: 36 }}
                        animate={inView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.85, ease: expo, delay: 0.1 }}
                    >
                        Experience
                    </motion.h2>
                    <motion.p
                        className="exp__sub"
                        initial={{ opacity: 0, y: 20 }}
                        animate={inView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.75, ease: expo, delay: 0.2 }}
                    >
                        Where I've worked and what I built
                    </motion.p>
                </div>

                {/* 1. Mastercard Internship (expandable) */}
                <MastercardIntern onOpenArch={() => setArchModalOpen(true)} />

                {/* 2. Mastercard SWE I (upcoming) */}
                <MastercardFullTime />

                {/* 3. AICTE */}
                <div className="exp__cards">
                    <AICTECard />
                </div>

            </div>

            {/* Architecture Modal */}
            <AnimatePresence>
                {isArchModalOpen && (
                    <motion.div
                        className="exp-modal"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        onClick={() => setArchModalOpen(false)}
                        onTouchEnd={(e) => {
                            if (e.target === e.currentTarget) {
                                setArchModalOpen(false);
                            }
                        }}
                    >
                        <motion.div
                            className="exp-modal__content"
                            initial={{ scale: 0.95, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.95, y: 20 }}
                            transition={{ duration: 0.3, ease: expo }}
                            onClick={(e) => e.stopPropagation()}
                            onTouchEnd={(e) => e.stopPropagation()}
                        >
                            <img
                                src="/lms-arch.png"
                                alt="High Level Architecture"
                                className="exp-modal__img"
                                onError={(e) => {
                                    e.target.style.display = 'none';
                                    e.target.nextSibling.style.display = 'block';
                                }}
                            />
                            <div className="exp-modal__fallback" style={{ display: 'none' }}>
                                Architecture image not found. Drop "lms-arch.png" in public folder.
                            </div>
                            <button className="exp-modal__close" onClick={() => setArchModalOpen(false)}>
                                Close
                            </button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}
