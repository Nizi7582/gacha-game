<script setup>
import StatDisplay from './StatDisplay.vue';
import { useUserStore } from '~/store/user';

const { card } = defineProps(['card']);
const supabase = useSupabaseClient();
const userStore = useUserStore();

const cardClass = {
  'border-gray-400': card.cards.rarity === 'r',
  'border-blue-400': card.cards.rarity === 'sr',
  'border-yellow-400': card.cards.rarity === 'ssr',
  'border-pink-400': card.cards.rarity === 'lr',
};

const cardImage = card.cards.image;
const cardAttack = card.cards.attack;
const cardDefense = card.cards.defense;
const cardStamina = card.cards.stamina;
const cardQuantity = card.quantity;

const attackIcon = 'https://i.ibb.co/8B0QKcy/att.png';
const defenseIcon = 'https://i.ibb.co/rpgDr5V/def.png';
const staminaIcon = 'https://i.ibb.co/J3mP8Zq/stam.png';
const quantityIcon = 'https://i.ibb.co/d7vWSZ4/quantity.png';

const updateCardQuantity = async () => {
  try {
    const quantityToRemove = {
      lr: 10,
      ssr: 50,
      sr: 100,
      r: 200,
    };

    const user = userStore.userData.email;

    const { data: userCard, error } = await supabase.from('user_cards').select().eq('id_card', card.cards.id).eq('email_user', user).single();

    if (error) {
      return;
    }

    if (userCard) {
      const requiredQuantity = quantityToRemove[card.cards.rarity];
      // Vérifiez si l'utilisateur a assez de quantité pour effectuer la mise à jour
      if (userCard.quantity < requiredQuantity) {
        console.log("L'utilisateur n'a pas assez de quantité pour augmenter la carte.");
        return;
      }

      const newQuantity = Math.max(0, userCard.quantity - requiredQuantity);
      const newUp = userCard.up + 0.3;

      const { error: updateError } = await supabase.from('user_cards').update({ quantity: newQuantity, up: newUp }).eq('id', userCard.id);

      if (updateError) {
        console.error('Erreur lors de la mise à jour de la carte utilisateur', updateError);
      }
    }
  } catch (e) {
    console.error("Une erreur inattendue s'est produite", e);
  }
};

</script>

<template>
  <li class="relative bg-white rounded-xl shadow border-4" :class="cardClass" @click="redirectToDetails">
    <div class="relative">
      <div class="absolute uppercase text-4xl text-gray rounded-tl-xl rounded-br-xl -top-[3.8vh] left-1/2 transform -translate-x-1/2">
        <img v-if="card.cards.rarity === 'lr'" src="~/assets/img/lr.png" class="w-[4vw]" />
        <img v-if="card.cards.rarity === 'ssr'" src="~/assets/img/ssr.png" class="w-[4vw]" />
        <img v-if="card.cards.rarity === 'sr'" src="~/assets/img/sr.png" class="w-[4vw]" />
        <img v-if="card.cards.rarity === 'r'" src="~/assets/img/r.png" class="w-[4vw]" />
      </div>

      <button @click="updateCardQuantity()" class="absolute uppercase text-4xl text-gray rounded-tl-xl rounded-br-xl top-0 right-0 transform">
        <img src="~/assets/img/cat_paw.png" class="w-10" />
      </button>
      <img :src="cardImage" class="rounded-t-xl" />
      <div class="absolute bg-black/70 bottom-0 right-0 px-4 pt-2 w-full text-center text-white flex justify-center items-center">
        <div class="flex justify-between items-center w-full">
          <StatDisplay :icon="attackIcon" :value="cardAttack" class="text-red-400 font-bold"/>
          <StatDisplay :icon="defenseIcon" :value="cardDefense" class="text-blue-400 font-bold"/>
          <StatDisplay :icon="staminaIcon" :value="cardStamina" class="text-yellow-400 font-bold"/>
          <StatDisplay :icon="quantityIcon" :value="cardQuantity" class="text-yellow-700 font-bold"/>
        </div>
      </div>
    </div>
  </li>
</template>