import React from 'react'
import styled, { useTheme } from 'styled-components/native'
import { Ionicons } from '@expo/vector-icons'
import { Coupon } from '../types/coupon.types'

const CARD_IMAGES = [
  require('@/assets/png/pizza.png'),
  require('@/assets/png/almoco.png'),
]

const LOGO = require('@/assets/png/restaurant.png')

function pickImage(id: string) {
  const sum = id.split('').reduce((acc, c) => acc + c.charCodeAt(0), 0)
  return CARD_IMAGES[sum % CARD_IMAGES.length]
}

interface CouponCardProps {
  coupon: Coupon
  onPress: () => void
  onToggleFavorite: (id: string) => void
}

const Container = styled.TouchableOpacity`
  flex-direction: row;
  background-color: ${({ theme }) => theme.colors.cardBackground};
  border-width: 1px;
  border-color: ${({ theme }) => theme.colors.cardBorder};
  border-radius: ${({ theme }) => theme.borderRadius.md}px;
  width: 368px;
  overflow: hidden;
  align-self: center;
`

const ImageContainer = styled.View`
  width: 184px;
  height: 156px;
`

const CardImage = styled.Image`
  width: 184px;
  height: 156px;
  border-radius: ${({ theme }) => theme.borderRadius.md}px;
`

const LogoCircle = styled.View`
  position: absolute;
  right: -24px;
  top: 11px;
  width: 48px;
  height: 48px;
  border-radius: 24px;
  border-width: 1px;
  border-color: #919493;
  background-color: ${({ theme }) => theme.colors.cardBackground};
  overflow: hidden;
`

const LogoImage = styled.Image`
  width: 48px;
  height: 48px;
`

const BonusBadge = styled.View`
  position: absolute;
  top: 18px;
  left: -55px;
  width: 200px;
  padding-top: 11px;
  padding-bottom: 11px;
  background-color: ${({ theme }) => theme.colors.primary};
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 6px;
  transform: rotate(-45deg);
`

const BonusText = styled.Text`
  color: ${({ theme }) => theme.colors.text};
  font-family: ${({ theme }) => theme.typography.fontSemiBold};
  font-size: ${({ theme }) => theme.typography.size.lg}px;
`

const Content = styled.View`
  flex: 1;
  padding: ${({ theme }) => theme.spacing.md}px;
  justify-content: space-between;
`

const FavoriteButton = styled.TouchableOpacity`
  align-self: flex-end;
`

const Title = styled.Text`
  color: ${({ theme }) => theme.colors.text};
  font-family: ${({ theme }) => theme.typography.fontSemiBold};
  font-size: ${({ theme }) => theme.typography.size.base}px;
  margin-top: ${({ theme }) => theme.spacing.xs}px;
`

const Description = styled.Text`
  color: ${({ theme }) => theme.colors.text};
  font-family: ${({ theme }) => theme.typography.fontRegular};
  font-size: ${({ theme }) => theme.typography.size.xs}px;
  flex: 1;
  margin-top: ${({ theme }) => theme.spacing.xs}px;
`

const StatusRow = styled.View`
  align-items: flex-end;
`

const StatusBadge = styled.View<{ status: 'aberto' | 'fechado' }>`
  background-color: ${({ theme, status }) =>
    status === 'aberto' ? theme.colors.statusAberto : theme.colors.statusFechado};
  padding: 4px 16px;
  border-radius: ${({ theme }) => theme.borderRadius.lg}px;
`

const StatusText = styled.Text`
  color: ${({ theme }) => theme.colors.text};
  font-family: ${({ theme }) => theme.typography.fontSemiBold};
  font-size: ${({ theme }) => theme.typography.size.sm}px;
`

export function CouponCard({ coupon, onPress, onToggleFavorite }: CouponCardProps) {
  const theme = useTheme()
  return (
    <Container testID="coupon-card" onPress={onPress} activeOpacity={0.85}>
      <ImageContainer>
        <CardImage source={pickImage(coupon.id)} resizeMode="cover" />
        {coupon.isBonus && (
          <BonusBadge>
            <Ionicons name="star" size={20} color={theme.colors.bonusAccent} />
            <BonusText>BÔNUS</BonusText>
          </BonusBadge>
        )}
        <LogoCircle>
          <LogoImage source={LOGO} resizeMode="cover" />
        </LogoCircle>
      </ImageContainer>

      <Content>
        <FavoriteButton testID="favorite-button" onPress={() => onToggleFavorite(coupon.id)}>
          <Ionicons
            name={coupon.isFavorite ? 'heart' : 'heart-outline'}
            size={20}
            color={coupon.isFavorite ? theme.colors.primary : theme.colors.text}
          />
        </FavoriteButton>

        <Title numberOfLines={1}>{coupon.title}</Title>

        {coupon.description ? (
          <Description numberOfLines={3}>{coupon.description}</Description>
        ) : null}

        <StatusRow>
          <StatusBadge status={coupon.status}>
            <StatusText>{coupon.status === 'aberto' ? 'Aberto' : 'Fechado'}</StatusText>
          </StatusBadge>
        </StatusRow>
      </Content>
    </Container>
  )
}
