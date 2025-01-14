import { defineStore } from "pinia";
import { ref } from "vue";

export type RootState = {
    users: User[];
};

export const useUserStore = defineStore({

    id: "userStore",
    state: () => ({
        users: ref([] as User[]),
        userId: "",
        userDetail: null as User | null | undefined,
    }),
    getters: {
        // Metodi che sfruttano la variabile di stato menu
    },
    actions: {
      getUserDetail() {
        if (this.users === null || this.users.length == 0) return;
        if (this.userId === null || this.userId === "") return;
        this.userDetail = this.users.find(value => value.id === this.userId);
      },
      setUserId(id:string) {
        this.userId = id;
      },
      async getUsers() {

        try {
          this.users = []; // pulisce l'array
          for (var i=1;i<21;i++) {
                  this.users.push({
                      id:i.toString(),
                      userName: "test"+i.toString()+"@test.com",
                      password:"testPassword"+i.toString(),
                      email:"test"+i.toString()+"@test.com",
                      company:"company"+i.toString(),
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


