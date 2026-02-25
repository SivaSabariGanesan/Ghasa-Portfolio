"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { groupCards } from "../data/teamData";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const MAX_VISIBILITY = 2;

function getCircularDistance(active: number, index: number, total: number): number {
    const direct = active - index;
    const wrapped = direct > 0 ? direct - total : direct + total;
    return Math.abs(direct) < Math.abs(wrapped) ? direct : wrapped;
}

const AboutUsCarousel = () => {
    const [active, setActive] = useState(1);
    const count = groupCards.length;
    const carouselRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const st = ScrollTrigger.create({
            trigger: carouselRef.current,
            start: "top bottom-=100",
            end: "bottom top+=100",
            toggleActions: "play none none reverse",
            onEnter: () => {
                gsap.fromTo(
                    carouselRef.current,
                    { opacity: 0, y: 40 },
                    { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }
                );
            },
        });
        return () => st.kill();
    }, []);

    return (
        <div ref={carouselRef} className="carousel-wrapper" style={{ opacity: 0 }}>
            <div className="carousel">
                <button
                    className="carousel-nav left"
                    onClick={() => setActive((i: number) => (i - 1 < 0 ? count - 1 : i - 1))}
                    aria-label="Previous"
                >
                    &#8249;
                </button>

                {groupCards.map((card, i) => {
                    const distance = getCircularDistance(active, i, count);
                    const absDistance = Math.abs(distance);
                    return (
                        <div
                            key={card.id}
                            className="card-container"
                            style={
                                {
                                    "--active": i === active ? 1 : 0,
                                    "--offset": distance / 3,
                                    "--direction": Math.sign(distance),
                                    "--abs-offset": absDistance / 3,
                                    pointerEvents: active === i ? "auto" : "none",
                                    opacity: absDistance >= MAX_VISIBILITY ? 0 : 1,
                                    display: absDistance > MAX_VISIBILITY ? "none" : "block",
                                } as React.CSSProperties
                            }
                            onClick={() => setActive(i)}
                        >
                            <div className="card-3d">
                                <div className="card-image-container">
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <Image
                                        src={card.image}
                                        alt={`Group photo ${i + 1}`}
                                        className="card-image"
                                        draggable={false}
                                        fill
                                        sizes="(max-width: 1080px) 20rem, 35rem"
                                    />
                                </div>
                            </div>
                        </div>
                    );
                })}

                <button
                    className="carousel-nav right"
                    onClick={() => setActive((i: number) => (i + 1 >= count ? 0 : i + 1))}
                    aria-label="Next"
                >
                    &#8250;
                </button>
            </div>
        </div>
    );
};

export default AboutUsCarousel;
