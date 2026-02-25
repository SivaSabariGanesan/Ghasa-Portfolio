import { StaticImageData } from "next/image";
import akash from "../../public/images/akash.png"
import hariharan from "../../public/images/hari.png"
import siva from "../../public/images/ssg.jpeg"
import pondy from "../../public/images/pondy.png"
import hh from "../../public/images/hh.png"
import kanpur from "../../public/images/kanpur.png"
export interface GroupCard {
    id: number;
    image: string | StaticImageData;
}

export const groupCards: GroupCard[] = [
    { id: 0, image: pondy },
    { id: 1, image: hh },
    { id: 2, image: kanpur },
];

export interface MemberLink {
    platform: string;
    url: string;
}

export interface Member {
    id: number;
    name: string;
    role: string;
    description: string;
    image: string | StaticImageData;
    skills: string[];
    quote?: string;
    links: MemberLink[];
}

export const membersData: Member[] = [
    {
        id: 1,
        name: "Akash MK",
        role: "Blockchain Developer",
        description:
            "A passionate developer focused on building scalable and efficient blockchain solutions for modern web applications.",
        image: akash,
        skills: ["React", "Next.js", "Blockchain", "TypeScript", "GSAP"],
        quote: "If you're going through hell, keep going.",
        links: [
            { platform: "GitHub", url: "https://github.com/Akash1912-hub" },
            { platform: "LinkedIn", url: "https://www.linkedin.com/in/mkakash1912/" },
        ],
    },
    {
        id: 2,
        name: "HariHaran K",
        role: "Full Stack Developer",
        description:
            "A passionate developer focused on building scalable and efficient server-side and client-side solutions for modern web applications.",
        image: hariharan,
        skills: ["React Js", "Next Js", "Node Js", "Express Js", "Django", "Tailwind CSS"],
        quote: "Design is not just what it looks like, it's how it works.",
        links: [
            { platform: "GitHub", url: "https://github.com/Hariharan358" },
            { platform: "LinkedIn", url: "https://www.linkedin.com/in/hariharan-kannan-9a160b2a2/" },
        ],
    },
    {
        id: 3,
        name: "Siva Sabari Ganesan A",
        role: "Full Stack Developer",
        description:
            "A full stack developer focused on building scalable and efficient server-side and client-side solutions for modern web applications.",
        image: siva,
        skills: ["Node.js", "Express Js", "React Js", "Django", "TypeScript", "Tailwind CSS"],
        quote: "Any fool can write code that a computer can understand.",
        links: [
            { platform: "GitHub", url: "https://github.com/SivaSabariGanesan" },
            { platform: "LinkedIn", url: "https://www.linkedin.com/in/siva-sabari-ganesan-a-b3288a28b/" },
        ],
    },
];
