#!/bin/env python  
# -*- coding:utf-8 -*-  

# 自动化拷贝上线代码

import sys
import os
import re

if __name__ == "__main__":

  filearg = sys.argv[1]
  lineStart = 0
  lineEnd = 0
  jsCon = '\n'
  dirFiles = os.listdir('./src/'+filearg)
  tplFiles = os.listdir('./src/'+filearg+'/template')

  if filearg == 'app' or filearg == 'examples/app':
    for file in tplFiles:
      res = re.search(r'(.*).tpl', file, re.M|re.I)
      if res:
        templateFilePath = './src/'+filearg+'/template/'+res.group()
  else:
    filePath = './src/'+filearg+'/index.js'
    for file in dirFiles:
      res = re.search(r'(.*).tpl', file, re.M|re.I)
      if res:
        templateFilePath = './src/'+filearg+'/'+res.group()
    
    # !app or examples/app? cp js -> template.tpl<{% jsCode %}>
    file_object = open(filePath, 'r')
    for (num,value) in enumerate(file_object):
      if value.find("this is a mark line") is not -1:
        lineStart = num + 2
      if value.find("if (module.hot)") is not -1:
        lineEnd = num - 4
    file_object.close()

    file_object = open(filePath, 'r') 
    for i in file_object.readlines()[lineStart:lineEnd]:
      jsCon = jsCon + '    ' + i
    file_object.close()
    with open(templateFilePath, 'r') as r:
      lines=r.readlines()
    with open(templateFilePath, 'w') as w:
      for l in lines:
        w.write(l.replace('<{% jsCode %}>',jsCon))

  # cp html -> template.tpl<{% htmlCode %}>
  htmlCon = ''
  filePath = './src/'+filearg+'/index.html'

  file_object = open(filePath, 'r')
  for (num,value) in enumerate(file_object):
    if value.find("<body>") is not -1:
      lineStart = num + 1
    if value.find("</body>") is not -1:
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
      w.write(l.replace('<{% htmlCode %}>',htmlCon))

  #app or examples/app? : cp js -> template.tpl<{% jsCode %}>
  if filearg == 'app' or filearg == 'examples/app':
    filedir = './dist'
    files = os.listdir(filedir)
    for file in files:
      search = re.search(r'(.*).js', file, re.M|re.I)
      if search:
        filePath = filedir + '/' + search.group()
        file_object = open(filePath, 'r')
        jsCon = file_object.read()
        file_object.close()

    with open(templateFilePath, 'r') as r:
      lines=r.readlines()
    with open(templateFilePath, 'w') as w:
      for l in lines:
        w.write(l.replace('<{% jsCode %}>',jsCon))

  # cp css -> template.tpl<{% cssCode %}>
  cssCon = ''
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
      w.write(l.replace('<{% cssCode %}>',cssCon))
