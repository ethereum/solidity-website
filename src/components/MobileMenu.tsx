import {
  Box,
  createIcon,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerOverlay,
  Flex,
  IconButton,
  Spacer,
  useDisclosure,
} from '@chakra-ui/react'
import type { FlexProps } from '@chakra-ui/react'
import { HamburgerIcon } from '@chakra-ui/icons'
import { ColorModeToggle, Link, SocialLinks, SolidityLogo } from '@/components'
import { NAV_LINKS } from '@/constants'

const CloseIcon = createIcon({
  displayName: 'CloseIcon',
  viewBox: '0 0 24 24',
  defaultProps: {
    width: '24px',
    height: '24px',
    stroke: 'currentColor',
  },
  path: [
    <path key="1" d="M23 1L1 23" strokeLinecap="round" />,
    <path key="2" d="M1 1L23 23" strokeLinecap="round" />,
  ],
})

export const MobileMenu: React.FC<FlexProps> = (props) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  return (
    <>
      <Flex as="nav" {...props} gap={2}>
        <ColorModeToggle />
        <IconButton
          aria-label="Open menu"
          icon={<HamburgerIcon />}
          variant="ghost"
          size="md"
          onClick={onOpen}
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
      </Flex>

      <Drawer isOpen={isOpen} placement="end" size="xs" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent bg="transparent" maxW="280px">
          <IconButton
            aria-label="Close menu"
            icon={<CloseIcon />}
            onClick={onClose}
            position="absolute"
            top={3}
            insetEnd={8}
            zIndex="9999"
            variant="ghost"
            size="lg"
            borderRadius="none"
            _hover={{ bg: 'none', color: 'primary' }}
            transition="none"
          />
          <DrawerBody
            display="flex"
            flexDirection="column"
            color="text"
            textAlign="center"
            px={5}
            pb={8}
            bg="transparent"
            position="relative"
            backdropFilter="blur(3px)"
            fontSize="lg"
          >
            <Box
              position="absolute"
              inset={0}
              bg="bg"
              opacity="0.9"
              zIndex={-1}
            />
            <Link
              href="/"
              aria-label="Solidity home"
              onClick={onClose}
              my={3}
              display="block"
            >
              <SolidityLogo h="40px" w="calc(40px * 10/16)" />
            </Link>
            <Flex direction="column" my={6} gap={4}>
              {NAV_LINKS.map(({ name, href }) => (
                <Link
                  href={href}
                  key={name}
                  fontFamily="mono"
                  onClick={onClose}
                  textDecoration="none"
                >
                  {name}
                </Link>
              ))}
            </Flex>

            <Spacer />

            <SocialLinks direction={{ base: 'column', md: 'row' }} gap={0} />
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  )
}
