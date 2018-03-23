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
	read -p "Project name($name) " val
	projectName=${val:-$name}
	sed -i "" "s/$name/$projectName/g" $file

	read -p "Project type($type) " val
	projectType=${val:-$type}
	sed -i "" "s/$type/$projectType/g" $file

	read -p "ProxyUser($proxyUser) " val
	newProxyUser=${val:-$proxyUser}
	sed -i "" "s/$proxyUser/$newProxyUser/g" $file

	read -p "ServerPort($serverPort) " val
	newServerPort=${val:-$serverPort}
	sed -i "" "s#$serverPort#$newServerPort#g" $file
}

initProject

