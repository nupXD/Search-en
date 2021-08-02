# Search Engine (Work in progress)

This module starts the API that uses Elastic search for an inverted index to do a vertical search. Data Crawled from [Coventry Portal](https://pureportal.coventry.ac.uk/en/organisations/coventry-university/persons/).

## Installation

You need to have [docker and docker-compose](https://docs.docker.com/get-docker/) installed to test/run the search engine.

To run only crawler, please head over to [crawler README](crawler/README.md) instead.

```bash
docker-compose build
docker-compose up
```

This creates all the dependencies and runs the app on [7070](http://localhost:7070). For quick installation run this command in another terminal once the app is loaded.

Make sure you have [curl](https://curl.se/download.html) installed.

```bash
curl --form bulk=@data/publication_with_id.json http://localhost:7070/api/bulk
```

This creates the elastic index as specified on [docker_compose.yml](docker-compose.yml) in bulk fashion. Please make sure  the index and type do not contain uppercase letters and very fancy characters, just lowercased letters to be safe.

## Usage

Head over to [localhost:7070](http://localhost:7070) and see the search engine in action.


## TODO
* Running the crawler automatically like a CRON job/scheduler.
* Code cleanup
* Documentation
## License
[MIT](https://choosealicense.com/licenses/mit/)
