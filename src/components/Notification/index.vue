<template>
  <div v-if="isNotificationVisible">
    <div
      v-for="(msg, index) in notification.messages"
      :key="index"
      :class="`uk-alert-${notification.type} uk-margin-small`"
      uk-alert
    >
      <a class="uk-alert-close" @click="closeNotification" uk-close></a>
      <p>{{ msg[0] }}</p>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'NotificationsComponent',
    computed: {
      notification() {
        return this.$store.getters['getNotification'];
      },
      isNotificationVisible() {
        return Object.entries(this.notification).length;
      },
    },
    created() {
      if (this.isNotificationVisible) {
        this.$store.commit('CLEAR_NOTIFICATION');
      }
    },
    methods: {
      closeNotification() {
        this.$store.commit('CLEAR_NOTIFICATION');
      },
    },
  };
</script>
<style scoped>
  .uk-alert-success {
    color: #3c763d !important;
  }
  .uk-warning-warning {
    background-color: #f0ad4e;
    color: #fff;
    border: 1px solid transparent;
  }
  .uk-button-danger:focus,
  .uk-button-danger:hover {
    background-color: #eb9316;
    color: #fff;
  }
</style>
