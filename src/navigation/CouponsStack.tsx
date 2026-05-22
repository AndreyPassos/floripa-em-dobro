import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { CouponsStackParamList } from './types'
import { CouponListScreen } from '../features/coupons/screens/CouponListScreen'
import { CouponFormScreen } from '../features/coupons/screens/CouponFormScreen'
import { theme } from '../shared/theme'

const Stack = createStackNavigator<CouponsStackParamList>()

export function CouponsStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: theme.colors.background },
        headerTintColor: theme.colors.text,
        headerTitleStyle: {
          fontFamily: theme.typography.fontSemiBold,
          fontSize: theme.typography.size.lg,
        },
        cardStyle: { backgroundColor: theme.colors.background },
        headerBackTitle: 'Voltar',
      }}
    >
      <Stack.Screen name="CouponList" component={CouponListScreen} options={{ headerShown: false }} />
      <Stack.Screen
        name="CouponForm"
        component={CouponFormScreen}
        options={({ route }) => ({
          title: route.params?.couponId ? 'Editar Cupom' : 'Novo Cupom',
        })}
      />
    </Stack.Navigator>
  )
}
