<script setup>

const props = defineProps({
  timer: String,
  currentSessionId: Number | null,
})

// const playing = useState('currentSessionId')

const currentTaskId = useState('currentTaskId')

const emit = defineEmits(['play', 'stop'])


function play() {
  emit('play')
}

async function stop() {
  emit('stop')
}

const playDisabled = computed(() => {
  return (props.currentSessionId !== null) || (currentTaskId.value === undefined)
})

</script>


<template>
  <div id="player">
    <div class="player__buttons">
      <v-btn 
        @click="play"
        :disabled="playDisabled"
        icon
        rounded="lg"
        variant="tonal"
      >
        <v-icon icon="mdi-play" size="x-large"></v-icon>
      </v-btn>

      <v-btn 
        @click="stop"
        :disabled="currentSessionId === null ? true : false"
        icon
        rounded="lg"
        variant="tonal"
      >
        <v-icon icon="mdi-stop" size="x-large"></v-icon>
      </v-btn>
    </div>

    <div class="clock">
      {{ timer }}
    </div>
  </div>
</template>


<style lang="scss" scoped>
#player {
  margin: 3em;
  display: flex;
  flex-direction: column;
  align-items: center;
  row-gap: 1em;
}

.player__buttons {
  display: flex;
  column-gap: 0.5em;
}

.clock {
  font-size: 150%;
  font-family: 'Roboto Mono', monospace;
}
</style>


