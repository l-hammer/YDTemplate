#!/bin/env python  
# -*- coding:utf-8 -*-  

# 删除web相关

import sys
import os
import shutil

if __name__ == "__main__":

    packageFile = './package.json'
    mvwebarr = [
        "webdev",
        "webstart",
        "webeg",
        "webbuild"
    ]
    mvapparr = [
        "appdev",
        "appstart",
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
    
    if len(sys.argv) == 1:
        print("\033[33m > 🚨  warning: 请输入参数@param (@param:web/app/examples) \033[0m")
    elif sys.argv[1] == 'web' or sys.argv[1] == 'app' or sys.argv[1] == 'examples':
        param = sys.argv[1]
        if param == 'web' or param == 'app':
            path = './src/' + param
            pathcss = './src/assets/' + param + '.scss'
            pathexamples = './src/examples/' + param
            pathexamplescss = './src/assets/examples/' + param + '.scss'
            if param == 'web':
                mvarr = mvwebarr
                npmdist = 'npm run appbuild'
            elif param == 'app':
                mvarr = mvapparr
                npmdist = 'npm run webbuild'
            with open(packageFile, 'r') as l:
                lines = l.readlines()
            with open(packageFile, 'w') as s:
                for line in lines:
                    s.write(line.replace('npm run webbuild && npm run appbuild', npmdist))
            with open(packageFile, 'r') as f:
                with open(packageFile + '.less', 'w') as g:
                    for line in f.readlines():
                        if not isInArray(mvarr, line):
                            g.write(line)
            shutil.move(packageFile + '.less', packageFile)
            os.remove(pathcss)
            os.remove(pathexamplescss)
        else:
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
    else:
        print("\033[31m > 💥  error: 参数输入错误，请重新输入……  \033[0m")
        print("\033[32m > ♻️  参数: @param (@param:web/app/examples) \033[0m")
    
    