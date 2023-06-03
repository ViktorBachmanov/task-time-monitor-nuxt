<script setup>
import { ref, watch } from 'vue';


// const props = defineProps({
//   currentSessionId: Number
// })
const props = defineProps({
  timer: String
})

// const playing = useState('playing', () => false)
const playing = useState('currentSessionId')


// const timer = ref(0)

// const emit = defineEmits(['play', 'update', 'stop'])
const emit = defineEmits(['play', 'stop'])


function play() {
  // playing.value = true;

  emit('play')
}

// let intervalId

// watch(() => props.currentSessionId, () => {
//   console.log('Start interval')

//   const startDate = Date.now()

//   let count = 0

//   intervalId = setInterval(() => {
//     const time = Date.now() - startDate

//     timer.value = new Date(time - 3 * 60 * 60 * 1000).toLocaleTimeString()

//     if(++count % 60 === 0) {
//       emit('update')
//     }
//   }, 1000)
// })


// const elem = ref(null)

async function stop() {
  // playing.value = false;

  emit('stop')

  // clearInterval(intervalId)
}

</script>


<template>
  <div id="player">
    <button 
      @click="play"
      :class="{ disabled: playing }"
    >
      <PlayButtonIcon />
    </button>

    <button 
      @click="stop"
      :class="{ disabled: !playing }"
    >
      <StopButtonIcon />
    </button>

    <pre>
      {{ timer }}
    </pre>
  </div>
</template>


<style lang="scss" scoped>
#player {
  margin: 3em;

  button {
    margin: 0.5em;

    &.disabled {
      opacity: 0.5;
      pointer-events: none;
    }
  }
}
</style>


