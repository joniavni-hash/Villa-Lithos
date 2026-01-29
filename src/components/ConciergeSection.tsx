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
      className="concierge"
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
                Hospitality that fits your stay.
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
                Our concierge handles the details so you don&apos;t have to,
                whether you&apos;re here with family or for work.
              </motion.p>
              <motion.p
                variants={fadeUp}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                We arrange private chefs, stock the house before you arrive,
                keep it clean while you&apos;re here, and point you to the best
                local experiences.
              </motion.p>
              <motion.p
                variants={fadeUp}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                Private guests and corporate groups both get the same attention.
                Every stay runs smoothly.
              </motion.p>
              <motion.p
                className="concierge__closing text-center"
                variants={fadeUp}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                Small requests, big ones. We&apos;re here to help.
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
