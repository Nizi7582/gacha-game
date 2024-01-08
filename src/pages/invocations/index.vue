<script setup lang="ts">
import InvocationServices from '../../services/InvocationServices';

// Create an instance of the 'InvocationServices' class
const invocation = new InvocationServices();
</script>

<template>
  <NuxtLayout name="custom" class="w-full">
    <div class="flex justify-center p-8">
      <div class="p-10 border-2 border-black rounded-xl">
        <h1 class="mb-8 text-4xl text-center">Le Jeu de Gaïcha</h1>

        <div>
          <button
            class="px-4 py-2 text-white bg-blue-500 rounded"
            @click="invocation.performSingleDraw"
          >
            Invocation simple
          </button>
          <button
            class="px-4 py-2 ml-4 text-white bg-blue-500 rounded"
            @click="invocation.performMultipleDraws"
          >
            Invocation multiple
          </button>
        </div>

        <div v-if="invocation.showAllCards" class="flex justify-center mt-8">
          <div>
            <h2 v-if="invocation.drawnCards.value.length === 1" class="text-2xl subtitle">
              Carte tirée :
            </h2>
            <h2 v-else class="text-2xl subtitle">Cartes tirées :</h2>

            <div
              v-if="!invocation.showAllCards"
              class="mt-4 single-card-container"
            >
              <img
                :src="invocation.drawnCards.value[invocation.currentCardIndex.value].image"
                :alt="invocation.drawnCards.value[invocation.currentCardIndex.value].name"
                class="w-32 card-image"
              />
              <button
                @click="invocation.nextCard"
                v-if="invocation.currentCardIndex.value < invocation.drawnCards.value.length - 1"
                class="px-4 py-2 mt-4 text-white bg-blue-500 rounded next-button"
              >
                Carte suivante
              </button>
            </div>

            <div v-else class="flex gap-5 mt-4">
              <img
                v-for="card in invocation.drawnCards.value"
                :src="card.image"
                :alt="card.name"
                class="w-32 card-image"
                :key="card.name"
              />
            </div>
          </div>
        </div>
      </div>
      <div
        class="w-full h-screen bg-[url('~/assets/img/invocation-bg.jpg')] bg-center bg-cover fixed top-0 -z-20"
      ></div>
    </div>
  </NuxtLayout>
</template>