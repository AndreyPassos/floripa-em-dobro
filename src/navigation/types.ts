import { NavigatorScreenParams } from '@react-navigation/native'
import { StackScreenProps } from '@react-navigation/stack'
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs'

export type CouponsStackParamList = {
  CouponList: undefined
  CouponForm: { couponId?: string }
}

export type TabParamList = {
  Home: undefined
  Cupons: NavigatorScreenParams<CouponsStackParamList>
  Favoritos: undefined
  Perfil: undefined
}

export type RootStackParamList = {
  Tabs: NavigatorScreenParams<TabParamList>
}

export type CouponListScreenProps = StackScreenProps<CouponsStackParamList, 'CouponList'>
export type CouponFormScreenProps = StackScreenProps<CouponsStackParamList, 'CouponForm'>
