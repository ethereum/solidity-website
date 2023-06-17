import {
  Drawer,
  DrawerBody,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Flex,
  Grid,
  IconButton,
  Image,
  useDisclosure,
  Box,
} from '@chakra-ui/react'
import type { FlexProps } from '@chakra-ui/react'
import { HamburgerIcon, SunIcon, MoonIcon } from '@chakra-ui/icons'
import { ColorModeToggle, Link, SolidityLogo } from '@/components'
import { NAV_LINKS, SOCIAL_LINKS } from '@/constants'

export const MobileMenu: React.FC<FlexProps> = (props) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  return (
    <>
      <Flex as="nav" {...props}>
        <ColorModeToggle />
        <IconButton
          aria-label="Open menu"
          icon={<HamburgerIcon transform="scale(1.5)" />}
          variant="ghost"
          size="lg"
          onClick={onOpen}
          color="text"
        />
      </Flex>

      <Drawer isOpen={isOpen} placement="end" size="xs" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent bg="transparent">
          <DrawerCloseButton
            top={6}
            insetEnd="6"
            color="text"
            transform="scale(1.5)"
            zIndex="9999"
          />
          <DrawerBody
            display="flex"
            flexDirection="column"
            justifyContent="space-between"
            color="text"
            textAlign="center"
            pb={8}
            bg="transparent"
            position="relative"
            backdropFilter="blur(3px)"
          >
            <Box
              position="absolute"
              inset={0}
              bg="bg"
              opacity="0.9"
              zIndex={-1}
            />
            <Flex direction="column" my={6} gap={6} alignItems="center">
              <Link
                href="/"
                aria-label="Solidity home"
                onClick={onClose}
                my={6}
              >
                <SolidityLogo h="50px" />
              </Link>
              {NAV_LINKS.map(({ name, href }) => (
                <Link
                  href={href}
                  key={name}
                  fontFamily="mono"
                  onClick={onClose}
                >
                  {name}
                </Link>
              ))}
            </Flex>

            <Flex gap={2} flexWrap="wrap" justify="center">
              {SOCIAL_LINKS.map(({ href, Icon }) => (
                <Link href={href} key={href} hideArrow textDecoration="none">
                  <Grid
                    placeItems="center"
                    borderRadius="base"
                    bg="whiteAlpha.800"
                    color="text"
                    px={5}
                    py={2}
                    gap={4}
                  >
                    <Icon size={24} />
                  </Grid>
                </Link>
              ))}
            </Flex>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  )
}
