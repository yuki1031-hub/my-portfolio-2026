import React from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import '../styles.css';
import PixelCat from './PixelCat';

const CyberLayout = ({ children }) => {
    const { scrollY } = useScroll();

    // Hue shift based on scroll
    const hue = useTransform(scrollY, [0, 5000], [0, 360]);
    const colorSpring = useSpring(hue, { stiffness: 10, damping: 20 });

    // Parallax grid movement
    const gridY = useTransform(scrollY, [0, 5000], [0, 500]);

    return (
        <div className="cyber-layout">
            <motion.div
                className="scanlines"
                style={{ pointerEvents: 'none' }}
            />

            {/* Dynamic Grid Background */}
            <motion.div
                className="cyber-grid"
                style={{
                    y: gridY,
                    filter: useTransform(colorSpring, (h) => `hue-rotate(${h}deg)`)
                }}
            />

            <div className="content-wrapper" style={{ position: 'relative', zIndex: 1 }}>
                {children}
            </div>

            <PixelCat />
        </div>
    );
};

export default CyberLayout;
