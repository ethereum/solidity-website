import fs from 'fs'
import path from 'path'
import { Box, Flex, Heading, Text, useColorModeValue } from '@chakra-ui/react'
import dynamic from 'next/dynamic'
import type { GetStaticProps } from 'next'
import {
  HeadingWithAnchor,
  Link,
  PageMetadata,
  Section,
} from '@/components'
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

interface SectionRespondents {
  label: string
  value: number
  [key: string]: string | number
}

interface SurveyPageProps {
  charts: Record<string, ChartData>
  sections: SurveySection[]
  tables: Record<string, TableRow[]>
  sectionRespondents: SectionRespondents[]
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
  // DevEx
  dx_change: 'How has the Solidity DevEx changed in the past year?',
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
  dx_improved: 'What has improved in the DevEx?',
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
    'I am very concerned that Core Solidity is trying to turn solidity into some kind of academic Haskell language that requires a PhD in types to use.',
    'Still unclear how core solidity is not a new language and how the syntax and semantics will be made backwards compatible.',
    'I care most that the bytecode is good. Syntactic sugar is less important to me.',
    'Please do not remove inheritance and contracts as classes, everything should be backwards compatible as we will lose all the years of work, libraries and standards created.',
  ],
  final_feedback: [
    'Solidity is a surprisingly good language for expressing the kinds of problems you have for EVM smart contracts. Thanks for it.',
    'Smart contracts are hard since you have to balance the quality of the code vs the cost for the user. Ideally correctly written code should also be the proper way to optimize for gas, and not the other way around.',
    'Please fix the bytecode size limit, it\'s not always practical to refactor contract into multiple smaller ones, doing so is always a huge lift in dev and ops work.',
    'Solidity and the surrounding ecosystem are moving in the right direction, especially in tooling, testing frameworks, and developer workflows. However, developer experience is still heavily constrained by debugging limitations, EVM-level abstractions, and low-level complexity that slows productivity and increases risk.',
    'Keep pushing for better native cryptographic primitives and smoother Yul integration. It makes building privacy-focused tools and DeFi mechanisms safer and gas-efficient.',
    'It feels like the primarily direction of Solidity should be security, compiler performance, more aggressive bytecode optimization + developer ergonomics.',
    'Keep pushing, everyone. It\'s a pleasure to write smart contracts today compared to where we were 3 to 5 years ago.',
  ],
}


const YOY_NOTES: Record<string, string> = {
  primary_framework:
    'Foundry increased from 51% to 57%. Hardhat is at 33% combined in both years, but the 2025 survey distinguished between v2 (15%) and v3 (18%). Truffle dropped from 2.4% in 2024 to a single remaining user.',
  os: 'In 2024, MacOS led at 43%, followed by Windows (29%) and Linux (28%). In 2025, Windows leads at 38%, followed by MacOS (31%) and Linux (30%).',
  dx_change:
    'DevEx sentiment is slightly more positive: 73% report improvement (vs 67% in 2024). The percentage reporting things got worse is unchanged at 2%.',
  recurring_issues:
    'The question format changed between years (single multi-select in 2024 vs separate checkboxes in 2025), which may account for some of the decrease. With that caveat: in 2024, stack-too-deep was reported by 68%, debugging by 55%, bytecode size by 51%, and optimizer issues by 22%. In 2025, these are 47%, 33%, 33%, and 13% respectively.',
  sourcify:
    'Sourcify awareness improved: 48% don\'t know about it in 2025 (vs 56% in 2024), and usage increased from 17% to 24%.',
  ir_pipeline:
    'IR pipeline awareness also improved: 35% don\'t know what it is in 2025 (vs 46% in 2024).',
}


