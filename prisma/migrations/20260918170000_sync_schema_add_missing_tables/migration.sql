-- CreateTable
CREATE TABLE "ArchitectRegistration" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "firmName" TEXT NOT NULL,
    "designation" TEXT NOT NULL,
    "coaNumber" TEXT NOT NULL,
    "heardAbout" TEXT,
    "consent" BOOLEAN NOT NULL DEFAULT false,
    "handled" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "SponsorRegistration" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "companyName" TEXT NOT NULL,
    "contactName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "gstNumber" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "pincode" TEXT NOT NULL,
    "stallSize" TEXT,
    "requirements" TEXT,
    "heardAbout" TEXT,
    "consent" BOOLEAN NOT NULL DEFAULT false,
    "handled" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "Payment" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "cfOrderId" TEXT NOT NULL,
    "cfPaymentId" TEXT,
    "amount" REAL NOT NULL,
    "currency" TEXT NOT NULL DEFAULT 'INR',
    "status" TEXT NOT NULL DEFAULT 'created',
    "purpose" TEXT NOT NULL DEFAULT 'consultation',
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "notes" TEXT,
    "fulfilled" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "SiteVisitor" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "sessionId" TEXT NOT NULL,
    "ipAddress" TEXT,
    "userAgent" TEXT,
    "referrer" TEXT,
    "landingPage" TEXT,
    "country" TEXT,
    "city" TEXT,
    "device" TEXT,
    "browser" TEXT,
    "os" TEXT,
    "visitCount" INTEGER NOT NULL DEFAULT 1,
    "lastVisitedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "PageView" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "sessionId" TEXT NOT NULL,
    "path" TEXT NOT NULL,
    "title" TEXT,
    "timeSpent" INTEGER,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_BlogPost" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "excerpt" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "author" TEXT NOT NULL,
    "image" TEXT,
    "published" BOOLEAN NOT NULL DEFAULT false,
    "publishedAt" DATETIME,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_BlogPost" ("author", "category", "content", "createdAt", "excerpt", "id", "image", "published", "publishedAt", "slug", "title", "updatedAt") SELECT "author", "category", "content", "createdAt", "excerpt", "id", "image", "published", "publishedAt", "slug", "title", "updatedAt" FROM "BlogPost";
DROP TABLE "BlogPost";
ALTER TABLE "new_BlogPost" RENAME TO "BlogPost";
CREATE UNIQUE INDEX "BlogPost_slug_key" ON "BlogPost"("slug");
CREATE TABLE "new_CollaborationRequest" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "type" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT,
    "company" TEXT,
    "message" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_CollaborationRequest" ("company", "createdAt", "email", "id", "message", "name", "phone", "status", "type", "updatedAt") SELECT "company", "createdAt", "email", "id", "message", "name", "phone", "status", "type", "updatedAt" FROM "CollaborationRequest";
DROP TABLE "CollaborationRequest";
ALTER TABLE "new_CollaborationRequest" RENAME TO "CollaborationRequest";
CREATE TABLE "new_ContactSubmission" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT,
    "company" TEXT,
    "message" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'new',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_ContactSubmission" ("company", "createdAt", "email", "id", "message", "name", "phone", "status", "updatedAt") SELECT "company", "createdAt", "email", "id", "message", "name", "phone", "status", "updatedAt" FROM "ContactSubmission";
DROP TABLE "ContactSubmission";
ALTER TABLE "new_ContactSubmission" RENAME TO "ContactSubmission";
CREATE TABLE "new_Event" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "startDate" DATETIME NOT NULL,
    "endDate" DATETIME NOT NULL,
    "image" TEXT,
    "video" TEXT,
    "status" TEXT NOT NULL DEFAULT 'upcoming',
    "featured" BOOLEAN NOT NULL DEFAULT false,
    "expectedAttendees" INTEGER,
    "registeredCount" INTEGER,
    "brandPartners" INTEGER,
    "speakers" INTEGER,
    "published" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Event" ("brandPartners", "createdAt", "description", "endDate", "expectedAttendees", "featured", "id", "image", "location", "published", "registeredCount", "slug", "speakers", "startDate", "status", "title", "updatedAt", "video") SELECT "brandPartners", "createdAt", "description", "endDate", "expectedAttendees", "featured", "id", "image", "location", "published", "registeredCount", "slug", "speakers", "startDate", "status", "title", "updatedAt", "video" FROM "Event";
DROP TABLE "Event";
ALTER TABLE "new_Event" RENAME TO "Event";
CREATE UNIQUE INDEX "Event_slug_key" ON "Event"("slug");
CREATE TABLE "new_EventRegistration" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "firmName" TEXT,
    "designation" TEXT,
    "coaNumber" TEXT,
    "gstNumber" TEXT,
    "heardAbout" TEXT,
    "consent" BOOLEAN NOT NULL DEFAULT false,
    "handled" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
