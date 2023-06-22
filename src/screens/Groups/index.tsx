import { useState, useCallback } from 'react'
import { FlatList, Alert } from 'react-native'
import { useNavigation, useFocusEffect } from '@react-navigation/native'

import { Container } from './styles'

import { groupGetAll } from '@storage/groups/groupGetAll'

import { Header } from '@components/Header'
import { Highlight } from '@components/Highlight'
import { GroupCard } from '@components/GroupCard'
import { EmptyList } from '@components/EmptyList'
import { Button } from '@components/Button'

export function Groups() {
  const [groups, setGroups] = useState<string[]>([])

  const navigation = useNavigation()

  function handleNavigateToScreenNewGroup() {
    navigation.navigate('new')
  }

  function handleOpenGroup(group: string) {
    navigation.navigate('players', { group })
  }

  async function fetchGroups() {
    try {
      const groups = await groupGetAll()

      setGroups(groups)
    } catch (error) {
      Alert.alert('Ver turmas', 'Não foi possível carregar suas turmas.')
      console.log(error)
    }
  }

  useFocusEffect(
    useCallback(() => {
      fetchGroups()
    }, []),
  )

  return (
    <Container>
      <Header />

      <Highlight title="Turmas" subtitle="jogue com a sua turma" />

      <FlatList
        data={groups}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <GroupCard title={item} onPress={() => handleOpenGroup(item)} />
        )}
        contentContainerStyle={[
          { paddingBottom: 100 },
          groups.length === 0 && { flex: 1 },
        ]}
        ListEmptyComponent={() => (
          <EmptyList message="Que tal criar a sua primeira turma?" />
        )}
        showsVerticalScrollIndicator={false}
      />

      <Button
        title="Criar nova turma"
        onPress={handleNavigateToScreenNewGroup}
      />
    </Container>
  )
}
