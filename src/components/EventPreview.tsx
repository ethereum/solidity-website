import { Grid } from '@chakra-ui/react'
import type { Event } from '@/types'
import { EventCard } from '@/components'

const events: Event[] = [
  {
    title: 'Solidity Summit 2020',
    location: 'Remote',
    date: 'April 29-30',
    links: [
      {
        label: 'Event Recap',
        href: 'https://blog.soliditylang.org/2020/06/09/solidity-summit-recap/',
      },
      {
        label: 'Agenda',
        href: 'https://docs.google.com/spreadsheets/d/1ylkaTYKx9TbAifCgyH2jN9SKJKrYfzab9zzTZgSL44g',
      },
      {
        label: 'Talks',
        href: 'https://www.youtube.com/watch?v=lhjo2FuU4v0&list=PLaM7G4Llrb7xlGxwlYGTy1T-GHpytE3RC',
      },
    ],
  },
  {
    title: 'Solidity Summit 2022',
    location: 'Tolhuistuin, Amsterdam',
    date: 'Wed, April 20, 2022',
    links: [
      {
        label: 'Event Recap',
        href: 'https://blog.soliditylang.org/2022/05/03/solidity-summit-2022-recap/',
      },
      {
        label: 'Agenda',
        href: 'https://summit.soliditylang.org/agenda',
      },
      {
        label: 'Talks',
        href: 'https://www.youtube.com/watch?v=6m5EDuCjxgk&list=PLX8x7Zj6Vezl1lqBgxiQH3TFbRNZza8Fk',
      },
    ],
  },
]

export const EventPreview: React.FC = () => (
  <Grid templateColumns="repeat(2, 1fr)" gap={4}>
    {events.map((event: Event) => (
      <EventCard event={event} key={event.title} />
    ))}
  </Grid>
)
