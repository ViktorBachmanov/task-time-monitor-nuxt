<script setup>

const props = defineProps({
  header: String,
  url: String,
  payload: {
    type: Object,
    default: null
  },
  successMessage: String,
  disabled: Boolean,
})

const emit = defineEmits(['added'])

const dialog = ref(false)
const pending = ref(false)
const notification = ref(null)


async function handleAdding(itemName) {
  
  pending.value = true

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

  pending.value = false
  dialog.value = false

}
</script>


<template>
  <v-btn 
    :disabled="disabled"
    icon
    rounded="lg"
    variant="tonal"
    @click="dialog = true"
  >
    <v-icon icon="mdi-plus" size="x-large"></v-icon>
  </v-btn>

  <v-dialog
    v-model="dialog"
    width="auto"
  >
    <v-card 
      style="padding: 0 0.5em 0.5em"
      :title="header"
    >
      <AddItemForm 
        :loading="pending"
        @add-item="handleAdding"
        @cancel="dialog = false"
      />

    </v-card>
    
  </v-dialog>

  <TheNotification ref="notification" />
</template>

