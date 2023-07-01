import { Flex, Grid, Icon, Image, Text } from '@chakra-ui/react'
import type { FlexProps } from '@chakra-ui/react'
import type { UseCase } from '@/interfaces'
import { ButtonLink } from '@/components'
import { MdPlayArrow } from 'react-icons/md'
interface UseCaseCardProps extends FlexProps {
  useCase: UseCase
}
export const UseCaseCard: React.FC<UseCaseCardProps> = ({
  useCase,
  ...props
}) => {
  const { title, description, imageSrc, learnMoreLink, exampleLink } = useCase
  return (
    <Flex
      direction="column"
      bgImg="url(/assets/about-bg.svg)"
      bgRepeat="no-repeat"
      bgPosition="top center"
      {...props}
    >
      <Grid placeItems="center" p={4}>
        <Image
          src={imageSrc}
          alt={title}
          width={200}
          height={100}
          objectFit="contain"
          {...props}
        />
      </Grid>
      <Flex direction="column" gap={2}>
        <Text textStyle="h2-mono" my={12}>{title}</Text>
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
