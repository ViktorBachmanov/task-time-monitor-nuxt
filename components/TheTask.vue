<script setup>
const props = defineProps({
  projectId: Number
})

// const fetchResult = computed(async () => {
//   return await useFetch(`/api/tasks?project-id=${props.projectId}`)
// })

const { data, refresh } = await useFetch(() => `/api/tasks?project-id=${props.projectId}`)

watch(() => props.projectId, async () => {
  // console.log('project id changed')
  await refresh();

  currentTaskId.value = data.value.rows[0].id;
})

const currentTaskId = useState('currentTaskId', () => 1)

const newTaskName = ref(null)

async function handleAddTask() {
  const { data } = await useFetch('/api/tasks', {
    method: 'POST',
    body: {
      newTaskName: newTaskName.value,
    },
  })  

  refresh();
}
</script>


<template>
  <div>
    Задачи
  </div>

  <input v-model="newTaskName">

  <IconPlusButton 
    @click="handleAddTask"
  />

  <select v-model="currentTaskId">
    <option 
      v-for="task in data.rows" 
      :key="task.id"
      :value="task.id"
    >
      {{ task.name }}
    </option>
  </select>

 
</template>