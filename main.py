# -*-coding:UTF-8 -*

# !Important!
# This tool requires the following packages to run:
# - python 3
# - cherrypy
# - cheetah3

import os.path
import cherrypy
from Cheetah.Template import Template
import sqlite3

# Root path
root = os.path.abspath(os.path.dirname(__file__))

# navigation menu to be used for all 
nav_menu = [
{'name' : 'Home', 'cpyref' : 'index' },
{'name' : 'Page1', 'cpyref' : 'page1' },
{'name' : 'Page2', 'cpyref' : 'page2' },
{'name' : 'About', 'cpyref' : 'about' }
]

# database
dbFile = os.path.join(root,'data\\db\\demo.db')

class App:
	@cherrypy.expose()
	def index(self):
		#This is the reference to the tempalte file
		htmlFile = os.path.join(root,'data\\templates\\home.tmpl')
		cssFile = os.path.join(root,'data\\css\\styles.css')
		
		# read the template
		t = Template(file = htmlFile)
		
		# fill with the information required
		t.title = "DemoTitle"
		t.nav_menu = nav_menu
		t.nav_activeitem = 'index'
		t.contents = "DemoContent"
		with open(cssFile, 'r') as myfile:
			t.css = myfile.read()
		
		# manage menu active button
		return str(t)

	@cherrypy.expose()
	def about(self):
		#This is the reference to the tempalte file
		htmlFile = os.path.join(root,'data\\templates\\about.tmpl')
		cssFile = os.path.join(root,'data\\css\\styles.css')

		# read the template
		t = Template(file = htmlFile)
		
		# fill with the information required
		t.title = "ABOUT"
		t.nav_menu = nav_menu
		t.nav_activeitem = 'about'
		t.contents = """
			<p>
				This tool is made as a demonstration of python, cherrypy and cheetah functionality. 
			</p>
			<p>Author : Sylvain Touret</p>
			<p>AVL France 2017</p>
		"""
		with open(cssFile, 'r') as myfile:
			t.css = myfile.read()
	
		return str(t)
		
	@cherrypy.expose()
	def page1(self):
		#This is the reference to the tempalte file
		htmlFile = os.path.join(root,'data\\templates\\page1.tmpl')
		cssFile = os.path.join(root,'data\\css\\styles.css')

		# read the template
		t = Template(file = htmlFile)
		
		# fill with the information required
		t.title = "PAGE1"
		t.nav_menu = nav_menu
		t.nav_activeitem = 'page1'
		t.contents = "This is my page1 "
		
		# read database here and send it to cheetah
		db = sqlite3.connect(dbFile)
		cur = db.cursor()
	
		select = "SELECT * FROM " + "tb" 
		cur.execute(select)
		
		t.db = cur
		
		with open(cssFile, 'r') as myfile:
			t.css = myfile.read()
		
	
		return str(t)
	
	@cherrypy.expose()
	def page2(self):
		#This is the reference to the tempalte file
		htmlFile = os.path.join(root,'data\\templates\\page2.tmpl')
		cssFile = os.path.join(root,'data\\css\\styles.css')
		
		# read the template
		t = Template(file = htmlFile)
		
		# fill with the information required
		t.title = "PAGE2"
		t.nav_menu = nav_menu
		t.nav_activeitem = 'page2'
		t.contents = "This is my page2 "
		
		with open(cssFile, 'r') as myfile:
			t.css = myfile.read()
	
		return str(t)


# run cherrypy

# Configuration for server
config = {
  'global' : {
		'server.socket_host' : '127.0.0.1',
		'server.socket_port' : 8080,
		'server.thread_pool' : 10
	}
}

if __name__ == '__main__':

	# starts the web server with the settings in config file
	cherrypy.quickstart(App() , '/' , config)



