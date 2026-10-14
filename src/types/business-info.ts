export interface BusinessInformation {
  id: string;

  name: string;
  tagline: string;
  description: string;

  phone: string;
  email: string;
  whatsapp: string;

  address: string;
  location: string;

  openingHours: {
    monday: string;
    tuesday: string;
    wednesday: string;
    thursday: string;
    friday: string;
    saturday: string;
    sunday: string;
  };

  logoUrl: string;
  faviconUrl: string;

  googleMapsUrl: string;
  latitude: number;
  longitude: number;

  facebookUrl: string;
  instagramUrl: string;
  tiktokUrl: string;
  whatsappUrl: string;

  updatedAt?: Date;
}
