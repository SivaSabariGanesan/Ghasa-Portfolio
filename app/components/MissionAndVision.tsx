"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const MissionAndVision = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const missionRef = useRef<HTMLDivElement>(null);
    const visionRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const mm = gsap.matchMedia();

        const ctx = gsap.context(() => {
            gsap.set([missionRef.current, visionRef.current], { opacity: 0, y: 30 });

            // Entrance animation
            gsap.to([missionRef.current, visionRef.current], {
                opacity: 1,
                y: 0,
                duration: 1,
                stagger: 0.2,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top 85%",
                    toggleActions: "play none none reverse",
                },
            });

            // Subtle hover scaling on icons
            const blocks = document.querySelectorAll('.mv-sleek-block');
            blocks.forEach((block) => {
                const iconContainer = block.querySelector('.mv-sleek-icon');

                block.addEventListener('mouseenter', () => {
                    gsap.to(iconContainer, { scale: 1.1, backgroundColor: 'rgba(255,255,255,0.1)', duration: 0.3 });
                });

                block.addEventListener('mouseleave', () => {
                    gsap.to(iconContainer, { scale: 1, backgroundColor: 'transparent', duration: 0.3 });
                });
            });

        });

        return () => ctx.revert();
    }, []);

    return (
        <div className="mv-sleek-container" ref={containerRef}>
            <div className="mv-sleek-block" ref={missionRef}>
                <div className="mv-sleek-header">
                    <div className="mv-sleek-icon"><i className="ri-focus-2-line"></i></div>
                    <h3>Mission</h3>
                </div>
                <p className="mv-sleek-text">
                    We aim to be a recognized team of developers known for delivering
                    impactful digital solutions and inspiring others through our work.
                </p>
                <div className="mv-sleek-line"></div>
            </div>

            <div className="mv-sleek-block" ref={visionRef}>
                <div className="mv-sleek-header">
                    <div className="mv-sleek-icon"><i className="ri-eye-line"></i></div>
                    <h3>Vision</h3>
                </div>
                <p className="mv-sleek-text">
                    Our vision is to build innovative, efficient, and user-friendly
                    websites that showcase our skills, creativity, and passion for
                    technology.
                </p>
                <div className="mv-sleek-line"></div>
            </div>
        </div>
    );
};

export default MissionAndVision;
