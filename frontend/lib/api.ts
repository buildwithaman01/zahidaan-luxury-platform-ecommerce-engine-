import { OrderSchema, validateData, type Order } from './schemas';

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || '';

/**
 * Sends a new order to the backend MySQL API.
 * Validates the order data before sending and handles response errors.
 * 
 * @param {Order} orderData The validated order data.
 * @returns {Promise<{success: boolean, orderId?: string, error?: string}>} The API response.
 */
export async function createOrder(orderData: Order) {
  try {
    const response = await fetch(`/api/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(orderData),
    });

    if (!response.ok) {
      throw new Error(`Server responded with ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('API Error (createOrder):', error);
    return { success: false, error: error instanceof Error ? error.message : 'Failed to connect to server' };
  }
}

/**
 * Fetches the status of an order using its unique token.
 * 
 * @param {string} token The unique order token.
 * @returns {Promise<{success: boolean, status?: string, error?: string}>} The order status.
 */
export async function getOrderStatus(id: string) {
  try {
    const response = await fetch(`/api/orders/${id}`);
    
    if (!response.ok) {
      throw new Error(`Server responded with ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('API Error (getOrderStatus):', error);
    return { success: false, error: error instanceof Error ? error.message : 'Failed to connect to server' };
  }
}
