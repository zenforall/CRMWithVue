import { defineStore } from "pinia";
import { ref } from "vue";
import { TaskPriority, TaskStatus, type Task, type TaskNote } from "@/models/Task";
import type { User } from "@/models/User"
import { useUserStore } from "@/stores/user"


export const useTaskStore = defineStore('taskStore',{
 state: () => ({
        tasks: ref([] as Task[]),
        id: "",
        taskDetail: null as Task | null | undefined,
        userAction: "",
    }),
    getters: {
        // Metodi che sfruttano la variabile di stato menu
    },
    actions: {
      async getTasks() {
        try {

         // Ottiene il dettaglio di uno User dallo Store UserStore
         const userStore = useUserStore();
         await userStore.getUsers();
         const user = await userStore.getUser("1");

         if (this.tasks.length === 0) {
            for (let i=1;i<8;i++) {
                    this.tasks.push(
                        {
                          id: 'task-00'+i.toString(),
                          title: 'Preparare la documentazione',
                          description: 'Scrivere la documentazione del progetto',
                          assignedBy: user,
                          assignedTo: user,
                          dueDate: new Date('2025-08-15'),
                          status: TaskStatus.OPEN,
                          priority: TaskPriority.MEDIUM,
                          // ✅ Liste inizializzate come vuote
                          notes: [],
                          attachments: [],
                          images: [],
                          history: [],
                          createdAt: new Date(),
                          updatedAt: new Date(),
                        }
                    )
            }
          }
       } catch (error) {
         console.log(error)
         throw error;
       }
      }
    },
})
