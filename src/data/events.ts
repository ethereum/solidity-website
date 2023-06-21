import type { EventFrontmatter } from '@/types'

export const events: EventFrontmatter[] = [
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
  {
    title: 'Solidity Summit 2023',
    location: 'Istanbul, Turkey',
    startDate: '2023-11-16',
    endDate: '2023-11-16',

    imageSrc: '/assets/solidity-summit-2022.png',
    links: [
      {
        label: 'Join us',
        href: 'https://summit.soliditylang.org/',
      },
    ],
  },
].sort(
  (a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime()
)
