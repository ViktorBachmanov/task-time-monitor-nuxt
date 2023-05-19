<script setup>
const { data, refresh } = await useFetch('/api/projects')

const currentProjectId = useState('currentProjectId', () => 1)

const playing = useState('playing')


</script>


<template>
  <div>
    Проекты
  </div>

  <IconPlusButton />

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

  <Suspense>
    <TheTask 
      :projectId="currentProjectId"
    />
  </Suspense>

</template>