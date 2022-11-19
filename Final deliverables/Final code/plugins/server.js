import Vue from 'vue'

export default ({ app }, inject) => {
  inject('server', Vue.observable({ url: 'http://1214-34-90-66-30.ngrok.io' + '/' }))
}