<script setup lang="ts">
// const { $gsap: gsap, $Draggable: Draggable } = useNuxtApp();

// definePageMeta({
//   pageTransition: {
//     name: 'slide-right',
//     mode: 'out-in'
//   },
// })

definePageMeta({
  pageTransition: {
    name: 'rotate',
  },
})

const pourcentage = ref(0)
const level = ref(0)
const levelCount = ref(0)
const dialog = ref(false)

watch(pourcentage, (newPourcentage) => {
  if (newPourcentage >= 100) {
    level.value += 1
    pourcentage.value = newPourcentage - 100
    levelCount.value = level.value + pourcentage.value
    console.log(levelCount.value)
  }
})


5.65

</script>

<style>
.size-custom {
  width: 35%;
  height: 85%;
}
.page-enter-active,
.page-leave-active {
  transition: all 0.4s;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
  filter: blur(1rem);
}
</style>

<template>
  <NuxtLayout name="custom" class="w-full overflow-hidden">
    <div class="relative w-full h-screen">
      <div class="w-full h-full">
        <div class="flex items-start justify-between">
          <div class="flex items-center w-full h-full">
            <div
              class="flex w-full max-w-lg p-4 border border-gray-800 rounded-br-3xl gap-x-6 bg-gradient-to-bl from-gray-900 to-green-900"
            >
              <!-- <img
                src="~/assets/img/empty-avatar.jpg"
                class="border-4 border-yellow-800 rounded-full h-28"
              /> -->
              <img
                src="~/assets/img/empty-avatar.jpg"
                class="border-4 border-yellow-800 rounded-full h-28"
              />
              <div class="flex flex-col justify-center w-full">
                <div class="text-4xl text-white">
                  <span class="text-yellow-600" @click="pourcentage += 23">
                    Nizi
                  </span>
                  - Level {{ level }}
                </div>

                <div class="">
                  <div class="relative">
                    <div class="p-1 border border-yellow-800 rounded-full">
                      <div
                        class="flex items-center justify-center h-6 leading-none transition-all duration-700 bg-yellow-700 rounded-full text-md"
                        :style="
                          'width: ' +
                          pourcentage +
                          '%; height: 85%; max-width: 100%'
                        "
                      >
                        <span class="p-1 text-white">{{ pourcentage }}%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div></div>
        </div>
        <HomeMenu class="z-10" />
      </div>

      <div
        class="w-full h-screen bg-[url('~/assets/img/home.png')] bg-center bg-cover fixed top-0 -z-20"
      ></div>
      <div class="absolute bottom-0 z-10 right-[10%] size-custom">
        <button
          @click="dialog = true"
          class="bg-[url('~/assets/img/cat_cross.png')] w-full h-full bg-cover"
        ></button>
      </div>
    </div>
  </NuxtLayout>
</template>
