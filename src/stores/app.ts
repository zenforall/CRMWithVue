import { defineStore } from "pinia";
import { encryptData, decryptData } from "../utils/crypto";
import type { BreadCrumbItem } from '../models/BreadCrumbItem';
import { setLanguage } from "../i18n"; // Importa la funzione

export const useAppStore = defineStore('appStore',{
  state: () => ({
      breadCrumbMenu: [] as BreadCrumbItem[],
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
          setLanguage("en"); // Setta in modo dinamico la lingua per l'internazionalizzazione
        } else {
          this.isUserAutheticated = false;
          this.currentSession = 0;
        }

        localStorage.setItem('isUserAutheticated',encryptData(""+this.isUserAutheticated));
        localStorage.setItem('userName',encryptData(userName));
        localStorage.setItem('userLocale',encryptData("en"));
        localStorage.setItem('userLocaleLanguage',encryptData("en-GB"));
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
