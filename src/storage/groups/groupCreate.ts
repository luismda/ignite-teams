import AsyncStorage from '@react-native-async-storage/async-storage'
import { StorageKey } from '@storage/storageConfig'

export async function groupCreate(newGroup: string) {
  try {
    await AsyncStorage.setItem(StorageKey.GROUP_COLLECTION, newGroup)
  } catch (error) {
    console.error(error)

    throw error
  }
}
