# react-link-previewer 📰

Preview links with page meta tags using a React component + Go service.

## Features

- ⚡ Client-side and server-side support
- 🛠️ Component is written in TypeScript
- 🚀 Fast standalone service (written in Go)

## Folks using react-link-previewer

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

### How the component works

Component makes a request to a service (which is pre-deployed but you can set your own) and passes `link` (the link you want to preview, e.g. `https://dev.to`) as a query parameter, so we get a link looking like this:

```js
const url = `${host}?link=${link}`
```

Then the returned data, which we requested from the service, is passed to children so you can use this data.

### Props

The component has these props:

- `host` - optional custom service url
- `link` - link that you want to preview
- `fetchOptions` - optional `fetch` paramaters for making the request

### Examples

#### Default

By default, if not passing custom markup, like this:

```jsx
import React from 'react'
import { render } from 'react-dom'
import Preview from 'react-link-previewer'

render(
  <Preview link="https://relaychat.app" host="https://my-cool-deployed.service.com" />,
  document.getElementById('app')
)
```

You'll get this component:

```jsx
<Preview link="https://relaychat.app" host="https://my-cool-deployed.service.com">
  {(data) => (
    <div>
      <h1>{data.title}</h1>
      <strong>{data.website}</strong>
      <span>{data.description}</span>
      {data.images.map((img) => (
        <img src={img.URL} height={img.Height} width={img.Width} alt={img.Alt} />
      ))}
    </div>
  )}
</Preview>
```

#### Custom layout

If you want to add your custom layout to the link preview, the component passes data to children, so you can easily get this data and map to components:

```jsx
<Preview link="https://relaychat.app" host="https://my-cool-deployed.service.com">
  {(data) => (
    <Box>
      <WebsiteTitle>{data.title}</WebsiteTitle>
      <WebsiteName>{data.website}</WebsiteName>
      <Description>{data.description}</Description>
      {data.images.map((img) => (
        <Image src={img.URL} height={img.Height} width={img.Width} alt={img.Alt} />
      ))}
    </Box>
  )}
</Preview>
```

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

### Example

Here's an example backend go code you can copy-paste and replace origins with your own:

```go
package main

import (
	"log"
	"net/http"

	"github.com/relay-chat/react-link-previewer/service"
)

func main() {

  // Those are RelayChat origins, replace them with your own
	origins := []string{"moz-extension://40fec490-ea89-4b90-bff6-c9d215f1effd",
		"chrome-extension://niifmlaakldeiifddnihjkgahaipjdmh",
		"chrome-extension://jkkkbbddjbaciefiapbkogcgnfoompjj"}

	s := service.NewReactLinkPreviewService(origins)

	log.Println("Started a service on http://localhost:8080")

	log.Fatal(http.ListenAndServe(":8080", s))
}
```

## License

MIT

## Author

[v1rtl](https://v1rtl.site)
