<script setup>

const props = defineProps({
  header: String,
  label: String,
  url: String,
  payload: {
    type: Object,
    default: null
  },
  successMessage: String,
  disabled: Boolean,
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
  <v-btn 
    :disabled="disabled"
    icon
    rounded="lg"
    variant="tonal"
    @click="isActive = true"
  >
    <v-icon icon="mdi-plus" size="x-large"></v-icon>
  </v-btn>

  <v-dialog
    v-model="isActive"
    width="auto"
  >
    <v-card>
      <v-card-text>
        {{ header }}
      </v-card-text>
      <v-text-field :label="label" variant="outlined"></v-text-field>
      <v-card-actions>
        <v-btn color="primary" block @click="isActive = false">Cancel</v-btn>
      </v-card-actions>
    </v-card>
    
  </v-dialog>

  <TheNotification ref="notification" />
</template>


<style lang="scss" scoped>
button.disabled {
  opacity: 0.5;
  pointer-events: none;
}
</style>