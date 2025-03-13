Caso 1: import { useCalendarEventBus } from '@/components/CalendarEventBus';
✅ Usato quando la funzione è un ES Module Named Export
👉 Questa sintassi è corretta se il file CalendarEventBus.ts esporta la funzione in questo modo:

// CalendarEventBus.ts
export function useCalendarEventBus() {
  // Logica della funzione...
}
📌 Cosa significa?

Stai importando un’esportazione nominale (named export).
Puoi esportare più funzioni dallo stesso file.
Devi usare {} attorno al nome della funzione quando la importi.
📌 Caso 2: import useCalendarEventBus from '@/components/CalendarEventBus';
✅ Usato quando la funzione è un Default Export
👉 Questa sintassi è corretta se il file CalendarEventBus.ts esporta la funzione in questo modo:

// CalendarEventBus.ts
export default function useCalendarEventBus() {
  // Logica della funzione...
}
📌 Cosa significa?

Stai importando un default export, che può essere importato senza {}.
Il file può avere solo un export default, ma nessun altro export.
🎯 Quale scegliere?
Esportazione	Importazione	Quando usarla?
export function useCalendarEventBus() {}	import { useCalendarEventBus } from '@/components/CalendarEventBus';	Se vuoi esportare più funzioni dallo stesso file.
export default function useCalendarEventBus() {}	import useCalendarEventBus from '@/components/CalendarEventBus';	Se il file esporta solo questa funzione e vuoi un'importazione più pulita.
💡 Miglior pratica consigliata
Se CalendarEventBus.ts contiene solo useCalendarEventBus, usa export default.
Se contiene più funzioni, usa export normale e importa con {}.