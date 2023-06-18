import {
  Box,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerOverlay,
  Flex,
  IconButton,
  useDisclosure,
} from '@chakra-ui/react'
import type { FlexProps } from '@chakra-ui/react'
import { HamburgerIcon } from '@chakra-ui/icons'
import { ColorModeToggle, Link, SocialLinks, SolidityLogo } from '@/components'
import { NAV_LINKS } from '@/constants'

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
        />
      </Flex>

      <Drawer isOpen={isOpen} placement="end" size="xs" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent bg="transparent">
          <DrawerCloseButton
            top={6}
            insetEnd="6"
            color="text"
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

            <SocialLinks gap={2} />
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  )
}
