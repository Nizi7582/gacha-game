<script setup lang="ts">
// const { $gsap: gsap, $Draggable: Draggable } = useNuxtApp();

// definePageMeta( {
//   pageTransition: {
//     name: 'page',
//     mode: 'out-in'
//   }
// })

const cartes = [
  { image: '/_nuxt/assets/cards/testCard2.jpg', nom: 'test2', probabilite: 0.7 },
  { image: '/_nuxt/assets/cards/testCard3.jpg', nom: 'test3', probabilite: 0.2 },
  { image: '/_nuxt/assets/cards/testCard4.jpg', nom: 'test4', probabilite: 0.1 },
];

const cartesTirees = ref([]);
const afficherToutesLesCartes = ref(false);
const carteCourante = ref(0);

const afficherCartesTirees = computed(() => {
  return cartesTirees.value.length > 0;
});

function tirerCarte() {
  const randomValue = Math.random();
  let cumulativeProbability = 0;

  for (const carte of cartes) {
    cumulativeProbability += carte.probabilite;
    if (randomValue <= cumulativeProbability) {
      return carte;
    }
  }
  return cartes[cartes.length - 1];
}

function invocationSimple() {
  const carteTiree = tirerCarte();
  cartesTirees.value = [carteTiree];
  afficherToutesLesCartes.value = false;
  carteCourante.value = 0;
}

function invocationMultiple() {
  cartesTirees.value = [];
  for (let i = 0; i < 10; i++) {
    const carteTiree = tirerCarte();
    cartesTirees.value.push(carteTiree);
  }
  afficherToutesLesCartes.value = false;
  carteCourante.value = 0;
}

function carteSuivante() {
  carteCourante.value += 1;
  if (carteCourante.value === cartesTirees.value.length - 1) {
    afficherToutesLesCartes.value = true;
  }
}
</script>


<template>
  <NuxtLayout name="custom" class="w-full">
    <div class="flex justify-center p-8">
      <div class="p-10 border-2 border-black rounded-xl">
        <h1 class="mb-8 text-4xl text-center">Le Jeu de Gaïcha</h1>

        <div>
          <button class="px-4 py-2 text-white bg-blue-500 rounded" @click="invocationSimple">Invocation simple</button>
          <button class="px-4 py-2 ml-4 text-white bg-green-500 rounded" @click="invocationMultiple">Invocation multiple</button>
        </div>

        <div v-if="cartesTirees.length > 0" class="flex justify-center mt-8">
          <div>
            <h2 v-if="cartesTirees.length === 1" class="text-2xl subtitle">Carte tirée :</h2>
            <h2 v-else class="text-2xl subtitle">Cartes tirées :</h2>

            <div v-if="!afficherToutesLesCartes" class="mt-4 single-card-container">
              <img :src="cartesTirees[carteCourante].image" :alt="cartesTirees[carteCourante].nom" class="w-32 card-image">
              <button @click="carteSuivante" v-if="carteCourante < cartesTirees.length - 1" class="px-4 py-2 mt-4 text-white bg-purple-500 rounded next-button">Carte suivante</button>
            </div>

            <div v-else class="flex gap-5 mt-4">
              <img v-for="carte in cartesTirees" :src="carte.image" :alt="carte.nom" class="w-32 card-image" :key="carte.nom">
            </div>
          </div>
        </div>
      </div>
      <div
        class="w-full h-screen bg-[url('~/assets/img/invocation.jfif')] bg-center bg-cover fixed top-0 -z-20"
      >
      </div>
    </div>
  </NuxtLayout>
</template>

