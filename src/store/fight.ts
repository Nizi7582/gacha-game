import { defineStore } from 'pinia';

interface FightData {
    ennemies: Array;
    allies: Array;

}

export const useFightStore = defineStore('fightStore', {
  state: (): { fightData: FightData } => ({
    fightData: {
      ennemies: [
        { image: '/assets/cards/ennemy1.png', attack: 10, defense: 20, speed: 30 },
        { image: '/assets/cards/ennemy1.png', attack: 11, defense: 21, speed: 31 },
      ],
      allies: [
        { cards: { image: 'https://i.pinimg.com/474x/ed/8a/22/ed8a22db3ff690557cb3a1f623ee7429.jpg' }, attack: 0, defense: 0, speed: 0 },
        { cards: { image: 'https://i.pinimg.com/474x/ed/8a/22/ed8a22db3ff690557cb3a1f623ee7429.jpg' }, attack: 0, defense: 0, speed: 0 },
        { cards: { image: 'https://i.pinimg.com/474x/ed/8a/22/ed8a22db3ff690557cb3a1f623ee7429.jpg' }, attack: 0, defense: 0, speed: 0 },
      ],
    },
  }),
});