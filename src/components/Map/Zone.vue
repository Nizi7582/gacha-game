<script setup lang="ts">
defineProps<{
  className: string;
  number: string;
  completed: boolean;
}>()

</script>

<template>
    <div :class="className">
        <div class="border-2  rounded-full w-10 h-10" :class="{'border-red-700 bg-red-500': !completed, 'border-green-700 bg-green-500': completed}">
            <div class="text-3xl flex justify-center items-center mt-[3px] -ml-[2px]">
                {{ number }}
            </div>  
        </div>
    </div>
</template>