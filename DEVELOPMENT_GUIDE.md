---
name: nextjs-business-website
description: Build a complete Next.js business website with e-commerce catalog, inquiry forms, service request system, and admin panel. Includes database setup, authentication, SEO, and production deployment.
tags: [nextjs, typescript, prisma, tailwind, business-website, ecommerce, admin-panel]
version: 1.0.0
---

# Next.js Business Website Builder

This skill builds a complete, production-ready business website with:
- Product catalog with advanced filtering
- Inquiry and service request forms
- Admin panel with authentication
- SEO optimization (sitemap, robots.txt, JSON-LD)
- Responsive design and accessibility
- Database with Prisma ORM (SQLite → PostgreSQL migration path)

## Technology Stack

- **Framework**: Next.js 15 (App Router) with TypeScript
- **Styling**: Tailwind CSS
- **Database**: Prisma ORM with SQLite (easily migrate to PostgreSQL)
- **Authentication**: NextAuth.js with credentials provider
- **Validation**: Zod schemas
- **Password Hashing**: bcryptjs

## Project Structure

```
project/
├── prisma/
│   ├── schema.prisma           # Database schema
│   ├── seed.ts                 # Mock data generator
│   └── migrations/             # Database migrations
├── public/
│   └── images/                 # Static images
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── api/                # API Routes
│   │   ├── admin/              # Admin panel (protected)
│   │   ├── products/           # Product pages
│   │   ├── services/           # Service pages
│   │   ├── contact/            # Contact page
│   │   ├── page.tsx            # Homepage
│   │   ├── layout.tsx          # Root layout
│   │   ├── loading.tsx         # Loading states
│   │   ├── error.tsx           # Error boundary
│   │   ├── not-found.tsx       # 404 page
│   │   ├── sitemap.ts          # Dynamic sitemap
│   │   └── robots.ts           # Robots.txt
│   ├── components/
│   │   ├── ui/                 # Base UI components (Button, Input, Card, Badge, etc.)
│   │   ├── layout/             # Header, Footer, Navigation
│   │   ├── home/               # Homepage sections
│   │   ├── products/           # Product components
│   │   ├── forms/              # Form components
│   │   └── admin/              # Admin components
│   ├── lib/
│   │   ├── db/
│   │   │   ├── index.ts        # Prisma client singleton
│   │   │   └── repositories/   # Data access layer
│   │   ├── services/           # Business logic layer
│   │   ├── auth.ts             # NextAuth configuration
│   │   ├── utils.ts            # Utility functions
│   │   └── validations.ts      # Zod schemas
│   ├── types/                  # TypeScript types
│   └── config/
│       ├── constants.ts        # App constants
│       └── seo.ts              # SEO configuration
└── .env.local                  # Environment variables
```

## Implementation Phases

### Phase 1: Foundation & Database Setup
1. Initialize Next.js project with TypeScript and Tailwind
2. Install dependencies (Prisma, NextAuth, Zod, bcryptjs)
3. Create Prisma schema with models:
   - Product (name, slug, brand, category, specs, pricing, images, stock)
   - Inquiry (customer info, type, message, status)
   - ServiceRequest (customer info, service type, issue, urgency, ticket number)
   - Admin (email, password, role)
4. Run migrations and seed database
5. Set up folder structure
6. Create base UI components (Button, Input, Card, Badge, Select)
7. Create layout components (Header, Footer, Navigation)

### Phase 2: Homepage & Core UI
1. Create homepage components:
   - HeroSection (banner with tagline, CTA buttons)
   - ServicesShowcase (service cards with icons)
   - FeaturedProducts (product grid)
   - StatsSection (metrics)
   - TestimonialsSection (customer reviews)
   - CTASection (contact CTAs)
2. Implement homepage composition
3. Add utility functions (cn, formatPrice, slugify)
4. Configure Tailwind theme (colors, utilities)
5. Add placeholder images

