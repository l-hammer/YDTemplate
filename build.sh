#!/usr/bin/env bash
# @describe:
# @author:   LHammer(LHammering@gmail.com)

#set -x

# vim:set ts=4 sw=4 et fdm=marker:

# 打包成功后自动拷贝

month=$(date +%m)
host=songhw@118.190.101.187
www=www@10.30.214.232:/home/www/
wx=yindou_02/application/views/wx/events/2018/$month/
h5=yindou_02/application/views/h5/events/2018/$month/
web=yindou_02/application/views/web/events/2018/$month/

if [ ! $1 ]; then
    echo -e "\033[33m > 🚨  warning: 请输入参数@param1 @param2 (@param1:web/app/webeg/appeg; @param2:--no-minify) \033[0m"
else
    rm -rf dist/ && \
    git co *.tpl && \
    if [[ $1 == "web" && ! $2 ]]; then
        files=./src/web/*.tpl
        npm run webbuildmin && \
        python ./bin/autocopy.py $1 && \
        # see https://linux.cn/article-7456-1.html && http://man.linuxde.net/scp
        scp -P 38 -rq -o ProxyCommand='ssh '$host' -p 21222 -A -W %h:%p' $files $www$web
        for file in ${files} 
        do    
            temp_file=`basename $file`    
            echo -e "\n\033[32m🚚  Scp $temp_file to $web done \033[0m\n" 
        done
    elif [[ $1 == "web" && $2 == "--no-minify" ]]; then
        npm run webbuild && \
        python ./bin/autocopy.py web
    elif [[ $1 == "app" && ! $2 ]]; then
        files=./src/app/*.tpl
        npm run appbuildmin && \
        python ./bin/autocopy.py $1 && \
        scp -P 38 -rq -o ProxyCommand='ssh '$host' -p 21222 -A -W %h:%p' $files $www$wx
        for file in ${files} 
        do    
            temp_file=`basename $file`    
            echo -e "\n\033[32m🚚  Scp $temp_file to $wx done \033[0m\n" 
        done
    elif [[ $1 == "app" && $2 == "--no-minify" ]]; then
        npm run appbuild && \
        python ./bin/autocopy.py $1
    elif [[ $1 == "webeg" && ! $2 ]]; then
        npm run webegbuildmin && \
        python ./bin/autocopy.py examples/web
    elif [[ $1 == "webeg" && $2 == "--no-minify" ]]; then
        npm run webegbuild && \
        python ./bin/autocopy.py examples/web
    elif [[ $1 == "appeg" && ! $2 ]]; then
        npm run appegbuildmin && \
        python ./bin/autocopy.py examples/app
    elif [[ $1 == "appeg" && $2 == "--no-minify" ]]; then
        npm run appegbuild && \
        python ./bin/autocopy.py examples/app
    else
        echo -e "\033[31m > 💥  error: 参数输入错误，请重新输入……  \033[0m"
        echo -e "\033[32m > ♻️  参数: @param1 @param2 (@param1:web/app/webeg/appeg; @param2:--no-minify) \033[0m"
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

