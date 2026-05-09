import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'product',
  title: 'Product',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Product Name',
      type: 'string',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'slug',
      title: 'URL Slug (Web Address)',
      type: 'slug',
      description: 'Click "Generate" to create a link. If it says "already in use", add a number at the end (e.g. oud-gold-2).',
      options: { source: 'name', maxLength: 96 },
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'reference',
      to: [{ type: 'category' }],
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'gender',
      title: 'Target Gender',
      type: 'string',
      options: {
        list: [
          { title: 'Men', value: 'Men' },
          { title: 'Women', value: 'Women' },
          { title: 'Unisex', value: 'Unisex' },
        ]
      }
    }),
    defineField({
      name: 'images',
      title: 'Product Images',
      type: 'array',
      of: [{ type: 'image', options: { hotspot: true } }],
      validation: Rule => Rule.required().min(1)
    }),
    defineField({
      name: 'shortDescription',
      title: 'Short Description',
      type: 'text',
      rows: 3,
      description: 'Shown on product cards — max 100 characters'
    }),
    defineField({
      name: 'description',
      title: 'Full Description',
      type: 'array',
      of: [{ type: 'block' }]
    }),
    defineField({
      name: 'fragranceNotes',
      title: 'Fragrance Notes',
      type: 'object',
      fields: [
        { name: 'top', title: 'Top Notes', type: 'array', of: [{ type: 'string' }] },
        { name: 'heart', title: 'Heart / Middle Notes', type: 'array', of: [{ type: 'string' }] },
        { name: 'base', title: 'Base Notes', type: 'array', of: [{ type: 'string' }] },
      ]
    }),
    defineField({
      name: 'fragranceFamily',
      title: 'Fragrance Family',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        list: ['Woody', 'Oriental', 'Floral', 'Fresh', 'Spicy', 'Citrus', 'Aquatic', 'Musky', 'Sweet']
      }
    }),
    defineField({
      name: 'concentration',
      title: 'Concentration',
      type: 'string',
      options: {
        list: [
          { title: 'Attar Oil', value: 'Attar Oil' },
          { title: 'Eau de Parfum', value: 'Eau de Parfum' },
          { title: 'Eau de Toilette', value: 'Eau de Toilette' },
          { title: 'Incense (Bakhoor)', value: 'Incense' },
        ]
      }
    }),
    defineField({
      name: 'longevity',
      title: 'Longevity (hours)',
      type: 'string',
      description: 'e.g. "8–10 hours"'
    }),
    defineField({
      name: 'projection',
      title: 'Projection',
      type: 'string',
      options: {
        list: [
          { title: 'Soft / Intimate', value: 'soft' },
          { title: 'Medium', value: 'medium' },
          { title: 'Strong', value: 'strong' },
        ]
      }
    }),
    defineField({
      name: 'skinFriendly',
      title: 'Skin Friendly?',
      type: 'boolean',
      initialValue: true
    }),
    defineField({
      name: 'sizes',
      title: 'Available Sizes & Prices',
      type: 'array',
      description: 'Add different sizes here (e.g. 6ml, 12ml). The first one will be the default.',
      of: [{
        type: 'object',
        fields: [
          { name: 'size', title: 'Size Name', type: 'string',
            placeholder: 'e.g. 6ml, 100ml' },
          { name: 'mrp', title: 'Original MRP (₹)', type: 'number', description: 'Show as crossed-out price' },
          { name: 'sellingPrice', title: 'Your Selling Price (₹)', type: 'number', description: 'The price customer pays' },
          { name: 'stock', title: 'Current Stock', type: 'number', initialValue: 10 },
        ]
      }],
      validation: Rule => Rule.required().min(1)
    }),
    defineField({
      name: 'isBestseller',
      title: 'Mark as Bestseller?',
      type: 'boolean',
      initialValue: false
    }),
    defineField({
      name: 'isFeatured',
      title: 'Show on Homepage?',
      type: 'boolean',
      initialValue: false
    }),
    defineField({
      name: 'seoTitle',
      title: 'SEO Title',
      type: 'string',
      description: 'Max 60 characters'
    }),
    defineField({
      name: 'seoDescription',
      title: 'SEO Description',
      type: 'text',
      rows: 2,
      description: 'Max 155 characters'
    }),
  ],
  preview: {
    select: {
      title: 'name',
      category: 'category.title',
      media: 'images.0'
    },
    prepare({ title, category, media }) {
      return {
        title,
        subtitle: category ? `Category: ${category}` : 'No Category',
        media
      }
    }
  }
})
