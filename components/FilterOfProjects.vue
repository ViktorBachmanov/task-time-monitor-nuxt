<script setup>
// const projects = useState('projects')
// defineProps({
//   modelValue,
//   projects: Array,
// })

defineProps(['modelValue', 'projects'])
defineEmits(['update:modelValue'])

</script>


<template>
  <select
    :value="modelValue"
    @change="$emit('update:modelValue', $event.target.value)"
  >
    <option value="all">Все</option>
    <option 
      v-for="(projectName, projectId) of projects" 
      :key="projectId"
      :value="projectId"
    >
      {{ projectName }}
    </option>
  </select>
</template>