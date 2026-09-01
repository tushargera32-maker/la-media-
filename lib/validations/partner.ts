import { z } from 'zod';

export const partnerSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(100),
  logo: z.string().url('Must be a valid URL').optional().or(z.literal('')),
  website: z.string().url('Must be a valid URL').optional().or(z.literal('')),
  category: z.string().min(2, 'Category is required').max(50),
  order: z.number().int().min(0).default(0),
  published: z.boolean().default(true),
});

export type PartnerFormData = z.infer<typeof partnerSchema>;
