<template>
  <div class="home container">
    <!-- Header -->
    <div class="header flex">
      <div class="left flex flex-column">
        <h1>Clients</h1>
        <span>There are {{ clientData.length }} total clients</span>
      </div>
      <div class="right flex">
        <div class="filter flex">
          <input
            class="inner-input"
            type="text"
            placeholder="Filter by last name"
          />
        </div>
        <div @click="newClient" class="button flex">
          <div class="inner-button flex">
            <img src="@/assets/icon-plus.svg" alt="" />
          </div>
          <span>New Client</span>
        </div>
      </div>
    </div>

    <!-- Clients -->
    <div v-if="clientData.length > 0">
      <Client v-for="(client, index) in clientData" :client="client" :key="index" />
    </div>
    <div v-else class="empty flex flex-column">
      <img src="@/assets/illustration-empty.svg" alt="">
      <h3>There is nothing here</h3>
      <p>Create a new client by clicking the New Client button and get started</p>
    </div>
  </div>
</template>

<script>
import Client from "../components/Client.vue";
import { mapMutations, mapState } from "vuex";

export default {
  name: "Home",
  data() {
    return {};
  },
  components: {
    Client,
  },
  methods: {
    ...mapMutations(["TOGGLE_CLIENT"]),

    newClient() {
      this.TOGGLE_CLIENT();
    },
  },
  computed: {
    ...mapState(['clientData'])
  }
};
</script>

<style lang="scss" scoped>
.home {
  color: #fff;

  .header {
    margin-bottom: 65px;

    .left,
    .right {
      flex: 1;
    }

    .right {
      justify-content: flex-end;
      align-items: center;

      .button,
      .filter {
        align-items: center;

        span {
          font-size: 12px;
        }
      }

      .filter {
        position: relative;
        margin-right: 40px;

        .inner-input {
          outline: none;
          border-radius: 4px;
          padding: 5px;
        }
      }

      .button {
        padding: 8px 10px;
        background-color: #7c5dfa;
        border-radius: 40px;

        .inner-button {
          margin-right: 8px;
          border-radius: 50%;
          padding: 8px;
          align-items: center;
          justify-content: center;
          background-color: #fff;

          img {
            width: 10px;
            height: 10px;
          }
        }
      }
    }
  }

  .empty {
    margin-top: 160px;
    align-items: center;
  }

  img {
    width: 214px;
    height: 200px;
  }

  h3 {
    font-size: 20px;
    margin-top: 40px;
  }

  p {
    text-align: center;
    max-width: 224px;
    font-size: 12px;
    font-weight: 300;
    margin-top: 16px;
  }
}
</style>
