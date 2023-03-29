<script setup>
function testApi() {
  fetch('/api/hello')
    .then(res => {
      console.log('Response has arrived')
    })
}
</script>

<template>
  <div>
    <!-- <button @click="testApi">Test API</button>
    <NuxtWelcome /> -->

    <FirstComponent />
  </div>
</template>
