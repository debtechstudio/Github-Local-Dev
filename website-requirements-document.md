// ⚙️ PROJECT CONTEXT:
// The temple website https://isanpurjagannath.in is already live with a working frontend, All the existing frontend files inside the "E:\Project\P1\OLDFrontend" folder. Do not use this folder in our project build. Review all existing code and start building the fully functional website.
// including pages, images, layout, and GetePay-powered donations.
// This project builds a fully custom admin panel (no third-party CMS) to manage the full content of the website,
// while preserving all current page content, layout, and theme styles.
// Admin panel must be modular, easy for a layman webmaster, and future-extensible.

// ✅ KEY REQUIREMENTS:

1. 🧱 EXISTING CONTENT INGESTION
- Automatically ingest and preserve all existing static content from current pages:
  - Home, About Temple, Timings, Deities, Annadanam, Events, Gallery, Contact, etc.
- Parse page structure, layout, text, and images
- Store in `Page` model (see below)
- Use a seed script to import existing HTML into DB

2. 🗂️ PAGE MANAGEMENT SYSTEM
- Create a `Page` model with:
  - id, title, slug, layoutType ("full", "boxed", "sidebar")
  - richContent (HTML or WYSIWYG output)
  - showInNav (boolean)
  - published (boolean)
  - seo: metaTitle, metaDescription, keywords, ogImage, canonicalURL
  - sections (optional: allow section-based content blocks)
- Admin can:
  - Edit page content using a WYSIWYG editor (free)
  - Create new pages using CMS-style layouts (theme-aware)
  - Reuse theme layout, header, footer, fonts, colors automatically
  - Control visibility and order in navigation

3. 🎨 THEME & GLOBAL STYLES CONTROL
- Admin panel must include a “Theme Settings” module:
  - Fonts (heading, body)
  - Primary / secondary / accent colors
  - Button colors and border radius
  - Global spacing and container width
  - Logo (uploadable)
  - Favicon
  - Header/footer visibility per page (optional toggle)
- New pages automatically adopt these settings

4. 🖼️ MEDIA LIBRARY
- Admin can:
  - Upload/manage images
  - Organize by tags or folders
  - View usage of each image
  - Reuse across pages, events, gallery
  - Automatically optimize/rescale
- Store: filename, url, uploadedAt, tags, altText, usedIn

5. 📅 EVENTS MODULE
- Fields:
  - title, eventDate, description, bannerImage, showOnHomepage, published
- Admin can manage upcoming and past events
- Displayed in events page and homepage (if tagged)

6. 💳 DONATIONS (GetePay already integrated)
- Model:
  - fullName, email, phone, amount, purpose, message, paymentId, status, createdAt
- Admin can:
  - View, filter, export donation records
  - Mark as processed, add notes
  - Download CSV reports

7. ✉️ CONTACT FORM MESSAGES
- Store submissions from “Contact Us” page:
  - fullName, email, phone, subject, message, createdAt
- Admin can read, archive, or respond externally

8. 🖼️ GALLERY / DAILY DARSHAN MODULE
- Upload and group images by date/event/tag
- Toggle visibility per image/group
- Display in frontend galleries dynamically

9. 📧 NEWSLETTER MODULE
- Capture emails via footer or dedicated form
- Admin can:
  - View subscriber list
  - Send rich HTML newsletters (title + content)
  - Track sent date and delivery status
  - Export subscribers

10. ⚙️ SITE-WIDE SETTINGS
- Editable by admin:
  - Temple name
  - Address, phone, email
  - Temple timings
  - Google Maps embed
  - Social media links: Facebook, Instagram, Twitter, YouTube

11. 🔐 AUTH & SECURITY
- Admin login (email + password)
- Use sessions or JWT
- Protect `/admin` and `/api/admin` routes
- Single admin for now; plan for role support later

12. 🔁 ARCHITECTURE & MODULARITY
- Folder structure:
  - `/models` → Prisma models
  - `/services` → business logic (DB layer)
  - `/routes/api/*` → RESTful APIs
  - `/admin/*` → admin frontend (React/Next.js)
  - `/components` → shared UI: form, table, layout
  - `/utils` → helpers, validators
- Use Tailwind CSS or ShadCN UI
- Codebase should support future feature modules (e.g., volunteer forms, blog)

13. 🔍 SEO SUPPORT FOR ALL PAGES
- Per-page SEO fields: title, description, keywords, og:image
- Canonical URL control
- Optional: JSON-LD support for schema.org

14. 🛠️ TECH STACK PREFERENCES
- Backend: Node.js + Prisma (with SQLite, PostgreSQL or MySQL)
- Admin Panel: Next.js + React + Tailwind
- Editor: Free open-source WYSIWYG (e.g., Tiptap, Quill, TinyMCE Lite)
- File upload: Local or S3-compatible
- Auth: NextAuth, JWT or session-based (custom OK)

15. 🔄 OPTIONAL / FUTURE
- Roles & permissions (multi-admin support)
- Page scheduling (publishAt / unpublishAt)
- Analytics dashboard (visits, donations, messages)
- Audit logs: who edited what
- Form builder (for surveys or registrations)


// ✅ OUTPUT REQUIRED:

1. Prisma Schema (`schema.prisma`) with all required models
2. DB Seed Script to import current static content into the DB
3. API route templates for each module (CRUD)
4. Admin UI pages for:
   - Page editing (with layout & SEO)
   - Media management
   - Event and donation listing
   - Newsletter creator
   - Theme settings panel (fonts, colors, logo)
5. A layout system to wrap all frontend content using saved layout type
6. Auth setup with protected admin dashboard
7. Example page showing how frontend consumes dynamic page content from DB

// ⚠️ DO NOT:
// - Break current layout or theme
- Overwrite existing HTML files
- Strip styles or fonts
- Rebuild pages from scratch

// ✅ DO:
// - Make everything editable going forward
- Preserve existing visual design and theme
- Allow full site control via admin
- Give complete website both frontend and Backend.
- Make sure everything runs smoothly.
- Use Existing database

#ENV

# Database Details

DATABASE_URL="mysql://root:debasis_75863@localhost:3306/templedb"

SUPERADMIN_EMAIL=admin@temple.com
SUPERADMIN_PASSWORD=admin@123
SUPERADMIN_NAME="Temple Super Admin"
JWT_SECRET=bb0ffa312e03398f0b257d5aace3c7bb11428b37c1ac8d58d51c7f9d811ea625

# Getepay Configuration
GETEPAY_MID=108
GETEPAY_TERMINAL_ID="Getepay.merchant61062@icici"
GETEPAY_KEY="JoYPd+qso9s7T+Ebj8pi4Wl8i+AHLv+5UNJxA3JkDgY="
GETEPAY_IV="hlnuyA9b4YxDq6oJSZFl8g=="
GETEPAY_URL="https://pay1.getepay.in:8443/getepayPortal/pg/generateInvoice"

