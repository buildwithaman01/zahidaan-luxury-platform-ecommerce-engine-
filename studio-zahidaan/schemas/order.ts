import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'order',
  title: 'Orders',
  type: 'document',
  fields: [
    defineField({
      name: 'orderNumber',
      title: 'Order Number',
      type: 'string',
      readOnly: true,
    }),
    defineField({
      name: 'status',
      title: 'Order Status',
      type: 'string',
      options: {
        list: [
          { title: 'Pending / Payment Verification', value: 'pending' },
          { title: 'Confirmed', value: 'confirmed' },
          { title: 'Packed', value: 'packed' },
          { title: 'Shipped', value: 'shipped' },
          { title: 'Delivered', value: 'delivered' },
          { title: 'Cancelled', value: 'cancelled' },
          { title: 'Refunded', value: 'refunded' },
        ],
      },
      initialValue: 'pending',
    }),
    defineField({
      name: 'customer',
      title: 'Customer Details',
      type: 'object',
      fields: [
        { name: 'name', title: 'Name', type: 'string' },
        { name: 'phone', title: 'Phone Number', type: 'string' },
        { name: 'email', title: 'Email Address', type: 'string' },
        { name: 'address', title: 'Full Address', type: 'text' },
        { name: 'city', title: 'City', type: 'string' },
        { name: 'state', title: 'State', type: 'string' },
        { name: 'pincode', title: 'Pincode', type: 'string' },
      ],
    }),
    defineField({
      name: 'items',
      title: 'Order Items',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          { name: 'productId', title: 'Product Slug/ID', type: 'string' },
          { name: 'name', title: 'Product Name', type: 'string' },
          { name: 'size', title: 'Size', type: 'string' },
          { name: 'quantity', title: 'Quantity', type: 'number' },
          { name: 'price', title: 'Price (₹)', type: 'number' },
        ],
      }],
    }),
    defineField({
      name: 'payment',
      title: 'Payment Information',
      type: 'object',
      fields: [
        { name: 'method', title: 'Payment Method', type: 'string', initialValue: 'PhonePe' },
        { name: 'utrNumber', title: 'UTR / Transaction ID', type: 'string' },
        { 
          name: 'paymentStatus', 
          title: 'Payment Status', 
          type: 'string',
          options: {
            list: [
              { title: 'Pending Verification', value: 'pending' },
              { title: 'Verified / Paid', value: 'paid' },
              { title: 'Failed / Rejected', value: 'failed' },
            ]
          },
          initialValue: 'pending',
        },
      ],
    }),
    defineField({
      name: 'totals',
      title: 'Order Totals',
      type: 'object',
      fields: [
        { name: 'subtotal', title: 'Subtotal (₹)', type: 'number' },
        { name: 'shipping', title: 'Shipping (₹)', type: 'number' },
        { name: 'total', title: 'Final Total (₹)', type: 'number' },
      ],
    }),
    defineField({
      name: 'tracking',
      title: 'Shipping / Tracking',
      type: 'object',
      fields: [
        { name: 'courier', title: 'Courier Name', type: 'string' },
        { name: 'trackingId', title: 'Tracking ID', type: 'string' },
        { name: 'shippedDate', title: 'Date Shipped', type: 'datetime' },
      ],
    }),
    defineField({
      name: 'internalNotes',
      title: 'Internal Admin Notes',
      type: 'text',
      description: 'Only visible to staff.',
    }),
  ],
  orderings: [
    {
      title: 'Newest First',
      name: 'createdAtDesc',
      by: [{ field: '_createdAt', direction: 'desc' }],
    },
  ],
  preview: {
    select: {
      title: 'orderNumber',
      customerName: 'customer.name',
      status: 'status',
      total: 'totals.total',
    },
    prepare({ title, customerName, status, total }) {
      return {
        title: `${title} — ₹${total}`,
        subtitle: `${customerName} · Status: ${status.toUpperCase()}`,
      }
    },
  },
})
