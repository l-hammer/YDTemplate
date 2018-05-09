const path = require('path')
const fs = require('fs')

module.exports = {
  prompts: {
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
      message: "Author",
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
  filters: {
    'configs/meta.js': false,
    'init.sh': false,
    'src/web/*': "type === 'web'",
    'src/examples/web/*': "type === 'web'",
    'src/assets/modal/*': "type === 'web'",
    'src/assets/perfect-scrollbar/*': "type === 'web'",
    'src/assets/components/web/*': "type === 'web'",
    'src/assets/web.scss': "type === 'web'",
    'src/assets/examples/web.scss': "type === 'web'",
    'src/app/**/*': "type === 'wx' || type === 'h5'",
    'src/examples/app/**/*': "type === 'wx' || type === 'h5'",
    'src/components/**/*': "type === 'wx' || type === 'h5'",
    'src/assets/components/app/*': "type === 'wx' || type === 'h5'",
    'src/assets/app.scss': "type === 'wx' || type === 'h5'",
    'src/assets/examples/app.scss': "type === 'wx' || type === 'h5'",
  },
  skipInterpolation: [
    'build.sh',
    'push.sh',
    'bin/autocopy.py',
    'src/vetar/index.js',
    'src/app/template/index.tpl',
    'src/app/views/record.vue',
    'src/examples/app/template/riseseason.tpl',
    'src/examples/app/views/index.vue'
  ],
  complete: function(data, { chalk }) {
    const green = chalk.green
    const yellow = chalk.yellow
    const magenta = chalk.magenta
    const message = `
# ${green(`Project initialization finished!`)}
# ==================================

👨‍💻 To get started:

  ${yellow(
    `${data.inPlace ? '  ' : `  cd ${data.destDirName}\n    `}npm install (or if using yarn: yarn)\n    ${data.type === 'web' ? 'npm run dev:web or npm run start:web' : 'npm run dev or npm run start'}`
  )}

🌏 Documentation can be found at ${magenta('https://github.com/l-hammer/YDTemplate')}
`
    console.log(message)
  }
}
