import scrapy
import json
import uuid

class PublicationsSpider(scrapy.Spider):
  name = "publications"
  profiles = {}

  # opens the profiles.json file for loop around
  with open('profiles.json') as json_file:
    profiles = json.load(json_file)  
  
  start_urls=[]

  # appends all the scraped profile url with publication url
  for profile in profiles:
    start_urls.append(profile['url']+'/publications/')

  def parse(self,response):
    publications = response.css('.result-container')

    # looping through each paper
    for publication in publications:
      concepts = publication.css('.concept-wrapper')
      
      categories = []

      # looping through each concept/category of paper
      for concept in concepts:
        categories.append(concept.css('.concept::text').get())
        
      yield {
        "_id": uuid.uuidv4(),
        'author': response.css('.person-details h1::text').get(),
        'title': publication.css('h3 span::text').get(),
        'link': publication.css('h3 a ::attr(href)').get(),
        'date': publication.css('.date::text').get(),
        'concepts': categories
      }
