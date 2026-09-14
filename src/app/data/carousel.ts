export interface CarouselSlide {
  id: number;
  image: string;
  imageAlt: string;
  eyebrow: string;
  title: string;
  description: string;
  features: string[];
  buttonText: string;
  buttonLink: string;
}

export const carouselSlides: CarouselSlide[] = [
  {
    id: 1,
    image: "/images/printing.jpg",
    imageAlt: "Professional printing services",
    eyebrow: "PRINTING SERVICES",
    title: "Professional Printing Solutions",
    description:
      "High-quality printing services for documents, reports, posters, brochures, business materials and more.",
    features: [
      "High-quality printing",
      "Fast turnaround",
      "Affordable rates",
    ],
    buttonText: "View Printing Services",
    buttonLink: "/services/printing",
  },

  {
    id: 2,
    image: "/images/online-services.jpeg",
    imageAlt: "Digital and online services",
    eyebrow: "DIGITAL SERVICES",
    title: "Digital & Online Services",
    description:
      "Get professional assistance with online applications, government services, document processing and other digital needs.",
    features: [
      "Online applications",
      "Government services",
      "Professional assistance",
    ],
    buttonText: "Explore Services",
    buttonLink: "/services/online",
  },

  {
    id: 3,
    image: "/images/cv-services.jpg",
    imageAlt: "CV and document preparation",
    eyebrow: "DOCUMENT SERVICES",
    title: "CV & Document Preparation",
    description:
      "Create professional CVs, applications, letters, reports and other documents that make a strong impression.",
    features: [
      "Professional CV preparation",
      "Document typing",
      "Formatting & editing",
    ],
    buttonText: "Learn More",
    buttonLink: "/services/documents",
  },

  {
    id: 4,
    image: "/images/branding.jpg",
    imageAlt: "Business branding and graphic design",
    eyebrow: "DESIGN & BRANDING",
    title: "Creative Design & Branding",
    description:
      "Transform your ideas into professional marketing materials, business branding and attractive visual designs.",
    features: [
      "Graphic design",
      "Business branding",
      "Marketing materials",
    ],
    buttonText: "Discover More",
    buttonLink: "/services/design",
  },
];