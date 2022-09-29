<template>
  <div>
    <base-header class="pb-6 content__title content__title--calendar">
      <div class="row align-items-center py-4">
        <div class="col-lg-6 col-7">
          <h6 class="h2 text-white d-inline-block mb-0">{{ $route.name }}</h6>
          <nav aria-label="breadcrumb" class="d-none d-md-inline-block ml-md-4">
            <route-breadcrumb />
          </nav>
        </div>
        <div class="col-lg-6 mt-3 mt-lg-0 text-lg-right">
          <a
            href="#"
            @click.prevent="prev"
            class="fullcalendar-btn-prev btn btn-sm btn-default"
          >
            <i class="fas fa-angle-left"></i>
          </a>
          <a
            href="#"
            @click.prevent="next"
            class="fullcalendar-btn-next btn btn-sm btn-default"
          >
            <i class="fas fa-angle-right"></i>
          </a>
          <base-button
            class="btn btn-sm btn-default"
            :class="{ active: defaultView === 'dayGridMonth' }"
            @click="changeView('dayGridMonth')"
          >
            Month
          </base-button>
          <base-button
            class="btn btn-sm btn-default"
            :class="{ active: defaultView === 'dayGridWeek' }"
            @click="changeView('dayGridWeek')"
          >
            Week
          </base-button>
          <base-button
            class="btn btn-sm btn-default"
            :class="{ active: defaultView === 'timeGridDay' }"
            @click="changeView('timeGridDay')"
          >
            Day
          </base-button>
        </div>
      </div>
    </base-header>

    <div class="container-fluid mt--6">
      <div class="row">
        <div class="col">
          <!-- Fullcalendar -->
          <div class="card card-calendar">
            <!-- Card header -->
            <div class="card-header">
              <!-- Title -->
              <h5 class="h3 mb-0">Calendar</h5>
            </div>
            <!-- Card body -->
            <div class="card-body p-0 card-calendar-body">
              <full-calendar
                :events="events"
                :plugins="calendarPlugins"
                :editable="true"
                contentHeight="auto"
                :theme="false"
                :selectable="true"
                :selectHelper="true"
                ref="fullCalendar"
                class="calendar"
                :defaultView="defaultView"
                @dateClick="onDateClick"
                @eventClick="onEventClick"
              >
              </full-calendar>
            </div>
          </div>
        </div>
      </div>
    </div>

    <modal :show.sync="showAddModal" modal-classes="modal-secondary">
      <form class="new-event--form" @submit.prevent="saveEvent">
        <base-input
          label="Event title"
          placeholder="Event Title"
          v-model="model.title"
          input-classes="form-control-alternative new-event--title"
        >
        </base-input>
        <div class="form-group">
          <label class="form-control-label d-block mb-3">Status color</label>
          <div class="btn-group btn-group-toggle btn-group-colors event-tag">
            <label
              v-for="color in eventColors"
              :key="color"
              class="btn"
              :class="[color, { 'active focused': model.className === color }]"
            >
              <input
                v-model="model.className"
                type="radio"
                name="event-tag"
                :value="color"
                autocomplete="off"
              />
            </label>
          </div>
        </div>
        <input type="hidden" class="new-event--start" />
        <input type="hidden" class="new-event--end" />
      </form>

      <template slot="footer">
        <button
          type="submit"
          class="btn btn-primary new-event--add"
          @click="saveEvent"
        >
          Add event
        </button>
        <button
          type="button"
          class="btn btn-link ml-auto"
          @click="showAddModal = false"
        >
          Close
        </button>
      </template>
    </modal>

    <modal :show.sync="showEditModal" modal-classes="modal-secondary">
      <form class="edit-event--form" @submit.prevent="editEvent">
        <base-input
          label="Event title"
          placeholder="Event Title"
          v-model="model.title"
          input-classes="form-control-alternative new-event--title"
        >
        </base-input>
        <div class="form-group">
          <label class="form-control-label d-block mb-3">Status color</label>
          <div class="btn-group btn-group-toggle btn-group-colors event-tag">
            <label
              v-for="color in eventColors"
              :key="color"
              class="btn"
              :class="[color, { 'active focused': model.className === color }]"
            >
              <input
                v-model="model.className"
                type="radio"
                name="event-tag"
                :value="color"
                autocomplete="off"
              />
            </label>
          </div>
        </div>
        <base-input label="Description">
          <textarea
            v-model="model.description"
            class="
              form-control form-control-alternative
              edit-event--description
              textarea-autosize
            "
            placeholder="Event Desctiption"
          >
          </textarea>
          <i class="form-group--bar"></i>
        </base-input>
        <input type="hidden" class="new-event--start" />
        <input type="hidden" class="new-event--end" />
      </form>

      <template slot="footer">
        <base-button
          native-type="submit"
          type="primary"
          class="new-event--add"
          @click="editEvent"
          >Update</base-button
        >
        <base-button type="danger" @click="deleteEvent">Delete</base-button>
        <base-button type="link" class="ml-auto" @click="showAddModal = false"
          >Close</base-button
        >
      </template>
    </modal>
  </div>
