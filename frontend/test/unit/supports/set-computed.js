export default function setComputed (wrapper, computed) {
  if (!wrapper.isVueInstance()) {
    throw new Error('wrapper.setComputed() can only be called on a Vue instance')
  }

  Object.keys(computed).forEach(key => {
    if (!wrapper.vm._computedWatchers[key]) {
      throw new Error(
        'setComputed() was passed a value that does not exist as a computed ' +
        'property on the Vue instance. Property ' + key + ' does not exist ' +
        'on the Vue instance'
      )
    }
    wrapper.vm._computedWatchers[key].value = computed[key]
    wrapper.vm._computedWatchers[key].getter = () => computed[key]
  })

  wrapper.vm._watchers.forEach(watcher => {
    watcher.run()
  })
}
