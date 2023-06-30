import { Grid } from '@chakra-ui/react'
import type { EventPost } from '@/interfaces'
import { EventCard } from '@/components'

interface EventPreviewProps {
  events: EventPost[]
}
export const EventPreview: React.FC<EventPreviewProps> = ({ events }) => (
  <Grid templateColumns={['1fr', null, 'repeat(3, 1fr)']} gap={8}>
    {events
      .filter(
        ({ frontmatter }: EventPost) =>
          new Date(frontmatter.endDate) <
          new Date(new Date().setDate(new Date().getDate() + 1))
      )
      .map(({ frontmatter }: EventPost) => (
        <EventCard frontmatter={frontmatter} key={frontmatter.title} />
      ))}
  </Grid>
)
