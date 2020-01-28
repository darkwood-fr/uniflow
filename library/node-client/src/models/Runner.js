const bashBridge = require('../bridges/bash')
const consoleBridge = require('../bridges/console')
const filesystemBridge = require('../bridges/filesystem')
const readlineBridge = require('../bridges/readline')
const processBridge = require('../bridges/process')
const axiosBridge = require('../bridges/axios')
const httpBridge = require('../bridges/http')
const querystringBridge = require('../bridges/querystring')
const child_processBridge = require('../bridges/child_process')
const vm = require('vm')

function Runner(commandArgs, api) {
  this.commandArgs = commandArgs
  this.api = api
}

Runner.prototype.run = function(rail) {
  const context = new vm.createContext({
    Bash: bashBridge(this.commandArgs),
    console: consoleBridge,
    filesystem: filesystemBridge,
    readline: readlineBridge,
    process: processBridge,
    axios: axiosBridge,
    http: httpBridge,
    querystring: querystringBridge,
    child_process: child_processBridge,
  })

  return rail.reduce((promise, flow) => {
    return promise.then(() => {
      return vm.runInContext(flow.codes.node || '', context)
    })
  }, Promise.resolve())
}

module.exports = Runner
