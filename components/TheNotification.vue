<script setup>
const message = ref('')
const status = ref('')  // success | error
const active = ref(false)

function success(text) {
  message.value = text
  status.value = 'success'
  active.value = true
}

function error(text) {
  message.value = text
  status.value = 'error'
  active.value = true
}

function reset() {
  message.value = ''
  status.value = ''
  active.value = false
}


function onBeforeEnter(el) {
  setTimeout(() => {
    reset()
  }, 3000)
}

defineExpose({
  success,
  error,
})

</script>


<template>
  <Transition
    @before-enter="onBeforeEnter"
  >
    <div 
      v-if="active"
      class="my-notify"
      :class="status"
    >
      {{ message }}
    </div>
  </Transition>
</template>


<style lang="scss" scoped>
.my-notify {
  position: fixed;
  right: 10px;
  bottom: 10px;
  padding: 1em;
  border-radius: 1em;

  &.success {
    background-color: rgb(70, 190, 120);
    color: white;
  }

  &.error {
    background-color: rgb(190, 70, 104);
    color: white;
  }
}

.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>