import React, { Attributes, HTMLAttributes } from 'react'
import { ReactLinkPreviewComponentProps } from './fetch'
import { useLinkPreviewer } from './hook'

const LinkPreview = ({
  fetchOptions,
  link,
  host,
  children,
  ...props
}: ReactLinkPreviewComponentProps & HTMLAttributes<HTMLDivElement>) => {
  const { data, error } = useLinkPreviewer({ fetchOptions, link, host })

  if (data) {
    return (
      <div className={'link_body'}>
        <a href={link}>{children}</a>
        <div className="link_preview" aria-hidden>
          <h1 className="link_header">{data.title}</h1>
          <strong>{data.website}</strong>
          <span>{data.description}</span>
          {data.images?.map((img) => (
            <img src={img.URL} height={img.Height} width={img.Width} alt={img.Alt} />
          ))}
        </div>
      </div>
    )
  } else if (error) {
    return (
      <div>
        <h1>{error.name}</h1>
        <span>{error.message}</span>
      </div>
    )
  }
}

export default LinkPreview
