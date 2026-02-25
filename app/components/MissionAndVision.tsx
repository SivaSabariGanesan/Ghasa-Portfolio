"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const MissionAndVision = () => {
    const missionRef = useRef<HTMLDivElement>(null);
    const visionRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        gsap.set([missionRef.current, visionRef.current], { opacity: 0, x: 50 });

        const mvTl = gsap.timeline({
            scrollTrigger: {
                trigger: missionRef.current,
                start: "top bottom-=50",
                end: "bottom top+=100",
                toggleActions: "play none none reverse",
            },
        });

        // Match TeamPortfolio: animates to x:-20 (slight overshoot left)
        mvTl.to(missionRef.current, {
            opacity: 1,
            x: -20,
            duration: 1,
            ease: "power2.inOut",
        });
        mvTl.to(
            visionRef.current,
            { opacity: 1, x: -20, duration: 1, ease: "power2.inOut" },
            "-=0.7"
        );

        return () => {
            ScrollTrigger.getAll().forEach((t) => t.kill());
        };
    }, []);

    return (
        <div className="mv-grid">
            <div ref={missionRef} id="mv-mission" className="mv-card">
                <h3 className="mv-title">Mission</h3>
                <p className="mv-text">
                    We aim to be a recognized team of developers known for delivering
                    impactful digital solutions and inspiring others through our work.
                </p>
            </div>
            <div ref={visionRef} id="mv-vision" className="mv-card">
                <h3 className="mv-title">Vision</h3>
                <p className="mv-text">
                    Our vision is to build innovative, efficient, and user-friendly
                    websites that showcase our skills, creativity, and passion for
                    technology.
                </p>
            </div>
        </div>
    );
};

export default MissionAndVision;
