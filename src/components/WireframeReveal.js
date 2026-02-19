import React from 'react';
import { motion } from 'framer-motion';
import '../styles.css';

const WireframeReveal = ({ children, className = "", style = {} }) => {
    return (
        <motion.div
            className={className}
            style={style}
            initial={{
                opacity: 0,
                scale: 0.95,
                borderStyle: 'dashed',
                borderWidth: '1px',
                borderColor: 'rgba(0, 255, 255, 0.3)',
                background: 'transparent'
            }}
            whileInView={{
                opacity: 1,
                scale: 1,
                borderStyle: 'solid',
                borderWidth: [null, '2px'],
                borderColor: [null, 'var(--neon-cyan)'],
                background: [null, 'var(--bg-panel)']
            }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{
                duration: 0.8,
                ease: "anticipate",
                background: { delay: 0.4, duration: 0.4 } // Fill background after border appears
            }}
        >
            {children}
        </motion.div>
    );
};

export default WireframeReveal;
