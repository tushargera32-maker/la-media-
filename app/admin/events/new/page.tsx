import EventForm from '@/components/admin/EventForm';

export default function NewEventPage() {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Create New Event</h1>
          <p className="text-gray-600 mt-1">Fill in the details to create a new event</p>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <EventForm mode="create" />
        </div>
      </div>
    </div>
  );
}
