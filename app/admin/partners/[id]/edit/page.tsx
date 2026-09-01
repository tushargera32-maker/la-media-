'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import PartnerForm from '@/components/admin/PartnerForm';
import { PartnerFormData } from '@/lib/validations/partner';

export default function EditPartnerPage() {
  const params = useParams();
  const partnerId = params.id as string;
  const [initialData, setInitialData] = useState<PartnerFormData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPartner = async () => {
      try {
        const response = await fetch(`/api/partners/${partnerId}`);

        if (!response.ok) {
          throw new Error('Failed to fetch partner');
        }

        const data = await response.json();
        setInitialData(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPartner();
  }, [partnerId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow p-8 text-center">
            <p className="text-gray-600">Loading partner...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error || !initialData) {
    return (
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-red-50 border border-red-200 text-red-800 rounded-lg p-4">
            {error || 'Partner not found'}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Edit Partner</h1>
          <p className="text-gray-600 mt-1">Update partner information</p>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <PartnerForm mode="edit" partnerId={partnerId} initialData={initialData} />
        </div>
      </div>
    </div>
  );
}
