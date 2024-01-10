import { defineStore } from 'pinia';

interface FightData {
    ennemies: object;
}

export const useFightStore = defineStore('fightStore', {
  state: (): { fightData: FightData } => ({
    fightData: {
      ennemies: [
        { image: '~/assets/cards/ennemy1.png', attack: 10, defense: 20, speed: 30 },
        { image: '~/assets/cards/ennemy1.png', attack: 11, defense: 21, speed: 31 },
        { image: '~/assets/cards/ennemy1.png', attack: 12, defense: 22, speed: 32 },
      ]
    },
  }),
});