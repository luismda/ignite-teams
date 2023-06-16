import { useNavigation } from '@react-navigation/native'

import { Container, Logo, BackButton, BackIcon } from './styles'

import logoImg from '@assets/logo.png'

interface HeaderProps {
  isShouldBeBackButtonVisible?: boolean
}

export function Header({ isShouldBeBackButtonVisible = false }: HeaderProps) {
  const navigation = useNavigation()

  function handleGoBackToInitialScreen() {
    navigation.navigate('groups')
  }

  return (
    <Container>
      {isShouldBeBackButtonVisible && (
        <BackButton onPress={handleGoBackToInitialScreen}>
          <BackIcon />
        </BackButton>
      )}

      <Logo source={logoImg} />
    </Container>
  )
}
