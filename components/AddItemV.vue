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

const itemName = ref('')

const rules = [
  value => {
    if (value) return true

    return 'Заполните поле'
  },
]

const isFormValid = ref(null)


async function handleSubmit() {
  if(!isFormValid.value) {
    return
  }

  pending.value = true

  const { data, error } = await useFetch(props.url, {
    method: 'POST',
    body: {
      itemName: itemName.value,
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
  itemName.value = ''

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
      <v-form 
        @submit.prevent="handleSubmit"
        v-model="isFormValid"
        style="margin: 1.5em 0.5em 0.5em"
      >
        <v-text-field 
          label="Наименование" 
          variant="outlined"
          v-model="itemName"
          :rules="rules"
          autofocus
          style="margin-bottom: 1em"
        >
        </v-text-field>

        <div style="display: flex; justify-content: center; column-gap: 1em;">
          <v-btn 
            color="primary" 
            type="submit" 
            :loading="pending"
          >
            Ok
          </v-btn>

          <v-btn 
            color="primary"  
            @click="dialog = false" 
            :loading="pending"
          >
            Cancel
          </v-btn>
        </div>

      </v-form>

    </v-card>
    
  </v-dialog>

  <TheNotification ref="notification" />
</template>

