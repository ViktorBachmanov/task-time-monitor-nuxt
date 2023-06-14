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
      Список сеансов работы выводится 
      в виде таблицы. Сеансы можно фильтровать по периоду (например, за определённый месяц или день),
      а также по проекту, к которому принадлежат задачи сеансов. По умолчанию отображаются сеансы для всех 
      проектов за сегодня.
    </p>
    <p>
      Таблица сеансов имеет два представления: компактное и развернутое. В компактном
      представлении все сеансы одной и той же задачи "схлопываются" в одну строку. В развернутом представлении
      каждый сеанс отображается в отдельной строке таблицы.
    </p>

    <p>
      Данные проектов, задач и сеансов хранятся в соответствующих таблицах базы данных MySQl:
    </p>
    
    <div 
      class="db-diagram"
      :class="{ dark: theme.global.current.value.dark }"
    ></div>

    <p>
      При нажатии кнопки "Play" в таблицу 'sessions' добавляется новая сессия для текущей задачи выбранного проекта. 
      После этого в окне браузера запускается таймер, во время работы которого нельзя переключиться на другую задачу или проект.
      Каждую минуту продолжительность текущей сессии сохраняется в базе данных.
    </p>
  </section>
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
  font-size: 115%;
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

  @media (min-width: 620px) {
    aspect-ratio: 2;

    background-image: url('/pics/db-hor.png');
  }
  &.dark {
    filter: invert(0.85);
  }
}
</style>