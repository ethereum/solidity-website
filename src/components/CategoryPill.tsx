import { Link } from '@/components'
import { CATEGORIES_PATH_MAP } from '@/constants'
import type { Category } from '@/interfaces'
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
    whiteSpace="nowrap"
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
  category: Category
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
    <Pill category={category} mb={mb ?? 4} {...boxProps} />
  ) : (
    <Link
      href={CATEGORIES_PATH_MAP[category]}
      textDecoration="none !important"
      data-group
      mb={mb ?? 4}
      display="block"
      borderRadius="full"
    >
      <Pill category={category} {...boxProps} />
    </Link>
  )
