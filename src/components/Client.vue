<template>
    <router-link class="client flex" :to="{ name: 'Client', params: { id: client.id } }">
        <div class="card flex">
            <div class="left flex">
                <div class="image_div">
                    <img :src="getProfilePhoto()" alt="{client.first_name}" width="70" height="70">
                </div>
                <div class="name_div flex-column">
                    <h3>{{ `${client.first_name} ${client.last_name}` }}</h3>
                    <p>{{ client.email }}</p>
                </div>
            </div>
            <div class="right flex">
                <small>{{ `${parseDate(client.date_profiled)} | ${new Date(client.date_profiled).toLocaleTimeString('en-US')}` }}</small>
            </div>
        </div>
    </router-link>
</template>

<script>

export default {
    name: "client",
    props: ["client"],

    methods: {
        getProfilePhoto() {
            return "http://www.nretnil.com/avatar/LawrenceEzekielAmos.png"
        },

        parseDate(date) {
            const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

            return new Date(date).toLocaleDateString('en-US', options)
        }
    }
}
</script>

<style lang="scss" scoped>
    .card {
        margin-bottom: 10px;
        border-radius: 10px;
        padding: 20px 32px;
        color: #fff;
        cursor: pointer;
        gap: 10px;
        background-color: #1e2139;
        box-shadow: 10px 4px 6px -1px rgba(0, 0, 0, 0.2),
            0 2px 4px -1px rgba(0, 0, 0, 0.6);

        .left {
            text-decoration: none;
            font-style: none;

            .image_div {
                border-radius: 50%;
                padding-right: 20px;
            }

            .name_div {
                text-decoration: none;

                h3 {
                    padding-top: 10px;
                    text-decoration: none;
                }

                p {
                    padding-top: 10px;
                    text-decoration: none;
                }
            }
        }

        .right {
            padding: 20px;
        }
    }
</style>
