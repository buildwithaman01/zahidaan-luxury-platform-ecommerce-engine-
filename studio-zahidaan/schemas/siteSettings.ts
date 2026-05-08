import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Site Title',
      type: 'string',
    }),
    defineField({
      name: 'description',
      title: 'Site Description',
      type: 'text',
    }),
    defineField({
      name: 'logo',
      title: 'Site Logo',
      type: 'image',
    }),
    defineField({
      name: 'contactNumber',
      title: 'WhatsApp Number',
      type: 'string',
      description: 'Format: 918297008727'
    }),
    defineField({
      name: 'freeShippingThreshold',
      title: 'Free Shipping Threshold (₹)',
      type: 'number',
      initialValue: 1500
    }),
    defineField({
      name: 'announcementBar',
      title: 'Announcement Bar Text',
      type: 'string',
      description: 'Leave empty to hide. e.g. "Free shipping on orders above ₹1500!"'
    }),
    defineField({
      name: 'maintenanceMode',
      title: 'Maintenance Mode',
      type: 'boolean',
      initialValue: false
    }),
  ],
})
