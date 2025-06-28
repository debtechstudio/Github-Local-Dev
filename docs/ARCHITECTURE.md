# Architecture Documentation

## System Overview

The Shri Jagannath Temple website is built as a **monolithic Next.js application** that serves both frontend and backend functionality. This architecture choice provides optimal performance, maintainability, and cost-effectiveness for a temple website.

## Architecture Decision: Single Server vs. Separate Servers

### ✅ Why Single Next.js Application is Best

#### 1. **Simplified Development & Deployment**
- One codebase to maintain
- Unified tooling and dependencies
- Single deployment pipeline
- Shared TypeScript types and utilities

#### 2. **Performance Benefits**
- No network latency between frontend/backend
- Server-side rendering (SSR) out of the box
- Optimized bundling and code splitting
- Built-in caching mechanisms

#### 3. **Cost Effectiveness**
- Single server instance
- Reduced infrastructure complexity
- Lower hosting costs
- Simplified monitoring and logging

#### 4. **Developer Experience**
- Hot reloading for both frontend and backend
- Unified error handling and debugging
- Shared validation schemas
- Consistent code style and patterns

### ❌ When NOT to Use Separate Servers

Separate servers would be overkill for this project because:
- **Scale**: Temple website has moderate traffic
- **Complexity**: No need for microservices complexity
- **Team Size**: Small development team
- **Resources**: Limited DevOps resources
- **Integration**: Tight coupling between frontend/backend needed

## System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    Next.js Application                      │
├─────────────────────────────────────────────────────────────┤
│  Frontend (React)          │  Backend (API Routes)          │
│  ├── Public Pages          │  ├── Authentication            │
│  ├── Admin Panel           │  ├── Page Management           │
│  ├── Components            │  ├── Payment Processing        │
│  └── Layouts               │  └── File Upload               │
├─────────────────────────────────────────────────────────────┤
│                    Shared Layer                             │
│  ├── Types & Interfaces    │  ├── Validation Schemas        │
│  ├── Utilities             │  └── Constants                 │
├─────────────────────────────────────────────────────────────┤
│                    Data Layer                               │
│  ├── Prisma ORM           │  ├── MySQL Database            │
│  ├── Authentication       │  └── File Storage              │
└─────────────────────────────────────────────────────────────┘
```

## Technology Stack

### Core Framework
- **Next.js 15**: React framework with App Router
- **TypeScript**: Type-safe development
- **React 18**: UI library with latest features

### Database & ORM
- **MySQL 8.0**: Relational database
- **Prisma**: Type-safe database client
- **Connection Pooling**: Optimized database connections

### Authentication & Security
- **NextAuth.js**: Authentication framework
- **bcryptjs**: Password hashing
- **Zod**: Runtime type validation
- **CSRF Protection**: Built-in Next.js security

### UI & Styling
- **Tailwind CSS**: Utility-first CSS framework
- **Radix UI**: Accessible component primitives
- **shadcn/ui**: Pre-built component library
- **Lucide Icons**: Icon library

### Payment Integration
- **GetePay**: Payment gateway integration
- **Crypto-js**: Encryption for payment data
- **Receipt Generation**: PDF receipt creation

### Development Tools
- **ESLint**: Code linting
- **Prettier**: Code formatting
- **Husky**: Git hooks
- **TypeScript**: Static type checking

## Directory Structure

```
shri-jagannath-temple/
├── app/                          # Next.js App Router
│   ├── (admin)/                  # Admin routes group
│   │   ├── admin/
│   │   │   ├── dashboard/
│   │   │   ├── pages/
│   │   │   ├── events/
│   │   │   └── settings/
│   │   └── layout.tsx
│   ├── (public)/                 # Public routes group
│   │   ├── about/
│   │   ├── events/
│   │   ├── gallery/
│   │   └── contact/
│   ├── api/                      # Backend API routes
│   │   ├── auth/
│   │   ├── admin/
│   │   ├── payment/
│   │   └── public/
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/                   # Reusable components
│   ├── admin/                    # Admin-specific components
│   ├── layout/                   # Layout components
│   ├── ui/                       # Base UI components
│   └── forms/                    # Form components
├── lib/                          # Shared utilities
│   ├── auth.ts                   # Authentication config
│   ├── prisma.ts                 # Database client
│   ├── validations/              # Zod schemas
│   ├── utils.ts                  # Utility functions
│   └── constants.ts              # Application constants
├── prisma/                       # Database schema
│   ├── schema.prisma
│   └── migrations/
├── public/                       # Static assets
│   ├── images/
│   └── uploads/
├── docs/                         # Documentation
└── scripts/                      # Utility scripts
```

## Data Flow

### 1. **User Request Flow**
```
User Request → Next.js Router → Page Component → API Route → Database → Response
```

### 2. **Admin Panel Flow**
```
Admin Login → NextAuth → Protected Route → Admin Component → API → Database
```

### 3. **Payment Flow**
```
Donation Form → Validation → API Route → GetePay → Webhook → Database → Confirmation
```

## Database Design

### Core Entities

#### **Pages**
- Dynamic content management
- SEO metadata
- Layout configuration
- Navigation control

#### **Events**
- Festival and event management
- Date-based organization
- Media attachments
- Publication control

#### **Donations**
- Payment tracking
- Donor information
- Transaction logs
- Receipt generation

#### **Users**
- Admin authentication
- Role-based access
- Session management

#### **Media**
- File upload management
- Usage tracking
- Metadata storage

### Relationships
```sql
Users (1:N) → Pages
Events (N:1) → Media
Donations (1:N) → PaymentLogs
Pages (N:N) → Media (through content)
```

## Security Architecture

### Authentication
- **NextAuth.js**: Secure session management
- **JWT Tokens**: Stateless authentication
- **Password Hashing**: bcrypt with salt rounds
- **Session Storage**: Secure HTTP-only cookies

### Authorization
- **Role-Based Access**: Admin, Editor, Viewer roles
- **Route Protection**: Middleware-based protection
- **API Security**: Protected admin endpoints

### Data Protection
- **Input Validation**: Zod schema validation
- **SQL Injection Prevention**: Prisma ORM protection
- **XSS Prevention**: React built-in protection
- **CSRF Protection**: Next.js built-in tokens

### Payment Security
- **Encryption**: AES encryption for payment data
- **Secure Transmission**: HTTPS only
- **Webhook Verification**: Signature validation
- **PCI Compliance**: Following payment standards

## Performance Optimizations

### Frontend Optimizations
- **Code Splitting**: Automatic route-based splitting
- **Image Optimization**: Next.js Image component
- **Static Generation**: ISR for dynamic content
- **Bundle Analysis**: Webpack bundle analyzer

### Backend Optimizations
- **Database Indexing**: Optimized query performance
- **Connection Pooling**: Efficient database connections
- **Caching**: Redis for session and data caching
- **API Rate Limiting**: Prevent abuse

### Build Optimizations
- **Tree Shaking**: Remove unused code
- **Minification**: Compressed JavaScript/CSS
- **Compression**: Gzip/Brotli compression
- **CDN Integration**: Static asset delivery

## Monitoring & Observability

### Logging
- **Structured Logging**: JSON format logs
- **Error Tracking**: Comprehensive error logging
- **Performance Metrics**: Response time tracking
- **User Analytics**: Page view tracking

### Health Checks
- **Database Health**: Connection monitoring
- **API Health**: Endpoint availability
- **Payment Gateway**: Service status
- **File System**: Storage monitoring

## Scalability Considerations

### Horizontal Scaling
- **Load Balancing**: Multiple Next.js instances
- **Database Replication**: Read replicas
- **CDN Integration**: Global content delivery
- **Caching Layers**: Redis/Memcached

### Vertical Scaling
- **Resource Optimization**: Memory and CPU tuning
- **Database Optimization**: Query optimization
- **Connection Limits**: Proper pool sizing
- **Background Jobs**: Queue processing

## Deployment Architecture

### Production Environment
```
Internet → CDN → Load Balancer → Next.js App → Database
                                      ↓
                               File Storage (S3/Local)
