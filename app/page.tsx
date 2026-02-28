"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import AboutSection from "./components/AboutSection";
import ProjectsSection from "./components/ProjectsSection";
import MembersSection from "./components/MembersSection";
import Footer from "./components/Footer";
import HackathonSection from "./components/HackathonSection";
export default function Home() {
  const mainRef = useRef<HTMLDivElement>(null);
  const minicircleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // --- Locomotive Scroll ---
    let scrollInstance: InstanceType<typeof import("locomotive-scroll").default> | null = null;

    (async () => {
      const LocomotiveScroll = (await import("locomotive-scroll")).default;
      scrollInstance = new LocomotiveScroll({
        el: mainRef.current!,
        smooth: true,
      } as any);

      // Refresh ScrollTrigger after Locomotive is ready and layout has settled
      setTimeout(() => {
        import("gsap/ScrollTrigger").then(({ ScrollTrigger }) => {
          ScrollTrigger.refresh();
        });
      }, 500);
    })();

    // --- GSAP Responsive Animations ---
    const mm = gsap.matchMedia();

    mm.add({
      // Desktop
      isDesktop: "(min-width: 1025px)",
      // Mobile / Tablet
      isMobile: "(max-width: 1024px)",
    }, (context) => {
      const { isDesktop } = context.conditions as { isDesktop: boolean };

      // --- First page animation ---
      const tl = gsap.timeline();

      tl.from("#nav", {
        y: "-10",
        opacity: 0,
        duration: 1.2,
        ease: "expo.inOut",
      })
        .to(".boundingelem", {
          y: 0,
          duration: 1,
          delay: -1,
          ease: "expo.inOut",
          stagger: 0.2,
        })
        .from("#herofooter", {
          y: -10,
          opacity: 0,
          duration: 1.5,
          delay: -1,
          ease: "expo.inOut",
          stagger: 0.2,
        });

      // --- Mouse follower (Desktop only) ---
      if (isDesktop) {
        let timeout: ReturnType<typeof setTimeout>;
        let xprev = 0;
        let yprev = 0;

        const handleMouseMove = (e: MouseEvent) => {
          clearTimeout(timeout);

          const xdiff = e.clientX - xprev;
          const ydiff = e.clientY - yprev;

          const xscale = gsap.utils.clamp(0.8, 1.2, xdiff);
          const yscale = gsap.utils.clamp(0.8, 1.2, ydiff);

          xprev = e.clientX;
          yprev = e.clientY;

          if (minicircleRef.current) {
            minicircleRef.current.style.display = "block";
            minicircleRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px) scale(${xscale}, ${yscale})`;
          }

          timeout = setTimeout(() => {
            if (minicircleRef.current) {
              minicircleRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px) scale(1, 1)`;
            }
          }, 100);
        };

        window.addEventListener("mousemove", handleMouseMove);

        // Hide circle initially or when mouse leaves window if desired
        if (minicircleRef.current) {
          minicircleRef.current.style.display = "none";
        }

        return () => {
          window.removeEventListener("mousemove", handleMouseMove);
        };
      } else {
        // Hide mouse follower on mobile
        if (minicircleRef.current) {
          minicircleRef.current.style.display = "none";
        }
      }

      return undefined;
    });

    // Cleanup for locomotive scroll (moved outside matchMedia if it's for all)
    return () => {
      mm.revert();
      if (scrollInstance) {
        (scrollInstance as any).destroy();
      }
    };
  }, []);

  return (
    <>
      <div id="minicircle" ref={minicircleRef} />
      <div id="main" ref={mainRef}>
        {/* ===== Hero ===== */}
        <div id="hero">
          <div id="nav">

            <div id="navright">
              <a href="https://www.linkedin.com/in/mkakash1912/" target="_blank" rel="noopener noreferrer">
                linkedin
              </a>
              <a href="https://github.com/SivaSabariGanesan" target="_blank" rel="noopener noreferrer">
                Github
              </a>
            </div>
          </div>

          <div id="heading">
            <div className="bounding">
              <h1 className="boundingelem">TEAM </h1>
            </div>
            <div className="blockText">
              <div className="bounding">
                <h1 className="boundingelem" id="secondh1">
                  GHASA
                </h1>
              </div>
              <div className="bounding">
                <h5 className="boundingelem">a team from tamil nadu</h5>
              </div>
            </div>
          </div>

          <div id="herofooter">
            <a href="#hackathon-section">
              Projects <i className="ri-arrow-right-down-line" />
            </a>
            <div id="iconset">
              <div className="circle">
                <a href="#hackathon-section">
                  <i className="ri-arrow-down-line" />
                </a>
              </div>
              <div className="circle">
                <a href="#about">
                  <i className="ri-arrow-down-line" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* ===== Projects Section ===== */}
        <ProjectsSection />

        {/* ===== Hackathons Section ===== */}
        <HackathonSection />

        {/* ===== About Us ===== */}
        <AboutSection />

        {/* ===== Our Team ===== */}
        <MembersSection />

        {/* ===== Subscribe ===== */}
        <div id="subscribe">
          <a href="#" target="_blank" rel="noopener noreferrer">
            follow me on linkedin <i className="ri-arrow-right-up-line" />
          </a>
        </div>

        {/* ===== Footer ===== */}
        <Footer />
      </div>
    </>
  );
}