-- Legacy rows carry fullName/organisation/profile instead of firstName/lastName/firmName/designation.
-- Split fullName on the first space; fall back to 'Unknown' so the NOT NULL columns never fail.
INSERT INTO "new_EventRegistration" ("id", "firstName", "lastName", "email", "phone", "firmName", "designation", "coaNumber", "gstNumber", "heardAbout", "consent", "handled", "createdAt") SELECT "id", COALESCE(NULLIF(TRIM(SUBSTR("fullName", 1, INSTR("fullName" || ' ', ' ') - 1)), ''), 'Unknown'), COALESCE(NULLIF(TRIM(SUBSTR("fullName", INSTR("fullName" || ' ', ' ') + 1)), ''), ''), "email", "phone", "organisation", "profile", "coaNumber", "gstNumber", "heardAbout", "consent", "handled", "createdAt" FROM "EventRegistration";
DROP TABLE "EventRegistration";
ALTER TABLE "new_EventRegistration" RENAME TO "EventRegistration";
CREATE INDEX "EventRegistration_createdAt_idx" ON "EventRegistration"("createdAt");
CREATE INDEX "EventRegistration_email_idx" ON "EventRegistration"("email");
CREATE TABLE "new_GalleryImage" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT,
    "image" TEXT NOT NULL,
    "eventId" TEXT,
    "category" TEXT,
    "order" INTEGER NOT NULL DEFAULT 0,
    "published" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_GalleryImage" ("category", "createdAt", "eventId", "id", "image", "order", "published", "title", "updatedAt") SELECT "category", "createdAt", "eventId", "id", "image", "order", "published", "title", "updatedAt" FROM "GalleryImage";
DROP TABLE "GalleryImage";
ALTER TABLE "new_GalleryImage" RENAME TO "GalleryImage";
CREATE TABLE "new_NewsletterSubscriber" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'active',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_NewsletterSubscriber" ("createdAt", "email", "id", "status", "updatedAt") SELECT "createdAt", "email", "id", "status", "updatedAt" FROM "NewsletterSubscriber";
DROP TABLE "NewsletterSubscriber";
ALTER TABLE "new_NewsletterSubscriber" RENAME TO "NewsletterSubscriber";
CREATE UNIQUE INDEX "NewsletterSubscriber_email_key" ON "NewsletterSubscriber"("email");
CREATE TABLE "new_Partner" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "logo" TEXT,
    "website" TEXT,
    "category" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,
    "published" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Partner" ("category", "createdAt", "id", "logo", "name", "order", "published", "updatedAt", "website") SELECT "category", "createdAt", "id", "logo", "name", "order", "published", "updatedAt", "website" FROM "Partner";
DROP TABLE "Partner";
ALTER TABLE "new_Partner" RENAME TO "Partner";
CREATE TABLE "new_SiteSetting" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "key" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_SiteSetting" ("createdAt", "id", "key", "type", "updatedAt", "value") SELECT "createdAt", "id", "key", "type", "updatedAt", "value" FROM "SiteSetting";
DROP TABLE "SiteSetting";
ALTER TABLE "new_SiteSetting" RENAME TO "SiteSetting";
CREATE UNIQUE INDEX "SiteSetting_key_key" ON "SiteSetting"("key");
CREATE TABLE "new_TeamMember" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "expertise" TEXT NOT NULL,
    "bio" TEXT,
    "image" TEXT,
    "order" INTEGER NOT NULL DEFAULT 0,
    "published" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_TeamMember" ("bio", "createdAt", "expertise", "id", "image", "name", "order", "published", "role", "updatedAt") SELECT "bio", "createdAt", "expertise", "id", "image", "name", "order", "published", "role", "updatedAt" FROM "TeamMember";
DROP TABLE "TeamMember";
ALTER TABLE "new_TeamMember" RENAME TO "TeamMember";
CREATE TABLE "new_User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'admin',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_User" ("createdAt", "email", "id", "name", "password", "role", "updatedAt") SELECT "createdAt", "email", "id", "name", "password", "role", "updatedAt" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE INDEX "ArchitectRegistration_createdAt_idx" ON "ArchitectRegistration"("createdAt");

-- CreateIndex
CREATE INDEX "ArchitectRegistration_email_idx" ON "ArchitectRegistration"("email");

-- CreateIndex
CREATE INDEX "SponsorRegistration_createdAt_idx" ON "SponsorRegistration"("createdAt");

-- CreateIndex
CREATE INDEX "SponsorRegistration_email_idx" ON "SponsorRegistration"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Payment_cfOrderId_key" ON "Payment"("cfOrderId");

-- CreateIndex
CREATE INDEX "Payment_status_idx" ON "Payment"("status");

-- CreateIndex
CREATE INDEX "Payment_createdAt_idx" ON "Payment"("createdAt");

-- CreateIndex
CREATE UNIQUE INDEX "SiteVisitor_sessionId_key" ON "SiteVisitor"("sessionId");

-- CreateIndex
CREATE INDEX "SiteVisitor_createdAt_idx" ON "SiteVisitor"("createdAt");

-- CreateIndex
CREATE INDEX "SiteVisitor_lastVisitedAt_idx" ON "SiteVisitor"("lastVisitedAt");

-- CreateIndex
CREATE INDEX "SiteVisitor_sessionId_idx" ON "SiteVisitor"("sessionId");

-- CreateIndex
CREATE INDEX "PageView_sessionId_idx" ON "PageView"("sessionId");

-- CreateIndex
CREATE INDEX "PageView_path_idx" ON "PageView"("path");

-- CreateIndex
CREATE INDEX "PageView_createdAt_idx" ON "PageView"("createdAt");

