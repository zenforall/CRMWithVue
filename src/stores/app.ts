import { defineStore } from "pinia";
import { encryptData, decryptData } from "../utils/crypto";

export const useAppStore = defineStore('appStore',{
  state: () => ({
      breadCrumbMenu: [] as BreaCrumbItem[],
      isUserAutheticated: false,
      currentSession: 0 as number,
  }),
  getters: {
      // Metodi che sfruttano la variabile di stato menu
  },
  actions: {
    async authenticateUser(userName: string, password:string) {
      try {

        //this.isUserAutheticated = true;
        //this.currentSession = Date.now();

        if ("admin" === userName && "admin" === password) {
          this.isUserAutheticated = true;
          this.currentSession = Date.now();
        } else {
          this.isUserAutheticated = false;
          this.currentSession = 0;
        }

        localStorage.setItem('isUserAutheticated',encryptData(""+this.isUserAutheticated));

      } catch (error) {
        console.log(error);
      }
    },
    async logout() {
      this.isUserAutheticated = false;
      this.currentSession = 0;
      localStorage.setItem('isUserAutheticated','');
    },
    async checkIfSessionIsValid() {
      try {

        if (localStorage.getItem("isUserAutheticated")) {
          let temp : string | null;
          temp = decryptData(localStorage.getItem("isUserAutheticated"));

          this.isUserAutheticated = (temp === 'true');
        }

        if (this.isUserAutheticated) {
          let now = Date.now();

          /*
          if ( now > (this.currentSession + 120000)  ) {
            this.isUserAutheticated = false;
            this.currentSession = 0;
          }
          */

        }
      } catch (error) {
        console.log(error);
      }
    },
    async renewCurrentSession() {
      if (this.isUserAutheticated)
        this.currentSession = Date.now();
    }
  }
})
