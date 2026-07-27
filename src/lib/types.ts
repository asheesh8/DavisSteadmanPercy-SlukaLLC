export interface Attorney {
  id: string;
  slug: string;
  name: string;
  title: string;
  photo: string;
  order: number;
  practiceAreas: string[];
  education: string[];
  barAdmissions: string[];
  bio: string;
  phone: string;
  badge?: string;
}

export interface StaffMember {
  id: string;
  name: string;
  title: string;
  photo: string;
  bio: string;
  order: number;
  isPet?: boolean;
}

export interface NewsItem {
  id: string;
  title: string;
  date: string;
  body: string;
}

export interface Office {
  id: string;
  name: string;
  address: string;
  cityStateZip: string;
  phone: string;
  photo: string;
}

export interface Badge {
  id: string;
  image: string;
  alt: string;
}

export interface Settings {
  firmName: string;
  tagline: string;
  introText: string;
  servicesText: string;
  realEstateText: string;
  phone: string;
  woodstockPhone: string;
  email: string;
  offices: Office[];
  badges: Badge[];
  heroImage: string;
  logo: string;
}

export interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  createdAt: string;
  read: boolean;
}