const CONDITIONAL_NOTES: Record<string, string> = {
  ir_too_slow: 'shown to IR pipeline users only',
  oldest_evm_target: 'shown to those relying on older EVM support',
  core_solidity_features: 'shown to those familiar with Core Solidity',
  inheritance_impact: 'shown to those familiar with Core Solidity',
  traits_rewrite_difficulty: 'shown to those familiar with Core Solidity',
  benefit_comptime: 'shown to those familiar with Core Solidity',
  core_solidity_feedback: 'shown to those familiar with Core Solidity',
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
    'traits_rewrite_difficulty',
    'benefit_comptime',
    'ir_pipeline',
    'ai_favorability',
    'ai_trust',
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

function renderSectionIntro(section: SurveySection): React.ReactNode {
  const intro = section.intro

  // Overview gets the previous survey links appended
  if (section.id === 'overview') {
    return (
      <>
        <Text>{intro}</Text>
        <Text mt={2}>
          <Link
            color="secondary"
            textDecoration="underline"
            href="/data/solidity-survey-2025-results.csv"
          >
            Download the raw data (CSV)
          </Link>
          {' | Previous surveys: '}
          <Link
            color="secondary"
            textDecoration="underline"
            href="/blog/2024/04/03/solidity-developer-survey-2023-results/"
          >
            2023
          </Link>
          {', '}
          <Link
            color="secondary"
            textDecoration="underline"
            href="/blog/2025/04/25/solidity-developer-survey-2024-results/"
          >
            2024
          </Link>
        </Text>
      </>
    )
  }

  // Render markdown-like content: paragraphs, **bold**, and - bullet lists
  const blocks = intro.split('\n\n')
  return (
    <>
      {blocks.map((block: string, i: number) => {
        const lines = block.split('\n').filter((l: string) => l)

        // Bullet list block
        if (lines.every((l: string) => l.startsWith('- '))) {
          return (
            <Box as="ul" key={i} pl={6} mb={4}>
              {lines.map((line: string, j: number) => (
                <Box as="li" key={j} mb={2}>
                  {line.slice(2)}
                </Box>
              ))}
            </Box>
          )
        }

        // Text with optional **bold** spans
        const text = lines.join(' ')
        const parts = text.split(/(\*\*.*?\*\*)/)
        return (
          <Text key={i} mb={i < blocks.length - 1 ? 4 : 0}>
            {parts.map((part: string, j: number) =>
              part.startsWith('**') && part.endsWith('**') ? (
                <Text as="strong" key={j} fontWeight="bold">
                  {part.slice(2, -2)}
                </Text>
              ) : (
                part
              )
            )}
          </Text>
        )
      })}
    </>
  )
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
  sectionRespondents,
}: SurveyPageProps) {
  const tocSections = sections.map((s) => ({
    id: s.id,
    title: s.title,
  }))
  const quoteBg = useColorModeValue('#FAF8FF', 'rgba(26, 21, 96, 0.5)')
  const calloutBorder = useColorModeValue('#9F94E8', '#3D35A0')
  const tldrBg = useColorModeValue('#FAF8FF', '#110C4E')
  const tldrBorder = useColorModeValue('#E6E3EC', '#3D35A0')

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
            <Box
              bg={tldrBg}
              border="1px solid"
              borderColor={tldrBorder}
              borderRadius="lg"
              p={{ base: 4, md: 6 }}
              mb={12}
            >
              <Heading as="h2" size="md" mb={3} fontFamily="heading">
                Key findings
              </Heading>
              <Box as="ul" fontSize="md" lineHeight="1.7" pl={5}>
                <li>
                  70% of respondents are smart contract developers,
                  with India, Nigeria, and the US as the top
                  countries
                </li>
                <li>
                  Foundry is the dominant framework at 57%, up from
                  51% in 2024. Truffle is down to a single user.
                </li>
                <li>
                  Stack-too-deep remains the #1 pain point (47%),
                  with experts reporting it more than beginners
                  (65% vs 25%)
                </li>
                <li>
                  88% use AI tools at least monthly, but adoption
                  outpaces trust: 45% express distrust in AI output
                </li>
                <li>
                  Only 30% of respondents are familiar with Core
                  Solidity. Among those who are, better error
                  handling and delegatecall replacement are the most
                  wanted features.{' '}
                  <Link
                    color="secondary"
                    textDecoration="underline"
                    href="/blog/2025/11/14/core-solidity-deep-dive/"
                  >
                    Learn more about Core Solidity
                  </Link>
                  .
                </li>
                <li>
                  DevEx is improving: 73% report improvement (up
                  from 67% in 2024)
                </li>
              </Box>
            </Box>
            {sections.map((section) => (
              <Box key={section.id} mb={16}>
                <HeadingWithAnchor
                  as="h2"
                  id={section.id}
                  textStyle="h3"
                  mb={4}
                >
                  {section.title}
                </HeadingWithAnchor>

                {section.intro && (
                  <Box mb={8} fontSize="md" lineHeight="1.7">
                    {renderSectionIntro(section)}
                  </Box>
                )}

                {section.id === 'overview' && (
                  <SurveyChartWrapper
                    title="Respondents per section"
                    nValue="n = 1,095 usable responses"
                    description="Respondent counts decrease through the survey as some participants drop off before completing all pages."
                    height={300}
                  >
                    <SurveyBarChart
                      data={sectionRespondents}
                      layout="vertical"
                      total={1095}
                    />
                  </SurveyChartWrapper>
                )}

                {section.charts.length === 0 &&
                  CHART_QUOTES[section.id] &&
                  CHART_QUOTES[section.id].map((quote, i) => (
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
                        yoyNote={YOY_NOTES[chartRef.id]}
                        quotes={CHART_QUOTES[chartRef.id]}
                        conditionalNote={
                          CONDITIONAL_NOTES[chartRef.id]
                        }
                        footer={
                          chartRef.full_table &&
                          tables[chartRef.full_table] ? (
                            <SurveyDataTable
                              data={tables[chartRef.full_table]}
                              label={
                                chartRef.full_table === 'country'
                                  ? 'Country'
                                  : 'Native Language'
                              }
                            />
                          ) : undefined
                        }
                      >
                        {renderChart(chartRef.id, chartData)}
                      </SurveyChartWrapper>
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
      'The 151 final feedback responses included the following recurring themes:',
      '',
      '**Feature requests:**',
      '',
      '- Bytecode size limit increase (mentioned multiple times)',
      '- Generics support for library developers',
      '- Better type conversions',
      '- Native cryptographic primitives and smoother Yul integration',
      '- Pre-dispatch hook: ability to run code before/after method dispatch',
      '- Development tools for Zed editor',
      '',
      '**AI-related:**',
      '',
      '- Multiple respondents report AI-generated Solidity is unreliable',
      '- Request for the Solidity team to help AI write more secure code',
      '',
      '**Community and communication:**',
      '',
      '- More visibility and outreach for Solidity',
      '- More detail in Core Solidity article on try-catch replacement and typeclasses',
      '- More outreach for the survey through ecosystem projects',
    ].join('\n'),
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

// Compute max respondent count per section for the drop-off chart
function computeSectionRespondents(
  sections: SurveySection[],
  charts: Record<string, ChartData>
): SectionRespondents[] {
  const SECTION_LABELS: Record<string, string> = {
    demographics: 'Demographics',
    solidity_usage: 'Solidity Usage',
    tooling: 'Tooling',
    compilation: 'Compilation',
    chains: 'Chains',
    dx: 'DevEx',
    core_solidity: 'Core Solidity',
    ai: 'AI',
  }

  return sections
    .filter((s) => SECTION_LABELS[s.id])
    .map((s) => {
      const ns = s.charts
        .map((c) => {
          const chart = charts[c.id]
          if (!chart) return 0
          const n = chart.meta?.n
          return typeof n === 'number' ? n : 0
        })
        .filter((n) => n > 0)
      return {
        label: SECTION_LABELS[s.id],
        value: ns.length > 0 ? Math.max(...ns) : 0,
      }
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

  const sections = reorganizeSections(data.sections)

  return {
    props: {
      charts: data.charts,
      sections,
      tables: data.tables,
      sectionRespondents: computeSectionRespondents(
        data.sections,
        data.charts
      ),
    },
  }
}
