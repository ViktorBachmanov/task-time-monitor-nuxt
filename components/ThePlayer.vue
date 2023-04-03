<script setup>
import { ref, onMounted } from 'vue';

const currentTaskId = useState('currentTaskId')
const currentSessionId = useState('currentSessionId')


const createdAt = ref(null)

const timer = ref(0)

let intervalId

async function createSession(params) {
  const { data } = await useFetch('/api/sessions', {
    method: 'POST',
    body: {
      currentTaskId: currentTaskId.value,
    },
  })  

  const date = new Date(data.value.session.created_at)
  createdAt.value = date.toLocaleTimeString()
  currentSessionId.value = data.value.session.id;

  intervalId = setInterval(() => {
    timer.value = new Date((Date.now() - date - 3 * 60 * 60 * 1000)).toLocaleTimeString()
  }, 1000)
}

let refresh;
onMounted(() => {
  refresh = () => window.dispatchEvent(new CustomEvent('refreshSessions'))
})

const elem = ref(null)

async function closeSession(params) {
  const { data } = await useFetch('/api/sessions', {
    method: 'PUT',
    body: {
      currentSessionId: currentSessionId.value,
    },
  })  

  // sessions.value.unshift(data.value.session)


  refresh()

  clearInterval(intervalId)
}


// const usePlayerState = () => useState("playerState", () => 0);

// function setPlayerState(value) {
//   // 0 | 1
//   switch (value) {
//     case 0: // close session
//       break;

//     case 1: // create session
//       break;
//   }
//   usePlayerState.value = value;
// }
</script>


<template>
  <div id="player" ref="elem">
    <button @click="createSession">
      <IconPlayButton />
    </button>

    <button @click="closeSession">
      <IconStopButton />
    </button>

    <pre>
      {{ createdAt }} - ... = {{ timer }}
    </pre>
  </div>
</template>


<style lang="scss" scoped>
#player {
  margin: 3em;

  button {
    margin: 0.5em;
  }
}
</style>


