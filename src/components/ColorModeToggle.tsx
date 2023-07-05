import { IconButton, useColorMode } from '@chakra-ui/react'
import { SunIcon, MoonIcon } from '@chakra-ui/icons'

export const ColorModeToggle: React.FC = () => {
  const { colorMode, toggleColorMode } = useColorMode()
  const isDarkMode = colorMode === 'dark'
  return (
    <IconButton
      aria-label="Toggle light/dark"
      icon={isDarkMode ? <SunIcon /> : <MoonIcon />}
      onClick={toggleColorMode}
      variant="ghost"
      size="md"
      color="text"
      borderRadius="none"
      _hover={{ bg: 'none', color: 'primary' }}
      sx={{
        '&:focus-visible': {
          outline: '2px solid var(--chakra-colors-primary)',
          outlineOffset: '-6px',
        },
      }}
      _focusVisible={{}}
    />
  )
}
