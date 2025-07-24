import { defineStore } from "pinia";
import { ref } from "vue";
import { faker } from '@faker-js/faker';

export const useUserStore = defineStore('roleStore',{
  state: () => ({
        roles: ref([] as Role[]),
        roleId: "",
        roleDetail: null as Role | null | undefined,
        roleAction: "",
    }),
    getters: {
        // Metodi che sfruttano la variabile di stato menu
    },
    actions: {

    },

})
