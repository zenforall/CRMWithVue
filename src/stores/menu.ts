import { defineStore } from "pinia";

export type RootState = {
    menu: TreeNode[];
};

export const useMenuStore = defineStore({

    id: "menuStore",
    state: () => ({
        menu: [] as TreeNode[],
    }),
    getters: {
        // Metodi che sfruttano la variabile di stato menu
    },
    actions: {
        async getMenu() {
            try {
                this.menu = [];

                let root: TreeNode;
                root = {
                 id: 1,
                 title: 'Home',
                 children: null,
                 link: '/dashboard' // Collegamento alla Home
               }

               this.menu.push(root);

               let administration: TreeNode;
               administration = {
                 id: 2,
                 title: 'Admin',
                 link : '',
                 children: [
                   { id: 3, icon:'mdi-account', title: 'Users',link: '/users' },
                   { id: 4, icon:'mdi-office-building', title: 'Companies',link: '/companies' },
                   { id: 5, icon:'mdi-archive-clock', title: 'Scheduler',link: '/scheduler' }
                 ]
               };

               this.menu.push(administration);

               let contacts: TreeNode;
               contacts = {
                 id: 20,
                 title: 'Contacts',
                 link : '',
                 children: [
                   { id: 21, icon:'mdi-account-tie', title: 'Customers',link: '/customers' },
                   { id: 22, icon:'mdi-account-tie-hat-outline', title: 'Prospects',link: '/prospects' },
                   { id: 23, icon:'mdi-account-tie-outline', title: 'Leads',link: '/leads' }
                 ]
               };

               this.menu.push(contacts);

               let sales: TreeNode;
               sales = {
                 id: 40,
                 icon: 'mdi-hand-coin',
                 title: 'Sales',
                 children: null,
                 link: '/sales'
               }

               this.menu.push(sales);
             } catch (error) {
               console.log(error)
             }
        }
    }
})
