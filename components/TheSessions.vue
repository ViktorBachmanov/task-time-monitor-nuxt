<script setup>
import { ref } from 'vue'


const currentSessionId = ref(null)


const currentTaskId = useState('currentTaskId')



const { data, refresh } = await useFetch('/api/sessions')


const totalSeconds = computed(() => data.value.rows.reduce((total, session) => {
  return total + session.seconds
}, 0))

const compact = computed(() => {
  const obj = {};
  data.value.rows.forEach((session) => {
    if(!(session.task_id in obj)) {
      obj[session.task_id] = {
        task_name: session.task_name,
        seconds: session.seconds
      }
    }
    else {
      obj[session.task_id].seconds += session.seconds
    }
  })

  return obj
})

const representation = ref('common')  // common | compact

const sessions = computed(() => {
  return representation.value === 'common'
    ? data.value.rows
    : compact.value
})

function formatTime(session) {
  switch(representation.value) {
    case 'common':
      return `${new Date(session.created_at).toLocaleTimeString()} - 
        ${new Date(session.closed_at).toLocaleTimeString()} = 
        ${new Date(new Date(session.closed_at) - new Date(session.created_at) - 3 * 60 * 60 * 1000).toLocaleTimeString()}`
    case 'compact':
      return new Date(session.seconds * 1000 - 3 * 60 * 60 * 1000).toLocaleTimeString()
  }
}

function toggleRepresentation() {
  switch(representation.value) {
    case 'common':
      representation.value = 'compact'
      break
    case 'compact':
      representation.value = 'common'
      break
  }
}

async function createSession() {
  const { data } = await useFetch('/api/sessions', {
    method: 'POST',
    body: {
      currentTaskId: currentTaskId.value,
    },
  })  

  currentSessionId.value = data.value.session.id;
}

async function updateSession() {
  const { data } = await useFetch('/api/sessions', {
    method: 'PUT',
    body: {
      currentSessionId: currentSessionId.value,
    },
  })  

  refresh()
}
</script>


<template>
  <ThePlayer
    :currentSessionId="currentSessionId"
    @play="createSession"
    @update="updateSession"
    @stop="updateSession"
  />

  <div>
    Сеансы
  </div>

  <button @click="toggleRepresentation">Rep</button>

  <table width="1em">
    <thead>
      <tr>
        <th width="1em">Задачи</th>
        <th width="1em">Время</th>
      </tr>
    </thead>

    <tbody>
      <tr v-for="session in sessions">
        <td style="white-space: nowrap;">{{ session.task_name }}</td>
        <td style="white-space: nowrap;">{{ formatTime(session) }}</td>
      </tr>
    </tbody>
  </table>

  <!-- <ul>
    <li
      v-for="session in data.rows"
      :key="session.id"
    >
      {{ new Date(session.created_at).toLocaleTimeString() }} - 
      {{ new Date(session.closed_at).toLocaleTimeString() }} =
      {{ new Date(new Date(session.closed_at) - new Date(session.created_at) - 3 * 60 * 60 * 1000).toLocaleTimeString() }} |
       {{ session.task_name }}
    </li>
  </ul> -->

  <div style="margin: 0.5em;">
    Итого: {{ new Date(totalSeconds * 1000 - 3 * 60 * 60 * 1000).toLocaleTimeString() }}
  </div>

  <!-- <pre>
    {{ compact }}
  </pre> -->
</template>


<style lang="scss" scoped>
table {
  margin: 1em;
}
th, td {
  border-collapse: collapse;
  border: 0.5px solid gray;
  padding: 0.5em;
}
</style>