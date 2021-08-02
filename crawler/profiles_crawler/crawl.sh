#!/bin/bash
scrapy crawl profiles -o profiles.json
scrapy crawl publications -o publications.json
curl --form bulk=@publications.json http://localhost:7070/api/bulk