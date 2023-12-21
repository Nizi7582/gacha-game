<template>
  <div>
    <div class="background">
      <!-- Login -->
      <div class="flex items-center justify-center h-screen overflow-hidden">
        <div class="w-full max-w-xl shadow-3xl">
          <div class="flex items-center justify-center space-x-2">
            <img
              src="../../assets/Menu/logo_title_black.svg"
              alt="logo Jexplore"
              class="w-64"
            />
          </div>

          <form class="pt-20" @submit.prevent="login">
            <div class="flex justify-between w-full space-x-8">
              <div
                class="flex items-center w-full mb-8 text-lg text-gray-700 border border-gray-300 rounded-xl"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="absolute w-6 h-6 ml-5 text-primary-turquoise"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                  />
                </svg>

                <input
                  type="text"
                  v-model="email"
                  name="email"
                  autocomplete="email"
                  class="w-full py-3 truncate pl-14 rounded-xl focus:outline-none"
                  placeholder="Email"
                />
              </div>
              <div
                class="flex items-center w-full mb-8 text-lg bg-gray-100 border border-gray-300 gray-700 rounded-xl"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="absolute w-6 h-6 ml-5 text-primary-turquoise"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
                  />
                </svg>

                <input
                  type="password"
                  v-model="password"
                  name="password"
                  autocomplete="current-password"
                  class="w-full py-3 pl-14 rounded-xl focus:outline-none"
                  placeholder="Mot de passe"
                />
              </div>
            </div>
            <div
              v-if="errorMessage"
              class="px-4 py-2 mb-2 -mt-5 text-red-800 bg-red-200"
            >
              {{ errorMessage }}
            </div>
            <div class="flex justify-between">
              <button
                @click="$emit('register', true)"
                class="flex justify-end mb-8 font-semibold underline truncate"
              >
                Créer un compte
              </button>
              <button
                class="flex justify-end mb-8 font-normal underline truncate"
              >
                Mot de passe oublié (A faire)
              </button>
            </div>
            <button
              class="w-full p-4 font-medium text-white uppercase bg-gradient-to-b from-gray-700 to-gray-900 rounded-xl"
              type="submit"
            >
              Se connecter
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
