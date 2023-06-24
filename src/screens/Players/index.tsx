import { useState, useEffect, useRef, useCallback } from 'react'
import { FlatList, Alert, TextInput } from 'react-native'
import { useRoute, useNavigation } from '@react-navigation/native'

import { Container, Form, ListHeader, NumberOfPlayers } from './styles'

import { AppError } from '@utils/AppError'

import { playerAddByGroup } from '@storage/players/playerAddByGroup'
import { PlayerStorageDTO } from '@storage/players/PlayerStorageDTO'
import { groupRemoveByName } from '@storage/groups/groupRemoveByName'
import { playerRemoveByGroup } from '@storage/players/playerRemoveByGroup'
import { playersGetByGroupAndTeam } from '@storage/players/playersGetByGroupAndTeam'

import { Input } from '@components/Input'
import { Header } from '@components/Header'
import { Filter } from '@components/Filter'
import { Button } from '@components/Button'
import { Loading } from '@components/Loading'
import { Highlight } from '@components/Highlight'
import { EmptyList } from '@components/EmptyList'
import { ButtonIcon } from '@components/ButtonIcon'
import { PlayerCard } from '@components/PlayerCard'

const teams = ['Time A', 'Time B'] as const

type ActiveTeam = (typeof teams)[number]

type RouteParams = {
  group: string
}

export function Players() {
  const [isLoading, setIsLoading] = useState(true)
  const [activeTeam, setActiveTeam] = useState<ActiveTeam>('Time A')
  const [newPlayerName, setNewPlayerName] = useState('')
  const [players, setPlayers] = useState<PlayerStorageDTO[]>([])

  const newPlayerNameInputRef = useRef<TextInput>(null)

  const navigation = useNavigation()
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
      newPlayerNameInputRef.current?.blur()

      fetchPlayersByTeam()
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

  async function handleRemovePlayer(playerName: string) {
    try {
      await playerRemoveByGroup(playerName, group)

      fetchPlayersByTeam()
    } catch (error) {
      Alert.alert('Remover player', 'Ocorreu um erro ao remover o player.')
    }
  }

  function handleRemoveGroup() {
    Alert.alert(
      'Remover turma',
      'Você realmente quer remover essa turma? Todos os players serão perdidos.',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Quero remover',
          onPress: () => removeGroup(),
        },
      ],
    )
  }

  async function removeGroup() {
    try {
      await groupRemoveByName(group)

      navigation.navigate('groups')
    } catch (error) {
      Alert.alert('Remover turma', 'Ocorreu um erro ao remover a turma.')
    }
  }

  const fetchPlayersByTeam = useCallback(async () => {
    setIsLoading(true)

    try {
      const playersByTeam = await playersGetByGroupAndTeam(group, activeTeam)
      setPlayers(playersByTeam)
    } catch (error) {
      Alert.alert(
        'Players',
        'Ocorreu um erro ao carregar os players desse time.',
      )
    } finally {
      setIsLoading(false)
    }
  }, [group, activeTeam])

  useEffect(() => {
    fetchPlayersByTeam()
  }, [activeTeam, fetchPlayersByTeam])

  return (
    <Container>
      <Header isShouldBeBackButtonVisible />

      <Highlight title={group} subtitle="adicione a galera e separe os times" />

      <Form>
        <Input
          inputRef={newPlayerNameInputRef}
          placeholder="Nome do participante"
          autoCorrect={false}
          value={newPlayerName}
          returnKeyType="done"
          onChangeText={setNewPlayerName}
          onSubmitEditing={handleAddNewPlayer}
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

      {isLoading ? (
        <Loading />
      ) : (
        <FlatList
          data={players}
          keyExtractor={(item) => item.name}
          renderItem={({ item }) => (
            <PlayerCard
              name={item.name}
              onRemove={() => handleRemovePlayer(item.name)}
            />
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
      )}

      <Button
        title="Remover turma"
        type="SECONDARY"
        onPress={handleRemoveGroup}
      />
    </Container>
  )
}
