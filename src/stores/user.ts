import { defineStore } from "pinia";
import { ref } from "vue";

export type RootState = {
    users: User[];
};

export const useUserStore = defineStore({

    id: "userStore",
    state: () => ({
        users: ref([] as User[]),
    }),
    getters: {
        // Metodi che sfruttano la variabile di stato menu
    },
    actions: {
      async getUsers() {

        try {

          let user1: User;
          user1 = {
           id: "1",
           activationDate: new Date(),
           company:"Company 1",
           email:"user1@company1.com",
           enabled:true,
           password:"pippo123",
           userName:"user1"
         }

         this.users.push(user1);

         let user2: User;
         user2 = {
          id: "2",
          activationDate: new Date(),
          company:"Company 1",
          email:"user2@company1.com",
          enabled:true,
          password:"pippo123",
          userName:"user2"
        }

        this.users.push(user2);

       } catch (error) {
         console.log(error)
       }
      }
    }
})


