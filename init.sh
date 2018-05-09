#--------------------------------------------
# !/usr/bin/env bash
# @describe: init project
# @author: LHammer(LHammering@gmail.com)
#--------------------------------------------
# set -x
# vim:set ts=4 sw=4 et fdm=marker:

file=./configs/init.ini

source $file

function initProject {
  read -p "? Enter a project name($name) " val
  projectName=${val:-$name}
  sed -i "" "s/$name/$projectName/g" $file

  mv ./src/app/template/*.tpl ./src/app/template/$projectName.tpl && \
  mv ./src/web/*.tpl ./src/web/$projectName.tpl && \
  mv ../YDTemplate ../YD$projectName && \

  read -p "? Enter your project type($type) " val
  projectType=${val:-$type}
  sed -i "" "s/$type/$projectType/g" $file

  read -p "? Enter ProxyUser($proxyUser) " val
  newProxyUser=${val:-$proxyUser}
  sed -i "" "s/$proxyUser/$newProxyUser/g" $file

  read -p "? Enter ServerPort($serverPort) " val
  newServerPort=${val:-$serverPort}
  sed -i "" "s#$serverPort#$newServerPort#g" $file

  rm -rf .git && \
  git add ./ && \
  git commit -m ':tada:initialization template……' && \
  git pull origin master && \
  git push -u origin master && \
  cd ../YD$projectName && \

  echo -e "\n# ========================"
  echo -e "\x1B[36mproject: { \n    name: $projectName,\n    type: $projectType,\n    proxyUser: $newProxyUser,\n    serverPort: $newServerPort\n}\x1B[0m"
  echo -e "# ========================"
}

initProject

echo -e "\n#\033[32m Project initialization finished! \033[0m\n\nTo get started:\n\n \033[33m npm run dev or npm run start \033[0m\n"
