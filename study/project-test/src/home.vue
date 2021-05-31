<template>
    <div class="home">
        <p>欢迎进入系统!</p>
        <CpDialog></CpDialog>
    </div>
</template>
<script>
import CpDialog from "./test/Dialog.vue";
export default {
    name: "page-home",
    components: {
        CpDialog,
    },
};
</script>
<style lang="scss">
.home {
    font-size: 24px;
    text-align: center;
    margin: 100px;
    font-weight: 600;
}
</style>
