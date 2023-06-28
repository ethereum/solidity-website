import { LATEST_SOLIDITY_RELEASE_URL } from '../constants'

export const fetchLatestVersion = async () => {
  try {
    const response = await fetch(LATEST_SOLIDITY_RELEASE_URL)
    if (response.status !== 200)
      throw new Error('Failed to fetch latest version')
    const release = await response.json()
    return { versionNumber: release.tag_name as string }
  } catch (error) {
    console.error(error)
    return { versionNumber: '' }
  }
}
