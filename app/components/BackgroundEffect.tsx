"use client";

interface BackgroundEffectProps {
    variant?: "about" | "members" | "projects" | "contact" | "default";
    opacity?: number;
    circleColors?: string[];
}

const BackgroundEffect = ({
    variant = "default",
    opacity = 0.5,
    circleColors = [
        "rgba(5, 165, 188, 0.2), rgba(5, 165, 188, 0.05)",
        "rgba(15, 58, 95, 0.3), rgba(15, 58, 95, 0.05)",
        "rgba(0, 20, 50, 0.4), rgba(0, 20, 50, 0.05)",
    ],
}: BackgroundEffectProps) => {
    const variantClass = `bg-${variant}-elements`;

    return (
        <div
            className={variantClass}
            style={{
                opacity,
                position: "absolute",
                inset: 0,
                overflow: "hidden",
                zIndex: 1,
                pointerEvents: "none",
            }}
        >
            <div
                className="bg-circle circle-1"
                style={{ background: `radial-gradient(circle, ${circleColors[0]})` }}
            />
            <div
                className="bg-circle circle-2"
                style={{ background: `radial-gradient(circle, ${circleColors[1]})` }}
            />
            <div
                className="bg-circle circle-3"
                style={{ background: `radial-gradient(circle, ${circleColors[2]})` }}
            />
            <div className="bg-grid" />
            <div className="bg-dots" />
            <div className="corner-dot top-left-dot" />
            <div className="corner-dot top-right-dot" />
            <div className="corner-dot bottom-left-dot" />
            <div className="corner-dot bottom-right-dot" />
        </div>
    );
};

export default BackgroundEffect;
