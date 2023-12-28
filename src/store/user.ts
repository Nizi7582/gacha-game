import { defineStore } from 'pinia';

export const useUserStore = defineStore('userStore', {
  state: () => ({
    userData: {
      email: '',
      userId: '',
      isLoggedIn: false,
      role: null,
    },
  }),
  actions: {
    registerUser(user) {
      this.userData = user;
    },
  },
});
