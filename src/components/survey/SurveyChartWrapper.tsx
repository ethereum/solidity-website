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
  yoyNote?: string
  quotes?: string[]
  conditionalNote?: string
  footer?: React.ReactNode
  children: React.ReactNode
}

export const SurveyChartWrapper: React.FC<SurveyChartWrapperProps> = ({
  title,
  nValue,
  description,
  height = 400,
  multipleChoice,
  yoyNote,
  quotes,
  conditionalNote,
  footer,
  children,
}) => {
  const cardBg = useColorModeValue('white', '#1a1560')
  const borderColor = useColorModeValue('#E6E3EC', '#3D35A0')
  const nColor = useColorModeValue('#672AC8', '#9F94E8')
  const calloutBg = useColorModeValue('#EDE9F8', 'rgba(61, 53, 160, 0.3)')
  const calloutBorder = useColorModeValue('#9F94E8', '#3D35A0')
  const quoteBg = useColorModeValue('#FAF8FF', 'rgba(26, 21, 96, 0.5)')

  return (
    <Box
      bg={cardBg}
      border="1px solid"
      borderColor={borderColor}
      borderRadius="lg"
      p={{ base: 4, md: 6 }}
      mb={12}
    >
      <Heading as="h3" size="md" mb={4} fontFamily="heading">
        {renderWithCode(title)}
      </Heading>
      <Box height={`${height}px`}>{children}</Box>
      <Text fontSize="sm" color={nColor} mt={3}>
        {nValue}
        {multipleChoice && ' | multiple choice'}
        {conditionalNote && ` | ${conditionalNote}`}
      </Text>
      {description && (
        <Text fontSize="sm" mt={2} lineHeight="1.6">
          {description}
        </Text>
      )}
      {yoyNote && (
        <Box
          bg={calloutBg}
          borderLeft="3px solid"
          borderColor={calloutBorder}
          borderRadius="0 4px 4px 0"
          px={4}
          py={3}
          mt={4}
          fontSize="sm"
          lineHeight="1.6"
        >
          <Text as="span" fontWeight="bold">
            vs. 2024:{' '}
          </Text>
          {yoyNote}
        </Box>
      )}
      {quotes && quotes.length > 0 && (
        <Box mt={4}>
          {quotes.map((quote, i) => (
            <Box
              key={i}
              bg={quoteBg}
              borderLeft="3px solid"
              borderColor={calloutBorder}
              borderRadius="0 4px 4px 0"
              px={4}
              py={3}
              mb={2}
              fontSize="sm"
              fontStyle="italic"
              lineHeight="1.6"
            >
              &ldquo;{quote}&rdquo;
            </Box>
          ))}
        </Box>
      )}
      {footer && <Box mt={4}>{footer}</Box>}
    </Box>
  )
}
