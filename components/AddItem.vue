<script setup>
import { ref } from 'vue'
import {useToast} from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-sugar.css';

const props = defineProps({
  header: String,
  url: String,
  payload: {
    type: Object,
    default: null
  }
})

const isActive = ref(false)
const isPending = ref(false)

async function handleAdding(itemName) {
  isPending.value = true

  const { data, pending, error } = await useFetch(props.url, {
    method: 'POST',
    body: {
      itemName,
      ...props.payload,
    }
  })

  const $toast = useToast();

  if(data.value) {
    $toast.success('You did it!');
  }
  else if(error.value) {
    $toast.error('Error');
  }


  isActive.value = false
  isPending.value = false
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
    :isPending="isPending"
  >
    <template v-slot:header>{{ header }}</template>
  </AddItemDialog>
</template>