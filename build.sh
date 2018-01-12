#!/usr/bin/env bash
# @describe:
# @author:   LHammer(LHammering@gmail.com)

#set -x

# vim:set ts=4 sw=4 et fdm=marker:

# 打包成功后自动拷贝

if [ ! $1 ]; then
    echo "> 🚨  warning: 请输入参数@param1 @param2 (@param1:web,app,webeg,appeg; @param2:--no-minify)"
else
    rm -rf dist/ && \
    if [[ $1 == "web" && ! $2 ]]; then
        npm run webbuildmin && \
        python autocopy.py $1
    elif [[ $1 == "web" && $2 == "--no-minify" ]]; then
        npm run webbuild && \
        python autocopy.py web
    elif [[ $1 == "app" && ! $2 ]]; then
        npm run appbuildmin && \
        python autocopy.py $1
    elif [[ $1 == "app" && $2 == "--no-minify" ]]; then
        npm run appbuild && \
        python autocopy.py $1
    elif [[ $1 == "webeg" && ! $2 ]]; then
        npm run webegbuildmin && \
        python autocopy.py examples/web
    elif [[ $1 == "webeg" && $2 == "--no-minify" ]]; then
        npm run webegbuild && \
        python autocopy.py examples/web
    elif [[ $1 == "appeg" && ! $2 ]]; then
        npm run appegbuildmin && \
        python autocopy.py examples/app
    elif [[ $1 == "appeg" && $2 == "--no-minify" ]]; then
        npm run appegbuild && \
        python autocopy.py examples/app
    fi
fi

# 以下代码未实现（sed替换不知道怎么搞），使用autocopy.py代替

# file='./src/examples/web/index.js'

# templateFile='./src/examples/web/template.tpl'

# lineStart=`grep -n 'var YD = YD || {}' $file`

# lineEnd=`grep -n 'if (module.hot)' $file`

# lineStartNum=${lineStart%:*}

# lineEndNum=$[${lineEnd%:*}-4]

# jsCon=`sed -n "${lineStartNum}, ${lineEndNum}p" $file` 

#实现$jsCon替换$templateFile中{{jsCode}}

#sed -i '' "/{{jsCode}}/c\\
#$jsCon" $templateFile

#sed -i "" "s/{{jsCode}}/$jsCon/" $templateFile

