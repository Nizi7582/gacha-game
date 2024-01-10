import { ref } from 'vue';
import { useUserStore } from '~/store/user';


const RARITY_CHANCES = {
  r: 90,
  sr: 7,
  ssr: 3,
};


export default class CardInvoker {
  constructor() {
    this.cards = ref([]);
    this.supabase = useSupabaseClient();
    this.invokedCard = ref(null);
    this.invokedCards = ref([]);
    this.userStore = useUserStore();
    this.isMultiInvocation = ref(false);
  }

  async onMounted() {
    try {
      const { data, error } = await this.supabase.from('cards').select('*');
  
      if (error) {
        console.error('Erreur lors de la récupération des données depuis Supabase :', error.message);
      } else {
        this.cards.value = data; // Use .value to update the reactive ref
        console.log('Récupéré :', data);
        console.log('Récupéré :', this.cards.value[0].image); // Use .value to access the array
      }
    } catch (error) {
      console.error('Une erreur est survenue lors de la récupération des données :', error.message);
    }
  }


  async invokeMultipleCards(numberOfCards) {
    try {
      this.isMultiInvocation.value = true;
      const userEmail = this.userStore.userData.email;
      this.invokedCards.value = [];

      for (let i = 0; i < numberOfCards; i++) {
        const randomIndex = Math.floor(Math.random() * this.cards.value.length);
        const randomCard = this.cards.value[randomIndex];

        // Determine rarity based on chances
        const rarity = this.determineRarity();

        // Vérifier si la carte existe déjà pour cet utilisateur
        const { data: existingUserCards, error: existingUserCardError } = await this.supabase
          .from('user_cards')
          .select('quantity')
          .eq('id_card', randomCard.id)
          .eq('email_user', userEmail);

        if (existingUserCardError) {
          console.error('Erreur lors de la vérification de la carte utilisateur existante :', existingUserCardError.message);
        } else {
          // Si des cartes existent, prendre la première et mettre à jour la quantité
          if (existingUserCards && existingUserCards.length > 0) {
            const existingUserCard = existingUserCards[0];
            const updatedQuantity = existingUserCard.quantity + 1;

            // Utiliser await pour s'assurer que la mise à jour est terminée avant de passer à la carte suivante
            await this.supabase
              .from('user_cards')
              .update({ quantity: updatedQuantity })
              .eq('id_card', randomCard.id)
              .eq('email_user', userEmail);

            console.log('Quantité mise à jour avec succès :', updatedQuantity);
            console.log('Chemin de l\'image :', randomCard.image);

            // Ajouter la carte invoquée au tableau
            this.invokedCards.value.push(randomCard);
          } else {
            // Si aucune carte n'existe, insérer une nouvelle ligne avec une quantité de 1
            const { data, error } = await this.supabase.from('user_cards').insert([
              {
                id_card: randomCard.id,
                quantity: 1,
                email_user: userEmail,
              },
            ]);

            if (error) {
              console.error('Erreur lors de l\'insertion dans la table card_user :', error.message);
            } else {
              console.log('Invocation enregistrée avec succès dans la table card_user :', data);

              // Ajouter la carte invoquée au tableau
              this.invokedCards.value.push(randomCard);
            }
          }
        }
      }
    } catch (error) {
      console.error('Une erreur est survenue lors de l\'invocation de la carte :', error.message);
    }
  };

  async invokeRandomCard() {
    try {
      this.isMultiInvocation.value = false;
      const randomIndex = Math.floor(Math.random() * this.cards.value.length);
      this.invokedCard.value = this.cards.value[randomIndex];
      const userEmail = this.userStore.userData.email;

      // Introduce a delay of 1.5 seconds using setTimeout
      await new Promise(resolve => setTimeout(resolve, 200));
      
      // Vérifier si la carte existe déjà pour cet utilisateur
      const { data: existingUserCards, error: existingUserCardError } = await this.supabase
        .from('user_cards')
        .select('quantity')
        .eq('id_card', this.invokedCard.value.id)
        .eq('email_user', userEmail);

      if (existingUserCardError) {
        console.error('Erreur lors de la vérification de la carte utilisateur existante :', existingUserCardError.message);
      } else {
        // Si des cartes existent, prendre la première et mettre à jour la quantité
        if (existingUserCards && existingUserCards.length > 0) {
          const existingUserCard = existingUserCards[0];
          const updatedQuantity = existingUserCard.quantity + 1;
          const { data: updateData, error: updateError } = await this.supabase
            .from('user_cards')
            .update({ quantity: updatedQuantity })
            .eq('id_card', this.invokedCard.value.id)
            .eq('email_user', userEmail);

          if (updateError) {
            console.error('Erreur lors de la mise à jour de la quantité :', updateError.message);
          } else {
            console.log('Quantité mise à jour avec succès :', updateData);
            console.log('Chemin de l\'image :', this.invokedCard.value.image);

            // Définir la carte invoquée dans le tableau
            this.invokedCards.value = [this.invokedCard.value];
          }
        } else {
          // Si aucune carte n'existe, insérer une nouvelle ligne avec une quantité de 1
          const { data, error } = await this.supabase.from('user_cards').insert([
            {
              id_card: this.invokedCard.value.id,
              quantity: 1,
              email_user: userEmail,
            },
          ]);

          if (error) {
            console.error('Erreur lors de l\'insertion dans la table card_user :', error.message);
          } else {
            console.log('Invocation enregistrée avec succès dans la table card_user :', data);

            // Définir la carte invoquée dans le tableau
            this.invokedCards.value = [this.invokedCard.value];
          }
        }
      }
    } catch (error) {
      console.error('Une erreur est survenue lors de l\'invocation de la carte :', error.message);
    }
  };

  determineRarity() {
    const chance = Math.random() * 100;

    if (chance <= RARITY_CHANCES.ssr) {
      return 'ssr';
    } else if (chance <= RARITY_CHANCES.sr) {
      return 'sr';
    } else {
      return 'r';
    }
  }

  continueInvocation() {
    console.log('continueInvocation called');
    this.invokedCards.value = [];

    // Use nextTick to ensure the DOM is updated before changing the test variable
    nextTick(() => {
      console.log('Setting test to false and isMultiInvocation to false');
      this.isMultiInvocation.value = false;
    });
  }

}