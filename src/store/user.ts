import { defineStore } from 'pinia';

interface UserData {
  email: string;
  userId: string;
  character: string;
  isLoggedIn: boolean;
  role: string | null;
  zone: number;
  currentZone: number;
  level: number;
}

export const useUserStore = defineStore('userStore', {
  state: (): { userData: UserData } => ({
    userData: {
      email: '',
      userId: '',
      character: '',
      isLoggedIn: false,
      role: null,
      zone: 0,
      currentZone: 0,
      level: 0
    },
  }),
  actions: {
    registerUser(user: UserData) {
      this.userData = user;
    },
  },
});