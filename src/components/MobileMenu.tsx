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
} from '@chakra-ui/react'
import type { FlexProps } from '@chakra-ui/react'
import { HamburgerIcon } from '@chakra-ui/icons'

import { Link } from '@/components'
import { NAV_LINKS, SOCIAL_LINKS } from '@/constants'

export const MobileMenu: React.FC<FlexProps> = (props) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  return (
    <>
      <Flex as="nav" {...props}>
        <IconButton
          aria-label="Open menu"
          icon={<HamburgerIcon transform="scale(1.5)" />}
          variant="ghost"
          size="lg"
          onClick={onOpen}
          color="fg"
        />
      </Flex>

      <Drawer isOpen={isOpen} placement="end" size="xs" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent bg="transparent">
          <DrawerCloseButton top={6} insetEnd="6" color="fg" transform="scale(1.5)" zIndex="9999" />
          <DrawerBody
            display="flex"
            flexDirection="column"
            justifyContent="space-between"
            color="fg"
            textAlign="center"
            pb={8}
            bg="whiteAlpha.800"
            backdropFilter="blur(3px)"
          >
            <Flex direction="column" my={6} gap={6} alignItems="center">
              <Link
                href="/"
                aria-label="Solidity home"
                onClick={onClose}
                my={6}
              >
                <Image
                  src="/assets/solidity-logo.svg"
                  alt="Solidity logo"
                  h="50px"
                />
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
                    color="fg"
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
