<script setup>
import { ref, onMounted } from 'vue';
import CardInvoker from '~/services/Invocation';

const openMenu = ref(false);
const video = ref(false);
const cardInvoker = new CardInvoker();
const buttonsEnabled = ref(true)

onMounted(cardInvoker.onMounted.bind(cardInvoker));

async function triggerMultiInvocation() {
  if (buttonsEnabled.value) {
    const requiredGems = 10;
    if (cardInvoker.userStore.userData.gems < requiredGems) {
      console.log("Insufficient gems for a multi-card invocation.");
      return;
    }

    video.value = true;
    buttonsEnabled.value = false;

    setTimeout(() => {
      cardInvoker.invokeMultipleCards(10);
      video.value = false;
      buttonsEnabled.value = true;
    }, 6000);
  }
}
</script>

<template>
  <NuxtLayout name="custom">
    <div class="min-h-screen bg-[url('~/assets/img/invocation_background.png')] bg-center bg-no-repeat bg-cover flex items-center justify-center z-10">
      <button @click="openMenu = !openMenu" class="fixed opacity-0 cursor-pointer w-[10vw] h-[40vh] top-[22%] left-[31%]"></button>
      <div v-show="openMenu" class="rounded-3xl z-10">
        <div v-if="buttonsEnabled" class="flex gap-10 px-10 py-3 rounded-lg justify-center">
          <button :class="{ 'bg-red-500': cardInvoker.userStore.userData.gems < 1 }"  class="bg-black bg-opacity-85 text-2xl flex gap-10 hover:bg-gray-700 text-white font-bold py-4 px-8 rounded-full" v-if="!cardInvoker.isMultiInvocation.value && cardInvoker.invokedCards.value.length === 0" @click="cardInvoker.invokeRandomCard()">
            <div class="flex gap-1">x1<img class="w-6 h-6" src="~/assets/img/gem.png"/></div>
            <div>Single</div>
          </button>
          <button :class="{ 'bg-red-500': cardInvoker.userStore.userData.gems < 10 }"  class="bg-black bg-opacity-80 text-2xl flex gap-10 hover:bg-gray-700 text-white font-bold py-4 px-8 rounded-full" v-if="!cardInvoker.isMultiInvocation.value && cardInvoker.invokedCards.value.length === 0" @click="triggerMultiInvocation()">
            <div class="flex gap-1">x10<img class="w-6 h-6" src="~/assets/img/gem.png"/></div>
            <div>Multi</div>
          </button>
        </div>
        <div v-if="cardInvoker.invokedCards.value.length > 0">
          <div v-if="cardInvoker.isMultiInvocation.value" class="flex justify-center">
            <div class="grid grid-cols-5 gap-4">
              <div v-for="(invokedCard, index) in cardInvoker.invokedCards.value" :key="invokedCard.id" class="transition ease-in-out duration-500 transform hover:scale-110">
                <img :src="invokedCard.image" alt="Carte invoquée" class="rounded-md w-60 opacity-100 hover:opacity-75" />
                <br v-if="(index + 1) % 5 === 0" />
                <div class="absolute top-0 right-0 uppercase text-4xl text-gray opacity-90 rounded-bl-xl">
                  <img v-if="invokedCard.rarity === 'lr'" src="~~/assets/img/lr.png" class="w-16" />
                  <img v-if="invokedCard.rarity === 'ssr'" src="~~/assets/img/ssr.png" class="w-16" />
                  <img v-if="invokedCard.rarity === 'sr'" src="~~/assets/img/sr.png" class="w-16" />
                  <img v-if="invokedCard.rarity === 'r'" src="~~/assets/img/r.png" class="w-16" />
                </div>
              </div>
            </div>
          </div>
          <div v-else class="flex justify-center">
            <div class="grid grid-cols-1 gap-4">
              <div class="transition ease-in-out duration-500 transform hover:scale-110">
                <img :src="cardInvoker.invokedCards.value[0].image" alt="Carte invoquée" class="rounded-md w-60 shadow-md opacity-100 hover:opacity-75" />
                <div class="absolute top-0 right-0 uppercase text-4xl text-gray opacity-90 rounded-bl-xl">
                  <img v-if="cardInvoker.invokedCards.value[0].rarity === 'lr'" src="~~/assets/img/lr.png" class="w-16" />
                  <img v-if="cardInvoker.invokedCards.value[0].rarity === 'ssr'" src="~~/assets/img/ssr.png" class="w-16" />
                  <img v-if="cardInvoker.invokedCards.value[0].rarity === 'sr'" src="~~/assets/img/sr.png" class="w-16" />
                  <img v-if="cardInvoker.invokedCards.value[0].rarity === 'r'" src="~~/assets/img/r.png" class="w-16" />
                </div>
              </div>
            </div>
          </div>
          <div class="flex justify-center">
            <button v-if="cardInvoker.invokedCards.value.length === 1 && !cardInvoker.isMultiInvocation.value" @click="cardInvoker.continueInvocation()" class="bg-green-500 text-2xl hover:bg-green-700 text-white font-bold py-4 px-8 rounded mt-4">
              Parfait !
            </button>
            <button v-if="cardInvoker.invokedCards.value.length === 10" @click="cardInvoker.continueInvocation()" class="bg-green-500 text-2xl hover:bg-green-700 text-white font-bold py-4 px-8 rounded mt-4">
              Parfait !
            </button>
          </div>
        </div>
      </div>
    </div>
    <div v-if="video" class="min-h-screen absolute top-0 bottom-0 left-0 right-0 overflow-hidden">
      <video preload="metadata" audio="false" autoplay="autoplay" muted class="-rotate-90 transform w-full h-[200vh] -mt-[50vh]">
        <source src="../../assets/video/video_invocation1.mp4" type="video/mp4" />
      </video>
    </div>
    <HomeRessources :userData="cardInvoker.userStore.userData" class="flex items-end justify-center gap-x-[50px] h-full" />
  </NuxtLayout>
</template>
