export type GarbaStyle =
  | "3-Taali"
  | "Dodhiyu"
  | "Popat"
  | "Tran-Taali"
  | "Bollywood Fusion"
  | "Dodhiya"
  | "Tran Taali"
  | "Sanedo Specialist"
  | "2-Taali Classic"
  | "Popat Raas"
  | "Bolly-Garba Fusion";

export type OutfitColor =
  | "Radiant Yellow"
  | "Festive Red"
  | "Peacock Turquoise"
  | "Royal Purple";

export type SkillLevel = "Beginner" | "Intermediate" | "Garba Pro";

export type VenuePreference =
  | "Kora Kendra Grounds, Borivali"
  | "Dome SVP Stadium / Worli Ground"
  | "Club VIP Arena"
  | "Local Society Garba Circle"
  | "GMDC Ground, Ahmedabad"
  | "United Way Garba, Baroda";

export type DandiyaStickType =
  | "Neon Cyber LED Sticks"
  | "Handcrafted Mirror Wooden"
  | "Traditional Rajkot Brass"
  | "Royal Gold Foil Carved";

export interface DandiyaProfile {
  id: string;
  name: string;
  age: number;
  city: string;
  venue: string;
  bio: string;
  avatar: string;
  photos?: string[];
  gender?: string;
  skillLevel?: SkillLevel;
  garbaStyles: GarbaStyle[];
  energyScore: number; // 1 to 10
  compatibility: number; // Percentage
  dandiyaType: DandiyaStickType;
  distanceKm: number;
  badges: string[];
  verified: boolean;
  favoriteSong: string;
  outfitColor: string;
  instagram?: string;
  strikeCount: number;
  online: boolean;
}

export interface MatchItem {
  id: string;
  profile: DandiyaProfile;
  matchedAt: string;
  venuePlan: string;
  lastMessage?: string;
  unreadCount?: number;
  isUnlocked?: boolean;
}

export interface ChatMessage {
  id: string;
  senderId: string;
  senderName: string;
  text: string;
  timestamp: string;
  isUser: boolean;
  dandiyaEmoji?: string;
  messageType?: "text" | "outfit-compare" | "venue-sync" | "garba-track";
  metadata?: {
    userOutfit?: string;
    partnerOutfit?: string;
    compatNote?: string;
    venueName?: string;
    venueTime?: string;
    trackName?: string;
    trackArtist?: string;
  };
}

export interface CurrentUserProfile {
  name: string;
  age: number;
  gender: string;
  city: string;
  currentVenue: string;
  bio: string;
  avatar: string;
  photos: string[];
  garbaStyles: GarbaStyle[];
  outfitColor: OutfitColor;
  skillLevel: SkillLevel;
  venuePreference: string;
  energyScore: number;
  dandiyaType: DandiyaStickType;
  favoriteSong: string;
  superLikesLeft: number;
  passesOwned: string[];
  unlockedChats: string[];
  onboardingCompleted: boolean;
  confirmed18?: boolean;
  agreedToTerms?: boolean;
}

export interface OnboardingFormData {
  // Step 1: Basic Details
  fullName: string;
  age: number;
  gender: string;
  city: string;
  bio: string;

  // Step 2: Dandiya Preferences
  favoriteStyles: GarbaStyle[];
  outfitColor: OutfitColor;
  preferredVenue: string;
  skillLevel: SkillLevel;

  // Step 3: Photos & Mandatory Consents
  photos: string[];
  confirmed18: boolean;
  agreedToTerms: boolean;
}

export type LegalDocType = "terms" | "privacy" | "safety" | "report";

