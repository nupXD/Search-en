import scrapy

class ProfilesSpider(scrapy.Spider):
  name = "profiles"

  start_urls = [
  'https://pureportal.coventry.ac.uk/en/organisations/coventry-university/persons/'
  ]

  def parse(self,response):
    data = {}
    data['profiles']= []

    profiles = response.css('.rendering.rendering_person.rendering_short.rendering_person_short')
    
    # looping through each person's profile
    for profile in profiles:
      yield {
        'author': profile.css('span::text').get(),
        'url': profile.css('a ::attr(href)').get()
      }
    
    # Hitting the next page and invoking self crawling logic
    next_page = response.css('.next a ::attr(href)').get()
    if next_page is not None:
      next_page = response.urljoin(next_page)
      yield scrapy.Request(next_page, callback = self.parse)