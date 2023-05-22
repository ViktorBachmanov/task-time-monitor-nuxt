<script setup>
useHead({
  title: 'Task-Time-Monitor',
  script: [ { src: '/js/theme.js' } ]
})

</script>

<template>
  <div class="app">
    <!-- <button @click="testApi">Test API</button>
    <NuxtWelcome /> -->

    <!-- <FirstComponent /> -->

    <Suspense>
      <TheProjects />
    </Suspense>

    <Suspense>
      <TheSessions />
    </Suspense>
    
  </div>
</template>



<style lang="scss" scoped>
.app {
  min-width: 100%;
  min-height: 100vh;
  // display: flex;
  // flex-direction: column;
  padding: 2em;
  .dark & {
    background-color: $bg-dark-0;
    color: silver;
  }
}

</style>


<style lang="scss">
* {
  margin: 0;
  padding: 0;
}

select {
  &.disabled {
    opacity: 0.5;
    pointer-events: none;
  }
}

.dark select, .dark input {
  background-color: $bg-dark-1;
  color: white;
}
</style>
