import React from 'react';
import { motion } from 'framer-motion';

const PixelCat = () => {
    return (
        <motion.div
            style={{
                position: 'fixed',
                bottom: '20px',
                right: '20px',
                zIndex: 50,
                pointerEvents: 'none',
                width: '64px',
                height: '64px'
            }}
            animate={{
                y: [0, -10, 0],
            }}
            transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
            }}
        >
            <svg viewBox="0 0 32 32" fill="currentColor" style={{ imageRendering: 'pixelated', color: 'var(--neon-cyan)' }}>
                <path d="M7 8h2v2H7zM11 8h2v2h-2zM6 10h1v4H6zM13 10h1v4h-1zM7 14h6v1H7zM8 15h4v1H8zM7 16h1v5H7zM12 16h1v5h-1zM5 21h10v1H5zM4 22h12v1H4zM4 23h2v4H4zM14 23h2v4h-2z" />
                <rect x="8" y="11" width="1" height="1" fill="#fff" />
                <rect x="12" y="11" width="1" height="1" fill="#fff" />
            </svg>
        </motion.div>
    );
};

export default PixelCat;
