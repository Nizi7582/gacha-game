<script setup lang="ts">
// import { ref } from 'vue';
// import { useSupabaseClient } from '../../../node_modules/@nuxtjs/supabase/dist/runtime/composables/useSupabaseClient';
import MapServices from '../../services/MapServices';
import { useUserStore } from '../../store/user';
import { useFightStore } from '../../store/fight';

const userStore = useUserStore()
const fightStore = useFightStore()
const supabase = useSupabaseClient()

const userCards = ref([])

// Create an instance of the 'InvocationServices' class
const mapServices = new MapServices();

async function loadUserCardsByEmail() {
  const { data, error } = await supabase
    .from('user_cards')
    .select(`
      *,
      cards (
        *
      )
    `)
    .eq('email_user', userStore.userData.email);

  if (error) {
    console.log('Error', error);
  } else {
    userCards.value = data;
  }
}

onMounted(async () => {
    const { data, error } = await supabase
    .from('user_cards')
    .select(`
      *,
      cards (
        *
      )
    `)
    .eq('email_user', userStore.userData.email);

  if (error) {
    console.log('Error', error);
  } else {
    userCards.value = data;
    console.log(userCards.value)
  }
});
</script>


<template>
    <NuxtLayout name="custom">
        <div v-if="userStore.userData.currentZone === 0" class="min-h-screen h-full w-full">
            <MapZone v-for="map in mapServices.maps" class="fixed cursor-pointer transition hover:scale-125" :class="map.className" :number="map.number" :completed="true" @click="mapServices.sendZone(map.number)"/>
            <div
                class="w-full h-screen bg-[url('~/assets/img/map.png')] bg-center bg-cover fixed top-0 -z-20 "
            ></div>
        </div>
        <div v-if="userStore.userData.currentZone != 0" class="min-h-screen h-full w-full">
            <div class="absolute top-3 left-0">
                <button class="flex items-center transition hover:scale-110" @click="userStore.userData.currentZone = 0">
                    <img src="~/assets/img/back-arrow.png" class="h-16" />
                    <div class="text-purple-500 font-bold text-4xl mt-2"> Previoso</div>
                </button>
            </div>
            <div class="w-full h-screen grid grid-cols-6">
                <div class="w-full bg-gray-400/40 h-screen overflow-y-auto">
                    <div class="flex justify-center p-7 ">
                        <div class="text-5xl">
                            Combat {{ userStore.userData.currentZone }}
                        </div>
                    </div>
                    <div v-for="unit in userCards" class="border-r border-t h-[30vh]">
                        <img :src="unit.cards.image" class="w-full" />
                    </div>
                </div>
                <div class="w-full bg-blue-400/40 h-screen col-span-4">
                    <div >
                    </div>
                </div>
                
                <div class="w-full bg-red-400/40 h-screen">
                </div>
            </div>
            <div
                class="w-full h-screen bg-[url('~/assets/img/war_background.png')] bg-center bg-cover fixed top-0 -z-20 "
            ></div>
            
        </div>
    </NuxtLayout>

</template>