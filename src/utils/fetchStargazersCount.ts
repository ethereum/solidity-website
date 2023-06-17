import { SOLIDITY_REPO_STARGAZERS_URL } from '../constants'

export const fetchStargazersCount = async () => {
  const headers = new Headers({
    Authorization: 'Token ' + process.env.GITHUB_TOKEN_READ_ONLY,
  })
  try {
    const endpoint = new URL(SOLIDITY_REPO_STARGAZERS_URL)
    const response = await fetch(endpoint, { headers })
    if (response.status !== 200)
      throw new Error('Failed to fetch stargazer count')
    const { stargazers_count } = await response.json()
    return { stargazersCount: stargazers_count as number }
  } catch (error) {
    console.error(error)
    return { stargazersCount: 0 }
  }
}
