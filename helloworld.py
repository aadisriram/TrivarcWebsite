# from google.appengine.ext import webapp
import webapp2
# from google.appengine.ext.webapp.util import run_wsgi_app

class IndexHandler(webapp2.RequestHandler):
    def get(self):
        

        self.redirect("/football-world-cup-2014")

    def post(self):
        self.get()

application = webapp2.WSGIApplication([
  ('/.*', IndexHandler)




], debug=False)

