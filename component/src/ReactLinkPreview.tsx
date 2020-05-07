import React, { useState, useEffect, Component } from 'react'

export interface LinkPreviewData {
  title?: string
  type?: string
  website?: string
  description?: string
  images?: {
    URL?: string
    SURL?: string
    Type?: string
    Width?: number
    Height?: number
    Alt?: string
  }[]
}

type ReactLinkPreviewProps = {
  link: string
  host?: string
  fetchOptions?: RequestInit
  children?: (data: LinkPreviewData) => JSX.Element
}

const ReactLinkPreview = (
  { link, host, children, fetchOptions }: ReactLinkPreviewProps = {
    link: 'https://relaychat.app',
    host: 'https://react-link-previewer.now.sh/api/handler',
    fetchOptions: {},
    children: (data) => (
      <div>
        <h1>{data.title}</h1>
        <strong>{data.website}</strong>
        <span>{data.description}</span>
        {data.images.map((img) => (
          <img src={img.URL} height={img.Height} width={img.Width} alt={img.Alt} />
        ))}
      </div>
    ),
  }
) => {
  const [data, setData] = useState<LinkPreviewData>()

  useEffect(() => {
    fetch(`${host}?link=${link}`, fetchOptions)
      .then((res) => res.json())
      .then((json) => setData(json))
  })

  return <>{children(data)}</>
}

export default ReactLinkPreview
