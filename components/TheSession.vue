<script setup>
const { data } = await useFetch('/api/sessions')

const sessions = data.value?.rows;

const currentSessionId = useState('currentSessionId', () => null)
</script>


<template>
  <div>
    Сеансы
  </div>

  <ul>
    <li
      v-for="session in sessions"
      :key="sessions.id"
    >
      {{ new Date(session.created_at).toLocaleTimeString() }} {{ session.task_name }}
    </li>
  </ul>
</template>