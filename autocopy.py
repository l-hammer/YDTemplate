#!/bin/env python  
# -*- coding:utf-8 -*-  

# 自动化拷贝上线代码

import sys
import os
import re

if __name__ == "__main__":

	# cp js -> template.tpl{{jsCode}}
	lineStart = 0
	lineEnd = 0
	jsCon = ''
	filePath = './src/examples/web/index.js'
	templateFilePath = './src/examples/web/template.tpl'
	
	file_object = open(filePath, 'r')
	for (num,value) in enumerate(file_object):
		if value.find("var YD = YD || {};") is 0:
			lineStart = num
		if value.find("if (module.hot)") is 0:
			lineEnd = num - 4
	file_object.close()

	file_object = open(filePath, 'r') 
	for i in file_object.readlines()[lineStart:lineEnd]:
		jsCon = jsCon + i
	file_object.close()

	with open(templateFilePath, 'r') as r:
		lines=r.readlines()
	with open(templateFilePath, 'w') as w:
		for l in lines:
			w.write(l.replace('{{jsCode}}',jsCon))
	
	# cp html -> template.tpl{{htmlCode}}
	htmlCon = ''
	filePath = './src/examples/web/index.html'

	file_object = open(filePath, 'r')
	for (num,value) in enumerate(file_object):
		if value.find("<body>") is 0:
			lineStart = num
		if value.find("</body>") is 0:
			lineEnd = num - 2
	file_object.close()

	file_object = open(filePath, 'r') 
	for i in file_object.readlines()[lineStart:lineEnd]:
		htmlCon = htmlCon + i
	file_object.close()

	with open(templateFilePath, 'r') as r:
		lines=r.readlines()
	with open(templateFilePath, 'w') as w:
		for l in lines:
			w.write(l.replace('{{htmlCode}}',htmlCon))

	# cp css -> template.tpl{{cssCode}}
	htmlCon = ''
	filedir = './dist'
	files = os.listdir(filedir)
	for file in files:
		search = re.search(r'(.*).css', file, re.M|re.I)
		if search:
			filePath = filedir + '/' + search.group()
			file_object = open(filePath, 'r')
			cssCon = file_object.read()
			file_object.close()

	with open(templateFilePath, 'r') as r:
		lines=r.readlines()
	with open(templateFilePath, 'w') as w:
		for l in lines:
			w.write(l.replace('{{cssCode}}',cssCon))

	
	