"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { membersData, Member } from "../data/teamData";
import MemberModal from "./MemberModal";
import BackgroundEffect from "./BackgroundEffect";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const MembersSection = () => {
    const [selectedMember, setSelectedMember] = useState<Member | null>(null);
    const sectionRef = useRef<HTMLDivElement>(null);
    const gridRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);

    useEffect(() => {
        // Initial title state
        gsap.set(titleRef.current, { opacity: 0, x: -56 });

        const ctx = gsap.context(() => {
            if (!gridRef.current || !sectionRef.current) return;

            const grid = gridRef.current;
            const section = sectionRef.current;
            const container = grid.parentElement;
            if (!container) return;

            const getScrollAmount = () => {
                const isMobile = window.innerWidth < 768;
                return -(grid.scrollWidth - container.offsetWidth + (isMobile ? 50 : 150));
            };

            // Horizontal Scroll Animation
            gsap.to(grid, {
                x: getScrollAmount,
                ease: "none",
                scrollTrigger: {
                    trigger: section,
                    pin: true,
                    start: "top top",
                    end: () => `+=${Math.abs(getScrollAmount()) + 1000}`,
                    scrub: 1,
                    invalidateOnRefresh: true,
                    anticipatePin: 1,
                },
            });

            // Title Reveal Animation
            ScrollTrigger.create({
                trigger: section,
                start: "top bottom-=100",
                onEnter: () => gsap.to(titleRef.current, { opacity: 1, x: 0, duration: 1 }),
                onLeaveBack: () => gsap.to(titleRef.current, { opacity: 0, x: -56, duration: 0.5 }),
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} id="members-section" className="members-section-featured">
            <BackgroundEffect
                variant="members"
                opacity={0.3}
                circleColors={[
                    "rgba(5, 135, 158, 0.2), rgba(5, 135, 158, 0.05)",
                    "rgba(25, 68, 105, 0.25), rgba(25, 68, 105, 0.05)",
                    "rgba(10, 30, 60, 0.3), rgba(10, 30, 60, 0.05)",
                ]}
            />

            <div className="members-featured-container">
                {/* Left Column: Hero Text */}
                <div className="members-hero-side">
                    <div className="members-hero-content">
                        <h5 className="members-subheading">CREATIVE MINDS</h5>
                        <h1 ref={titleRef} className="members-main-heading">
                            The Contributors <br /> of <br /> Ghasa
                        </h1>
                        <p className="members-hero-description">
                            Our team of experts is dedicated to delivering
                            impactful digital solutions and inspiring others.
                        </p>

                        <a href="#about" className="members-view-all-btn">
                            View All Members
                            <svg className="arrow-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                <path d="M5 12h14M12 5l7 7-7 7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </a>

                        <div className="members-pagination">
                            <span className="current">01</span>
                            <div className="pagination-line"></div>
                            <span className="total">03</span>
                        </div>
                    </div>
                </div>

                {/* Right Column: Horizontal Scroll */}
                <div className="members-scroll-side">
                    <div className="members-scroll-container">
                        <div ref={gridRef} className="members-horizontal-wrapper">
                            {membersData.map((member) => {
                                const isActive = selectedMember?.id === member.id;
                                const anyActive = selectedMember !== null;

                                return (
                                    <div
                                        key={member.id}
                                        className={`member-featured-card${isActive ? " active" : ""}${anyActive && !isActive ? " dimmed" : ""}`}
                                        onClick={() => setSelectedMember(isActive ? null : member)}
                                    >
                                        <div className="member-card-image-wrap">
                                            <div className="member-level-badge">All Members</div>
                                            {/* eslint-disable-next-line @next/next/no-img-element */}
                                            <Image
                                                src={member.image}
                                                alt={member.name}
                                                draggable={false}
                                                className="member-featured-img"
                                                fill
                                                sizes="(max-width: 768px) 260px, 480px"
                                            />
                                        </div>

                                        <div className="member-card-details">
                                            <h3 className="member-featured-name">{member.name}</h3>
                                            <p className="member-featured-role">{member.role}</p>

                                            <div className="member-card-meta">
                                                <div className="meta-item">
                                                    <span className="meta-label">Skills:</span>
                                                    <div className="meta-badges">
                                                        {member.skills.slice(0, 2).map((skill, idx) => (
                                                            <span key={idx} className="meta-badge">{skill}</span>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="member-card-footer">
                                                <span className="footer-item">● Top Talent</span>
                                                <span className="footer-item">● Open</span>
                                            </div>
                                        </div>

                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Modal Portal at section level */}
                    {selectedMember && (
                        <div className="members-modal-portal">
                            <MemberModal
                                member={selectedMember}
                                onClose={() => setSelectedMember(null)}
                            />
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};

export default MembersSection;
