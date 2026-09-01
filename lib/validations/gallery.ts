import { z } from 'zod';

export const galleryImageSchema = z.object({
  title: z.string().min(1, 'Title is required').max(200).optional().or(z.literal('')),
  image: z.string().url('Must be a valid URL').min(1, 'Image URL is required'),
  eventId: z.string().optional().or(z.literal('')),
  category: z.string().min(1, 'Category is required').max(100).optional().or(z.literal('')),
  order: z.number().int().min(0).default(0),
  published: z.boolean().default(true),
});

export const galleryImageUpdateSchema = galleryImageSchema.partial().extend({
  image: z.string().url('Must be a valid URL').optional(),
});

export type GalleryImageFormData = z.infer<typeof galleryImageSchema>;
export type GalleryImageUpdateData = z.infer<typeof galleryImageUpdateSchema>;
