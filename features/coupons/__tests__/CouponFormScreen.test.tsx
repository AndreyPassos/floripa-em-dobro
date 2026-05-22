import React from 'react'
import { Alert } from 'react-native'
import { render, fireEvent, act } from '@testing-library/react-native'
import { ThemeProvider } from 'styled-components/native'
import { theme } from '../../../shared/theme'
import { CouponFormScreen } from '../screens/CouponFormScreen'
import { useCouponsStore } from '../store/useCouponsStore'

jest.spyOn(Alert, 'alert').mockImplementation((_title, _msg, buttons) => {
  buttons?.find((b: any) => b.style === 'destructive')?.onPress?.()
})

const mockGoBack = jest.fn()
const mockNavigation = { goBack: mockGoBack, navigate: jest.fn(), setOptions: jest.fn() } as any

const wrap = (ui: React.ReactElement) => (
  <ThemeProvider theme={theme}>{ui}</ThemeProvider>
)

const renderCreate = () =>
  render(wrap(<CouponFormScreen navigation={mockNavigation} route={{ params: {} } as any} />))

const renderEdit = (couponId: string) =>
  render(wrap(<CouponFormScreen navigation={mockNavigation} route={{ params: { couponId } } as any} />))

beforeEach(() => {
  useCouponsStore.setState({
    coupons: [
      {
        id: 'edit-1',
        title: 'Cupom Existente',
        description: 'Desc existente',
        category: 'bar',
        isBonus: false,
        isFavorite: false,
        status: 'aberto',
        createdAt: Date.now(),
      },
    ],
    searchQuery: '',
    selectedCategory: 'todos',
    isLoading: false,
  })
  mockGoBack.mockClear()
})

describe('CouponFormScreen — modo criação', () => {
  it('exibe erro de validação ao salvar sem título', () => {
    const { getByTestId, getByText } = renderCreate()
    fireEvent.press(getByTestId('save-button'))
    expect(getByText('Título é obrigatório')).toBeTruthy()
  })

  it('não navega sem título', () => {
    const { getByTestId } = renderCreate()
    fireEvent.press(getByTestId('save-button'))
    expect(mockGoBack).not.toHaveBeenCalled()
  })

  it('cria cupom e volta ao salvar com título', () => {
    const { getByTestId } = renderCreate()
    fireEvent.changeText(getByTestId('input-title'), 'Novo Cupom')
    act(() => fireEvent.press(getByTestId('save-button')))
    const { coupons } = useCouponsStore.getState()
    expect(coupons.some((c) => c.title === 'Novo Cupom')).toBe(true)
    expect(mockGoBack).toHaveBeenCalledTimes(1)
  })
})

describe('CouponFormScreen — modo edição', () => {
  it('preenche campos com dados do cupom existente', () => {
    const { getByTestId } = renderEdit('edit-1')
    expect(getByTestId('input-title').props.value).toBe('Cupom Existente')
  })

  it('atualiza cupom ao salvar', () => {
    const { getByTestId } = renderEdit('edit-1')
    fireEvent.changeText(getByTestId('input-title'), 'Atualizado')
    act(() => fireEvent.press(getByTestId('save-button')))
    const updated = useCouponsStore.getState().coupons.find((c) => c.id === 'edit-1')
    expect(updated?.title).toBe('Atualizado')
  })

  it('exibe botão Excluir no modo edição', () => {
    const { getByTestId } = renderEdit('edit-1')
    expect(getByTestId('delete-button')).toBeTruthy()
  })

  it('exclui cupom e volta ao tocar em Excluir', () => {
    const { getByTestId } = renderEdit('edit-1')
    act(() => fireEvent.press(getByTestId('delete-button')))
    const { coupons } = useCouponsStore.getState()
    expect(coupons.find((c) => c.id === 'edit-1')).toBeUndefined()
    expect(mockGoBack).toHaveBeenCalledTimes(1)
  })
})
