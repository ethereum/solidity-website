import { Grid } from '@chakra-ui/react'
import type { Event } from '@/types'
import { EventCard } from '@/components'
import { events } from '@/data'

export const EventPreview: React.FC = () => (
  <Grid templateColumns={['1fr', null, 'repeat(3, 1fr)']} gap={4}>
    {events
      .filter(
        (event: Event) =>
          new Date(event.endDate) <
          new Date(new Date().setDate(new Date().getDate() + 1))
      )
      .map((event: Event) => (
        <EventCard event={event} key={event.title} />
      ))}
  </Grid>
)