import { useState, useEffect } from 'react'
import { ReactLinkPreviewProps, fetchLinkData } from './fetch'
import { LinkPreviewData } from '../dist/ReactLinkPreview'

export const useLinkPreviewer = (
  { link, host, fetchOptions }: ReactLinkPreviewProps = {
    link: 'https://google.com',
    host: 'https://relay-link-previewer.herokuapp.com/',
    fetchOptions: {}
  }
) => {
  const [data, setData] = useState<LinkPreviewData>()
  const [error, setError] = useState<Error>()

  useEffect(() => {
    fetchLinkData({ host, link, fetchOptions }).then((response) =>
      response instanceof Error ? setError(response) : setData(response)
    )
  }, [])

  return { data, error }
}
