import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export interface CartItem {
  _id: string;
  name: string;
  slug: string;
  image: any;
  size: string;
  price: number;
  quantity: number;
  category: string;
}

interface CartStore {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (id: string, size: string) => void;
  updateQuantity: (id: string, size: string, quantity: number) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getSubtotal: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      
      addItem: (newItem) => {
        const currentItems = get().items;
        const existingItemIndex = currentItems.findIndex(
          (item) => item._id === newItem._id && item.size === newItem.size
        );

        if (existingItemIndex > -1) {
          const updatedItems = [...currentItems];
          updatedItems[existingItemIndex].quantity += newItem.quantity;
          set({ items: updatedItems });
        } else {
          set({ items: [...currentItems, newItem] });
        }
      },

      removeItem: (id, size) => {
        set({
          items: get().items.filter((item) => !(item._id === id && item.size === size)),
        });
      },

      updateQuantity: (id, size, quantity) => {
        if (quantity < 1) return;
        const updatedItems = get().items.map((item) =>
          item._id === id && item.size === size ? { ...item, quantity } : item
        );
        set({ items: updatedItems });
      },

      clearCart: () => set({ items: [] }),

      getTotalItems: () => get().items.reduce((acc, item) => acc + item.quantity, 0),
      
      getSubtotal: () => get().items.reduce((acc, item) => acc + item.price * item.quantity, 0),
    }),
    {
      name: 'zahidaan-cart-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
