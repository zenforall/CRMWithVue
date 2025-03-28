import { defineStore } from "pinia";
import { ref } from "vue";
import { faker } from '@faker-js/faker';

export const useContactStore = defineStore('contactStore',{
  state: () => ({
      contacts: ref([] as Contact[]),
      contactId: "",
      contactDetail: null as Contact | null | undefined,
      contactAction: "",
  }),
  getters: {
    // Metodi che sfruttano la variabile di stato menu
  },
  actions: {
      async getContactDetail() {
        try {

        } catch (error) {
          console.log(error);
          throw error;
        }
      },
      setContactId(id:string) {
        this.contactId = id;
      },
      setContactAction(action:string) {
        this.contactAction = action;
      },
      async getContacts(contactType:string) {
        try {
          if (this.contacts.length === 0) {
            for (var i=1;i<8;i++) {
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

                    this.contacts.push({
                        id:i.toString(),
                        code: faker.vehicle.vin(),
                        name: faker.person.firstName(),
                        surname: faker.person.lastName(),
                        address: faker.location.streetAddress(),
                        city:faker.location.city(),
                        cap:faker.location.zipCode(),
                        nation: faker.location.country(),
                        email:faker.internet.email(),
                        email1:"",
                        email2:"",
                        phone:faker.phone.number(),
                        phone1:"",
                        phone2:"",
                        notes:faker.string.alphanumeric(),
                        locale: loc,
                        localeLanguage: locLan,
                        enabled:true,
                        type:null,
                        files:null,
                        events:null})
            }
          }
       } catch (error) {
         console.log(error)
         throw error;
       }
      }
    }
  });
