import { ref, nextTick } from "vue";
import { useUserStore } from "~/store/user";

export default class CardInvoker {
  private cards = ref([]);
  private supabase = useSupabaseClient();
  private invokedCards = ref([]);
  private userStore = useUserStore();
  private isMultiInvocation = ref(false);

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

      // Check if the user has enough gems for a multi-card invocation
      const requiredGems = 10;
      if (this.userStore.userData.gems < requiredGems) {
        console.log("Insufficient gems for a multi-card invocation.");
        return;
      }

      // Deduct 10 gems for a multi-card invocation
      await this.updateUserGems(userEmail, -requiredGems);

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
      console.error("An error occurred during multi-card invocation:", error.message);
    }
  }

  async invokeRandomCard() {
    try {
      this.isMultiInvocation.value = false;

      if (this.userStore.userData.gems > 0) {
        const selectedRarity = this.selectRarity();
        const filteredCards = this.cards.value.filter(
          (card) => card.rarity === selectedRarity
        );

        if (filteredCards.length > 0) {
          const randomIndex = Math.floor(Math.random() * filteredCards.length);
          const randomCard = filteredCards[randomIndex];

          await this.updateUserGems(this.userStore.userData.email, -1);
          await this.processCard(randomCard, this.userStore.userData.email);
        }
      } else {
        console.log("L'utilisateur n'a pas suffisamment de gemmes pour effectuer cette invocation.");
      }
    } catch (error) {
      console.error("An error occurred during card invocation:", error.message);
    }
  }

  async updateUserGems(userEmail, gemsChange) {
    try {
      const updatedGems = this.userStore.userData.gems + gemsChange;

      const { data, error } = await this.supabase
        .from("users")
        .update({ gems: updatedGems })
        .eq("email", userEmail);

      if (error) {
        console.error("Error updating user gems:", error.message);
        this.userStore.updateUserData({ gems: this.userStore.userData.gems });
      } else {
        console.log("User gems updated successfully:", data);
        this.userStore.updateUserData({ gems: updatedGems });
      }
    } catch (error) {
      console.error("An error occurred during user gems update:", error.message);
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
