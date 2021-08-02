# Crawler (Work in progress)

This module crawls the [Coventry Portal](https://pureportal.coventry.ac.uk/en/organisations/coventry-university/persons/) and saves the publications on a JSON file.

## Installation

Create the virtual environment for python.
Use the package manager [pip](https://pip.pypa.io/en/stable/) for installation.

```bash
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```

## Usage

The crawling takes some time so please have some patience, probably do your chores after running the command.

```bash
cd profiles_crawler/
scrapy crawl profiles -o profiles.json
scrapy crawl publications -o publications.json
```

## License
[MIT](https://choosealicense.com/licenses/mit/)
