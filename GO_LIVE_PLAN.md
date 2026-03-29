# Go Live Plan - Presentation Solutions Website

## 🎯 Deployment Target
**Recommended Platform**: Vercel (optimized for Next.js)
**Alternative**: Netlify, Railway, or VPS (DigitalOcean/Linode)

---

## 📋 Pre-Deployment Checklist

### 1. Security Hardening
- [ ] Change default admin password
- [ ] Generate new `NEXTAUTH_SECRET` (use: `openssl rand -base64 32`)
- [ ] Review all environment variables
- [ ] Remove or secure test/seed data
- [ ] Enable HTTPS only
- [ ] Set secure cookie policies
- [ ] Add rate limiting to API routes (optional)
- [ ] Review CORS policies

### 2. Database Migration (SQLite → PostgreSQL)
**Why**: SQLite is file-based and not suitable for serverless/production environments.

**Options**:
- ✅ **Vercel Postgres** (recommended, integrated)
- Supabase (free tier available)
- Neon (serverless Postgres)
- Railway
- AWS RDS / Google Cloud SQL

**Migration Steps** (see Section 3 below)

### 3. Content Review
- [ ] Replace placeholder images with real product photos
- [ ] Update business information in `.env`
- [ ] Verify phone numbers and email addresses
- [ ] Update WhatsApp number
- [ ] Review all text content for accuracy
- [ ] Test all forms with real data
- [ ] Add actual product inventory

### 4. SEO Optimization
- [ ] Update sitemap with production URL
- [ ] Verify robots.txt configuration
- [ ] Test all meta tags
- [ ] Add Google Analytics / Vercel Analytics
- [ ] Submit sitemap to Google Search Console
- [ ] Set up Google Business Profile
- [ ] Add Open Graph images

### 5. Performance
- [ ] Run Lighthouse audit (target: 90+ score)
- [ ] Optimize images (compress, correct formats)
- [ ] Test page load times
- [ ] Enable Vercel Edge caching
- [ ] Minimize bundle size

### 6. Testing
- [ ] Test all pages on mobile devices
- [ ] Test all forms (inquiry, service request, contact)
- [ ] Test admin panel (login, CRUD operations)
- [ ] Test with different browsers (Chrome, Firefox, Safari, Edge)
- [ ] Test payment flows (if applicable)
- [ ] Verify email notifications work (if implemented)

---

## 🗄️ Database Migration: SQLite → PostgreSQL

### Option 1: Vercel Postgres (Recommended)

#### Step 1: Create Vercel Postgres Database
```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Create Postgres database from Vercel dashboard
# Or use CLI after linking project
vercel postgres create
```

#### Step 2: Update Prisma Schema
Edit `prisma/schema.prisma`:
```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}
```

#### Step 3: Get Connection String
From Vercel Dashboard → Storage → Your Postgres DB → Settings → Connection String

Add to `.env`:
```env
DATABASE_URL="postgres://user:password@host.vercel-storage.com:5432/dbname"
```

#### Step 4: Run Migrations
```bash
# Generate new migration
npx prisma migrate dev --name init_postgres

# Or deploy existing migrations
npx prisma migrate deploy

# Seed database
npx prisma db seed
```

### Option 2: Supabase (Free Tier)

1. Sign up at https://supabase.com
2. Create new project
3. Get connection string from Settings → Database
4. Update `.env` with Supabase URL
5. Run migrations as above

### Option 3: Railway

1. Sign up at https://railway.app
2. Create new Postgres database
3. Get connection string from database settings
4. Update `.env` and run migrations

---

## 🚀 Deployment Steps (Vercel)

### Step 1: Prepare Repository

```bash
# Initialize git (if not already done)
cd "/Users/robin/Desktop/Presentation Solutions"
git init

# Create .gitignore
cat > .gitignore << 'EOF'
# Dependencies
node_modules/
.pnp
.pnp.js

# Testing
coverage/

# Next.js
.next/
out/
build/
dist/

# Production
*.log

# Environment
.env
.env*.local
.env.production

# Vercel
.vercel

# Database
*.db
*.db-journal
prisma/dev.db

# OS
.DS_Store
*.pem

# Debug
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# IDE
.vscode/
.idea/
*.swp
*.swo
EOF

# Add all files
git add .

# Commit
git commit -m "Initial commit: Presentation Solutions website"
```

### Step 2: Push to GitHub

```bash
# Create repository on GitHub.com (do this manually first)
# Then connect and push:

git remote add origin https://github.com/YOUR_USERNAME/presentation-solutions.git
git branch -M main
git push -u origin main
```

### Step 3: Deploy to Vercel

#### Option A: Using Vercel CLI
```bash
# Login
vercel login

# Deploy
vercel

# Follow prompts:
# - Link to existing project or create new
# - Set project name
# - Set root directory (default)
```

