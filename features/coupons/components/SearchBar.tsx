import React from 'react'
import styled, { useTheme } from 'styled-components/native'
import { Ionicons } from '@expo/vector-icons'

interface SearchBarProps {
  value: string
  onChangeText: (text: string) => void
}

const Container = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background-color: ${({ theme }) => theme.colors.background};
  border-width: 1px;
  border-color: ${({ theme }) => theme.colors.text};
  border-radius: ${({ theme }) => theme.borderRadius.lg}px;
  padding: 0 ${({ theme }) => theme.spacing.sm}px;
  height: 27px;
  align-self: stretch;
`

const InnerRow = styled.View`
  flex-direction: row;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm}px;
  flex: 1;
`

const Input = styled.TextInput`
  flex: 1;
  color: ${({ theme }) => theme.colors.text};
  font-family: ${({ theme }) => theme.typography.fontRegular};
  font-size: ${({ theme }) => theme.typography.size.xs}px;
  padding: 0;
`

export function SearchBar({ value, onChangeText }: SearchBarProps) {
  const theme = useTheme()
  return (
    <Container>
      <InnerRow>
        <Ionicons name="search" size={16} color={theme.colors.textMuted} />
        <Input
          testID="search-input"
          value={value}
          onChangeText={onChangeText}
          placeholder="Busque estabelecimentos, bairro, categoria"
          placeholderTextColor={theme.colors.textMuted}
          returnKeyType="search"
        />
      </InnerRow>
      <Ionicons name="list" size={16} color={theme.colors.textMuted} />
    </Container>
  )
}
