import React, { useEffect } from 'react'
import { FlatList, ActivityIndicator } from 'react-native'
import styled, { useTheme } from 'styled-components/native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useCouponsStore } from '../store/useCouponsStore'
import { getFilteredCoupons } from '../utils/getFilteredCoupons'
import { CouponCard } from '../components/CouponCard'
import { CategoryFilter } from '../components/CategoryFilter'
import { SearchBar } from '../components/SearchBar'
import { mockCoupons } from '../data/mockCoupons'
import { CouponListScreenProps } from '../../../navigation/types'
import { Ionicons } from '@expo/vector-icons'

const editionCardImage = require('@/assets/png/edition-card.png')

const ScreenRoot = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background};
`

const LoadingContainer = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background};
  align-items: center;
  justify-content: center;
`

const HeaderArea = styled.View`
  background-color: ${({ theme }) => theme.colors.cardBackground};
  align-items: center;
  padding-horizontal: ${({ theme }) => theme.spacing.lg}px;
  padding-bottom: ${({ theme }) => theme.spacing.lg}px;
  gap: ${({ theme }) => theme.spacing.md}px;
`

const SearchBridge = styled.View`
  height: 47px;
`

const BridgeTop = styled.View`
  height: 23px;
  background-color: ${({ theme }) => theme.colors.cardBackground};
`

const BridgeBottom = styled.View`
  height: 24px;
  background-color: ${({ theme }) => theme.colors.background};
`

const SearchBarPositioner = styled.View`
  position: absolute;
  top: 0;
  bottom: 0;
  left: ${({ theme }) => theme.spacing.lg}px;
  right: ${({ theme }) => theme.spacing.lg}px;
  justify-content: center;
`

const LoginButton = styled.TouchableOpacity`
  background-color: ${({ theme }) => theme.colors.primary};
  border-radius: ${({ theme }) => theme.borderRadius.lg}px;
  padding: 6px ${({ theme }) => theme.spacing.xl}px;
`

const LoginText = styled.Text`
  color: ${({ theme }) => theme.colors.text};
  font-family: ${({ theme }) => theme.typography.fontSemiBold};
  font-size: ${({ theme }) => theme.typography.size.base}px;
`

const BannerWrapper = styled.View`
  width: 368px;
  height: 196px;
  border-radius: ${({ theme }) => theme.borderRadius.md}px;
  border-top-width: 2px;
  border-left-width: 2px;
  border-right-width: 2px;
  border-bottom-width: 6px;
  border-color: ${({ theme }) => theme.colors.accent};
  align-self: center;
  margin-bottom: 10px;
  overflow: hidden;
`

const Banner = styled.Image`
  width: 100%;
  height: 100%;
`

const EmptyText = styled.Text`
  color: ${({ theme }) => theme.colors.textMuted};
  font-family: ${({ theme }) => theme.typography.fontRegular};
  text-align: center;
  margin-top: ${({ theme }) => theme.spacing.xxl}px;
`

const Separator = styled.View`
  height: 18px;
`

const FAB = styled.TouchableOpacity`
  position: absolute;
  bottom: ${({ theme }) => theme.spacing.xl}px;
  right: ${({ theme }) => theme.spacing.xl}px;
  width: 56px;
  height: 56px;
  border-radius: ${({ theme }) => theme.borderRadius.full}px;
  background-color: ${({ theme }) => theme.colors.primary};
  align-items: center;
  justify-content: center;
  elevation: 4;
`

export function CouponListScreen({ navigation }: CouponListScreenProps) {
  const theme = useTheme()
  const insets = useSafeAreaInsets()
  const {
    coupons, searchQuery, selectedCategory, isLoading,
    setSearchQuery, setSelectedCategory, toggleFavorite,
    simulateLoading, addCoupon,
  } = useCouponsStore()

  useEffect(() => {
    if (coupons.length === 0) {
      simulateLoading()
      mockCoupons.forEach((c) =>
        addCoupon({ title: c.title, description: c.description, category: c.category, isBonus: c.isBonus })
      )
    }
  }, [])

  const filtered = getFilteredCoupons(coupons, selectedCategory, searchQuery)

  if (isLoading) {
    return (
      <LoadingContainer>
        <ActivityIndicator size="large" color={theme.colors.accent} />
      </LoadingContainer>
    )
  }

  return (
    <ScreenRoot>
      <HeaderArea style={{ paddingTop: insets.top + theme.spacing.md }}>
        <LoginButton>
          <LoginText>Login / Cadastro</LoginText>
        </LoginButton>
      </HeaderArea>

      <SearchBridge>
        <BridgeTop />
        <BridgeBottom />
        <SearchBarPositioner>
          <SearchBar value={searchQuery} onChangeText={setSearchQuery} />
        </SearchBarPositioner>
      </SearchBridge>

      <CategoryFilter selected={selectedCategory} onSelect={setSelectedCategory} />

      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingTop: 16, paddingBottom: 80 }}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <BannerWrapper>
            <Banner source={editionCardImage} resizeMode="contain" />
          </BannerWrapper>
        }
        ListEmptyComponent={<EmptyText>Nenhum cupom encontrado.</EmptyText>}
        renderItem={({ item }) => (
          <CouponCard
            coupon={item}
            onPress={() => navigation.navigate('CouponForm', { couponId: item.id })}
            onToggleFavorite={toggleFavorite}
          />
        )}
        ItemSeparatorComponent={() => <Separator />}
      />

      <FAB testID="fab-add" onPress={() => navigation.navigate('CouponForm', {})}>
        <Ionicons name="add" size={28} color={theme.colors.text} />
      </FAB>
    </ScreenRoot>
  )
}
