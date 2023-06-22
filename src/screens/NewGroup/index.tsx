import { useState } from 'react'
import { Alert } from 'react-native'
import { useNavigation } from '@react-navigation/native'

import { Container, Content, Icon } from './styles'

import { groupCreate } from '@storage/groups/groupCreate'
import { AppError } from '@utils/AppError'

import { Header } from '@components/Header'
import { Highlight } from '@components/Highlight'
import { Button } from '@components/Button'
import { Input } from '@components/Input'

export function NewGroup() {
  const [groupName, setGroupName] = useState('')

  const navigation = useNavigation()

  async function handleCreateNewGroup() {
    if (groupName.trim().length === 0) {
      return Alert.alert(
        'Nova turma',
        'Informe o nome da sua turma para criar.',
      )
    }

    try {
      await groupCreate(groupName)

      navigation.navigate('players', { group: groupName })
    } catch (error) {
      if (error instanceof AppError) {
        return Alert.alert('Nova turma', error.message)
      }

      Alert.alert('Nova turma', 'Ocorreu um erro ao criar a turma.')
      console.log(error)
    }
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

        <Input placeholder="Nome da turma" onChangeText={setGroupName} />

        <Button
          title="Criar"
          style={{ marginTop: 20 }}
          onPress={handleCreateNewGroup}
        />
      </Content>
    </Container>
  )
}
