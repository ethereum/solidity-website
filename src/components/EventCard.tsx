import { Box, Flex, Image, Text } from '@chakra-ui/react'
import type { FlexProps } from '@chakra-ui/react'
import { ButtonLink } from '@/components'
import type { EventFrontmatter } from '@/types'

interface EventCardProps extends FlexProps {
  event: EventFrontmatter
}
export const EventCard: React.FC<EventCardProps> = ({ event, ...props }) => {
  const { title, location, startDate, endDate, content, links, imageSrc } =
    event
  const start = new Date(startDate)
  const end = new Date(endDate)
  const date = `${start.toLocaleDateString()} - ${end.toLocaleDateString()}`
  return (
    <Flex direction="column" maxW="container.sm" {...props}>
      <Image
        src={imageSrc ? imageSrc : '/assets/default-event-image.png'}
        h="200"
        w="full"
        objectFit="cover"
        alt="Solidity event image"
      />
      <Flex direction="column" px={6} py={8} gap={2}>
        <Text
          fontSize="2xl"
          fontWeight="bold"
          lineHeight="125%"
          fontFamily="mono"
        >
          {title}
        </Text>
        <Box fontWeight="medium" fontSize="md">
          <Text>{location}</Text>
          <Text>{date}</Text>
        </Box>
        {content && (
          <Flex direction="column" gap={2}>
            {typeof content === 'string' ? <Text>{content}</Text> : content}
          </Flex>
        )}
        <Flex
          direction={['column', null, null, 'row']}
          gap={4}
          mt={6}
          alignItems="end"
        >
          {links &&
            links.map(({ href, label }) => (
              <ButtonLink href={href} key={href} fullWidthBelowBreakpoint="lg">
                {label}
              </ButtonLink>
            ))}
        </Flex>
      </Flex>
    </Flex>
  )
}
