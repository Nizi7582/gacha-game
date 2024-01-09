<template>
  <NuxtLayout name="custom">
    <div class="min-h-screen bg-[url('~/assets/img/invocation_background.png')] bg-center bg-no-repeat bg-cover flex items-center justify-center">
      <button @click="test = !test" class="fixed opacity-0 cursor-pointer w-[10vw] h-[40vh] top-[22%] left-[31%]">test</button>
      <div v-show="test" class="p-20 bg-blue-600 rounded-lg shadow-md">
        <div class="flex gap-10 px-10 py-3 rounded-lg justify-center">
          <button @click="cardInvoker.invokeRandomCard()" class="bg-black text-2xl hover:bg-blue-700 text-white font-bold py-4 px-8 rounded">
            Single
          </button>
          <button @click="cardInvoker.invokeMultipleCards(10)" class="bg-black text-2xl hover:bg-blue-700 text-white font-bold py-4 px-8 rounded">
            Multi
          </button>
        </div>
        <div v-if="cardInvoker.invokedCards.value.length > 0" class="my-4">
          <div v-if="cardInvoker.isMultiInvocation.value" class="flex justify-center">
            <div class="grid grid-cols-5 gap-4">
              <div v-for="(invokedCard, index) in cardInvoker.invokedCards.value" :key="invokedCard.id" class="transition ease-in-out duration-500 transform hover:scale-110">
                <img :src="invokedCard.image" alt="Carte invoquée" class="rounded-md w-60 shadow-md opacity-100 hover:opacity-75">
                <br v-if="(index + 1) % 5 === 0">
              </div>
            </div>
          </div>
          <div v-else class="flex justify-center">
            <img :src="cardInvoker.invokedCards.value[0].image" alt="Carte invoquée" class="rounded-md w-60 shadow-md opacity-100 hover:opacity-75 transition ease-in-out duration-500 transform hover:scale-110">
          </div>
          <div class="flex justify-center">
            <button v-if="cardInvoker.isMultiInvocation.value && cardInvoker.invokedCards.value.length === 10" @click="cardInvoker.continueInvocation()" class="bg-green-500 text-2xl hover:bg-green-700 text-white font-bold py-4 px-8 rounded mt-4">
              Parfait !
            </button>
          </div>
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>

<script setup>
import CardInvoker from '~/services/CardInvoker';

const test = ref(false);
const cardInvoker = new CardInvoker();

onMounted(cardInvoker.onMounted.bind(cardInvoker));
</script>
