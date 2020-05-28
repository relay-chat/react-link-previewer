# react-link-previewer 📰

work in progress...

Preview links with page meta tags using React hook + Go service.

## Features

- ⚡ Client-side and server-side support
- 🛠️ Hook is written in TypeScript
- 🚀 Fast standalone service (written in Go)

## Folks using react-link-previewer

- [RelayChat](https://relaychat.app/)

## Frontend

### Installation

```sh
# yarn
yarn add react-link-previewer
# npm
npm i react-link-previewer
# pnpm
pnpm i react-link-previewer
```

### How the hook works

The hook makes a request to a service (which is pre-deployed but you can set your own) and passes `link` (the link you want to preview, e.g. `https://dev.to`) as a query parameter, so we get a link looking like this:

```js
const url = `${host}?link=${link}`
```

Then the returned data, which we requested from the service, is passed to children so you can use this data.

### Props

The hook has these parameters:

- `host` - optional custom service url
- `link` - link that you want to preview
- `fetchOptions` - optional `fetch` paramaters for making the request

### Examples

#### Basic

The hook is very simple. You pass the `link`, it returns the data, you put it in your layout.

```jsx
import React from 'react'
import { useLinkPreviewer } from 'react-link-previewer'

const Link = () => {
  const data = useLinkPreviewer({
    link: 'https://relaychat.app'
  })

  return (
    <div>
      <h1>{data.title}</h1>
      <strong>{data.website}</strong>
      <span>{data.description}</span>
      {data.images?.map((img) => (
        <img src={img.URL} height={img.Height} width={img.Width} alt={img.Alt} />
      ))}
    </div>
  )
}
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
