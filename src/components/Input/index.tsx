import { TextInputProps } from 'react-native'
import { useTheme } from 'styled-components/native'

import { Container } from './styles'

interface InputProps extends TextInputProps {}

export function Input(props: InputProps) {
  const { COLORS } = useTheme()

  return (
    <Container
      cursorColor={COLORS.WHITE}
      placeholderTextColor={COLORS.GRAY_300}
      {...props}
    />
  )
}
