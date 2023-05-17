<script setup>
const { data, refresh } = await useFetch('/api/tasks')

// const tasks = ref(data.value?.rows);

const currentTaskId = useState('currentTaskId', () => 1)

const newTaskName = ref(null)

async function handleAddTask() {
  const { data } = await useFetch('/api/tasks', {
    method: 'POST',
    body: {
      newTaskName: newTaskName.value,
    },
  })  

  // tasks.value.push(data.value.createdTask)
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