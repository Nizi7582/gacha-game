<script setup>
const appState = reactive({
  state: "",
});

class Button {
  constructor(trigger, text) {
    this.trigger = trigger;
    this.text = text;
  }

  handleClick() {
    appState.state = this.trigger;
  }
}

const buttons = [
  new Button("signup", "New Gamo"),
  new Button("login", "Resumo"),
  new Button("about", "Abouto"),
  new Button("leave", "Quito Gamo"),
];
</script>

<template>
  <div class="overflow-hidden">
    <button @click="appState.state = ''" class="absolute text-5xl text-yellow-600 top-6 right-6">
      NekoWorldo
    </button>
    <div class="flex items-center justify-center h-screen">
      <div v-if="appState.state === ''" class="flex flex-col items-center justify-center gap-y-6">
        <LoginButton v-for="button in buttons" :text="button.text" @click="button.handleClick()" />
      </div>
      <SignUp v-if="appState.state === 'signup'" />
      <SignIn v-if="appState.state === 'login'" />
      <!-- <About v-if="signup"/> -->
    </div>
    <div class="w-full h-screen bg-[url('https://images5.alphacoders.com/866/866898.jpg')] bg-center bg-cover fixed top-0 -z-20"></div>
  </div>
</template>