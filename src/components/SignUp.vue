<script setup>
import UserServices from '~/services/UserServices';

const user = new UserServices()

const email = ref('')
const password = ref('')
</script>

<template>
  <div class="flex flex-col items-center justify-center h-screen text-4xl">
    <h1 class="pb-8 text-5xl text-center text-white uppercase">
      Creato accounto
    </h1>

    <form
      class="flex items-center justify-center text-4xl"
      @submit.prevent="user.register(email, password)"
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
        <div class="pt-4">
          <input
            type="submit"
            class="block px-4 pt-2 pb-1 mx-auto text-white transition border rounded-md cursor-pointer bg-gradient-to-bl from-gray-900 via-purple-900 to-blue-900 hover:scale-110"
            :value="'Starto Gamo'"
          />
        </div>
      </div>
      <div
        class="w-full h-screen bg-[url('https://images5.alphacoders.com/866/866898.jpg')] bg-center bg-cover fixed top-0 -z-20"
      ></div>
    </form>
  </div>
</template>
