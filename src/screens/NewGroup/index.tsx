import { useNavigation } from '@react-navigation/native'

import { Container, Content, Icon } from './styles'

import { Header } from '@components/Header'
import { Highlight } from '@components/Highlight'
import { Button } from '@components/Button'
import { Input } from '@components/Input'

export function NewGroup() {
  const navigation = useNavigation()

  function handleCreateNewGroup() {
    navigation.navigate('players', { group: '' })
  }

  return (
    <Container>
      <Header isShouldBeBackButtonVisible />

      <Content>
        <Icon />

        <Highlight
          title="Nova Turma"
          subtitle="crie uma turma para adicionar pessoas"
        />

        <Input placeholder="Nome da turma" />

        <Button
          title="Criar"
          style={{ marginTop: 20 }}
          onPress={handleCreateNewGroup}
        />
      </Content>
    </Container>
  )
}
