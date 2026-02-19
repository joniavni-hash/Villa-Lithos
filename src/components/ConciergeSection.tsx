"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

type ConciergeData = {
  title?: string | null;
  kicker?: string | null;
  paragraphs?: (string | null)[] | null;
  closingText?: string | null;
  services?: (string | null)[] | null;
};

const DEFAULT_SERVICES = [
  "Private Chefs",
  "Housekeeping",
  "Local Experiences",
  "Private Yachts",
  "Local Musicians",
  "VIP Service",
  "Workshops",
  "Themed Events",
];

const DEFAULT_PARAGRAPHS = [
  "At Villa Lithos, our dedicated concierge team manages every detail of your stay, whether you\u2019re visiting with family or hosting a corporate retreat in Porto Rafti.",
  "From arranging private chefs and pre-stocking the villa to daily housekeeping and curating authentic Greek experiences, we ensure your time near Athens is effortless and memorable.",
  "Private guests and corporate groups receive the same meticulous attention. Every stay at our luxury villa runs seamlessly.",
];

// Animation variants
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const staggerItem = {
  hidden: { opacity: 0, y: 15 },
  visible: { opacity: 1, y: 0 },
};

export default function ConciergeSection({ data }: { data?: ConciergeData }) {
  const title = data?.title || "Concierge Services";
  const kicker = data?.kicker || "Personalized hospitality tailored to your stay.";
  const paragraphs = data?.paragraphs?.filter(Boolean) as string[] || DEFAULT_PARAGRAPHS;
  const closingText = data?.closingText || "From small requests to grand arrangements, we\u2019re here to help.";
  const services = data?.services?.filter(Boolean) as string[] || DEFAULT_SERVICES;

  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<HTMLUListElement>(null);

  // Changed to once: true to prevent continuous re-renders on scroll (reduces TBT)
  const sectionInView = useInView(sectionRef, { once: true, amount: 0.15 });
  const headerInView = useInView(headerRef, { once: true, amount: 0.4 });
  const contentInView = useInView(contentRef, { once: true, amount: 0.3 });
  const servicesInView = useInView(servicesRef, { once: true, amount: 0.5 });

  return (
    <section
      id="services"
      className="concierge py-2 md:py-4"
      aria-labelledby="concierge-title"
      ref={sectionRef}
    >
      <div className="concierge__container">
        {/* Content with image */}
        <motion.div
          className="concierge__content-wrapper"
          initial="hidden"
          animate={sectionInView ? "visible" : "hidden"}
          variants={fadeUp}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <div className="concierge__grid">
            {/* Header */}
            <motion.header
              ref={headerRef}
              className="concierge__header text-center items-center"
              initial="hidden"
              animate={headerInView ? "visible" : "hidden"}
              variants={staggerContainer}
            >
              <motion.h2
                id="concierge-title"
                className="concierge__title"
                variants={fadeUp}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                {title}
              </motion.h2>
              <motion.span
                className="concierge__kicker"
                variants={fadeUp}
                transition={{ duration: 0.5 }}
              >
                {kicker}
              </motion.span>
            </motion.header>

            {/* Content */}
            <motion.div
              ref={contentRef}
              className="concierge__content text-center flex flex-col items-center"
              initial="hidden"
              animate={contentInView ? "visible" : "hidden"}
              variants={staggerContainer}
            >
              {paragraphs.map((p, i) => (
                <motion.p
                  key={i}
                  variants={fadeUp}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                >
                  {p}
                </motion.p>
              ))}
              <motion.p
                className="concierge__closing text-center"
                variants={fadeUp}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                {closingText}
              </motion.p>

              <motion.hr
                className="concierge__divider mx-auto"
                variants={fadeUp}
                transition={{ duration: 0.4, delay: 0.35 }}
              />

              <motion.ul
                ref={servicesRef}
                className="concierge__services mx-auto grid w-fit grid-cols-2 gap-x-12 gap-y-2 text-left"
                aria-label="Key services"
                initial="hidden"
                animate={servicesInView ? "visible" : "hidden"}
                variants={staggerContainer}
              >
                {services.map((service, index) => (
                  <motion.li
                    key={service}
                    variants={staggerItem}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                  >
                    {service}
                  </motion.li>
                ))}
              </motion.ul>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
