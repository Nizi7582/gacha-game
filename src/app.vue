<script setup>
import { useUserStore } from '~/store/user';

const user =  useSupabaseUser()
const userStore = useUserStore()

// watch(userStore.userData.isLoggedIn, (state) => {
//   if (state === true) {
//     location.reload()
//     navigateTo('/')
//   }
// });
</script>

<template>
  <div id="app" class="font-anime" >
    
    <div>
      <NuxtPage/>
      <PreLoader />
    </div>
    <link
      href="https://fonts.cdnfonts.com/css/h-hitto-sushi"
      rel="stylesheet"
    />
  </div>
</template>

<style>
.font-anime {
  font-family: 'h Hitto Sushi', sans-serif;
}
</style>
