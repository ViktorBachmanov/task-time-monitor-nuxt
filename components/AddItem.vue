<script setup>
import { ref } from 'vue'

defineProps({
  header: String,
})

const isActive = ref(false)
</script>


<template>
  <button @click="isActive = true">
    <IconPlusButton />
  </button>

  <AddItemDialog 
    v-if="isActive"
    @close="isActive = false"
  >
    <template v-slot:header>{{ header }}</template>
  </AddItemDialog>
</template>