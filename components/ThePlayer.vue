<script setup>
const currentTaskId = useState('currentTaskId')

async function createSession(params) {
  const { data } = await useFetch('/api/sessions', {
    method: 'POST',
    body: {
      currentTaskId: currentTaskId.value,
    },
  })  
}
</script>


<template>
  <div id="player">
    <button @click="createSession">
      <IconPlayButton />
    </button>
  </div>
</template>


<style scoped>
#player {
  margin: 3em;
}
</style>