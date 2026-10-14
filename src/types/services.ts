export type PricingOption = {
  name: string;
  price: number;
  unit: string;
};

export interface Service {
  id: string;
  name: string;
  slug: string;
  description: string;

  group: "cyber" | "design";
  category: string;

  imageUrl: string;

  featured: boolean;
  active: boolean;
  sortOrder: number;

  pricing: PricingOption[];
  pricingType: "fixed" | "custom";

  createdAt?: Date;
  updatedAt?: Date;
}
