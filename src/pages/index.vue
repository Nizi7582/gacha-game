<script setup lang="ts">
import { useUserStore } from '~/store/user'

const userStore = useUserStore()
const supabase = useSupabaseClient()

definePageMeta({
  pageTransition: {
    name: 'rotate',
  },
})

const userData = ref([])
const pourcentage = ref(0)
const cat_choice = ref('')
const level = ref(0)
const levelCount = ref(0)
const dialog = ref(false)

async function chooseCharacter(character_name:String) {
  const test = await supabase.from('users').update({ character: character_name }).eq('email', userStore.userData.email)

  if (test) {
    console.log('Personnage choisit')
    location.reload();
  }
}
onMounted(async () => {
  // Retrieve user data based on email
  const { data, error } = await supabase
    .from('users')
    .select('*') // '*' selects all columns; you can specify specific columns if needed
    .eq('email', userStore.userData.email)

  if (error) {
    console.error('Error fetching user data:', error)
  } else {
    // Store the user data in the userData ref
    level.value = Math.trunc(data[0].level)
    pourcentage.value = (data[0].level - level.value) * 100
    // userData.value = data
    // userStore.userData.character = data[0].character
  }
})

watch(pourcentage, async (newPourcentage) => {
  levelCount.value = level.value + newPourcentage / 100

  const test = await supabase
    .from('users')
    .update({ level: levelCount.value })
    .eq('email', userStore.userData.email)

  if (newPourcentage >= 100) {
    level.value += 1
    pourcentage.value = newPourcentage - 100
  }
})
</script>

