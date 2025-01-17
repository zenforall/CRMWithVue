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
        userAction: "",
    }),
    getters: {
        // Metodi che sfruttano la variabile di stato menu
    },
    actions: {
      async getUserDetail() {
        try {
          if (this.users === null || this.users.length == 0) {this.userDetail = null; return;}
          if (this.userId === null || this.userId === "") {this.userDetail = null; return;}
          this.userDetail = this.users.find(value => value.id === this.userId);
        } catch (error) {
          console.log(error);
          throw error;
        }
      },
      setUserId(id:string) {
        this.userId = id;
      },
      setUserAction(action:string) {
        this.userAction = action;
      },
      async getUsers() {
        try {
          if (this.users.length === 0) {
            for (var i=1;i<8;i++) {
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
          }
       } catch (error) {
         console.log(error)
         throw error;
       }
      },
      async deleteUser() {
        try {
          if (this.users === null || this.users.length == 0) {return;}
          if (this.userId === null || this.userId === "") {return;}
          let index:number = this.users.findIndex(value => value.id === this.userId);
          if (index > -1) {
            this.users.splice(index,1);
          }
        } catch (error) {
          console.log(error);
          throw error;
        }
      },
      async updateUser(user: User) {
        try {
          if (user.id === null || user.id === '') {
            let currentDate : Date = new Date();
            user.id =currentDate.toString();
            this.users.push(user);
          } else {
            let userDetail : User | undefined | null;
            userDetail  = this.users.find(value => value.id === this.userId);

            if (userDetail != null && userDetail != undefined) {
              userDetail.activationDate = user.activationDate;
              userDetail.company = user.company;
              userDetail.email = user.email;
              userDetail.enabled = user.enabled;
              userDetail.password = user.password;
              userDetail.userName = user.userName;
            } else {
              throw("User with Id "+user.id+" is not in Database anymore");
            }
          }

        } catch (error) {
          console.log(error);
          throw error;
        }
      }
    }
})


