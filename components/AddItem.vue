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
  <!-- <button 
    :class="$attrs.class"
    @click="isActive = true"
  >
    <PlusButtonIcon />
  </button> -->

  <v-btn 
    @click="isActive = true"
    :disabled="disabled"
  >
    <v-icon icon="mdi-plus-box-outline" size="x-large"></v-icon>
  </v-btn>

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


<style lang="scss" scoped>
button.disabled {
  opacity: 0.5;
  pointer-events: none;
}
</style>