</template>
<script>
import Modal from "~/components/argon-core/Modal.vue";
import FullCalendar from "@fullcalendar/vue";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";

const today = new Date();
const y = today.getFullYear();
const m = today.getMonth();
const d = today.getDate();
export default {
  name: "big-calendar",
  layout: "DashboardLayout",
  components: {
    Modal,
    FullCalendar,
  },
  data() {
    let monthText = m + 1 > 10 ? m + 1 : `0${m + 1}`;
    let yearAndMonth = `${y}-${monthText}`;
    return {
      calendarPlugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
      defaultView: "dayGridMonth",
      events: [
        {
          title: "Call with Dave",
          start: `${yearAndMonth}-18`,
          end: `${yearAndMonth}-18`,
          className: "bg-red",
          allDay: true,
        },

        {
          title: "Lunch meeting",
          start: `${yearAndMonth}-21`,
          end: `${yearAndMonth}-22`,
          className: "bg-orange",
          allDay: true,
        },

        {
          title: "All day conference",
          start: `${yearAndMonth}-29`,
          end: `${yearAndMonth}-29`,
          className: "bg-green",
          allDay: true,
        },

        {
          title: "Meeting with Mary",
          start: `${yearAndMonth}-01`,
          end: `${yearAndMonth}-01`,
          className: "bg-blue",
          allDay: true,
        },

        {
          title: "Winter Hackaton",
          start: `${yearAndMonth}-03`,
          end: `${yearAndMonth}-03`,
          className: "bg-red",
          allDay: true,
        },

        {
          title: "Digital event",
          start: `${yearAndMonth}-07`,
          end: `${yearAndMonth}-09`,
          className: "bg-orange",
          allDay: true,
        },

        {
          title: "Marketing event",
          start: `${yearAndMonth}-10`,
          end: `${yearAndMonth}-10`,
          className: "bg-purple",
          allDay: true,
        },

        {
          title: "Dinner with Family",
          start: `${yearAndMonth}-19`,
          end: `${yearAndMonth}-19`,
          className: "bg-red",
          allDay: true,
        },

        {
          title: "Black Friday",
          start: `${yearAndMonth}-23`,
          end: `${yearAndMonth}-23`,
          className: "bg-blue",
          allDay: true,
        },

        {
          title: "Cyber Week",
          start: `${yearAndMonth}-02`,
          end: `${yearAndMonth}-02`,
          className: "bg-yellow",
          allDay: true,
        },
      ],
      showAddModal: false,
      showEditModal: false,
      model: {
        title: "",
        className: "bg-default",
        description:
          "Nullam id dolor id nibh ultricies vehicula ut id elit. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.",
        start: "",
        end: "",
      },
      eventColors: [
        "bg-info",
        "bg-orange",
        "bg-red",
        "bg-green",
        "bg-default",
        "bg-blue",
        "bg-purple",
        "bg-yellow",
      ],
    };
  },
  methods: {
    calendarApi() {
      return this.$refs.fullCalendar.getApi();
    },
    changeView(viewType) {
      this.defaultView = viewType;
      this.calendarApi().changeView(viewType);
    },
    next() {
      this.calendarApi().next();
    },
    prev() {
      this.calendarApi().prev();
    },
    onDateClick({ date }) {
      this.showAddModal = true;
      this.model.start = date;
      this.model.end = date;
    },
    onEventClick({ el, event }) {
      this.model = {
        title: event.title,
        className: event.classNames ? event.classNames.join(" ") : "",
        start: event.start,
        end: event.end,
        description:
          "Nullam id dolor id nibh ultricies vehicula ut id elit. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.",
      };
      this.showEditModal = true;
    },
    saveEvent() {
      if (this.model.title) {
        let event = {
          ...this.model,
          allDay: true,
        };
        this.events.push(JSON.parse(JSON.stringify(event)));

        this.model = {
          title: "",
          eventColor: "bg-danger",
          start: "",
          end: "",
        };
      }
      this.showAddModal = false;
    },
    editEvent() {
      let index = this.events.findIndex((e) => e.title === this.model.title);
      if (index !== -1) {
        this.events.splice(index, 1, this.model);
      }
      this.showEditModal = false;
    },
    deleteEvent() {
      let index = this.events.findIndex((e) => e.title === this.model.title);
      if (index !== -1) {
        this.events.splice(index, 1);
      }
      this.showEditModal = false;
    },
  },
};
</script>
<style lang="scss">
@import "@fullcalendar/core/main.css";
@import "@fullcalendar/daygrid/main.css";
@import "@fullcalendar/timegrid/main.css";
@import "~/assets/sass/core/vendors/_fullcalendar.scss";
</style>
