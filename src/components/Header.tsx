import { Flex, IconButton, useColorMode } from '@chakra-ui/react'
import { Link, MobileMenu, SolidityLogo } from '@/components'
import { NAV_LINKS, NAV_HEIGHT } from '@/constants'
import { motion, useScroll, useTransform } from 'framer-motion'
import { SunIcon, MoonIcon } from '@chakra-ui/icons'

export const Header: React.FC = () => {
  const { colorMode, toggleColorMode } = useColorMode()
  const isDarkMode = colorMode === 'dark'
  const { scrollY } = useScroll()
  const motionStyles = {
    backdrop: {
      opacity: useTransform(scrollY, [250, 300], [0, 0.95]),
    },
    logo: {
      mt: useTransform(scrollY, [0, 64], [50, 0]),
      h: useTransform(scrollY, [64, 200], [175, 40]),
    },
  }
  return (
    <Flex
      px={8}
      py={4}
      justify="space-between"
      position="sticky"
      top={0}
      zIndex="sticky"
      height="272px" // Full starting height of Nav + Logo
    >
      <motion.div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'var(--chakra-colors-bg)',
          zIndex: -1,
          transition: 'background 200ms linear !important',
          backdropFilter: 'blur(3px)',
          height: `min(${NAV_HEIGHT}, 100%)`,
          boxShadow: 'var(--chakra-shadows-md)', 
          opacity: motionStyles.backdrop.opacity,
        }}
      />
      <motion.div
        style={{
          height: motionStyles.logo.h,
          marginTop: motionStyles.logo.mt,
        }}
      >
        <Link
          href="/"
          aria-label="Go home"
          display="block"
          h="100%"
          w="fit-content"
        >
          <SolidityLogo
            height="100%"
            color="text"
            preserveAspectRatio="176/113"
          />
        </Link>
      </motion.div>
      <Flex
        as="nav"
        display={['none', null, 'flex']}
        h="fit-content"
        alignItems="center"
      >
        {NAV_LINKS.map(({ name, href }) => (
          <Link
            key={name}
            href={href}
            px={2}
            py={1}
            fontFamily="mono"
            letterSpacing="-0.02em"
            textDecoration="none"
          >
            {name}
          </Link>
        ))}
        <IconButton
          aria-label="Toggle light/dark"
          icon={isDarkMode ? <SunIcon /> : <MoonIcon />}
          onClick={toggleColorMode}
          variant="ghost"
          size="md"
        />
      </Flex>
      {/* Toggle light/dark */}
      <MobileMenu display={['block', null, 'none']} />
    </Flex>
  )
}
