'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { eventSchema, type EventFormData } from '@/lib/validations/event';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

interface EventFormProps {
  initialData?: EventFormData & { id?: string };
  mode: 'create' | 'edit';
}

export default function EventForm({ initialData, mode }: EventFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<EventFormData>({
    resolver: zodResolver(eventSchema),
    defaultValues: initialData || {
      title: '',
      slug: '',
      description: '',
      location: '',
      startDate: '',
      endDate: '',
      image: '',
      video: '',
      status: 'upcoming',
      featured: false,
      published: false,
    },
  });

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  };

  const onSubmit = async (data: EventFormData) => {
    setIsSubmitting(true);
    setError(null);

    try {
      const url = mode === 'create'
        ? '/api/events'
        : `/api/events/${initialData?.id}`;

      const method = mode === 'create' ? 'POST' : 'PUT';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to save event');
      }

      router.push('/admin/events');
      router.refresh();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 max-w-4xl">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="md:col-span-2">
          <label htmlFor="title" className="block text-sm font-medium mb-2">
            Title *
          </label>
          <input
            id="title"
            type="text"
            {...register('title')}
            onChange={(e) => {
              register('title').onChange(e);
              if (!initialData?.slug) {
                setValue('slug', generateSlug(e.target.value));
              }
            }}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Event title"
          />
          {errors.title && (
            <p className="text-red-600 text-sm mt-1">{errors.title.message}</p>
          )}
        </div>

        <div className="md:col-span-2">
          <label htmlFor="slug" className="block text-sm font-medium mb-2">
            Slug *
          </label>
          <input
            id="slug"
            type="text"
            {...register('slug')}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="event-slug-url"
          />
          {errors.slug && (
            <p className="text-red-600 text-sm mt-1">{errors.slug.message}</p>
          )}
        </div>

        <div className="md:col-span-2">
          <label htmlFor="description" className="block text-sm font-medium mb-2">
            Description *
          </label>
          <textarea
            id="description"
            {...register('description')}
            rows={5}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Detailed description of the event"
          />
          {errors.description && (
            <p className="text-red-600 text-sm mt-1">{errors.description.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="location" className="block text-sm font-medium mb-2">
            Location *
          </label>
          <input
            id="location"
            type="text"
            {...register('location')}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="City, Venue"
          />
          {errors.location && (
            <p className="text-red-600 text-sm mt-1">{errors.location.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="status" className="block text-sm font-medium mb-2">
            Status *
          </label>
          <select
            id="status"
            {...register('status')}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="upcoming">Upcoming</option>
            <option value="ongoing">Ongoing</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>
          {errors.status && (
            <p className="text-red-600 text-sm mt-1">{errors.status.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="startDate" className="block text-sm font-medium mb-2">
            Start Date *
          </label>
          <input
            id="startDate"
            type="datetime-local"
            {...register('startDate')}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          {errors.startDate && (
            <p className="text-red-600 text-sm mt-1">{errors.startDate.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="endDate" className="block text-sm font-medium mb-2">
            End Date *
          </label>
          <input
            id="endDate"
            type="datetime-local"
            {...register('endDate')}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          {errors.endDate && (
            <p className="text-red-600 text-sm mt-1">{errors.endDate.message}</p>
          )}
        </div>

        <div className="md:col-span-2">
          <label htmlFor="image" className="block text-sm font-medium mb-2">
            Image URL
          </label>
          <input
            id="image"
            type="url"
            {...register('image')}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="https://example.com/image.jpg"
          />
          {errors.image && (
            <p className="text-red-600 text-sm mt-1">{errors.image.message}</p>
          )}
        </div>

        <div className="md:col-span-2">
          <label htmlFor="video" className="block text-sm font-medium mb-2">
            Video URL
          </label>
          <input
            id="video"
            type="url"
            {...register('video')}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="https://example.com/video.mp4"
          />
          {errors.video && (
            <p className="text-red-600 text-sm mt-1">{errors.video.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="expectedAttendees" className="block text-sm font-medium mb-2">
            Expected Attendees
          </label>
          <input
            id="expectedAttendees"
            type="number"
            {...register('expectedAttendees', { valueAsNumber: true })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="500"
          />
          {errors.expectedAttendees && (
            <p className="text-red-600 text-sm mt-1">{errors.expectedAttendees.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="registeredCount" className="block text-sm font-medium mb-2">
            Registered Count
          </label>
          <input
            id="registeredCount"
            type="number"
            {...register('registeredCount', { valueAsNumber: true })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="250"
          />
          {errors.registeredCount && (
            <p className="text-red-600 text-sm mt-1">{errors.registeredCount.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="brandPartners" className="block text-sm font-medium mb-2">
            Brand Partners
          </label>
          <input
            id="brandPartners"
            type="number"
            {...register('brandPartners', { valueAsNumber: true })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="10"
          />
          {errors.brandPartners && (
            <p className="text-red-600 text-sm mt-1">{errors.brandPartners.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="speakers" className="block text-sm font-medium mb-2">
            Speakers
          </label>
          <input
            id="speakers"
            type="number"
            {...register('speakers', { valueAsNumber: true })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="5"
          />
          {errors.speakers && (
            <p className="text-red-600 text-sm mt-1">{errors.speakers.message}</p>
          )}
        </div>

        <div className="md:col-span-2 space-y-4">
          <div className="flex items-center">
            <input
              id="featured"
              type="checkbox"
              {...register('featured')}
              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <label htmlFor="featured" className="ml-2 text-sm font-medium">
              Featured Event
            </label>
          </div>

          <div className="flex items-center">
            <input
              id="published"
              type="checkbox"
              {...register('published')}
              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <label htmlFor="published" className="ml-2 text-sm font-medium">
              Published
            </label>
          </div>
        </div>
      </div>

      <div className="flex gap-4 pt-4 border-t">
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'Saving...' : mode === 'create' ? 'Create Event' : 'Update Event'}
        </button>
        <button
          type="button"
          onClick={() => router.push('/admin/events')}
          className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
