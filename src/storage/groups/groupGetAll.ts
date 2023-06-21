import AsyncStorage from '@react-native-async-storage/async-storage'

import { StorageKey } from '@storage/storageConfig'

export async function groupGetAll() {
  try {
    const storage = await AsyncStorage.getItem(StorageKey.GROUP_COLLECTION)

    const groups: string[] = storage ? JSON.parse(storage) : []

    return groups
  } catch (error) {
    console.error(error)

    throw error
  }
}
