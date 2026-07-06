import { z } from "zod";

export const newsletterSubscriptionSchema = z.object({
  email: z.string().trim().email().max(254).transform((value) => value.toLowerCase()),
});

export const waitlistEntrySchema = z.object({
  category: z.enum(["Driver", "Rider"]),
  email: z.string().trim().email().max(254).transform((value) => value.toLowerCase()),
  fullName: z.string().trim().min(2).max(100),
  stateCity: z.string().trim().min(2).max(120),
});