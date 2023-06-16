<script setup>
import { computed } from 'vue'

const { data, refresh } = await useFetch('/api/projects')

const currentProjectId = useState('currentProjectId', () => 1)

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
    <div style="display: flex; column-gap: 0.5em; width: 25em; max-width: 100%;">
      <AddItem
        header="Добавить проект"
        url="/api/projects"
        @added="handleProjectAdded"
        success-message="Проект добавлен"
        :disabled="playing === null ? false : true"
      />

      <v-select
        v-model="currentProjectId"
        label="Проект"
        :items="data"
        item-title="name"
        item-value="id"
        variant="outlined"
        :disabled="playing === null ? false : true"
      ></v-select>
    </div>  

    <Suspense>
      <TheTasks 
        :projectId="currentProjectId"
        :projectName="currentProjectName"
      />
    </Suspense>
</template>