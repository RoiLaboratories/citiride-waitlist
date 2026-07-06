export const WAITLIST_CATEGORIES = ["Driver", "Rider"] as const;

export type WaitlistCategory = (typeof WAITLIST_CATEGORIES)[number];

export type WaitlistEntryPayload = {
  category: WaitlistCategory;
  email: string;
  fullName: string;
  stateCity: string;
};

export type WaitlistApiResponse = {
  message: string;
};
