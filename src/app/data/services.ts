import {
  Printer,
  FileText,
  Globe,
  Palette,
  ScanLine,
  Copy,
  BookOpen,
  Monitor,
} from "lucide-react";

export interface Service {
  id: number;
  title: string;
  description: string;
  icon: React.ElementType;
  href: string;
}

export const services: Service[] = [
  {
    id: 1,
    title: "Printing Services",
    description:
      "Quality black and white and colour printing for documents, reports, posters and business materials.",
    icon: Printer,
    href: "/services/printing",
  },

  {
    id: 2,
    title: "Document Services",
    description:
      "Professional typing, CV preparation, editing, formatting and document preparation services.",
    icon: FileText,
    href: "/services/documents",
  },

  {
    id: 3,
    title: "Online Services",
    description:
      "Get assistance with eCitizen, KRA and other government and online digital services.",
    icon: Globe,
    href: "/services/online",
  },

  {
    id: 4,
    title: "Graphic Design",
    description:
      "Creative graphic design for business cards, posters, flyers, brochures and promotional materials.",
    icon: Palette,
    href: "/services/design",
  },

  {
    id: 5,
    title: "Scanning Services",
    description:
      "Fast and reliable document scanning and conversion of physical documents into digital files.",
    icon: ScanLine,
    href: "/services/scanning",
  },

  {
    id: 6,
    title: "Photocopying",
    description:
      "Clear and affordable photocopying for documents, identification cards, forms and other materials.",
    icon: Copy,
    href: "/services/photocopying",
  },

  {
    id: 7,
    title: "Binding & Lamination",
    description:
      "Professional document binding and lamination for reports, certificates, presentations and more.",
    icon: BookOpen,
    href: "/services/binding",
  },

  {
    id: 8,
    title: "Computer Services",
    description:
      "Computer access and assistance with digital tasks, document preparation and everyday technology needs.",
    icon: Monitor,
    href: "/services/computers",
  },
];
