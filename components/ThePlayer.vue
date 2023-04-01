<script setup>
const currentTaskId = useState('currentTaskId')

const createdAt = ref(null)

async function createSession(params) {
  const { data } = await useFetch('/api/sessions', {
    method: 'POST',
    body: {
      currentTaskId: currentTaskId.value,
    },
  })  

  const date = new Date(data.value.session.created_at)
  createdAt.value = date.toLocaleTimeString()
}
</script>


<template>
  <div id="player">
    <button @click="createSession">
      <IconPlayButton />
    </button>

    <pre>
      {{ createdAt }}
    </pre>
  </div>
</template>


<style scoped>
#player {
  margin: 3em;
}
</style>