<script setup>

const data = reactive({
  state: ''
});

const buttons = [
  {
    trigger: 'signup',
    text: 'New Gamo',
  },
  {
    trigger: 'login',
    text: 'Resumo',
  },
  {
    trigger: 'about',
    text: 'Abouto',
  },
  {
    trigger: 'leave',
    text: 'Quito Gamo',
  },
]

</script>

<template>
  <div class="overflow-hidden">
    <button @click="data.state = ''" class="absolute text-5xl text-yellow-600 top-6 right-6">
      NekoWorldo
    </button>
    <div
    class="flex items-center justify-center h-screen "
    > 
      <div v-if="data.state === ''" class="flex flex-col items-center justify-center gap-y-6">
        <LoginButton v-for="button in buttons" :text="button.text" @click="data.state = button.trigger"/>
      </div>
      <SignUp v-if="data.state === 'signup'"/>
      <SignIn v-if="data.state === 'login'"/>
      <!-- <About v-if="signup"/> -->
      
    </div>
    <div
        class="w-full h-screen bg-[url('https://images5.alphacoders.com/866/866898.jpg')] bg-center bg-cover fixed top-0 -z-20" 
      >
    </div>
  </div>
  
</template>
