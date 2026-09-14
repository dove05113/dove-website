export interface PricingItem {
  id: number;
  service: string;
  description: string;
  price: string;
  unit: string;
}
export const pricingItems: PricingItem[] = [
  {
    id: 1,
    service: "Black & White Printing",
    description: "Clear and professional document printing.",
    price: "KSh 10",
    unit: "per page",
  },
  {
    id: 2,
    service: "Colour Printing",
    description: "High-quality colour printing for your documents.",
    price: "KSh 30",
    unit: "per page",
  },
  {
    id: 3,
    service: "Photocopying",
    description: "Fast and affordable document photocopying.",
    price: "KSh 5",
    unit: "per page",
  },
  {
    id: 4,
    service: "Lamination",
    description: "Protect and preserve important documents.",
    price: "From KSh 50",
    unit: "per document",
  },
  {
    id: 5,
    service: "Document Binding",
    description: "Professional binding for reports and documents.",
    price: "From KSh 100",
    unit: "per document",
  },
  {
    id: 6,
    service: "CV Preparation",
    description: "Professional CV preparation and formatting.",
    price: "From KSh 300",
    unit: "per CV",
  },
];
