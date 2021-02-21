<template>
  <div id="users-catalog">
    <div class="uk-section">
      <div class="uk-container uk-container-expand">
        <div class="uk-card uk-card-small">
          <div class="uk-grid-small uk-flex uk-flex-middle" uk-grid>
            <div class="uk-width-1-1 uk-width-expand@s uk-flex uk-flex-middle uk-flex-left">
              <div class="uk-search uk-search-default uk-width-1-1">
                <span uk-search-icon></span>
                <input class="uk-search-input" type="search" debounce="300" />
              </div>
            </div>
            <div class="uk-width-1-1 uk-width-auto@s uk-flex uk-flex-middle uk-flex-left uk-flex-right@m">
              <a class="uk-button uk-button-primary" @click="modal('create')">
                Agregar usuario
              </a>
            </div>
            <div class="uk-width-1-1 uk-margin-top">
              <table
                class="uk-table uk-table-small uk-table-hover uk-table-middle uk-table-striped uk-table-responsive uk-table-divider"
                style="border: 1px solid #e5e5e5;"
              >
                <thead>
                  <tr>
                    <th class="uk-table-shrink uk-visible@l"></th>
                    <th class="uk-table-expand uk-text-nowrap">Nombre</th>
                    <th class="uk-table-expand uk-text-nowrap uk-text-left uk-text-center@m">Email</th>
                    <th class="uk-table-expand uk-text-nowrap uk-text-left uk-text-center@m">Teléfono</th>
                    <th class="uk-width-small uk-text-left uk-text-center@m"></th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="user in users" :key="user.id" class="check-item">
                    <td class="uk-visible@l">{{ user.id }}</td>
                    <td class="uk-text-break">
                      <span>{{ user.name }}</span>
                    </td>
                    <td class="uk-text-left uk-text-center@m">
                      {{ user.email }}
                    </td>
                    <td class="uk-text-left uk-text-center@m">
                      {{ user.phone }}
                    </td>
                    <td class="uk-text-left uk-text-center@m uk-text-primary">
                      <a uk-icon="pencil" :uk-tooltip="'Editar'" @click="modal('update', user)"> </a>
                      <a
                        class="uk-margin-small-left uk-text-danger"
                        uk-icon="trash"
                        :uk-tooltip="'Eliminar'"
                        @click="remove(user.uuid)"
                      >
                      </a>
                    </td>
                  </tr>
                </tbody>
              </table>
              <h3 v-show="!users" class="uk-h3 uk-text-muted uk-text-center">
                No existen usuarios
              </h3>
              <h3 v-show="!users.length" class="uk-h3 uk-text-muted uk-text-center">
                Cargando usuarios...
              </h3>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- START MODAL -->
    <actions-component ref="modal" :action="action" />
    <!-- END MODAL -->
  </div>
</template>
<script>
  import { mapGetters } from 'vuex';
  import ActionsComponent from './actions';

  export default {
    name: 'UsersCatalog',
    components: {
      ActionsComponent,
    },
    data() {
      return {
        action: '',
      };
    },
    computed: {
      ...mapGetters({
        users: 'users/getUsers',
      }),
    },

    mounted() {
      this.load();
    },

    methods: {
      load() {
        let loader = this.$loading.show({
          container: this.$refs.container,
          fullPage: false,
        });
        this.$store
          .dispatch('users/fetchUsers')
          .then(() => {
            loader.hide();
          })
          .catch(() => {});
      },
      modal(option, user) {
        this.action = option;

        if (option === 'update') {
          this.$store.commit('users/SET_USER', user);
        }

        this.$refs.modal.show();
      },
      remove(uuid) {
        let loader = this.$loading.show({
          container: this.$refs.container,
          fullPage: false,
        });
        this.$store
          .dispatch('users/softDelete', uuid)
          .then((response) => {
            loader.hide();

            this.$notify.success({
              position: 'top right',
              title: 'Eliminación',
              msg: response.message[0],
              closeOnClick: true,
            });
          })
          .catch(() => {});
      },
      update(value) {
        this.action = value;
      },
    },
  };
</script>
