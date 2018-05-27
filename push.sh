#!/usr/bin/env bash
# @describe: 在开发app应用时，不需要再使用次脚本
# @author: LHammer(LHammering@gmail.com)

#set -x

# vim:set ts=4 sw=4 et fdm=marker:

# 为了避免将 build 后的 template.tpl 文件 push 到仓库，建议使用脚本 push 代码，而不是直接使用 git push（默认推送当前所在分支）;
# 注：直接使用 git push 推送代码需要修改 push.default 的默认行为。执行命令：$ git config --global push.default 'current' 
n=`grep -n '<{% htmlCode %}>' './src/app/template.tpl' './src/web/template.tpl'`
if [ ${#n} == 0 ]
then
  echo "> 🚨  warning: 为了保证每次 build 时可以准确的替换 template.tpl 中的字符串，已禁止将 build 后的 template.tpl push 到仓库，"
  echo "-----------------------------------------------"
  git reset --mixed HEAD^ && \
  git co *.tpl
  echo "-----------------------------------------------"
  echo "> 🤡  本次提交和 template.tpl 的更改已被撤销，请重新提交即可"
else
  git push
fi
