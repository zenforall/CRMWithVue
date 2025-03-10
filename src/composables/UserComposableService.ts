import { ref } from "vue";
import { useUserStore } from "../stores/user";
import { useI18n } from "vue-i18n";
import { useRouter } from 'vue-router'

export class UserComposableService {
  checkAndassignMobileStatus() {
      throw new Error("Method not implemented.");
  }

  private emit: (event: string, message: BreadCrumbItem[]) => void;

  userStore = useUserStore();
  headers = ref<TableHeader[]>([]);
  users = ref<User[]>([]);
  showDeleteConfirmDialog = ref(false);
  userToDelete = ref<User | null>(null);
  drawerFilter = ref(false);
  isMobile = ref(false);
  router = useRouter();

  constructor(emit: (event: breadCrumbHandler, message: BreadCrumbItem[]) => void) {
    const { t } = useI18n();
    this.initHeaders(t);
    this.emit = emit;
  }

  async fetchUsers() {
    await this.userStore.getUsers();
    this.users.value = this.userStore.users;
  }

  initHeaders(t: (key: string) => string) {
    this.headers.value = [
      { title: t("userName"), value: "userName", sortable: true },
      { title: "Email", value: "email", sortable: true },
      { title: "Company", value: "company", sortable: true },
      { title: "Activation", value: "activationDate", sortable: true },
      { title: t("enabled"), value: "enabled", sortable: true },
      { title: "Actions", value: "actions", sortable: true },
    ];
  }

  formatDate(date: Date | null): string {
    if (!date) return "";
    return date.toLocaleDateString("it-IT", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
  }

  checkAndAssignMobileStatus() {
    this.isMobile.value = window.innerWidth < 769;
  }

  editItem(item: User) : void {
    this.userStore.setUserId(item.id);
    this.userStore.getUserDetail();
    if (!this.userStore.userDetail) {
      window.alert("No User Detail found --> Maybe deleted by another user");
      return;
    }

    this.emit("breadCrumbHandler", [
      { title: "Admin", disabled: false, href: "" },
      { title: "Users", disabled: false, href: "" },
      { title: "Edit User", disabled: false, href: "" },
    ]);

    this.userStore.setUserAction("U");
    this.router.push({ name: "userDetail" });
  }

  addNewUser() : void {
    this.userStore.setUserId("");
    this.userStore.setUserAction("C");
    this.userStore.getUserDetail();


    this.emit("breadCrumbHandler", [
      { title: "Admin", disabled: false, href: "" },
      { title: "Users", disabled: false, href: "" },
      { title: "New User", disabled: false, href: "" },
    ]);

    this.router.push({ name: "userDetail" });
  }

  askForDeletingItem(item: User) {
    this.userToDelete.value = item;
    this.showDeleteConfirmDialog.value = true;
  }

  async doDeleteItem() {
    if (this.userToDelete.value) {
      this.userStore.setUserId(this.userToDelete.value.id);
      await this.userStore.deleteUser();
      this.fetchUsers();
    }
  }

  displayFilters() {
    this.drawerFilter.value = !this.drawerFilter.value;
  }

  async doResetFilterUsersHandler() {
    await this.userStore.resetSearch();
    this.users.value = this.userStore.users;
  }

  openCloseUserFilterDrawerHandler() : void {
    this.drawerFilter.value = !this.drawerFilter.value;
  }

}
