<script setup>
import { computed } from 'vue'

const { data, refresh } = await useFetch('/api/projects')

const currentProjectId = useState('currentProjectId', () => 1)

const playing = useState('playing')

const currentProjectName = computed(() => {
  const currentProject = data.value.rows.find(row => row.id === currentProjectId.value)

  return currentProject.name;
})
</script>


<template>
  <div>
    Проекты
  </div>

  <select 
    v-model="currentProjectId"
    :class="{ disabled: playing }"
  >
    <option 
      v-for="project in data.rows" 
      :key="project.id"
      :value="project.id"
    >
      {{ project.name }}
    </option>
  </select>

  <AddItem 
    header="Добавить проект"
    url="/api/projects"
  />

  <Suspense>
    <TheTasks 
      :projectId="currentProjectId"
      :projectName="currentProjectName"
    />
  </Suspense>

</template>