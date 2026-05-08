import { create } from 'zustand';

interface UIStore {
  isCartDrawerOpen: boolean;
  isSearchOpen: boolean;
  openCartDrawer: () => void;
  closeCartDrawer: () => void;
  toggleCartDrawer: () => void;
  openSearch: () => void;
  closeSearch: () => void;
}

export const useUIStore = create<UIStore>((set) => ({
  isCartDrawerOpen: false,
  isSearchOpen: false,
  openCartDrawer: () => set({ isCartDrawerOpen: true }),
  closeCartDrawer: () => set({ isCartDrawerOpen: false }),
  toggleCartDrawer: () => set((state) => ({ isCartDrawerOpen: !state.isCartDrawerOpen })),
  openSearch: () => set({ isSearchOpen: true }),
  closeSearch: () => set({ isSearchOpen: false }),
}));
