import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import {
    FiCode,
    FiServer,
    FiCpu,
    FiGlobe,
    FiZap,
    FiShare2,
    FiDatabase
} from 'react-icons/fi';
import {
    SiCplusplus,
    SiGo,
    SiPostgresql,
    SiMongodb,
    SiRedis,
    SiSpringboot,
    SiHibernate,
    SiPostman,
    SiDocker,
    SiSpringsecurity
} from 'react-icons/si';
import { FaJava } from 'react-icons/fa6';
import './Stack.css';

const expo = [0.16, 1, 0.3, 1];

// Safe Icon Renderer wrapper
function SafeIcon({ icon: IconComponent, fallback: FallbackIcon = FiCode, size = 20, style }) {
    const ComponentToRender = IconComponent || FallbackIcon;
    return <ComponentToRender size={size} style={style} />;
}

// 3D Tilt & Interactive Parallax Card Component
function InteractiveTiltCard({ cat, catIdx, inView }) {
    const cardRef = useRef(null);
    const [tilt, setTilt] = useState({ x: 0, y: 0, mouseX: 50, mouseY: 50 });
    const HeaderIcon = cat.icon;

    const handleMouseMove = (e) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        // Calculate rotation tilt (-10 to 10 deg)
        const rotateX = ((mouseY - height / 2) / (height / 2)) * -8;
        const rotateY = ((mouseX - width / 2) / (width / 2)) * 8;

        const mousePercentX = (mouseX / width) * 100;
        const mousePercentY = (mouseY / height) * 100;

        setTilt({ x: rotateX, y: rotateY, mouseX: mousePercentX, mouseY: mousePercentY });
    };

    const handleMouseLeave = () => {
        setTilt({ x: 0, y: 0, mouseX: 50, mouseY: 50 });
    };

    return (
        <motion.div
            ref={cardRef}
            className="st-cat-card"
            style={{
                '--cat-accent': cat.accentColor,
                '--rx': `${tilt.x}deg`,
                '--ry': `${tilt.y}deg`,
                '--mx': `${tilt.mouseX}%`,
                '--my': `${tilt.mouseY}%`
            }}
            initial={{ opacity: 0, y: 36 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: expo, delay: catIdx * 0.12 }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
        >
            {/* Glowing Border Line Flow */}
            <div className="st-cat-card__border-flow" />

            {/* Dynamic Cursor Spotlight Effect */}
            <div className="st-cat-card__spotlight" />

            {/* Card Header */}
            <div className="st-cat-card__top">
                <div className="st-cat-card__header-title">
                    <motion.div
                        className="st-cat-card__badge"
                        whileHover={{ rotate: 360, scale: 1.1 }}
                        transition={{ duration: 0.6, ease: expo }}
                    >
                        <HeaderIcon size={18} />
                    </motion.div>
                    <h3 className="st-cat-card__title">{cat.title}</h3>
                </div>
            </div>

            {/* Interactive Tech Pills Wrap */}
            <div className="st-cat-card__pills">
                {cat.items.map((item, i) => (
                    <motion.div
                        key={item.name}
                        className="st-pill"
                        style={{ '--item-color': item.color }}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={inView ? { opacity: 1, scale: 1 } : {}}
                        transition={{ duration: 0.4, ease: expo, delay: 0.2 + i * 0.04 }}
                        whileHover={{ scale: 1.08, y: -2 }}
                        whileTap={{ scale: 0.96 }}
                    >
                        <span className="st-pill__glow" />
                        <SafeIcon icon={item.icon} size={18} style={{ color: item.color }} />
                        <span className="st-pill__name">{item.name}</span>
                    </motion.div>
                ))}
            </div>

            {/* Corner Accent Ticks */}
            <span className="st-corner st-corner--tl" />
            <span className="st-corner st-corner--tr" />
            <span className="st-corner st-corner--bl" />
            <span className="st-corner st-corner--br" />
        </motion.div>
    );
}

