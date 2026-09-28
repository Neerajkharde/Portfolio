import { motion } from 'framer-motion';
import { FiGithub, FiLinkedin, FiMail, FiArrowUp, FiCode, FiHeart } from 'react-icons/fi';
import './Footer.css';

const expo = [0.16, 1, 0.3, 1];

export default function Footer() {
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const scrollToSection = (id) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <footer className="ft">
            <div className="ft__inner">

                {/* Top Divider with subtle gradient glow */}
                <div className="ft__rule-wrap">
                    <div className="ft__rule" />
                </div>

                {/* Main Content Row */}
                <div className="ft__main">

                    {/* Left: Brand Branding & Tagline */}
                    <div className="ft__brand-col">
                        <div className="ft__logo" onClick={scrollToTop}>
                            <span>NEERAJ KHARDE</span>
                            <span className="ft__logo-dot" />
                        </div>
                        <p className="ft__tagline">
                            Chasing Excellence.
                        </p>
                    </div>

                    {/* Middle: Quick Links */}
                    <div className="ft__links-col">
                        <span className="ft__col-title">NAVIGATION</span>
                        <ul className="ft__nav">
                            <li><button onClick={() => scrollToSection('hero')}>Home</button></li>
                            <li><button onClick={() => scrollToSection('about')}>About</button></li>
                            <li><button onClick={() => scrollToSection('experience')}>Experience</button></li>
                            <li><button onClick={() => scrollToSection('stack')}>Tech Stack</button></li>
                        </ul>
                    </div>

                    {/* Right: Social Connections & Back to Top */}
                    <div className="ft__social-col">
                        <span className="ft__col-title">CONNECT</span>
                        <div className="ft__socials">
                            <a
                                href="https://github.com/Neerajkharde"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="ft__social-btn"
                                aria-label="GitHub"
                            >
                                <FiGithub size={18} />
                            </a>
                            <a
                                href="https://www.linkedin.com/in/neerajkharde/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="ft__social-btn"
                                aria-label="LinkedIn"
                            >
                                <FiLinkedin size={18} />
                            </a>
                            <a
                                href="mailto:neerajkharde7@gmail.com"
                                className="ft__social-btn"
                                aria-label="Email"
                            >
                                <FiMail size={18} />
                            </a>
                            <a
                                href="https://leetcode.com/u/neeraj_g0091e/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="ft__social-btn"
                                aria-label="LeetCode"
                            >
                                <FiCode size={18} />
                            </a>
                        </div>

                        <motion.button
                            className="ft__top-btn"
                            onClick={scrollToTop}
                            whileHover={{ y: -4 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <span>Back to top</span>
                            <FiArrowUp size={15} />
                        </motion.button>
                    </div>

                </div>

                {/* Bottom Bar: Copyright & Tech Attribution */}
                <div className="ft__bottom">
                    <span className="ft__copy">
                        © {new Date().getFullYear()} Neeraj Kharde. All rights reserved.
                    </span>
                    <span className="ft__built-with">
                        Keep Growing <FiHeart size={13} className="ft__heart-icon" /> 
                    </span>
                </div>

            </div>
        </footer>
    );
}
