import { routeMap } from '../data/siteData'

export function getRouteFromHash(hash) {
  return routeMap[hash] ?? 'inicio'
}