const STACK_CATEGORIES = [
    {
        id: 'languages',
        num: '01',
        title: 'Languages',
        accentColor: '#38bdf8',
        icon: FiCode,
        items: [
            { name: 'C++', icon: SiCplusplus, color: '#00599C' },
            { name: 'JAVA', icon: FaJava, color: '#f89820' },
            { name: 'Golang', icon: SiGo, color: '#00ADD8' },
        ]
    },
    {
        id: 'databases',
        num: '02',
        title: 'Database & Cache',
        accentColor: '#ef4444',
        icon: FiDatabase,
        items: [
            { name: 'PostgreSQL', icon: SiPostgresql, color: '#4169E1' },
            { name: 'MongoDB', icon: SiMongodb, color: '#47A248' },
            { name: 'Redis', icon: SiRedis, color: '#DC382D' },
            { name: 'Ignite', icon: FiZap, color: '#FF4500' },
        ]
    },
    {
        id: 'frameworks',
        num: '03',
        title: 'Framework & Tools',
        accentColor: '#10b981',
        icon: FiServer,
        items: [
            { name: 'Spring Boot', icon: SiSpringboot, color: '#6DB33F' },
            { name: 'Hibernate', icon: SiHibernate, color: '#59666C' },
            { name: 'Postman', icon: SiPostman, color: '#FF6C37' },
            { name: 'Docker', icon: SiDocker, color: '#2496ED' },
            { name: 'gRPC', icon: FiZap, color: '#00d4aa' },
            { name: 'REST APIs', icon: FiShare2, color: '#38bdf8' },
            { name: 'Spring Security', icon: SiSpringsecurity, color: '#6DB33F' },
        ]
    },
    {
        id: 'core',
        num: '04',
        title: 'Core Areas',
        accentColor: '#8b5cf6',
        icon: FiCpu,
        items: [
            { name: 'Data Structures', icon: FiCode, color: '#8b5cf6' },
            { name: 'Networks', icon: FiGlobe, color: '#38bdf8' },
            { name: 'System Design', icon: FiServer, color: '#f59e0b' },
            { name: 'Algorithms', icon: FiCpu, color: '#ec4899' },
        ]
    }
];

export default function Stack() {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: '-80px' });

    return (
        <section className="st" id="stack" ref={ref}>
            {/* Background ghost watermark & grid accent */}
            <div className="st__bg-decorations" aria-hidden="true">
                <div className="st__bg-word">STACK</div>
                <div className="st__bg-grid" />
                {/* Floating ambient particles */}
                <div className="st-particle st-particle--1" />
                <div className="st-particle st-particle--2" />
                <div className="st-particle st-particle--3" />
            </div>

            <div className="st__inner">

                {/* Section Header */}
                <div className="st__heading-block">
                    <motion.div
                        className="st__rule"
                        initial={{ scaleX: 0 }}
                        animate={inView ? { scaleX: 1 } : {}}
                        transition={{ duration: 1.2, ease: expo }}
                    />
                    <div className="st__heading-row">
                        <div>
                            <motion.h2
                                className="st__heading"
                                initial={{ opacity: 0, y: 36 }}
                                animate={inView ? { opacity: 1, y: 0 } : {}}
                                transition={{ duration: 0.85, ease: expo, delay: 0.1 }}
                            >
                                Tech Stack
                            </motion.h2>
                            <motion.p
                                className="st__sub"
                                initial={{ opacity: 0, y: 20 }}
                                animate={inView ? { opacity: 1, y: 0 } : {}}
                                transition={{ duration: 0.75, ease: expo, delay: 0.2 }}
                            >
                                I love working with -
                            </motion.p>
                        </div>
                    </div>
                </div>

                {/* 4 CREATIVE 3D TILT CATEGORY CARDS GRID */}
                <div className="st-four-grid">
                    {STACK_CATEGORIES.map((cat, catIdx) => (
                        <InteractiveTiltCard
                            key={cat.id}
                            cat={cat}
                            catIdx={catIdx}
                            inView={inView}
                        />
                    ))}
                </div>

            </div>
        </section>
    );
}
