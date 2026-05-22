import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Ionicons } from '@expo/vector-icons'
import { TabParamList } from './types'
import { CouponsStack } from './CouponsStack'
import { ComingSoonScreen } from '../shared/components/ComingSoonScreen'
import { theme } from '../shared/theme'

const Tab = createBottomTabNavigator<TabParamList>()

export function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: {
          backgroundColor: theme.colors.background,
          borderTopColor: theme.colors.cardBorder,
        },
        tabBarActiveTintColor: theme.colors.accent,
        tabBarInactiveTintColor: theme.colors.textMuted,
        tabBarLabelStyle: {
          fontFamily: theme.typography.fontInter,
          fontSize: theme.typography.size.sm,
        },
        tabBarIcon: ({ color, size }) => {
          const icons: Record<string, keyof typeof Ionicons.glyphMap> = {
            Home: 'home-outline',
            Cupons: 'ticket-outline',
            Favoritos: 'heart-outline',
            Perfil: 'person-outline',
          }
          return <Ionicons name={icons[route.name] ?? 'ellipse-outline'} size={size} color={color} />
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
