import PartnerForm from '@/components/admin/PartnerForm';

export default function NewPartnerPage() {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Add New Partner</h1>
          <p className="text-gray-600 mt-1">Fill in the details to add a new partner brand</p>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <PartnerForm mode="create" />
        </div>
      </div>
    </div>
  );
}
