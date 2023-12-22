<script setup lang="ts">
const pourcentage = ref(0)
const level = ref(0)

watch(pourcentage, (newPourcentage) => {
  if (newPourcentage >= 100) {
    level.value += 1
    pourcentage.value = newPourcentage - 100
  }
})
</script>

<style>
.size-custom {
  width: 25%;
  height: 85%
}
</style>


<template>
  <div class="relative w-full h-screen overflow-hidden bg-gray-900/40">
    
    <div class="w-full h-full">
      <div class="flex items-start justify-between p-6">
        <div class="flex items-center w-full h-full">
          <div
            class="flex w-full max-w-lg p-4 border border-gray-800 rounded-md gap-x-6 bg-gradient-to-bl from-gray-900 to-green-900"
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
                <span class="text-yellow-600">Nizi</span>
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
        <div
          @click="pourcentage += 23"
          class="text-3xl font-semibold text-white lg:text-4xl"
        >
          Strabismo
        </div>
      </div>
      <HomeMenu class="z-10" />
    </div>

    <div
      class="w-full h-screen bg-[url('~/assets/img/home.jfif')] bg-center bg-cover fixed top-0 -z-20"
    >
    <div
      class="absolute bottom-0 z-10 right-[15%] size-custom">
        <div class="bg-[url('~/assets/img/kiki-background-v2.png')] w-full h-full bg-cover">
        </div>
    </div>
    </div>
  </div>
</template>
