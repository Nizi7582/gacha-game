<script setup lang="ts">
const { userData } = defineProps(['userData']);
const userDataRef = ref(userData);

watch(() => {
  userDataRef.value = userData;
});
</script>

<template>
<div>
    <div class="flex items-end justify-center gap-x-[50px] h-full"></div>
        <div class="flex justify-center h-12 absolute top-0 mb-40 mt-4 z-10">
        <div class="flex justify-center items-center gap-3 group w-auto mr-5 px-5 bg-gradient-to-tl from-gray-900 via-gray-800 to-gray-900 rounded-3xl">
            <img src="~/assets/img/gem.png" class="w-6 h-6 mx-auto transition duration-700 opacity-60 group-hover:opacity-100 group-hover:scale-105" />
            <div class="text-2xl uppercase text-white mt-2">{{ userData.gems }}</div>
        </div>
        <div class="flex items-center w-auto px-5 gap-3 group bg-gradient-to-tl from-gray-900 via-gray-800 to-gray-900 rounded-3xl">
            <img src="~/assets/img/coin-pic.png" class="w-6 h-6 mx-auto transition duration-700 opacity-60 group-hover:opacity-100 group-hover:scale-105" />
            <div class="text-2xl uppercase text-white mt-2">{{ userData.coins }}</div>
        </div>
    </div>
</div>
</template>