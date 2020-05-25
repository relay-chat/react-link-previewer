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

export type ReactLinkPreviewProps = {
  link: string
  host?: string
  fetchOptions?: RequestInit
}

export type ReactLinkPreviewComponentProps = ReactLinkPreviewProps & {
  children?: (data: LinkPreviewData) => JSX.Element
}

export const fetchLinkData = async ({
  host,
  link,
  fetchOptions
}: ReactLinkPreviewProps): Promise<LinkPreviewData | Error> => {
  let res: Response

  try {
    res = await fetch(`${host}?link=${link}`, fetchOptions)
    return await res.json()
  } catch (e) {
    return e
  }
}
