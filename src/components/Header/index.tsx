import { Container, Logo, BackButton, BackIcon } from './styles'

import logoImg from '@assets/logo.png'

interface HeaderProps {
  isShouldBeBackButtonVisible?: boolean
}

export function Header({ isShouldBeBackButtonVisible = false }: HeaderProps) {
  return (
    <Container>
      {isShouldBeBackButtonVisible && (
        <BackButton>
          <BackIcon />
        </BackButton>
      )}

      <Logo source={logoImg} />
    </Container>
  )
}
