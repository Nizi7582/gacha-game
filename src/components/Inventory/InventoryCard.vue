<template>
  <li class="bg-white rounded-xl shadow border-2" :class="cardClass">
    <img :src="cardImage" class="rounded-t-xl" />

    <div class="px-4 pb-2">
      <div
        class="text-xl font-medium text-center first-letter:uppercase text-gray-900 border-y pt-1 -mx-4"
      >
        {{ cardName }}
      </div>
      <div
        class="absolute top-0 left-0 px-3 pt-2 rounded-tl-xl rounded-br-xl bg-gray-100/70"
      >
        <div :class="rarityClass">
          {{ cardRarity }}
        </div>
      </div>
      <StatDisplay :icon="attackIcon" :value="cardAttack" />
      <StatDisplay :icon="defenseIcon" :value="cardDefense" />
      <StatDisplay :icon="staminaIcon" :value="cardStamina" />
      <div class="mt-2 text-gray-700">Quantity: {{ cardQuantity }}</div>
    </div>
  </li>
</template>

<script setup>
import { defineProps } from "vue";

const { card } = defineProps(["card"]);

const cardClass = {
  "border-gray-400": card.cards.rarity === "r",
  "border-blue-400": card.cards.rarity === "sr",
  "border-yellow-400": card.cards.rarity === "ssr",
};

const rarityClass = {
  "text-gray-500": card.cards.rarity === "r",
  "text-blue-400": card.cards.rarity === "sr",
  "text-yellow-400": card.cards.rarity === "ssr",
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