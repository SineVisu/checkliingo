
import { z } from "zod";

export const profileSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Please enter a valid email address"),
  trainingMethod: z.string().optional(),
  learnMoreAboutFlyber: z.boolean().optional().default(false)
});

export type ProfileFormValues = z.infer<typeof profileSchema>;
