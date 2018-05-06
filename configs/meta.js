const path = require('path')
const fs = require('fs')

module.exports = {
  prompts = {
    name: {
      type: "string",
      require: true,
      message: "Project name",
      default: "YDTemplate"
    },
    description: {
      type: "string",
      message: "Project description",
      default: "A YDTemplate project"
    },
    author: {
      type: "string",
      message: "Project description",
      default: "LHammer"
    },
    type: {
      type: "list",
      message: "Project type",
      choices: ['wx', 'h5', 'web'],
      default: 'wx'
    },
    proxyUser: {
      type: "string",
      message: "Proxy springboard username",
      default: 'songhw'
    },
    serverPort: {
      type: "string",
      message: "Proxy server port",
      default: '38'
    },
  },
  complete: function(data, { chalk }) {
    const green = chalk.green
    const yellow = chalk.yellow
    const message = `
      # ${green(`Project initialization finished!`)}
      # ==============================

      To get started:

      ${yellow(`
        ${data.inPlace ? '' : `cd ${data.destDirName}\n`}npm install \n npm run dev or npm run start
      `)}
    `
    console.log(message)
  }
}
