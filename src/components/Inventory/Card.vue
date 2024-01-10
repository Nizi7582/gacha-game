<script setup>
import StatDisplay from "./StatDisplay.vue";
import { defineProps } from "vue";

const { card } = defineProps(["card"]);

const cardClass = {
  "border-gray-400": card.cards.rarity === "r",
  "border-blue-400": card.cards.rarity === "sr",
  "border-yellow-400": card.cards.rarity === "ssr",
};

const rarityClass = {
  // "/assets/img/ssr.png": card.cards.rarity === "r",
  "/assets/img/sr.png": card.cards.rarity === "sr",
  "/assets/img/ssr.png": card.cards.rarity === "ssr",
};

const cardImage = card.cards.image;
const cardName = card.cards.name;
const cardRarity = card.cards.rarity;
const cardAttack = card.cards.attack;
const cardDefense = card.cards.defense;
const cardStamina = card.cards.stamina;
const cardQuantity = card.quantity;

const attackIcon =
  "https://cdn.pixabay.com/photo/2013/07/13/09/58/attack-156413_960_720.png";
const defenseIcon =
  "https://cdn.pixabay.com/photo/2014/04/03/00/35/shield-308793_1280.png";
const staminaIcon = "https://cdn-icons-png.flaticon.com/512/5305/5305259.png";
</script>

<template>
  <li class="relative bg-white rounded-xl shadow border-4" :class="cardClass">
    <div class="relative">
      <div :class="[rarityClass, 'absolute uppercase text-4xl text-gray px-2 pt-2 bg-gray-300 rounded-tl-xl rounded-br-xl']">
        {{ cardRarity }}
      </div>
      <div :class="[rarityClass, 'absolute uppercase right-0 text-4xl text-gray p-2 rounded-tr-xl rounded-bl-xl']">
        <img src="https://img.icons8.com/emoji/48/000000/star-emoji.png" width="30px" height="30px" />
      </div>
      <img :src="cardImage" class="rounded-t-xl" />
      <div
        class="absolute bg-black/70 bottom-0 right-0 px-4 pt-2 w-full text-center text-white flex justify-center items-center"
      >
        <div class="flex justify-between items-center w-full mx-4">
          <StatDisplay :icon="attackIcon" :value="cardAttack" />
          <StatDisplay :icon="defenseIcon" :value="cardDefense" />
          <StatDisplay :icon="staminaIcon" :value="cardStamina" />
        </div>
      </div>
    </div>

    <div class="px-4 text-center">
      <div
        class="absolute top-0 left-0"
      >
        <!-- <div :class="rarityClass" class="uppercase text-4xl">
          {{ cardRarity }}
        </div> -->
        <img :src="'/_nuxt' + rarityClass" class="w-20" >
      </div>
    </div>
  </li>
</template>