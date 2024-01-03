<script setup>
import { useUserStore } from '~/store/user'

const userStore = useUserStore()
const supabase = useSupabaseClient()

const email = ref('')
const password = ref('')

const handleLogin = async () => {
  try {
    const { error } = await supabase.auth.signInWithPassword({
      email: email.value,
      password: password.value,
    })
    console.log(error)
    if (error) throw error
    console.log('Successfully logged in')
    userStore.userData.isLoggedIn = true
    userStore.userData.email = email.value
    navigateTo('/')
  } catch (error) {
    alert(error.error_description || error.message)
  }
}
</script>

<template>
  <div class="flex flex-col items-center justify-center h-screen text-4xl">
    <h1 class="pb-8 text-5xl text-center text-white uppercase">
      Connectiono accounto
    </h1>

    <form
      class="flex items-center justify-center text-4xl"
      @submit.prevent="handleLogin"
    >
      <div class="flex flex-col col-6 form-widget gap-y-6">
        <div class="">
          <input
            class="pt-1 pl-2 border-2 rounded-full"
            type="email"
            placeholder="Emailo"
            v-model="email"
          />
        </div>
        <div>
          <input
            class="pt-1 pl-2 border-2 rounded-full"
            type="password"
            placeholder="Passworldo"
            v-model="password"
          />
        </div>
        <div class="relative pt-4">
          <input
            type="submit"
            class="block px-4 pt-2 pb-1 mx-auto text-white transition border rounded-md cursor-pointer bg-gradient-to-bl from-gray-900 via-purple-900 to-blue-900 hover:scale-110"
            :value="'Continudo'"
          />
        </div>
      </div>
      <div
        class="w-full h-screen bg-[url('https://images5.alphacoders.com/866/866898.jpg')] bg-center bg-cover fixed top-0 -z-20"
      ></div>
    </form>
  </div>
</template>
