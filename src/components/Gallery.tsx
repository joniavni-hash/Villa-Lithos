"use client";

import { useState } from "react";
import Image from "next/image";

type Accommodation = {
  name: string;
  description: string;
  images: string[];
};

const accommodations: Accommodation[] = [
  {
    name: "King Cottage",
    description:
      "Couples or those sharing a bed with a loved one stay in our King Cottages. Featuring a California King bed, some also include a porch. All cottages offer a desk should you need to attend to any business during your stay, and the bathroom features premium amenities including Jolie filtered showerheads, paraben-free shampoo and conditioner, and our signature Ranch soap.",
    images: ["/img/gallery/01.jpg", "/img/gallery/02.jpg", "/img/gallery/03.jpg"],
  },
  {
    name: "Queen Cottage",
    description:
      "Queen Cottages offer a peaceful retreat with modern comforts. Ideal for solo travelers or couples, featuring a queen-size bed and a cozy space with a blend of rustic charm and luxury amenities.",
    images: ["/img/gallery/04.jpg", "/img/gallery/05.jpg", "/img/gallery/06.jpg"],
  },
  {
    name: "Double Queen Cottage",
    description:
      "Perfect for families or groups, the Double Queen Cottage features two queen-size beds, a spacious living area, and all the amenities needed for a comfortable and relaxing stay.",
    images: ["/img/gallery/07.jpg", "/img/gallery/08.jpg", "/img/gallery/09.jpg"],
  },
];

export default function Gallery({ title, subtitle }: { title: string, subtitle: string }) {
  const [activeIndex, setActiveIndex] = useState<number>(0);

  const nextAccommodation = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % accommodations.length);
  };

  const prevAccommodation = () => {
    setActiveIndex((prevIndex) => (prevIndex - 1 + accommodations.length) % accommodations.length);
  };

  return (
    <section id="accommodations" className="relative section">
      <div className="container-page">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="kicker">Villa Lithos</p>
            <h2 className="h2 mt-2">{title}</h2>
            <p className="lead mt-3 max-w-2xl">{subtitle}</p>
          </div>
        </div>

        {/* Accommodation Content */}
        <div className="mt-6 flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <div className="flex justify-between items-center mb-4">
            <div className="flex justify-between items-center mb-4">
  <button
    onClick={prevAccommodation}
    className="btn--sm text-sm text-white"
    aria-label="Previous"
  >
    &#8592; {/* Αριστερό βελάκι */}
  </button>
  <p className="text-xl font-medium">{accommodations[activeIndex].name}</p>
  <button
    onClick={nextAccommodation}
    className="btn--sm text-sm text-white"
    aria-label="Next"
  >
    &#8594; {/* Δεξί βελάκι */}
  </button>
</div>
            </div>
            <p className="lead mt-2">{accommodations[activeIndex].description}</p>
          </div>

          <div className="flex-1">
            {/* Image display */}
            <div className="relative aspect-w-16 aspect-h-9">
              <Image
                src={accommodations[activeIndex].images[0]} // This should dynamically change
                alt={accommodations[activeIndex].name}
                width={1600}
                height={1066}
                objectFit="cover"
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
