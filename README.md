# react-link-previewer 📰

Easily preview links on hover with page meta tags using a React component + Go service.

## Features

- Client-side support
- Types (written in TypeScript)
- Fast standalone service (written in Go)

## Users

- [RelayChat](https://relaychat.app/)

## Component

### Installation

```sh
# yarn
yarn add react-link-previewer
# npm
npm i react-link-previewer
# pnpm
pnpm i react-link-previewer
```

### Example

```jsx
import React from 'react'
import { render } from 'react-dom'
import Preview from 'react-link-previewer'

render(<Preview link="https://relaychat.app" />, document.getElementById('app'))
```

### Props

- **link** - link to a website
- **host** - hostname of an HTTP metadata service
- **classNames** - a list of classNames to be used in a component: `heading`, `description`, `image` and `website`

## Service

### Why service?

Making requests with `fetch` is blocked by most websites, so a service does these requests instead.

### How it works

1. URL is being parsed for `?link=<link>`
2. HTTP service uses `opengraph` package to parse website's metadata
3. It displays them in JSON format.

### Installation

```sh
git clone https://github.com/relay-chat/react-link-previewer.git
go run service/main.go
```

You can edit headers and port for your needs.

## License

MIT

## Author

[v1rtl](https://v1rtl.site)
