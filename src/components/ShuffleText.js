import React, { useEffect, useRef, useState } from 'react';

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';

function shuffleArray(arr) {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

/**
 * ShuffleText — randomized reveal, 1.5x speed, flicker effect
 * @param {string}  text      Final display text
 * @param {number}  duration  Animation duration ms (default 930 = 1400/1.5)
 * @param {number}  delay     Delay before starting ms
 * @param {string}  className Additional CSS class
 */
export default function ShuffleText({ text, duration = 930, delay = 0, className = '' }) {
    const [display, setDisplay] = useState(() =>
        text.split('').map(c => c === ' ' ? ' ' : CHARS[Math.floor(Math.random() * CHARS.length)]).join('')
    );
    const [animating, setAnimating] = useState(true);
    const rafRef = useRef(null);

    useEffect(() => {
        // Pre-compute random resolution order (Fisher-Yates)
        const nonSpaceIndices = text.split('').map((c, i) => c !== ' ' ? i : null).filter(i => i !== null);
        const order = shuffleArray(nonSpaceIndices);
        const resolved = new Set();
        let start = null;
        let timeout;

        const step = (timestamp) => {
            if (!start) start = timestamp;
            const elapsed = timestamp - start;
            const progress = Math.min(elapsed / duration, 1);

            // Resolve characters in random order based on progress
            const resolveCount = Math.floor(progress * order.length);
            for (let i = 0; i < resolveCount; i++) resolved.add(order[i]);

            const chars = text.split('').map((char, i) => {
                if (char === ' ') return ' ';
                if (resolved.has(i)) return char;
                // Flicker: ~18% chance to show nothing (visual blink)
                if (Math.random() < 0.18) return '\u00B7'; // middle dot = flickering gap
                return CHARS[Math.floor(Math.random() * CHARS.length)];
            }).join('');

            setDisplay(chars);

            if (progress < 1) {
                rafRef.current = requestAnimationFrame(step);
            } else {
                setDisplay(text);
                setAnimating(false);
            }
        };

        timeout = setTimeout(() => {
            setAnimating(true);
            rafRef.current = requestAnimationFrame(step);
        }, delay);

        return () => {
            clearTimeout(timeout);
            if (rafRef.current) cancelAnimationFrame(rafRef.current);
        };
    }, []);

    return (
        <span className={`${className}${animating ? ' shuffle-text--animating' : ''}`}>
            {display}
        </span>
    );
}
