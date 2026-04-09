import fs from 'fs'
import path from 'path'
import { Box, Flex, Heading, Text, useColorModeValue } from '@chakra-ui/react'
import dynamic from 'next/dynamic'
import type { GetStaticProps } from 'next'
import { PageMetadata, Section } from '@/components'
import { MAIN_CONTENT_ID } from '@/constants'
import { SurveyChartWrapper } from '@/components/survey/SurveyChartWrapper'
import { SurveyTableOfContents } from '@/components/survey/SurveyTableOfContents'
import { SurveyDataTable } from '@/components/survey/SurveyDataTable'

const SurveyBarChart = dynamic(
  () =>
    import('@/components/survey/SurveyBarChart').then(
      (mod) => mod.SurveyBarChart
    ),
  { ssr: false }
)

const SurveyGroupedBar = dynamic(
  () =>
    import('@/components/survey/SurveyGroupedBar').then(
      (mod) => mod.SurveyGroupedBar
    ),
  { ssr: false }
)

const SurveyHeatmap = dynamic(
  () =>
    import('@/components/survey/SurveyHeatmap').then(
      (mod) => mod.SurveyHeatmap
    ),
  { ssr: false }
)

const SurveyChoropleth = dynamic(
  () =>
    import('@/components/survey/SurveyChoropleth').then(
      (mod) => mod.SurveyChoropleth
    ),
  { ssr: false }
)

interface ChartMeta {
  n: number | Record<string, number>
}

interface ChartData {
  type: string
  data: Record<string, unknown>[]
  meta: ChartMeta
}

interface SectionChart {
  id: string
  description: string
  full_table?: string
}

interface SurveySection {
  id: string
  title: string
  intro: string
  charts: SectionChart[]
}

interface TableRow {
  value: string
  count: number
  pct: number
}

interface SurveyPageProps {
  charts: Record<string, ChartData>
  sections: SurveySection[]
  tables: Record<string, TableRow[]>
}

const CHART_TITLES: Record<string, string> = {
  // Demographics
  countries_map: 'Where do you live?',
  countries_bar: 'Top 20 countries',
  native_language: 'What is your native language?',
  age: 'How old are you?',
  coder_level: 'How would you rate your coding ability?',
  dev_profile: 'Which best describes your developer profile?',
  industry: 'Which industry do you work in?',
  years_coding: 'How many years of professional coding experience?',
  primary_language: 'What is your primary programming language?',
  favorite_language: 'What is your favorite programming language?',
  os: 'What operating system do you use?',
  // Solidity usage
  solidity_frequency: 'How often do you use Solidity?',
  years_solidity: 'How long have you been using Solidity?',
  expertise: 'How would you rate your Solidity expertise?',
  solidity_versions: 'Which Solidity versions do you use?',
  // Tooling
  binaries: 'How do you get the Solidity compiler?',
  editor: 'What editor do you use?',
  primary_framework: 'What is your primary development framework?',
  secondary_frameworks: 'Which additional frameworks do you use?',
  sdks: 'Which SDKs / libraries do you use?',
  // Compilation
  rely_older_evm: 'Do you rely on older EVM version support?',
  oldest_evm_target: 'Oldest EVM version targeted',
  smtchecker: 'Have you used the SMTChecker?',
  ir_pipeline: 'Have you used the IR pipeline (`--via-ir`)?',
  ir_too_slow: 'Is the IR pipeline too slow to compile?',
  sourcify: 'Are you familiar with Sourcify?',
  append_cbor:
    'Do you use `appendCBOR: false` or `bytecodeHash: none`?',
  // Chains
  chains: 'Which chains do you deploy to?',
  alt_languages: 'Do you use other smart contract languages?',
  // DX
  dx_change: 'How has the Solidity DX changed in the past year?',
  recurring_issues: 'Which recurring issues do you encounter?',
  language_features: 'Which language features are most important?',
  near_term_features: 'Most wanted near-term features',
  pain_points: 'Biggest pain points with Solidity',
  docs_improvement: 'How could the documentation be improved?',
  debugging_improvement: 'How could debugging be improved?',
  // Core Solidity
  core_solidity_familiar: 'Are you familiar with Core Solidity?',
  core_solidity_features:
    'Which Core Solidity features interest you most?',
  inheritance_impact:
    'Would removing inheritance cause challenges?',
  traits_rewrite_difficulty:
    'How difficult would rewriting to traits be?',
  benefit_comptime:
    'Would your codebase benefit from compile-time evaluation?',
  core_solidity_feedback: 'Feedback on Core Solidity',
  // AI
  ai_usage: 'Do you use AI tools for development?',
  ai_favorability: 'How do you view AI in development?',
  ai_trust: 'How much do you trust AI-generated code?',
  ai_workflow: 'What do you use AI for in your workflow?',
  ai_editors: 'Which editors do you use with AI agents?',
  ai_assistant: 'Preferred AI assistant',
  // Free text
  verification_pain_points: 'Contract verification pain points',
  why_append_cbor_none:
    'Why do you use `appendCBOR: false` or `bytecodeHash: none`?',
  dx_improved: 'What has improved in the DX?',
  // Cross-analysis
  expertise_vs_years_solidity:
    'Self-rated expertise by years using Solidity',
  expertise_vs_years_coding:
    'Self-rated expertise by years coding',
  expertise_vs_pain_points: 'Recurring issues by expertise level',
  framework_vs_expertise: 'Expertise distribution by framework',
  ai_usage_vs_expertise: 'AI usage by expertise level',
  ai_trust_vs_usage: 'AI trust vs. usage frequency',
  student_vs_pro_expertise: 'Expertise: students vs. professionals',
  student_vs_pro_framework: 'Framework choice: students vs. professionals',
  student_vs_pro_ai: 'AI usage: students vs. professionals',
}

