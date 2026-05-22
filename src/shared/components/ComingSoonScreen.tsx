import React from 'react'
import styled from 'styled-components/native'

const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background};
  align-items: center;
  justify-content: center;
`

const Message = styled.Text`
  color: ${({ theme }) => theme.colors.textMuted};
  font-family: ${({ theme }) => theme.typography.fontRegular};
  font-size: ${({ theme }) => theme.typography.size.lg}px;
`

export function ComingSoonScreen() {
  return (
    <Container>
      <Message>Em breve</Message>
    </Container>
  )
}
