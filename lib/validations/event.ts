import { z } from 'zod';

export const eventSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters').max(200),
  slug: z.string().min(3, 'Slug must be at least 3 characters').max(200).regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Slug must be lowercase with hyphens only'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  location: z.string().min(3, 'Location is required'),
  startDate: z.string().or(z.date()),
  endDate: z.string().or(z.date()),
  image: z.string().url('Must be a valid URL').optional().or(z.literal('')),
  video: z.string().url('Must be a valid URL').optional().or(z.literal('')),
  status: z.enum(['upcoming', 'ongoing', 'completed', 'cancelled']).default('upcoming'),
  featured: z.boolean().default(false),
  expectedAttendees: z.number().int().positive().optional().or(z.nan()),
  registeredCount: z.number().int().min(0).optional().or(z.nan()),
  brandPartners: z.number().int().min(0).optional().or(z.nan()),
  speakers: z.number().int().min(0).optional().or(z.nan()),
  published: z.boolean().default(false),
});

export type EventFormData = z.infer<typeof eventSchema>;