### Phase 3: Product Catalog
1. Create repository layer (product.repository.ts)
2. Create service layer (product.service.ts)
3. Create product API endpoints (GET /api/products, GET /api/products/[id])
4. Create product pages (/products, /products/[slug])
5. Create product components:
   - ProductCard (thumbnail, specs, pricing, CTA)
   - ProductGrid (responsive layout)
   - ProductFilter (category, brand, price, specs)
   - ProductDetail (full info with specs table)
   - ProductGallery (image carousel)
6. Implement filtering (client + server)
7. Add SEO (metadata, Product schema, breadcrumbs)

### Phase 4: Inquiry & Service Request Forms
1. Create repositories (inquiry, service-request)
2. Create services (business logic)
3. Create validation schemas (Zod)
4. Create API endpoints (POST /api/inquiries, POST /api/service-requests)
5. Create form components:
   - InquiryForm (with product pre-fill)
   - ServiceRequestForm (with ticket generation)
   - ContactForm
6. Add form handling (validation, loading, success/error states)
7. Integrate WhatsApp links

### Phase 5: Service Pages
1. Create service pages:
   - /services (overview)
   - /services/refurbished (USP page)
   - /services/rentals (pricing structure)
   - /services/smart-setup (gallery, process)
   - /services/repair (service request form)
2. Add service images
3. Create image gallery component
4. Add SEO metadata and Service schema

### Phase 6: Admin Authentication
1. Create NextAuth configuration (Credentials provider, JWT)
2. Create admin repository
3. Create auth API route (/api/auth/[...nextauth])
4. Create login page (/admin/login)
5. Create protected admin layout with session check
6. Create middleware for route protection
7. Add environment variables (NEXTAUTH_URL, NEXTAUTH_SECRET)

### Phase 7: Admin Dashboard
1. Create dashboard page (/admin)
2. Create admin components (StatsCards, InquiryTable, ServiceRequestTable)
3. Create admin API endpoints (/api/admin/stats, /api/admin/inquiries, /api/admin/service-requests)
4. Implement dashboard logic (stats, recent items)

### Phase 8: Admin Product Management
1. Create product management pages (/admin/products, /admin/products/new, /admin/products/[id]/edit)
2. Create ProductForm component (all fields, validation)
3. Create admin product API endpoints (POST, PUT, DELETE /api/admin/products)
4. Implement image upload (local storage)
5. Add product actions (edit, delete, toggle status)

### Phase 9: Admin Inquiry & Service Request Management
1. Create inquiry management page (/admin/inquiries)
2. Create service request management page (/admin/service-requests)
3. Create admin API endpoints (PUT /api/admin/inquiries/[id], PUT /api/admin/service-requests/[id])
4. Add filtering and sorting
5. Add action buttons (view details, update status, delete)

### Phase 10: SEO & Performance
1. Create SEO configuration (seo.ts)
2. Add metadata to all pages (title, description, OG tags)
3. Implement structured data (LocalBusiness, Product, Service schemas)
4. Create dynamic sitemap (/sitemap.xml)
5. Create robots.txt (/robots.txt)
6. Optimize images (Next.js Image component, alt text, lazy loading)
7. Add loading skeletons
8. Implement error boundaries

### Phase 11: Polish & Testing
1. Add loading states (loading.tsx files)
2. Create skeleton components (ProductCardSkeleton)
3. Improve accessibility (ARIA labels, keyboard navigation, focus states)
4. Add empty states (no products, no results)
5. Review responsive design (mobile, tablet, desktop)
6. Create documentation (README.md, .env.example)
7. Run production build and verify

## Key Design Patterns

### Repository Pattern
Abstracts database operations for easy migration:
```typescript
// lib/db/repositories/product.repository.ts
export const productRepository = {
  findAll: async (filters) => prisma.product.findMany({ where: filters }),
  findById: async (id) => prisma.product.findUnique({ where: { id } }),
  create: async (data) => prisma.product.create({ data }),
  update: async (id, data) => prisma.product.update({ where: { id }, data }),
  delete: async (id) => prisma.product.delete({ where: { id } }),
};
```

