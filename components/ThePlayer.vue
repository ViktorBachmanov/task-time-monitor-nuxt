<script setup>
import { ref, watch } from 'vue';


const props = defineProps({
  currentSessionId: Number
})

const playing = useState('playing', () => false)


const timer = ref(0)

const emit = defineEmits(['play', 'update', 'stop'])


function play() {
  playing.value = true;

  emit('play')
}

let intervalId

watch(() => props.currentSessionId, () => {
  const startDate = Date.now() + 3 * 60 * 60 * 1000
  intervalId = setInterval(() => {
    timer.value = new Date(Date.now() - startDate).toLocaleTimeString()
  }, 1000)
})


const elem = ref(null)

async function stop() {
  playing.value = false;

  emit('stop')

  clearInterval(intervalId)
}

</script>


<template>
  <div id="player" ref="elem">
    <button 
      @click="play"
      :class="{ disabled: playing }"
    >
      <IconPlayButton />
    </button>

    <button 
      @click="stop"
      :class="{ disabled: !playing }"
    >
      <IconStopButton />
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


