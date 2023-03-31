<script setup>
const { data } = await useFetch('/api/tasks')
// const response = await fetch('http://localhost:3000/api/tasks');
// const data = await response.json();
const tasks = data.value?.rows;

// const tasks = useState<any>('tasks', () => data.value?.rows)
// const tasks = useState<any>('tasks', () => data?.rows)
</script>


<template>
  <div>
    Задачи
  </div>

  <ul>
    <li
      v-for="task in tasks"
      :key="task.id"
    >
      {{ task.name }}
    </li>
  </ul>
</template>