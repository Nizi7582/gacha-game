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

const ennemies = ref([
    { image: '~/assets/cards/ennemy1.png', attack: 10, defense: 20, speed: 30 },
    { image: '~/assets/cards/ennemy1.png', attack: 11, defense: 21, speed: 31 },
    { image: '~/assets/cards/ennemy1.png', attack: 12, defense: 22, speed: 32 },
])

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

<style>
#style-4::-webkit-scrollbar-track
{
	-webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
	background-color: #F5F5F5;
}

#style-4::-webkit-scrollbar
{
	width: 10px;
	background-color: #F5F5F5;
}

#style-4::-webkit-scrollbar-thumb
{
	background-color: #000000;
	border: 2px solid #555555;
}
.scrollbar
{
	margin-left: 30px;
	float: left;
	height: 300px;
	width: 65px;
	background: #F5F5F5;
	overflow-y: scroll;
	margin-bottom: 25px;
}

.force-overflow
{
	min-height: 450px;
}
</style>

<template>
    <div>
        <NuxtLayout name="custom">
            <div v-if="userStore.userData.currentZone === 0" class="min-h-screen h-full w-full">
                <MapZone v-for="map in mapServices.maps" class="fixed cursor-pointer transition hover:scale-125" :class="map.className" :number="map.number" :completed="true" @click="mapServices.sendZone(map.number)"/>
                <div
                    class="w-full h-screen bg-[url('~/assets/img/map.png')] bg-center bg-cover fixed top-0 -z-20 "
                ></div>
            </div>
        </NuxtLayout>
    </div>
    
    <div v-if="userStore.userData.currentZone != 0" class="min-h-screen h-full w-full overflow-y-hidden">
        
        <div class="w-full h-screen grid grid-cols-8">
            <div class="w-full bg-gray-400/40 h-screen overflow-y-auto col-span-2 grid grid-cols-2 force-overflow" id="style-4">
                <div v-for="unit in userCards" class="h-full border">
                    <img :src="unit.cards.image" class=" " />
                </div>
            </div>

            <div class="w-full bg-blue-400/40 h-screen col-span-4 flex flex-col">
                <div class="flex justify-center items-start p-4 ">
                    <div class="text-5xl">
                        Battle {{ userStore.userData.currentZone }}
                    </div>
                </div>
                
                <div class="flex justify-between h-full items-end pb-[2vh] ">
                    <button class="flex items-center transition hover:scale-110" @click="userStore.userData.currentZone = 0">
                        <img src="~/assets/img/back-arrow.png" class="h-[10vh]" />
                    </button>
                    
                </div>
            </div>
            
            <div class="w-full bg-gray-400/40 h-screen col-span-2">
                <div v-for="ennemy in fightStore.fightData.ennemies" class="h-[33vh]">
                    <!-- <img src="~/assets/cards/ennemy1.png" class="" /> -->
                    <img :src="ennemy.image" class="" />

                    <!-- {{ ennemy.attack }} -->
                    <div>{{ ennemy.image }}</div>

                </div>
            </div>
        </div>
        <div
            class="w-full h-screen bg-[url('~/assets/img/war_background.png')] bg-center bg-cover fixed top-0 -z-20 "
        ></div>
        
    </div>
</template>

