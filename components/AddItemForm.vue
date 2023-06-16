<script setup>
defineProps({
  loading: Boolean,
})

const isFormValid = ref(null)

const itemName = ref('')

const emit = defineEmits(['addItem', 'cancel'])

const rules = [
  value => {
    if (value) return true

    return 'Заполните поле'
  },
]


function handleSubmit() {
  if(!isFormValid.value) {
    return
  }

  emit('addItem', itemName.value)
}

function handleCancel() {
  emit('cancel')
}
</script>


<template>
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
        :loading="loading"
      >
        Ok
      </v-btn>

      <v-btn 
        color="primary"  
        @click="handleCancel" 
        :loading="loading"
      >
        Cancel
      </v-btn>
    </div>

  </v-form>
</template>