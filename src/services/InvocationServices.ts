import { ref } from 'vue';

// Define the interface for the 'Card' object
interface Card {
  image: string;
  name: string;
  probability: number;
}

// Define the class for the 'InvocationServices'
class InvocationServices {
  // Reactive variables for managing game state
  cards: Card[] = [];
  drawnCards = ref<Array<Card>>([]);
  showAllCards = ref(false);
  currentCardIndex = ref(0);

  constructor(cards: Card[]) {
    this.cards = cards;
  }

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