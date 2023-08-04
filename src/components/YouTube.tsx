import { AspectRatio, AspectRatioProps } from '@chakra-ui/react'

/**
 * @param {url} YouTube video URL, or ID of the YouTube video
 * URLs come in format: https://www.youtube.com/watch?v=<id>,
 * https://www.youtube.com/embed/<id>, or https://youtu.be/<id>
 * e.g. For https://www.youtube.com/watch?v=H-O3r2YMWJ4 the `id` is H-O3r2YMWJ4
 * @returns Embedded YouTube video component
 */

export interface IProps extends AspectRatioProps {
  url: string
  title?: string
}

export const YouTube: React.FC<IProps> = ({
  url,
  title = 'YouTube Video',
  ...aspectRatioProps
}) => {
  let vid = ''
  const u = new URL(url)
  // Parse out the video ID from the different YouTube URL formats
  if (url.includes('watch')) {
    vid = u.searchParams.get('v')!
  } else if (url.includes('youtu.be') || url.includes('embed')) {
    vid = u.pathname.split('/').at(-1)!
  } else {
    // If none of above, assume only the video ID was provided
    vid = url
  }

  const baseUrl = 'https://www.youtube.com/embed/'
  const src = baseUrl + vid
  return (
    <AspectRatio
      as="figure"
      w="full"
      ratio={16 / 9}
      {...aspectRatioProps}
    >
      <iframe
        src={src}
        title={title}
        allow="
          accelerometer;
          autoplay;
          clipboard-write;
          encrypted-media;
          gyroscope;
          picture-in-picture"
        allowFullScreen
      />
    </AspectRatio>
  )
}
