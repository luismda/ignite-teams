import { TouchableOpacityProps } from 'react-native'

import { Container, Title, ButtonStyleTypeProps } from './styles'

interface ButtonProps extends TouchableOpacityProps {
  title: string
  type?: ButtonStyleTypeProps
}

export function Button({ title, type = 'PRIMARY', ...rest }: ButtonProps) {
  return (
    <Container type={type} {...rest}>
      <Title>{title}</Title>
    </Container>
  )
}
