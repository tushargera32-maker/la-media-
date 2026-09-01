# Blog CRUD System

A complete blog management system with create, read, update, and delete functionality.

## Features

- **List View**: Paginated blog posts with filtering by category and publish status
- **Create**: Rich text editor for creating new blog posts
- **Edit**: Update existing blog posts
- **Delete**: Remove blog posts with confirmation
- **Rich Text Editor**: TipTap editor with formatting options (bold, italic, headings, lists, links, images, quotes)

## Routes

### Admin Routes
- `/admin/blog` - Blog post list view
- `/admin/blog/create` - Create new blog post
- `/admin/blog/edit/[id]` - Edit existing blog post

### API Routes
- `GET /api/blog` - List blog posts (with pagination and filters)
- `POST /api/blog` - Create new blog post
- `GET /api/blog/[id]` - Get single blog post
- `PUT /api/blog/[id]` - Update blog post
- `DELETE /api/blog/[id]` - Delete blog post

## Components

### RichTextEditor
Location: `/components/RichTextEditor.tsx`

A rich text editor component using TipTap with the following features:
- Text formatting (bold, italic, strikethrough)
- Headings (H2, H3)
- Lists (bullet and numbered)
- Blockquotes
- Links
- Images
- Placeholders

## Database Schema

The BlogPost model in Prisma includes:
- `id`: Unique identifier
- `title`: Post title
- `slug`: URL-friendly slug
- `excerpt`: Short summary
- `content`: Full HTML content
- `category`: Post category
- `author`: Author name
- `image`: Featured image URL (optional)
- `published`: Publication status
- `publishedAt`: Publication date
- `createdAt`, `updatedAt`: Timestamps

## Usage

1. Navigate to `/admin/blog` to view all blog posts
2. Click "Create New Post" to add a new blog post
3. Use the rich text editor to format your content
4. Click "Edit" on any post to modify it
5. Click "Delete" to remove a post (with confirmation)

## Filtering

The blog list supports filtering by:
- Category (News, Events, Industry, Insights, Updates)
- Status (Published, Draft, All)

## Pagination

The list view includes pagination with:
- 10 posts per page
- Previous/Next navigation
- Page indicator
