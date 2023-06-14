<script setup>
import { useTheme } from 'vuetify'

const theme = useTheme()

const toggleTheme = () => theme.global.name.value = theme.global.current.value.dark ? 'light' : 'dark'

</script>


<template setup>
  <v-sheet id="app-bar">
    <v-btn-toggle
      rounded="0"
      color="deep-purple-accent-3"
      group
    >
      <v-btn to="/" nuxt>
        Home
      </v-btn>

      <v-btn to="/about" nuxt>
        About
      </v-btn>
    </v-btn-toggle>

    <v-btn 
        @click="toggleTheme"
        icon
        rounded="lg"
        variant="tonal"
      >
      <v-icon icon="mdi-theme-light-dark" size="x-large"></v-icon>
    </v-btn>
  </v-sheet>
</template>


<style lang="scss" scoped>
#app-bar {
  padding: 1em;
  display: flex;
  justify-content: space-between;

  box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
}
</style>