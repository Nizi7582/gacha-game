import { defineStore } from 'pinia';

interface FightData {
    ennemies: object;

}

export const useFightStore = defineStore('fightStore', {
  state: (): { fightData: FightData } => ({
    fightData: {
      ennemies: [
        { img: '~/assets/img/cat_paw.png', attack: 10, defense: 20, speed: 30 },
        { img: '~/assets/img/cat_paw.png', attack: 11, defense: 21, speed: 31 },
        { img: '~/assets/img/cat_paw.png', attack: 12, defense: 22, speed: 32 },
      ]
    },
  }),
});