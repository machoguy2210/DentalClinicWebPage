<script setup></script>
<template>
    <div class="bg-blue-100 flex align-items-center" style="gap: 25rem;">
    <div class="flex align-items-center gap-8">
        <div class="w-20rem ml-8">
            <img src="../public/imagins/Logo-Minh-Thu.png" class="w-full">
        </div>

        <div class="p-input-icon-left ml-5 w-25rem align-items-center" style="height: 2.5rem;">
            <i class="pi pi-search -mt-2" />
            <InputText v-model="value1" placeholder="Search" class="pl-5 w-full h-full"/>
        </div>
    </div>
    <div class="flex" style="gap: 10rem;">
    <div class="flex align-items-center gap-3">
        <div id="FB" class="relative">
        <i id="fb" class="pi pi-facebook text-3xl"></i>
            <div id="ifb">
            <a href="" class="absolute surface-900 text-white flex border-round w-10rem h-2rem align-items-center justify-content-center">Follow on Facebook</a>
            </div>
        </div>
        <div id="INS" class="relative">
        <i id="ins" class="pi pi-instagram text-3xl"></i>
            <div id="iins">
            <a href="" class="absolute surface-900 text-white flex border-round w-10rem h-2rem align-items-center justify-content-center">Follow on Instagram</a>
            </div>
        </div>
        <div id="YT" class="relative">
        <i id="yt" class="pi pi-youtube text-3xl"></i>
            <div id="iyt">
            <a href="" class="absolute surface-900 text-white flex border-round w-10rem h-2rem align-items-center justify-content-center">Follow on Youtube</a>
            </div>
        </div>

        </div>
        <div class="flex align-items-center">
            <div style="width: 2.5rem;">
                <img src="../public/imagins/hour.png" alt="" class="w-full border-circle">
            </div>
            <span class="text-2xl">Username</span>
        </div>
    </div>
</div>
</template>
<style scoped>
#ifb{
    display: none;
}
#FB:hover #ifb{
    display: inline;
}
#iins{
    display: none;
}
#INS:hover #iins{
    display: inline;
}
#iyt{
    display: none;
}
#YT:hover #iyt{
    display: inline;
}
</style>