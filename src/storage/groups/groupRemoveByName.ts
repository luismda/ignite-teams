import AsyncStorage from '@react-native-async-storage/async-storage'
import { groupGetAll } from './groupGetAll'
import { StorageKey } from '@storage/storageConfig'

export async function groupRemoveByName(groupNameToBeRemoved: string) {
  const storedGroups = await groupGetAll()

  const groupsWithoutGroupToBeRemoved = storedGroups.filter(
    (group) => group !== groupNameToBeRemoved,
  )

  const storage = JSON.stringify(groupsWithoutGroupToBeRemoved)

  await AsyncStorage.setItem(StorageKey.GROUP_COLLECTION, storage)
  await AsyncStorage.removeItem(
    `${StorageKey.PLAYER_COLLECTION}-${groupNameToBeRemoved}`,
  )
}
