# Images Directory

This directory contains all static images for the website.

## Structure

- `/products/` - Product images (projector photos)
- `/services/` - Service showcase images (installations, setups)
- `/testimonials/` - Customer/client photos
- `/gallery/` - Smart room setup gallery images

## Image Guidelines

### Product Images
- Format: JPG or WebP
- Recommended size: 800x600px
- File naming: `brand-model-1.jpg`, `brand-model-2.jpg`
- Example: `epson-eb-x41-1.jpg`

### Service Images
- Format: JPG or WebP
- Recommended size: 1200x800px
- File naming: `service-type-description.jpg`
- Example: `smart-classroom-setup-1.jpg`

### Thumbnails
- Create thumbnails for faster loading
- Suffix: `-thumb.jpg`
- Size: 400x300px

## Current Status

📝 **Placeholder images are being used**. Replace with actual product photos for production.

To add images:
1. Place high-quality photos in the appropriate directory
2. Update the database seed file (`prisma/seed.ts`) with correct image paths
3. Run `npx prisma db seed` to update the database

## SEO Tips

- Always add descriptive alt text
- Optimize images before uploading (compress, resize)
- Use WebP format for better performance
- Lazy load images below the fold
