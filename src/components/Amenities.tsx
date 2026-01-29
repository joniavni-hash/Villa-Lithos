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

// Amenities data with monochrome lucide-react icons
const amenities: { name: string; icon: LucideIcon; image: string }[] = [
    { name: "Heated Pool", icon: Waves, image: "/img/gallery/Exterior & Pool (9).jpg" },
    { name: "Jacuzzi", icon: Sparkles, image: "/img/gallery/Exterior & Pool.jpg" },
    { name: "Sea View", icon: Sunrise, image: "/img/gallery/Exterior & Pool (6).jpg" },
    { name: "Mountain View", icon: Mountain, image: "/img/gallery/Exterior & Pool (14).jpg" },
    { name: "Outdoor Sauna", icon: Flame, image: "/img/gallery/Wellness & Spa (2).jpg" },
    { name: "Padel Court", icon: Circle, image: "/img/gallery/Sports & Activities (2).jpg" },
    { name: "Gym", icon: Dumbbell, image: "/img/gallery/Sports & Activities (4).jpg" },
    { name: "Elevator", icon: ArrowUpDown, image: "/img/gallery/Living & Dining (10).jpg" },
    { name: "Design Kitchen", icon: ChefHat, image: "/img/gallery/Living & Dining (11).jpg" },
    { name: "Workspace", icon: Monitor, image: "/img/gallery/Living & Dining (12).jpg" },
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

export default function Amenities() {
    return (
        <div className="w-full">
            <h3 className="text-center text-sm font-medium uppercase tracking-widest text-stone-500 mb-4 md:text-base md:mb-6">
                 Amenities
            </h3>

            <motion.ul
                className="grid grid-cols-2 gap-3 md:grid-cols-5 md:gap-6"
                variants={container}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
            >
                {amenities.map((amenity) => {
                    const AmenityIcon = amenity.icon;
                    return (
                        <motion.li
                            key={amenity.name}
                            variants={itemAnim}
                            className="h-full"
                        >
                            <ImageLightbox
                                src={amenity.image}
                                alt={amenity.name}
                                className="group flex flex-col items-center justify-center p-4 h-full min-h-[110px] bg-white border border-stone-200/60 rounded-xl transition-all duration-300 hover:border-stone-300 hover:shadow-lg hover:-translate-y-1 cursor-pointer"
                            >
                                <div className="mb-3 p-2.5 rounded-full bg-stone-50 text-stone-600 transition-colors duration-300 group-hover:bg-stone-100 group-hover:text-stone-800">
                                    <AmenityIcon
                                        className="w-5 h-5 md:w-6 md:h-6"
                                        strokeWidth={1.5}
                                    />
                                </div>
                                <span className="text-xs font-medium text-stone-600 text-center uppercase tracking-wide transition-colors duration-300 group-hover:text-stone-900">
                                    {amenity.name}
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
