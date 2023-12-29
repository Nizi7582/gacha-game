<script setup lang="ts">
import { useUserStore } from '~/store/user';

const userStore = useUserStore()
const supabase = useSupabaseClient()
const userSupabase = supabase.auth.getUser()

definePageMeta({
  pageTransition: {
    name: 'rotate',
  },
})

const pourcentage = ref(0)
const level = ref(0)
const levelCount = ref(0)
const dialog = ref(false)

// async function sendLevel() {
//    const test = await supabase.from('users').update({ level: level.value }).eq('email', userStore.userData.email).select()
//    if (test) {
//     console.log(supabase.auth.getUser())
//    }
// }
onMounted(async () => {
  // Retrieve user data based on email
  const { data, error } = await supabase
    .from('users')
    .select('*') // '*' selects all columns; you can specify specific columns if needed
    .eq('email', userStore.userData.email);

  if (error) {
    console.error('Error fetching user data:', error);
  } else {
    // Store the user data in the userData ref
    level.value = Math.trunc(data[0].level)
    pourcentage.value = (data[0].level - level.value)*100
  }
});

watch(pourcentage, async (newPourcentage) => {
  levelCount.value = level.value + newPourcentage/100
  
  const test = await supabase.from('users').update({level: levelCount.value}).eq('email', userStore.userData.email)
  
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
                <div class="text-xl text-white">
                  {{ userStore.userData.email}}
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
                        <span class="p-1 text-white">{{ Math.round(pourcentage) }}%</span>
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
