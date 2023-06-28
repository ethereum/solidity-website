import { LATEST_SOLIDITY_RELEASE_URL } from '../constants'

export const fetchLatestVersion = async () => {
  const headers = new Headers({
    Authorization: 'Token ' + process.env.GITHUB_TOKEN_READ_ONLY,
  })
  try {
    const response = await fetch(LATEST_SOLIDITY_RELEASE_URL, { headers })
    if (response.status !== 200)
      throw new Error('Failed to fetch latest version')
    const release = await response.json()
    return { versionNumber: release.tag_name as string }
  } catch (error) {
    console.error(error)
    return { versionNumber: '' }
  }
}
