export type CouponCategory =
  | 'todos'
  | 'extra'
  | 'hamburgueria'
  | 'restaurante'
  | 'pizzaria'
  | 'oriental'
  | 'bar'
  | 'carnes'
  | 'shopping'
  | 'petiscos'
  | 'combos'

export type CouponStatus = 'aberto' | 'fechado'

export interface Coupon {
  id: string
  title: string
  description?: string
  category: CouponCategory
  isBonus: boolean
  isFavorite: boolean
  status: CouponStatus
  imageUrl?: string
  createdAt: number
}

export const COUPON_CATEGORIES: CouponCategory[] = [
  'todos', 'extra', 'hamburgueria', 'restaurante', 'pizzaria',
  'oriental', 'bar', 'carnes', 'shopping', 'petiscos', 'combos',
]

export const CATEGORY_LABELS: Record<CouponCategory, string> = {
  todos: 'Todos',
  extra: 'Extra',
  hamburgueria: 'Hamburgueria',
  restaurante: 'Restaurante',
  pizzaria: 'Pizzaria',
  oriental: 'Oriental',
  bar: 'Bar/Boteco',
  carnes: 'Carnes',
  shopping: 'Shopping',
  petiscos: 'Petiscos',
  combos: 'Combos',
}
