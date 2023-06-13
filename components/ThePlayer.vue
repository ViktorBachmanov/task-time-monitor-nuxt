<script setup>

const props = defineProps({
  timer: String
})

const playing = useState('currentSessionId')

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
        :disabled="playing === null ? false : true"
        icon
        rounded="lg"
        variant="tonal"
      >
        <v-icon icon="mdi-play" size="x-large"></v-icon>
      </v-btn>

      <v-btn 
        @click="stop"
        :disabled="playing === null ? true : false"
        icon
        rounded="lg"
        variant="tonal"
      >
        <v-icon icon="mdi-stop" size="x-large"></v-icon>
      </v-btn>
    </div>

    <div>
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
</style>


