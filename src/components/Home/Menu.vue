<style></style>

<template>
  <div class="flex items-end justify-center gap-x-[50px] h-full ">
   
    <NuxtLink to="/inventory" class="flex justify-center mb-6 group">
      <button
        class="flex justify-center py-2 w-32 h-32 items-center  border-white rounded-3xl  bg-gradient-to-tl from-gray-900 via-gray-800 to-gray-900"
      >
        <button class="z-20 group">
          <img
            src="~/assets/img/bag.png"
            class="w-20 mx-auto transition duration-700 opacity-60 group-hover:opacity-100 group-hover:scale-105"
          />
          <div class="text-2xl uppercase text-white mt-2">Bago</div>

        </button>
      </button>
    </NuxtLink>
    <NuxtLink to="/map" class="group mb-6 bg-gradient-to-tl from-gray-900 via-yellow-900 to-yellow-900 rounded-full border-2 p-3">
      <button
        class="flex justify-center py-4 w-36 h-36 items-center border-2 border-white rounded-3xl bg-gradient-to-tl from-gray-300 via-gray-500 to-gray-400"
      >
        <button class="z-20">
          <img
            src="~/assets/img/cat-map.png"
            class="w-24 mx-auto transition duration-700 hover:opacity-100 group-hover:scale-105"
          />
          <div class="text-3xl uppercase text-white">Carto</div>
        </button>
      </button>
    </NuxtLink>
    <NuxtLink to="/invocations" class="flex justify-center mb-6 group">
      <button
        class="flex justify-center py-2 w-32 h-32 items-center  border-white rounded-3xl  bg-gradient-to-tl from-gray-900 via-gray-800 to-gray-900"
      >
        <button class="flex flex-col items-center gap-y-2 z-20">
          <img
            src="~/assets/img/gate.png"
            class="w-16 mx-auto transition duration-700 opacity-60 group-hover:opacity-100 group-hover:scale-105"
          />
          <div class="text-2xl uppercase text-white">Invocation</div>

        </button>
      </button>
    </NuxtLink>

    
    
  </div>
</template>
