#!/usr/bin/env bash
# @describe:
# @author:   LHammer(LHammering@gmail.com)

#set -x

# vim:set ts=4 sw=4 et fdm=marker:

# 为了避免将build后的template.tpl文件push到仓库，建议使用脚本push代码，而不是直接使用git push（默认推送当前所在分支）;
# 注：直接使用git push推送代码需要修改push.default的默认行为。执行命令：$ git config --global push.default 'current' 
n=`grep -n '{{htmlCod}}' './src/app/template.tpl' './src/web/template.tpl'`
if [ ${#n} == 0 ]
then
    echo "> 🚨  warning: 为了保证每次build时可以准确的替换template.tpl中的字符串，请将build后的template.tpl恢复后再push到仓库"
    git reset --mixed HEAD^
else
    git push
fi