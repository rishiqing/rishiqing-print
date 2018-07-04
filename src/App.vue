<template>
  <div id="app">
    <Header :title="title"></Header>
    <div class="body">
      <router-view/>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import Header from '@/components/Header.vue';

export default {
  name: 'app',
  computed: {
    ...mapState({
      title: state => state.headerTitle,
    }),
  },
  components: {
    Header,
  },
};
</script>

<style lang="scss">
  .body {
    background: #f2f2f2;
    padding-bottom: 34px;
    padding-top: 70px;
  }
</style>
