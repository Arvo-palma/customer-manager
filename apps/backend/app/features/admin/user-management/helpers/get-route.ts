import User from 'app/models/user-model'
import { distanceCalculator } from './distance-calculator'

export const getRoute = (origin: { x: number; y: number }, userList: User[]): User[] => {
  const distanceList = userList.map((user, index) => ({
    index,
    distance: distanceCalculator(origin.x, origin.y, user.coordX, user.coordY),
  }))

  const sortedDistanceList = distanceList.sort((a, b) => a.distance - b.distance)
  const userListSortedByDistance = sortedDistanceList.map((dist) => userList[dist.index])

  return userListSortedByDistance
}
