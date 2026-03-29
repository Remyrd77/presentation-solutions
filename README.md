# Presentation Solutions Website

A production-ready Next.js website for Presentation Solutions - a projector business specializing in refurbished projector sales, rentals, smart classroom/conference room setup, and projector servicing & repair.

## Tech Stack

- **Next.js 15** (App Router) with TypeScript
- **Tailwind CSS** for styling
- **Prisma ORM** with SQLite (easily migrable to PostgreSQL)
- **NextAuth.js** for admin authentication
- **Zod** for validation
- **bcryptjs** for password hashing

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

1. Clone the repository
2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
# Edit .env.local with your configuration
```

4. Run database migrations:
```bash
npx prisma migrate dev
```

5. Seed the database with sample data:
```bash
npx prisma db seed
```

6. Start the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the website.

## Database Management

### Prisma Studio (Visual Database Editor)
```bash
npx prisma studio
```

### Reset Database
```bash
npx prisma migrate reset
```

### Generate Prisma Client (after schema changes)
```bash
npx prisma generate
```

## Default Admin Credentials

- Email: admin@presentationsolutions.in
- Password: admin123

**⚠️ Change these credentials in production!**

## Project Structure

```
presentation-solutions/
├── app/                    # Next.js App Router pages
├── components/             # React components
│   ├── ui/                # Base UI components
│   ├── layout/            # Header, Footer, Navigation
│   ├── home/              # Homepage sections
│   ├── products/          # Product components
│   ├── forms/             # Forms
│   └── admin/             # Admin panel components
├── lib/                   # Utilities and business logic
│   ├── db/                # Database client and repositories
│   ├── services/          # Business logic layer
│   ├── utils.ts           # Utility functions
│   └── validations.ts     # Zod schemas
├── types/                 # TypeScript type definitions
├── config/                # Configuration files
├── prisma/                # Database schema and migrations
└── public/                # Static assets
```

## Features

### Public Website
- ✅ Homepage with services showcase and featured products
- ✅ Product catalog with advanced filtering (category, brand, price, lumens, resolution)
- ✅ Product detail pages with inquiry forms
- ✅ Service pages (Refurbished, Rentals, Smart Setup, Repair)
- ✅ Inquiry form with validation
- ✅ Service request form with ticket generation
- ✅ Contact page with business information
- ✅ WhatsApp integration
- ✅ Dynamic sitemap and robots.txt
- ✅ SEO optimized with JSON-LD structured data
- ✅ Loading states and skeleton loaders
- ✅ Empty states for better UX
- ✅ Accessible (WCAG AA compliant)
- ✅ Fully responsive design

### Admin Panel
- ✅ Dashboard with statistics
- ✅ Product management (CRUD)
- ✅ Inquiry management
- ✅ Service request management
- ✅ Admin authentication with NextAuth.js
- ✅ Protected routes and middleware

## Development Roadmap

- [x] Phase 1: Foundation & Database Setup
- [x] Phase 2: Homepage & Core UI
- [x] Phase 3: Product Catalog
- [x] Phase 4: Forms & Lead Capture
- [x] Phase 5: Service Pages
- [x] Phase 6: Admin Authentication
- [x] Phase 7: Admin Dashboard
- [x] Phase 8: Admin Product Management
- [x] Phase 9: Admin Inquiry/Service Management
- [x] Phase 10: SEO & Performance
- [x] Phase 11: Polish & Testing

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint
- `npx prisma studio` - Open database GUI
- `npx prisma db seed` - Seed database

## Migration to Production Database

This project uses SQLite for development. To migrate to PostgreSQL/MySQL for production:

1. Update `prisma/schema.prisma`:
```prisma
datasource db {
  provider = "postgresql"  // or "mysql"
  url      = env("DATABASE_URL")
}
```

2. Update `DATABASE_URL` in `.env`:
```
DATABASE_URL="postgresql://user:password@localhost:5432/dbname"
```

3. Run migrations:
```bash
npx prisma migrate dev
```

No code changes required! The repository pattern abstracts database operations.

## License

Private - © 2024 Presentation Solutions

## Support

For issues or questions, please contact info@presentationsolutions.in
