import { defineConfig } from "tinacms";

export default defineConfig({
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID || "",
  branch:
    process.env.NEXT_PUBLIC_TINA_BRANCH ||
    process.env.VERCEL_GIT_COMMIT_REF ||
    process.env.HEAD ||
    "main",
  token: process.env.NEXT_PUBLIC_TINA_TOKEN || "",

  build: {
    outputFolder: "admin",
    publicFolder: "public",
  },
  media: {
    tina: {
      mediaRoot: "img",
      publicFolder: "public",
    },
  },
  schema: {
    collections: [
      // ── Global Settings (Header, Footer, SEO) ──
      {
        label: "Site Settings",
        name: "global",
        path: "content/global",
        format: "json",
        ui: {
          global: true,
          allowedActions: { create: false, delete: false },
        },
        fields: [
          {
            type: "object",
            name: "seo",
            label: "SEO & Meta",
            fields: [
              { type: "string", name: "siteName", label: "Site Name", required: true },
              { type: "string", name: "slogan", label: "Slogan" },
              {
                type: "string",
                name: "description",
                label: "Meta Description",
                ui: { component: "textarea" },
              },
              { type: "string", name: "keywords", label: "Keywords", list: true },
            ],
          },
          {
            type: "object",
            name: "header",
            label: "Header",
            fields: [
              { type: "string", name: "brandName", label: "Brand Name", required: true },
              { type: "string", name: "bookingUrl", label: "Booking URL" },
              {
                type: "object",
                name: "navLinks",
                label: "Navigation Links",
                list: true,
                fields: [
                  { type: "string", name: "href", label: "Link URL", required: true },
                  { type: "string", name: "label", label: "Label", required: true },
                ],
              },
            ],
          },
          {
            type: "object",
            name: "footer",
            label: "Footer",
            fields: [
              { type: "string", name: "brandName", label: "Brand Name" },
              {
                type: "string",
                name: "tagline",
                label: "Tagline",
                ui: { component: "textarea" },
              },
              { type: "string", name: "phone", label: "Phone" },
              { type: "string", name: "email", label: "Email" },
              { type: "string", name: "address", label: "Address" },
              { type: "string", name: "copyright", label: "Copyright Name" },
              { type: "string", name: "managedBy", label: "Managed By Text" },
              { type: "string", name: "managedByUrl", label: "Managed By URL" },
            ],
          },
        ],
      },

      // ── Home Page Content ──
      {
        label: "Home Page",
        name: "page",
        path: "content/page",
        format: "json",
        ui: {
          allowedActions: { create: false, delete: false },
        },
        fields: [
          // Hero Banner
          {
            type: "object",
            name: "hero",
            label: "Hero Banner",
            fields: [
              { type: "string", name: "kicker", label: "Kicker Text" },
              { type: "string", name: "title", label: "Title" },
              {
                type: "string",
                name: "subtitle",
                label: "Subtitle",
                ui: { component: "textarea" },
              },
            ],
          },
          // Marquee
          {
            type: "object",
            name: "marquee",
            label: "Marquee Line",
            fields: [
              {
                type: "string",
                name: "text",
                label: "Scrolling Text",
                ui: { component: "textarea" },
                description:
                  "Use bullet separators: VILLA LITHOS \u2022 POOL \u2022 SAUNA \u2022 etc.",
              },
            ],
          },
          // Villa Intro
          {
            type: "object",
            name: "villaIntro",
            label: "Villa Introduction",
            fields: [
              { type: "string", name: "kicker", label: "Kicker" },
              { type: "string", name: "title", label: "Title" },
              {
                type: "string",
                name: "tagline",
                label: "Tagline",
                ui: { component: "textarea" },
              },
              {
                type: "string",
                name: "bodyParagraphs",
                label: "Body Paragraphs",
                list: true,
                ui: { component: "textarea" },
              },
              {
                type: "object",
                name: "stats",
                label: "Stats",
                list: true,
                fields: [
                  { type: "string", name: "label", label: "Label", required: true },
                  { type: "string", name: "value", label: "Value", required: true },
                ],
              },
              { type: "string", name: "spaceTitle", label: "The Space - Section Title" },
              {
                type: "string",
                name: "spaceParagraphs",
                label: "The Space - Paragraphs",
                list: true,
                ui: { component: "textarea" },
              },
            ],
          },
          // Amenities
          {
            type: "object",
            name: "amenities",
            label: "Amenities",
            fields: [
              {
                type: "string",
                name: "sectionTitle",
                label: "Section Title",
              },
              {
                type: "string",
                name: "items",
                label: "Amenity Names",
                list: true,
                description:
                  "Names in order: Heated Pool, Jacuzzi, Sea View, Mountain View, Outdoor Sauna, Padel Court, Gym, Elevator, Design Kitchen, Workspace. Icons are mapped by position.",
              },
            ],
          },
          // Concierge
          {
            type: "object",
            name: "concierge",
            label: "Concierge Section",
            fields: [
              { type: "string", name: "title", label: "Title" },
              { type: "string", name: "kicker", label: "Kicker" },
              {
                type: "string",
                name: "paragraphs",
                label: "Body Paragraphs",
                list: true,
                ui: { component: "textarea" },
              },
              {
                type: "string",
                name: "closingText",
                label: "Closing Text",
              },
              {
                type: "string",
                name: "services",
                label: "Services List",
                list: true,
              },
            ],
          },
          // Gallery (text only)
          {
            type: "object",
            name: "gallery",
            label: "Gallery Section",
            fields: [
              { type: "string", name: "title", label: "Title" },
              { type: "string", name: "subtitle", label: "Subtitle" },
              { type: "string", name: "description", label: "Description" },
            ],
          },
          // Map / Location
          {
            type: "object",
            name: "map",
            label: "Location Section",
            fields: [
              { type: "string", name: "title", label: "Title" },
              { type: "string", name: "address", label: "Address" },
              { type: "string", name: "gettingHereTitle", label: "Getting Here Title" },
              {
                type: "string",
                name: "gettingHereIntro",
                label: "Getting Here Intro",
                ui: { component: "textarea" },
              },
              {
                type: "object",
                name: "distances",
                label: "Distance Items",
                list: true,
                fields: [
                  { type: "string", name: "name", label: "Place Name", required: true },
                  { type: "string", name: "detail", label: "Distance Detail", required: true },
                ],
              },
            ],
          },
          // Contact Form
          {
            type: "object",
            name: "contact",
            label: "Contact Section",
            fields: [
              { type: "string", name: "badge", label: "Badge Text" },
              { type: "string", name: "title", label: "Title" },
              { type: "string", name: "subtitle", label: "Subtitle" },
            ],
          },
        ],
      },
    ],
  },
});
