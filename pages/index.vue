<template>
  <v-row justify="center" align="center" v-show="log">
    <v-col>
      <v-row>
        <v-col>
          <v-carousel>
            <v-carousel-item
              v-for="(item, i) in items"
              :key="i"
              :src="item.src"
              reverse-transition="fade-transition"
              transition="fade-transition"
            ></v-carousel-item>
          </v-carousel>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="4">
          <v-card class="mx-auto" max-width="344">
            <v-img
              src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"
              height="200px">
            </v-img>

            <v-card-title> Top western road trips </v-card-title>
            <v-card-subtitle> 1,000 miles of wonder </v-card-subtitle>
            <v-card-actions>
              <v-btn color="orange lighten-2" text> Explore </v-btn>
              <v-spacer></v-spacer>
              <v-btn icon @click="show = !show">
                <v-icon>{{show ? "mdi-chevron-up" : "mdi-chevron-down"}}</v-icon>
              </v-btn>
            </v-card-actions>
            <v-expand-transition>
              <div v-show="show">
                <v-divider></v-divider>
                <v-card-text>
                  I'm a thing. But, like most politicians, he promised more than
                  he could deliver. You won't have time for sleeping, soldier,
                  not with all the bed making you'll be doing. Then we'll go
                  with that data file! Hey, you add a one and two zeros to that
                  or we walk! You're going to do his laundry? I've got to find a
                  way to escape.
                </v-card-text>
              </div>
            </v-expand-transition>
          </v-card>
        </v-col>
        <v-col cols="4">
          <v-card class="mx-auto" max-width="344">
            <v-img
              src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"
              height="200px">
            </v-img>

            <v-card-title> Top western road trips </v-card-title>
            <v-card-subtitle> 1,000 miles of wonder </v-card-subtitle>
            <v-card-actions>
              <v-btn color="orange lighten-2" text> Explore </v-btn>
              <v-spacer></v-spacer>
              <v-btn icon @click="show = !show">
                <v-icon>{{show ? "mdi-chevron-up" : "mdi-chevron-down"}}</v-icon>
              </v-btn>
            </v-card-actions>
            <v-expand-transition>
              <div v-show="show">
                <v-divider></v-divider>
                <v-card-text>
                  I'm a thing. But, like most politicians, he promised more than
                  he could deliver. You won't have time for sleeping, soldier,
                  not with all the bed making you'll be doing. Then we'll go
                  with that data file! Hey, you add a one and two zeros to that
                  or we walk! You're going to do his laundry? I've got to find a
                  way to escape.
                </v-card-text>
              </div>
            </v-expand-transition>
          </v-card>
        </v-col>
        <v-col cols="4"><v-card class="mx-auto" max-width="344">
            <v-img
              src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"
              height="200px">
            </v-img>

            <v-card-title> Top western road trips </v-card-title>
            <v-card-subtitle> 1,000 miles of wonder </v-card-subtitle>
            <v-card-actions>
              <v-btn color="orange lighten-2" text> Explore </v-btn>
              <v-spacer></v-spacer>
              <v-btn icon @click="show = !show">
                <v-icon>{{show ? "mdi-chevron-up" : "mdi-chevron-down"}}</v-icon>
              </v-btn>
            </v-card-actions>
            <v-expand-transition>
              <div v-show="show">
                <v-divider></v-divider>
                <v-card-text>
                  I'm a thing. But, like most politicians, he promised more than
                  he could deliver. You won't have time for sleeping, soldier,
                  not with all the bed making you'll be doing. Then we'll go
                  with that data file! Hey, you add a one and two zeros to that
                  or we walk! You're going to do his laundry? I've got to find a
                  way to escape.
                </v-card-text>
              </div>
            </v-expand-transition>
          </v-card>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="6">
          <v-card :loading="loading" class="mx-auto my-12" max-width="800">
            <template slot="progress">
              <v-progress-linear
                color="deep-purple"
                height="10"
                indeterminate>
              </v-progress-linear>
            </template>
            <v-img
              height="250"
              src="https://cdn.vuetifyjs.com/images/cards/cooking.png">
            </v-img>

            <v-card-title>Cafe Badilico</v-card-title>
            <v-card-text>
              <v-row align="center" class="mx-0">
                <v-rating
                  :value="4.5"
                  color="amber"
                  dense
                  half-increments
                  readonly
                  size="14"
                ></v-rating>
                <div class="grey--text ml-4">4.5 (413)</div>
              </v-row>
              <div class="my-4 subtitle-1">$ • Italian, Cafe</div>
              <div>
                Small plates, salads & sandwiches - an intimate setting with 12
                indoor seats plus patio seating.
              </div>
            </v-card-text>

            <v-divider class="mx-4"></v-divider>
            <v-card-title>Tonight's availability</v-card-title>
            <v-card-text>
              <v-chip-group
                v-model="selection"
                active-class="deep-purple accent-4 white--text"
                column>
                <v-chip>5:30PM</v-chip>

                <v-chip>7:30PM</v-chip>

                <v-chip>8:00PM</v-chip>

                <v-chip>9:00PM</v-chip>
              </v-chip-group>
            </v-card-text>

            <v-card-actions>
              <v-btn color="deep-purple lighten-2" text @click="reserve">
                Reserve
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
        <v-col cols="6">
          <v-card :loading="loading" class="mx-auto my-12" max-width="800">
            <template slot="progress">
              <v-progress-linear
                color="deep-purple"
                height="10"
                indeterminate
              ></v-progress-linear>
            </template>

            <v-img
              height="250"
              src="https://cdn.vuetifyjs.com/images/cards/cooking.png"
            ></v-img>

            <v-card-title>Cafe Badilico</v-card-title>

            <v-card-text>
              <v-row align="center" class="mx-0">
                <v-rating
                  :value="4.5"
                  color="amber"
                  dense
                  half-increments
                  readonly
                  size="14"
                ></v-rating>

                <div class="grey--text ml-4">4.5 (413)</div>
              </v-row>

              <div class="my-4 subtitle-1">$ • Italian, Cafe</div>

              <div>
                Small plates, salads & sandwiches - an intimate setting with 12
                indoor seats plus patio seating.
              </div>
            </v-card-text>

            <v-divider class="mx-4"></v-divider>

            <v-card-title>Tonight's availability</v-card-title>

            <v-card-text>
              <v-chip-group
                v-model="selection"
                active-class="deep-purple accent-4 white--text"
                column
              >
                <v-chip>5:30PM</v-chip>

                <v-chip>7:30PM</v-chip>

                <v-chip>8:00PM</v-chip>

                <v-chip>9:00PM</v-chip>
              </v-chip-group>
            </v-card-text>

            <v-card-actions>
              <v-btn color="deep-purple lighten-2" text @click="reserve">
                Reserve
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>

