import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { IconData } from '@/types/icon-builder';

interface IconStoreState {
   cart: IconData[];
   addToCart: (icon: IconData) => void;
   removeFromCart: (iconId: string) => void;
   toggleInCart: (icon: IconData) => void;
   renameIcon: (iconId: string, newName: string) => void;
   clearCart: () => void;
}

export const useIconStore = create<IconStoreState>()(
   persist(
      (set) => ({
         cart: [],

         addToCart: (icon) =>
            set((state) => {
               // Prevent duplicates
               if (state.cart.some((item) => item.id === icon.id)) {
                  return state;
               }
               return { cart: [...state.cart, icon] };
            }),

         removeFromCart: (iconId) =>
            set((state) => ({
               cart: state.cart.filter((item) => item.id !== iconId),
            })),

         toggleInCart: (icon) =>
            set((state) => {
               const exists = state.cart.some((item) => item.id === icon.id);
               if (exists) {
                  return { cart: state.cart.filter((item) => item.id !== icon.id) };
               } else {
                  return { cart: [...state.cart, icon] };
               }
            }),

         renameIcon: (iconId, newName) =>
            set((state) => ({
               cart: state.cart.map((item) => (item.id === iconId ? { ...item, name: newName } : item)),
            })),

         clearCart: () => set({ cart: [] }),
      }),
      {
         name: 'icon-builder-cart', // localStorage key
      }
   )
);
