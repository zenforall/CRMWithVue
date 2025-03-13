import { ref, onMounted, onUnmounted } from "vue";

// 768 è la width dell'Ipad Mini

/* Come alternativa si possono utilizzare i breakpoint di Vuetify

import { useDisplay } from 'vuetify'
const display = useDisplay();

Extra small	xs	Small to large phone	< 600px
Small	sm	Small to medium tablet	600px > < 960px
Medium	md	Large tablet to laptop	960px > < 1280px
Large	lg	Laptop to desktop	1280px > < 1920px
Extra large	xl	1080p to 1440p desktop	1920px > < 2560px
Extra extra large	xxl	4k and ultra-wide	> 2560px

*/


export function useIsMobile() {
  const isMobile = ref(window.innerWidth < 768);

  function checkAndAssignMobileStatus(): void {
    isMobile.value = window.innerWidth < 768;
  }

  onMounted(() => {
    window.addEventListener("resize", checkAndAssignMobileStatus);
    checkAndAssignMobileStatus();
  });

  onUnmounted(() => {
    window.removeEventListener("resize", checkAndAssignMobileStatus);
  });

  return { isMobile };
}
