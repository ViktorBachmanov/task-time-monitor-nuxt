<script setup>
import { computed } from 'vue'

const { data, refresh } = await useFetch('/api/projects')

const currentProjectId = useState('currentProjectId', () => 1)

// const projects = useState('projects', () => data)

// const playing = useState('playing')
const playing = useState('currentSessionId')

const currentProjectName = computed(() => {
  const currentProject = data.value.find(row => row.id === currentProjectId.value)

  return currentProject.name;
})

async function handleProjectAdded(projectId) {  
  await refresh();

  currentProjectId.value = projectId;
}
</script>


<template>
  <v-select
    v-model="currentProjectId"
    label="Проект"
    :items="data"
    item-title="name"
    item-value="id"
    variant="outlined"
    style="width: 20em; max-width: 100%;"
    :disabled="playing === null ? false : true"
  ></v-select>

  <AddItem 
    header="Добавить проект"
    url="/api/projects"
    @added="handleProjectAdded"
    success-message="Проект добавлен"
    :class="{ disabled: playing }"
  />

  <Suspense>
    <TheTasks 
      :projectId="currentProjectId"
      :projectName="currentProjectName"
    />
  </Suspense>

</template>