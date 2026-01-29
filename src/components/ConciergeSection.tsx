"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const services = [
  "Private Chefs",
  "Housekeeping",
  "Local Experiences",
  "Private Yachts",
  "Local Musicians",
  "VIP Service",
  "Workshops",
  "Themed Events",
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

export default function ConciergeSection() {
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
                Concierge Services
              </motion.h2>
              <motion.span
                className="concierge__kicker"
                variants={fadeUp}
                transition={{ duration: 0.5 }}
              >
                Personalized hospitality tailored to your stay.
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
              <motion.p
                variants={fadeUp}
                transition={{ duration: 0.5 }}
              >
                At Villa Lithos, our dedicated concierge team manages every detail
                of your stay, whether you&apos;re visiting with family or hosting
                a corporate retreat in Porto Rafti.
              </motion.p>
              <motion.p
                variants={fadeUp}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                From arranging private chefs and pre-stocking the villa to daily
                housekeeping and curating authentic Greek experiences, we ensure
                your time near Athens is effortless and memorable.
              </motion.p>
              <motion.p
                variants={fadeUp}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                Private guests and corporate groups receive the same meticulous
                attention. Every stay at our luxury villa runs seamlessly.
              </motion.p>
              <motion.p
                className="concierge__closing text-center"
                variants={fadeUp}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                From small requests to grand arrangements, we&apos;re here to help.
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
