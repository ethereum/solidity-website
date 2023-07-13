import { Grid, type GridProps, Text, Divider } from '@chakra-ui/react'
import { Link } from '@/components'

export const ContributingCards: React.FC<GridProps> = (props) => {
  const getGridColumn = (i: number) => ({
    base: `1 / 2`,
    md: `${(i % 2) + 1} / ${(i % 2) + 2}`,
    lg: `${(i % 4) + 1} / ${(i % 4) + 2}`,
  })
  const getGridRow = (i: number, n: number) => ({
    base: 'auto',
    md: `${Math.floor(i / 2) * 3 + n}`,
    lg: `${Math.floor(i / 4) * 3 + n}`,
  })
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
      <Text
        textStyle="h6-mono"
        color="secondary"
        gridColumn={getGridColumn(0)}
        gridRow={getGridRow(0, 1)}
        alignSelf="end"
      >
        Reporting issues and vulnerabilities
      </Text>
      <Divider
        borderColor="highlight"
        gridColumn={getGridColumn(0)}
        gridRow={getGridRow(0, 2)}
      />
      <Text
        gridColumn={getGridColumn(0)}
        gridRow={getGridRow(0, 3)}
        mt={4}
        mb={{ base: '12 !important', lg: '4 !important' }}
        sx={{
          '&:last-of-type': {
            mb: '0 !important',
          },
        }}
      >
        To report an issue, please use the{' '}
        <Link href="https://github.com/ethereum/solidity/issues/new?assignees=&labels=bug+%3Abug%3A&projects=&template=bug_report.md&title=">
          GitHub issues tracker
        </Link>
        . To report a vulnerability, please check out the instructions in the{' '}
        <Link href="https://github.com/ethereum/solidity/blob/develop/SECURITY.md#reporting-a-vulnerability">
          SECURITY.md
        </Link>
        .
      </Text>

      <Text
        textStyle="h6-mono"
        color="secondary"
        gridColumn={getGridColumn(1)}
        gridRow={getGridRow(1, 1)}
        alignSelf="end"
      >
        Translating the documentation
      </Text>
      <Divider
        borderColor="highlight"
        gridColumn={getGridColumn(1)}
        gridRow={getGridRow(1, 2)}
      />
      <Text
        gridColumn={getGridColumn(1)}
        gridRow={getGridRow(1, 3)}
        mt={4}
        mb={{ base: '12 !important', lg: '4 !important' }}
        sx={{
          '&:last-of-type': {
            mb: '0 !important',
          },
        }}
      >
        Translations help developers from all corners of the world to be able to
        read the documentation and learn Solidity.
      </Text>

      <Text
        textStyle="h6-mono"
        color="secondary"
        gridColumn={getGridColumn(2)}
        gridRow={getGridRow(2, 1)}
        alignSelf="end"
      >
        Fixing and responding to issues
      </Text>
      <Divider
        borderColor="highlight"
        gridColumn={getGridColumn(2)}
        gridRow={getGridRow(2, 2)}
      />
      <Text
        gridColumn={getGridColumn(2)}
        gridRow={getGridRow(2, 3)}
        mt={4}
        mb={{ base: '12 !important', lg: '4 !important' }}
        sx={{
          '&:last-of-type': {
            mb: '0 !important',
          },
        }}
      >
        Fixing and responding to issues, especially those tagged as “good first
        issue”, is a great way to get started for external contributors.
      </Text>

      <Text
        textStyle="h6-mono"
        color="secondary"
        gridColumn={getGridColumn(3)}
        gridRow={getGridRow(3, 1)}
        alignSelf="end"
      >
        Contributing to language design
      </Text>
      <Divider
        borderColor="highlight"
        gridColumn={getGridColumn(3)}
        gridRow={getGridRow(3, 2)}
      />
      <Text
        gridColumn={getGridColumn(3)}
        gridRow={getGridRow(3, 3)}
        mt={4}
        mb={{ base: '12 !important', lg: '4 !important' }}
        sx={{
          '&:last-of-type': {
            mb: '0 !important',
          },
        }}
      >
        We welcome Solidity power users, auditors, security experts and tooling
        developers to get involved in the Solidity language design process. Join
        the <Link href="https://forum.soliditylang.org/">Solidity forum</Link>,
        where existing properties of the language and proposals for new language
        features can be discussed.
      </Text>
    </Grid>
  )
}
