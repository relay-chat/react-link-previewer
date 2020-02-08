package main

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"

	"github.com/otiai10/opengraph"
	"github.com/rs/cors"
)

type resStruct struct {
	Title       string               `json:"title"`
	Type        string               `json:"type"`
	URL         string               `json:"url"`
	SiteName    string               `json:"website"`
	Description string               `json:"description"`
	Images      []*opengraph.OGImage `json:"images"`
}

func main() {

	handler := http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {

		link := r.URL.Query().Get("link")

		og, err := opengraph.Fetch(link)

		if err != nil {
			fmt.Fprint(w, err)
		}

		if err != nil {
			fmt.Fprint(w, err)
		}

		r.Header.Set("Content-Type", "application/json")

		resData := resStruct{
			Title:       og.Title,
			Type:        og.Type,
			URL:         og.URL.Hostname(),
			SiteName:    og.SiteName,
			Description: og.Description,
			Images:      og.Image,
		}

		res, err := json.Marshal(resData)

		if err != nil {

			fmt.Fprint(w, err)
		}

		w.Write(res)

	})

	c := cors.New(cors.Options{
		AllowedOrigins: []string{"moz-extension://40fec490-ea89-4b90-bff6-c9d215f1effd",
			"chrome-extension://niifmlaakldeiifddnihjkgahaipjdmh",
			"chrome-extension://jkkkbbddjbaciefiapbkogcgnfoompjj"},
		AllowedMethods:   []string{"GET"},
		AllowCredentials: false,
		AllowedHeaders:   []string{"Content-Type", "Accept", "X-Requested-With"},
	})

	log.Fatal(http.ListenAndServe(":8080", c.Handler(handler)))
}
