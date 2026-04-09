import { useEffect, useState } from 'react'
import { Box, Link, Text, useColorModeValue } from '@chakra-ui/react'
import { NAV_HEIGHT } from '@/constants'

interface TocSection {
  id: string
  title: string
}

interface SurveyTableOfContentsProps {
  sections: TocSection[]
}

export const SurveyTableOfContents: React.FC<
  SurveyTableOfContentsProps
> = ({ sections }) => {
  const [activeId, setActiveId] = useState('')
  const activeBg = useColorModeValue('#E6E3EC', '#3D35A0')
  const hoverBg = useColorModeValue('#FAF8FF', '#1a1560')
  const borderColor = useColorModeValue('#E6E3EC', '#3D35A0')

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting)
        if (visible.length > 0) {
          setActiveId(visible[0].target.id)
        }
      },
      { rootMargin: `-${NAV_HEIGHT + 20}px 0px -60% 0px`, threshold: 0 }
    )

    sections.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [sections])

  return (
    <Box
      as="nav"
      position="sticky"
      top={`${NAV_HEIGHT + 24}px`}
      display={{ base: 'none', xl: 'block' }}
      w="220px"
      flexShrink={0}
      aria-label="Table of contents"
    >
      <Text
        fontSize="xs"
        fontWeight="bold"
        textTransform="uppercase"
        letterSpacing="wider"
        mb={3}
        color="secondary"
      >
        Sections
      </Text>
      {sections.map(({ id, title }) => (
        <Link
          key={id}
          href={`#${id}`}
          display="block"
          fontSize="sm"
          py={1.5}
          px={3}
          borderLeft="2px solid"
          borderColor={activeId === id ? 'primary' : borderColor}
          bg={activeId === id ? activeBg : 'transparent'}
          borderRadius="0 4px 4px 0"
          _hover={{
            textDecoration: 'none',
            bg: hoverBg,
          }}
          onClick={(e) => {
            e.preventDefault()
            const el = document.getElementById(id)
            if (el) {
              window.scrollTo({
                top: el.offsetTop - NAV_HEIGHT - 16,
                behavior: 'smooth',
              })
            }
          }}
        >
          {title}
        </Link>
      ))}
    </Box>
  )
}
