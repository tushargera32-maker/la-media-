'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

interface UploadFile {
  id: string;
  file: File;
  preview: string;
  title: string;
  category: string;
  uploaded: boolean;
  uploading: boolean;
  error: string | null;
  url: string | null;
}

export default function BulkUploadPage() {
  const router = useRouter();
  const [files, setFiles] = useState<UploadFile[]>([]);
  const [globalCategory, setGlobalCategory] = useState('');
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState({ current: 0, total: 0 });

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || []);

    const validFiles: UploadFile[] = [];
    const errors: string[] = [];

    selectedFiles.forEach((file) => {
      // Validate file type
      const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif', 'video/mp4', 'video/webm', 'video/quicktime'];
      if (!allowedTypes.includes(file.type)) {
        errors.push(`${file.name}: Invalid file type. Only images (JPEG, PNG, WebP, GIF) and videos (MP4, WebM, MOV) are allowed.`);
        return;
      }

      // Validate file size (20MB for images, 50MB for videos)
      const maxSize = file.type.startsWith('video/') ? 50 * 1024 * 1024 : 20 * 1024 * 1024;
      if (file.size > maxSize) {
        const sizeMB = (file.size / 1024 / 1024).toFixed(2);
        const maxMB = file.type.startsWith('video/') ? 50 : 20;
        errors.push(`${file.name}: File size (${sizeMB}MB) exceeds ${maxMB}MB limit.`);
        return;
      }

      // Create preview
      const preview = URL.createObjectURL(file);

      validFiles.push({
        id: `${Date.now()}-${Math.random()}`,
        file,
        preview,
        title: file.name.replace(/\.[^/.]+$/, ''), // Remove extension
        category: '',
        uploaded: false,
        uploading: false,
        error: null,
        url: null,
      });
    });

    if (errors.length > 0) {
      alert('Some files were skipped:\n\n' + errors.join('\n'));
    }

    setFiles((prev) => [...prev, ...validFiles]);
  };

  const handleRemoveFile = (id: string) => {
    setFiles((prev) => prev.filter((f) => f.id !== id));
  };

  const handleTitleChange = (id: string, title: string) => {
    setFiles((prev) =>
      prev.map((f) => (f.id === id ? { ...f, title } : f))
    );
  };

  const handleCategoryChange = (id: string, category: string) => {
    setFiles((prev) =>
      prev.map((f) => (f.id === id ? { ...f, category } : f))
    );
  };

  const applyGlobalCategory = () => {
    if (!globalCategory) return;
    setFiles((prev) =>
      prev.map((f) => ({ ...f, category: globalCategory }))
    );
  };

  const uploadSingleFile = async (fileData: UploadFile): Promise<UploadFile> => {
    try {
      // Upload file
      const formData = new FormData();
      formData.append('file', fileData.file);

      const uploadRes = await fetch('/api/gallery/upload', {
        method: 'POST',
        body: formData,
      });

      if (!uploadRes.ok) {
        const errorData = await uploadRes.json();
        throw new Error(errorData.error || 'Upload failed');
      }

      const { url } = await uploadRes.json();

      // Create gallery entry
      const createRes = await fetch('/api/gallery', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: fileData.title,
          image: url,
          category: fileData.category || null,
          published: true,
          order: 0,
        }),
      });

      if (!createRes.ok) {
        throw new Error('Failed to create gallery entry');
      }

      return { ...fileData, uploaded: true, uploading: false, url };
    } catch (error: any) {
      return {
        ...fileData,
        uploading: false,
        error: error.message || 'Upload failed',
      };
    }
  };

  const handleBulkUpload = async () => {
    if (files.length === 0) return;

    setUploading(true);
    setUploadProgress({ current: 0, total: files.length });

    for (let i = 0; i < files.length; i++) {
      const file = files[i];

      if (file.uploaded) {
        continue; // Skip already uploaded
      }

      // Mark as uploading
      setFiles((prev) =>
        prev.map((f) => (f.id === file.id ? { ...f, uploading: true } : f))
      );

      // Upload file
      const result = await uploadSingleFile(file);

      // Update file state
      setFiles((prev) =>
        prev.map((f) => (f.id === file.id ? result : f))
      );

      setUploadProgress({ current: i + 1, total: files.length });
    }

    setUploading(false);

    // Check if all successful
    const allSuccess = files.every((f) => f.uploaded || f.error);
    if (allSuccess) {
      const failedCount = files.filter((f) => f.error).length;
      if (failedCount === 0) {
        alert('All files uploaded successfully!');
        router.push('/admin/gallery');
      } else {
        alert(`Upload complete with ${failedCount} error(s). Review failed uploads below.`);
      }
    }
  };

  const allUploaded = files.every((f) => f.uploaded);
  const hasFiles = files.length > 0;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Bulk Upload</h1>
            <p className="mt-1 text-sm text-gray-600">
              Upload multiple images and videos at once
            </p>
          </div>
          <Link
            href="/admin/gallery"
            className="rounded-lg border border-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-50"
          >
            Back to Gallery
          </Link>
        </div>

        {/* File Selection */}
        <div className="mb-8 rounded-lg bg-white p-6 shadow-sm">
          <div className="flex items-center gap-4">
            <label className="flex-1">
              <input
                type="file"
                multiple
                accept="image/*,video/*"
                onChange={handleFileSelect}
                disabled={uploading}
                className="hidden"
              />
              <div className="flex cursor-pointer items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 p-8 transition-colors hover:border-blue-500 hover:bg-blue-50">
                <div className="text-center">
                  <svg
                    className="mx-auto h-12 w-12 text-gray-400"
                    stroke="currentColor"
                    fill="none"
                    viewBox="0 0 48 48"
                  >
                    <path
                      d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <p className="mt-2 text-sm text-gray-600">
                    Click to select files or drag and drop
                  </p>
                  <p className="mt-1 text-xs text-gray-500">
                    Images: JPG, PNG, WebP, GIF (max 20MB) • Videos: MP4, WebM, MOV (max 50MB)
                  </p>
                </div>
              </div>
            </label>
          </div>

          {/* Global Category */}
          {hasFiles && (
            <div className="mt-6 flex items-end gap-4">
              <div className="flex-1">
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  Apply category to all files
                </label>
                <input
                  type="text"
                  value={globalCategory}
                  onChange={(e) => setGlobalCategory(e.target.value)}
                  placeholder="e.g., Design Dialect 2.0, Behind the Scenes"
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none"
                />
              </div>
              <button
                onClick={applyGlobalCategory}
                disabled={!globalCategory}
                className="rounded-lg bg-gray-200 px-6 py-2 text-gray-700 hover:bg-gray-300 disabled:opacity-50"
              >
                Apply to All
              </button>
            </div>
          )}
        </div>

        {/* Upload Progress */}
        {uploading && (
          <div className="mb-8 rounded-lg bg-blue-50 p-6">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-blue-900">
                Uploading... {uploadProgress.current} of {uploadProgress.total}
              </span>
              <span className="text-sm text-blue-700">
                {Math.round((uploadProgress.current / uploadProgress.total) * 100)}%
              </span>
            </div>
            <div className="mt-2 h-2 overflow-hidden rounded-full bg-blue-200">
              <div
                className="h-full bg-blue-600 transition-all duration-300"
                style={{
                  width: `${(uploadProgress.current / uploadProgress.total) * 100}%`,
                }}
              />
            </div>
          </div>
        )}

        {/* Files List */}
        {hasFiles && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">
                Selected Files ({files.length})
              </h2>
              <button
                onClick={handleBulkUpload}
                disabled={uploading || allUploaded}
                className="rounded-lg bg-blue-600 px-6 py-2 text-white hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {uploading ? 'Uploading...' : allUploaded ? 'All Uploaded' : 'Upload All'}
              </button>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {files.map((fileData) => (
                <div
                  key={fileData.id}
                  className={`rounded-lg bg-white p-4 shadow-sm ${
                    fileData.uploaded
                      ? 'border-2 border-green-500'
                      : fileData.error
                      ? 'border-2 border-red-500'
                      : fileData.uploading
                      ? 'border-2 border-blue-500'
                      : 'border border-gray-200'
                  }`}
                >
                  {/* Preview */}
                  <div className="relative mb-3 aspect-video overflow-hidden rounded-lg bg-gray-100">
                    {fileData.file.type.startsWith('image/') ? (
                      <Image
                        src={fileData.preview}
                        alt={fileData.title}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <video
                        src={fileData.preview}
                        className="h-full w-full object-cover"
                        muted
                      />
                    )}

                    {/* Status Badge */}
                    {fileData.uploaded && (
                      <div className="absolute right-2 top-2 rounded-full bg-green-500 px-3 py-1 text-xs font-semibold text-white">
                        ✓ Uploaded
                      </div>
                    )}
                    {fileData.uploading && (
                      <div className="absolute right-2 top-2 rounded-full bg-blue-500 px-3 py-1 text-xs font-semibold text-white">
                        Uploading...
                      </div>
                    )}
                    {fileData.error && (
                      <div className="absolute right-2 top-2 rounded-full bg-red-500 px-3 py-1 text-xs font-semibold text-white">
                        Failed
                      </div>
                    )}

                    {/* Remove Button */}
                    {!fileData.uploading && !fileData.uploaded && (
                      <button
                        onClick={() => handleRemoveFile(fileData.id)}
                        className="absolute left-2 top-2 rounded-full bg-black/50 p-2 text-white hover:bg-black/70"
                      >
                        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    )}
                  </div>

                  {/* Details */}
                  <div className="space-y-3">
                    <div>
                      <label className="mb-1 block text-xs font-medium text-gray-700">
                        Title
                      </label>
                      <input
                        type="text"
                        value={fileData.title}
                        onChange={(e) => handleTitleChange(fileData.id, e.target.value)}
                        disabled={fileData.uploaded || fileData.uploading}
                        className="w-full rounded border border-gray-300 px-3 py-1.5 text-sm focus:border-blue-500 focus:outline-none disabled:bg-gray-50"
                      />
                    </div>

                    <div>
                      <label className="mb-1 block text-xs font-medium text-gray-700">
                        Category
                      </label>
                      <input
                        type="text"
                        value={fileData.category}
                        onChange={(e) => handleCategoryChange(fileData.id, e.target.value)}
                        disabled={fileData.uploaded || fileData.uploading}
                        placeholder="Optional"
                        className="w-full rounded border border-gray-300 px-3 py-1.5 text-sm focus:border-blue-500 focus:outline-none disabled:bg-gray-50"
                      />
                    </div>

                    {/* File Info */}
                    <div className="text-xs text-gray-500">
                      {fileData.file.type.startsWith('image/') ? '📷' : '🎥'}{' '}
                      {(fileData.file.size / 1024 / 1024).toFixed(2)} MB
                    </div>

                    {/* Error Message */}
                    {fileData.error && (
                      <p className="text-xs text-red-600">{fileData.error}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Empty State */}
        {!hasFiles && (
          <div className="rounded-lg bg-white p-12 text-center shadow-sm">
            <svg
              className="mx-auto h-16 w-16 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <h3 className="mt-4 text-lg font-semibold text-gray-900">
              No files selected
            </h3>
            <p className="mt-2 text-sm text-gray-600">
              Click the upload area above to select images and videos
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
