import styled, { css } from 'styled-components/native'
import { SafeAreaView } from 'react-native-safe-area-context'

export const Container = styled(SafeAreaView)`
  flex: 1;
  padding: 24px;

  background-color: ${({ theme }) => theme.COLORS.GRAY_600};
`

export const Form = styled.View`
  width: 100%;
  flex-direction: row;
  align-items: center;
  gap: 12px;

  border-radius: 6px;

  background-color: ${({ theme }) => theme.COLORS.GRAY_700};
`

export const ListHeader = styled.View`
  width: 100%;

  flex-direction: row;
  align-items: center;

  margin: 32px 0 24px;
`

export const NumberOfPlayers = styled.Text`
  ${({ theme }) => css`
    font-size: ${theme.FONT_SIZE.SM}px;
    font-family: ${theme.FONT_FAMILY.BOLD};
    color: ${theme.COLORS.GRAY_200};
  `}
`
