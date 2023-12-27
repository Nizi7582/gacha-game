<script setup>
const { $gsap: gsap, $Draggable: Draggable } = useNuxtApp();

const percentage = ref(0)

onMounted(() => {
  const tl = gsap.timeline()

  tl.to(percentage, {
    progress: 100,
    duration: 1,
    onUpdate() {
      percentage.value = Math.floor(percentage.progress)
    },
    onComplete() {
      general.isPreloaderVisible = false
    },
  })

  tl.fromTo(
    '.preloader',
    {
      clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
    },
    {
      clipPath: 'polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)',
      duration: 1,
    },
  )
})
</script>

<template>
  <div>
      <div class="preloader"> 
        <div class="w-full">
          <div class="w-full">
            <img src="https://i.pinimg.com/originals/7d/10/d4/7d10d49f8cc89bde04981a5dfa644bad.gif" class="mx-auto transform w-96 flip-horizontal"/>
            <!-- Chat qui court: https://i.pinimg.com/originals/ad/18/74/ad1874f2fb6b3a4c6587052229f82393.gif -->
            <!-- Chat qui prie: https://media0.giphy.com/media/I2BOFBa1HspMBZH8Dv/giphy.gif -->
            <!-- Chat qui bouge:  https://i.pinimg.com/originals/44/a8/da/44a8dabf0e4bf6e2616cd0f6d0ce5912.gif -->
            <!-- Cheval qui cours: https://usagif.com/wp-content/uploads/gifs/gif-horse-122.gif -->
          </div>
          <div class="pt-10 mx-auto text-5xl text-center text-white preloader-percent">{{ percentage }}%</div>
          
        </div>

      </div>
  </div>
    
 
</template>
<style lang="scss" scoped>
.preloader {
  position: fixed;
  inset: 0;
  z-index: 50;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgb(4, 31, 4);
  color: black;
}
.flip-horizontal {
  transform: scale(-1,1)
}
</style>
