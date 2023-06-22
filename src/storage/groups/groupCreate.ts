import AsyncStorage from '@react-native-async-storage/async-storage'

import { StorageKey } from '@storage/storageConfig'
import { groupGetAll } from './groupGetAll'
import { AppError } from '@utils/AppError'

export async function groupCreate(newGroup: string) {
  const storedGroups = await groupGetAll()

  const groupAlreadyExists = storedGroups.includes(newGroup)

  if (groupAlreadyExists) {
    throw new AppError('Já existe uma turma cadastrada com esse nome.')
  }

  const storage = JSON.stringify([...storedGroups, newGroup])
  await AsyncStorage.setItem(StorageKey.GROUP_COLLECTION, storage)
}
