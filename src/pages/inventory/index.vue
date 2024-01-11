<script setup lang="ts">
import { ref, onMounted, watch, computed } from 'vue';
import { useUserStore } from '~/store/user';

const userCards = ref([]);
const userStore = useUserStore();
const supabase = useSupabaseClient();

onMounted(() => {
  const userEmail = userStore.userData.email;
  if (userEmail) {
    loadUserCardsByEmail(userEmail);
  } else {
    console.log('User email is not defined.');
  }
});

watch(
  () => userStore.userData.email,
  (newEmail) => {
    if (newEmail) {
      loadUserCardsByEmail(newEmail);
    }
  }
);

async function loadUserCardsByEmail(userEmail: string) {
  const { data, error } = await supabase
    .from('user_cards')
    .select(
      `
      *,
      cards (
        *
      )
    `
    )
    .eq('email_user', userEmail);

  if (error) {
    console.log('Error', error);
  } else {
    userCards.value = data;
  }
}

function filterUserCardsByRarity(rarity: string) {
  return userCards.value.filter((card: { cards: any }) => card.cards.rarity === rarity) as { id: string }[];
}

function getRarityLabel(rarity: string) {
  switch (rarity) {
    case 'lr':
      return 'Légendaire';
    case 'ssr':
      return 'Super Rare';
    case 'sr':
      return 'Rare';
    case 'r':
      return 'Commun';
    default:
      return '';
  }
}
</script>

<template>
  <NuxtLayout name="custom">
    <div>
      <!-- Fixed background -->
      <div class="w-full h-screen bg-[url('~/assets/img/background_invocation.png')] bg-center bg-cover fixed top-0 -z-20"></div>

      <!-- Content -->
      <div class="relative z-10 p-4">
        <h2 class="text-4xl font-semibold text-center text-gray-800 py-6 mb-4 text-white">Le contenu de l'inventaire:</h2>

        <template v-for="rarity in ['lr', 'ssr', 'sr', 'r']">
          <div v-if="filterUserCardsByRarity(rarity).length > 0">
            <h2 class="text-4xl font-semibold text-left text-gray-800 pt-6 text-white ml-4">
              {{ getRarityLabel(rarity) }}
            </h2>
            <ul class="grid grid-cols-1 mt-10 md:grid-cols-9 lg:grid-cols-5 gap-y-12 gap-x-4 m-4">
              <InventoryCard v-for="card in filterUserCardsByRarity(rarity)" :key="card.id" :card="card" />
            </ul>
          </div>
        </template>
      </div>
    </div>
  </NuxtLayout>
</template>