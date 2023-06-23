import { Flex, Icon, Text } from '@chakra-ui/react'
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa'

import { ButtonLink } from '@/components'
import { useCleanRouterPath } from '@/hooks'
import { BLOG_PATH } from '@/constants'

interface PostNavigationProps {
  availableURLs: string[]
}

export const PostNavigation: React.FC<PostNavigationProps> = ({
  availableURLs,
}) => {
  const cleanRouterPath = useCleanRouterPath().replace(BLOG_PATH, '')
  const currentPost = availableURLs.indexOf(cleanRouterPath)
  const isFirstPost = currentPost === 0
  const isOldestPost = currentPost === availableURLs.length - 1

  return (
    <Flex justifyContent="center" gap={3}>
      {!isFirstPost && (
        <ButtonLink href={`${BLOG_PATH}${availableURLs[currentPost - 1]}`}>
          <Icon
            verticalAlign="middle"
            as={FaArrowLeft}
            size={16}
            _groupHover={{ color: 'primary' }}
          />

          <Text marginStart={3} fontFamily="heading" textTransform="uppercase">
            Previous post
          </Text>
        </ButtonLink>
      )}

      {!isOldestPost && (
        <ButtonLink href={`${BLOG_PATH}${availableURLs[currentPost + 1]}`}>
          <Text
            as="span"
            marginEnd={3}
            fontFamily="heading"
            textTransform="uppercase"
          >
            Next post
          </Text>

          <Icon
            as={FaArrowRight}
            size={16}
            verticalAlign="middle"
            // _groupHover={{ color: 'primary-button-hover-text' }}
          />
        </ButtonLink>
      )}
    </Flex>
  )
}
