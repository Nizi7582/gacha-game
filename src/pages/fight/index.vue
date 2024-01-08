<script setup lang="ts">
import FightServices from '../../services/FightServices';

// Create an instance of the 'InvocationServices' class
const fight = new FightServices();
</script>


<template>
    <NuxtLayout name="custom">
        <div class="min-h-screen h-full w-full">
            <MapZone v-for="map in fight.maps" class="absolute cursor-pointer transition hover:scale-125" :class="map.className" :number="map.number" :completed="true" @click="fight.sendZone(map.number)"/>
            <div
                class="w-full h-screen bg-[url('~/assets/img/map.png')] bg-center bg-cover fixed top-0 -z-20 "
            ></div>
        </div>
    </NuxtLayout>

</template>