### Service Layer
Business logic separated from data access:
```typescript
// lib/services/product.service.ts
export const productService = {
  getProducts: async (filters) => {
    // Business logic here
    return productRepository.findAll(filters);
  },
};
```

### Zod Validation
Type-safe validation schemas:
```typescript
// lib/validations.ts
export const inquirySchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(10),
  type: z.enum(['PURCHASE', 'RENTAL', 'QUOTE', 'GENERAL']),
  message: z.string().min(10),
});
```

## Environment Variables

```env
# Database
DATABASE_URL="file:./dev.db"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="generate-with-openssl-rand-base64-32"

# Admin Credentials (for seed)
DEFAULT_ADMIN_EMAIL="admin@example.com"
DEFAULT_ADMIN_PASSWORD="admin123"

# Business Info
NEXT_PUBLIC_BUSINESS_NAME="Business Name"
NEXT_PUBLIC_PHONE="+1-XXX-XXX-XXXX"
NEXT_PUBLIC_EMAIL="info@example.com"
NEXT_PUBLIC_WHATSAPP="1XXXXXXXXXX"
NEXT_PUBLIC_ADDRESS="City, State, Country"
```

## Database Schema Example

```prisma
model Product {
  id          String   @id @default(cuid())
  name        String
  slug        String   @unique
  brand       String
  category    String   // REFURBISHED, NEW, RENTAL
  condition   String   // NEW, EXCELLENT, GOOD, FAIR
  price       Float
  rentalPrice Float?
  lumens      Int?
  resolution  String?
  description String   @default("")
  images      String   @default("[]") // JSON array
  thumbnail   String   @default("")
  stock       Int      @default(0)
  featured    Boolean  @default(false)
  active      Boolean  @default(true)
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}

model Inquiry {
  id        String   @id @default(cuid())
  name      String
  email     String
  phone     String
  company   String   @default("")
  type      String   // PURCHASE, RENTAL, QUOTE, GENERAL
  productId String?
  message   String
  status    String   @default("NEW") // NEW, CONTACTED, IN_PROGRESS, CONVERTED, CLOSED
  priority  String   @default("NORMAL") // LOW, NORMAL, HIGH, URGENT
  adminNotes String  @default("")
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

model ServiceRequest {
  id               String   @id @default(cuid())
  ticketNo         String   @unique
  name             String
  email            String
  phone            String
  company          String   @default("")
  address          String
  serviceType      String   // REPAIR, MAINTENANCE, INSTALLATION, CONSULTATION, SMART_SETUP
  projectorBrand   String   @default("")
  projectorModel   String   @default("")
  issueDescription String
  urgency          String   @default("NORMAL") // LOW, NORMAL, HIGH, URGENT
  preferredDate    DateTime?
  scheduledDate    DateTime?
  completedDate    DateTime?
  status           String   @default("PENDING") // PENDING, SCHEDULED, IN_PROGRESS, COMPLETED, CANCELLED
  technicianNotes  String   @default("")
  estimatedCost    Float?
  finalCost        Float?
  createdAt        DateTime @default(now())
  updatedAt        DateTime @updatedAt
}

model Admin {
  id        String   @id @default(cuid())
  email     String   @unique
  password  String   // bcrypt hashed
  name      String
  role      String   @default("ADMIN") // ADMIN, SUPER_ADMIN
  active    Boolean  @default(true)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

## SEO Best Practices

### Metadata
```typescript
export const metadata: Metadata = {
  title: 'Page Title | Business Name',
  description: '150-160 character description',
  openGraph: {
    title: 'Page Title',
    description: 'Description',
    images: ['/og-image.jpg'],
  },
};
```

### JSON-LD Structured Data
```typescript
// LocalBusiness Schema
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'Business Name',
  address: {
    '@type': 'PostalAddress',
    streetAddress: '123 Main St',
    addressLocality: 'City',
    addressRegion: 'State',
    postalCode: '12345',
  },
  telephone: '+1-XXX-XXX-XXXX',
  openingHours: 'Mo-Sa 09:00-19:00',
};
```

### Dynamic Sitemap
```typescript
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const products = await productRepository.findAll({ active: true });

  return [
    { url: baseUrl, lastModified: new Date(), priority: 1.0 },
    ...products.map((product) => ({
      url: `${baseUrl}/products/${product.slug}`,
      lastModified: product.updatedAt,
      priority: 0.8,
    })),
  ];
}
```

## Accessibility Checklist

- ✅ ARIA labels on all interactive elements
- ✅ Semantic HTML (nav, main, article, section, header, footer)
- ✅ Keyboard navigation support (Tab, Enter, Escape)
- ✅ Focus states visible on all focusable elements
- ✅ Alt text on all images
- ✅ Color contrast meets WCAG AA standards (4.5:1 for text)
- ✅ Form labels associated with inputs
- ✅ Error messages announced to screen readers
- ✅ Skip to main content link
- ✅ aria-expanded, aria-hidden where appropriate

## Deployment

### Vercel (Recommended)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Set environment variables in Vercel dashboard
```

