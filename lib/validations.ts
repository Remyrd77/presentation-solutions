import { z } from 'zod';

// Inquiry Form Validation
export const inquirySchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(10, 'Phone number must be at least 10 digits'),
  company: z.string().optional(),
  type: z.enum(['PURCHASE', 'RENTAL', 'QUOTE', 'GENERAL'], {
    message: 'Please select an inquiry type',
  }),
  productId: z.string().optional(),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

export type InquiryFormData = z.infer<typeof inquirySchema>;

// Service Request Form Validation
export const serviceRequestSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(10, 'Phone number must be at least 10 digits'),
  company: z.string().optional(),
  address: z.string().min(5, 'Please provide a complete address'),
  serviceType: z.enum(
    ['REPAIR', 'MAINTENANCE', 'INSTALLATION', 'CONSULTATION', 'SMART_SETUP'],
    {
      message: 'Please select a service type',
    }
  ),
  projectorBrand: z.string().min(2, 'Please enter the projector brand'),
  projectorModel: z.string().min(2, 'Please enter the projector model'),
  issueDescription: z
    .string()
    .min(20, 'Please provide a detailed description (at least 20 characters)'),
  urgency: z
    .enum(['LOW', 'NORMAL', 'HIGH', 'URGENT'])
    .default('NORMAL')
    .optional(),
  preferredDate: z.string().optional(),
});

export type ServiceRequestFormData = z.infer<typeof serviceRequestSchema>;

// Contact Form Validation
export const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(10, 'Phone number must be at least 10 digits'),
  subject: z.string().min(5, 'Subject must be at least 5 characters'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

export type ContactFormData = z.infer<typeof contactSchema>;

// Product Validation (for admin)
export const productSchema = z.object({
  name: z.string().min(2, 'Product name must be at least 2 characters'),
  description: z
    .string()
    .min(20, 'Description must be at least 20 characters'),
  category: z.enum(['REFURBISHED', 'NEW', 'RENTAL']),
  brand: z.string().min(2, 'Brand is required'),
  model: z.string().min(2, 'Model is required'),
  lumens: z.number().positive().optional(),
  resolution: z.string().optional(),
  technology: z.string().optional(),
  throwRatio: z.string().optional(),
  price: z.number().positive('Price must be greater than 0'),
  rentalPrice: z.number().positive().optional(),
  thumbnail: z.string().min(1, 'Thumbnail is required'),
  condition: z.enum(['NEW', 'LIKE_NEW', 'EXCELLENT', 'GOOD']),
  stock: z.number().int().min(0, 'Stock cannot be negative'),
  featured: z.boolean().default(false),
  active: z.boolean().default(true),
});

export type ProductFormData = z.infer<typeof productSchema>;