```

### Development Environment
```
Developer → Next.js Dev Server → Local MySQL → Local Files
```

## API Design

### RESTful Endpoints
```
GET    /api/pages              # List pages
POST   /api/pages              # Create page
GET    /api/pages/[id]         # Get page
PUT    /api/pages/[id]         # Update page
DELETE /api/pages/[id]         # Delete page
```

### Authentication Endpoints
```
POST   /api/auth/signin        # User login
POST   /api/auth/signout       # User logout
GET    /api/auth/session       # Get session
```

### Payment Endpoints
```
POST   /api/payment/initiate   # Start payment
POST   /api/payment/webhook    # Payment callback
GET    /api/payment/status     # Check status
```

## Error Handling

### Client-Side Errors
- **Error Boundaries**: React error catching
- **Form Validation**: Real-time validation
- **User Feedback**: Toast notifications
- **Graceful Degradation**: Fallback UI

### Server-Side Errors
- **Try-Catch Blocks**: Comprehensive error handling
- **Error Logging**: Detailed error information
- **Status Codes**: Proper HTTP responses
- **Error Pages**: Custom error pages

## Future Enhancements

### Planned Features
- **Multi-language Support**: i18n implementation
- **Advanced Analytics**: Detailed reporting
- **Mobile App**: React Native companion
- **Email Marketing**: Newsletter automation

### Technical Improvements
- **Microservices**: If scale demands
- **GraphQL**: API evolution
- **Real-time Features**: WebSocket integration
- **AI Integration**: Content recommendations

This architecture provides a solid foundation for the temple website while maintaining simplicity and effectiveness for the current requirements.