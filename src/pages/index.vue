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
const dialog = ref(false)

watch(pourcentage, (newPourcentage) => {
  if (newPourcentage >= 100) {
    level.value += 1
    pourcentage.value = newPourcentage - 100
  }
})
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
                <button
                  class="absolute w-20 h-20 transition duration-700 rotate-45 border border-gray-800 rounded-md bottom-7 bg-gradient-to-b from-yellow-900 via-green-900 to-yellow-900 group-hover:rotate-180"
                ></button>
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
        class="w-full h-screen bg-[url('https://files.oaiusercontent.com/file-gWpiyg06uLhP8pZHY8BIvwxx?se=2023-12-28T16%3A00%3A03Z&sp=r&sv=2021-08-06&sr=b&rscc=max-age%3D31536000%2C%20immutable&rscd=attachment%3B%20filename%3D966b780d-1b01-464e-b07f-dc85a62051c4.webp&sig=ViFlYH6GJfqXUuxltAmOdnDzVjFitvqhNtDjUSLLqXs%3D')] bg-center bg-cover fixed top-0 -z-20"
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
