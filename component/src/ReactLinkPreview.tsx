import React, { useState, useEffect } from 'react'

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

const ReactLinkPreview = (
  {
    link,
    host,
    classNames,
    ...props
  }: {
    link: string
    host?: string
    classNames?: {
      heading: string
      description: string
      image: string
      website: string
    }
  } = {
    link: 'https://dev.to',
    host: 'http://localhost:3000'
  }
) => {
  const [data, setData] = useState<LinkPreviewData>()

  useEffect(() => {
    fetch(`${host}?link=${link}`)
      .then(res => res.json())
      .then(json => setData(json))
  })

  return (
    <div {...props}>
      <h1 className={classNames.heading}>{data.title}</h1>
      <strong className={classNames.website}>{data.website}</strong>
      <span className={classNames.description}>{data.description}</span>
      {data.images.map(img => (
        <img className={classNames.image} src={img.URL} height={img.Height} width={img.Width} alt={img.Alt} />
      ))}
    </div>
  )
}

export default ReactLinkPreview
