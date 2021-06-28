<template>
    <div v-if="currentClient" class="client-view container">
      <Loading v-show="loading" />
      <div class="header flex">
        <div class="left flex">
          <router-link class="nav-link flex" :to="{ name: 'Home' }">
            <img src="@/assets/icon-arrow-left.svg" alt="" height="20" width="20" class="back_logo"/> <span>Go Back</span>
          </router-link>
        </div>
        <div class="right flex">
          <button @click="toggleEditClient" class="dark-purple">Edit</button>
          <button @click="deleteClient(currentClient.id)" class="red">Delete</button>
        </div>
      </div>
      <div class="card flex-column">
        <div class="image_div flex">
            <img :src="getProfilePhoto()" alt="{client.first_name}" width="70" height="70">
        </div>
        <div class="client_details flex-column">
          <div class="input flex flex-column">
            <label for="first_name">First Name</label>
            <h2>{{ currentClient.first_name }}</h2>
          </div>
          <div class="input flex flex-column">
            <label for="last_name">Last Name</label>
            <h2>{{ currentClient.last_name }}</h2>
          </div>
          <div class="input flex flex-column">
            <label for="email">Email Address</label>
            <h2>{{ currentClient.email }}</h2>
          </div>
          <div class="input flex flex-column">
            <label for="date_profiled">Date Profiled</label>
            <h2>{{ parseDate(currentClient.date_profiled) }}</h2>
          </div>
          <div class="input flex flex-column">
            <label for="primary_legal_counsel">Primary Legal Counsel</label>
            <h2>{{ currentClient.primary_legal_counsel }}</h2>
          </div>
          <div class="input flex flex-column">
            <label for="date_of_birth">Date of birth</label>
            <h2>{{ currentClient.date_of_birth }}</h2>
          </div>
          <div class="input flex flex-column">
            <label for="case_details">Case Details</label>
            <h2>{{ currentClient.case_details }}</h2>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
import axios from 'axios';
import Loading from "../components/Loading.vue";
import { mapMutations, mapState, mapActions } from "vuex";

export default {
  name: "clientView",

  data() {
    return {
      loading: null,
      currentClient: null,
    }
  },

  components: {
    Loading,
  },

  created() {
    this.getCurrentClient();
  },

  methods: {
    ...mapMutations(["SET_CURRENT_CLIENT", "TOGGLE_EDIT_CLIENT", "TOGGLE_CLIENT"]),

    ...mapActions(["DELETE_CLIENT"]),

    toggleEditClient() {
      this.TOGGLE_EDIT_CLIENT(),
      this.TOGGLE_CLIENT()
    },

    getCurrentClient() {
      this.SET_CURRENT_CLIENT(this.$route.params.id);
      this.currentClient = this.currentClientArray[0]
    },

    getProfilePhoto() {
        return "http://www.nretnil.com/avatar/LawrenceEzekielAmos.png"
    },

    parseDate(date) {
        const options = { weekday: "long", year: "numeric", month: "long", day: "numeric" };

        return new Date(date).toLocaleDateString('en-US', options)
    },

    async deleteClient(id) {
      axios
        .delete(`http://127.0.0.1:8000/api/client/${id}`)
        .then(async (res) => {
          if (res.data.status === 200) {
            await this.DELETE_CLIENT(id);
            alert("Client deleted successfully!");
            this.loading = true;
            this.$router.push({ name: "Home" });
          }
        })
        .catch((err) => {
          console.log(err.message);
        });
    },
  },
  computed: {
    ...mapState(["currentClientArray", "editClient"]),
  },
  watch: {
    editClient() {
      if (!this.editClient) {
        this.currentClient = this.currentClientArray[0];
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .client-view {
    .header {
      justify-content: space-between;
    }

    .nav-link {
      margin-bottom: .5rem;
      justify-content: flex-start;
      align-items: center;
    }

    .back_logo {
      padding-right: .5rem;
    }

    .card {
      padding: 20px;
      color: #fff;
      background-color: #1e2139;
      border-radius: 10px;
      box-shadow: 10px 4px 6px -1px rgba(0, 0, 0, 0.2),
            0 2px 4px -1px rgba(0, 0, 0, 0.6);

      .image_div {
        justify-content: center;
        align-items: center;
      }

      .client_details {
        text-align: center;

        .input {
          margin-top: 1rem;
        }
      }
    }
  }
</style>
