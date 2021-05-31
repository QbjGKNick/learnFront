<template>
  <c-breadcrumb class="app-breadcrumb" separator="/">
    <c-breadcrumb-item v-for="(item, index) in items" :key="index">
      <a @click="handleNav(item, index)">
        {{ item.text }}
      </a>
    </c-breadcrumb-item>
  </c-breadcrumb>
</template>

<script>
  export default {
    name: "CpBreadCrumb",
    props: {
      items: {
        type: Array,
        default: () => []
      }
    },
    computed: {
      list() { return this.items.filter(item => item.text) }
    },
    methods: {
      handleNav(item) {
        window.eventBus && window.eventBus.$emit('breadcrumb-click')
        this.$router && this.$router.push({
          path: item.url || item.redirect || item.path
        })
      }
    }
  }
</script>