#### Option B: Using Vercel Dashboard
1. Go to https://vercel.com
2. Click "Add New Project"
3. Import your GitHub repository
4. Configure:
   - **Framework Preset**: Next.js
   - **Root Directory**: ./
   - **Build Command**: `npm run build` (auto-detected)
   - **Output Directory**: `.next` (auto-detected)
5. Add Environment Variables (see Step 4)
6. Click "Deploy"

### Step 4: Configure Environment Variables

In Vercel Dashboard → Project → Settings → Environment Variables

Add all variables from `.env.local`:

```env
# Database (use Vercel Postgres URL)
DATABASE_URL=postgres://user:pass@host.vercel-storage.com:5432/dbname

# NextAuth (IMPORTANT: Change these!)
NEXTAUTH_URL=https://your-domain.vercel.app
NEXTAUTH_SECRET=<generate-new-secret-using-openssl>

# Admin Credentials
DEFAULT_ADMIN_EMAIL=admin@presentationsolutions.in
DEFAULT_ADMIN_PASSWORD=<change-this-strong-password>

# Business Info
NEXT_PUBLIC_BUSINESS_NAME=Presentation Solutions
NEXT_PUBLIC_PHONE=+91-9996662273
NEXT_PUBLIC_EMAIL=info@presentationsolutions.in
NEXT_PUBLIC_WHATSAPP=919996662273
NEXT_PUBLIC_ADDRESS=Yamunanagar, Haryana, India - 135001
```

**Important**:
- Set for **Production**, **Preview**, and **Development** environments
- Generate new `NEXTAUTH_SECRET`: `openssl rand -base64 32`
- Change default admin password to something strong

### Step 5: Run Database Migrations on Production

After first deployment:

```bash
# Connect to production
vercel env pull .env.production

# Run migrations
DATABASE_URL="<production-database-url>" npx prisma migrate deploy

# Seed production database
DATABASE_URL="<production-database-url>" npx prisma db seed
```

Or use Vercel CLI:
```bash
vercel env pull
npx prisma migrate deploy
npx prisma db seed
```

### Step 6: Custom Domain (Optional)

1. Go to Vercel Dashboard → Project → Settings → Domains
2. Add your custom domain (e.g., `presentationsolutions.in`)
3. Update DNS records with your domain registrar:
   - Add CNAME record: `www` → `cname.vercel-dns.com`
   - Add A record: `@` → `76.76.21.21`
4. Update `NEXTAUTH_URL` to use custom domain
5. Redeploy

---

## ✅ Post-Deployment Verification

### Automated Checks
```bash
# Health check
curl https://your-domain.vercel.app

# Test API
curl https://your-domain.vercel.app/api/products

# Check sitemap
curl https://your-domain.vercel.app/sitemap.xml

# Check robots.txt
curl https://your-domain.vercel.app/robots.txt
```

### Manual Testing Checklist
- [ ] Homepage loads correctly
- [ ] All navigation links work
- [ ] Product catalog displays products
- [ ] Product detail pages load
- [ ] Inquiry form submits successfully
- [ ] Service request form submits successfully
- [ ] Admin login works with new credentials
- [ ] Admin can create/edit/delete products
- [ ] Admin can view inquiries and service requests
- [ ] WhatsApp links work
- [ ] Phone number links work
- [ ] Email links work
- [ ] Responsive design works on mobile
- [ ] All images load correctly
- [ ] No console errors

### Performance Testing
- [ ] Run Lighthouse in Chrome DevTools
- [ ] Test page load speed: https://pagespeed.web.dev/
- [ ] Verify Core Web Vitals
- [ ] Test with slow 3G connection

### SEO Verification
- [ ] Google Search Console setup
- [ ] Submit sitemap
- [ ] Verify meta tags with: https://metatags.io/
- [ ] Test structured data: https://search.google.com/test/rich-results
- [ ] Verify Open Graph with: https://www.opengraph.xyz/

---

## 📊 Monitoring & Analytics

### Setup Vercel Analytics
```bash
npm install @vercel/analytics
```

Add to `app/layout.tsx`:
```typescript
import { Analytics } from '@vercel/analytics/react';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
```

### Setup Google Analytics (Optional)
1. Create GA4 property at https://analytics.google.com
2. Get Measurement ID (G-XXXXXXXXXX)
3. Add to `app/layout.tsx`:
```typescript
<Script src={`https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX`} />
<Script id="google-analytics">
  {`
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-XXXXXXXXXX');
  `}
</Script>
```

### Error Monitoring (Optional)
- **Sentry**: https://sentry.io (free tier available)
- **LogRocket**: https://logrocket.com
- Vercel's built-in error logging

---

## 🔒 Security Hardening

### Change Default Admin Password
1. Login to admin panel: `https://your-domain.vercel.app/admin/login`
2. Use default credentials (from `.env`)
3. Go to admin settings (create this page if needed)
4. Change password immediately

