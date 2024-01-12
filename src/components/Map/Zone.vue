<script setup lang="ts">
import { useUserStore } from '../../store/user';

const userStore = useUserStore()

defineProps<{
  className: string;
  number: number;
}>()

</script>

<template>
    <div :class="className">
        <div class="flex items-center justify-center border-[0.2vw]  rounded-full w-[3vw] h-[6vh]" :class="{'border-gray-700 bg-gray-500': userStore.userData.zone < number, 'border-green-700 bg-green-500':  userStore.userData.zone > number, 'border-red-700 bg-red-500':  userStore.userData.zone === number}">
            <div v-if="userStore.userData.zone >= number" class="text-[2vw] flex justify-center items-center mt-[0.6vh] -ml-[0.1vw]">
                {{ number }}
            </div>  
            <img v-if="userStore.userData.zone < number" src="~/assets/img/lock.png" class="h-[3vh]" />
        </div>
    </div>
</template>