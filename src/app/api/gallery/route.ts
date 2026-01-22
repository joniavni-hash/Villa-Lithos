import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

// --- Types ---
export type GalleryCategory =
  | "rooms"
  | "interior"
  | "pool"
  | "exterior"
  | "wellness"
  | "sports";

interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  category: GalleryCategory;
  title: string;
  description: string;
}

// --- Categories Configuration ---
const CATEGORIES = [
  { id: "all", label: "View All" },
  { id: "exterior", label: "The Estate" },
  { id: "pool", label: "Infinity Pool" },
  { id: "interior", label: "Living & Design" },
  { id: "rooms", label: "The Suites" },
  { id: "wellness", label: "Spa & Wellness" },
  { id: "sports", label: "Padel & Activities" },
];

// --- Helper: Καθαρίζει το όνομα αρχείου για Τίτλο ---
// Π.χ. "Exterior & Pool (3).jpg" -> "Exterior & Pool"
const cleanTitle = (filename: string): string => {
  return filename
    .replace(/\.[^/.]+$/, "") // Αφαιρεί την κατάληξη (.jpg)
    .replace(/\(\d+\)/g, "") // Αφαιρεί αριθμούς σε παρενθέσεις π.χ. (3)
    .replace(/[0-9]/g, "") // Αφαιρεί σκέτους αριθμούς
    .replace(/[-_]/g, " ") // Αλλάζει παύλες/underscores σε κενά
    .trim(); // Αφαιρεί κενά στην αρχή/τέλος
};

// --- Helper: Μαντεύει την Κατηγορία από το όνομα ---
const getCategoryFromFilename = (filename: string): GalleryCategory => {
  const lowerName = filename.toLowerCase();

  if (lowerName.includes("bedroom") || lowerName.includes("room") || lowerName.includes("suite") || lowerName.includes("bed")) return "rooms";
  if (lowerName.includes("wellness") || lowerName.includes("spa") || lowerName.includes("sauna") || lowerName.includes("bath")) return "wellness";
  if (lowerName.includes("sport") || lowerName.includes("padel") || lowerName.includes("gym") || lowerName.includes("activity")) return "sports";
  if (lowerName.includes("living") || lowerName.includes("dining") || lowerName.includes("kitchen") || lowerName.includes("interior") || lowerName.includes("inside")) return "interior";
  if (lowerName.includes("pool")) return "pool"; // Προσοχή: Αν το όνομα έχει "Exterior & Pool", θα πάει στο pool
  if (lowerName.includes("exterior") || lowerName.includes("view") || lowerName.includes("drone") || lowerName.includes("terrace")) return "exterior";

  return "exterior"; // Default αν δεν βρει τίποτα
};

// --- Helper: Δίνει μια Luxury περιγραφή ανάλογα την κατηγορία ---
// Επειδή διαβάζουμε αυτόματα, δεν μπορούμε να έχουμε unique περιγραφή για κάθε φώτο,
// οπότε δίνουμε μια γενική "πλούσια" περιγραφή ανά κατηγορία.
const getLuxuryDescription = (category: GalleryCategory): string => {
  switch (category) {
    case "rooms":
      return "A sanctuary of calm featuring earthy tones and minimalist aesthetics, designed for deep, restorative sleep.";
    case "pool":
      return "Impeccably maintained crystal-clear waters offering a mesmerizing visual continuity with the horizon.";
    case "interior":
      return "Contemporary comfort with a refined edge—an interior that balances elegance and warmth for effortless luxury.";
    case "wellness":
      return "A dedicated space for rejuvenation. Disconnect from the world and reconnect with yourself in this private sanctuary.";
    case "sports":
      return "Premium facilities designed to keep your energy high, from the private padel court to the outdoor gyms.";
    case "exterior":
      return "Contemporary geometry meets natural materials. The estate stands as a testament to modern design in harmony with nature.";
    default:
      return "Experience the pinnacle of modern Mediterranean living at Villa Lithos.";
  }
};

export async function GET() {
  try {
    // 1. Βρίσκουμε τον φάκελο public/img/gallery
    const galleryDirectory = path.join(process.cwd(), "public/img/gallery");

    // 2. Διαβάζουμε τα αρχεία
    const fileNames = fs.readdirSync(galleryDirectory);

    // 3. Φιλτράρουμε μόνο εικόνες και φτιάχνουμε τα αντικείμενα
    const galleryImages: GalleryImage[] = fileNames
      .filter((file) => /\.(jpg|jpeg|png|webp|avif)$/i.test(file)) // Μόνο εικόνες
      .map((file, index) => {
        const category = getCategoryFromFilename(file);
        const titleRaw = cleanTitle(file);
        
        // Φτιάχνουμε έναν πιο ωραίο τίτλο αν είναι πολύ generic
        const title = titleRaw.length > 3 ? titleRaw : category === "rooms" ? "The Suite" : "Villa View";

        return {
          id: `auto-${index}`,
          src: `/img/gallery/${file}`, // Path για το frontend
          alt: `${title} at Villa Lithos`,
          category: category,
          title: title,
          description: getLuxuryDescription(category),
        };
      });

    return NextResponse.json(
      {
        items: galleryImages,
        categories: CATEGORIES,
      },
      {
        headers: {
          "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300",
        },
      }
    );
  } catch (error) {
    console.error("Error reading gallery folder:", error);
    return NextResponse.json({ items: [], categories: CATEGORIES }, { status: 500 });
  }
}