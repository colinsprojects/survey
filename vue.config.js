module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
  ? '/colinsprojects.github.io/'
  : '/',
  "transpileDependencies": [
    "vuetify"
  ]
 
}