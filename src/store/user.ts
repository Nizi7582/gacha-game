import { defineStore } from 'pinia';

interface UserData {
  email: string;
  name: string;
  userId: string;
  character: string;
  isLoggedIn: boolean;
  role: string | null;
  zone: number;
  currentZone: number;
  level: number;
  gems: number;
  coins: number;
}

export const useUserStore = defineStore('userStore', {
  state: (): { userData: UserData } => ({
    userData: {
      email: '',
      name: '',
      userId: '',
      character: '',
      isLoggedIn: false,
      role: null,
      zone: 0,
      currentZone: 0,
      level: 0,
      gems: 0,
      coins: 0,
    },
  }),
  actions: {
    registerUser(user: UserData) {
      this.userData = user;
    },
  },
});