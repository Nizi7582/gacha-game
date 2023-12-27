<template>
    <div class="flex items-end justify-center h-full">
        <NuxtLink to="/invocations" class="flex justify-center mb-10 group">
            <div
                class="absolute px-2 pt-1 text-2xl font-semibold tracking-wider text-white duration-700 transform border-2 border-green-800 shadow-xl opacity-0 bg-gradient-to-tl from-gray-900 to-green-900 rounded-xl transition-allx bottom-28 group-hover:bottom-32 lg:text-3xl group-hover:opacity-100"
            >
                Invocation
            </div>
            <button class="absolute z-20 w-20 h-20 bottom-7">
                <img
                src="~/assets/img/gate.png"
                class="h-12 mx-auto transition duration-700 opacity-60 group-hover:opacity-100 group-hover:scale-105"
                />
            </button>
            <button
                class="absolute w-20 h-20 transition duration-700 rotate-45 border border-gray-800 rounded-md bottom-7 bg-gradient-to-b from-yellow-900 via-green-900 to-yellow-900 group-hover:rotate-180"
            ></button>
            <button
                class="absolute border-2 bottom-7 rounded-md border-gray-800 bg-gradient-to-tl from-gray-900 to-green-900 w-20 h-20 rotate-[0deg] group-hover:rotate-[135deg] duration-700 transition"
            ></button>
        </NuxtLink>
    </div>
</template>