import PopBox from './PopBox.vue'
const popBoxObj = {}
popBoxObj.install = function(Vue) {
  const popboxConstructor = Vue.extend(PopBox)
  const popbox = new popboxConstructor()

  popbox.$mount(document.createElement('div'))
  document.body.appendChild(popbox.$el)
  Vue.prototype.$popbox = popbox
}
export default popBoxObj