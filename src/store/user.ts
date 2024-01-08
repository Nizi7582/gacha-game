import { defineStore } from 'pinia';

export const useUserStore = defineStore('userStore', {
  state: () => ({
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
    registerUser(user) {
      this.userData = user;
    },
  },
});