### Or via Database
```bash
# Generate new password hash
node -e "const bcrypt = require('bcryptjs'); console.log(bcrypt.hashSync('YOUR_NEW_PASSWORD', 10));"

# Update in database
npx prisma studio
# Find admin user and update password field with hash
```

### Security Headers (Add to `next.config.js`)
```javascript
module.exports = {
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
        ],
      },
    ];
  },
};
```

---

## 🐛 Troubleshooting

### Build Fails on Vercel
**Issue**: Missing dependencies or build errors

**Solution**:
```bash
# Test build locally first
npm run build

# Check for TypeScript errors
npm run lint

# Verify all dependencies
npm install
```

### Database Connection Issues
**Issue**: Can't connect to database

**Solution**:
- Verify `DATABASE_URL` is correct in Vercel env vars
- Check database is accessible from external connections
- Ensure IP whitelist includes Vercel IPs (or allow all)
- Test connection locally with production URL

### NextAuth Errors
**Issue**: Authentication not working

**Solution**:
- Verify `NEXTAUTH_URL` matches your deployed URL
- Regenerate `NEXTAUTH_SECRET`
- Clear browser cookies
- Check middleware.ts configuration

### Images Not Loading
**Issue**: Product images return 404

**Solution**:
- Verify images are in `public/images/` directory
- Check image paths in database
- Ensure git committed image files
- Use Next.js `<Image>` component with correct paths

---

## 🔄 Continuous Deployment

### Automatic Deployments
Vercel automatically deploys when you push to GitHub:
- **Production**: Push to `main` branch
- **Preview**: Push to any other branch or open PR

### Manual Deployment
```bash
# Deploy specific branch
vercel --prod

# Deploy without production alias
vercel
```

### Rollback
From Vercel Dashboard → Deployments → Find previous version → Promote to Production

---

## 📈 Post-Launch Tasks

### Week 1
- [ ] Monitor error logs daily
- [ ] Check form submissions
- [ ] Respond to inquiries promptly
- [ ] Monitor site performance
- [ ] Fix any reported bugs

### Week 2-4
- [ ] Analyze traffic with Analytics
- [ ] Optimize based on user behavior
- [ ] Improve SEO based on Search Console data
- [ ] Add more products
- [ ] Collect customer feedback

### Ongoing
- [ ] Regular backups of database
- [ ] Update product inventory
- [ ] Review and respond to inquiries
- [ ] Monitor site uptime
- [ ] Keep dependencies updated
- [ ] Review security advisories

---

## 💰 Cost Estimate

### Vercel (Hobby - Free Plan)
- ✅ Next.js hosting: **Free**
- ✅ SSL certificate: **Free**
- ✅ CDN: **Free**
- ✅ 100GB bandwidth/month: **Free**
- ✅ Custom domain: **Free**

**Upgrade to Pro if needed** ($20/month):
- 1TB bandwidth
- Better performance
- Team features
- More builds

### Vercel Postgres
- Free tier: 256MB storage, 60 hours compute
- Paid: Starts at $20/month for more storage

### Domain Name
- `.com` domain: ~$12/year
- `.in` domain: ~$10/year

### Total Estimated Cost
- **Minimum**: $10-12/year (just domain)
- **Recommended**: $12/year domain + $20/month hosting = ~$252/year
- **With database**: Add $20/month = ~$492/year

---

## 📞 Support Resources

### Vercel
- Documentation: https://vercel.com/docs
- Discord: https://vercel.com/discord
- Support: support@vercel.com

### Next.js
- Documentation: https://nextjs.org/docs
- Discord: https://nextjs.org/discord
- GitHub: https://github.com/vercel/next.js

### Prisma
- Documentation: https://www.prisma.io/docs
- Discord: https://pris.ly/discord
- GitHub: https://github.com/prisma/prisma

---

## ✅ Final Checklist

Before clicking "Deploy":
- [ ] All code committed to Git
- [ ] `.env.local` NOT committed (in .gitignore)
- [ ] Build succeeds locally (`npm run build`)
- [ ] Database migrated to PostgreSQL
- [ ] Environment variables configured in Vercel
- [ ] Admin password changed
- [ ] Real content added
- [ ] Testing completed
- [ ] Custom domain configured (if using)
- [ ] Analytics setup
- [ ] Monitoring configured

---

## 🎉 Go Live!

Once all checklist items are complete:

1. **Deploy**: Click deploy in Vercel or run `vercel --prod`
2. **Verify**: Test all functionality on production URL
3. **Announce**: Share your website URL
4. **Monitor**: Watch for errors in first 24 hours
5. **Iterate**: Collect feedback and improve

**Your website will be live at**:
- Vercel URL: `https://presentation-solutions.vercel.app`
- Custom domain: `https://presentationsolutions.in` (if configured)

---

## 📝 Notes

- Keep backups of your database
- Document any custom configurations
- Save important credentials securely (use password manager)
- Set up email notifications for form submissions
- Consider adding Google Business Profile
- Join local business directories
- Promote on social media

**Good luck with your launch! 🚀**
