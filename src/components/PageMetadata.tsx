import Head from 'next/head'
import { useRouter } from 'next/router'

import {
  DEFAULT_IMAGE_PATH,
  FAVICON_IMAGE_PATH,
  SITE_NAME,
  SITE_URL,
  TWITTER_HANDLE,
} from '@/constants'

interface MetadataItem {
  name?: string
  property?: string
  content: string
}

interface Props {
  title: string
  description: string
  image?: string
}

export const PageMetadata: React.FC<Props> = ({
  title,
  description,
  image,
}) => {
  const router = useRouter()
  const { href: url } = new URL(router.asPath, SITE_URL)
  const fullTitle = `${title} | ${SITE_NAME}`
  const { href: defaultOgImage } = new URL(DEFAULT_IMAGE_PATH, SITE_URL)
  const ogImage = !image ? defaultOgImage : new URL(image, SITE_URL).href

  const metadata: MetadataItem[] = [
    { name: 'title', content: fullTitle },
    { name: 'description', content: description },
    { name: 'application-name', content: SITE_NAME },
    { name: 'image', content: ogImage },
    // OpenGraph
    { property: 'og:title', content: fullTitle },
    { property: 'og:description', content: description },
    { property: 'og:type', content: 'website' },
    { property: 'og:site_name', content: SITE_NAME },
    { property: 'og:url', content: url },
    { property: 'og:image', content: ogImage },
    { property: 'og:image:url', content: ogImage },
    { property: 'og:image:secure_url', content: ogImage },
    { property: 'og:image:alt', content: SITE_NAME },
    { property: 'og:image:type', content: 'image/png' },
    // Twitter
    { name: 'twitter:card', content: 'summary_large_image' },
    { property: 'twitter:url', content: url },
    { name: 'twitter:creator', content: TWITTER_HANDLE },
    { name: 'twitter:site', content: TWITTER_HANDLE },
    { name: 'twitter:title', content: fullTitle },
    { name: 'twitter:description', content: description },
    // patch to force a cache invalidation of twitter's card bot
    { name: 'twitter:image', content: `${ogImage}/#` },
    // viewport
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
  ]

  return (
    <Head>
      <title>{fullTitle}</title>
      {metadata.map((data) => (
        <meta key={data.name || data.property} {...data} />
      ))}
      {/* favicon */}
      <link rel="icon" type="image/x-icon" href={FAVICON_IMAGE_PATH} />
      <link rel="manifest" href="/manifest.json" />
    </Head>
  )
}
