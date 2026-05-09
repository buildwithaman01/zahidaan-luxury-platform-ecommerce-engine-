'use client';

import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { motion } from 'framer-motion';
import { useCartStore } from '@/lib/store';
import { calculateShipping, OrderType } from '@/lib/shipping';
import PaymentSelector from './PaymentSelector';
import { useRouter } from 'next/navigation';
import { createOrder } from '@/lib/api';

const schema = z.object({
  name: z.string().min(3, 'Name is too short'),
  phone: z.string().min(10, 'Invalid phone number').max(10, 'Invalid phone number'),
  email: z.string().email('Invalid email address').optional().or(z.literal('')),
  address: z.string().min(10, 'Please provide full address'),
  area: z.string().min(3, 'Area is required'),
  city: z.string().min(2, 'City is required'),
  state: z.string().min(2, 'State is required'),
  pincode: z.string().length(6, 'Pincode must be 6 digits'),
  utrNumber: z.string().min(8, 'Enter valid UTR number').optional().or(z.literal('')),
});

type FormData = z.infer<typeof schema>;

const OrderForm = () => {
  const { items, getSubtotal, clearCart } = useCartStore();
  const subtotal = getSubtotal();
  const [paymentMethod, setPaymentMethod] = useState('upi');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const pincode = watch('pincode');
  const [shippingInfo, setShippingInfo] = useState(calculateShipping(subtotal, '', paymentMethod));

  useEffect(() => {
    if (pincode?.length === 6) {
      setShippingInfo(calculateShipping(subtotal, pincode, paymentMethod));
    }
  }, [pincode, paymentMethod, subtotal]);

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    
    const orderData = {
      ...data,
      payment_method: paymentMethod,
      items: items.map(item => ({
        product_id: item.slug,
        name: item.name,
        size: item.size,
        qty: item.quantity,
        price: item.price,
      })),
      subtotal,
      shipping: shippingInfo.shipping,
      cod_charge: shippingInfo.codCharge,
      total: shippingInfo.total,
    };

    try {
      const result = await createOrder(orderData);
      
      if (result.success) {
        clearCart();
        router.push(result.redirect);
      } else {
        alert(result.error || 'Failed to place order. Please try again.');
        setIsSubmitting(false);
      }
    } catch (error) {
      console.error('Submission Error:', error);
      alert('Failed to connect to server. Please try again.');
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-12">
      {/* Customer Info */}
      <div className="space-y-8">
        <h3 className="font-display text-2xl text-z-black border-b border-z-gold/10 pb-4">Delivery Details</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="font-body text-[11px] uppercase tracking-widest text-z-charcoal/60">Full Name</label>
            <input 
              {...register('name')} 
              className={`w-full bg-transparent border-b border-z-gold/20 py-2 focus:outline-none focus:border-z-gold transition-colors ${errors.name ? 'border-red-500' : ''}`}
              placeholder="John Doe"
            />
            {errors.name && <p className="text-[10px] text-red-500 uppercase">{errors.name.message}</p>}
          </div>

          <div className="space-y-2">
            <label className="font-body text-[11px] uppercase tracking-widest text-z-charcoal/60">Phone Number (WhatsApp)</label>
            <input 
              {...register('phone')} 
              className={`w-full bg-transparent border-b border-z-gold/20 py-2 focus:outline-none focus:border-z-gold transition-colors ${errors.phone ? 'border-red-500' : ''}`}
              placeholder="9876543210"
            />
            {errors.phone && <p className="text-[10px] text-red-500 uppercase">{errors.phone.message}</p>}
          </div>

          <div className="space-y-2 md:col-span-2">
            <label className="font-body text-[11px] uppercase tracking-widest text-z-charcoal/60">Email Address</label>
            <input 
              {...register('email')} 
              className={`w-full bg-transparent border-b border-z-gold/20 py-2 focus:outline-none focus:border-z-gold transition-colors ${errors.email ? 'border-red-500' : ''}`}
              placeholder="john@example.com"
            />
            {errors.email && <p className="text-[10px] text-red-500 uppercase">{errors.email.message}</p>}
          </div>

          <div className="space-y-2 md:col-span-2">
            <label className="font-body text-[11px] uppercase tracking-widest text-z-charcoal/60">Full Street Address</label>
            <input 
              {...register('address')} 
              className={`w-full bg-transparent border-b border-z-gold/20 py-2 focus:outline-none focus:border-z-gold transition-colors ${errors.address ? 'border-red-500' : ''}`}
              placeholder="Flat, House No, Building, Company, Apartment"
            />
            {errors.address && <p className="text-[10px] text-red-500 uppercase">{errors.address.message}</p>}
          </div>

          <div className="space-y-2">
            <label className="font-body text-[11px] uppercase tracking-widest text-z-charcoal/60">Area / Colony</label>
            <input 
              {...register('area')} 
              className="w-full bg-transparent border-b border-z-gold/20 py-2 focus:outline-none focus:border-z-gold transition-colors"
              placeholder="Banjara Hills"
            />
          </div>

          <div className="space-y-2">
            <label className="font-body text-[11px] uppercase tracking-widest text-z-charcoal/60">Pincode</label>
            <input 
              {...register('pincode')} 
              className={`w-full bg-transparent border-b border-z-gold/20 py-2 focus:outline-none focus:border-z-gold transition-colors ${errors.pincode ? 'border-red-500' : ''}`}
              placeholder="502307"
            />
            {errors.pincode && <p className="text-[10px] text-red-500 uppercase">{errors.pincode.message}</p>}
          </div>

          <div className="space-y-2">
            <label className="font-body text-[11px] uppercase tracking-widest text-z-charcoal/60">City</label>
            <input 
              {...register('city')} 
              className="w-full bg-transparent border-b border-z-gold/20 py-2 focus:outline-none focus:border-z-gold transition-colors"
              placeholder="Hyderabad"
            />
          </div>

          <div className="space-y-2">
            <label className="font-body text-[11px] uppercase tracking-widest text-z-charcoal/60">State</label>
            <input 
              {...register('state')} 
              className="w-full bg-transparent border-b border-z-gold/20 py-2 focus:outline-none focus:border-z-gold transition-colors"
              placeholder="Telangana"
            />
          </div>

        </div>
      </div>

      {/* Payment Selection */}
      <PaymentSelector 
        paymentMethod={paymentMethod}
        setPaymentMethod={setPaymentMethod}
        isCodEligible={shippingInfo.isCodEligible}
        orderType={shippingInfo.type}
        totalAmount={shippingInfo.total}
      />

      {/* Payment Verification (UTR) - Now appearing AFTER the scanner */}
      {paymentMethod === 'upi' && (
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-6 bg-z-mist/50 border border-z-gold/10 space-y-4 shadow-inner"
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-z-gold text-z-white rounded-full flex items-center justify-center font-bold text-sm">₹</div>
            <h4 className="font-display text-lg text-z-black">Payment Verification</h4>
          </div>
          <p className="font-body text-xs text-z-charcoal/60 leading-relaxed">
            Please enter the **12-digit UTR / Transaction ID** from your PhonePe app. This is the final step to secure your order.
          </p>
          <div className="space-y-2">
            <label className="font-body text-[11px] uppercase tracking-widest text-z-amber font-bold">UTR / Transaction Number</label>
            <input 
              {...register('utrNumber')} 
              className={`w-full bg-z-white border border-z-gold/20 px-4 py-3 focus:outline-none focus:border-z-gold transition-colors ${errors.utrNumber ? 'border-red-500' : ''}`}
              placeholder="Enter 12-digit UTR Number"
            />
            {errors.utrNumber && <p className="text-[10px] text-red-500 uppercase">{errors.utrNumber.message}</p>}
          </div>
        </motion.div>
      )}

      {/* Order Summary Recap (Mobile) */}
      <div className="lg:hidden bg-z-mist p-6 space-y-4">
        <div className="flex justify-between font-body text-sm">
          <span className="text-z-charcoal/60">Subtotal</span>
          <span className="font-bold">₹{subtotal}</span>
        </div>
        <div className="flex justify-between font-body text-sm">
          <span className="text-z-charcoal/60">Shipping</span>
          <span className="font-bold">{shippingInfo.shipping === 0 ? 'FREE' : `₹${shippingInfo.shipping}`}</span>
        </div>
        {shippingInfo.codCharge > 0 && (
          <div className="flex justify-between font-body text-sm">
            <span className="text-z-charcoal/60">COD Charge</span>
            <span className="font-bold">₹{shippingInfo.codCharge}</span>
          </div>
        )}
        <div className="flex justify-between font-display text-xl pt-2 border-t border-z-gold/10">
          <span>Total</span>
          <span className="text-z-gold">₹{shippingInfo.total}</span>
        </div>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className={`w-full py-5 font-body font-bold uppercase tracking-[2px] transition-all ${
          isSubmitting ? 'bg-z-charcoal/20 cursor-not-allowed' : 'bg-z-emerald text-z-white hover:bg-z-emerald-mid shadow-xl shadow-z-emerald/20'
        }`}
      >
        {isSubmitting ? 'Processing Order...' : 'Place Order →'}
      </button>
    </form>
  );
};

export default OrderForm;
