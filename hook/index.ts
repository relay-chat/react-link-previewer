import { useState, useEffect } from 'react'

export type LinkPreviewData = Partial<{
  title: string
  type: string
  website: string
  description: string
  images: Partial<{
    URL: string
    SURL: string
    Type: string
    Width: number
    Height: number
    Alt: string
  }>[]
}>

export type ReactLinkPreviewProps = {
  link: string
  host?: string
  fetchOptions?: RequestInit
}

export type ReactLinkPreviewComponentProps = ReactLinkPreviewProps & {
  children?: (data: LinkPreviewData) => JSX.Element
}

export const useLinkPreview = (
  { link, host, fetchOptions }: ReactLinkPreviewProps = {
    link: 'https://google.com',
    host: 'https://relay-link-previewer.herokuapp.com/',
    fetchOptions: {}
  }
) => {
  const [data, setData] = useState<LinkPreviewData>()
  const [error, setError] = useState<Error>()

  useEffect(() => {
    fetch(`${host}?link=${link}`, fetchOptions)
      .then((res) => res.json())
      .then((data) => setData(data))
      .catch((e) => setError(e))
  }, [])

  return { data, error }
}
