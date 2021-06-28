<template>
  <div v-if="clientsLoaded">
    <div class="app flex flex-column">
      <Navigation />
      <div class="app-content flex flex-column">
        <Modal v-if="modalActive" />
        <transition name="client">
          <ClientModal v-if="clientModal" />
        </transition>
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
import Navigation from "./components/Navigation.vue";
import Modal from "./components/Modal.vue";
import ClientModal from "./components/ClientModal.vue";
import { mapState, mapActions } from "vuex";

export default {
  data() {
    return {};
  },
  components: {
    Navigation,
    ClientModal,
    Modal,
  },
  created() {
    this.GET_CLIENTS()
  },
  methods: {
    ...mapActions(["GET_CLIENTS"]),

  },
  computed: {
    ...mapState(["clientModal", "modalActive", "clientsLoaded"]),
  },
};
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600&display=swap");

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Poppins", sans-serif;
}

.app {
  background-color: #141625;
  min-height: 100vh;

  @media (min-width: 900px) {
    flex-direction: row !important;
  }

  .app-content {
    padding: 0 20px;
    flex: 1;
    position: relative;
  }
}

// Animated client modal
.client-enter-active,
.client-leave-active {
  transition: 0.8s ease all;
}

.client-enter-from,
.client-leave-to {
  transform: translateX(-700px);
}

button,
.button {
  cursor: pointer;
  padding: 16px 24px;
  border-radius: 30px;
  border: none;
  font-size: 12px;
  margin-right: 8px;
  color: #fff;
}

.dark-purple {
  background-color: #252945;
}

.red {
  background-color: #ec5757;
}

.purple {
  background-color: #7c5dfa;
}

.orange {
  background-color: #ff8f00;
}

.flex {
  display: flex;
}

.flex-column {
  flex-direction: column;
}

.container {
  width: 100%;
  padding: 40px 10px;
  max-width: 850px;
  margin: 0 auto;
  @media (min-width: 900px) {
    padding-top: 72px;
  }
}

.nav-link {
  text-decoration: none;
  color: #fff;
}
</style>
