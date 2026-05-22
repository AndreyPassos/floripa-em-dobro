import { getFilteredCoupons } from '../utils/getFilteredCoupons'
import { Coupon } from '../types/coupon.types'

const make = (overrides: Partial<Coupon> = {}): Coupon => ({
  id: '1',
  title: 'Coupon Teste',
  description: 'Descrição teste',
  category: 'restaurante',
  isBonus: false,
  isFavorite: false,
  status: 'aberto',
  createdAt: 1000,
  ...overrides,
})

describe('getFilteredCoupons', () => {
  it('retorna todos quando categoria é "todos" e busca vazia', () => {
    const coupons = [make({ id: '1' }), make({ id: '2' })]
    expect(getFilteredCoupons(coupons, 'todos', '')).toHaveLength(2)
  })

  it('filtra por categoria', () => {
    const coupons = [
      make({ id: '1', category: 'restaurante' }),
      make({ id: '2', category: 'pizzaria' }),
    ]
    const result = getFilteredCoupons(coupons, 'restaurante', '')
    expect(result).toHaveLength(1)
    expect(result[0].id).toBe('1')
  })

  it('filtra por busca no título (case-insensitive)', () => {
    const coupons = [
      make({ id: '1', title: 'Parma Pizza' }),
      make({ id: '2', title: 'Bosco Galeto' }),
    ]
    const result = getFilteredCoupons(coupons, 'todos', 'PARMA')
    expect(result).toHaveLength(1)
    expect(result[0].id).toBe('1')
  })

  it('filtra por busca na descrição', () => {
    const coupons = [
      make({ id: '1', description: 'rodizio gratis' }),
      make({ id: '2', description: 'desconto 10%' }),
    ]
    expect(getFilteredCoupons(coupons, 'todos', 'rodizio')).toHaveLength(1)
  })

  it('retorna vazio quando busca não encontra nada', () => {
    const coupons = [make({ title: 'Parma Pizza' })]
    expect(getFilteredCoupons(coupons, 'todos', 'xyzxyz')).toHaveLength(0)
  })

  it('ordena abertos antes de fechados', () => {
    const coupons = [
      make({ id: '1', status: 'fechado', createdAt: 2000 }),
      make({ id: '2', status: 'aberto', createdAt: 1000 }),
    ]
    const result = getFilteredCoupons(coupons, 'todos', '')
    expect(result[0].id).toBe('2')
  })

  it('ordena por createdAt desc dentro do mesmo status', () => {
    const coupons = [
      make({ id: '1', status: 'aberto', createdAt: 100 }),
      make({ id: '2', status: 'aberto', createdAt: 200 }),
    ]
    const result = getFilteredCoupons(coupons, 'todos', '')
    expect(result[0].id).toBe('2')
  })

  it('combina filtro de categoria e busca', () => {
    const coupons = [
      make({ id: '1', category: 'pizzaria', title: 'Parma Pizza' }),
      make({ id: '2', category: 'restaurante', title: 'Parma Restaurante' }),
      make({ id: '3', category: 'pizzaria', title: 'Outra Pizzaria' }),
    ]
    const result = getFilteredCoupons(coupons, 'pizzaria', 'parma')
    expect(result).toHaveLength(1)
    expect(result[0].id).toBe('1')
  })
})
