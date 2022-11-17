<template lang="">
    <div>
        <div class="w-96 h-3/4 bg-white rounded-lg px-8 py-10 text-center" role="status">
            <h1>Once uploaded cannot be changed. Do you still wish to continue?</h1>
            <div class="pt-5 flex items-center justify-center space-x-5">
                <div @click="cancel()" class="cursor-default bg-gray-400 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
                    Back
                </div>
                <button @click="upload()" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
                    Continue
                </button>                            
            </div>
        </div>
    </div>
</template>
<script>
export default {
    methods: {
        cancel() {
            this.$root.$refs.profile.waning(false)
        },
        upload() {            
            this.$root.$refs.profile.upload()
        }
    },
}
</script>
<style lang="">
    
</style>