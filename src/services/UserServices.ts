
class UserServices {
  private userStore: ReturnType<typeof useUserStore>;
  private supabase: ReturnType<typeof useSupabaseClient>;

  constructor() {
    this.userStore = useUserStore();
    this.supabase = useSupabaseClient();
  }

  // Login function
  async login(email: string, password: string) {
    try {
      console.log(email);
      const { error } = await this.supabase.auth.signInWithPassword({
        email: email,
        password: password,
      });

      if (error) throw error;
      console.log("Successfully logged in");
      this.userStore.userData.isLoggedIn = true;
      this.userStore.userData.email = email;

      // Redirection to main page
      navigateTo("/");
    } catch (error: any) {
      alert(error.error_description || error.message);
    }
  }

  // Register function
  async register(name: string, email: string, password: string) {
    try {
      const { error } = await this.supabase.auth.signUp({
        email: email,
        password: password,
      });

      if (error) throw error;
      console.log("Successfully registered");

      // Insert user into database
      await this.supabase
        .from("users")
        .insert({ name: name, email: email, character: '', level: 0, zone: 1, gems: 666, coins: 100 });
      alert("Check your email for the login link!");
    } catch (error: any) {
      alert(error.error_description || error.message);
    }
  }
}

export default UserServices;