<script setup>
import { useTheme } from 'vuetify'

const theme = useTheme()

</script>


<template>
  <h1>Приложение Task-Time-Monitor</h1>
  <section>
    <h2>Назначение</h2>
    <p>
      Это приложение предназначено для контроля времени, затраченного
      на различные задачи различных проектов.
    </p>
  </section>

  <section>
    <h2>Описание</h2>
    <p>
      При нажатии кнопки "Play" запускается таймер для текущей задачи выбранного проекта. 
      Во время работы таймера нельзя переключиться на другую задачу или проект. 
      
    </p>
  </section>
  
  <div 
    class="db-diagram"
    :class="{ dark: theme.global.current.value.dark }"
  >
  </div>
</template>


<style lang="scss" scoped>
h1 {
  font-size: 125%;
  margin: 1em;
}

section {
  margin-top: 1em;
  margin-bottom: 1em;
}

h2 {
  font-size: 110%;
  margin: 0.5em;
}

p {
  text-indent: 1.5em;
}

.db-diagram {
  width: 90%;
  max-width: 700px;
  aspect-ratio: 0.62;

  margin: 0 auto;

  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;
  background-image: url('/pics/db-ver.png');

  @media (min-width: 420px) {
    aspect-ratio: 2;

    background-image: url('/pics/db-hor.png');
  }

  // .dark & {
  //   filter: invert(0.85);
  // }

  &.dark {
    filter: invert(0.85);
  }
}
</style>