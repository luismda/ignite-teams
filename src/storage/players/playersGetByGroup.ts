import AsyncStorage from '@react-native-async-storage/async-storage'

import { StorageKey } from '@storage/storageConfig'
import { PlayerStorageDTO } from './PlayerStorageDTO'

export async function playersGetByGroup(group: string) {
  const storedPlayers = await AsyncStorage.getItem(
    `${StorageKey.PLAYER_COLLECTION}-${group}`,
  )

  const players: PlayerStorageDTO[] = storedPlayers
    ? JSON.parse(storedPlayers)
    : []

  return players
}
