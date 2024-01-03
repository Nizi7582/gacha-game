<template>
  <div class="p-8 bg-gray-100">
    <!-- Vite -->
    <h2 class="text-2xl font-semibold text-center text-gray-800 mb-6">
      Le contenu de l'inventaire:
    </h2>
    <ul class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <li v-for="card in userCards" :key="card.id" class="bg-white rounded-lg shadow">
        <div class="p-4">
          <div class="text-lg font-medium text-gray-900">
            Card Name: {{ card.cards.name }}
          </div>
          <div class="text-lg font-medium text-gray-900">
            ID: {{ card.id }}
          </div>
          <div class="text-lg font-medium text-gray-900">
            Created: {{ formatDate(card.created_at) }}
          </div>
          <div class="text-lg font-medium text-gray-900">
            Rarity: {{ card.cards.rarity }}
          </div>
          <div class="text-lg font-medium text-gray-900">
            Descritpion: {{ card.cards.description }}
          </div>
          <div class="text-lg font-medium text-gray-900">
            Card attack: {{ card.cards.attack }}
          </div>
          <div class="text-lg font-medium text-gray-900">
            Card defense: {{ card.cards.defense }}
          </div>
          <div class="text-lg font-medium text-gray-900">
            Card stamina: {{ card.cards.stamina }}
          </div>
          <div class="mt-2 text-gray-700">
            Quantity: {{ card.quantity }}
          </div>
        </div>
      </li>
    </ul>
  </div>
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
