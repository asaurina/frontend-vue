<template>
  <!--FOOTER-->
  <footer
    class="uk-section uk-section-xsmall uk-section-default uk-position-bottom uk-position-fixed"
    style="background-color: #f2f2f2; border-top: 1px solid #ddd"
  >
    <div class="uk-container uk-container-small uk-text-small">
      <div class="uk-grid" data-uk-grid>
        <div class="uk-width-expand uk-text-center">&copy; {{ year }} - Por Jorge Saurina</div>
      </div>
    </div>
  </footer>
  <!--/FOOTER-->
</template>
<script>
  export default {
    name: 'AppFooter',
    data() {
      return {
        year: new Date().getFullYear(),
      };
    },
  };
</script>
