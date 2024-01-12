<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import { useUserStore } from '~/store/user';
import type { SupabaseClient } from '@supabase/supabase-js';

const userStore = useUserStore();
const supabase: SupabaseClient = useSupabaseClient();

// States
const isPopupVisible = ref(false);
const isAlertVisible = ref(false);
const alertMessage = ref('');

const togglePopup = () => {
  isPopupVisible.value = !isPopupVisible.value;
};

watch(
  () => isAlertVisible.value,
  (newValue) => {
    if (newValue) {
      showAlert();
    }
  }
);

// Buy gems and coins
async function buyGems(userEmail: string | undefined = userStore.userData.email): Promise<void> {
  try {
    const requiredCoins = 10000;
    if (userStore.userData.coins < requiredCoins) {
      alertMessage.value = "Pièces d'or insuffisantes pour réaliser l\opération. Complétez des quêtes pour gagner des pièces d'or.";
      isAlertVisible.value = true;
      return;
    } else {
      const { error } = await supabase
        .from('users')
        .update({ gems: userStore.userData.gems + 66, coins: userStore.userData.coins - requiredCoins })
        .eq('email', userEmail)
        .single();

      if (error) {
        console.log('Error fetching user data:', error);
        return;
      } else {
        alertMessage.value = 'Opération réalisée avec succès ! Vous avez gagné 66 gemmes.';
        isAlertVisible.value = true;
      }
    }

    userStore.userData.gems += 66;
    userStore.userData.coins -= requiredCoins;
  } catch (error) {
    console.error('An error occurred while fetching user data:', error);
  }
}
async function buyCoins(userEmail: string | undefined = userStore.userData.email): Promise<void> {
  try {
    const requiredGems = 66;
    if (userStore.userData.gems < requiredGems) {
      alertMessage.value = 'Gemmes insuffisantes pour réaliser l\opération. Complétez des quêtes pour gagner des gemmes.';
      isAlertVisible.value = true;
      return;
    } else {
      const { data, error } = await supabase
        .from('users')
        .update({ coins: userStore.userData.coins + 1000, gems: userStore.userData.gems - requiredGems })
        .eq('email', userEmail)
        .single();

      if (error) {
        console.log('Error fetching user data:', error);
        return;
      } else {
        alertMessage.value = "Opération réalisée avec succès ! Vous avez gagné 1000 pièces d'or.";
        isAlertVisible.value = true;
      }
    }

    userStore.userData.gems -= requiredGems;
    userStore.userData.coins += 1000;
  } catch (error) {
    console.error('An error occurred while fetching user data:', error);
  }
}

// Alert
function showAlert(): void {
  setTimeout(() => {
    isAlertVisible.value = false;
  }, 5000);
}
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
            <h3 class="text-2xl font-semibold text-gray-900">Boutico Officiello</h3>
            <button type="button" class="text-red-600 absolute top-0 right-0 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center" @click="togglePopup">
              <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
              </svg>
            </button>
          </div>
          <div class="p-4 md:p-5 space-y-4">
            <div class="grid grid-cols-2 gap-4">
              <div class="bg-blue-100 p-4 rounded-md">
                <p class="font-semibold text-center text-lg flex items-centes justify-center">
                  Échangez 66&nbsp;
                  <img src="~/assets/img/gem.png" class="w-5 h-5 transition duration-700 opacity-60 group-hover:opacity-100 group-hover:scale-105" />
                  &nbsp;pour 1000&nbsp;
                  <img src="~/assets/img/coin-pic.png" class="w-5 h-5 transition duration-700 opacity-60 group-hover:opacity-100 group-hover:scale-105" />
                </p>
                <div class="flex justify-center">
                  <button class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 mt-2" @click="buyCoins()">Acheter</button>
                </div>
              </div>
              <div class="bg-green-100 p-4 rounded-md">
                <p class="font-semibold text-center text-lg flex items-center justify-center">
                  Échangez 10 000&nbsp;
                  <img src="~/assets/img/coin-pic.png" class="w-5 h-5 transition duration-700 opacity-60 group-hover:opacity-100 group-hover:scale-105" />
                  &nbsp;pour 66&nbsp;
                  <img src="~/assets/img/gem.png" class="w-5 h-5 transition duration-700 opacity-60 group-hover:opacity-100 group-hover:scale-105" />
                </p>
                <div class="flex justify-center">
                  <button class="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-4 py-2 mt-2" @click="buyGems()">Acheter</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- DIsplay gems and coins -->
      <HomeRessources :userData="userStore.userData" class="flex items-end justify-center gap-x-[50px] h-full" />
    </NuxtLayout>

    <!-- Alert component -->
    <transition name="fade">
      <div v-if="isAlertVisible" class="fixed top-4 left-4 z-50">
        <div class="bg-white bg-opacity-90 p-4 rounded-lg shadow-md">
          <div class="flex items-center justify-between">
            <h3 class="text-lg font-semibold text-gray-900">Échange</h3>
            <button type="button" class="text-red-600 hover:text-red-800" @click="isAlertVisible = false">
              <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
              </svg>
            </button>
          </div>
          <div class="mt-2">
            <p class="text-sm text-gray-700" v-text="alertMessage" />
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>
