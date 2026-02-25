"use client";

import {
    FaReact, FaHtml5, FaCss3Alt, FaNodeJs, FaFigma,
    FaVuejs, FaBootstrap, FaPython,
} from "react-icons/fa";
import {
    SiJavascript, SiTailwindcss, SiTypescript,
} from "react-icons/si";
import { IconType } from "react-icons";

interface TechInfo {
    bg: string;
    text: string;
    border: string;
    icon: IconType | null;
}

const techInfoMap: Record<string, TechInfo> = {
    react: { bg: "#1e3a5f", text: "#93c5fd", border: "#1d4ed8", icon: FaReact },
    javascript: { bg: "#3d2c00", text: "#fcd34d", border: "#b45309", icon: SiJavascript },
    js: { bg: "#3d2c00", text: "#fcd34d", border: "#b45309", icon: SiJavascript },
    html: { bg: "#3d1500", text: "#fdba74", border: "#c2410c", icon: FaHtml5 },
    css: { bg: "#0c2a45", text: "#7dd3fc", border: "#0369a1", icon: FaCss3Alt },
    tailwind: { bg: "#0c2d2d", text: "#5eead4", border: "#0f766e", icon: SiTailwindcss },
    figma: { bg: "#2a1040", text: "#c084fc", border: "#7e22ce", icon: FaFigma },
    node: { bg: "#0c2d1a", text: "#6ee7b7", border: "#065f46", icon: FaNodeJs },
    typescript: { bg: "#1e3a5f", text: "#93c5fd", border: "#1d4ed8", icon: SiTypescript },
    ts: { bg: "#1e3a5f", text: "#93c5fd", border: "#1d4ed8", icon: SiTypescript },
    vue: { bg: "#0c2d1a", text: "#6ee7b7", border: "#065f46", icon: FaVuejs },
    bootstrap: { bg: "#2a1040", text: "#c084fc", border: "#7e22ce", icon: FaBootstrap },
    python: { bg: "#1e3a5f", text: "#fcd34d", border: "#1d4ed8", icon: FaPython },
    agile: { bg: "#1a2040", text: "#a5b4fc", border: "#4338ca", icon: null },
    gsap: { bg: "#0c2d1a", text: "#6ee7b7", border: "#065f46", icon: null },
    nextjs: { bg: "#1a1a1a", text: "#e5e5e5", border: "#555", icon: null },
};

function getTechInfo(tech: string): TechInfo {
    const key = tech.toLowerCase().replace(/[\s.]/g, "");
    if (techInfoMap[key]) return techInfoMap[key];
    for (const k of Object.keys(techInfoMap).sort((a, b) => b.length - a.length)) {
        if (key.includes(k)) return techInfoMap[k];
    }
    return { bg: "#1f2937", text: "#d1d5db", border: "#374151", icon: null };
}

const TechBadge = ({ tech }: { tech: string }) => {
    const info = getTechInfo(tech);
    const Icon = info.icon;
    return (
        <span
            className="tech-badge"
            style={{
                backgroundColor: info.bg,
                color: info.text,
                borderColor: info.border,
            }}
        >
            {Icon && <Icon />}
            {tech}
        </span>
    );
};

export default TechBadge;
