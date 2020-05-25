package main

import (
	"log"
	"net/http"

	"os"

	"github.com/relay-chat/react-link-previewer/service"
)

func main() {

	port := os.Getenv("PORT")

	// Those are RelayChat origins, replace them with your own
	origins := []string{"*"}

	s := service.NewReactLinkPreviewService(origins)

	log.Println("Started a service on http://localhost:" + port)

	log.Fatal(http.ListenAndServe(":"+port, s))
}
