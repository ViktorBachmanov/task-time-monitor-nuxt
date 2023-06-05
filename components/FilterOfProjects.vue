<script setup>
const projects = useState('projects')

defineProps(['modelValue'])
defineEmits(['update:modelValue'])

</script>


<template>
  <select
    :value="modelValue"
    @change="$emit('update:modelValue', $event.target.value)"
  >
    <option value="all">Все</option>
    <option 
      v-for="project of projects" 
      :key="project.id"
      :value="project.id"
    >
      {{ project.name }}
    </option>
  </select>
</template>