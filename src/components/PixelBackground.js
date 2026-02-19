import React, { useEffect, useRef } from 'react';

const PixelBackground = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        let width, height;
        let animationFrameId;

        let particles = [];
        let hue = 220;

        let mouse = { x: -1000, y: -1000 };
        let mouseVel = { x: 0, y: 0 };

        class NebulaParticle {
            constructor() {
                this.x = Math.random() * width;
                this.y = Math.random() * height;
                this.vx = (Math.random() - 0.5) * 0.4;
                this.vy = (Math.random() - 0.5) * 0.4;

                this.baseRadius = 250 + Math.random() * 300;
                this.radius = this.baseRadius;

                this.morphSpeed = 0.005 + Math.random() * 0.01;
                this.morphOffset = Math.random() * 100;

                this.baseAlpha = 0.2 + Math.random() * 0.3;
                this.currentAlpha = this.baseAlpha; // For interaction
                this.hueOffset = Math.random() * 80 - 40;

                this.shapePoints = [];
                const numPoints = 8 + Math.floor(Math.random() * 5);
                for (let i = 0; i < numPoints; i++) {
                    this.shapePoints.push(0.8 + Math.random() * 0.4);
                }
                this.rotation = Math.random() * Math.PI * 2;
                this.rotationSpeed = (Math.random() - 0.5) * 0.002;
            }

            update(time) {
                const angle = time * 0.0002 + this.morphOffset;
                this.vx += Math.sin(angle) * 0.005;
                this.vy += Math.cos(angle) * 0.005;

                const speed = Math.sqrt(this.vx * this.vx + this.vy * this.vy);
                if (speed > 1) {
                    this.vx = (this.vx / speed) * 1;
                    this.vy = (this.vy / speed) * 1;
                }

                this.x += this.vx;
                this.y += this.vy;
                this.rotation += this.rotationSpeed;

                this.radius = this.baseRadius + Math.sin(time * this.morphSpeed + this.morphOffset) * 30;

                // Mouse interaction
                const dx = this.x - mouse.x;
                const dy = this.y - mouse.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                const interactRadius = 400;

                if (dist < interactRadius) {
                    const force = (interactRadius - dist) / interactRadius;

                    // 1. Repulsion (Move away)
                    this.vx += (dx / dist) * force * 0.5; // Stronger push
                    this.vy += (dy / dist) * force * 0.5;

                    // 2. Brightness Boost (Highlight)
                    this.currentAlpha = Math.min(this.baseAlpha + force * 0.4, 0.8);

                    // 3. Spin faster
                    this.rotation += force * 0.05;
                } else {
                    // Return to base alpha
                    if (this.currentAlpha > this.baseAlpha) {
                        this.currentAlpha -= 0.01;
                    }
                }

                const buffer = 400;
                if (this.x < -buffer) this.x = width + buffer;
                if (this.x > width + buffer) this.x = -buffer;
                if (this.y < -buffer) this.y = height + buffer;
                if (this.y > height + buffer) this.y = -buffer;
            }

            draw(ctx) {
                ctx.globalCompositeOperation = 'hard-light';

                ctx.save();
                ctx.translate(this.x, this.y);
                ctx.rotate(this.rotation);

                const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, this.radius);
                const currentHue = (hue + this.hueOffset) % 360;

                // Use currentAlpha which reacts to mouse
                gradient.addColorStop(0, `hsla(${currentHue}, 40%, 60%, ${this.currentAlpha})`);
                gradient.addColorStop(0.5, `hsla(${currentHue}, 30%, 50%, ${this.currentAlpha * 0.5})`);
                gradient.addColorStop(1, `hsla(${currentHue}, 30%, 10%, 0)`);

                ctx.fillStyle = gradient;

                ctx.beginPath();
                const totalPoints = this.shapePoints.length;

                for (let i = 0; i <= totalPoints; i++) {
                    const index = i % totalPoints;
                    const theta = (i / totalPoints) * Math.PI * 2;
                    const scale = this.shapePoints[index];

                    const px = Math.cos(theta) * this.radius * scale;
                    const py = Math.sin(theta) * this.radius * scale;

                    if (i === 0) ctx.moveTo(px, py);
                    else ctx.lineTo(px, py);
                }

                ctx.closePath();
                ctx.shadowBlur = 50;
                ctx.shadowColor = `hsla(${currentHue}, 40%, 50%, 0.3)`;
                ctx.fill();

                ctx.restore();
                ctx.globalCompositeOperation = 'source-over';
            }
        }

        const init = () => {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;

            particles = [];
            for (let i = 0; i < 35; i++) {
                particles.push(new NebulaParticle());
            }
        };

        const draw = (time) => {
            ctx.fillStyle = '#050510';
            ctx.fillRect(0, 0, width, height);

            hue = (hue + 0.1) % 360;

            // Decaying mouse velocity for other effects if needed
            mouseVel.x *= 0.95;
            mouseVel.y *= 0.95;

            particles.forEach(p => {
                p.update(time);
                p.draw(ctx);
            });
        };

        const animate = (time) => {
            draw(time);
            animationFrameId = requestAnimationFrame(animate);
        };

        const handleResize = () => {
            init();
        };

        const handleMouseMove = (e) => {
            const rect = canvas.getBoundingClientRect();
            const currentX = e.clientX - rect.left;
            const currentY = e.clientY - rect.top;

            mouseVel.x = currentX - mouse.x;
            mouseVel.y = currentY - mouse.y;
            mouse.x = currentX;
            mouse.y = currentY;
        };

        window.addEventListener('resize', handleResize);
        window.addEventListener('mousemove', handleMouseMove);

        init();
        animate(0);

        return () => {
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('mousemove', handleMouseMove);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                zIndex: 0,
                pointerEvents: 'none'
            }}
        />
    );
};

export default PixelBackground;
