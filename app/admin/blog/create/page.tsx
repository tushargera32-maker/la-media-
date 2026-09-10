"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import RichTextEditor from "@/components/RichTextEditor";
import Link from "next/link";

export default function CreateBlogPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    category: "News",
    author: "",
    image: "",
    published: false,
  });

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
  };

  const handleTitleChange = (title: string) => {
    setFormData({
      ...formData,
      title,
      slug: generateSlug(title),
    });
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        setFormData((prev) => ({ ...prev, image: data.url }));
        alert("Image uploaded successfully!");
      } else {
        alert("Failed to upload image");
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      alert("Failed to upload image");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("/api/blog", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          publishedAt: formData.published ? new Date().toISOString() : null,
        }),
      });

      if (response.ok) {
        alert("Blog post created successfully!");
        router.push("/admin/blog");
      } else {
        const error = await response.json();
        alert(error.error || "Failed to create blog post");
      }
    } catch (error) {
      console.error("Error creating blog post:", error);
      alert("Failed to create blog post");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <Link
            href="/admin/blog"
            className="text-blue-600 hover:text-blue-800 text-sm font-medium"
          >
            ← Back to Blog List
          </Link>
          <h1 className="mt-4 text-3xl font-bold text-gray-900">
            Create New Blog Post
          </h1>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-6">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => handleTitleChange(e.target.value)}
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter blog post title"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Slug <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.slug}
                onChange={(e) =>
                  setFormData({ ...formData, slug: e.target.value })
                }
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="blog-post-slug"
              />
              <p className="mt-1 text-sm text-gray-500">
                URL-friendly version of the title
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Excerpt <span className="text-red-500">*</span>
              </label>
              <textarea
                value={formData.excerpt}
                onChange={(e) =>
                  setFormData({ ...formData, excerpt: e.target.value })
                }
                required
                rows={3}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Brief summary of the blog post"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Content <span className="text-red-500">*</span>
              </label>
              <RichTextEditor
                content={formData.content}
                onChange={(content) =>
                  setFormData({ ...formData, content })
                }
                placeholder="Write your blog post content here..."
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.category}
                  onChange={(e) =>
                    setFormData({ ...formData, category: e.target.value })
                  }
                  required
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="News">News</option>
                  <option value="Events">Events</option>
                  <option value="Industry">Industry</option>
                  <option value="Insights">Insights</option>
                  <option value="Updates">Updates</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Author <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.author}
                  onChange={(e) =>
                    setFormData({ ...formData, author: e.target.value })
                  }
                  required
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Author name"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Featured Image
              </label>

              {/* Image Upload Option */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-gray-600 mb-2">
                    Upload Image
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    disabled={uploading}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  {uploading && (
                    <p className="mt-2 text-sm text-blue-600">Uploading...</p>
                  )}
                </div>

                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white text-gray-500">OR</span>
                  </div>
                </div>

                {/* Image URL Option */}
                <div>
                  <label className="block text-sm text-gray-600 mb-2">
                    Image URL
                  </label>
                  <input
                    type="url"
                    value={formData.image}
                    onChange={(e) =>
                      setFormData({ ...formData, image: e.target.value })
                    }
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="https://example.com/image.jpg or /blog-cover-1.png"
                  />
                </div>

                {/* Image Preview */}
                {formData.image && (
                  <div className="mt-4">
                    <p className="text-sm text-gray-600 mb-2">Preview:</p>
                    <img
                      src={formData.image}
                      alt="Preview"
                      className="max-w-xs rounded-lg border border-gray-300"
                    />
                  </div>
                )}
              </div>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="published"
                checked={formData.published}
                onChange={(e) =>
                  setFormData({ ...formData, published: e.target.checked })
                }
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label
                htmlFor="published"
                className="ml-2 block text-sm text-gray-700"
              >
                Publish immediately
              </label>
            </div>
          </div>

          <div className="mt-8 flex gap-4">
            <button
              type="submit"
              disabled={loading}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Creating..." : "Create Blog Post"}
            </button>
            <Link
              href="/admin/blog"
              className="bg-gray-200 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-300 transition-colors font-medium"
            >
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
