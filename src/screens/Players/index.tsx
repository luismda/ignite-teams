import { useState } from 'react'
import { FlatList, Alert } from 'react-native'
import { useRoute } from '@react-navigation/native'

import { Container, Form, ListHeader, NumberOfPlayers } from './styles'

import { playerAddByGroup } from '@storage/players/playerAddByGroup'
import { PlayerStorageDTO } from '@storage/players/PlayerStorageDTO'

import { Input } from '@components/Input'
import { Header } from '@components/Header'
import { Filter } from '@components/Filter'
import { Button } from '@components/Button'
import { Highlight } from '@components/Highlight'
import { EmptyList } from '@components/EmptyList'
import { ButtonIcon } from '@components/ButtonIcon'
import { PlayerCard } from '@components/PlayerCard'
import { AppError } from '@utils/AppError'

const teams = ['Time A', 'Time B'] as const

type ActiveTeam = (typeof teams)[number]

type RouteParams = {
  group: string
}

export function Players() {
  const [activeTeam, setActiveTeam] = useState<ActiveTeam>('Time A')
  const [newPlayerName, setNewPlayerName] = useState('')
  const [players, setPlayers] = useState<string[]>([])

  const route = useRoute()
  const { group } = route.params as RouteParams

  async function handleAddNewPlayer() {
    if (newPlayerName.trim().length === 0) {
      return Alert.alert(
        'Novo player',
        'Informe o nome da pessoa para adicionar.',
      )
    }

    const newPlayer: PlayerStorageDTO = {
      name: newPlayerName,
      team: activeTeam,
    }

    try {
      await playerAddByGroup(newPlayer, group)

      setNewPlayerName('')
    } catch (error) {
      if (error instanceof AppError) {
        return Alert.alert('Novo player', error.message)
      }

      Alert.alert(
        'Novo player',
        'Ocorreu um erro ao adicionar a pessoa. Tente novamente.',
      )
    }
  }

  return (
    <Container>
      <Header isShouldBeBackButtonVisible />

      <Highlight title={group} subtitle="adicione a galera e separe os times" />

      <Form>
        <Input
          placeholder="Nome do participante"
          autoCorrect={false}
          value={newPlayerName}
          onChangeText={setNewPlayerName}
        />

        <ButtonIcon icon="add" onPress={handleAddNewPlayer} />
      </Form>

      <ListHeader>
        <FlatList
          data={teams}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <Filter
              title={item}
              isActive={item === activeTeam}
              onPress={() => setActiveTeam(item)}
            />
          )}
          contentContainerStyle={{ gap: 8 }}
          horizontal
        />

        <NumberOfPlayers>{players.length}</NumberOfPlayers>
      </ListHeader>

      <FlatList
        data={players}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <PlayerCard name={item} onRemove={() => {}} />
        )}
        ListEmptyComponent={() => (
          <EmptyList message="Não há pessoas nesse time." />
        )}
        contentContainerStyle={[
          { paddingBottom: 100 },
          players.length === 0 && { flex: 1 },
        ]}
        showsVerticalScrollIndicator={false}
      />

      <Button title="Remover turma" type="SECONDARY" />
    </Container>
  )
}
