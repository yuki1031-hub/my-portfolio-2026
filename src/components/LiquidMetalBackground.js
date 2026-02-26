import React, { useRef, useEffect } from 'react';

/**
 * LiquidMetalBackground
 * 
 * Canvas-based metaball animation creating a liquid metal / mercury effect.
 * Uses the classic CSS "gooey" trick translated to Canvas:
 *   1. Draw blurred blobs on an offscreen canvas
 *   2. Apply a threshold → produces the fused, organic liquid shapes
 * Colour shifts slowly between silver/white/charcoal tones over time.
 */
export default function LiquidMetalBackground() {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d', { willReadFrequently: true });
        let animId;
        let width, height;

        /* ── resize ── */
        const resize = () => {
            width = canvas.width = canvas.offsetWidth;
            height = canvas.height = canvas.offsetHeight;
        };
        resize();
        const ro = new ResizeObserver(resize);
        ro.observe(canvas);

        /* ── blobs ── */
        const BLOB_COUNT = 9;
        const blobs = Array.from({ length: BLOB_COUNT }, (_, i) => ({
            x: Math.random() * width,
            y: Math.random() * height,
            vx: (Math.random() - 0.5) * 0.55,
            vy: (Math.random() - 0.5) * 0.55,
            r: 80 + Math.random() * 160,
            phase: Math.random() * Math.PI * 2,
            speed: 0.003 + Math.random() * 0.004,
        }));

        /* ── offscreen for gooey ── */
        const off = document.createElement('canvas');
        const octx = off.getContext('2d');

        /* ── render loop ── */
        let t = 0;
        const render = () => {
            animId = requestAnimationFrame(render);
            t += 0.005;

            off.width = width;
            off.height = height;

            octx.clearRect(0, 0, width, height);

            /* Move blobs */
            for (const b of blobs) {
                b.x += b.vx + Math.sin(t * 0.7 + b.phase) * 0.4;
                b.y += b.vy + Math.cos(t * 0.5 + b.phase) * 0.4;

                /* Wrap */
                if (b.x < -b.r) b.x = width + b.r;
                if (b.x > width + b.r) b.x = -b.r;
                if (b.y < -b.r) b.y = height + b.r;
                if (b.y > height + b.r) b.y = -b.r;

                /* Compute silver tone: slow oscillation between almost-black and bright white */
                const brightness = 0.55 + 0.45 * Math.sin(t * 1.1 + b.phase);
                const L = Math.floor(brightness * 255);
                /* Slight colour temperature: cool silver has tiny blue bias */
                const R = Math.max(0, L - 10);
                const G = L;
                const B = Math.min(255, L + 14);

                const grad = octx.createRadialGradient(b.x, b.y, 0, b.x, b.y, b.r);
                grad.addColorStop(0, `rgba(${R},${G},${B},0.95)`);
                grad.addColorStop(0.55, `rgba(${R},${G},${B},0.45)`);
                grad.addColorStop(1, `rgba(${R},${G},${B},0)`);

                octx.beginPath();
                octx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
                octx.fillStyle = grad;
                octx.fill();
            }

            /* ── composite to main canvas with gooey filter ── */
            ctx.clearRect(0, 0, width, height);

            /* Dark background */
            ctx.fillStyle = '#050505';
            ctx.fillRect(0, 0, width, height);

            /* Blur + threshold trick via canvas pixel manipulation */
            /* Apply heavy blur to offscreen, then threshold to sharpen edges */
            ctx.filter = 'blur(22px) contrast(18)';
            ctx.drawImage(off, 0, 0);
            ctx.filter = 'none';

            /* Subtle grain overlay for metallic texture */
            const imageData = ctx.getImageData(0, 0, width, height);
            const data = imageData.data;
            const grainStrength = 6;
            for (let i = 0; i < data.length; i += 4) {
                if (data[i + 3] > 30) {
                    const g = (Math.random() - 0.5) * grainStrength;
                    data[i] = Math.min(255, Math.max(0, data[i] + g));
                    data[i + 1] = Math.min(255, Math.max(0, data[i + 1] + g));
                    data[i + 2] = Math.min(255, Math.max(0, data[i + 2] + g));
                }
            }
            ctx.putImageData(imageData, 0, 0);

            /* Specular highlight pass — thin bright veins */
            ctx.globalCompositeOperation = 'screen';
            for (const b of blobs) {
                const px = b.x + Math.cos(t * 0.8 + b.phase) * b.r * 0.3;
                const py = b.y + Math.sin(t * 0.6 + b.phase) * b.r * 0.25;
                const sg = ctx.createRadialGradient(px, py, 0, px, py, b.r * 0.4);
                sg.addColorStop(0, `rgba(255,255,255,0.22)`);
                sg.addColorStop(1, `rgba(255,255,255,0)`);
                ctx.beginPath();
                ctx.arc(px, py, b.r * 0.4, 0, Math.PI * 2);
                ctx.fillStyle = sg;
                ctx.fill();
            }
            ctx.globalCompositeOperation = 'source-over';
        };

        render();

        return () => {
            cancelAnimationFrame(animId);
            ro.disconnect();
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="home-page__canvas"
            aria-hidden="true"
        />
    );
}
