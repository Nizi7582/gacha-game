<script setup lang="ts">
defineProps<{
  className: string;
  number: number;
  completed: boolean;
}>()

</script>

<template>
    <div :class="className">
        <div class="flex items-center justify-center border-[0.2vw]  rounded-full w-[3vw] h-[6vh]" :class="{'border-red-700 bg-red-500': !completed, 'border-green-700 bg-green-500': completed}">
            <div class="text-[2vw] flex justify-center items-center mt-[0.6vh] -ml-[0.1vw]">
                {{ number }}
            </div>  
        </div>
    </div>
</template>