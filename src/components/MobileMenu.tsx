import {
  Drawer,
  DrawerBody,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  IconButton,
  Image,
  useDisclosure,
  Flex,
} from '@chakra-ui/react'
import type { FlexProps } from '@chakra-ui/react'
import { HamburgerIcon } from '@chakra-ui/icons'

import { Link } from '@/components'
import { NAV_LINKS } from '@/constants'

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

      <Drawer isOpen={isOpen} placement="start" size="xs" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton color="fg" />
          <DrawerBody bg="gray.200" color="gray.900" textAlign="center">
            <Flex direction="column" mt={16} gap={6}>
              <Link href="/" aria-label="Solidity home" mx="auto" onClick={onClose}>
                <Image src="/assets/solidity-logo.svg" alt="Solidity logo" h="50px" />
              </Link>
              {NAV_LINKS.map(({ name, href }) => (
                <Link href={href} key={name} fontFamily="mono" onClick={onClose}>
                  {name}
                </Link>
              ))}
            </Flex>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  )
}
