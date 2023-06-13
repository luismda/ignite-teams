import styled from 'styled-components/native'
import { TouchableOpacity } from 'react-native'

export type ButtonStyleTypeProps = 'PRIMARY' | 'SECONDARY'

interface ContainerProps {
  type: ButtonStyleTypeProps
}

export const Container = styled(TouchableOpacity)<ContainerProps>`
  flex: 1;

  max-height: 56px;
  min-height: 56px;

  background-color: ${({ theme, type }) =>
    type === 'PRIMARY' ? theme.COLORS.GREEN_700 : theme.COLORS.RED_DARK};

  border-radius: 6px;

  justify-content: center;
  align-items: center;
`

export const Title = styled.Text`
  font-size: ${({ theme }) => theme.FONT_SIZE.MD}px;
  font-family: ${({ theme }) => theme.FONT_FAMILY.BOLD};
  color: ${({ theme }) => theme.COLORS.GRAY_100};
`