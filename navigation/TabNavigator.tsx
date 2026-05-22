import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { TabParamList } from './types'
import { CouponsStack } from './CouponsStack'
import { ComingSoonScreen } from '../shared/components/ComingSoonScreen'
import { theme } from '../shared/theme'
import IcHome from '@/assets/icons/ic_home.svg'
import IcTicket from '@/assets/icons/ic_ticket.svg'
import IcFavorite from '@/assets/icons/ic_favorite.svg'
import IcPerfil from '@/assets/icons/ic_perfil.svg'

const Tab = createBottomTabNavigator<TabParamList>()

const TAB_ICONS: Record<string, React.FC<{ color: string; width: number; height: number }>> = {
  Home: IcHome,
  Cupons: IcTicket,
  Favoritos: IcFavorite,
  Perfil: IcPerfil,
}

export function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: {
          height: 93,
          paddingTop: 12,
          backgroundColor: theme.colors.background,
          borderTopColor: theme.colors.cardBorder,
        },
        tabBarActiveTintColor: theme.colors.accent,
        tabBarInactiveTintColor: theme.colors.textMuted,
        tabBarLabelStyle: {
          marginTop: 4,
          fontFamily: theme.typography.fontInter,
          fontSize: theme.typography.size.sm,
        },
        tabBarIcon: ({ color, size }) => {
          const Icon = TAB_ICONS[route.name]
          return Icon ? <Icon color={color} width={size} height={size} /> : null
        },
      })}
    >
      <Tab.Screen name="Home" component={ComingSoonScreen} />
      <Tab.Screen name="Cupons" component={CouponsStack} />
      <Tab.Screen name="Favoritos" component={ComingSoonScreen} />
      <Tab.Screen name="Perfil" component={ComingSoonScreen} />
    </Tab.Navigator>
  )
}
