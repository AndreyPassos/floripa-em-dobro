import React from 'react'
import { render, fireEvent, act } from '@testing-library/react-native'
import { ThemeProvider } from 'styled-components/native'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { theme } from '../../../shared/theme'
import { CouponListScreen } from '../screens/CouponListScreen'
import { useCouponsStore } from '../store/useCouponsStore'

const mockNavigate = jest.fn()
const mockNavigation = { navigate: mockNavigate } as any
const mockRoute = { params: {} } as any

const wrap = (ui: React.ReactElement) => (
  <SafeAreaProvider>
    <ThemeProvider theme={theme}>{ui}</ThemeProvider>
  </SafeAreaProvider>
)

beforeEach(() => {
  useCouponsStore.setState({
    coupons: [
      {
        id: '1',
        title: 'Parma Pizza',
        description: 'Rodízio grátis',
        category: 'pizzaria',
        isBonus: true,
        isFavorite: false,
        status: 'aberto',
        createdAt: Date.now(),
      },
      {
        id: '2',
        title: 'Bosco Galeto',
        description: 'Galeto grátis',
        category: 'restaurante',
        isBonus: false,
        isFavorite: false,
        status: 'aberto',
        createdAt: Date.now() - 1000,
      },
    ],
    searchQuery: '',
    selectedCategory: 'todos',
    isLoading: false,
  })
  mockNavigate.mockClear()
})

describe('CouponListScreen', () => {
  it('renderiza os cupons da store', () => {
    const { getByText } = render(
      wrap(<CouponListScreen navigation={mockNavigation} route={mockRoute} />)
    )
    expect(getByText('Parma Pizza')).toBeTruthy()
    expect(getByText('Bosco Galeto')).toBeTruthy()
  })

  it('filtra cupons ao digitar na busca', () => {
    const { getByTestId, queryByText } = render(
      wrap(<CouponListScreen navigation={mockNavigation} route={mockRoute} />)
    )
    act(() => {
      fireEvent.changeText(getByTestId('search-input'), 'Parma')
    })
    expect(queryByText('Parma Pizza')).toBeTruthy()
    expect(queryByText('Bosco Galeto')).toBeNull()
  })

  it('navega para CouponForm ao tocar no FAB', () => {
    const { getByTestId } = render(
      wrap(<CouponListScreen navigation={mockNavigation} route={mockRoute} />)
    )
    fireEvent.press(getByTestId('fab-add'))
    expect(mockNavigate).toHaveBeenCalledWith('CouponForm', {})
  })
})
