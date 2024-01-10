import { defineStore } from 'pinia';

interface FightData {
    ennemies: object;
    allies: object;

}

export const useFightStore = defineStore('fightStore', {
  state: (): { fightData: FightData } => ({
    fightData: {
      ennemies: [
        { image: '/assets/cards/ennemy1.png', attack: 10, defense: 20, speed: 30 },
        { image: '/assets/cards/ennemy1.png', attack: 11, defense: 21, speed: 31 },
        { image: '/assets/cards/ennemy1.png', attack: 12, defense: 22, speed: 32 },
        { image: '/assets/cards/ennemy1.png', attack: 13, defense: 23, speed: 33 },
      ],
      allies: [
        { image: '', attack: 0, defense: 0, speed: 0 },
      ],
    },
  }),
});