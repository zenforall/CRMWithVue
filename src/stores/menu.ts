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

                let root: TreeNode;
                root = {
                 id: 1,
                 title: 'Home',
                 children: null,
                 link: '/dashboard' // Collegamento alla Home
               }

               this.menu.push(root);
     
               let contacts: TreeNode;
               contacts = {
                 id: 2,
                 title: 'Contacts',
                 link : '',
                 children: [
                   { id: 3, title: 'Customers',link: '/customers' },
                   { id: 4, title: 'Prospects',link: '/prospects' },
                   { id: 5, title: 'Leads',link: '/leads' }
                 ]
               };
     
               this.menu.push(contacts);
     
               let sales: TreeNode;
               sales = {
                 id: 6,
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