import { useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import {
    FiGithub,
    FiExternalLink,
    FiCheckCircle,
    FiChevronLeft,
    FiChevronRight,
    FiLayers,
    FiServer,
    FiCpu,
    FiImage,
    FiX
} from 'react-icons/fi';
import './Projects.css';

const expo = [0.16, 1, 0.3, 1];

const PROJECTS_DATA = [
    {
        id: 'maintenops',
        num: '01',
        title: 'MaintenOps',
        subtitle: 'Java Full Stack / Spring Boot',
        category: 'Full Stack Enterprise Platform',
        icon: FiServer,
        accentColor: '#38bdf8',
        image: '/iskcon.jpg',
        description: 'Digitized maintenance operations for ISKCON NVCC, streamlining 100+ monthly requests through a centralized request management platform.',
        keyFeatures: [
            'A React.js, Spring Boot, and PostgreSQL application with image-based issue reporting, real-time tracking, and end-to-end request lifecycle management.',
            'JWT-based RBAC with quotation management, multi-stage approvals, and role-specific dashboards.',
            'Digitized maintenance operations streamlining 100+ monthly requests through a centralized platform.'
        ],
        techStack: ['Java', 'Spring Boot', 'React.js', 'PostgreSQL', 'JWT', 'REST APIs', 'Spring Security'],
        githubUrl: 'https://github.com/Neerajkharde/MaintenOps',
        liveUrl: 'https://mainten-ops.vercel.app/'
    },
    {
        id: 'liquidity-manager',
        num: '02',
        title: 'Liquidity Service Manager',
        subtitle: 'Spring Boot Microservice (POC) · Mastercard Internship',
        category: 'Distributed Financial Infrastructure',
        icon: FiLayers,
        accentColor: '#10b981',
        image: '/mc-logo.png',
        description: 'Developed a Spring Boot microservice (POC) to enable same-day (T+0) fund settlement eligibility by validating liquidity and communicating real-time decisions via gRPC. Satisfying the SLA: 5ms–120ms latency, 10K peak TPS, and 99.999% availability.',
        keyFeatures: [
            'Checks whether upstream system has enough money to clear a payment instantly before it settles.',
            'Processes transactions concurrently across multiple nodes, distributing workload to reduce contention and enabling horizontal scaling as transaction volume grows.',
            'Independent per-currency balances — each settled on its own ledger in real time.',
            'High-Performance SLA: Satisfies 5ms–120ms latency, 10K peak TPS, and 99.999% availability.'
        ],
        techStack: ['Java', 'Spring Boot', 'Apache Ignite', 'gRPC', 'Distributed Systems', 'System Design'],
        githubUrl: '',
        liveUrl: '',
        archImage: '/lms-arch.png'
    },
    {
        id: 'rateguard',
        num: '03',
        title: 'RateGuard',
        subtitle: 'Java Spring Boot',
        category: 'High-Throughput Infrastructure',
        icon: FiCpu,
        accentColor: '#f43f5e',
        image: '/rL.png',
        description: 'Developed a distributed Sliding Window Rate Limiter using Spring Boot and Redis, enabling configurable endpoint-specific request throttling with HTTP 429 enforcement.',
        keyFeatures: [
            'Atomic Redis Lua scripting with Sorted Sets to eliminate race conditions while efficiently tracking request timestamps in a distributed environment.',
            'Micrometer metrics, Spring Boot Actuator, structured logging, and Dockerized deployment providing observability, performance monitoring, and containerized execution.'
        ],
        techStack: ['Java', 'Spring Boot', 'Redis', 'Lua Scripting', 'Docker', 'Micrometer', 'Spring Actuator', 'System Design'],
        githubUrl: 'https://github.com/Neerajkharde/rateGuard',
        liveUrl: ''
    }
];

export default function Projects() {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: '-80px' });
    const [activeIndex, setActiveIndex] = useState(0);
    const [selectedArchImage, setSelectedArchImage] = useState(null);

    const activeProject = PROJECTS_DATA[activeIndex];
    const CategoryIcon = activeProject.icon;

    const handlePrev = () => {
        setActiveIndex((prev) => (prev === 0 ? PROJECTS_DATA.length - 1 : prev - 1));
    };

    const handleNext = () => {
        setActiveIndex((prev) => (prev === PROJECTS_DATA.length - 1 ? 0 : prev + 1));
    };

    return (
        <section className="prj" id="projects" ref={ref}>
            {/* Background watermark & subtle ambient grid */}
            <div className="prj__bg-decorations" aria-hidden="true">
                <div className="prj__bg-word">PROJECTS</div>
                <div className="prj__bg-grid" />
            </div>

            <div className="prj__inner">

                {/* Section Header */}
                <div className="prj__heading-block">
                    <motion.div
                        className="prj__rule"
                        initial={{ scaleX: 0 }}
                        animate={inView ? { scaleX: 1 } : {}}
                        transition={{ duration: 1.2, ease: expo }}
                    />
                    <div className="prj__heading-row">
                        <div>
                            <motion.h2
                                className="prj__heading"
                                initial={{ opacity: 0, y: 36 }}
                                animate={inView ? { opacity: 1, y: 0 } : {}}
                                transition={{ duration: 0.85, ease: expo, delay: 0.1 }}
                            >
                                Featured Projects
                            </motion.h2>
                            <motion.p
                                className="prj__sub"
                                initial={{ opacity: 0, y: 20 }}
                                animate={inView ? { opacity: 1, y: 0 } : {}}
                                transition={{ duration: 0.75, ease: expo, delay: 0.2 }}
                            >
                                My engineering stuff
                            </motion.p>
                        </div>
                    </div>
                </div>

                {/* SUBSECTION NAVIGATION (TAB BAR + ARROWS CONTROLLER) */}
                <motion.div
                    className="prj__subnav"
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, ease: expo, delay: 0.25 }}
                >
                    {/* Horizontal Project Tabs */}
                    <div className="prj__tabs" role="tablist" aria-label="Projects Navigation">
                        {PROJECTS_DATA.map((project, idx) => {
                            const isActive = idx === activeIndex;
                            return (
                                <button
                                    key={project.id}
                                    role="tab"
                                    aria-selected={isActive}
                                    className={`prj__tab-btn ${isActive ? 'prj__tab-btn--active' : ''}`}
                                    onClick={() => setActiveIndex(idx)}
                                    style={{ '--tab-accent': project.accentColor }}
                                >
                                    <span className="prj__tab-num">{project.num}</span>
                                    <span className="prj__tab-title">{project.title}</span>

                                    {/* Smooth animated active indicator pill */}
                                    {isActive && (
                                        <motion.div
                                            className="prj__tab-active-pill"
                                            layoutId="activeProjectPill"
                                            transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                                        />
                                    )}
                                </button>
                            );
                        })}
                    </div>

                    {/* Compact Arrow Controller & Step Counter */}
                    <div className="prj__controls">
                        <span className="prj__counter">
                            <strong className="prj__counter-active">{activeProject.num}</strong>
                            <span className="prj__counter-sep">/</span>
                            <span className="prj__counter-total">0{PROJECTS_DATA.length}</span>
                        </span>
                        <div className="prj__arrow-group">
                            <motion.button
                                className="prj__arrow-btn"
                                onClick={handlePrev}
                                whileHover={{ scale: 1.08 }}
                                whileTap={{ scale: 0.92 }}
                                aria-label="Previous project"
                            >
                                <FiChevronLeft size={20} />
                            </motion.button>
                            <motion.button
                                className="prj__arrow-btn"
                                onClick={handleNext}
                                whileHover={{ scale: 1.08 }}
                                whileTap={{ scale: 0.92 }}
                                aria-label="Next project"
                            >
                                <FiChevronRight size={20} />
                            </motion.button>
                        </div>
                    </div>
                </motion.div>

                {/* DISPLAY CARD PANEL FOR ACTIVE PROJECT */}
                <div
                    className="prj__showcase"
                    style={{ '--proj-accent': activeProject.accentColor }}
                >
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeProject.id}
                            className="prj__card"
                            initial={{ opacity: 0, y: 16, scale: 0.99 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -16, scale: 0.99 }}
                            transition={{ duration: 0.4, ease: expo }}
                        >
                            {/* Top subtle accent line */}
                            <div className="prj__card-top-accent" />

                            {/* Card Content Header */}
                            <div className="prj__card-header">
                                <div className="prj__card-header-main">
                                    <div className="prj__card-title-group">
                                        <h3 className="prj__card-title">{activeProject.title}</h3>
                                        <p className="prj__card-subtitle">{activeProject.subtitle}</p>
                                    </div>
                                    <div className="prj__avatar-wrap">
                                        {activeProject.image ? (
                                            <img
                                                src={activeProject.image}
                                                alt={`${activeProject.title} emblem`}
                                                className="prj__avatar-img"
                                            />
                                        ) : (
                                            <div className="prj__avatar-placeholder">
                                                <CategoryIcon size={24} />
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Overview Section */}
                            <div className="prj__section">
                                <h4 className="prj__section-label">OVERVIEW</h4>
                                <p className="prj__desc">{activeProject.description}</p>
                            </div>

                            {/* Key Highlights Section */}
                            <div className="prj__section">
                                <h4 className="prj__section-label">KEY HIGHLIGHTS</h4>
                                <div className="prj__features-grid">
                                    {activeProject.keyFeatures.map((feat, idx) => (
                                        <div key={idx} className="prj__feature-item">
                                            <div className="prj__feature-icon-wrap">
                                                <FiCheckCircle size={15} />
                                            </div>
                                            <span>{feat}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Tech Stack Pills */}
                            <div className="prj__section">
                                <h4 className="prj__section-label">TECHNOLOGY STACK</h4>
                                <div className="prj__stack-wrap">
                                    {activeProject.techStack.map((tech) => (
                                        <span key={tech} className="prj__tech-pill">
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* Footer Action Links */}
                            <div className="prj__card-footer">
                                {activeProject.archImage && (
                                    <button
                                        onClick={() => setSelectedArchImage({ img: activeProject.archImage, title: activeProject.title })}
                                        className="prj__action-btn prj__action-btn--primary"
                                    >
                                        <FiImage size={18} />
                                        <span>Architecture Diagram</span>
                                    </button>
                                )}

                                {activeProject.githubUrl && (
                                    <a
                                        href={activeProject.githubUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="prj__action-btn prj__action-btn--primary"
                                    >
                                        <FiGithub size={18} />
                                        <span>Source Code</span>
                                    </a>
                                )}

                                {activeProject.liveUrl && (
                                    <a
                                        href={activeProject.liveUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="prj__action-btn prj__action-btn--secondary"
                                    >
                                        <FiExternalLink size={18} />
                                        <span>Live Demo</span>
                                    </a>
                                )}
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>

            </div>

            {/* ARCHITECTURE IMAGE MODAL */}
            <AnimatePresence>
                {selectedArchImage && (
                    <motion.div
                        className="prj__modal-backdrop"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setSelectedArchImage(null)}
                    >
                        <motion.div
                            className="prj__modal-card"
                            initial={{ opacity: 0, scale: 0.92, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.92, y: 20 }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="prj__modal-header">
                                <h4 className="prj__modal-title">{selectedArchImage.title} — System Architecture</h4>
                                <button className="prj__modal-close" onClick={() => setSelectedArchImage(null)}>
                                    <FiX size={20} />
                                </button>
                            </div>
                            <div className="prj__modal-body">
                                <img src={selectedArchImage.img} alt="System Architecture Diagram" className="prj__modal-img" />
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}


