import { defineStore } from 'pinia';

interface FightData {
  email: string;
  userId: string;
  character: string;
  isLoggedIn: boolean;
  role: string | null;
  zone: number;
  currentZone: number;
  level: number;
}

export const useFightStore = defineStore('fightStore', {
  state: (): { fightData: FightData } => ({
    fightData: {
      ennemies: {
        attack
      }
    },
  }),
});