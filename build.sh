#--------------------------------------------
#!/usr/bin/env bash
# @describe:
# @author:   LHammer(LHammering@gmail.com)
#--------------------------------------------
# set -x
# vim:set ts=4 sw=4 et fdm=marker:

# 打包成功后自动拷贝

source ./configs/init.ini

month=$(date +%m)
prevMonth=$((month-1))
pType=yindou_02/application/views/$type/events/2018/
web=yindou_02/application/views/web/events/2018/
proxy=$proxyUser@118.190.101.187
server=www@10.30.214.232:/home/www/

if [[ $prevMonth -gt 0 && $prevMonth -lt 10 ]]; then
    prevMonth=0$prevMonth
elif [ $prevMonth -eq 0 ]; then
    prevMonth=12
fi

if [ ! $1 ]; then
    echo -e "\033[33m > 🚨  warning: 请输入参数@param1 @param2 (@param1:web/app/webeg/appeg; @param2:--no-minify) \033[0m"
else
    rm -rf dist/ && \
    git co *.tpl && \
    if [[ $1 == "web" && ! $2 ]]; then
        tempFile=./src/web/*.tpl
        tempFileBase=`basename $tempFile`
        npm run webbuildmin && \
        python ./bin/autocopy.py $1 && \

        # see https://linux.cn/article-7456-1.html && http://man.linuxde.net/scp
        scp -P $serverPort -rq -o ProxyCommand='ssh '$proxy' -p 21222 -A -W %h:%p' $server$web$prevMonth ./src/web && \
        prevMonthDir=./src/web/$prevMonth
        scp -P $serverPort -rq -o ProxyCommand='ssh '$proxy' -p 21222 -A -W %h:%p' $server$web$month ./src/web && \
        monthDir=./src/web/$month
        if [ -e $prevMonthDir/$tempFileBase ]; then
            scp -P $serverPort -rq -o ProxyCommand='ssh '$proxy' -p 21222 -A -W %h:%p' $tempFile $server$web$prevMonth && \
            echo -e "\n\033[32m🚚  Scp $tempFileBase to $web$prevMonth done \033[0m\n"
        elif [ ! -d $monthDir ]; then
            mkdir -p "./src/web/$month" && \
            monthDir=./src/web/$month
            cp $tempFile "$monthDir" && \
            scp -P $serverPort -rq -o ProxyCommand='ssh '$proxy' -p 21222 -A -W %h:%p' $monthDir $server$web && \
            echo -e "\n\033[32m🚚  Make $month dir && Scp $month/$tempFileBase to $web done \033[0m\n"
        else
            scp -P $serverPort -rq -o ProxyCommand='ssh '$proxy' -p 21222 -A -W %h:%p' $tempFile $server$web$month && \
            echo -e "\n\033[32m🚚  Scp $tempFileBase to $web$month done \033[0m\n"
        fi
        rm -rf $prevMonthDir
        rm -rf $monthDir
    elif [[ $1 == "web" && $2 == "--no-minify" ]]; then
        npm run webbuild && \
        python ./bin/autocopy.py web
    elif [[ $1 == "app" && ! $2 ]]; then
        tempFile=./src/app/*.tpl
        tempFileBase=`basename $tempFile`
        npm run appbuildmin && \
        python ./bin/autocopy.py $1 && \
        scp -P $serverPort -rq -o ProxyCommand='ssh '$proxy' -p 21222 -A -W %h:%p' $server$pType$prevMonth ./src/app && \
        prevMonthDir=./src/app/$prevMonth
        scp -P $serverPort -rq -o ProxyCommand='ssh '$proxy' -p 21222 -A -W %h:%p' $server$pType$month ./src/app && \
        monthDir=./src/app/$month
        if [ -e $prevMonthDir/$tempFileBase ]; then
            scp -P $serverPort -rq -o ProxyCommand='ssh '$proxy' -p 21222 -A -W %h:%p' $tempFile $server$pType$prevMonth && \
            echo -e "\n\033[32m🚚  Scp $tempFileBase to $pType$prevMonth done \033[0m\n"
        elif [ ! -d "./src/app/$month" ]; then
            mkdir -p "./src/app/$month" && \
            monthDir=./src/app/$month
            cp $tempFile "$monthDir" && \
            scp -P $serverPort -rq -o ProxyCommand='ssh '$proxy' -p 21222 -A -W %h:%p' $monthDir $server$pType && \
            echo -e "\n\033[32m🚚  Make $month dir && Scp $month/$tempFileBase to $pType done \033[0m\n"
        else
            scp -P $serverPort -rq -o ProxyCommand='ssh '$proxy' -p 21222 -A -W %h:%p' $tempFile $server$pType$month && \
            echo -e "\n\033[32m🚚  Scp $tempFileBase to $pType$month done \033[0m\n"
        fi
        rm -rf $prevMonthDir && \
        rm -rf $monthDir && \
        git co *.tpl
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

