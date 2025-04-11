import { defineStore } from "pinia";
import { ref } from "vue";
import { faker } from '@faker-js/faker';

export const useUserStore = defineStore('userStore',{
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
            for (let i=1;i<8;i++) {
                   let loc = '' as string;
                   let locLan = '' as string;
                   if ( (i / 2) === 0 ) {
                      loc = 'it';
                      locLan = 'it-IT';
                   } else if ( (i / 5 === 0) ) {
                      loc = 'es';
                      locLan = 'es-ES';
                   } else if ( (i / 7 ) === 0 ) {
                      loc = 'en';
                      locLan = 'en-GB';
                   }


                    this.users.push({
                        id:i.toString(),
                        userName: faker.person.firstName(),
                        password:faker.internet.password(),
                        email:faker.internet.email(),
                        company:faker.company.name(),
                        activationDate: faker.date.anytime(),
                        locale: loc,
                        type:null,
                        address:null,
                        cap:null,
                        city:null,
                        phone:null,
                        name:null,
                        surname:"",
                        localeLanguage: locLan,
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
          const index:number = this.users.findIndex(value => value.id === this.userId);
          if (index > -1) {
            this.users.splice(index,1);
          }
        } catch (error) {
          console.log(error);
          throw error;
        }
      },
      async resetSearch() {
          this.users = [] as User[];
          this.getUsers();
      },

      // Da completare : devono essere gestiti tutti i filtri disponibili
      async search(filter: UserFilter) {
        try {
          this.users = this.users.filter(
              user => {
                  return user.userName.includes(filter.userName)
              }
          )
        } catch (error) {
          console.log(error);
          throw error;
        }
      },
      async updateUser(user: User) {
        try {
          if (user.id === null || user.id === '') {
            const currentDate : Date = new Date();
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
