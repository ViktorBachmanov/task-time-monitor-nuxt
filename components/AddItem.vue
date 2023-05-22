<script setup>
import { ref } from 'vue'

const props = defineProps({
  header: String,
  url: String,
  payload: {
    type: Object,
    default: null
  }
})

const isActive = ref(false)

function handleAdding(itemName) {
  isActive.value = false

  const { data, pending } = useFetch(props.url, {
    method: 'POST',
    body: {
      itemName,
      ...props.payload,
    }
  })
}
</script>


<template>
  <button @click="isActive = true">
    <IconPlusButton />
  </button>

  <AddItemDialog 
    v-if="isActive"
    @close="isActive = false"
    @ok="handleAdding"
  >
    <template v-slot:header>{{ header }}</template>
  </AddItemDialog>
</template>