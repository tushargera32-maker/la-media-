import { z } from 'zod';

export const galleryImageSchema = z.object({
  title: z.string().max(200).optional().or(z.literal('')).nullable(),
  image: z.string().min(1, 'Image URL is required'),
  eventId: z.string().optional().or(z.literal('')).nullable(),
  category: z.string().max(100).optional().or(z.literal('')).nullable(),
  order: z.number().int().min(0).default(0),
  published: z.boolean().default(true),
});

export const galleryImageUpdateSchema = galleryImageSchema.partial().extend({
  image: z.string().optional(),
});

export type GalleryImageFormData = z.infer<typeof galleryImageSchema>;
export type GalleryImageUpdateData = z.infer<typeof galleryImageUpdateSchema>;
