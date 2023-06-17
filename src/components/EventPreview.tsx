import { Grid } from '@chakra-ui/react'
import type { Event } from '@/types'
import { EventCard } from '@/components'

const events: Event[] = [
  {
    title: 'Solidity Summit 2020',
    location: 'Remote',
    startDate: 'April 29, 2020',
    endDate: 'April 30, 2020',
    links: [
      {
        label: 'Event Recap',
        href: 'https://blog.soliditylang.org/2020/06/09/solidity-summit-recap/',
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
    startDate: 'Wed, April 20, 2022',
    endDate: 'Wed, April 20, 2022',
    imageSrc: '/assets/solidity-summit-2022.png',
    links: [
      {
        label: 'Event Recap',
        href: 'https://blog.soliditylang.org/2022/05/03/solidity-summit-2022-recap/',
      },
      {
        label: 'Talks',
        href: 'https://www.youtube.com/watch?v=6m5EDuCjxgk&list=PLX8x7Zj6Vezl1lqBgxiQH3TFbRNZza8Fk',
      },
    ],
  },
  {
    title: 'Underhanded Solidity Contest 2022',
    location: 'Remote',
    startDate: 'Wed, April 29, 2022',
    endDate: 'Wed, April 30, 2022',
    imageSrc: '/assets/underhanded-solidity-contest-2022.png',
    links: [
      {
        label: 'Event Recap',
        href: 'https://underhanded.soliditylang.org/',
      },
    ],
  },
]

export const EventPreview: React.FC = () => (
  <Grid templateColumns={['1fr', null, 'repeat(3, 1fr)']} gap={4}>
    {events.map((event: Event) => (
      <EventCard event={event} key={event.title} />
    ))}
  </Grid>
)
