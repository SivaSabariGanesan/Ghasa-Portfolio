"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

interface Project {
    id: number;
    title: string;
    category: string;
    year: string;
    image: string;
    link: string;
}

const projects: Project[] = [
    {
        id: 1,
        title: "Blockchain Based Voting System",
        category: "DAPP",
        year: "2024",
        image: "https://tse4.mm.bing.net/th/id/OIP.b4jNIa0WiOgocryD0ZuK8QHaEK?pid=Api&P=0&h=180",
        link: "#",
    },
    {
        id: 2,
        title: "Decentralized Certificate Verification System",
        category: "DAPP",
        year: "2024",
        image: "https://tse2.mm.bing.net/th/id/OIP.Sy5OgttRgutK-mO-ifON8gHaEb?pid=Api&P=0&h=180",
        link: "#",
    },
    {
        id: 3,
        title: "Decentralised Insurance System",
        category: "DAPP",
        year: "2024",
        image: "https://www.antiersolutions.com/blogs/wp-content/uploads/2023/07/Decentralized-Insurance-Platforms-Pioneering-the-Future.jpg",
        link: "#",
    },
    {
        id: 4,
        title: "Optimization Transportation System",
        category: "IOT & WEBAPP",
        year: "2024",
        image: "https://www.upperinc.com/wp-content/uploads/2023/05/ai-route-optimization-upperinc.png",
        link: "#",
    },
];

export default function ProjectsSection() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const itemsRef = useRef<(HTMLDivElement | null)[]>([]);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        const ctx = gsap.context(() => {
            // Title reveal animation
            gsap.fromTo(
                ".projects-title",
                { y: 50, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 1,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 70%",
                    },
                }
            );

            // Entry & Parallax animations for each project item
            itemsRef.current.forEach((item) => {
                if (!item) return;

                const image = item.querySelector(".project-peak-img");
                const content = item.querySelector(".project-peak-content");
                const title = item.querySelector("h3");
                const meta = item.querySelectorAll("span");

                // Initial states
                gsap.set(item, { perspective: 1000 });
                gsap.set(image, { scale: 1.2, yPercent: -15, opacity: 0 });
                gsap.set(content, { opacity: 0 });
                gsap.set([title, ...meta], { y: 30, opacity: 0 });

                // 1. Reveal Timeline
                const tl = gsap.timeline({
                    scrollTrigger: {
                        trigger: item,
                        start: "top 80%",
                    }
                });

                tl.to(image, {
                    opacity: 1,
                    scale: 1,
                    duration: 1.2,
                    ease: "power3.inOut",
                })
                    .to(content, {
                        opacity: 1,
                        duration: 0.5,
                    }, "-=0.6")
                    .to([title, ...meta], {
                        y: 0,
                        opacity: 1,
                        duration: 0.8,
                        stagger: 0.1,
                        ease: "power2.out",
                    }, "-=0.4");

                // 2. Continuous Image Parallax on Scroll
                gsap.to(image, {
                    yPercent: 15, // Moves down as you scroll
                    ease: "none",
                    scrollTrigger: {
                        trigger: item,
                        start: "top bottom",
                        end: "bottom top",
                        scrub: true,
                    },
                });
            });

            // 3. Desktop 3D Hover Tilt Effect
            const matchMedia = gsap.matchMedia();
            matchMedia.add("(min-width: 1025px)", () => {
                const cleanupFns: (() => void)[] = [];

                itemsRef.current.forEach((item) => {
                    if (!item) return;

                    const innerWrapper = item.querySelector(".project-peak-link");

                    const onMouseMove = (e: MouseEvent) => {
                        const rect = item.getBoundingClientRect();
                        const x = e.clientX - rect.left;
                        const y = e.clientY - rect.top;

                        const xCenter = rect.width / 2;
                        const yCenter = rect.height / 2;

                        // Calculate tilt angles
                        const rotateX = ((y - yCenter) / yCenter) * -8; // max 8 deg
                        const rotateY = ((x - xCenter) / xCenter) * 8;

                        gsap.to(innerWrapper, {
                            rotateX,
                            rotateY,
                            scale: 1.02,
                            transformPerspective: 1000,
                            transformOrigin: "center center",
                            ease: "power2.out",
                            duration: 0.4
                        });
                    };

                    const onMouseLeave = () => {
                        gsap.to(innerWrapper, {
                            rotateX: 0,
                            rotateY: 0,
                            scale: 1,
                            ease: "elastic.out(1, 0.3)",
                            duration: 1.2
                        });
                    };

                    item.addEventListener("mousemove", onMouseMove);
                    item.addEventListener("mouseleave", onMouseLeave);

                    cleanupFns.push(() => {
                        item.removeEventListener("mousemove", onMouseMove);
                        item.removeEventListener("mouseleave", onMouseLeave);
                    });
                });

                return () => cleanupFns.forEach(fn => fn());
            });

        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <div id="projects-section" ref={sectionRef}>
            <h2 className="projects-title">FEATURED PROJECTS</h2>

            <div className="projects-grid">
                {projects.map((project, i) => (
                    <div
                        key={project.id}
                        className="project-peak-item"
                        ref={(el: HTMLDivElement | null) => {
                            itemsRef.current[i] = el;
                        }}
                    >
                        <a href={project.link} className="project-peak-link">
                            <div className="project-peak-img-wrapper">
                                <Image
                                    src={project.image}
                                    alt={project.title}
                                    fill
                                    className="project-peak-img"
                                    style={{ objectFit: "cover", objectPosition: "center" }}
                                    unoptimized // since we are using external urls for example
                                />
                                <div className="project-peak-overlay"></div>
                            </div>
                            <div className="project-peak-content">
                                <div className="project-peak-meta">
                                    <span>{project.category}</span>
                                    <span>{project.year}</span>
                                </div>
                                <h3>{project.title}</h3>
                            </div>
                        </a>
                    </div>
                ))}
            </div>
        </div>
    );
}
