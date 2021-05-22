import Message from './Message.vue'
const messageObj = {}
messageObj.install = function(Vue) {
  const messageConstructor = Vue.extend(Message)
  const message = new messageConstructor()

  message.$mount(document.createElement('div'))
  document.body.appendChild(message.$el)
  Vue.prototype.$message = message
}
export default messageObj