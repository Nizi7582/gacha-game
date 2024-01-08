import { defineStore } from 'pinia';

interface UserData {
  email: string;
  userId: string;
  isLoggedIn: boolean;
  role: string | null;
}

export const useUserStore = defineStore('userStore', {
  state: (): { userData: UserData } => ({
    userData: {
      email: '',
      userId: '',
      isLoggedIn: false,
      role: null,
      zone: 0,
      currentZone: 0,
    },
  }),
  actions: {
    registerUser(user: UserData) {
      this.userData = user;
    },
  },
});