import { useState } from 'react'
import { FlatList } from 'react-native'

import { Container, Form, ListHeader, NumberOfPlayers } from './styles'

import { Input } from '@components/Input'
import { Header } from '@components/Header'
import { Filter } from '@components/Filter'
import { Button } from '@components/Button'
import { Highlight } from '@components/Highlight'
import { EmptyList } from '@components/EmptyList'
import { ButtonIcon } from '@components/ButtonIcon'
import { PlayerCard } from '@components/PlayerCard'

const teams = ['Time A', 'Time B'] as const

type ActiveTeam = (typeof teams)[number]

export function Players() {
  const [activeTeam, setActiveTeam] = useState<ActiveTeam>('Time A')
  const [players, setPlayers] = useState<string[]>([])

  return (
    <Container>
      <Header isShouldBeBackButtonVisible />

      <Highlight
        title="Nome da turma"
        subtitle="adicione a galera e separe os times"
      />

      <Form>
        <Input placeholder="Nome do participante" autoCorrect={false} />

        <ButtonIcon icon="add" />
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
