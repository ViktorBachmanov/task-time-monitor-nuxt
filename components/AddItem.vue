<script setup>

const props = defineProps({
  header: String,
  url: String,
  payload: {
    type: Object,
    default: null
  },
  successMessage: String
})

const emit = defineEmits(['added'])

const isActive = ref(false)
const isPending = ref(false)
const notification = ref(null)

async function handleAdding(itemName) {
  isPending.value = true

  const { data, error } = await useFetch(props.url, {
    method: 'POST',
    body: {
      itemName,
      ...props.payload,
    }
  })

  if(data.value) {
    notification.value.success(props.successMessage)
    emit('added', data.value.createdItem.id)
  }
  else if(error.value) {
    notification.value.error('Ошибка')
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

  <TheNotification ref="notification" />
</template>