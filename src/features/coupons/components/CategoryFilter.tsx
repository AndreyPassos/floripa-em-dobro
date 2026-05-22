import React from 'react'
import styled, { useTheme } from 'styled-components/native'
import { CouponCategory, COUPON_CATEGORIES, CATEGORY_LABELS } from '../types/coupon.types'
import IcTodos from '@/assets/icons/ic_todos.svg'
import IcExtra from '@/assets/icons/ic_extra.svg'
import IcHamburgueria from '@/assets/icons/ic_hamburgueria.svg'
import IcRestaurante from '@/assets/icons/ic_restaurante.svg'
import IcPizzaria from '@/assets/icons/ic_pizzaria.svg'
import IcOriental from '@/assets/icons/ic_oriental.svg'
import IcBar from '@/assets/icons/ic_bar.svg'
import IcCarnes from '@/assets/icons/ic_carnes.svg'
import IcPetiscos from '@/assets/icons/ic_petiscos.svg'
import IcCombos from '@/assets/icons/ic_combos.svg'
import { SvgProps } from 'react-native-svg'

interface CategoryFilterProps {
  selected: CouponCategory
  onSelect: (category: CouponCategory) => void
}

const CATEGORY_ICONS: Record<CouponCategory, React.FC<SvgProps>> = {
  todos: IcTodos,
  extra: IcExtra,
  hamburgueria: IcHamburgueria,
  restaurante: IcRestaurante,
  pizzaria: IcPizzaria,
  oriental: IcOriental,
  bar: IcBar,
  carnes: IcCarnes,
  shopping: IcBar,
  petiscos: IcPetiscos,
  combos: IcCombos,
}

const FilterWrapper = styled.View`
  height: 64px;
  flex-shrink: 0;
  background-color: ${({ theme }) => theme.colors.background};
  border-bottom-width: 1px;
  border-bottom-color: ${({ theme }) => theme.colors.cardBorder};
`

const FilterScroll = styled.ScrollView`
  flex: 1;
`

const CategoryItem = styled.TouchableOpacity<{ active: boolean }>`
  min-width: 56px;
  height: 60px;
  align-items: center;
  justify-content: flex-end;
  flex-direction: column;
  gap: 4px;
  padding-bottom: 12px;
  padding-left: 8px;
  padding-right: 8px;
`

const CategoryLabel = styled.Text<{ active: boolean }>`
  font-family: ${({ theme }) => theme.typography.fontSemiBold};
  font-size: ${({ theme }) => theme.typography.size.xxs}px;
  color: ${({ theme, active }) => (active ? theme.colors.accent : theme.colors.text)};
  text-align: center;
`

export function CategoryFilter({ selected, onSelect }: CategoryFilterProps) {
  const theme = useTheme()
  return (
    <FilterWrapper>
      <FilterScroll
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          alignItems: 'flex-end',
          paddingHorizontal: 12,
          height: 63,
        }}
      >
        {COUPON_CATEGORIES.map((category) => {
          const isActive = selected === category
          return (
            <CategoryItem
              key={category}
              testID={`category-${category}`}
              active={isActive}
              onPress={() => onSelect(category)}
            >
              {React.createElement(CATEGORY_ICONS[category], {
                width: 20,
                height: 20,
                color: isActive ? theme.colors.accent : theme.colors.text,
              })}
              <CategoryLabel active={isActive}>{CATEGORY_LABELS[category]}</CategoryLabel>
            </CategoryItem>
          )
        })}
      </FilterScroll>
    </FilterWrapper>
  )
}
