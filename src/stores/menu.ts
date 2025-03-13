import { defineStore } from "pinia";

export const useMenuStore = defineStore('menuStore',{
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
                 icon:'mdi-home-circle',
                 title: 'Home',
                 children: null,
                 link: '/dashboard' // Collegamento alla Home
               }

               this.menu.push(root);

               let administration: TreeNode;
               administration = {
                 id: 2,
                 icon: 'mdi-application-cog',
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
                 icon: 'mdi-contacts',
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

               let calendar: TreeNode;
               calendar = {
                 id: 50,
                 icon: 'mdi-calendar',
                 title: 'Calendar',
                 children: null,
                 link: '/calendar'
               }

               this.menu.push(calendar);

               let reports: TreeNode;
               reports = {
                 id: 60,
                 icon: 'mdi-file-document',
                 title: 'Reports',
                 children: null,
                 link: '/reports'
               }

               this.menu.push(reports);

               let myCalendar: TreeNode;
               myCalendar = {
                 id: 70,
                 icon: 'mdi-calendar',
                 title: 'My Calendar',
                 children: null,
                 link: '/mycalendar'
               }

               this.menu.push(myCalendar);

             } catch (error) {
               console.log(error)
             }
        }
    }
})
