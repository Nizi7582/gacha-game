<script setup lang="ts">
import { ref } from 'vue';

const userCards = ref([]);
const isPopupVisible = ref(false);

const togglePopup = () => {
  isPopupVisible.value = !isPopupVisible.value;
};
</script>

<template>
  <div>
    <NuxtLayout name="custom">
      <div class="w-full h-screen bg-[url('~/assets/img/background_shop.png')] bg-center bg-cover fixed top-0 -z-20" />
      <button class="absolute right-[13%] bottom-[0%] w-[80vw] h-[15vh]" @click="togglePopup" />
      <button class="absolute right-[36%] bottom-[14%] w-[29vw] h-[76vh]" @click="togglePopup" />

      <div v-if="isPopupVisible" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
        <div class="bg-white bg-opacity-90 w-full md:max-w-2xl p-4 md:p-5 rounded-lg">
          <div class="flex relative items-center justify-center p-4 md:p-5 border-b rounded-t">
            <h3 class="text-2xl font-semibold text-gray-900">
              Boutico Officiello
            </h3>
            <button type="button" class="text-red-600 absolute top-0 right-0 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center" @click="togglePopup">
              <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
              </svg>
            </button>
          </div>
          <div class="p-4 md:p-5 space-y-4">
            <div class="grid grid-cols-2 gap-4">
              <div class="bg-blue-100 p-4 rounded-md">
                <p class="font-semibold text-center text-lg">10 tickets pour invocation</p>
                <div class="flex justify-center">
                  <button class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 mt-2">
                    Acheter
                  </button>
                </div>
              </div>
              <div class="bg-green-100 p-4 rounded-md">
                <p class="font-semibold text-center text-lg">1 ticket</p>
                <div class="flex justify-center">
                  <button class="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-4 py-2 mt-2">
                    Acheter
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </NuxtLayout>
  </div>
</template>
