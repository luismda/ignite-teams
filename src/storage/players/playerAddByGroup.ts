import AsyncStorage from '@react-native-async-storage/async-storage'

import { AppError } from '@utils/AppError'
import { StorageKey } from '@storage/storageConfig'
import { PlayerStorageDTO } from './PlayerStorageDTO'
import { playersGetByGroup } from './playersGetByGroup'

export async function playerAddByGroup(
  newPlayer: PlayerStorageDTO,
  group: string,
) {
  const storedPlayers = await playersGetByGroup(group)

  const playerAlreadyExists = storedPlayers.some(
    (player) => player.name === newPlayer.name,
  )

  if (playerAlreadyExists) {
    throw new AppError('Esse jogador já foi adicionado em um time aqui.')
  }

  const storage = JSON.stringify([...storedPlayers, newPlayer])

  await AsyncStorage.setItem(
    `${StorageKey.PLAYER_COLLECTION}-${group}`,
    storage,
  )
}
