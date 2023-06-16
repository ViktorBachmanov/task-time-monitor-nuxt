<script setup>
const props = defineProps({
  projectId: Number,
  projectName: String,
})


const { data, refresh } = await useFetch(() => `/api/tasks?project-id=${props.projectId}`)

watch(() => props.projectId, async () => {
  await refresh();

  currentTaskId.value = data.value.rows[0]?.id;
})

const currentTaskId = useTaskId()

const playing = useState('currentSessionId')


const newTaskName = ref(null)

async function handleTaskAdded(taskId) {  
  await refresh();

  currentTaskId.value = taskId;
}
</script>


<template>
  <div style="display: flex; column-gap: 0.5em; width: 25em; max-width: 100%;">
    <AddItem
      :header="`Добавить задачу в проект ${projectName}`"
      url="/api/tasks"
      :payload="{ projectId }"
      @added="handleTaskAdded"
      success-message="Задача добавлена"
      :disabled="playing === null ? false : true"
    />

    <v-select
      v-model="currentTaskId"
      label="Задача"
      :items="data.rows"
      item-title="name"
      item-value="id"
      variant="outlined"
      :disabled="playing === null ? false : true"
    ></v-select> 
  </div>
  
</template>