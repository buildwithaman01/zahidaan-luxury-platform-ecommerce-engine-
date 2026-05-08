export const LOCAL_PINCODES = [
  '502307', '502319', '502313',
  '500032', '500075', '500019', '500090',
];

export const SHIPPING_CONFIG = {
  COD_MINIMUM: 599,
  COD_CHARGE: 60,
  FREE_SHIPPING_THRESHOLD: 999,
  SHIPPING_CHARGE: 79,
};

export type OrderType = 'local' | 'pan_india';

export function getOrderType(pincode: string): OrderType {
  const cleanPincode = pincode.replace(/\s/g, '');
  return LOCAL_PINCODES.includes(cleanPincode) ? 'local' : 'pan_india';
}

export function calculateShipping(subtotal: number, pincode: string, paymentMethod: string) {
  const type = getOrderType(pincode);
  
  let shipping = 0;
  let codCharge = 0;

  if (type === 'local') {
    shipping = 0;
    codCharge = 0;
  } else {
    // Pan-India
    shipping = subtotal >= SHIPPING_CONFIG.FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_CONFIG.SHIPPING_CHARGE;
    codCharge = paymentMethod === 'cod' ? SHIPPING_CONFIG.COD_CHARGE : 0;
  }

  return {
    type,
    shipping,
    codCharge,
    total: subtotal + shipping + codCharge,
    isCodEligible: type === 'local' || (type === 'pan_india' && subtotal >= SHIPPING_CONFIG.COD_MINIMUM),
  };
}
