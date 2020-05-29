import React, { useState, useEffect, HTMLAttributes } from 'react'
import cx from 'classnames'

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

export type ReactLinkPreviewComponentProps = ReactLinkPreviewProps & HTMLAttributes<HTMLAnchorElement>

export const useLinkPreview = ({
  link = 'https://google.com',
  host = 'https://og-service.herokuapp.com/',
  fetchOptions = {}
}: ReactLinkPreviewProps) => {
  const [data, setData] = useState<LinkPreviewData>()
  const [error, setError] = useState<Error>()

  useEffect(() => {
    fetch(`${host}?link=${link}`, fetchOptions)
      .then((res) => res.json())
      .then((json) => setData(json))
      .catch((e) => setError(e))
  }, [])

  console.log({ data, error })

  return { data, error }
}

export const LinkPreview = ({ children, link, host, fetchOptions, ...props }: ReactLinkPreviewComponentProps) => {
  const { data, error } = useLinkPreview({
    link,
    host,
    fetchOptions
  })

  return (
    <div className={cx('link-preview', props.className)}>
      <a {...props} href={link}>
        {children}
      </a>
      {data && (
        <div aria-hidden={true}>
          <h2>{data.title}</h2>
          <p>{data.description}</p>
          {data.images?.map((img) => (
            <img src={img.URL} height={img.Height} width={img.Width} alt={img.Alt} />
          ))}
        </div>
      )}

      {error && <div role="alert">{error.message}</div>}
    </div>
  )
}
