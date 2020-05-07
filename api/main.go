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
