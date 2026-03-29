import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('Starting database seed...');

  // Create admin user
  const hashedPassword = await bcrypt.hash(process.env.DEFAULT_ADMIN_PASSWORD || 'admin123', 10);
  const admin = await prisma.admin.upsert({
    where: { email: process.env.DEFAULT_ADMIN_EMAIL || 'admin@presentationsolutions.in' },
    update: {},
    create: {
      email: process.env.DEFAULT_ADMIN_EMAIL || 'admin@presentationsolutions.in',
      password: hashedPassword,
      name: 'Admin',
      role: 'SUPER_ADMIN',
    },
  });
  console.log('✅ Admin user created:', admin.email);

  // Sample products
  const products = [
    {
      name: 'Epson EB-X41 Refurbished',
      slug: 'epson-eb-x41-refurbished',
      description: 'High-quality refurbished Epson projector with 3600 lumens brightness. Perfect for classrooms and meeting rooms. Thoroughly tested and comes with 6 months warranty. Excellent condition with minimal usage.',
      category: 'REFURBISHED',
      brand: 'Epson',
      model: 'EB-X41',
      lumens: 3600,
      resolution: 'XGA (1024x768)',
      technology: 'LCD',
      throwRatio: '1.48-1.77',
      price: 25000,
      rentalPrice: 2500,
      images: JSON.stringify(['/images/products/epson-x41-1.jpg', '/images/products/epson-x41-2.jpg']),
      thumbnail: '/images/products/epson-x41-thumb.jpg',
      condition: 'EXCELLENT',
      stock: 5,
      featured: true,
      active: true,
    },
    {
      name: 'BenQ MH535FHD',
      slug: 'benq-mh535fhd',
      description: 'Brand new Full HD projector with superior brightness for business presentations. 3600 lumens ensures clear visibility even in bright rooms. Perfect for corporate environments.',
      category: 'NEW',
      brand: 'BenQ',
      model: 'MH535FHD',
      lumens: 3600,
      resolution: 'Full HD (1920x1080)',
      technology: 'DLP',
      throwRatio: '1.15-1.5',
      price: 42000,
      rentalPrice: 3500,
      images: JSON.stringify(['/images/products/benq-mh535-1.jpg', '/images/products/benq-mh535-2.jpg']),
      thumbnail: '/images/products/benq-mh535-thumb.jpg',
      condition: 'NEW',
      stock: 3,
      featured: true,
      active: true,
    },
    {
      name: 'Sony VPL-DX271 Refurbished',
      slug: 'sony-vpl-dx271-refurbished',
      description: 'Refurbished Sony projector with excellent color accuracy. 3800 lumens brightness makes it ideal for large conference rooms and auditoriums. 12 months warranty included.',
      category: 'REFURBISHED',
      brand: 'Sony',
      model: 'VPL-DX271',
      lumens: 3800,
      resolution: 'XGA (1024x768)',
      technology: 'LCD',
      throwRatio: '1.37-2.24',
      price: 32000,
      rentalPrice: 3000,
      images: JSON.stringify(['/images/products/sony-dx271-1.jpg']),
      thumbnail: '/images/products/sony-dx271-thumb.jpg',
      condition: 'EXCELLENT',
      stock: 4,
      featured: true,
      active: true,
    },
    {
      name: 'Panasonic PT-LB423 Refurbished',
      slug: 'panasonic-pt-lb423-refurbished',
      description: 'Reliable Panasonic projector refurbished to factory standards. Long lamp life and energy-efficient design. Great for educational institutions.',
      category: 'REFURBISHED',
      brand: 'Panasonic',
      model: 'PT-LB423',
      lumens: 4100,
      resolution: 'XGA (1024x768)',
      technology: 'LCD',
      throwRatio: '1.37-2.24',
      price: 28000,
      rentalPrice: 2800,
      images: JSON.stringify(['/images/products/panasonic-lb423-1.jpg']),
      thumbnail: '/images/products/panasonic-lb423-thumb.jpg',
      condition: 'GOOD',
      stock: 6,
      featured: false,
      active: true,
    },
    {
      name: 'Epson EB-2250U',
      slug: 'epson-eb-2250u',
      description: 'Premium WUXGA projector with laser light source. Ultra-bright 5000 lumens and wireless connectivity. Brand new with full manufacturer warranty.',
      category: 'NEW',
      brand: 'Epson',
      model: 'EB-2250U',
      lumens: 5000,
      resolution: 'WUXGA (1920x1200)',
      technology: 'Laser',
      throwRatio: '1.35-2.84',
      price: 125000,
      rentalPrice: 8000,
      images: JSON.stringify(['/images/products/epson-2250u-1.jpg', '/images/products/epson-2250u-2.jpg']),
      thumbnail: '/images/products/epson-2250u-thumb.jpg',
      condition: 'NEW',
      stock: 2,
      featured: true,
      active: true,
    },
    {
      name: 'BenQ TH685P - Rental Special',
      slug: 'benq-th685p-rental',
      description: 'Gaming and entertainment projector perfect for events. Full HD with low input lag. Available for short-term and long-term rental.',
      category: 'RENTAL',
      brand: 'BenQ',
      model: 'TH685P',
      lumens: 3500,
      resolution: 'Full HD (1920x1080)',
      technology: 'DLP',
      throwRatio: '1.15-1.5',
      price: 55000,
      rentalPrice: 4000,
      images: JSON.stringify(['/images/products/benq-th685p-1.jpg']),
      thumbnail: '/images/products/benq-th685p-thumb.jpg',
      condition: 'LIKE_NEW',
      stock: 3,
      featured: false,
      active: true,
    },
    {
      name: 'Epson EB-FH06 Refurbished',
      slug: 'epson-eb-fh06-refurbished',
      description: 'Full HD refurbished projector for professional presentations. Compact design with excellent connectivity options. Fully serviced and tested.',
      category: 'REFURBISHED',
      brand: 'Epson',
      model: 'EB-FH06',
      lumens: 3500,
      resolution: 'Full HD (1920x1080)',
      technology: 'LCD',
      throwRatio: '1.02-1.23',
      price: 38000,
      rentalPrice: 3200,
      images: JSON.stringify(['/images/products/epson-fh06-1.jpg']),
      thumbnail: '/images/products/epson-fh06-thumb.jpg',
      condition: 'EXCELLENT',
      stock: 4,
      featured: true,
      active: true,
    },
    {
      name: 'Sony VPL-PHZ10 - Rental',
      slug: 'sony-vpl-phz10-rental',
      description: 'Professional laser projector available for rent. 5000 lumens with WUXGA resolution. Perfect for corporate events and conferences.',
      category: 'RENTAL',
      brand: 'Sony',
      model: 'VPL-PHZ10',
      lumens: 5000,
      resolution: 'WUXGA (1920x1200)',
      technology: 'Laser',
      throwRatio: '1.27-2.73',
      price: 180000,
      rentalPrice: 10000,
      images: JSON.stringify(['/images/products/sony-phz10-1.jpg']),
      thumbnail: '/images/products/sony-phz10-thumb.jpg',
      condition: 'NEW',
      stock: 2,
      featured: false,
      active: true,
    },
    {
      name: 'BenQ MW535 Refurbished',
      slug: 'benq-mw535-refurbished',
      description: 'WXGA refurbished projector with SmartEco technology. Energy efficient with long lamp life. Ideal for small to medium-sized rooms.',
      category: 'REFURBISHED',
      brand: 'BenQ',
      model: 'MW535',
      lumens: 3600,
      resolution: 'WXGA (1280x800)',
      technology: 'DLP',
      throwRatio: '1.55-1.7',
      price: 29000,
      rentalPrice: 2600,
      images: JSON.stringify(['/images/products/benq-mw535-1.jpg']),
      thumbnail: '/images/products/benq-mw535-thumb.jpg',
      condition: 'GOOD',
      stock: 5,
      featured: false,
      active: true,
    },
    {
      name: 'Panasonic PT-VW545N',
      slug: 'panasonic-pt-vw545n',
      description: 'Brand new WXGA projector with 5500 lumens. Extremely bright for large venues. Includes wireless presentation system.',
      category: 'NEW',
      brand: 'Panasonic',
      model: 'PT-VW545N',
      lumens: 5500,
      resolution: 'WXGA (1280x800)',
      technology: 'LCD',
      throwRatio: '1.37-2.24',
      price: 95000,
      rentalPrice: 6500,
      images: JSON.stringify(['/images/products/panasonic-vw545n-1.jpg', '/images/products/panasonic-vw545n-2.jpg']),
      thumbnail: '/images/products/panasonic-vw545n-thumb.jpg',
      condition: 'NEW',
      stock: 2,
      featured: true,
      active: true,
    },
  ];

  console.log('Creating products...');
  for (const product of products) {
    await prisma.product.upsert({
      where: { slug: product.slug },
      update: {},
      create: product,
    });
  }
  console.log(`✅ ${products.length} products created`);

  // Sample inquiries
  const inquiries = [
    {
      name: 'Rajesh Kumar',
      email: 'rajesh.kumar@email.com',
      phone: '9876543210',
      company: 'ABC School',
      type: 'PURCHASE',
      message: 'Interested in purchasing refurbished projectors for our school. Need 5 units. Please provide bulk pricing.',
      status: 'NEW',
      priority: 'HIGH',
    },
    {
      name: 'Priya Sharma',
      email: 'priya.sharma@company.com',
      phone: '9988776655',
      company: 'Tech Corp',
      type: 'RENTAL',
      message: 'Need to rent 2 projectors for a week-long conference in March. Please send rental rates and availability.',
      status: 'CONTACTED',
      priority: 'MEDIUM',
    },
    {
      name: 'Amit Singh',
      email: 'amit.singh@gmail.com',
      phone: '9123456789',
      type: 'QUOTE',
      message: 'Looking for a Full HD projector for home theater setup. Budget around 40-50k. Please suggest options.',
      status: 'IN_PROGRESS',
      priority: 'LOW',
    },
  ];

  console.log('Creating inquiries...');
  for (const inquiry of inquiries) {
    await prisma.inquiry.create({ data: inquiry });
  }
  console.log(`✅ ${inquiries.length} inquiries created`);

  // Sample service requests
  const serviceRequests = [
    {
      ticketNo: 'SR-2024-001',
      name: 'Vikram Patel',
      email: 'vikram.patel@school.edu',
      phone: '9876501234',
      company: 'Modern School',
      address: 'Sector 15, Yamunanagar, Haryana',
      serviceType: 'REPAIR',
      projectorBrand: 'Epson',
      projectorModel: 'EB-S05',
      issueDescription: 'Projector lamp is flickering and image is very dim. May need lamp replacement.',
      urgency: 'HIGH',
      status: 'PENDING',
    },
    {
      ticketNo: 'SR-2024-002',
      name: 'Neha Gupta',
      email: 'neha.gupta@corp.com',
      phone: '9123450987',
      company: 'Business Solutions Ltd',
      address: 'Jagadhri Road, Yamunanagar',
      serviceType: 'SMART_SETUP',
      projectorBrand: 'BenQ',
      projectorModel: 'MH535FHD',
      issueDescription: 'Need complete smart classroom setup with projector, screen, sound system and control panel. Room size is 30x20 feet.',
      urgency: 'NORMAL',
      status: 'SCHEDULED',
      scheduledDate: new Date('2024-04-15'),
    },
    {
      ticketNo: 'SR-2024-003',
      name: 'Sandeep Reddy',
      email: 'sandeep.reddy@gmail.com',
      phone: '9988774455',
      address: 'Model Town, Yamunanagar',
      serviceType: 'MAINTENANCE',
      projectorBrand: 'Sony',
      projectorModel: 'VPL-DX221',
      issueDescription: 'Regular maintenance and cleaning required. Projector has been in use for 1 year.',
      urgency: 'LOW',
      status: 'COMPLETED',
      scheduledDate: new Date('2024-03-20'),
      completedDate: new Date('2024-03-21'),
      finalCost: 2500,
    },
  ];

  console.log('Creating service requests...');
  for (const request of serviceRequests) {
    await prisma.serviceRequest.create({ data: request });
  }
  console.log(`✅ ${serviceRequests.length} service requests created`);

  console.log('✅ Database seed completed successfully!');
}

main()
  .catch((e) => {
    console.error('Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
