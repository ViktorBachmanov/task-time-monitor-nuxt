<script setup>
import { ref } from "vue"

defineProps({
  isPending: Boolean,
})

const itemName = ref('')
</script>


<template>
  <Transition appear>
    <div class="dialog-background">
      <div class="dialog">
        <slot name="header"></slot>

        <label>
          Имя
          <input v-model="itemName">
        </label>

        <div class="buttons">
          <button @click="$emit('ok', itemName)">Ok</button>
          <button @click="$emit('close')">Cancel</button>
        </div>

        <Transition appear>
          <div v-if="isPending" class="pending">
          </div>
        </Transition>
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
    background-color: rgb(217, 205, 205);
    padding: 0.5em;
    color: black;
    display: flex;
    flex-direction: column;
    row-gap: 0.5em;
    position: relative;

    label {
      display: flex;
      flex-direction: column;

      input {
        background-color: white;
        color: black;
        padding: 0.25em;
      }
    }

    .buttons {
      display: flex;
      justify-content: space-evenly;

      button {
        border-radius: 0.5em;
        border: 1px solid gray;
        padding: 0.5em;
      }
    }

    .pending {
      position: absolute;
      left: 0;
      top: 0;
      min-width: 100%;
      min-height: 100%;
      background-color: rgba(100, 100, 100, 0.5);
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