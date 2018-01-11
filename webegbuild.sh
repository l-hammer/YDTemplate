#!/usr/bin/env bash
# @describe:
# @author:   LHammer(LHammering@gmail.com)

#set -x

# vim:set ts=4 sw=4 et fdm=marker:

# 打包成功后调用自动拷贝脚本

npm run webegbuildmin &&

python autocopy.py

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