function getChartTitle(chartId: string): string {
  return CHART_TITLES[chartId] || chartId.replace(/_/g, ' ')
}

const CHART_QUOTES: Record<string, string[]> = {
  verification_pain_points: [
    'Etherscan is the de-facto standard and it\'s very unreliable and not transparent. Sourcify is much better and I wish I could tell Etherscan it\'s already verified there.',
    'Too many chains, too many block explorers. Etherscan should use one source of truth i.e. Sourcify then verifying once should auto verify everywhere.',
  ],
  dx_improved: [
    'Foundry continued to ship solid features. Mainly improved tooling, not major language features that are super useful.',
    'Custom errors in requires, custom storage layouts, transient storage.',
  ],
  pain_points: [
    'Compiler\'s optimization defects continuously make me think about what\'s going on under the hood instead of focusing on my logic. Things that should be zero cost are not (functions, structs, variables).',
    'Gas optimisations force bad programming practices, like repeating code inline instead of abstracting into functions, avoiding zeroing storage slots in favour of using arbitrary sentinel values.',
    'Too many footguns around storage vs memory vs calldata, especially with complex structs, arrays, and inheritance.',
  ],
  debugging_improvement: [
    'A step-by-step debugger similar to what you\'d find in any modern IDE, with breakpoints and variable inspection for Solidity contracts.',
    'Transaction replay with full state access. Being able to see every storage slot change and every call in sequence.',
  ],
  docs_improvement: [
    'Better language reference page. Everything is explained in great detail, but it would be great with a reference page to quickly find what you need similar to: https://tour.gleam.run/everything/',
    'I think the documentation should rationalize why Solidity is the way it is more often - and how it relates to the EVM\'s design.',
  ],
  core_solidity_feedback: [
    'Excited to see this project unfold. If we can have a new language that takes all the pain points of the last 10 years of Solidity and fixes them it would be great.',
    'Be careful not to create two languages.',
    'Keeping solidity as a low level language is the best choice imho. The more abstraction you add the less control over deployed bytecode you have.',
  ],
  final_feedback: [
    'Solidity is a surprisingly good language for expressing the kinds of problems you have for EVM smart contracts. Thanks for it.',
    'Smart contracts are hard since you have to balance the quality of the code vs the cost for the user. Ideally correctly written code should also be the proper way to optimize for gas, and not the other way around.',
    'Keep pushing for better native cryptographic primitives and smoother Yul integration. It makes building privacy-focused tools and DeFi mechanisms safer and gas-efficient.',
    'It feels like the primarily direction of Solidity should be security, compiler performance, more aggressive bytecode optimization + developer ergonomics.',
    'Keep pushing, everyone. It\'s a pleasure to write smart contracts today compared to where we were 3 to 5 years ago.',
  ],
}

