<script setup lang="ts">

import { VueDraggableNext } from 'vue-draggable-next'
import { onMounted, ref, watch } from "vue";
import type { BreadCrumbItem } from '@/models/BreadCrumbItem';

const items = [] as string[];
items.push("Sales");
items.push("Pipeline");

const showWonList = ref(true);
const showLostList = ref(true);
const showWonListDiv = ref("block");
const showLostListDiv = ref(true);


watch(showWonList, (newVal, oldVal) => {
  if (newVal == oldVal) return;
  if (newVal) {
      showWonListDiv.value = "block";
  } else {
    showWonListDiv.value = "none";
  }
});

watch(showLostList, (newVal, oldVal) => {
  if (newVal == oldVal) return;
  if (newVal) {
      showLostListDiv.value = true;
  } else {
    showLostListDiv.value = false;
  }
});


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

/*
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
*/

function addNewPipeline() : void {

}


</script>

<template>

<v-card style="margin-right: 5px;margin-bottom: 10px;margin-top: 10px;background-color: #f9f9f9;" elevation="0">
  <v-row style="display: flex;align-items: center;background-color: white;border: solid black 0px;">
    <v-col style="margin-top: 10px;margin-left: 20px;padding: 10px;">
      <v-breadcrumbs :items="items" color="secondary">
        <template v-slot:divider>
          /
        </template>
       </v-breadcrumbs>
    </v-col>
  </v-row>
  <v-row style="display: flex;align-items: center;background-color: white;border: 0px solid black;">
    <v-col style="margin-top: 0px;margin-left: 20px;padding: 10px;">
       <v-label class="text-secondary" style="font-weight: bold;font-size: x-large;opacity: 0.87;">Pipeline</v-label>
    </v-col>
    <v-col style="display: flex;justify-content: end;margin-right: 5px;margin-top: 0px;margin-bottom: 10px;padding: 10px;">
       <v-btn  style="margin-left: 5px;background-color:#03a840;color: #fff;" @click="addNewPipeline">Create Pipeline</v-btn>
    </v-col>
  </v-row>
</v-card>

  <v-card style="margin-right: 5px;background-color: #f9f9f9;" elevation="0">
    <v-row style="display: flex;align-items: center;background-color: white;">
       <v-col style="display: flex;justify-content: start;align-items: center; margin-right: 5px;margin-top: 10px;">
            <v-text-field
              style="max-width: 300px;margin-left: 15px;"
              class="d-none d-sm-block"
              density="compact"
              label="Search"
              prepend-inner-icon="mdi-magnify"
              variant="outlined"
              flat
              hide-details
              single-line>
           </v-text-field>
          <v-btn style="background-color:#03a840;color: #fff;margin-left: 10px;"><!--<v-icon start>mdi-filter-cog</v-icon>-->Filters</v-btn>
          <div style="flex-grow: 1; display: flex;flex-direction: row;justify-content: end;">
            <v-switch
                v-model="showWonList"
                color="success"
                hide-details>
                <template #label>
                  <span style="font-weight: bold;">Won</span>
                </template>
            </v-switch>
            <v-switch
                v-model="showLostList"
                style="margin-left: 10px;"
                color="error"
                hide-details>
                <template #label>
                  <span style="font-weight: bold;">Lost</span>
                </template>
            </v-switch>
            </div>
        </v-col>
    </v-row>

    <v-navigation-drawer style="background-color: white;" app :width="320" location="right" :temporary="true" :permanent="false">
    </v-navigation-drawer>
  <!--
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


      <div v-for="step in steps" :key="step.value" class="step.active" @click="selectStep(step.value)">
        <div v-if="currentStep === step.value" class="step active">
          <span><v-label style="opacity: 0.9;" >{{ step.label }} </v-label></span>
          <span class="arrow active" />
        </div>
        <div v-else-if="currentStep != step.value" class="step" @click="selectStep(step.value)">
          <span><v-label style="opacity: 0.9;" >{{ step.label }} </v-label></span>
          <span class="arrow" />
        </div>
      </div>
    </div>
  </v-col>
  </v-row>
-->

   <v-row style="margin-left: 1px;margin-right: 1px;margin-top: 5px;">
    <v-col style="background-color: white;" class="draggable-container">
      <v-label class="text-secondary" style="font-weight: bold;font-size: large;opacity: 0.87;">New</v-label>
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
              readonly
              :model-value="3"
              color="secondary"
              active-color="warning"
            />
          </v-card-text>
        </v-card>
      </VueDraggableNext>
    </v-col>
    <v-col style="background-color: white;" class="draggable-container">
      <v-label class="text-secondary" style="font-weight: bold;font-size: large;opacity: 0.87;">Proposition</v-label>
      <VueDraggableNext :list="list3" group="people" @change="logEvent" style="cursor: move;">
        <v-card
          v-for="(element, index) in list3"
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
            <v-rating
              hover
              :length="5"
              :size="32"
              readonly
              :model-value="4"
              color="secondary"
              active-color="warning"
            />
          </v-card-text>
        </v-card>
      </VueDraggableNext>
    </v-col>
    <v-col style="background-color: white;" class="draggable-container">
      <v-label class="text-secondary" style="font-weight: bold;font-size: large;opacity: 0.87;">Negotiation</v-label>
      <VueDraggableNext :list="list4" group="people" @change="logEvent" style="cursor: move;">
        <v-card
          v-for="(element, index) in list4"
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
            <v-rating
              hover
              :length="5"
              :size="32"
              readonly
              :model-value="2"
              color="secondary"
              active-color="warning"
            />
          </v-card-text>
        </v-card>
      </VueDraggableNext>
    </v-col>
    <v-col :style="{ display : showWonListDiv }" style="background-color: white;" class="draggable-container">
      <v-label class="text-primary" style="font-weight: bold;font-size: large;opacity: 0.87;">Won</v-label>
      <VueDraggableNext :list="list5" group="people" @change="logEvent" style="cursor: move;">
        <v-card
          v-for="(element, index) in list5"
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
            <v-rating
              hover
              :length="5"
              :size="32"
              readonly
              :model-value="5"
              color="secondary"
              active-color="warning"
            />
          </v-card-text>
        </v-card>
      </VueDraggableNext>
    </v-col>
    <v-col style="background-color: white;" class="draggable-container" v-show="showLostListDiv" >
      <v-label color="error" style="color: rgb(211, 47, 47);font-weight: bold;font-size: large;opacity: 0.87;">Lost</v-label>
      <VueDraggableNext :list="list2" group="people" style="cursor: move;">
        <v-card
          v-for="(element, index) in list2"
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
              readonly
              :model-value="1"
              color="secondary"
              active-color="warning"
            />
          </v-card-text>
        </v-card>
      </VueDraggableNext>
    </v-col>
  </v-row>
</v-card>
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

.pipelineTypeTitle {
  font-weight: bold;
  margin-bottom: 5px;
  font-size: 18px;
}

:deep(.v-breadcrumbs--density-default) {
  padding: 0px;
}

:deep(.v-breadcrumbs-item ) {
  padding:0px;
}

.draggable-container {
  max-height: 400px; /* o height: 300px; se vuoi una altezza fissa */
  overflow-y: auto;
  scrollbar-width: thin;
  margin-bottom: 10px;
}


</style>
