import React from 'react'
import { render, fireEvent } from '@testing-library/react-native'
import { ThemeProvider } from 'styled-components/native'
import { theme } from '../../../shared/theme'
import { CouponCard } from '../components/CouponCard'
import { Coupon } from '../types/coupon.types'

const mockCoupon: Coupon = {
  id: '1',
  title: 'Parma Pizza',
  description: 'Na compra de um rodízio ganhe outro.',
  category: 'pizzaria',
  isBonus: true,
  isFavorite: false,
  status: 'aberto',
  createdAt: Date.now(),
}

const wrap = (ui: React.ReactElement) => (
  <ThemeProvider theme={theme}>{ui}</ThemeProvider>
)

describe('CouponCard', () => {
  it('renderiza título e descrição', () => {
    const { getByText } = render(
      wrap(<CouponCard coupon={mockCoupon} onPress={jest.fn()} onToggleFavorite={jest.fn()} />)
    )
    expect(getByText('Parma Pizza')).toBeTruthy()
    expect(getByText('Na compra de um rodízio ganhe outro.')).toBeTruthy()
  })

  it('exibe badge BÔNUS quando isBonus=true', () => {
    const { getByText } = render(
      wrap(<CouponCard coupon={mockCoupon} onPress={jest.fn()} onToggleFavorite={jest.fn()} />)
    )
    expect(getByText('BÔNUS')).toBeTruthy()
  })

  it('não exibe badge BÔNUS quando isBonus=false', () => {
    const { queryByText } = render(
      wrap(
        <CouponCard
          coupon={{ ...mockCoupon, isBonus: false }}
          onPress={jest.fn()}
          onToggleFavorite={jest.fn()}
        />
      )
    )
    expect(queryByText('BÔNUS')).toBeNull()
  })

  it('exibe status "Fechado"', () => {
    const { getByText } = render(
      wrap(
        <CouponCard
          coupon={{ ...mockCoupon, status: 'fechado' }}
          onPress={jest.fn()}
          onToggleFavorite={jest.fn()}
        />
      )
    )
    expect(getByText('Fechado')).toBeTruthy()
  })

  it('chama onPress ao tocar no card', () => {
    const onPress = jest.fn()
    const { getByTestId } = render(
      wrap(<CouponCard coupon={mockCoupon} onPress={onPress} onToggleFavorite={jest.fn()} />)
    )
    fireEvent.press(getByTestId('coupon-card'))
    expect(onPress).toHaveBeenCalledTimes(1)
  })

  it('chama onToggleFavorite ao tocar no coração', () => {
    const onToggleFavorite = jest.fn()
    const { getByTestId } = render(
      wrap(<CouponCard coupon={mockCoupon} onPress={jest.fn()} onToggleFavorite={onToggleFavorite} />)
    )
    fireEvent.press(getByTestId('favorite-button'))
    expect(onToggleFavorite).toHaveBeenCalledWith('1')
  })
})
