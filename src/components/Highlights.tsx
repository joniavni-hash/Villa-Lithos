"use client";

import { motion } from "framer-motion";
import {
    Bed,
    Users,
    Bath,
    Home,
    TreePine,
    type LucideIcon,
} from "lucide-react";

const highlights: { label: string; value: string; icon: LucideIcon }[] = [
    { label: "Bedrooms", value: "9", icon: Bed },
    { label: "Guests", value: "22", icon: Users },
    { label: "Bathrooms", value: "8.5", icon: Bath },
    { label: "Build", value: "800m²", icon: Home },
    { label: "Plot", value: "5000m²", icon: TreePine },
];

const container = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
        },
    },
};

const itemAnim = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0 },
};

export default function Highlights() {
    return (
        <div className="w-full py-2">
            {/* Mobile: 3 columns for first 3, then 2 centered? Or just auto-fit. 
           Let's go with a clean flex wrap or grid that respects the content. 
           3 cols is good for mobile stats. */}
            <motion.div
                className="grid grid-cols-3 gap-2 md:grid-cols-5 md:gap-4"
                variants={container}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
            >
                {highlights.map((item, index) => {
                    const IconComponent = item.icon;
                    // Logic to center the last 2 items on mobile if we have 5 items in a 3-col grid?
                    // Actually, standard grid flow is fine, or we can make the last 2 span 1.5 cols?
                    // Let's keep it simple and consistent first.

                    return (
                        <motion.div
                            key={item.label}
                            variants={itemAnim}
                            // Adjust spanning for 5 items on mobile to look balanced:
                            // First 3 takes 1 col each. Last 2 take 1.5 cols ? No, grid-cols-3 makes that hard.
                            // Let's stick to simple grid, it looks neatest.
                            className={`
                group flex flex-col items-center justify-center 
                p-3 rounded-xl border border-stone-200/60 bg-white shadow-sm
                transition-all duration-300 hover:shadow-md hover:-translate-y-0.5 hover:border-stone-300
                ${index >= 3 ? "col-span-1.5 md:col-span-1" : ""} 
                /* The above col-span trick centers the last two on a 3-col grid if we changed the grid def, 
                   but standard grid-cols-3 with 5 items leaves one empty space.
                   Let's try a different mobile approach: Flexbox justify-center? */
              `}
                        >
                            {/* Note: overriding class below to separate flex approach */}
                        </motion.div>
                    );
                })}
            </motion.div>

            {/* Re-implementing with a cleaner layout strategy for 5 items */}
            <motion.div
                className="flex flex-wrap justify-center gap-2 md:gap-4 lg:gap-6"
                variants={container}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
            >
                {highlights.map((item) => {
                    const IconComponent = item.icon;
                    return (
                        <motion.div
                            key={item.label}
                            variants={itemAnim}
                            className="
                    flex-1 min-w-[30%] max-w-[48%] basis-[30%] 
                    md:min-w-0 md:max-w-none md:basis-auto md:flex-1
                    flex flex-col items-center justify-center 
                    py-3 px-2 rounded-xl bg-white border border-stone-200/50 shadow-[0_2px_8px_-3px_rgba(0,0,0,0.05)]
                    transition-all duration-300 hover:border-stone-300 hover:shadow-md hover:-translate-y-1
                 "
                        >
                            <span
                                className="
                    flex items-center justify-center 
                    w-10 h-10 mb-2 rounded-full 
                    bg-stone-50 text-stone-600 
                    transition-colors duration-300 group-hover:bg-stone-100 group-hover:text-stone-800
                    md:w-12 md:h-12 md:mb-3
                  "
                            >
                                <IconComponent className="w-5 h-5 md:w-6 md:h-6" strokeWidth={1.5} />
                            </span>
                            <span className="text-xl font-serif font-medium text-stone-800 md:text-2xl">
                                {item.value}
                            </span>
                            <span className="text-[10px] font-medium uppercase tracking-widest text-stone-400 mt-0.5 md:text-xs">
                                {item.label}
                            </span>
                        </motion.div>
                    )
                })}
            </motion.div>
        </div>
    );
}
