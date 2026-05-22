import { act } from '@testing-library/react-native'
import { useCouponsStore } from '../store/useCouponsStore'

const resetStore = () =>
  useCouponsStore.setState({
    coupons: [],
    searchQuery: '',
    selectedCategory: 'todos',
    isLoading: false,
  })

beforeEach(resetStore)

describe('useCouponsStore', () => {
  describe('addCoupon', () => {
    it('adiciona um cupom com id único e status aleatório', () => {
      act(() => {
        useCouponsStore.getState().addCoupon({
          title: 'Parma Pizza',
          description: 'Rodízio grátis',
          category: 'pizzaria',
          isBonus: true,
        })
      })
      const { coupons } = useCouponsStore.getState()
      expect(coupons).toHaveLength(1)
      expect(coupons[0].title).toBe('Parma Pizza')
      expect(coupons[0].isFavorite).toBe(false)
      expect(coupons[0].id).toBeTruthy()
      expect(['aberto', 'fechado']).toContain(coupons[0].status)
    })

    it('dois cupons têm ids diferentes', () => {
      act(() => {
        useCouponsStore.getState().addCoupon({ title: 'A', category: 'bar', isBonus: false })
        useCouponsStore.getState().addCoupon({ title: 'B', category: 'bar', isBonus: false })
      })
      const { coupons } = useCouponsStore.getState()
      expect(coupons[0].id).not.toBe(coupons[1].id)
    })
  })

  describe('updateCoupon', () => {
    it('atualiza campos do cupom', () => {
      act(() => {
        useCouponsStore.getState().addCoupon({ title: 'Antigo', category: 'bar', isBonus: false })
      })
      const id = useCouponsStore.getState().coupons[0].id
      act(() => {
        useCouponsStore.getState().updateCoupon(id, { title: 'Novo', isBonus: true })
      })
      const updated = useCouponsStore.getState().coupons[0]
      expect(updated.title).toBe('Novo')
      expect(updated.isBonus).toBe(true)
    })

    it('ignora id inexistente sem erros', () => {
      act(() => {
        useCouponsStore.getState().addCoupon({ title: 'A', category: 'bar', isBonus: false })
      })
      expect(() => {
        act(() => useCouponsStore.getState().updateCoupon('id-inexistente', { title: 'X' }))
      }).not.toThrow()
    })
  })

  describe('deleteCoupon', () => {
    it('remove o cupom da lista', () => {
      act(() => {
        useCouponsStore.getState().addCoupon({ title: 'A', category: 'bar', isBonus: false })
      })
      const id = useCouponsStore.getState().coupons[0].id
      act(() => useCouponsStore.getState().deleteCoupon(id))
      expect(useCouponsStore.getState().coupons).toHaveLength(0)
    })
  })

  describe('toggleFavorite', () => {
    it('alterna isFavorite true/false', () => {
      act(() => {
        useCouponsStore.getState().addCoupon({ title: 'A', category: 'bar', isBonus: false })
      })
      const id = useCouponsStore.getState().coupons[0].id
      act(() => useCouponsStore.getState().toggleFavorite(id))
      expect(useCouponsStore.getState().coupons[0].isFavorite).toBe(true)
      act(() => useCouponsStore.getState().toggleFavorite(id))
      expect(useCouponsStore.getState().coupons[0].isFavorite).toBe(false)
    })
  })

  describe('filtros', () => {
    it('setSearchQuery atualiza searchQuery', () => {
      act(() => useCouponsStore.getState().setSearchQuery('pizza'))
      expect(useCouponsStore.getState().searchQuery).toBe('pizza')
    })

    it('setSelectedCategory atualiza selectedCategory', () => {
      act(() => useCouponsStore.getState().setSelectedCategory('pizzaria'))
      expect(useCouponsStore.getState().selectedCategory).toBe('pizzaria')
    })
  })
})
