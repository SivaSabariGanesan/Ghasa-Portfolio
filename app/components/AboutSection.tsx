"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AboutUsCarousel from "./AboutUsCarousel";
import MissionAndVision from "./MissionAndVision";
import BackgroundEffect from "./BackgroundEffect";

gsap.registerPlugin(ScrollTrigger);

const AboutSection = () => {
    const titleRef = useRef<HTMLHeadingElement>(null);
    const parasRef = useRef<HTMLSpanElement[]>([]);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Set initial states matching TeamPortfolio .title CSS (opacity:0, translateX(-56px))
            gsap.set(titleRef.current, { opacity: 0, x: -56 });
            gsap.set(parasRef.current, { opacity: 0, y: 20 });

            const aboutTl = gsap.timeline({
                scrollTrigger: {
                    trigger: "#about-section",
                    start: "top bottom-=100",
                    end: "bottom top+=100",
                    toggleActions: "play none none reverse",
                },
            });

            // Matches TeamPortfolio initAboutUsAnimations exactly
            aboutTl.to(titleRef.current, { opacity: 1, x: 0, duration: 1 });
            aboutTl.to(
                parasRef.current,
                { opacity: 1, y: 0, stagger: 0.2, duration: 0.6 },
                "-=0.5"
            );
        });

        return () => ctx.revert();
    }, []);

    const addParaRef = (el: HTMLSpanElement | null) => {
        if (el && !parasRef.current.includes(el)) parasRef.current.push(el);
    };

    return (
        <section id="about-section" className="about-section content-section">
            <BackgroundEffect
                variant="about"
                opacity={0.4}
                circleColors={[
                    "rgba(5, 105, 188, 0.2), rgba(5, 105, 188, 0.05)",
                    "rgba(15, 38, 95, 0.3), rgba(15, 38, 95, 0.05)",
                    "rgba(0, 40, 70, 0.3), rgba(0, 40, 70, 0.05)",
                ]}
            />

            <h1 ref={titleRef} className="section-title">
                About Us
            </h1>

            <div className="about-grid">
                <AboutUsCarousel />

                <div className="about-text-col">
                    <p className="about-para-text">
                        <span ref={addParaRef} className="about-para">
                            We&apos;re team <strong>Ghasa</strong> from Tamil Nadu,{" "}
                        </span>
                        <span ref={addParaRef} className="about-para">
                            each with a unique spark, but united by one goal: to build
                            solutions that matter.{" "}
                        </span>
                        <span ref={addParaRef} className="about-para">
                            We push the limits, break the mold, and turn ideas into action.
                            With creativity, determination, and passion,{" "}
                        </span>
                        <span ref={addParaRef} className="about-para">
                            we&apos;re ready to take on any challenge and leave our mark.
                            Welcome to our journey—{" "}
                            <strong>let&apos;s build something unforgettable!</strong>
                        </span>
                    </p>
                    <MissionAndVision />
                </div>
            </div>
        </section>
    );
};

export default AboutSection;
