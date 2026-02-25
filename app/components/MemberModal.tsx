"use client";

import { useEffect, useRef } from "react";
import { FaGithub, FaFacebook, FaLinkedin, FaTimes } from "react-icons/fa";
import TechBadge from "./TechBadge";
import gsap from "gsap";
import { Member } from "../data/teamData";

interface MemberModalProps {
    member: Member;
    onClose: () => void;
}

const getPlatformIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
        case "github": return <FaGithub />;
        case "facebook": return <FaFacebook />;
        case "linkedin": return <FaLinkedin />;
        default: return <FaGithub />;
    }
};

const MemberModal = ({ member, onClose }: MemberModalProps) => {
    const modalRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const closeHandlerRef = useRef<((e?: Event) => void) | null>(null);

    useEffect(() => {
        // Entry animation - slide up
        gsap.set(contentRef.current, { y: "100%", opacity: 0.8 });
        gsap.to(contentRef.current, {
            y: "0%",
            opacity: 1,
            duration: 0.4,
            ease: "power1.out",
            clearProps: "transform",
        });

        const handleClose = () => {
            gsap.to(contentRef.current, {
                y: "100%",
                opacity: 0.8,
                duration: 0.3,
                ease: "power1.in",
                onComplete: () => {
                    gsap.to(modalRef.current, {
                        opacity: 0,
                        duration: 0.2,
                        onComplete: onClose,
                    });
                },
            });
        };

        closeHandlerRef.current = handleClose;

        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === "Escape") handleClose();
        };
        document.addEventListener("keydown", handleEsc);
        return () => document.removeEventListener("keydown", handleEsc);
    }, [onClose]);

    const handleCloseClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        closeHandlerRef.current?.();
    };

    return (
        <div ref={modalRef} className="member-modal-overlay">
            <div
                ref={contentRef}
                className="member-modal-content"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Close */}
                <button className="modal-close-btn" onClick={handleCloseClick} aria-label="Close">
                    <FaTimes />
                </button>

                <div className="modal-inner">
                    {/* Header */}
                    <div className="modal-header">
                        <h2 className="modal-name">{member.name}</h2>
                        <h3 className="modal-role">{member.role}</h3>
                    </div>

                    {/* Scrollable body */}
                    <div className="modal-body">
                        <p className="modal-description">
                            {member.description ||
                                "A valued member of our team bringing unique skills and perspective."}
                        </p>

                        {member.skills?.length > 0 && (
                            <div className="modal-skills">
                                <h4 className="modal-section-label">Skills</h4>
                                <div className="modal-badges">
                                    {member.skills.map((skill, i) => (
                                        <TechBadge key={i} tech={skill} />
                                    ))}
                                </div>
                            </div>
                        )}

                        {member.quote && (
                            <div className="modal-quote-section">
                                <h4 className="modal-section-label">Quote</h4>
                                <div className="modal-quote-box">
                                    <p className="modal-quote-text">&ldquo;{member.quote}&rdquo;</p>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Footer links */}
                    {member.links?.length > 0 && (
                        <div className="modal-footer">
                            {member.links.map((link, i) => (
                                <a
                                    key={i}
                                    href={link.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="modal-link"
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    <span>{getPlatformIcon(link.platform)}</span>
                                    <span>{link.platform}</span>
                                </a>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MemberModal;
