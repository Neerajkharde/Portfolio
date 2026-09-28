import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { FiCode, FiServer, FiCpu, FiBox } from 'react-icons/fi';
import './About.css';

/* ── ease ── */
const expo = [0.16, 1, 0.3, 1];

/* ── Trait data ── */
const traits = [
    {
        num: '01',
        icon: FiCode,
        title: 'Problem Solver',
        desc: '500+ DSA problems solved across LeetCode, CodeChef, GeeksforGeeks and Codeforces.',
    },
    {
        num: '02',
        icon: FiServer,
        title: 'Backend Developer',
        desc: 'Building reliable, efficient backend systems with Java, Spring Boot and Go.',
    },
    {
        num: '03',
        icon: FiCpu,
        title: 'System Designer',
        desc: 'Designing scalable architectures that handle real-world complexity.',
    },
    {
        num: '04',
        icon: FiBox,
        title: 'Builder',
        desc: 'Turning ideas into real products — I built MaintenOps to solve a live problem at ISKCON NVCC.',
    },
];

/* ── Reveal animation: clip-path curtain ── */
function RevealBlock({ children, delay = 0, className = '' }) {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: '-80px' });
    return (
        <motion.div
            ref={ref}
            className={className}
            initial={{ clipPath: 'inset(100% 0% 0% 0%)', opacity: 0 }}
            animate={inView
                ? { clipPath: 'inset(0% 0% 0% 0%)', opacity: 1 }
                : {}
            }
            transition={{ duration: 1, ease: expo, delay }}
        >
            {children}
        </motion.div>
    );
}

/* ── Trait row ── */
function TraitRow({ trait, index }) {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: '-60px' });
    const Icon = trait.icon;

    return (
        <motion.div
            ref={ref}
            className="ab-trait"
            initial={{ opacity: 0, y: 60 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.85, ease: expo, delay: index * 0.1 }}
        >
            <span className="ab-trait__num">{trait.num}</span>
            <div className="ab-trait__icon"><Icon size={22} /></div>
            <h3 className="ab-trait__title">{trait.title}</h3>
            <p className="ab-trait__desc">{trait.desc}</p>
            <div className="ab-trait__line" />
        </motion.div>
    );
}

/* ── Main component ── */
export default function About() {
    return (
        <section className="ab" id="about">

            {/* ══ TOP: big bold intro ══ */}
            <div className="ab__top">
                {/* background word */}
                <div className="ab__bg-word" aria-hidden="true">ABOUT</div>

                <div className="ab__top-inner">
                    <RevealBlock delay={0}>
                        <h2 className="ab__heading">Who<br /><em>Am I?</em></h2>
                    </RevealBlock>

                    <div className="ab__bio-block">
                        <RevealBlock delay={0.15}>
                            <p className="ab__bio">
                                Computer Engineering student at{' '}
                                <strong>PICT — 9.88 CGPA.</strong>{' '}
                                I love understanding the "why" and "how" behind systems.
                                I built{' '}
                                <strong>MaintenOps</strong>{' '}
                                — a platform that centralises 100+ monthly maintenance
                                requests at ISKCON NVCC, managing the full workflow from
                                request to resolution.
                            </p>
                        </RevealBlock>

                        <RevealBlock delay={0.25}>
                            <p className="ab__tagline">
                                Building systems &mdash; solving problems &mdash; learning relentlessly.
                            </p>
                        </RevealBlock>
                    </div>
                </div>
            </div>

            {/* ══ BOTTOM: trait strips ══ */}
            <div className="ab__traits">
                <div className="ab__traits-header">
                    <span className="ab__traits-label">What I do</span>
                    <div className="ab__traits-hr" />
                </div>
                {traits.map((t, i) => (
                    <TraitRow key={i} trait={t} index={i} />
                ))}
            </div>

        </section>
    );
}
