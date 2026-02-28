"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image, { StaticImageData } from "next/image";

import kanpur from "../../public/images/kanpur.png";
import hh from "../../public/images/hh.png";
import pondy from "../../public/images/pondy.png";
import mujx from "../../public/images/muj.png";
import ques from "../../public/images/ques.jpg";

interface Hackathon {
    id: number;
    title: string;
    link: string;
    image: StaticImageData;
}

const hackathons: Hackathon[] = [
    {
        id: 1,
        title: "IIT KANPUR HACKATHON",
        link: "https://haseebjaved4212.github.io/Audira-Headphone-Brand-Website-/",
        image: kanpur,
    },
    {
        id: 2,
        title: "Hack Hustle Saveetha 2024",
        link: "https://haseebjaved4212.github.io/E-Commerce-Store/",
        image: hh,
    },
    {
        id: 3,
        title: "0x Day SMVCE Pondicherry",
        link: "https://haseebjaved4212.github.io/Real-Estate-Agency-Website/",
        image: pondy,
    },
    {
        id: 4,
        title: "MUJX 2.0 Jaipur",
        link: "https://haseebjaved4212.github.io/Ramadan-Special-Website/",
        image: mujx,
    },
    {
        id: 5,
        title: "Hacksamarth 2026",
        link: "https://haseebjaved4212.github.io/Modern-Portfolio-Template/",
        image: ques,
    },
];

export default function HackathonSection() {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        const matchMedia = gsap.matchMedia();

        matchMedia.add(
            {
                isDesktop: "(min-width: 1025px)",
                isMobile: "(max-width: 1024px)",
            },
            (context) => {
                const { isDesktop } = context.conditions as { isDesktop: boolean };
                const elems = document.querySelectorAll<HTMLElement>(".hackathon-elem");

                // 1. ScrollTrigger Reveal Animation for the entire list
                gsap.fromTo(
                    elems,
                    { opacity: 0, y: 50 },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 1,
                        stagger: 0.15,
                        ease: "power3.out",
                        scrollTrigger: {
                            trigger: containerRef.current,
                            start: "top 80%",
                            toggleActions: "play none none reverse",
                        },
                    }
                );

                // 2. Hover Image Reveal (Desktop Only)
                if (isDesktop) {
                    const handlers: Array<{
                        el: HTMLElement;
                        leave: (e: MouseEvent) => void;
                        move: (e: MouseEvent) => void;
                    }> = [];

                    elems.forEach((elem) => {
                        let rotate = 0;
                        let diffrot = 0;

                        const onLeave = () => {
                            gsap.to(elem.querySelector("img"), {
                                opacity: 0,
                                ease: "power3",
                                duration: 0.5,
                            });
                        };

                        const onMove = (e: MouseEvent) => {
                            const diff = e.clientY - elem.getBoundingClientRect().top;
                            diffrot = e.clientX - rotate;
                            rotate = e.clientX;
                            gsap.to(elem.querySelector("img"), {
                                opacity: 1,
                                ease: "power3",
                                top: diff,
                                left: e.clientX,
                                rotate: gsap.utils.clamp(-20, 20, diffrot * 0.5),
                            });
                        };

                        elem.addEventListener("mouseleave", onLeave);
                        elem.addEventListener("mousemove", onMove);
                        handlers.push({ el: elem, leave: onLeave, move: onMove });
                    });

                    return () => {
                        handlers.forEach(({ el, leave, move }) => {
                            el.removeEventListener("mouseleave", leave);
                            el.removeEventListener("mousemove", move);
                        });
                    };
                }

                return undefined;
            }
        );

        return () => matchMedia.revert();
    }, []);

    return (
        <div id="hackathon-section" ref={containerRef}>
            <div className="hackathon-header">
                <h2>HACKATHONS</h2>
            </div>
            <div className="hackathon-list">
                {hackathons.map((hackathon, index) => (
                    <div
                        key={hackathon.id}
                        className={`hackathon-elem ${index === hackathons.length - 1 ? "hackathon-elemlast" : ""
                            }`}
                    >
                        <a href={hackathon.link} target="_blank" rel="noopener noreferrer">
                            <div className="hackathon-img-container">
                                <Image
                                    src={hackathon.image}
                                    alt={hackathon.title}
                                    width={400}
                                    height={300}
                                    unoptimized
                                />
                            </div>
                            <h1>{hackathon.title}</h1>
                        </a>
                    </div>
                ))}
            </div>
        </div>
    );
}
