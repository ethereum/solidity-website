import { Link } from '@/components'
import { CATEGORIES_URL_MAP } from '@/constants'
import { Box, BoxProps } from '@chakra-ui/react'

interface PillProps extends BoxProps {
  category: string
}
const Pill: React.FC<PillProps> = ({ category, ...boxProps }) => (
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
)

interface CategoryPillProps extends BoxProps {
  category: keyof typeof CATEGORIES_URL_MAP
  mb?: number
  skipLink?: boolean
}

export const CategoryPill: React.FC<CategoryPillProps> = ({
  category,
  mb,
  skipLink,
  ...boxProps
}) =>
  skipLink ? (
    <Pill category={category} mb={mb ?? 2} {...boxProps} />
  ) : (
    <Link
      href={CATEGORIES_URL_MAP[category]}
      textDecoration="none !important"
      data-group
      mb={mb ?? 2}
      display="block"
      borderRadius="full"
    >
      <Pill category={category} {...boxProps} />
    </Link>
  )
