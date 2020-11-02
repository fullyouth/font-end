module.exports = {
  port: {
      option: '-p,--port <v>', // program.option('-p,--port<val>','xxx')
      descriptor: 'set you server port',
      usage: 'zs --port 3000',
      default: 3000
  },
  root:{
      option: '-r,--root <v>', // program.option('-p,--port<val>','xxx')
      descriptor: 'set you server start directory',
      usage: 'zs --direactory D:',
      default: process.cwd()
  }
}