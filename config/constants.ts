export const SITE_NAME = process.env.NEXT_PUBLIC_BUSINESS_NAME || 'Presentation Solutions';
export const SITE_EMAIL = process.env.NEXT_PUBLIC_EMAIL || 'info@presentationsolutions.in';
export const SITE_PHONE = process.env.NEXT_PUBLIC_PHONE || '+91-9996662273';
export const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP || '919996662273';
export const SITE_ADDRESS = process.env.NEXT_PUBLIC_ADDRESS || 'Yamunanagar, Haryana, India - 135001';

export const PRODUCT_CATEGORIES = {
  REFURBISHED: 'Refurbished',
  NEW: 'New',
  RENTAL: 'Rental',
} as const;

export const PRODUCT_CONDITIONS = {
  NEW: 'Brand New',
  LIKE_NEW: 'Like New',
  EXCELLENT: 'Excellent',
  GOOD: 'Good',
} as const;

export const INQUIRY_TYPES = {
  PURCHASE: 'Purchase',
  RENTAL: 'Rental',
  QUOTE: 'Quote',
  GENERAL: 'General',
} as const;

export const INQUIRY_STATUSES = {
  NEW: 'New',
  CONTACTED: 'Contacted',
  IN_PROGRESS: 'In Progress',
  CONVERTED: 'Converted',
  CLOSED: 'Closed',
} as const;

export const SERVICE_TYPES = {
  REPAIR: 'Repair',
  MAINTENANCE: 'Maintenance',
  INSTALLATION: 'Installation',
  CONSULTATION: 'Consultation',
  SMART_SETUP: 'Smart Setup',
} as const;

export const SERVICE_STATUSES = {
  PENDING: 'Pending',
  SCHEDULED: 'Scheduled',
  IN_PROGRESS: 'In Progress',
  COMPLETED: 'Completed',
  CANCELLED: 'Cancelled',
} as const;

export const URGENCY_LEVELS = {
  LOW: 'Low',
  NORMAL: 'Normal',
  HIGH: 'High',
  URGENT: 'Urgent',
} as const;

export const PRIORITY_LEVELS = {
  LOW: 'Low',
  MEDIUM: 'Medium',
  HIGH: 'High',
} as const;