<script>
import Cookie from "js-cookie";
import JWTDecode from "jwt-decode";
import cookieparser from "cookieparser";
import { usersCollection } from '@/services/firebase.js'
import { User } from '../model/user.js'

export default {
  components: {},
  created() {},
  data() {
    return {
      loading: false,
      selection: 1,
      show: false,
      items: [
        {
          src: "https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg",
        },
        {
          src: "https://cdn.vuetifyjs.com/images/carousel/sky.jpg",
        },
        {
          src: "https://cdn.vuetifyjs.com/images/carousel/bird.jpg",
        },
        {
          src: "https://cdn.vuetifyjs.com/images/carousel/planet.jpg",
        },
      ],
    };
  },
  asyncData(){
    let log = false
    return {log} 
  },
  async beforeCreate(){
      const cookie = Cookie.get("access_token")
      if (cookie) {
        const decoded = JWTDecode(cookie);
        let currentUser = await usersCollection
            .doc(decoded.user_id)
            .get()
            .then(function (doc) {
              if (doc.exists) {
                let aux = doc.data();
                let user = new User(decoded.user_id ,aux.nick, decoded.email, aux.rol, aux.lastname, aux.firstname, aux.address, aux.phone);
                return user;
              } 
            })
            .catch(function (error) {
              console.log("error:", error)
            });
        if (decoded) {
          this.$store.commit("users/SET_USER", currentUser);
        }
        this.$router.push("/admin");
      } else {
        this.log = true
      }
  },
  methods: {
    reserve() {
      this.loading = true;
      setTimeout(() => (this.loading = false), 2000);
    },
  },
} 
</script>