<script setup>
const currentTaskId = useState('currentTaskId')

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

  intervalId = setInterval(() => {
    timer.value = new Date((Date.now() - date - 3 * 60 * 60 * 1000)).toLocaleTimeString()
  }, 1000)
}


async function closeSession(params) {
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
  <div id="player">
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


<style scoped>
#player {
  margin: 3em;
}
</style>


