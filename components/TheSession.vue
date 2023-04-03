<script setup>
const { data } = await useFetch('/api/sessions')

const sessions = useState('sessions', () => data.value?.rows)

// const currentSessionId = useState('currentSessionId', () => null)
const totalSeconds = sessions.value.reduce((total, session) => {
  return total + session.seconds
}, 0)
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

  Итого: {{ new Date(totalSeconds * 1000 - 3 * 60 * 60 * 1000).toLocaleTimeString() }}
</template>