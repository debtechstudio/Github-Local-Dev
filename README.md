# Shri Jagannath Temple Website

A modern, full-stack temple website built with Next.js, featuring a complete admin panel for content management and GetePay payment integration.

## Architecture Overview

This project uses a **single Next.js application** that serves both frontend and backend functionality:

- **Frontend**: React components with Tailwind CSS
- **Backend**: Next.js API routes
- **Database**: MySQL with Prisma ORM
- **Authentication**: NextAuth.js
- **Payments**: GetePay integration
- **Admin Panel**: Custom-built CMS

## Why Single Server Architecture?

### ✅ Advantages:
1. **Simplified Deployment** - One application to deploy and maintain
2. **Shared Code** - Reuse types, utilities, and validation logic
3. **Better Performance** - No network latency between frontend/backend
4. **Easier Development** - Single codebase, unified tooling
5. **Cost Effective** - One server instance instead of two
6. **SEO Friendly** - Server-side rendering out of the box

### 🚫 When NOT to use separate servers:
- Small to medium websites (like this temple site)
- Teams with limited DevOps resources
- Projects requiring rapid development
- When you need tight integration between frontend/backend

## Project Structure

```
├── app/                    # Next.js App Router
│   ├── admin/             # Admin panel pages
│   ├── api/               # Backend API routes
│   ├── (public)/          # Public pages
│   └── layout.tsx         # Root layout
├── components/            # Reusable UI components
│   ├── admin/            # Admin-specific components
│   ├── layout/           # Layout components
│   └── ui/               # Base UI components
├── lib/                   # Shared utilities
│   ├── auth.ts           # Authentication config
│   ├── prisma.ts         # Database client
│   └── validations/      # Zod schemas
├── prisma/               # Database schema
└── public/               # Static assets
```

## Features

### 🏛️ Frontend Features
- Responsive temple website
- Dynamic page rendering from database
- Event management and display
- Photo gallery with filtering
- Contact forms
- Newsletter subscription
- SEO optimized pages

### 🔧 Admin Panel Features
- Complete CMS for page management
- Event management
- Media library
- Donation tracking
- Contact message management
- Newsletter management
- Theme customization
- Site settings management

### 💳 Payment Integration
- GetePay payment gateway
- Secure donation processing
- Receipt generation
- Payment status tracking
- Email notifications

### 🔐 Security Features
- NextAuth.js authentication
- Role-based access control
- CSRF protection
- Input validation with Zod
- SQL injection prevention

## Technology Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Database**: MySQL with Prisma ORM
- **Authentication**: NextAuth.js
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI + shadcn/ui
- **Forms**: React Hook Form + Zod
- **Payments**: GetePay
- **Email**: Modern fetch-based email service

## Getting Started

### Prerequisites
- Node.js 18+ (LTS)
- MySQL 8.0+
- npm or yarn

### Installation

1. **Clone and install dependencies**
```bash
git clone <repository-url>
cd shri-jagannath-temple
npm install
```

2. **Set up environment variables**
```bash
cp .env.example .env
# Edit .env with your configuration
```

3. **Set up the database**
```bash
# Generate Prisma client
npm run db:generate

# Push schema to database
npm run db:push

# Seed initial data
npm run db:seed
```

4. **Start development server**
```bash
npm run dev
```

Visit `http://localhost:3000` for the website and `http://localhost:3000/admin` for the admin panel.

### Default Admin Credentials
- Email: `admin@temple.com`
- Password: `admin@123`

## Environment Variables

```env
# Database
DATABASE_URL="mysql://user:password@localhost:3306/templedb"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key"

# Admin Credentials
SUPERADMIN_EMAIL="admin@temple.com"
SUPERADMIN_PASSWORD="admin@123"

# GetePay Configuration
GETEPAY_MID=108
GETEPAY_TERMINAL_ID="Getepay.merchant61062@icici"
GETEPAY_KEY="your-getepay-key"
GETEPAY_IV="your-getepay-iv"
```

## Deployment

### Single Server Deployment (Recommended)

**Option 1: Vercel (Recommended)**
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

**Option 2: Traditional VPS**
```bash
# Build the application
npm run build

# Start production server
npm start
```

**Option 3: Docker**
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

## API Routes

### Public APIs
- `GET /api/pages/[slug]` - Get page content
- `POST /api/contact` - Submit contact form
- `POST /api/newsletter/subscribe` - Newsletter subscription
- `POST /api/payment/initiate` - Start donation process

### Admin APIs (Protected)
- `GET /api/admin/dashboard/stats` - Dashboard statistics
- `CRUD /api/admin/pages` - Page management
- `CRUD /api/admin/events` - Event management
- `CRUD /api/admin/media` - Media management

## Database Schema

The application uses Prisma with MySQL. Key models:

- **User** - Admin users with role-based access
- **Page** - Dynamic pages with SEO metadata
- **Event** - Temple events and festivals
- **Donation** - Payment records and tracking
- **Media** - File uploads and management
- **ContactMessage** - Contact form submissions
- **SiteSettings** - Global site configuration

## Performance Optimizations

- **Image Optimization** - Next.js automatic image optimization
- **Code Splitting** - Automatic route-based code splitting
- **Caching** - Built-in caching for static and dynamic content
- **Database** - Optimized queries with Prisma
- **CDN Ready** - Static assets optimized for CDN delivery

## Security Measures

- **Authentication** - Secure admin authentication
- **Authorization** - Role-based access control
- **Input Validation** - Zod schema validation
- **SQL Injection Prevention** - Prisma ORM protection
- **CSRF Protection** - Built-in Next.js protection
- **Rate Limiting** - API route protection

## Monitoring and Analytics

- **Error Tracking** - Console logging with structured errors
- **Performance Monitoring** - Next.js built-in analytics
- **Database Monitoring** - Prisma query logging
- **Payment Tracking** - Comprehensive donation logging

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## Support

For technical support or questions:
- Email: tech@temple.com
- Documentation: [Project Wiki]
- Issues: [GitHub Issues]

## License

This project is licensed under the MIT License - see the LICENSE file for details.