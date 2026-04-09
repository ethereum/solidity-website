import { useState, useMemo } from 'react'
import {
  Box,
  Input,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  useColorModeValue,
} from '@chakra-ui/react'

interface TableRow {
  value: string
  count: number
  pct: number
}

interface SurveyDataTableProps {
  data: TableRow[]
  label: string
}

export const SurveyDataTable: React.FC<SurveyDataTableProps> = ({
  data,
  label,
}) => {
  const [filter, setFilter] = useState('')
  const headerBg = useColorModeValue('#FAF8FF', '#1a1560')
  const borderColor = useColorModeValue('#E6E3EC', '#3D35A0')

  const filtered = useMemo(() => {
    if (!filter) return data
    const lower = filter.toLowerCase()
    return data.filter((row) => row.value.toLowerCase().includes(lower))
  }, [data, filter])

  return (
    <Box>
      <Input
        placeholder={`Filter by ${label}...`}
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        mb={4}
        size="sm"
        borderColor={borderColor}
      />
      <Box maxH="400px" overflowY="auto" borderRadius="md">
        <Table size="sm" variant="simple">
          <Thead position="sticky" top={0} bg={headerBg} zIndex={1}>
            <Tr>
              <Th borderColor={borderColor}>{label}</Th>
              <Th borderColor={borderColor} isNumeric>
                Count
              </Th>
              <Th borderColor={borderColor} isNumeric>
                %
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            {filtered.map((row) => (
              <Tr key={row.value}>
                <Td borderColor={borderColor}>{row.value}</Td>
                <Td borderColor={borderColor} isNumeric>
                  {row.count}
                </Td>
                <Td borderColor={borderColor} isNumeric>
                  {row.pct}%
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
    </Box>
  )
}
