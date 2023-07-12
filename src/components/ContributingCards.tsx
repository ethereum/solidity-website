import {
  Grid,
  type GridProps,
  Text,
  Divider,
  useBreakpointValue,
} from '@chakra-ui/react'
import { Fragment } from 'react'

interface ContributingCard {
  title: string
  description: string
}
const cards: ContributingCard[] = [
  {
    title: 'Reporting issues and vulnerabilities',
    description:
      'To report an issue, please use the GitHub issues tracker https://github.com/ethereum/solidity/issues/new?assignees=&labels=bug+%3Abug%3A&projects=&template=bug_report.md&title=. To report a vulnerability, please check out the instructions in the SECURITY.md https://github.com/ethereum/solidity/blob/develop/SECURITY.md#reporting-a-vulnerability.',
  },
  {
    title: 'Translating the documentation',
    description:
      'Translations help developers from all corners of the world to be able to read the documentation and learn Solidity.',
  },
  {
    title: 'Fixing and responding to issues',
    description:
      'Fixing and responding to issues, especially those tagged as “good first issue”, is a great way to get started for external contributors.',
  },
  {
    title: 'Contributing to language design',
    description:
      'We welcome Solidity power users, auditors, security experts and tooling developers to get involved in the Solidity language design process. >Join the <a href="https://forum.soliditylang.org/">Solidity forum</a>, where existing properties of the language and proposals for new language features can be discussed.',
  },
]
export const ContributingCards: React.FC<GridProps> = (props) => {
  return (
    <Grid
      templateColumns={{
        base: '1fr',
        md: 'repeat(2, 1fr)',
        lg: 'repeat(4, 1fr)',
      }}
      columnGap={8}
      {...props}
    >
      {cards.map(({ title, description }, i) => {
        const gridColumn = {
          base: `1 / 2`,
          md: `${(i % 2) + 1} / ${(i % 2) + 2}`,
          lg: `${(i % 4) + 1} / ${(i % 4) + 2}`,
        }
        const getGridRow = (i: number, n: number) => ({
          base: 'auto',
          md: `${Math.floor(i / 2) * 3 + n}`,
          lg: `${Math.floor(i / 4) * 3 + n}`,
        })
        return (
          <Fragment key={title}>
            <Text
              textStyle="h6-mono"
              color="secondary"
              gridColumn={gridColumn}
              gridRow={getGridRow(i, 1)}
              alignSelf="end"
            >
              {title}
            </Text>
            <Divider
              borderColor="highlight"
              gridColumn={gridColumn}
              gridRow={getGridRow(i, 2)}
            />
            <Text
              gridColumn={gridColumn}
              gridRow={getGridRow(i, 3)}
              mt={4}
              mb={{ base: '12 !important', lg: '4 !important' }}
              sx={{
                '&:last-of-type': {
                  mb: '0 !important',
                },
              }}
            >
              {description}
            </Text>
          </Fragment>
        )
      })}
    </Grid>
  )
}
