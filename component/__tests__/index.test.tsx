import React from 'react'
import { create } from 'react-test-renderer'
import ReactLinkPreviewer from '../src/ReactLinkPreview'

describe('react-link-previewer test', () => {
  it('should receive the data stringify it', () => {
    const component = create(<ReactLinkPreviewer link="" />)
  })
})
