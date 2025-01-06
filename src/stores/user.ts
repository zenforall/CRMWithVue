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
          this.users = []; // pulisce l'array
          for (var i=1;i<21;i++) {
                  this.users.push({
                      id:i.toString(),
                      userName: "test"+i.toString()+"@test.com",
                      password:"testPassword"+i.toString(),
                      email:"test"+i.toString()+"@test.com",
                      company:"",
                      activationDate: new Date(),
                      enabled:true
              })
          }
       } catch (error) {
         console.log(error)
       }
      }
    }
})