**Note**: For production, migrate from SQLite to PostgreSQL (Vercel Postgres, Supabase, etc.)

### VPS
```bash
# Build for production
npm run build

# Start with PM2
pm2 start npm --name "business-website" -- start

# Set up Nginx reverse proxy
# Configure SSL with Let's Encrypt
```

## Migration: SQLite → PostgreSQL

1. Update `prisma/schema.prisma`:
```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}
```

2. Update `DATABASE_URL`:
```env
DATABASE_URL="postgresql://user:password@localhost:5432/dbname"
```

3. Run migrations:
```bash
npx prisma migrate dev
```

**No code changes needed!** The repository pattern abstracts the database layer.

## Usage Instructions

When invoked, this skill will:
1. Ask for business details (name, type, services, location)
2. Create complete project structure
3. Implement all 11 phases sequentially
4. Generate mock data for testing
5. Create comprehensive documentation
6. Verify build and deployment readiness

## Common Customizations

### Add Email Notifications
- Install: `npm install nodemailer`
- Create: `lib/services/email.service.ts`
- Add SMTP env vars
- Send emails on inquiry/service request submission

### Add Payment Integration
- Install: `npm install stripe`
- Create payment API routes
- Add checkout flow
- Handle webhooks for order completion

### Add Analytics
- Install: `npm install @vercel/analytics`
- Add Analytics component to root layout
- Track page views, inquiries, purchases

### Add Image Upload to Cloud
- Install: `npm install cloudinary`
- Create `lib/services/cloudinary.service.ts`
- Update image upload in admin panel
- Store URLs in database

## Best Practices

1. **Security**
   - Never commit `.env.local`
   - Hash passwords with bcrypt (cost factor 10+)
   - Use JWT for sessions
   - Validate all inputs with Zod
   - Sanitize user input
   - Use HTTPS in production

2. **Performance**
   - Use Server Components by default
   - Implement loading states
   - Optimize images with Next.js Image
   - Enable static generation where possible
   - Use React.memo for expensive components

3. **Code Quality**
   - Use TypeScript strictly
   - Follow consistent naming conventions
   - Keep components focused and small
   - Separate concerns (UI, logic, data)
   - Write descriptive commit messages

4. **Testing**
   - Test all forms with validation
   - Test API endpoints
   - Test authentication flow
   - Test responsive design
   - Test accessibility with keyboard

## Success Criteria

✅ All pages load without errors
✅ Forms validate and submit correctly
✅ Admin CRUD operations work
✅ Authentication secure
✅ Responsive on all devices
✅ Lighthouse score > 90
✅ SEO metadata on all pages
✅ Sitemap generated
✅ Images optimized
✅ Build succeeds

## Support

For issues or enhancements to this skill, document:
- Next.js version
- Node.js version
- Error messages
- Steps to reproduce
- Expected vs actual behavior
