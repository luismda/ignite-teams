import AsyncStorage from '@react-native-async-storage/async-storage'

import { StorageKey } from '@storage/storageConfig'
import { groupGetAll } from './groupGetAll'

export async function groupCreate(newGroup: string) {
  try {
    const storedGroups = await groupGetAll()

    const storage = JSON.stringify([...storedGroups, newGroup])
    await AsyncStorage.setItem(StorageKey.GROUP_COLLECTION, storage)
  } catch (error) {
    console.error(error)

    throw error
  }
}
