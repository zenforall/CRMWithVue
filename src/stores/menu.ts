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
                 icon:'mdi-view-dashboard-outline',
                 title: 'Dashboard',
                 children: null,
                 link: '/dashboard' // Collegamento alla Home
               }

               this.menu.push(root);

               let administration: TreeNode;
               administration = {
                 id: 2,
                 icon: 'mdi-application-cog-outline',
                 title: 'Admin',
                 link : '',
                 children: [
                   { id: 3, icon:'mdi-account-outline', title: 'Users',link: '/admin/users' },
                   { id: 4, icon:'mdi-office-building-outline', title: 'Companies',link: '/admin/companies' },
                   /*{ id: 5, icon:'mdi-archive-clock', title: 'Scheduler',link: '/scheduler' }*/
                 ]
               };

               this.menu.push(administration);

               let contacts: TreeNode;
               contacts = {
                 id: 20,
                 icon: 'mdi-contacts-outline',
                 title: 'Contacts',
                 link : '',
                 children: [
                   { id: 21, icon:'mdi-account-tie-outline', title: 'Customers',link: '/contacts/customers' },
                   { id: 22, icon:'mdi-account-tie-hat-outline', title: 'Prospects',link: '/contacts/prospects' },
                   { id: 23, icon:'mdi-account-tie-outline', title: 'Leads',link: '/contacts/leads' }
                 ]
               };

               this.menu.push(contacts);

               let sales: TreeNode;
               sales = {
                 id: 40,
                 icon: 'mdi-hand-coin-outline',
                 title: 'Sales',
                 link : '',
                 children: [
                  { id: 41, icon:'mdi-dots-grid', title: 'Pipeline',link: '/sales/pipeline' },
                 ],
               }

               this.menu.push(sales);


               let activities: TreeNode;
               activities = {
                 id: 90,
                 icon: 'mdi-clipboard-text-outline',
                 title: 'Activities',
                 link : '',
                 children: [
                  { id: 91, icon:'mdi-calendar-outline', title: 'Calendar',link: '/activities/calendar' },
                  { id: 92, icon:'mdi-clipboard-list-outline', title: 'Tasks',link: '/activities/tasks' },
                 ],
               }

               this.menu.push(activities);


               /*
               let calendar: TreeNode;
               calendar = {
                 id: 50,
                 icon: 'mdi-calendar',
                 title: 'Calendar',
                 children: null,
                 link: '/calendar'
               }

               this.menu.push(calendar);
               */

               let reports: TreeNode;
               reports = {
                 id: 60,
                 icon: 'mdi-file-document-outline',
                 title: 'Reports',
                 children: null,
                 link: '/reports'
               }

               this.menu.push(reports);

               /*
               let myCalendar: TreeNode;
               myCalendar = {
                 id: 70,
                 icon: 'mdi-calendar',
                 title: 'My Calendar',
                 children: null,
                 link: '/mycalendar'
               }

               this.menu.push(myCalendar);
               */

               /*
               let customerSupport: TreeNode;
               customerSupport = {
                 id: 80,
                 icon: 'mdi-account-wrench',
                 title: 'Support',
                 link : '',
                 children: [
                   { id: 81, icon:'mdi-ticket', title: 'Tickets',link: '/tickets' },
                   { id: 82, icon:'mdi-history', title: 'Chronology',link: '/chronology' },
                 ]
               };

               this.menu.push(customerSupport);
               */

             } catch (error) {
               console.log(error)
             }
        }
    }
})
