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

const attackIcon = ref("https://cdn.pixabay.com/photo/2013/07/13/09/58/attack-156413_960_720.png");
const defenseIcon = ref("https://cdn.pixabay.com/photo/2014/04/03/00/35/shield-308793_1280.png");
const staminaIcon = ref("https://cdn-icons-png.flaticon.com/512/5305/5305259.png");

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

// const rarityClass = {
//   // "~/assets/img/ssr.png": card.cards.rarity === "r",
//   "~/assets/img/sr.png": card.cards.rarity === "sr",
//   "~/assets/img/ssr.png": card.cards.rarity === "ssr",
// };

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
        <NuxtLayout name="custom" v-if="userStore.userData.currentZone === 0">
            <div class="min-h-screen h-full w-full">
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
                <div v-for="unit in userCards" class="h-full ">
                    <img :src="unit.cards.image" class=" " />
                </div>
            </div>

            <div class="w-fullh-screen col-span-4 flex flex-col">
                <div class="flex justify-center items-start p-4 ">
                    <div class="text-[3.5vw]">
                        Battle {{ userStore.userData.currentZone }}
                    </div>
                </div>
                <div class="bg-gray-800/40 h-full flex flex-col justify-between  px-[4vw]">
                  <div class="flex justify-center items-start gap-x-4">
                    <FightSelectedCard v-for="ally in fightStore.fightData.ennemies" :key="ally.id" class="border rounded-xl" :imageSelected="fightStore.fightData.allies" />
                  </div>
                  <div class="text-center font-bold text-purple-400 text-[3vw] text-yellow -mb-3">
                    VS
                  </div>
                  <div class="flex justify-center items-end  gap-x-4">
                    <FightSelectedCard v-for="ennemy in fightStore.fightData.ennemies" :key="ennemy.id" class="border rounded-xl" :imageSelected="fightStore.fightData.allies" />
                  </div>
                </div>

                
                <div class="flex justify-between items-end pb-[2vh] ">
                    <button class="flex items-center transition hover:scale-110" @click="userStore.userData.currentZone = 0">
                        <img src="~/assets/img/back-arrow.png" class="h-[10vh]" />
                    </button>
                    
                </div>
            </div>
            
            <div class="w-full bg-gray-400/40 h-screen col-span-2">
                <div v-for="ennemy in fightStore.fightData.ennemies" class="h-[50vh] relative">
                    <!-- <img src="~/assets/cards/ennemy1.png" class="" /> -->
                    <img :src="'/_nuxt' + ennemy.image" class="" />
                    
                    <!-- {{ ennemy.attack }} -->
                    <div class="absolute bottom-0 z-10 bg-black/70 w-full h-[9vh]">
                      <div class="p-5 grid grid-cols-3">
                        <InventoryStatDisplay :icon="attackIcon" :value="ennemy.attack" />
                        <InventoryStatDisplay :icon="defenseIcon" :value="ennemy.defense" />
                        <InventoryStatDisplay :icon="staminaIcon" :value="ennemy.speed" />
                      </div>
                    </div>

                </div>
            </div>
        </div>
        <div
            class="w-full h-screen bg-[url('~/assets/img/war_background.png')] bg-center bg-cover fixed top-0 -z-20 "
        ></div>
        
    </div>
</template>

