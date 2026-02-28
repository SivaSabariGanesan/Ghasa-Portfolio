"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function Footer() {
    const footerRef = useRef<HTMLElement>(null);
    const textRef = useRef<HTMLHeadingElement>(null);
    const linksRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Register plugin to ensure client-side execution
        gsap.registerPlugin(ScrollTrigger);

        const ctx = gsap.context(() => {
            // 1. Footer background reveal
            gsap.fromTo(
                footerRef.current,
                { y: 50, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 1.2,
                    ease: "expo.out",
                    scrollTrigger: {
                        trigger: footerRef.current,
                        start: "top 95%",
                        toggleActions: "play none none reverse",
                    },
                }
            );

            // 2. Huge text reveal using a 3D rotation effect
            if (textRef.current) {
                gsap.fromTo(
                    textRef.current,
                    { y: 200, opacity: 0, rotationX: -80 },
                    {
                        y: 0,
                        opacity: 1,
                        rotationX: 0,
                        duration: 1.5,
                        ease: "expo.out",
                        scrollTrigger: {
                            trigger: footerRef.current,
                            start: "top 80%",
                            toggleActions: "play none none reverse",
                        },
                    }
                );
            }

            // 3. Links and text stagger reveal
            if (linksRef.current) {
                const links = linksRef.current.querySelectorAll("a, h4, p");
                gsap.fromTo(
                    links,
                    { y: 30, opacity: 0, rotationX: -20 },
                    {
                        y: 0,
                        opacity: 1,
                        rotationX: 0,
                        stagger: 0.1,
                        duration: 1.2,
                        ease: "power3.out",
                        scrollTrigger: {
                            trigger: footerRef.current,
                            start: "top 75%",
                            toggleActions: "play none none reverse",
                        },
                    }
                );
            }
        }, footerRef);

        return () => ctx.revert(); // Cleanup on unmount
    }, []);

    return (
        <footer id="gsap-footer" ref={footerRef}>
            <div className="footer-top">
                <div className="footer-huge-text">
                    <h1 ref={textRef}>TEAM GHASA</h1>
                </div>
            </div>

            <div className="footer-bottom" ref={linksRef}>
                <div className="footer-left-info">
                    <h4>&copy; team ghasa 2025</h4>
                    <p>Crafting digital experiences</p>
                </div>

                <div className="footer-right-links">
                    <a href="#" target="_blank" rel="noopener noreferrer">
                        Facebook
                    </a>
                    <a href="#" target="_blank" rel="noopener noreferrer">
                        Github
                    </a>
                    <a href="#" target="_blank" rel="noopener noreferrer">
                        Instagram
                    </a>
                    <a href="#" target="_blank" rel="noopener noreferrer">
                        Twitter
                    </a>
                </div>
            </div>
        </footer>
    );
}
