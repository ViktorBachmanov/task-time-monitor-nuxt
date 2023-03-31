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
      <TheTask />
    </Suspense>

    <ThePlayer />

  </div>
</template>



<style lang="scss" scoped>
.app {
  min-width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
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
</style>
