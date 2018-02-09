#!/bin/env python  
# -*- coding:utf-8 -*-  

# 删除web相关

import sys
import os
import shutil

if __name__ == "__main__":

    param = sys.argv[1]
    packageFile = './package.json'
    mvwebarr = [
        "webdev",
        "webeg",
        "webbuild"
    ]
    mvapparr = [
        "appdev",
        "appeg",
        "appbuild"
    ]
    mvegarr = [
        "webeg",
        "appeg"
    ]

    def isInArray (array, line):  
        for item in array:  
            if item in line:  
                return True  
        return False 

    if param == 'web' or param == 'app':
        path = './src/' + param
        pathcss = './src/assets/' + param + '.scss'
        pathexamples = './src/examples/' + param
        pathexamplescss = './src/assets/examples/' + param + '.scss'
        if param == 'web':
            mvarr = mvwebarr
        elif param == 'app':
            mvarr = mvapparr
        with open(packageFile, 'r') as f:
            with open(packageFile + '.less', 'w') as g:
                for line in f.readlines():
                    if not isInArray(mvarr, line):               
                        g.write(line)
        shutil.move(packageFile + '.less', packageFile)
        os.remove(pathcss)
        os.remove(pathexamplescss)
    elif param == 'examples':
        path = './src/examples'
        pathexamples = './src/assets/examples'
        with open(packageFile, 'r') as f:
            with open(packageFile + '.less', 'w') as g:
                for line in f.readlines():
                    if not isInArray(mvegarr, line):               
                        g.write(line)
        shutil.move(packageFile + '.less', packageFile)
    shutil.rmtree(path)
    shutil.rmtree(pathexamples)
    
    