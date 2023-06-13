import styled, { css } from 'styled-components/native'
import { TouchableOpacity } from 'react-native'

interface FilterStyleProps {
  isActive: boolean
}

export const Container = styled(TouchableOpacity)<FilterStyleProps>`
  width: 70px;
  height: 38px;

  align-items: center;
  justify-content: center;

  border-radius: 4px;

  ${({ theme, isActive }) =>
    isActive &&
    css`
      border: 1px solid ${theme.COLORS.GREEN_500};
    `}
`

export const Title = styled.Text<FilterStyleProps>`
  text-transform: uppercase;

  ${({ theme, isActive }) => css`
    font-family: ${theme.FONT_FAMILY.BOLD};
    font-size: ${theme.FONT_SIZE.SM}px;
    color: ${theme.COLORS[isActive ? 'WHITE' : 'GRAY_200']};
  `}
`
