import React, { useState } from 'react'
import { Alert, Switch, ScrollView } from 'react-native'
import styled, { useTheme } from 'styled-components/native'
import { useCouponsStore } from '../store/useCouponsStore'
import { CouponCategory, COUPON_CATEGORIES, CATEGORY_LABELS } from '../types/coupon.types'
import { CouponFormScreenProps } from '../../../navigation/types'

const Container = styled.ScrollView`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background};
`

const Label = styled.Text`
  color: ${({ theme }) => theme.colors.text};
  font-family: ${({ theme }) => theme.typography.fontSemiBold};
  font-size: ${({ theme }) => theme.typography.size.md}px;
  margin-bottom: ${({ theme }) => theme.spacing.xs}px;
`

const Input = styled.TextInput<{ hasError?: boolean; multiline?: boolean }>`
  background-color: ${({ theme }) => theme.colors.cardBackground};
  color: ${({ theme }) => theme.colors.text};
  border-width: 1px;
  border-color: ${({ theme, hasError }) => (hasError ? theme.colors.error : theme.colors.inputBorder)};
  border-radius: ${({ theme }) => theme.borderRadius.sm}px;
  padding: 10px ${({ theme }) => theme.spacing.md}px;
  font-family: ${({ theme }) => theme.typography.fontRegular};
  font-size: ${({ theme }) => theme.typography.size.md}px;
  margin-bottom: ${({ theme }) => theme.spacing.md}px;
  height: ${({ multiline }) => (multiline ? '80px' : 'auto')};
  text-align-vertical: ${({ multiline }) => (multiline ? 'top' : 'auto')};
`

const ErrorText = styled.Text`
  color: ${({ theme }) => theme.colors.error};
  font-family: ${({ theme }) => theme.typography.fontRegular};
  font-size: ${({ theme }) => theme.typography.size.sm}px;
  margin-top: -${({ theme }) => theme.spacing.sm}px;
  margin-bottom: ${({ theme }) => theme.spacing.sm}px;
`

const CategoryChip = styled.TouchableOpacity<{ active: boolean }>`
  padding: 6px ${({ theme }) => theme.spacing.md}px;
  border-radius: ${({ theme }) => theme.borderRadius.full}px;
  border-width: 1px;
  border-color: ${({ theme, active }) => (active ? theme.colors.primary : theme.colors.inputBorder)};
  background-color: ${({ theme, active }) => (active ? theme.colors.primary : 'transparent')};
  margin-right: ${({ theme }) => theme.spacing.sm}px;
`

const ChipText = styled.Text<{ active: boolean }>`
  color: ${({ theme, active }) => (active ? theme.colors.text : theme.colors.textMuted)};
  font-family: ${({ theme }) => theme.typography.fontRegular};
  font-size: ${({ theme }) => theme.typography.size.base}px;
`

const SwitchRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing.xl}px;
`

const SaveButton = styled.TouchableOpacity`
  background-color: ${({ theme }) => theme.colors.primary};
  border-radius: ${({ theme }) => theme.borderRadius.md}px;
  padding: 14px;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing.md}px;
`

const SaveButtonText = styled.Text`
  color: ${({ theme }) => theme.colors.text};
  font-family: ${({ theme }) => theme.typography.fontSemiBold};
  font-size: ${({ theme }) => theme.typography.size.lg}px;
`

const DeleteButton = styled.TouchableOpacity`
  border-width: 1px;
  border-color: ${({ theme }) => theme.colors.error};
  border-radius: ${({ theme }) => theme.borderRadius.md}px;
  padding: 14px;
  align-items: center;
`

const DeleteButtonText = styled.Text`
  color: ${({ theme }) => theme.colors.error};
  font-family: ${({ theme }) => theme.typography.fontSemiBold};
  font-size: ${({ theme }) => theme.typography.size.lg}px;
`

export function CouponFormScreen({ navigation, route }: CouponFormScreenProps) {
  const theme = useTheme()
  const { couponId } = route.params ?? {}
  const { coupons, addCoupon, updateCoupon, deleteCoupon } = useCouponsStore()
  const existing = couponId ? coupons.find((c) => c.id === couponId) : undefined

  const [title, setTitle] = useState(existing?.title ?? '')
  const [description, setDescription] = useState(existing?.description ?? '')
  const [category, setCategory] = useState<CouponCategory>(existing?.category ?? 'todos')
  const [isBonus, setIsBonus] = useState(existing?.isBonus ?? false)
  const [titleError, setTitleError] = useState('')

  const handleSave = () => {
    if (!title.trim()) {
      setTitleError('Título é obrigatório')
      return
    }
    setTitleError('')
    if (couponId) {
      updateCoupon(couponId, { title: title.trim(), description: description.trim(), category, isBonus })
    } else {
      addCoupon({ title: title.trim(), description: description.trim(), category, isBonus })
    }
    navigation.goBack()
  }

  const handleDelete = () => {
    Alert.alert('Excluir Cupom', 'Tem certeza?', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Excluir',
        style: 'destructive',
        onPress: () => {
          if (couponId) deleteCoupon(couponId)
          navigation.goBack()
        },
      },
    ])
  }

  return (
    <Container contentContainerStyle={{ padding: 16, gap: 8 }} keyboardShouldPersistTaps="handled">
      <Label>Título *</Label>
      <Input
        testID="input-title"
        hasError={!!titleError}
        value={title}
        onChangeText={(t: string) => { setTitle(t); setTitleError('') }}
        placeholder="Nome do estabelecimento"
        placeholderTextColor={theme.colors.textMuted}
      />
      {titleError ? <ErrorText>{titleError}</ErrorText> : null}

      <Label>Descrição</Label>
      <Input
        testID="input-description"
        value={description}
        onChangeText={setDescription}
        placeholder="Texto da oferta"
        placeholderTextColor={theme.colors.textMuted}
        multiline
        numberOfLines={3}
      />

      <Label>Categoria</Label>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginBottom: 16 }}>
        {COUPON_CATEGORIES.filter((c) => c !== 'todos').map((cat) => (
          <CategoryChip key={cat} testID={`cat-${cat}`} active={category === cat} onPress={() => setCategory(cat)}>
            <ChipText active={category === cat}>{CATEGORY_LABELS[cat]}</ChipText>
          </CategoryChip>
        ))}
      </ScrollView>

      <SwitchRow>
        <Label>É Bônus?</Label>
        <Switch
          testID="switch-bonus"
          value={isBonus}
          onValueChange={setIsBonus}
          trackColor={{ true: theme.colors.primary, false: theme.colors.cardBorder }}
          thumbColor={theme.colors.text}
        />
      </SwitchRow>

      <SaveButton testID="save-button" onPress={handleSave}>
        <SaveButtonText>Salvar</SaveButtonText>
      </SaveButton>

      {couponId && (
        <DeleteButton testID="delete-button" onPress={handleDelete}>
          <DeleteButtonText>Excluir Cupom</DeleteButtonText>
        </DeleteButton>
      )}
    </Container>
  )
}
