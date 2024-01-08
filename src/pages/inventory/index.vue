<template>
  <NuxtLayout name="custom">
    <div class=" bg-gray-100/40 h-screen">
      <!-- Vite -->
      
      <h2 class="text-2xl font-semibold text-center text-gray-800 py-6">
        Le contenu de l'inventaire:
      </h2>
      <ul class="grid grid-cols-1 md:grid-cols-9 lg:grid-cols-6 gap-4">
        <li v-for="card in userCards" :key="card.id" class="bg-white rounded-xl shadow border-2  relative" :class="{'border-gray-400': card.cards.rarity === 'r', 'border-blue-400': card.cards.rarity === 'sr', 'border-yellow-400': card.cards.rarity === 'ssr' }">
          <img :src="card.cards.image" class="rounded-t-xl" />

          <div class="px-4 pb-2">
            <div class="text-xl font-medium text-center first-letter:uppercase text-gray-900 border-y pt-1 -mx-4">
              {{ card.cards.name }}
            </div>
            <!-- <div class="text-lg font-medium text-gray-900">
              ID: {{ card.id }}
            </div> -->
            <!-- <div class="text-lg font-medium text-gray-900">
              Created: {{ formatDate(card.created_at) }}
            </div> -->
            <div class="absolute top-0 left-0 px-3 pt-2 rounded-tl-xl rounded-br-xl bg-gray-100/70">
              <div class="text-3xl font-thin  uppercase" :class="{'text-gray-500': card.cards.rarity === 'r', 'text-blue-400': card.cards.rarity === 'sr', 'text-yellow-400': card.cards.rarity === 'ssr' }">
                {{ card.cards.rarity }}
              </div>
            </div>
            <!-- <div class="text-lg font-medium text-gray-900">
              Description: {{ card.cards.description }}
            </div> -->
            <div class="text-lg font-medium text-gray-900 flex items-center gap-x-1">
            <img src="https://cdn.pixabay.com/photo/2013/07/13/09/58/attack-156413_960_720.png" class="h-4 -mt-1" /><div>: {{ card.cards.attack }}</div> 
            </div>
            <div class="text-lg font-medium text-gray-900 flex items-center gap-x-1">
            <img src="https://cdn.pixabay.com/photo/2014/04/03/00/35/shield-308793_1280.png" class="h-4 -mt-1" /><div>: {{ card.cards.defense }}</div> 
            </div>
            <div class="text-lg font-medium text-gray-900 flex items-center gap-x-1">
            <img src="https://cdn-icons-png.flaticon.com/512/5305/5305259.png" class="h-4 -mt-1" /><div>: {{ card.cards.stamina }}</div> 
            </div>
            <div class="mt-2 text-gray-700">
              Quantity: {{ card.quantity }}
            </div>
          </div>
        </li>
      </ul>
      <div
        class="w-full h-screen bg-[url('~/assets/img/background_invocation.png')] bg-center bg-cover fixed top-0 -z-20 "
      ></div>
    </div>
  </NuxtLayout>
</template>


<script setup>
import { useUserStore } from '~/store/user'
import { onMounted, watch } from 'vue';

const supabase = useSupabaseClient()
const userCards = ref([]);
const userStore = useUserStore()

async function loadUserCardsByEmail(userEmail) {
  let { data, error } = await supabase
    .from('user_cards')
    .select(`
      *,
      cards (
        *
      )
    `)
    .eq('email_user', userEmail);

  if (error) console.log('Error', error);
  else {
    userCards.value = data;
  }
}

function formatDate(dateString) {
  const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', hour12: false };
  return new Date(dateString).toLocaleDateString('fr-FR', options);
}

onMounted(() => {
  const userEmail = userStore.userData.email;
  if (userEmail) {
    loadUserCardsByEmail(userEmail);
  } else {
    console.log("User email is not defined.");
  }
});

watch(() => userStore.userData.email, (newEmail) => {
  if (newEmail) {
    loadUserCardsByEmail(newEmail);
  }
});

</script>