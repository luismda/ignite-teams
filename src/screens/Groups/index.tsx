import { useState } from 'react'
import { FlatList } from 'react-native'
import { useNavigation } from '@react-navigation/native'

import { Container } from './styles'

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

  return (
    <Container>
      <Header />

      <Highlight title="Turmas" subtitle="jogue com a sua turma" />

      <FlatList
        data={groups}
        keyExtractor={(item) => item}
        renderItem={({ item }) => <GroupCard title={item} />}
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
