import { CustomerSchema, OrderSchema } from '../lib/schemas';

describe('Data Schemas (Zod)', () => {
  describe('CustomerSchema', () => {
    it('should validate a correct customer object', () => {
      const validCustomer = {
        name: 'Aman Khan',
        email: 'aman@example.com',
        phone: '9876543210',
        address: '123 Fragrance Street',
        city: 'Hyderabad',
        state: 'Telangana',
        pincode: '500001'
      };
      expect(CustomerSchema.safeParse(validCustomer).success).toBe(true);
    });

    it('should fail if name is too short', () => {
      const invalidCustomer = { name: 'A' };
      const result = CustomerSchema.safeParse(invalidCustomer);
      expect(result.success).toBe(false);
    });

    it('should fail if email is invalid', () => {
      const invalidCustomer = { email: 'not-an-email' };
      const result = CustomerSchema.safeParse(invalidCustomer);
      expect(result.success).toBe(false);
    });

    it('should fail if pincode is not 6 digits', () => {
      const invalidCustomer = { pincode: '12345' };
      const result = CustomerSchema.safeParse(invalidCustomer);
      expect(result.success).toBe(false);
    });
  });

  describe('OrderSchema', () => {
    it('should validate a full order object', () => {
      const validOrder = {
        orderNumber: 'ZAH-123456',
        customer: {
          name: 'Aman Khan',
          email: 'aman@example.com',
          phone: '9876543210',
          address: '123 Fragrance Street',
          city: 'Hyderabad',
          state: 'Telangana',
          pincode: '500001'
        },
        items: [
          {
            productId: 'oud-majestique',
            name: 'Oud Majestique',
            size: '50ml',
            quantity: 1,
            price: 4500
          }
        ],
        totals: {
          subtotal: 4500,
          shipping: 0,
          total: 4500
        },
        payment: {
          method: 'PhonePe',
          utrNumber: '123456789012',
          paymentStatus: 'pending'
        },
        status: 'pending'
      };
      expect(OrderSchema.safeParse(validOrder).success).toBe(true);
    });
  });
});
