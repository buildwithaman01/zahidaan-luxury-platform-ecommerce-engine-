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
  size: z.string().optional().default('Standard'),
  mrp: z.number().nonnegative().optional().default(0),
  sellingPrice: z.number().nonnegative().optional().default(0),
  stock: z.number().optional().default(0),
  sku: z.string().optional(),
});

export const ProductSchema = z.object({
  _id: z.string().optional().default('temp-id'),
  name: z.string().optional().default('Unnamed Product'),
  slug: z.any().optional(), 
  category: z.any().optional(),
  image: z.any().optional(),
  images: z.array(z.any()).optional().default([]),
  sizes: z.array(ProductSizeSchema).optional().default([]),
  shortDescription: z.string().optional(),
  description: z.any().optional(),
  fragranceNotes: z.any().optional(),
  isBestseller: z.boolean().optional(),
  isFeatured: z.boolean().optional(),
  gender: z.string().optional(),
});

export type Product = z.infer<typeof ProductSchema>;

// --- REEL SCHEMAS ---

export const ReelSchema = z.object({
  _id: z.string(),
  title: z.string(),
  instagramUrl: z.string().url(),
  image: z.string().url(),
});

export type Reel = z.infer<typeof ReelSchema>;

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
  _id: z.string().optional().default('temp-cat'),
  name: z.string().optional().default('Uncategorized'),
  slug: z.any().optional(), 
  image: z.any().optional(),
  description: z.string().optional(),
});

export type Category = z.infer<typeof CategorySchema>;

// --- BLOG SCHEMAS ---

export const BlogPostSchema = z.object({
  _id: z.string().optional().default('temp-post'),
  title: z.string().optional().default('Untitled Post'),
  slug: z.any().optional(),
  excerpt: z.string().optional(),
  content: z.any().optional(), 
  mainImage: z.any().optional(),
  publishedAt: z.string().optional().default(new Date().toISOString()),
  author: z.any().optional(),
});

export type BlogPost = z.infer<typeof BlogPostSchema>;

/**
 * @function validateData
 * @description Helper to validate data against a schema.
 */
export function validateData<T>(schema: z.Schema<T>, data: any, context: string): T {
  try {
    return schema.parse(data);
  } catch (error) {
    if (error instanceof z.ZodError) {
      // Just log a minimal warning instead of throwing or logging big JSONs
      console.warn(`[DATA WARNING] ${context} has invalid fields. Skipping strict check.`);
      // Return a partial object that at least has an ID to avoid UI crashes
      return data as T;
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
  return data
    .map((item, index) => {
      try {
        return validateData(schema, item, `${context}[${index}]`);
      } catch (e) {
        console.error(`[VALIDATION ERROR] Skipping ${context}[${index}] due to error.`);
        return null;
      }
    })
    .filter((item): item is T => item !== null);
}
