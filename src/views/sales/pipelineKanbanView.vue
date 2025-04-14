<script setup lang="ts">

import { VueDraggableNext } from 'vue-draggable-next'
import { onMounted, ref } from "vue";
import type { BreadCrumbItem } from '@/models/BreadCrumbItem';

onMounted(async () => {

        const breadCrumbItems :  BreadCrumbItem[] = [];
        breadCrumbItems.push(
          {
              title: "Sales",
              disabled : false,
              href : ""
          },
          {
              title: "Pipeline",
              disabled : false,
              href : ""
          }
        );
        emit("breadCrumbHandler",breadCrumbItems);
});

const emit =defineEmits<{
      (event: "breadCrumbHandler", message: BreadCrumbItem[]): void;
}>();


interface ListItem {
  id: number
  name: string
  value: number
}

const list1 = ref<ListItem[]>([
      { id: 1, name: 'Elemento A1',value:100.000 },
      { id: 2, name: 'Elemento A2',value:5000 },
    ]);

const list2 = ref<ListItem[]>([
      { id: 3, name: 'Elemento B1',value:10000 },
      { id: 4, name: 'Elemento B2',value:5000 },
]);

const list3 = ref<ListItem[]>([
      { id: 5, name: 'Elemento C1',value:6500 },
      { id: 6, name: 'Elemento C2',value:3200 },
]);

const list4 = ref<ListItem[]>([
      { id: 7, name: 'Elemento N1',value:1200 },
      { id: 8, name: 'Elemento N2',value:450 },
]);

const list5 = ref<ListItem[]>([
      { id: 9, name: 'Elemento W1',value:9800 },
      { id: 10, name: 'Elemento W2',value:3200 },
]);


function logEvent(event:unknown) : void {
  console.log(JSON.stringify(event));
}

const currentStep = ref(1)

const selectStep = (stepValue: number) => {
  currentStep.value = stepValue
}

interface Step {
  label: string
  value: number
}

const steps: Step[] = [
  { label: 'New', value: 1 },
  { label: 'Qualified', value: 2 },
  { label: 'Proposition', value: 3 },
  { label: 'Negotiation', value: 4 },
  { label: 'Won', value: 5 }
]


</script>

<template>

  <v-row>
    <v-col>
      <div class="stepper">
      <div
        v-for="step in steps"
        :key="step.value"
        class="step"
        :class="{ active: currentStep === step.value }"
        @click="selectStep(step.value)">
        <span><v-label style="opacity: 0.9;" >{{ step.label }} </v-label></span>
        <span class="arrow" />
      </div>
    </div>
  </v-col>
  </v-row>
   <v-row>
    <v-col>
      <v-label style="font-weight: bold;">New</v-label>
      <VueDraggableNext :list="list1" group="people" style="cursor: move;">
         <v-card
          v-for="(element, index) in list1"
          :key="element.id"
         style="margin-bottom: 5px;">
          <template v-slot:title>
            <v-label style="cursor: pointer;">
              {{ element.name }}
            </v-label>
          </template>
          <v-card-text>
            Posizione: {{ index }}
            <br/>
            {{element.value}} €
            <br/>
            <v-rating
              hover
              :length="5"
              :size="32"
              :model-value="3"
              color="secondary"
              active-color="warning"
            />
          </v-card-text>
        </v-card>
      </VueDraggableNext>
    </v-col>
    <v-col>
      <v-label style="font-weight: bold;">Qualified</v-label>
      <VueDraggableNext :list="list2" group="people" style="cursor: move;">
        <v-card
          v-for="(element, index) in list2"
          :key="element.id"
         style="margin-bottom: 5px;">
          <template v-slot:title>
            {{ element.name }}
          </template>
          <v-card-text>
            Posizione: {{ index }}
            <br/>
            {{element.value}} €
          </v-card-text>
        </v-card>
      </VueDraggableNext>
    </v-col>
    <v-col>
      <v-label style="font-weight: bold;">Proposition</v-label>
      <VueDraggableNext :list="list3" group="people" @change="logEvent" style="cursor: move;">
        <v-card
          v-for="(element, index) in list3"
          :key="element.id"
         style="margin-bottom: 5px;">
          <template v-slot:title>
            {{ element.name }}
          </template>
          <v-card-text>
            Posizione: {{ index }}
            <br/>
            {{element.value}} €
          </v-card-text>
        </v-card>
      </VueDraggableNext>
    </v-col>
    <v-col>
      <v-label style="font-weight: bold;">Negotiation</v-label>
      <VueDraggableNext :list="list4" group="people" @change="logEvent" style="cursor: move;">
        <v-card
          v-for="(element, index) in list4"
          :key="element.id"
         style="margin-bottom: 5px;">
          <template v-slot:title>
            {{ element.name }}
          </template>
          <v-card-text>
            Posizione: {{ index }}
            <br/>
            {{element.value}} €
          </v-card-text>
        </v-card>
      </VueDraggableNext>
    </v-col>
    <v-col>
      <v-label style="font-weight: bold;">Won</v-label>
      <VueDraggableNext :list="list5" group="people" @change="logEvent" style="cursor: move;">
        <v-card
          v-for="(element, index) in list5"
          :key="element.id"
         style="margin-bottom: 5px;">
          <template v-slot:title>
            {{ element.name }}
          </template>
          <v-card-text>
            Posizione: {{ index }}
            <br/>
            {{element.value}} €
          </v-card-text>
        </v-card>
      </VueDraggableNext>
    </v-col>
  </v-row>
</template>

<style scoped>

.stepper {
  display: flex;
  gap: 25px;
}

.step {
  display: flex;
  align-items: center;
  background-color: #e0e0e0;
  padding: 12px 20px;
  border-radius: 8px 0 0 8px;
  position: relative;
  cursor: pointer;
  font-weight: 500;
  transition: background-color 0.3s, color 0.3s;
}

.step.active {
  background-color: #1976d2;
  color: white;
}

.arrow {
  width: 0;
  height: 0;
  border-top: 23px solid transparent;
  border-bottom: 27px solid transparent;
  border-left: 20px solid #e0e0e0;
  position: absolute;
  right: -20px;
  top: 0;
}

.step.active .arrow {
  border-left-color: #1976d2;
}

.label {
  z-index: 1;
}

</style>
