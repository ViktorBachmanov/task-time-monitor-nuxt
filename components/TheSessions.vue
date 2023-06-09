<script setup>

// const currentSessionId = ref(null)
const currentSessionId = useState('currentSessionId', () => null)

const currentTaskId = useState('currentTaskId')

const period = ref('today')

const filterProjectId = ref('all')


// const { data, refresh } = await useFetch(() => `/api/sessions/?period=${period.value}&project-id=${filterProjectId.value}`)
const { data, refresh } = await useFetch(() => `/api/sessions/?period=${period.value}`)

const sessionsFilteredByProject = computed(() => {
  if(filterProjectId.value === 'all') {
    return data.value.rows
  }
  else {
    return data.value.rows.filter(session => session.project_id === parseInt(filterProjectId.value))
  }
})


const totalSeconds = computed(() => sessionsFilteredByProject.value.reduce((total, session) => {
  return total + session.seconds
}, 0))

const compact = computed(() => {
  const collapsedArray = [];
  sessionsFilteredByProject.value.forEach((session) => {
    const foundSession = collapsedArray.find(collapsedSession => collapsedSession.task_id === session.task_id)
    if(foundSession) {
      foundSession.seconds += session.seconds
    }
    else {
      collapsedArray.push({
        id: session.id,
        project_name: session.project_name,
        task_name: session.task_name,
        task_id: session.task_id,
        seconds: session.seconds
      })
    }
  })

  return collapsedArray
})

const representation = ref('common')  // common | compact

const sessions = computed(() => {
  return representation.value === 'common'
    ? sessionsFilteredByProject.value
    : compact.value
})

function formatTime(session) {
  switch(representation.value) {
    case 'common':
      const updatedAt = session.id === currentSessionId.value
        ? new Date().toLocaleTimeString()
        : new Date(session.updated_at).toLocaleTimeString()
      return `${new Date(session.created_at).toLocaleTimeString()} - 
        ${updatedAt} = 
        ${formatSeconds(session.seconds)}`
    case 'compact':
      // return new Date((session.seconds - 3 * 60 * 60) * 1000).toLocaleTimeString()
      return formatSeconds(session.seconds)
  }
}

function formatSeconds(totalSeconds) {
  let seconds = parseInt(totalSeconds % 60)
  if(seconds < 10) {
    seconds = '0' + seconds
  }

  let minutes = parseInt(totalSeconds / 60)

  let hours = 0
  
  if(minutes >= 60) {
    hours = parseInt(minutes / 60)
    minutes = minutes % 60
  }

  if(minutes < 10) {
    minutes = '0' + minutes
  }


  if(hours < 10) {
    hours = '0' + hours
  }

  return hours + ':' + minutes + ':' + seconds
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

  await updateSession()

  startTimer()
}

let intervalId

const timer = ref('')

function startTimer() {
  const startDate = Date.now()

  let lastUpdate = startDate;

  timer.value = '00:00:00';

  intervalId = setInterval(() => {
    const time = Date.now() - startDate

    timer.value = new Date(time - 3 * 60 * 60 * 1000).toLocaleTimeString()


    if((Date.now() - lastUpdate) > 1000 * 59) {
      updateSession()

      lastUpdate = Date.now()

      console.log('has been updated at: ', new Date().toLocaleTimeString())
    }

    const currentSession = sessionsFilteredByProject.value.find(session => session.id === currentSessionId.value)
    if(currentSession) {
      currentSession.seconds = time / 1000
    }
  }, 1000)
}

function stopTimer() {
  clearInterval(intervalId)
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

async function closeSession() {
  await updateSession()

  currentSessionId.value = null

  stopTimer()

  refresh()
}

// const dateFrom = computed(() => {
//   return new Date().toISOString().split('.')[0].replace('T', ' ')
// })

const projectsFilteredByPeriod = computed(() => {
  const filteredProjects = {}

  data.value.rows.forEach(session => {
    if(session.project_id in filteredProjects) {
      return
    }
    else {
      filteredProjects[session.project_id] = session.project_name
    }
  })

  return filteredProjects
})

</script>


<template>
  <ThePlayer
    :timer="timer"
    @play="createSession"
    @stop="closeSession"
  />

  <div>
    Сеансы
  </div>

  <button @click="toggleRepresentation">Rep</button>

  <br/>

  <select 
    v-model="period"
    style="margin-top: 1em;"
  >
    <option value="today">Сегодня</option>
    <option value="april">Апрель</option>
    <option value="may">Май</option>
    <option value="april-may">Апрель-Май</option>
  </select>

  <FilterOfProjects 
    v-model="filterProjectId" 
    :projects="projectsFilteredByPeriod"
  />

  <!-- {{ dateFrom }} -->
  <!-- {{ new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().split("T")[0] }} -->

  <table width="1em">
    <thead>
      <tr>
        <th width="1em">Проект</th>
        <th width="1em">Задача</th>
        <th width="1em">Время</th>
      </tr>
    </thead>

    <tbody>
      <tr v-for="session in sessions" :key="session.id">
        <td style="white-space: nowrap;">{{ session.project_name }}</td>
        <td style="white-space: nowrap;">{{ session.task_name }}</td>
        <td style="white-space: nowrap;">{{ formatTime(session) }}</td>
      </tr>
    </tbody>
  </table>

  
  <div style="margin: 0.5em;">
    <!-- Итого: {{ new Date(totalSeconds * 1000 - 3 * 60 * 60 * 1000).toLocaleTimeString() }} -->
    <!-- Итого: {{ (totalSeconds / 60 / 60).toFixed(2) }} часов -->
    Итого: {{ formatSeconds(totalSeconds) }}
  </div>

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