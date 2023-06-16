<script setup>

const props = defineProps({
  timer: String,
  currentSessionId: Number | null,
})

const currentTaskId = useTaskId()


const emit = defineEmits(['play', 'stop'])


function play() {
  emit('play')
}

async function stop() {
  emit('stop')
}

</script>


<template>
  <div id="player">
    <div class="player__buttons">
      <v-btn 
        @click="play"
        :disabled="currentSessionId !== null || currentTaskId === undefined"
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


