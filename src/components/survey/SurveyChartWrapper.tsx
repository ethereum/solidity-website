import { Box, Code, Heading, Text, useColorModeValue } from '@chakra-ui/react'

// Renders text with backtick-delimited segments as inline <Code>
function renderWithCode(text: string) {
  const parts = text.split(/(`[^`]+`)/)
  if (parts.length === 1) return text
  return parts.map((part, i) =>
    part.startsWith('`') && part.endsWith('`') ? (
      <Code key={i} fontSize="inherit" fontWeight="normal">
        {part.slice(1, -1)}
      </Code>
    ) : (
      part
    )
  )
}

interface SurveyChartWrapperProps {
  title: string
  nValue: string
  description?: string
  height?: number
  multipleChoice?: boolean
  children: React.ReactNode
}

export const SurveyChartWrapper: React.FC<SurveyChartWrapperProps> = ({
  title,
  nValue,
  description,
  height = 400,
  multipleChoice,
  children,
}) => {
  const cardBg = useColorModeValue('white', '#1a1560')
  const borderColor = useColorModeValue('#E6E3EC', '#3D35A0')
  const nColor = useColorModeValue('#672AC8', '#9F94E8')

  return (
    <Box
      bg={cardBg}
      border="1px solid"
      borderColor={borderColor}
      borderRadius="lg"
      p={{ base: 4, md: 6 }}
      mb={8}
    >
      <Heading as="h3" size="md" mb={4} fontFamily="heading">
        {renderWithCode(title)}
      </Heading>
      <Box height={`${height}px`}>{children}</Box>
      <Text fontSize="sm" color={nColor} mt={3}>
        {nValue}
        {multipleChoice && ' | multiple choice'}
      </Text>
      {description && (
        <Text fontSize="sm" mt={2} lineHeight="1.6">
          {description}
        </Text>
      )}
    </Box>
  )
}
