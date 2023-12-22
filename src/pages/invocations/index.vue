<template>
  <div class="p-8 flex justify-center">
    <div class="border-2 p-10 rounded-xl border-black">
      <h1 class="text-4xl mb-8 text-center">Le Jeu de Gaïcha</h1>

      <div>
        <button class="bg-blue-500 text-white px-4 py-2 rounded" @click="invocationSimple">Invocation simple</button>
        <button class="bg-green-500 text-white px-4 py-2 rounded ml-4" @click="invocationMultiple">Invocation multiple</button>
      </div>

      <div v-if="cartesTirees.length > 0" class="mt-8 flex justify-center">
        <div>
          <h2 v-if="cartesTirees.length === 1" class="subtitle text-2xl">Carte tirée :</h2>
          <h2 v-else class="subtitle text-2xl">Cartes tirées :</h2>

          <div v-if="!afficherToutesLesCartes" class="single-card-container mt-4">
            <img :src="cartesTirees[carteCourante].image" :alt="cartesTirees[carteCourante].nom" class="card-image w-32">
            <button @click="carteSuivante" v-if="carteCourante < cartesTirees.length - 1" class="next-button bg-purple-500 text-white px-4 py-2 rounded mt-4">Carte suivante</button>
          </div>

          <div v-else class="flex gap-5 mt-4">
            <img v-for="carte in cartesTirees" :src="carte.image" :alt="carte.nom" class="card-image w-32" :key="carte.nom">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      cartes: [
        { image: '/_nuxt/assets/cards/testCard2.jpg', nom: 'test2', probabilite: 0.7 },
        { image: '/_nuxt/assets/cards/testCard3.jpg', nom: 'test3', probabilite: 0.2 },
        { image: '/_nuxt/assets/cards/testCard4.jpg', nom: 'test4', probabilite: 0.1 },
      ],
      cartesTirees: [],
      afficherToutesLesCartes: false,
      carteCourante: 0,
    };
  },
  computed: {
    afficherCartesTirees() {
      return this.cartesTirees.length > 0;
    },
  },
  methods: {
    tirerCarte() {
      const randomValue = Math.random();
      let cumulativeProbability = 0;

      for (const carte of this.cartes) {
        cumulativeProbability += carte.probabilite;
        if (randomValue <= cumulativeProbability) {
          return carte;
        }
      }
      return this.cartes[this.cartes.length - 1];
    },
    invocationSimple() {
      const carteTiree = this.tirerCarte();
      this.cartesTirees = [carteTiree];
      this.afficherToutesLesCartes = false;
      this.carteCourante = 0;
    },
    invocationMultiple() {
      this.cartesTirees = [];
      for (let i = 0; i < 10; i++) {
        const carteTiree = this.tirerCarte();
        this.cartesTirees.push(carteTiree);
      }
      this.afficherToutesLesCartes = false;
      this.carteCourante = 0;
    },
    carteSuivante() {
      this.carteCourante += 1;
      if (this.carteCourante === this.cartesTirees.length - 1) {
        this.afficherToutesLesCartes = true;
      }
    },
  },
};
</script>
