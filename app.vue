<script setup>
function testApi() {
  fetch('/api/hello')
    .then(res => {
      console.log('Response has arrived')
    })
}
</script>

<template>
  <div class="app">
    <!-- <button @click="testApi">Test API</button>
    <NuxtWelcome /> -->

    <FirstComponent />
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
