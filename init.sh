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

	mv ./src/app/*.tpl ./src/app/$projectName.tpl && \
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

	cd ../YD$projectName && \
	git init && \
	rm -rf ./.git && \
	git remote add origin ssh://git@139.129.97.36:10022/back-end/fe-dev.git && \
	git push -u origin master && \


	echo -e "\n# ========================"
	echo -e "\x1B[36mproject: { \n    name: $projectName,\n    type: $projectType,\n    proxyUser: $newProxyUser,\n    serverPort: $newServerPort\n}\x1B[0m"
	echo -e "# ========================"
}

initProject

echo -e "\n#\033[32m Project initialization finished! \033[0m\n\nTo get started:\n\n \033[33m npm run appstart or npm run webstart \033[0m\n"