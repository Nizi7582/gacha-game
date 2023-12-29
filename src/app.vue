<script setup>
const supabase = useSupabaseClient()

import { useUserStore } from '~/store/user';

const userSupabase = useSupabaseUser()
const userStore = useUserStore()


if (userSupabase && userSupabase.value && userSupabase.value.role === 'authenticated') {
  userStore.userData.isLoggedIn = true
  userStore.userData.email = userSupabase.value.email
}

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
