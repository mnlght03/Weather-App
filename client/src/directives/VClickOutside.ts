export default {
  mounted(el, binding: any) {
    el.clickOutside = function (event) {
      if (!(el === event.target || el.contains(event.target))) {
        binding.value()
      }
    }
    document.body.addEventListener('mousedown', el.clickOutside)
  },
  unmounted(el) {
    document.body.removeEventListener('mousedown', el.clickOutside)
  }
}
