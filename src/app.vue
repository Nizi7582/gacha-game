<script setup>
import { useUserStore } from '~/store/user';

const supabase = useSupabaseClient()
const userSupabase = useSupabaseUser()
const userStore = useUserStore()

if (userSupabase && userSupabase.value && userSupabase.value.role === 'authenticated') {
  userStore.userData.isLoggedIn = true
  userStore.userData.email = userSupabase.value.email

  // Retrieve user data based on email
  const { data, error } = await supabase
    .from('users')
    .select('*') // '*' selects all columns; you can specify specific columns if needed
    .eq('email', userStore.userData.email)

  if (error) {
    console.error('Error fetching user data:', error)
  } else {
    // Store the user data in the userData ref
    userStore.userData.name = data[0].name
    userStore.userData.level = Math.trunc(data[0].level)
    userStore.userData.character = data[0].character
    userStore.userData.gems = data[0].gems
    userStore.userData.coins = data[0].coins
    userStore.userData.zone = data[0].zone
  }
}

</script>

<template>
  <div id="app" class="font-anime" >
    
    <div>
      <NuxtPage />
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