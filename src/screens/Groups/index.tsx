import { useState, useCallback } from 'react'
import { FlatList, Alert, RefreshControl } from 'react-native'
import { useNavigation, useFocusEffect } from '@react-navigation/native'

import { Container } from './styles'

import { groupGetAll } from '@storage/groups/groupGetAll'

import { Header } from '@components/Header'
import { Button } from '@components/Button'
import { Loading } from '@components/Loading'
import { Highlight } from '@components/Highlight'
import { GroupCard } from '@components/GroupCard'
import { EmptyList } from '@components/EmptyList'

export function Groups() {
  const [isLoading, setIsLoading] = useState(true)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [groups, setGroups] = useState<string[]>([])

  const navigation = useNavigation()

  function handleNavigateToScreenNewGroup() {
    navigation.navigate('new')
  }

  function handleOpenGroup(group: string) {
    navigation.navigate('players', { group })
  }

  async function handleSwipeToRefresh() {
    setIsRefreshing(true)

    await fetchGroups()

    setIsRefreshing(false)
  }

  async function fetchGroups() {
    try {
      const groups = await groupGetAll()

      setGroups(groups)
    } catch (error) {
      Alert.alert('Ver turmas', 'Não foi possível carregar suas turmas.')
    }
  }

  useFocusEffect(
    useCallback(() => {
      setIsLoading(true)

      fetchGroups()

      setIsLoading(false)
    }, []),
  )

  return (
    <Container>
      <Header />

      <Highlight title="Turmas" subtitle="jogue com a sua turma" />

      {isLoading ? (
        <Loading />
      ) : (
        <FlatList
          data={groups}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <GroupCard title={item} onPress={() => handleOpenGroup(item)} />
          )}
          refreshControl={
            <RefreshControl
              refreshing={isRefreshing}
              onRefresh={handleSwipeToRefresh}
            />
          }
          contentContainerStyle={[
            { paddingBottom: 100 },
            groups.length === 0 && { flex: 1 },
          ]}
          ListEmptyComponent={() => (
            <EmptyList message="Que tal criar a sua primeira turma?" />
          )}
          showsVerticalScrollIndicator={false}
        />
      )}

      <Button
        title="Criar nova turma"
        onPress={handleNavigateToScreenNewGroup}
      />
    </Container>
  )
}
