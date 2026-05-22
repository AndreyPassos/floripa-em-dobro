import { Coupon, CouponCategory } from '../types/coupon.types'

export function getFilteredCoupons(
  coupons: Coupon[],
  selectedCategory: CouponCategory,
  searchQuery: string
): Coupon[] {
  let result = coupons

  if (selectedCategory !== 'todos') {
    result = result.filter(c => c.category === selectedCategory)
  }

  const q = searchQuery.trim().toLowerCase()
  if (q) {
    result = result.filter(
      c =>
        c.title.toLowerCase().includes(q) ||
        (c.description?.toLowerCase().includes(q) ?? false)
    )
  }

  return [...result].sort((a, b) => {
    if (a.status !== b.status) return a.status === 'aberto' ? -1 : 1
    return b.createdAt - a.createdAt
  })
}
