<template>
  <div id="app">
    <Header />
    <router-view />
    <Footer />
  </div>
</template>

<script>
  import Header from './components/Header';
  import Footer from './components/Footer';

  export default {
    name: 'App',
    components: {
      Header,
      Footer,
    },
    created() {
      document.title = 'Lista de Usuarios - Prueba';
    },
  };
</script>
<style lang="less">
  @import '../node_modules/uikit/src/less/uikit.less';

  .uk-search-default .uk-search-input {
    background: 0 0 !important;
    border: 1px solid #e5e5e5 !important;
  }
  .uk-input,
  .uk-select,
  .uk-textarea {
    background: #fff;
    border: 1px solid #e5e5e5 !important;
  }
</style>
