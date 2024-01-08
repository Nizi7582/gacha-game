import { ref } from 'vue';

// Define the interface for the 'Card' object
interface Card {
  image: string;
  name: string;
  probability: number;
}

// Define the class for the 'InvocationServices'
class InvocationServices {
  // Array of 'Card' objects representing different cards in the game
  cards: Card[] = [
    { image: '/_nuxt/assets/cards/testCard2.jpg', name: 'test2', probability: 0.7 },
    { image: '/_nuxt/assets/cards/testCard3.jpg', name: 'test3', probability: 0.2 },
    { image: '/_nuxt/assets/cards/testCard4.jpg', name: 'test4', probability: 0.1 },
  ];

  // Reactive variables for managing game state
  drawnCards = ref<Array<Card>>([]);
  showAllCards = ref(false);
  currentCardIndex = ref(0);

  // Method to draw a card based on probabilities
  drawCard(): Card {
    const randomValue = Math.random();
    let cumulativeProbability = 0;

    for (const card of this.cards) {
      cumulativeProbability += card.probability;
      if (randomValue <= cumulativeProbability) {
        return card;
      }
    }
    return this.cards[this.cards.length - 1];
  }

  // Method to perform a simple card draw
  performSingleDraw(): void {
    const drawnCard = this.drawCard();
    this.drawnCards.value = [drawnCard];
    this.showAllCards.value = false;
    this.currentCardIndex.value = 0;
  }

  // Method to perform multiple card draws
  performMultipleDraws(): void {
    this.drawnCards.value = [];
    for (let i = 0; i < 10; i++) {
      const drawnCard = this.drawCard();
      this.drawnCards.value.push(drawnCard);
    }
    this.showAllCards.value = false;
    this.currentCardIndex.value = 0;
  }

  // Method to move to the next card in the drawn cards
  nextCard(): void {
    this.currentCardIndex.value += 1;
    if (this.currentCardIndex.value === this.drawnCards.value.length - 1) {
      this.showAllCards.value = true;
    }
  }
}

export default InvocationServices;