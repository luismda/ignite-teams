import { playersGetByGroup } from './playersGetByGroup'

export async function playersGetByGroupAndTeam(group: string, team: string) {
  const storedPlayers = await playersGetByGroup(group)

  const players = storedPlayers.filter((player) => player.team === team)

  return players
}
