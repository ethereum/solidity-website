import { Flex, Grid, Icon, Text } from '@chakra-ui/react'
import type { FlexProps } from '@chakra-ui/react'
import type { UseCase } from '@/interfaces'
import { ButtonLink, Triangles } from '@/components'
import { MdPlayArrow } from 'react-icons/md'

interface UseCaseCardProps extends FlexProps {
  useCase: UseCase
  index: number
}
export const UseCaseCard: React.FC<UseCaseCardProps> = ({
  useCase,
  ...props
}) => {
  const {
    title,
    description,
    imageSrc,
    learnMoreLink,
    exampleLink,
    triangleVariant,
  } = useCase
  return (
    <Flex
      direction="column"
      bgImg="url(/assets/about-bg.svg)"
      bgRepeat="no-repeat"
      bgPosition="top center"
      {...props}
    >
      <Grid placeItems="center" p={4}>
        <Triangles variant={triangleVariant} />
      </Grid>
      <Flex direction="column" gap={2}>
        <Text textStyle="h2-mono" my={12}>
          {title}
        </Text>
        <Text>{description}</Text>
        {learnMoreLink && (
          <ButtonLink href={learnMoreLink} mx="auto" variant="outline">
            <Icon as={MdPlayArrow} me={2} />
            Learn more
          </ButtonLink>
        )}
      </Flex>
    </Flex>
  )
}
