import AsyncStorage from '@react-native-async-storage/async-storage'

import { StorageKey } from '@storage/storageConfig'
import { playersGetByGroup } from './playersGetByGroup'

export async function playerRemoveByGroup(playerName: string, group: string) {
  const storedPlayers = await playersGetByGroup(group)

  const playersWithoutOnePlayer = storedPlayers.filter(
    (player) => player.name !== playerName,
  )
  const players = JSON.stringify(playersWithoutOnePlayer)

  await AsyncStorage.setItem(
    `${StorageKey.PLAYER_COLLECTION}-${group}`,
    players,
  )
}
