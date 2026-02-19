"use client";

import { motion } from "framer-motion";
import {
    Waves,
    Sparkles,
    Sunrise,
    Mountain,
    Flame,
    Circle,
    Dumbbell,
    ArrowUpDown,
    ChefHat,
    Monitor,
    type LucideIcon,
} from "lucide-react";
import ImageLightbox from "./ImageLightbox";

type AmenitiesData = {
    sectionTitle?: string | null;
    items?: (string | null)[] | null;
};

// Icons and images mapped by position (order matters!)
const AMENITY_ICONS: LucideIcon[] = [Waves, Sparkles, Sunrise, Mountain, Flame, Circle, Dumbbell, ArrowUpDown, ChefHat, Monitor];
const AMENITY_IMAGES: string[] = [
    "/img/gallery/Exterior & Pool (9).jpg",
    "/img/gallery/Exterior & Pool.jpg",
    "/img/gallery/Exterior & Pool (6).jpg",
    "/img/gallery/Exterior & Pool (14).jpg",
    "/img/gallery/Wellness & Spa (2).jpg",
    "/img/gallery/Sports & Activities (6).jpg",
    "/img/gallery/Sports & Activities (4).jpg",
    "/img/gallery/10.jpg",
    "/img/gallery/Living & Dining (11).jpg",
    "/img/gallery/Living & Dining (12).jpg",
];

const DEFAULT_NAMES = [
    "Heated Pool", "Jacuzzi", "Sea View", "Mountain View", "Outdoor Sauna",
    "Padel Court", "Gym", "Elevator", "Design Kitchen", "Workspace",
];

const container = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.05,
        },
    },
};

const itemAnim = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
};

export default function Amenities({ data }: { data?: AmenitiesData }) {
    const sectionTitle = data?.sectionTitle || "Amenities";
    const names = data?.items?.filter(Boolean) as string[] || DEFAULT_NAMES;

    return (
        <div className="w-full">
            <h3 className="text-center text-sm font-medium uppercase tracking-widest text-stone-500 mb-4 md:text-base md:mb-6">
                 {sectionTitle}
            </h3>

            <motion.ul
                className="grid grid-cols-2 gap-3 md:grid-cols-5 md:gap-6"
                variants={container}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
            >
                {names.map((name, index) => {
                    const AmenityIcon = AMENITY_ICONS[index] || Monitor;
                    const image = AMENITY_IMAGES[index] || "";
                    return (
                        <motion.li
                            key={name}
                            variants={itemAnim}
                            className="h-full"
                        >
                            <ImageLightbox
                                src={image}
                                alt={name}
                                className="group flex flex-col items-center justify-center p-4 h-full min-h-[110px] bg-white border border-stone-200/60 rounded-xl transition-all duration-300 hover:border-stone-300 hover:shadow-lg hover:-translate-y-1 cursor-pointer"
                            >
                                <div className="mb-3 p-2.5 rounded-full bg-stone-50 text-stone-600 transition-colors duration-300 group-hover:bg-stone-100 group-hover:text-stone-800">
                                    <AmenityIcon
                                        className="w-5 h-5 md:w-6 md:h-6"
                                        strokeWidth={1.5}
                                    />
                                </div>
                                <span className="text-xs font-medium text-stone-600 text-center uppercase tracking-wide transition-colors duration-300 group-hover:text-stone-900">
                                    {name}
                                </span>
                            </ImageLightbox>
                        </motion.li>
                    );
                })}
            </motion.ul>
            {/* Mobile hint - optional, can be removed if grid is self-explanatory */}
            <div className="md:hidden mt-4 text-center">
                <span className="text-[10px] uppercase tracking-widest text-stone-400">
                    Tap icons to view
                </span>
            </div>
        </div>
    );
}
