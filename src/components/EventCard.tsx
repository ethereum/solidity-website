import { Box, Flex, Image, Text } from '@chakra-ui/react'
import type { FlexProps } from '@chakra-ui/react'
import { ButtonLink } from '@/components'
import type { Event } from '../../types'

interface EventCardProps extends FlexProps {
  event: Event
}
export const EventCard: React.FC<EventCardProps> = ({ event, ...props }) => {
  const { title, location, date, content, links, imageSrc } = event
  return (
    <Flex direction="column" maxW="container.sm" bg="gray.200" {...props}>
      <Image
        src={imageSrc ? imageSrc : '/assets/default-event-image.png'}
        h="200"
        w="full"
        objectFit="cover"
        alt="Solidity event image"
      />
      <Flex direction="column" px={6} py={8} gap={2} bg="gray.200">
        <Text fontSize="2xl">{title}</Text>
        <Text fontSize="md">{location}</Text>
        <Text fontSize="md" color="gray.400">
          {date}
        </Text>
        {content && (
          <Flex direction="column" gap={2}>
            {typeof content === 'string' ? <Text>{content}</Text> : content}
          </Flex>
        )}
        <Flex direction={['column', null, 'row']} gap={6} mt={4}>
          {links &&
            links.map(({ href, label }) => (
              <ButtonLink href={href} key={href} w="fit-content">
                {label}
              </ButtonLink>
            ))}
        </Flex>
      </Flex>
    </Flex>
  )
}
