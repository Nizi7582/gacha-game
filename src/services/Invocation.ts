import { ref, nextTick } from "vue";
import { useUserStore } from "~/store/user";

export default class CardInvoker {
  private cards: any;
  private supabase: ReturnType<typeof useSupabaseClient>;
  private invokedCards: any;
  private userStore: ReturnType<typeof useUserStore>;
  private isMultiInvocation: any;

  constructor() {
    this.cards = ref([]);
    this.supabase = useSupabaseClient();
    this.invokedCards = ref([]);
    this.userStore = useUserStore();
    this.isMultiInvocation = ref(false);
  }

  async onMounted() {
    try {
      const { data, error } = await this.supabase.from("cards").select("*");

      if (error) {
        console.error("Error fetching data from Supabase:", error.message);
      } else {
        this.cards.value = data;
        console.log("Fetched:", data);
        console.log("Fetched:", this.cards.value[0].image);
      }
    } catch (error: any) {
      console.error("An error occurred while fetching data:", error.message);
    }
  }

  async invokeMultipleCards(numberOfCards: number) {
    try {
      this.isMultiInvocation.value = true;
      const userEmail = this.userStore.userData.email;
      this.invokedCards.value = [];

      for (let i = 0; i < numberOfCards; i++) {
        const selectedRarity = this.selectRarity();
        const filteredCards = this.cards.value.filter(
          (card) => card.rarity === selectedRarity
        );

        if (filteredCards.length > 0) {
          const randomIndex = Math.floor(Math.random() * filteredCards.length);
          const randomCard = filteredCards[randomIndex];
          await this.processCard(randomCard, userEmail);
        }
      }
    } catch (error: any) {
      console.error("An error occurred during card invocation:", error.message);
    }
  }

  async invokeRandomCard() {
    try {
      this.isMultiInvocation.value = false;
      const selectedRarity = this.selectRarity();
      const filteredCards = this.cards.value.filter(
        (card) => card.rarity === selectedRarity
      );

      if (filteredCards.length > 0) {
        const randomIndex = Math.floor(Math.random() * filteredCards.length);
        const randomCard = filteredCards[randomIndex];
        await this.processCard(randomCard, this.userStore.userData.email);
      }
    } catch (error) {
      console.error("An error occurred during card invocation:", error.message);
    }
  }

  async processCard(randomCard: any, userEmail: string) {
    try {
      const { data: existingUserCards, error: existingUserCardError } =
        await this.supabase
          .from("user_cards")
          .select("quantity")
          .eq("id_card", randomCard.id)
          .eq("email_user", userEmail);

      if (existingUserCardError) {
        console.error(
          "Error checking existing user card:",
          existingUserCardError.message
        );
      } else {
        if (existingUserCards && existingUserCards.length > 0) {
          const existingUserCard = existingUserCards[0];
          const updatedQuantity = existingUserCard.quantity + 1;
          await this.supabase
            .from("user_cards")
            .update({ quantity: updatedQuantity })
            .eq("id_card", randomCard.id)
            .eq("email_user", userEmail);

          console.log("Quantity updated successfully:", updatedQuantity);
          console.log("Image path:", randomCard.image);

          this.invokedCards.value.push(randomCard);
        } else {
          const { data, error } = await this.supabase
            .from("user_cards")
            .insert([
              {
                id_card: randomCard.id,
                quantity: 1,
                email_user: userEmail,
              },
            ]);

          if (error) {
            console.error("Error inserting into user_cards table:", error.message);
          } else {
            console.log("Invocation recorded successfully in user_cards table:", data);
            this.invokedCards.value.push(randomCard);
          }
        }
      }
    } catch (error: any) {
      console.error("An error occurred during card processing:", error.message);
    }
  }

  selectRarity() {
    const rarityProbabilities = {
      r: 60,
      sr: 20,
      ssr: 9.8,
      lr: 0.2,
    };

    const totalProbability = Object.values(rarityProbabilities).reduce(
      (sum, probability) => sum + probability,
      0
    );

    const randomProbability = Math.random() * totalProbability;

    let selectedRarity;
    let cumulativeProbability = 0;

    for (const rarity in rarityProbabilities) {
      cumulativeProbability += rarityProbabilities[rarity];
      if (randomProbability < cumulativeProbability) {
        selectedRarity = rarity;
        break;
      }
    }

    return selectedRarity;
  }

  continueInvocation() {
    console.log("continueInvocation called");
    this.invokedCards.value = [];

    nextTick(() => {
      console.log("Setting isMultiInvocation to false");
      this.isMultiInvocation.value = false;
    });
  }
}
