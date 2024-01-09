<script setup lang="ts">
import MapServices from '../../services/MapServices';
import { useUserStore } from '../../store/user';

const userStore = useUserStore()

// Create an instance of the 'InvocationServices' class
const mapServices = new MapServices();
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
            <div class="w-full h-screen bg-gray-100/20">
                <div class="w-full h-screen">
                    <div class="flex justify-center">
                        Combat {{  }}
                    </div>
                </div>
            </div>
            <div
                class="w-full h-screen bg-[url('~/assets/img/war_background.png')] bg-center bg-cover fixed top-0 -z-20 "
            ></div>
            
        </div>
    </NuxtLayout>

</template>