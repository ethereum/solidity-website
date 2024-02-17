import {
  Table as ChakraTable,
  TableContainer,
  type ThemingProps,
} from '@chakra-ui/react'

export const Table = ({ variant, ...props }: ThemingProps<'Table'>) => (
  <TableContainer whiteSpace="normal" mb="4">
    <ChakraTable variant={variant} {...props} />
  </TableContainer>
)
