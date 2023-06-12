import { Container, Subtitle, Title } from './styles'

interface HighLightProps {
  title: string
  subtitle: string
}

export function HighLight({ title, subtitle }: HighLightProps) {
  return (
    <Container>
      <Title>{title}</Title>

      <Subtitle>{subtitle}</Subtitle>
    </Container>
  )
}
