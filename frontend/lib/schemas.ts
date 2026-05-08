import { z } from 'zod';

/**
 * @file schemas.ts
 * @description Centralized Zod schemas for data validation across the application.
 * Ensures "Fail-Fast" behavior and provides type-safety for API boundaries.
 */

// --- CUSTOMER SCHEMAS ---

export const CustomerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address").optional().or(z.literal('')),
  phone: z.string().min(10, "Invalid phone number"),
  address: z.string().min(5, "Address is too short"),
  city: z.string().min(2, "City is required"),
  state: z.string().min(2, "State is required"),
  pincode: z.string().length(6, "Pincode must be 6 digits"),
});

export type Customer = z.infer<typeof CustomerSchema>;

// --- PRODUCT SCHEMAS ---

export const ProductSizeSchema = z.object({
  size: z.string(),
  price: z.number().positive(),
  sellingPrice: z.number().positive(),
  sku: z.string().optional(),
});

export const ProductSchema = z.object({
  _id: z.string(),
  name: z.string(),
  slug: z.string(),
  category: z.string(),
  images: z.array(z.any()), // Sanity image objects
  sizes: z.array(ProductSizeSchema),
  description: z.string().optional(),
  fragranceNotes: z.array(z.string()).optional(),
  isBestSeller: z.boolean().optional(),
  isNew: z.boolean().optional(),
});

export type Product = z.infer<typeof ProductSchema>;

// --- ORDER SCHEMAS ---

export const OrderItemSchema = z.object({
  productId: z.string(),
  name: z.string(),
  size: z.string(),
  quantity: z.number().int().positive(),
  price: z.number().positive(),
  image: z.string().optional(),
});

export const OrderSchema = z.object({
  orderNumber: z.string(),
  customer: CustomerSchema,
  items: z.array(OrderItemSchema),
  totals: z.object({
    subtotal: z.number(),
    shipping: z.number(),
    total: z.number(),
  }),
  payment: z.object({
    method: z.string(),
    utrNumber: z.string().optional(),
    paymentStatus: z.enum(['pending', 'paid', 'failed']),
  }),
  status: z.enum(['pending', 'confirmed', 'shipped', 'delivered', 'cancelled']),
  _createdAt: z.string().optional(),
});

export type Order = z.infer<typeof OrderSchema>;

// --- CATEGORY SCHEMAS ---

export const CategorySchema = z.object({
  _id: z.string(),
  name: z.string(),
  slug: z.string(),
  image: z.any().optional(),
  description: z.string().optional(),
});

export type Category = z.infer<typeof CategorySchema>;

// --- BLOG SCHEMAS ---

export const BlogPostSchema = z.object({
  _id: z.string(),
  title: z.string(),
  slug: z.string(),
  excerpt: z.string().optional(),
  content: z.any(), // Portable text
  mainImage: z.any().optional(),
  publishedAt: z.string(),
  author: z.object({
    name: z.string(),
    image: z.any().optional(),
  }).optional(),
});

export type BlogPost = z.infer<typeof BlogPostSchema>;

/**
 * @function validateData
 * @description Helper to validate data against a schema with helpful error logging.
 */
export function validateData<T>(schema: z.Schema<T>, data: any, context: string): T {
  try {
    return schema.parse(data);
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error(`[VALIDATION ERROR] ${context}:`, error.errors);
      throw new Error(`Invalid data provided for ${context}`);
    }
    throw error;
  }
}

/**
 * @function validateArray
 * @description Helper to validate an array of items against a schema.
 */
export function validateArray<T>(schema: z.Schema<T>, data: any, context: string): T[] {
  if (!Array.isArray(data)) {
    console.error(`[VALIDATION ERROR] ${context}: Data is not an array`);
    return [];
  }
  return data.map((item, index) => validateData(schema, item, `${context}[${index}]`));
}
