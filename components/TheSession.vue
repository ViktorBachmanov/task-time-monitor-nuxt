<script setup>
const { data } = await useFetch('/api/sessions')

const sessions = useState('sessions', () => data.value?.rows)

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
      {{ new Date(session.created_at).toLocaleTimeString() }} - 
      {{ new Date(session.closed_at).toLocaleTimeString() }} =
      {{ new Date(new Date(session.closed_at) - new Date(session.created_at) - 3 * 60 * 60 * 1000).toLocaleTimeString() }} |
       {{ session.task_name }}
    </li>
  </ul>
</template>