const QuoteBlock: React.FC<{ quotes: string[] }> = ({ quotes }) => {
  const borderColor = useColorModeValue('#9F94E8', '#3D35A0')
  const quoteBg = useColorModeValue('#FAF8FF', '#110C4E')
  return (
    <Box mb={8} mt={-4}>
      {quotes.map((quote, i) => (
        <Box
          key={i}
          bg={quoteBg}
          borderLeft="3px solid"
          borderColor={borderColor}
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
  )
}

const YOY_NOTES: Record<string, string> = {
  primary_framework:
    'Foundry increased from 51% to 57%. Hardhat is at 33% combined in both years, but the 2025 survey distinguished between v2 (15%) and v3 (18%). Truffle, at 2.4% in 2024, no longer appears.',
  os: 'In 2024, MacOS led at 43%, followed by Windows (29%) and Linux (28%). In 2025, Windows leads at 38%, followed by MacOS (31%) and Linux (30%).',
  dx_change:
    'DX sentiment is slightly more positive: 73% report improvement (vs 67% in 2024). The percentage reporting things got worse is unchanged at 2%.',
  recurring_issues:
    'In 2024, stack too deep was reported by 68%, debugging by 55%, bytecode size by 51%, and optimizer issues by 22%. In 2025, these are 47%, 33%, 33%, and 13% respectively. However, the question format changed between years (single multi-select in 2024 vs separate checkboxes in 2025), which may account for some of the decrease.',
  sourcify:
    'Sourcify awareness improved: 48% don\'t know about it in 2025 (vs 56% in 2024), and usage increased from 17% to 24%.',
  ir_pipeline:
    'IR pipeline awareness also improved: 35% don\'t know what it is in 2025 (vs 46% in 2024).',
}

const YoyCallout: React.FC<{ text: string }> = ({ text }) => {
  const bg = useColorModeValue('#EDE9F8', '#1a1560')
  const borderColor = useColorModeValue('#9F94E8', '#3D35A0')
  return (
    <Box
      bg={bg}
      borderLeft="3px solid"
      borderColor={borderColor}
      borderRadius="0 4px 4px 0"
      px={4}
      py={3}
      mb={8}
      mt={-4}
      fontSize="sm"
      lineHeight="1.6"
    >
      <Text as="span" fontWeight="bold">
        vs. 2024:{' '}
      </Text>
      {text}
    </Box>
  )
}

const MULTI_CHOICE_CHARTS = new Set([
  'ai_editors',
  'ai_workflow',
  'binaries',
  'chains',
  'core_solidity_features',
  'core_solidity_feedback',
  'docs_improvement',
  'dx_improved',
  'language_features',
  'near_term_features',
  'pain_points',
  'recurring_issues',
  'sdks',
  'secondary_frameworks',
  'solidity_versions',
  'verification_pain_points',
  'alt_languages',
])

function formatN(meta: ChartMeta): string {
  if (typeof meta.n === 'number') {
    return `n = ${meta.n}`
  }
  const entries = Object.entries(meta.n)
    .map(([k, v]) => `${k}: ${v}`)
    .join(', ')
  return `n = ${entries}`
}

function getChartHeight(chart: ChartData): number {
  const len = chart.data.length
  if (chart.type === 'choropleth') return 500
  if (chart.type === 'heatmap') return Math.max(350, len * 40 + 80)
  if (chart.type === 'grouped_bar') return Math.max(350, len * 60 + 100)
  // bar charts
  if (len <= 5) return 300
  if (len <= 10) return 350
  if (len <= 15) return Math.max(400, len * 32)
  return Math.max(500, len * 28)
}

function getBarLayout(
  chartId: string,
  chart: ChartData
): 'horizontal' | 'vertical' {
  // Charts with ordered short labels read better as vertical
  const verticalCharts = [
    'age',
    'expertise',
    'years_coding',
    'years_solidity',
    'solidity_frequency',
    'solidity_versions',
    'os',
    'dx_change',
  ]
  if (verticalCharts.includes(chartId)) return 'vertical'
  // Short yes/no charts
  if (chart.data.length <= 3) {
    const maxLen = Math.max(
      ...chart.data.map((d) => String((d as { label: string }).label).length)
    )
    if (maxLen <= 10) return 'vertical'
  }
  return 'horizontal'
}

function renderChart(
  chartId: string,
  chartData: ChartData
): React.ReactNode {
  // Data shapes are validated at build time via getStaticProps JSON
  const data = chartData.data as never[]
  const total =
    typeof chartData.meta.n === 'number' ? chartData.meta.n : undefined
  switch (chartData.type) {
    case 'bar':
      return (
        <SurveyBarChart
          data={data}
          layout={getBarLayout(chartId, chartData)}
          total={total}
        />
      )
    case 'grouped_bar': {
      const keys = Object.keys(chartData.data[0]).filter(
        (k) => k !== 'label'
      )
      return <SurveyGroupedBar data={data} keys={keys} />
    }
    case 'heatmap':
      return <SurveyHeatmap data={data} />
    case 'choropleth':
      return <SurveyChoropleth data={data} />
    default:
      return null
  }
}

export default function Survey2025({
  charts,
  sections,
  tables,
}: SurveyPageProps) {
  const tocSections = sections.map((s) => ({
    id: s.id,
    title: s.title,
  }))

  return (
    <>
      <PageMetadata
        title="Solidity Developer Survey 2025 Results"
        description="Results from the Solidity Developer Survey 2025 with 1,095 respondents from 87 countries."
      />
      <Box as="main" id={MAIN_CONTENT_ID}>
        <Section
          direction="column"
          alignItems="center"
          py={{ base: 16, md: 24 }}
          textAlign="center"
        >
          <Heading as="h1" textStyle="h2" mb={4}>
            Solidity Developer Survey 2025
          </Heading>
          <Text fontSize="lg" color="secondary" maxW="600px">
            1,095 respondents from 87 countries
          </Text>
        </Section>

        <Flex
          maxW="container.xl"
          mx="auto"
          px={{ base: 4, md: 8 }}
          pb={24}
          gap={8}
          alignItems="flex-start"
        >
          <SurveyTableOfContents sections={tocSections} />

          <Box flex={1} minW={0} maxW="container.lg">
            {sections.map((section) => (
              <Box key={section.id} id={section.id} mb={16}>
                <Heading as="h2" textStyle="h3" mb={4}>
                  {section.title}
                </Heading>

                {section.intro && (
                  <Box
                    mb={8}
                    fontSize="md"
                    lineHeight="1.7"
                    dangerouslySetInnerHTML={{ __html: section.intro }}
                    sx={{
                      '& ul': { pl: 6, mb: 4 },
                      '& li': { mb: 2 },
                      '& strong': { fontWeight: 'bold' },
                    }}
                  />
                )}

                {section.charts.length === 0 &&
                  CHART_QUOTES[section.id] && (
                    <QuoteBlock
                      quotes={CHART_QUOTES[section.id]}
                    />
                  )}

                {section.charts.map((chartRef) => {
                  const chartData = charts[chartRef.id]
                  if (!chartData) return null

                  return (
                    <Box key={chartRef.id}>
                      <SurveyChartWrapper
                        title={getChartTitle(chartRef.id)}
                        nValue={formatN(chartData.meta)}
                        description={chartRef.description}
                        height={getChartHeight(chartData)}
                        multipleChoice={MULTI_CHOICE_CHARTS.has(
                          chartRef.id
                        )}
                      >
                        {renderChart(chartRef.id, chartData)}
                      </SurveyChartWrapper>

                      {YOY_NOTES[chartRef.id] && (
                        <YoyCallout text={YOY_NOTES[chartRef.id]} />
                      )}

                      {CHART_QUOTES[chartRef.id] && (
                        <QuoteBlock
                          quotes={CHART_QUOTES[chartRef.id]}
                        />
                      )}

                      {chartRef.full_table &&
                        tables[chartRef.full_table] && (
                          <Box mb={8}>
                            <SurveyDataTable
                              data={tables[chartRef.full_table]}
                              label={
                                chartRef.full_table === 'country'
                                  ? 'Country'
                                  : 'Native Language'
                              }
                            />
                          </Box>
                        )}
                    </Box>
                  )
                })}
              </Box>
            ))}
          </Box>
        </Flex>
      </Box>
    </>
  )
}

// Move free-text follow-up charts next to their parent questions
// and remove the now-empty free-text section.
const FREETEXT_PLACEMENT: Record<string, { section: string; after: string }> =
  {
    verification_pain_points: {
      section: 'compilation',
      after: 'sourcify',
    },
    why_append_cbor_none: { section: 'compilation', after: 'append_cbor' },
    dx_improved: { section: 'dx', after: 'dx_change' },
    debugging_improvement: {
      section: 'dx',
      after: 'recurring_issues',
    },
  }

// Sections to remove from the page (content is either inlined
// into other sections or rendered differently)
const REMOVED_SECTIONS = new Set(['yoy', 'freetext'])

function reorganizeSections(
  sections: SurveySection[]
): SurveySection[] {
  // Collect free-text charts to relocate next to parent questions
  const freetextSection = sections.find((s) => s.id === 'freetext')
  const chartsToMove = new Map<string, SectionChart>()
  if (freetextSection) {
    for (const chart of freetextSection.charts) {
      if (FREETEXT_PLACEMENT[chart.id]) {
        chartsToMove.set(chart.id, chart)
      }
    }
  }

  const FINAL_FEEDBACK_SECTION: SurveySection = {
    id: 'final_feedback',
    title: 'Final Feedback Highlights',
    intro: [
      '<p>The 151 final feedback responses included the following recurring themes:</p>',
      '<strong>Feature requests:</strong>',
      '<ul>',
      '<li>Bytecode size limit increase (mentioned multiple times)</li>',
      '<li>Generics support for library developers</li>',
      '<li>Better type conversions</li>',
      '<li>Native cryptographic primitives and smoother Yul integration</li>',
      '<li>Pre-dispatch hook: ability to run code before/after method dispatch</li>',
      '<li>Development tools for Zed editor</li>',
      '</ul>',
      '<strong>AI-related:</strong>',
      '<ul>',
      '<li>Multiple respondents report AI-generated Solidity is unreliable</li>',
      '<li>Request for the Solidity team to help AI write more secure code</li>',
      '</ul>',
      '<strong>Community and communication:</strong>',
      '<ul>',
      '<li>More visibility and outreach for Solidity</li>',
      '<li>More detail in Core Solidity article on try-catch replacement and typeclasses</li>',
      '<li>More outreach for the survey through ecosystem projects</li>',
      '</ul>',
    ].join(''),
    charts: [],
  }

  const filtered = sections.filter((s) => !REMOVED_SECTIONS.has(s.id))

  // Insert final feedback before methodology
  const methIdx = filtered.findIndex((s) => s.id === 'methodology')
  if (methIdx >= 0) {
    filtered.splice(methIdx, 0, FINAL_FEEDBACK_SECTION)
  } else {
    filtered.push(FINAL_FEEDBACK_SECTION)
  }

  return filtered.map((section) => {
      const newCharts: SectionChart[] = []
      for (const chart of section.charts) {
        newCharts.push(chart)
        for (const [ftId, placement] of Object.entries(
          FREETEXT_PLACEMENT
        )) {
          if (
            placement.section === section.id &&
            placement.after === chart.id
          ) {
            const ftChart = chartsToMove.get(ftId)
            if (ftChart) newCharts.push(ftChart)
          }
        }
      }
      return { ...section, charts: newCharts }
    })
}

export const getStaticProps: GetStaticProps<SurveyPageProps> = async () => {
  const dataPath = path.join(
    process.cwd(),
    'src',
    'data',
    'survey-data.json'
  )
  const raw = fs.readFileSync(dataPath, 'utf-8')
  const data = JSON.parse(raw)

  return {
    props: {
      charts: data.charts,
      sections: reorganizeSections(data.sections),
      tables: data.tables,
    },
  }
}
