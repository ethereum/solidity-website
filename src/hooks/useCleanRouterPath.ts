import { useRouter } from 'next/router'

export const useCleanRouterPath = () => {
  const router = useRouter()

  const queryIndex = router.asPath.includes('?')
    ? router.asPath.indexOf('?')
    : router.asPath.indexOf('#')
  const hasParams = queryIndex > -1

  return router.asPath.slice(0, hasParams ? queryIndex : undefined)
}
