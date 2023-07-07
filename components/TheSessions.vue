<script setup>
const currentSessionId = useState('currentSessionId', () => null)

const currentTaskId = useState('currentTaskId')

const period = ref('today')

const filterProjectId = ref('all')


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

const representation = ref('compact')  // common | compact

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

const timer = ref('00:00:00')

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

const projectsFilteredByPeriod = computed(() => {
  const filteredProjects = [{ id: 'all', name: 'Все' }]

  data.value.rows.forEach(session => {
    if(filteredProjects.find(project => project.id === session.project_id)) {
      return
    }
    else {
      filteredProjects.push({ 
        id: session.project_id,
        name: session.project_name
      })
    }
  })

  return filteredProjects
})

</script>


<template>
  <div id="sessions-controls">
    <ThePlayer
      :timer="timer"
      :currentSessionId="currentSessionId"
      @play="createSession"
      @stop="closeSession"
    />

    <header>
      Сеансы
    </header>

    <v-select
      v-model="period"
      label="Период"
      :items="[{value: 'today', title: 'Сегодня'}, {value: 'april', title: 'Апрель'}, {value: 'may', title: 'Май'}, {value: 'june', title: 'Июнь'}, {value: 'july', title: 'Июль'}]"
      item-title="title"
      item-value="value"
      variant="outlined"
      style="width: 8em;"
    ></v-select>

    <v-select
      v-model="filterProjectId"
      label="Фильтр проектов"
      :items="projectsFilteredByPeriod"
      item-title="name"
      item-value="id"
      variant="outlined"
      style="width: 25em; max-width: 100%;"
    ></v-select>
  </div>

 
  <div id="table-wrapper">
    <table style="margin: 0 auto;">
      <thead>
        <tr>
          <th width="1em">Проект</th>
          <th width="1em" style="white-space: nowrap;">
            Задача
            <v-btn 
              @click="toggleRepresentation"
              icon
              size="small"
              rounded="sm"
              variant="tonal"
              style="margin-left: 0.5em"
            >
              <v-icon icon="mdi-arrow-expand" v-if="representation === 'compact'"></v-icon>
              <v-icon icon="mdi-arrow-collapse" v-else></v-icon>
            </v-btn>
          </th>
          <th width="1em">Время</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="session in sessions" :key="session.id">
          <td style="white-space: nowrap;">{{ session.project_name }}</td>
          <td style="white-space: nowrap;">{{ session.task_name }}</td>
          <td style="white-space: nowrap;">{{ formatTime(session) }}</td>
        </tr>

        <tr style="text-align: right;">
          <td colspan="2">Итого: </td>
          <td>{{ formatSeconds(totalSeconds) }}</td>
        </tr>
      </tbody>
    </table>
  </div>

  
</template>


<style lang="scss" scoped>
#sessions-controls {
  // page-break-inside: avoid;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  grid-column-start: 1;


  & > * {
    flex: 0 0 auto;
  }

  header {
    margin-bottom: 2em;
    font-size: 120%;
  }
}

#table-wrapper {
  max-width: 100%;
  overflow-x: auto;
  margin: 1em auto;
  grid-row-start: 1;
  grid-row-end: span 2;
  grid-column-start: 2;
}

table {
  border-collapse: collapse;
}

th, td {
  border: 0.5px solid gray;
  padding: 0.5em;
}
</style>