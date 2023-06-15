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

const isActive = ref(false)
const isPending = ref(false)
const notification = ref(null)

const itemName = ref('')

async function handleAdding() {
  isPending.value = true

  const { data, error } = await useFetch(props.url, {
    method: 'POST',
    body: {
      itemName: itemName.value,
      ...props.payload,
    }
  })

  itemName.value = ''

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

const rules = [
  value => {
    if (value) return true

    return 'Заполните поле'
  },
]

const isFormValid = ref(null)

function handleSubmit() {
  console.log('isFormValid: ', isFormValid.value)

  if(!isFormValid.value) {
    alert('not valid')
  }
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

      <v-form 
        @submit.prevent="handleSubmit"
        v-model="isFormValid"
      >
        <v-text-field 
          label="Наименование" 
          variant="outlined"
          v-model="itemName"
          :rules="rules"
          validate-on="blur"
          autofocus
        >
        </v-text-field>

        <v-btn color="primary" type="submit">Ok</v-btn>
        <v-btn color="primary"  @click="isActive = false">Cancel</v-btn>
      </v-form>

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