
<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import { useUserStore } from '~/store/user';

const userCards = ref([]);
const userStore = useUserStore();
const supabase = useSupabaseClient();

onMounted(() => {
  const userEmail = userStore.userData.email;
  if (userEmail) {
    loadUserCardsByEmail(userEmail);
  } else {
    console.log("User email is not defined.");
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

async function loadUserCardsByEmail(userEmail) {
  const { data, error } = await supabase
    .from("user_cards")
    .select(
      `
      *,
      cards (
        *
      )
    `
    )
    .eq("email_user", userEmail);

  if (error) {
    console.log("Error", error);
  } else {
    userCards.value = data;
  }
}
</script>

<template>
  <NuxtLayout name="custom"></NuxtLayout>
    <div>
      <!-- Fixed background -->
      <div
        class="w-full h-screen bg-[url('~/assets/img/background_invocation.png')] bg-center bg-cover fixed top-0 -z-20"
      ></div>

      <!-- Page content -->
      <div class="relative z-10 p-4">
        <h2
          class="text-4xl font-semibold text-center text-gray-800 py-6 mb-4 text-white"
        >
          Le contenu de l'inventaire:
        </h2>
        <ul class="grid grid-cols-1 mt-16 md:grid-cols-9 lg:grid-cols-6 gap-4 m-4">
          <InventoryCard v-for="card in userCards" :key="card.id" :card="card" />
        </ul>
      </div>
    </div>
  <NuxtLayout />
</template>