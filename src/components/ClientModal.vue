<template>
  <div
    @click="checkClick"
    ref="clientWrap"
    class="client-wrap flex flex-column"
  >
    <form @submit.prevent="submitForm" class="client-content">
      <Loading v-show="loading" />
      <h1 v-if="!editClient">New Client</h1>
      <h1 v-else>Edit Client</h1>

      <div class="client-form flex flex-column">
        <div class="input flex flex-column">
          <label for="first_name">First Name</label>
          <input required type="text" id="first_name" v-model="first_name" />
        </div>
        <div class="input flex flex-column">
          <label for="last_name">Last Name</label>
          <input required type="text" id="last_name" v-model="last_name" />
        </div>
        <div class="input flex flex-column">
          <label for="email">Email Address</label>
          <input required type="email" id="email" v-model="email" />
        </div>
        <div class="counsel-details flex">
          <div class="input flex flex-column">
            <label for="primary_legal_counsel">Primary Legal Counsel</label>
            <input
              required
              type="text"
              id="primary_legal_counsel"
              v-model="primary_legal_counsel"
            />
          </div>
          <div class="input flex flex-column">
            <label for="date_of_birth">Date of Birth</label>
            <input
              required
              type="text"
              id="date_of_birth"
              v-model="date_of_birth"
            />
          </div>
        </div>
        <div class="input flex flex-column">
          <label for="case_details">Case details</label>
          <textarea
            name=""
            id="case_details"
            cols="30"
            rows="10"
            v-model="case_details"
          ></textarea>
        </div>
      </div>

      <div class="save flex">
        <div class="left">
          <button type="button" @click="closeClient" class="red">Cancel</button>
        </div>
        <div class="right">
          <button v-if="!editClient" type="submit" @click="publishClient" class="purple">
            Create Client
          </button>
          <button v-if="editClient" type="submit" @click="publishClient" class="purple">
            Update Client
          </button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import Loading from "../components/Loading.vue";
import { mapActions, mapMutations, mapState } from "vuex";
import axios from "axios";

export default {
  name: "clientModal",
  data() {
    return {
      loading: null,
      id: null,
      first_name: null,
      last_name: null,
      email: null,
      primary_legal_counsel: null,
      date_of_birth: null,
      case_details: null,
    };
  },
  created() {
    if (this.editClient) {
      const currentClient = this.currentClientArray[0];
      this.id = currentClient.id;
      this.first_name = currentClient.first_name;
      this.last_name = currentClient.last_name;
      this.email = currentClient.email;
      this.primary_legal_counsel = currentClient.primary_legal_counsel;
      this.date_of_birth = currentClient.date_of_birth;
      this.case_details = currentClient.case_details;
    }
  },
  components: {
    Loading,
  },
  methods: {
    ...mapMutations(["TOGGLE_CLIENT", "TOGGLE_MODAL", "TOGGLE_EDIT_CLIENT"]),

    ...mapActions(["UPDATE_CLIENT"]),

    checkClick(e) {
      if (e.target === this.$refs.clientWrap) {
        this.TOGGLE_MODAL();
      }
    },

    closeClient() {
      this.TOGGLE_CLIENT();
      if (this.editClient) {
        this.TOGGLE_EDIT_CLIENT()
      }
    },

    async publishClient() {
      this.loading = true;

      axios
        .post(`http://127.0.0.1:8000/api/client/store`, {
          first_name: this.first_name,
          last_name: this.last_name,
          email: this.email,
          primary_legal_counsel: this.primary_legal_counsel,
          date_of_birth: this.date_of_birth,
          case_details: this.case_details,
        })
        .then((res) => {
          if (res.data.status === 201) {
            this.loading = false;
            this.TOGGLE_CLIENT();
            alert("Client created successfully!");
          }
        })
        .catch((err) => {
          console.log(err.message);
        });

      this.loading = false;
    },

    async updateClient(id) {
      this.loading = true;

      axios
        .patch(`http://127.0.0.1:8000/api/client/${id}`, {
          first_name: this.first_name,
          last_name: this.last_name,
          primary_legal_counsel: this.primary_legal_counsel,
          date_of_birth: this.date_of_birth,
          case_details: this.case_details,
        })
        .then((res) => {
          if (res.data.status === 200) {
            this.loading = false;
            const data ={
              id: this.id,
              routeId: this.$route.params.id
            }

            this.UPDATE_CLIENT(data);
            alert("Client updated successfully!");
          }
        })
        .catch((err) => {
          console.log(err.message);
        });

      this.loading = false;
    },

    submitForm() {
      if (this.editClient) {
        this.updateClient(this.currentClientArray[0].id);
        return;
      }

      this.publishClient();
    },
  },
  computed: {
    ...mapState(["editClient", "currentClientArray"])
  },
};
</script>

<style lang="scss" scoped>
.client-wrap {
  position: fixed;
  top: 0;
  left: 0;
  background-color: transparent;
  width: 100%;
  height: 100vh;
  overflow: scroll;

  &::-webkit-scrollbar {
    display: none;
  }

  @media (min-width: 900px) {
    left: 90px;
  }
}

.client-content {
  position: relative;
  padding: 56px;
  max-width: 700px;
  width: 100%;
  background-color: #141625;
  color: #fff;
  box-shadow: 10px 4px 6px -1px rgba(0, 0, 0, 0.2),
    0 2px 4px -1px rgba(0, 0, 0, 0.6);

  h1 {
    margin-bottom: 48px;
    color: #fff;
  }

  .client-form {
    .counsel-details {
      gap: 16px;

      div {
        flex: 1;
      }
    }
  }

  .save {
    margin-top: 30px;

    div {
      flex: 1;
    }

    .right {
      justify-content: flex-end;
    }
  }
}

.input {
  margin-bottom: 24px;
}

.label {
  font-size: 12px;
  margin-bottom: 6px;
}

input,
textarea {
  width: 100%;
  background-color: #1e2139;
  color: #fff;
  border-radius: 4px;
  padding: 12px 4px;
  border: none;

  &:focus {
    outline: none;
  }
}
</style>
