import { Link } from '@/components'
import { CATEGORIES_URL_MAP } from '@/constants'
import { Box, BoxProps } from '@chakra-ui/react'

interface CategoryPillProps extends BoxProps {
  category: keyof typeof CATEGORIES_URL_MAP
  mb?: number
}

export const CategoryPill: React.FC<CategoryPillProps> = ({
  category,
  mb,
  ...boxProps
}) => (
  <Link
    href={CATEGORIES_URL_MAP[category]}
    textDecoration="none!important"
    data-group
    mb={mb ?? 2}
    display="block"
  >
    <Box
      borderRadius="full"
      px={3}
      w="fit-content"
      border="1px"
      borderColor="primary"
      color="primary"
      fontSize="xs"
      fontFamily="mono"
      fontWeight="bold"
      textTransform="uppercase"
      _groupHover={{
        bg: 'primary',
        color: 'bg',
      }}
      {...boxProps}
    >
      {category}
    </Box>
  </Link>
)
