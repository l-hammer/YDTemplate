#!/bin/env python  
# -*- coding:utf-8 -*-  

# 删除web相关

import sys
import shutil

if __name__ == "__main__":

    param = sys.argv[1]
    packageFile = './package.json'

    if param == 'web' or param == 'app':
        path = './src/' + param
        pathcss = './src/assets/' + param
        pathexamples = './src/examples/' + param
    elif param == 'examples':
        path = './src/examples'
        pathexamples = './src/assets/examples'
    shutil.rmtree(path)
    shutil.rmtree(pathcss)
    shutil.rmtree(pathexamples)