#--------------------------------------------
# !/usr/bin/env bash
# @describe: init project
# @author: LHammer(LHammering@gmail.com)
#--------------------------------------------
# set -x
# vim:set ts=4 sw=4 et fdm=marker:

file=./configs/init.ini

source $file

# function initProject {
  # read -p "? Enter a project name($name) " val
  # projectName=${val:-$name}
  # sed -i "" "s/$name/$projectName/g" $file

  # mv ./src/app/template/*.tpl ./src/app/template/$projectName.tpl && \
  # mv ./src/web/*.tpl ./src/web/$projectName.tpl && \
  # mv ../YDTemplate ../YD$projectName && \

  # read -p "? Enter your project type($type) " val
  # projectType=${val:-$type}
  # sed -i "" "s/$type/$projectType/g" $file

  # read -p "? Enter ProxyUser($proxyUser) " val
  # newProxyUser=${val:-$proxyUser}
  # sed -i "" "s/$proxyUser/$newProxyUser/g" $file

  # read -p "? Enter ServerPort($serverPort) " val
  # newServerPort=${val:-$serverPort}
  # sed -i "" "s#$serverPort#$newServerPort#g" $file

  # rm -rf .git && \
  # git add ./ && \
  # git commit -m ':tada:initialization template……' && \
  # git pull origin master && \
  # git push -u origin master && \
  # cd ../YD$projectName && \

  # echo -e "\n# ========================"
  # echo -e "\x1B[36mproject: { \n    name: $projectName,\n    type: $projectType,\n    proxyUser: $newProxyUser,\n    serverPort: $newServerPort\n}\x1B[0m"
  # echo -e "# ========================"
# }

# initProject

# echo -e "\n#\033[32m Project initialization finished! \033[0m\n\nTo get started:\n\n \033[33m npm run dev or npm run start \033[0m\n"

function git-branch {
  git symbolic-ref HEAD 2>/dev/null | cut -d"/" -f 3
}

function git-status {
  git status 2> /dev/null | tail -n1 || git status 2> /dev/null | head -n 2 | tail -n1
}

function git-prompt {
  local branch=`git-branch`
  local git_status=`git-status`
  local git_now; # 标示

  if [[ "$git_status" =~ nothing\ added\ to\ commit || "$git_status" =~  Your\ branch\ is\ up\-to\-date\ with ]]; then
    if [[ $branch == 'master' ]]; then
      echo -e "\n\033[33m🚨 WARNING: No permission on branch master, please create a new branch for development~ \033[0m\n"
      echo -e "👨‍💻 Suggest to options :\033[36m $ git co -b ${name} \033[0m\n"
    else
      git add ./ && \
      git commit -m ':tada:initialization template……' && \
      git pull origin $branch && \
      git push -u origin $branch
    fi
  elif [[ "$git_status" =~ Changes\ not\ staged || "$git_status" =~ no\ changes\ added ]]; then
    git_now="~ please commit changes not staged"
  elif [[ "$git_status" =~ Changes\ to\ be\ committed ]]; then
    git_now="* please commit changes"
  elif [[ "$git_status" =~ Untracked\ files ]]; then
    git_now="+ please commit untracked files"
  elif [[ "$git_status" =~ Your\ branch\ is\ ahead ]]; then
    git_now="# your branch is ahead, please commit"
  fi

  if [ "$git_now" ]; then
    echo -e "\n\033[31m💥 ERROR: ${git_now} \033[0m\n"
  fi
}

git-prompt
