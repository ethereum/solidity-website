import { useRouter } from 'next/router'

export const useCleanRouterPath = () => {
  const { asPath } = useRouter()
  return asPath
    .replace(/\?[^\#]*/, "") // Remove query string
    .replace(/\#.*/, "") // Remove hash
    .replace(/\/$/, "") // Remove trailing slash
}
