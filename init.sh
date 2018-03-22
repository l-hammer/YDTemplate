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

	read -p "Proxy($proxy) " val
	newProxy=${val:-$proxy}
	sed -i "" "s/$proxy/$newProxy/g" $file

	read -p "Server($server) " val
	newServer=${val:-$server}
	sed -i "" "s#$server#$newServer#g" $file
}

initProject

