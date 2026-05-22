import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { Coupon, CouponCategory } from '../types/coupon.types'
import { zustandMMKVStorage } from './zustandMMKVStorage'

type AddCouponInput = Pick<Coupon, 'title' | 'category' | 'isBonus'> & { description?: string }
type UpdateCouponInput = Partial<Pick<Coupon, 'title' | 'description' | 'category' | 'isBonus'>>

interface CouponsState {
  coupons: Coupon[]
  searchQuery: string
  selectedCategory: CouponCategory
  isLoading: boolean
  addCoupon: (data: AddCouponInput) => void
  updateCoupon: (id: string, data: UpdateCouponInput) => void
  deleteCoupon: (id: string) => void
  toggleFavorite: (id: string) => void
  setSearchQuery: (query: string) => void
  setSelectedCategory: (category: CouponCategory) => void
  simulateLoading: () => void
}

const randomId = () => Math.random().toString(36).slice(2) + Date.now().toString(36)
const randomStatus = (): Coupon['status'] => (Math.random() < 0.7 ? 'aberto' : 'fechado')

export const useCouponsStore = create<CouponsState>()(
  persist(
    (set) => ({
      coupons: [],
      searchQuery: '',
      selectedCategory: 'todos',
      isLoading: false,

      addCoupon: (data) =>
        set((state) => ({
          coupons: [
            ...state.coupons,
            {
              id: randomId(),
              title: data.title,
              description: data.description,
              category: data.category,
              isBonus: data.isBonus,
              isFavorite: false,
              status: randomStatus(),
              createdAt: Date.now(),
            },
          ],
        })),

      updateCoupon: (id, data) =>
        set((state) => ({
          coupons: state.coupons.map((c) => (c.id === id ? { ...c, ...data } : c)),
        })),

      deleteCoupon: (id) =>
        set((state) => ({
          coupons: state.coupons.filter((c) => c.id !== id),
        })),

      toggleFavorite: (id) =>
        set((state) => ({
          coupons: state.coupons.map((c) =>
            c.id === id ? { ...c, isFavorite: !c.isFavorite } : c
          ),
        })),

      setSearchQuery: (query) => set({ searchQuery: query }),
      setSelectedCategory: (category) => set({ selectedCategory: category }),

      simulateLoading: () => {
        set({ isLoading: true })
        setTimeout(() => set({ isLoading: false }), 1000)
      },
    }),
    {
      name: 'coupons-storage',
      storage: createJSONStorage(() => zustandMMKVStorage),
      partialize: (state) => ({ coupons: state.coupons }),
    }
  )
)
