<script setup>
const { data } = await useFetch('/api/tasks')
// const response = await fetch('http://localhost:3000/api/tasks');
// const data = await response.json();

const tasks = ref(data.value?.rows);
// const tasks = useState('tasks', () => data.value?.rows);

// const tasks = useState<any>('tasks', () => data.value?.rows)

const currentTaskId = useState('currentTaskId', () => 1)

const newTaskName = ref(null)

async function handleAddTask() {
  const { data } = await useFetch('/api/tasks', {
    method: 'POST',
    body: {
      newTaskName: newTaskName.value,
    },
  })  

  tasks.value.push(data.value.createdTask)
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
      v-for="task in tasks" 
      :key="task.id"
      :value="task.id"
    >
      {{ task.name }}
    </option>
  </select>

  <ul>
    <li
      v-for="task in tasks"
      :key="task.id"
    >
      {{ task.name }}
    </li>
  </ul>
</template>