<style>
.size-custom2 {
  width: 30%;
  height: 80%;
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
  <NuxtLayout name="custom">
  <div class="w-full relative overflow-hidden">
    <div v-if="userStore && userStore.userData && userStore.userData.character != '' && userStore.userData.character != undefined"
      class=" w-full h-screen"
    >
      <div class="w-full h-full">
        <div class="flex items-start justify-between">
          <div class="flex items-center w-full h-full">
            <div
              class="flex w-full max-w-lg p-4 border border-gray-800 rounded-br-xl gap-x-6 bg-gradient-to-tl from-gray-300/20 via-gray-500/20 to-gray-400/20"
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
                  <span class="text-yellow-600 cursor-pointer" @click="pourcentage += 23">
                    {{ userStore.userData.name }}
                  </span>
                  - Level {{ userStore.userData.level }}
                </div>
                <div class="text-xl text-white">
                  {{ userStore.userData.email }}
                </div>
                <div class="text-xl text-white">
                  <NuxtLink to="/inventory" >
                    Inventory
                  </NuxtLink>
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
                        <span class="p-1 text-white">
                          {{ Math.round(pourcentage) }}%
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div></div>
        </div>
      <HomeMenu class="fixed bottom-0 left-0 right-0 z-10" />

      </div>

      <div
        class="w-full h-screen bg-[url('~/assets/img/home.png')] bg-center bg-cover fixed top-0 -z-20"
      >

      </div>
      <div class="absolute bottom-0 right-[10%] size-custom2 -z-10">
        <div v-if="userStore && userStore.userData && userStore.userData.character === 'sumimasen'"
          @click="dialog = true"
          class="bg-[url('~/assets/img/cat_cross.png')] w-full h-full bg-cover"
        ></div>
      </div>
    </div>
    <div v-if="userStore.userData.character === ''" class="relative w-full h-screen" >
      <div class="p-4">
        <!-- <div class="flex items-center justify-center gap-4 bg-gradient-to-b from-purple-800 via-purple-900 to-blue-900">
          <div
            class="text-5xl text-white "
          >
            Sachiburidana...
          </div>
          <img src="~/assets/img/gachat_logo.png" class="mt-4 w-28" />
          <div
            class="text-5xl text-white "
          >
            Gachat Worldo
          </div>
        </div> -->
        <div class="flex items-center justify-center py-8 rounded-lg bg-gradient-to-t from-gray-800 via-purple-900 to-blue-900">
          <div
            class="text-5xl text-white "
          >
            Chooso cato
          </div>
        </div>
      </div>
      

      <div
        class="w-full h-screen bg-[url('~/assets/img/cat_choice.png')] bg-center bg-cover fixed top-0 -z-20"
      ></div>

      <div
        class="absolute -bottom-[3%] hover:bottom-[9%] z-10 left-[3%] w-[27%] h-[56%] transition-all duration-[1000ms] group"
      >
        <button
          @click="dialog = true"
          class="bg-[url('~/assets/img/cat_character3.png')] w-full h-full bg-cover hover:scale-105 duration-[1000ms] hover:w-full transition"
        >
        <div
            class="flex flex-col items-center h-full px-2 pt-1 transition-all duration-700 transform border-2 border-blue-800 shadow-xl opacity-0 items-between bg-gradient-to-tl from-gray-900 via-purple-900 to-blue-900 rounded-xl group-hover:opacity-80"
          >
            <div class="self-start h-full p-4 text-2xl tracking-wider text-white lg:text-3xl">
              <div>Aligato</div>
              <p class="pt-4 text-white">応ぎたれぴ結文のンまづ制固クぼら断35医チア写都ホヘ録伝う追記並る職針14会るぶやぎ択供無怒。</p>
            </div>
              
            <div @click="chooseCharacter('aligato')" class="self-center px-4 pt-1 mb-3 text-2xl tracking-wider text-white transition border rounded-lg cursor-pointer lg:text-3xl hover:bg-gray-200 hover:text-gray-800">
              <div>Selecto</div>
            </div>
          </div>
        </button>
      </div>

      <div
        class="absolute -bottom-[3%] hover:bottom-[9%] z-10 left-[37%] w-[27%] h-[56%] transition-all duration-[1000ms] group"
      >
        <button
          @click="dialog = true"
          class="bg-[url('~/assets/img/cat_character2.png')]  w-full h-full bg-cover hover:scale-105 duration-[1000ms] hover:w-full transition"
        >
        <div
            class="flex flex-col items-center h-full px-2 pt-1 transition-all duration-700 transform border-2 border-blue-800 shadow-xl opacity-0 items-between bg-gradient-to-tl from-gray-900 via-purple-900 to-blue-900 rounded-xl group-hover:opacity-80"
          >
            <div class="self-start h-full p-4 text-2xl tracking-wider text-white lg:text-3xl">
              <div>Sumimasen</div>
              <p class="pt-4 text-white">区ラリさぱ路転6風ナ話8性者おをドじ進断チオ銀応茨でけ地1地ばのねど新北ラゆ視格かぶクぽ備輸こあひぼ院三ミニオ雑包孤湖ふ。</p>
            </div>
              
            <div @click="chooseCharacter('sumimasen')" class="self-center px-4 pt-1 mb-3 text-2xl tracking-wider text-white transition border rounded-lg cursor-pointer lg:text-3xl hover:bg-gray-200 hover:text-gray-800">
              <div>Selecto</div>
            </div>
          </div>
        </button>
        
      </div>
      
      <div class="absolute -bottom-[4%] hover:bottom-[10%] transition-all z-10 right-[4%] w-[25%] h-[60%] duration-[1000ms] group">
        <button
          @click="dialog = true"
          class="bg-[url('~/assets/img/cat_character1.png')] group w-full h-full bg-cover hover:scale-105 duration-[1000ms] hover:w-full transition "
        >
          <div
            class="flex flex-col items-center h-full px-2 pt-1 transition-all duration-700 transform border-2 border-blue-800 shadow-xl opacity-0 items-between bg-gradient-to-tl from-gray-900 via-purple-900 to-blue-900 rounded-xl group-hover:opacity-80"
          >
            <div class="self-start h-full p-4 text-2xl tracking-wider text-white lg:text-3xl">
              <div>Kudasai</div>
              <p class="pt-4 text-white">紙ラら前在ちトよゅ載内ルりべろ風数市ぐれむゆ載玲タモカ断帯サソル細4需都け風中ょ求権授ネセマ結97求く一嶋すひス総祥リ仮知ぶ限棋ソキカ芸意コテス摘占祉系ごイばき。</p>
            </div>
              
            <div @click="chooseCharacter('kudasai')" class="self-center px-4 pt-1 mb-3 text-2xl tracking-wider text-white transition border rounded-lg cursor-pointer lg:text-3xl hover:bg-gray-200 hover:text-gray-800">
              <div >Selecto</div>
            </div>
          </div>
        </button>
      </div>
    </div>
    <!-- <div v-else class="w-full h-screen bg-[url('~/assets/img/home.png')] bg-center bg-cover fixed top-0 -z-20"></div> -->
  </div>
</NuxtLayout>
</template>
