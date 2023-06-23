import { Flex, Grid, Image, Text } from '@chakra-ui/react'
import type { FlexProps } from '@chakra-ui/react'
import type { UseCase } from '@/interfaces'

interface UseCaseCardProps extends FlexProps {
  useCase: UseCase
}
export const UseCaseCard: React.FC<UseCaseCardProps> = ({
  useCase,
  ...props
}) => {
  const { title, description, imageSrc } = useCase
  return (
    <Flex direction="column" {...props}>
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
        <Text fontSize="3xl">{title}</Text>
        <Text>{description}</Text>
      </Flex>
    </Flex>
  )
}
