function buildConfig(env) {
  if (env === 'dev') {
    console.warn('Webpack will use dev config.')
  }
  return require('./webpack.' + env + '.js')({env: env});
}

module.exports = buildConfig;
