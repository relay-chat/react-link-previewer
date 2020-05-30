# react-link-previewer :mag_right:

![npm type definitions](https://img.shields.io/npm/types/react-link-previewer?style=flat-square) ![npm](https://img.shields.io/npm/v/react-link-previewer?style=flat-square) ![NPM](https://img.shields.io/npm/l/react-link-previewer?style=flat-square) ![npm bundle size](https://img.shields.io/bundlephobia/minzip/react-link-previewer?style=flat-square)

Preview links with page meta tags using React component / hook + Go service.

## Docs

Docs with examples and advanced usage are [here](https://react-link-previewer.now.sh/).

## Features

- ⚡ Client-side and server-side support
- 🛠️ Hook and component are written in TypeScript
- 🚀 Fast standalone service (written in Go)

## Example

Here's a basic usage example (for more see [docs](https://react-link-previewer.now.sh/)):

```jsx
import React from 'react'
import { LinkPreview } from 'react-link-previewer'

function App() {
  return <LinkPreview link="https://relaychat.app">RelayChat</LinkPreview>
}

export default App
```

## Installation

```sh
# yarn
yarn add react-link-previewer
# npm
npm i react-link-previewer
# pnpm
pnpm i react-link-previewer
```

## Folks using react-link-previewer

- [RelayChat](https://relaychat.app/)

## Author

[v1rtl](https://v1rtl.site)
