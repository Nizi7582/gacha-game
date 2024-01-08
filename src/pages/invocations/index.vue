<template>
  <div class="min-h-screen flex items-center justify-center">
    <div class="bg-white p-8 rounded-lg shadow-md">
      <h1 class="text-3xl font-semibold mb-4">Invocation de Carte</h1>
      <div class="flex gap-10 justify-center">
        <button @click="invokeRandomCard" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Single
        </button>
        <button @click="invokeMultipleCards(10)" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Multi
        </button>
      </div>
      <div v-if="invokedCards.length > 0" class="mt-4">
        <h2 class="text-xl font-semibold mb-2">Cartes Invoquées :</h2>
        <div class="grid grid-cols-5 gap-4">
          <div v-for="(invokedCard, index) in invokedCards" :key="invokedCard.id">
            <img :src="invokedCard.image" alt="Carte invoquée" class="rounded-md w-60 shadow-md">
            <br v-if="(index + 1) % 5 === 0">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script setup>
import { ref } from 'vue';
import { useUserStore } from '~/store/user'

const cards = ref([]);
const supabase = useSupabaseClient();
const invokedCard = ref(null);
const invokedCards = ref([]);
const userStore = useUserStore()

onMounted(async () => {
  try {
    const { data, error } = await supabase.from('cards').select('*');
  
    if (error) {
      console.error('Error fetching data from Supabase:', error.message);
    } else {
      cards.value = data;
      console.log('Fetched:', data);
      console.log('Fetched:', cards.value[0].image);
    }
  } catch (error) {
    console.error('An error occurred during data fetching:', error.message);
  }
});

const clearInvokedCards = () => {
  invokedCards.value = [];
};

const invokeMultipleCards = async (numberOfCards) => {
  // Clear the history before invoking new cards
  clearInvokedCards();

  try {
    const userEmail = userStore.userData.email;

    for (let i = 0; i < numberOfCards; i++) {
      const randomIndex = Math.floor(Math.random() * cards.value.length);
      const randomCard = cards.value[randomIndex];

      // Vérifier si la carte existe déjà pour cet utilisateur
      const { data: existingUserCards, error: existingUserCardError } = await supabase
        .from('user_cards')
        .select('quantity')
        .eq('id_card', randomCard.id)
        .eq('email_user', userEmail);

      if (existingUserCardError) {
        console.error('Erreur lors de la vérification de la carte utilisateur existante:', existingUserCardError.message);
      } else {
        // Si des cartes existent, prendre la première et mettre à jour la quantité
        if (existingUserCards && existingUserCards.length > 0) {
          const existingUserCard = existingUserCards[0];
          const updatedQuantity = existingUserCard.quantity + 1;

          // Utiliser await pour s'assurer que la mise à jour est terminée avant de passer à la carte suivante
          await supabase
            .from('user_cards')
            .update({ quantity: updatedQuantity })
            .eq('id_card', randomCard.id)
            .eq('email_user', userEmail);
          
          console.log('Quantité mise à jour avec succès:', updatedQuantity);
          console.log('Image path:', randomCard.image);

          // Push the invoked card to the array
          invokedCards.value.push(randomCard);
        } else {
          // Si aucune carte n'existe, insérer une nouvelle ligne avec une quantité de 1
          const { data, error } = await supabase.from('user_cards').insert([
            {
              id_card: randomCard.id,
              quantity: 1,
              email_user: userEmail,
            },
          ]);

          if (error) {
            console.error('Erreur lors de l\'insertion dans la table card_user:', error.message);
          } else {
            console.log('Invocation enregistrée avec succès dans la table card_user:', data);

            // Push the invoked card to the array
            invokedCards.value.push(randomCard);
          }
        }
      }
    }
  } catch (error) {
    console.error('Une erreur est survenue lors de l\'invocation de la carte:', error.message);
  }
};


const invokeRandomCard = async () => {
  // Clear the history before invoking new cards
  clearInvokedCards();

  try {
    const randomIndex = Math.floor(Math.random() * cards.value.length);
    invokedCard.value = cards.value[randomIndex];
    const userEmail = userStore.userData.email;

    // Vérifier si la carte existe déjà pour cet utilisateur
    const { data: existingUserCards, error: existingUserCardError } = await supabase
      .from('user_cards')
      .select('quantity')
      .eq('id_card', invokedCard.value.id)
      .eq('email_user', userEmail);

    if (existingUserCardError) {
      console.error('Erreur lors de la vérification de la carte utilisateur existante:', existingUserCardError.message);
    } else {
      // Si des cartes existent, prendre la première et mettre à jour la quantité
      if (existingUserCards && existingUserCards.length > 0) {
        const existingUserCard = existingUserCards[0];
        const updatedQuantity = existingUserCard.quantity + 1;
        const { data: updateData, error: updateError } = await supabase
          .from('user_cards')
          .update({ quantity: updatedQuantity })
          .eq('id_card', invokedCard.value.id)
          .eq('email_user', userEmail);

        if (updateError) {
          console.error('Erreur lors de la mise à jour de la quantité:', updateError.message);
        } else {
          console.log('Quantité mise à jour avec succès:', updateData);
          console.log('Image path:', invokedCard.value.image);

          // Set the invoked card to the array
          invokedCards.value.push(invokedCard.value);
        }
      } else {
        // Si aucune carte n'existe, insérer une nouvelle ligne avec une quantité de 1
        const { data, error } = await supabase.from('user_cards').insert([
          {
            id_card: invokedCard.value.id,
            quantity: 1,
            email_user: userEmail,
          },
        ]);

        if (error) {
          console.error('Erreur lors de l\'insertion dans la table card_user:', error.message);
        } else {
          console.log('Invocation enregistrée avec succès dans la table card_user:', data);

          // Set the invoked card to the array
          invokedCards.value.push(invokedCard.value);
        }
      }
    }
  } catch (error) {
    console.error('Une erreur est survenue lors de l\'invocation de la carte:', error.message);
  }
};
</script>
