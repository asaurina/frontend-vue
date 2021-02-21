<template>
  <div id="app">
    <Header />
    <router-view />
    <Footer />
  </div>
</template>

<script>
  import { mapGetters } from 'vuex';
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
