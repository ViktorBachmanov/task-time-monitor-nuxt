


<template>
  <Transition appear>
    <div class="dialog-background">
      <div class="dialog">
        <slot name="header"></slot>

        <button @click="$emit('close')">Cancel</button>
      </div>
    </div>
  </Transition>
</template>


<style lang="scss" scoped>
.dialog-background {
  background-color: rgba(100, 100, 100, 0.5);
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;

  .dialog {
    min-width: 200px;
    min-height: 120px;
    background-color: silver;
    padding: 0.5em;
    color: black;

    button {
      border-radius: 0.5em;
      border: 1px solid gray;
      padding: 0.5em;
    }
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