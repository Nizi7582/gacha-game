<script setup>

	const props = defineProps({
		title: String,
		pageName: String,
	})

	// watch(() =>
	// 	[general.isTransitionStart, general.isPreloaderVisible],
	// 	([transitionStart, preloaderVisibility]) => {

	// 	if(transitionStart && !preloaderVisibility) {
	// 		firstScreenAnimation({parent: `.${props.pageName}`})
	// 	}
	// })


</script>


<template>
    <div>
        <!-- <TheHeader /> -->
        <div class="page-wrap">
			<!-- <PageTransition /> -->

            <div class="absolute z-50 page-wrap top-6 right-6">

                <NuxtLink to="/" class="text-3xl text-white lg:text-4xl">
                    Strabismo
                </NuxtLink>
            </div>
            <slot />
        </div>
    </div>
</template>



<style lang='scss' scoped>

._container {
	width: 100%;
	padding-left: 32px;
	padding-right: 32px;
}


</style>