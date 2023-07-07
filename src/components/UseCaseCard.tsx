import {
  Box,
  Flex,
  Grid,
  Icon,
  Text,
  useBreakpointValue,
} from '@chakra-ui/react'
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
    mobileTriangleVariant,
  } = useCase
  const variant = useBreakpointValue({
    base: mobileTriangleVariant ?? triangleVariant,
    md: triangleVariant,
  })
  return (
    <Flex
      direction="column"
      bgImg="url(/assets/about-bg.svg)"
      bgRepeat="no-repeat"
      bgPosition="top center"
      {...props}
    >
      <Grid placeItems="center" p={4} maxW="100%" overflow="visible">
        <Triangles variant={variant as string | number} />
      </Grid>
      <Box>
        <Text textStyle="h2-mono" my={12} textAlign="center">
          {title}
        </Text>
        <Text mb={8}>{description}</Text>
        {learnMoreLink && (
          <Flex justify="center">
            <ButtonLink href={learnMoreLink} mx="auto" variant="outline">
              <Flex flexWrap="nowrap" alignItems="center" justify="center">
                <Icon as={MdPlayArrow} me={2} />
                Learn more
              </Flex>
            </ButtonLink>
          </Flex>
        )}
      </Box>
    </Flex>
  )
}
