<template>
  <div
    class="uk-flex-top"
    :class="{ 'uk-open': showModal, 'uk-modal': true }"
    :style="showModal ? 'display: block;' : ''"
    uk-modal
  >
    <div class="uk-modal-dialog uk-overflow-auto">
      <button class="uk-modal-close-default" type="button" uk-close @click="hide"></button>
      <div class="uk-modal-header uk-text-center">
        <h4 class="uk-h4" v-if="action === 'update'">Editar Usuario</h4>
        <h4 class="uk-h4" v-else>Crear Usuario</h4>
      </div>
      <div class="uk-modal-body" ref="modalUserCrud">
        <NotificationsComponent />
        <div class="uk-card">
          <div class="uk-grid-small uk-child-width-1-1@s" uk-grid>
            <div>
              <div class="uk-margin-small">
                <label class="uk-form-label">Nombre</label>
                <input v-model="user.name" class="uk-input" type="text" />
              </div>
              <div class="uk-margin-small">
                <label class="uk-form-label">Correo Electrónico</label>
                <input v-model="user.email" class="uk-input" type="text" />
              </div>
              <div class="uk-margin-small">
                <label class="uk-form-label">Teléfono</label>
                <input v-model="user.phone" class="uk-input" type="text" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="uk-modal-footer uk-text-center">
        <button class="uk-button uk-button-default uk-modal-close" type="button" @click="hide">Cancelar</button>
        <button
          v-if="action === 'update'"
          class="uk-button uk-button-primary"
          type="button"
          @click="save(user)"
          :disabled="!validate"
        >
          Actualizar
        </button>
        <button v-else class="uk-button uk-button-primary" type="button" @click="save(user)" :disabled="!validate">
          Agregar
        </button>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex';
  import NotificationsComponent from '@/components/Notification';

  export default {
    name: 'ActionsComponent',
    props: {
      action: { type: String, default: '' },
    },
    components: {
      NotificationsComponent,
    },
    data() {
      return {
        showModal: false,
      };
    },
    computed: {
      ...mapGetters({
        user: 'users/getUser',
      }),
      option: {
        get() {
          return this.action;
        },
        set(value) {
          this.action = value;
        },
      },
      isUserSelected() {
        return Object.entries(this.user).length;
      },
      validate() {
        return this.user.name !== '' && this.user.email !== '';
      },
    },
    methods: {
      update() {
        this.hide();
      },
      save(user) {
        let load = this.$loading.show({
          container: this.$refs.modalUserCrud,
          fullPage: false,
        });

        this.$store
          .dispatch(`users/${this.action}`, user)
          .then(() => {
            load.hide();

            if (this.action === 'create') {
              this.$emit('update-action', 'update');
            }
          })
          .catch((err) => {
            load.hide();
          });
      },
      show() {
        this.showModal = true;
      },
      hide() {
        this.$store.state.notification = {};
        this.$store.state.users.user = {};
        this.showModal = false;
      },
    },
  };
</script>

<style></style>
