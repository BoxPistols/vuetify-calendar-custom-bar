// document.querySelector(".v-btn__content").onclick = function() {
//  console.log(this)
// };

const weekdaysDefault = [1, 2, 3, 4, 5, 6, 0];

const intervalsDefault = {
  first: 0,
  minutes: 60,
  count: 24,
  height: 48
};

const stylings = {
  default(interval) {
    return undefined;
  },
  workday(interval) {
    const inactive =
      interval.weekday === 0 ||
      interval.weekday === 6 ||
      interval.hour < 9 ||
      interval.hour >= 17;
    const startOfHour = interval.minute === 0;
    const dark = this.dark;
    const mid = dark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)";

    return {
      backgroundColor: inactive
        ? dark
          ? "rgba(0,0,0,0.4)"
          : "rgba(0,0,0,0.05)"
        : undefined,
      borderTop: startOfHour ? undefined : "1px dashed " + mid
    };
  },
  past(interval) {
    return {
      backgroundColor: interval.past
        ? this.dark
          ? "rgba(0,0,0,0.4)"
          : "rgba(0,0,0,0.05)"
        : undefined
    };
  }
};

new Vue({
  el: "#app",
  vuetify: new Vuetify(),
  data: () => ({
    focus: "",
    // typeToLabel: {
    //   month: "Month",
    //   week: "Week",
    //   day: "Day",
    //   "4day": "4 Days"
    // },
    start: null,
    end: null,
    selectedEvent: {},
    selectedElement: null,
    selectedOpen: false,
    events: [],
    colors: [
      "blue",
      "indigo",
      "deep-purple",
      "cyan",
      "green",
      "orange",
      "grey darken-1"
    ],
    names: [
      "Meeting",
      "Holiday",
      "PTO",
      "Travel",
      "Event",
      "Birthday",
      "Conference",
      "Party"
    ],

    date: "",
    days: "",
    day: "",
    dark: false,
    startMenu: false,
    start: "2020-02-1",
    endMenu: false,
    end: "2020-02-29",
    nowMenu: true,
    minWeeks: 1,
    now: null,
    events: [],
    colors: [
      "blue",
      "indigo",
      "deep-purple",
      "cyan",
      "green",
      "orange",
      "grey darken-1"
    ],

    shifts: ["日勤", "夜勤", "準夜", "早出", "遅出", "半休", "全休", "明け"],
    names: [
      "山田太郎",
      "吉田花子",
      "斎藤綾乃",
      "本山茂",
      "迫美香子",
      "伊集院進ノ介",
      "三輪幸子",
      "結城純"
    ],
    members: [
       "山田太郎 看護師 上級",
       "吉田花子　准看護師　中級",
       "斎藤綾乃　看護補助者　初級",
       "本山茂　看護師 上級",
       "迫美香子　准看護師　中級",
       "伊集院進ノ介　看護補助者　初級",
       "三輪幸子　准看護師　中級",
       "結城純　准看護師　中級"
      ],

    type: "month",
    typeOptions: [
      // { text: "Day", value: "day" },
      // { text: "4 Day", value: "4day" },
      {text: "シフト一覧", value: "month"},
      {text: "詳細", value: "week"}
      // { text: "Custom Daily", value: "custom-daily" },
      // { text: "Custom Weekly", value: "custom-weekly" }
    ],
    mode: "stack",
    modeOptions: [
      {text: "Stack", value: "stack"},
      {text: "Column", value: "column"}
    ],

    weekdays: weekdaysDefault,
    weekdaysOptions: [
      {text: "Sunday - Saturday", value: weekdaysDefault},
      {text: "Mon, Wed, Fri", value: [1, 3, 5]},
      {text: "Mon - Fri", value: [1, 2, 3, 4, 5]},
      {text: "Mon - Sun", value: [1, 2, 3, 4, 5, 6, 0]}
    ],

    intervals: intervalsDefault,
    intervalsOptions: [
      {text: "Default", value: intervalsDefault},
      {text: "Workday", value: {first: 16, minutes: 30, count: 20, height: 48}}
    ],

    maxDays: 7,
    maxDaysOptions: [
      {text: "7 days", value: 7},
      {text: "5 days", value: 5},
      {text: "4 days", value: 4},
      {text: "3 days", value: 3}
    ],

    styleInterval: "default",
    styleIntervalOptions: [
      {text: "Default", value: "default"},
      {text: "Workday", value: "workday"},
      {text: "Past", value: "past"}
    ],

    color: "primary",
    colorOptions: [
      {text: "Primary", value: "primary"},
      {text: "Secondary", value: "secondary"},
      {text: "Accent", value: "accent"},
      {text: "Red", value: "red"},
      {text: "Pink", value: "pink"},
      {text: "Purple", value: "purple"},
      {text: "Deep Purple", value: "deep-purple"},
      {text: "Indigo", value: "indigo"},
      {text: "Blue", value: "blue"},
      {text: "Light Blue", value: "light-blue"},
      {text: "Cyan", value: "cyan"},
      {text: "Teal", value: "teal"},
      {text: "Green", value: "green"},
      {text: "Light Green", value: "light-green"},
      {text: "Lime", value: "lime"},
      {text: "Yellow", value: "yellow"},
      {text: "Amber", value: "amber"},
      {text: "Orange", value: "orange"},
      {text: "Deep Orange", value: "deep-orange"},
      {text: "Brown", value: "brown"},
      {text: "Blue Gray", value: "blue-gray"},
      {text: "Gray", value: "gray"},
      {text: "Black", value: "black"}
    ],

    shortIntervals: true,
    shortMonths: false,
    shortWeekdays: false,
    dialog: false,
    select: [
      {text: "日勤"},
      {text: "早出"},
      {text: "遅出"},
      {text: "午前休"},
      {text: "午後休"},
      {text: "深夜"},
      {text: "明け"},
      {text: "準夜"},
      {text: "公休"}
    ]
  }),

  computed: {
    // Calendar
    intervalStyle() {
      return stylings[this.styleInterval].bind(this);
    },
    hasIntervals() {
      return (
        this.type in
        {
          week: 1,
          day: 1,
          "4day": 1,
          "custom-daily": 1
        }
      );
    },
    hasEnd() {
      return (
        this.type in
        {
          "custom-weekly": 1,
          "custom-daily": 1
        }
      );
    }
  },

  methods: {
    // ToDo Sort
    sortData: function() {
      listData.sort(function(a, b) {
        return a < b ? -1 : 1;
      });
    },
    testEv({add}) {
      // alert("Add Event");
      // this.date = date;
      this.event = event;
      // this.members　= members
      // alert(this.members[0] + "を" + this.date + "に追加します");
      // alert(this.members[0] + "を" + this.date + "に追加します");
      alert(this.members[this.rnd(0, this.members.length - 1)] + "を" + this.date + "に追加します");

      this.dialog = false;
    },
    viewDay({date}) {
      this.focus = date;
      //this.type = "day";
      // add new dialog
      this.dialog = true;
      this.date = date;
      //this.days = date.week
      //alert(date)
    },
    viewMore({more}) {
      this.focus = more;
      this.type = "day";
      //this.dialog = true;
    },
    showEvent({nativeEvent, event}) {
      const open = () => {
        this.selectedEvent = event;
        this.selectedElement = nativeEvent.target;
        setTimeout(() => (this.selectedOpen = true), 10);
      };

      if (this.selectedOpen) {
        this.selectedOpen = false;
        setTimeout(open, 10);
      } else {
        open();
      }

      nativeEvent.stopPropagation();
    },
    getEventColor(event) {
      return event.color;
    },
    showIntervalLabel(interval) {
      return interval.minute === 0;
    },
    getEvents({start, end}) {
      const events = [];

      const min = new Date(`${start.date}T00:00:00`);
      const max = new Date(`${end.date}T23:59:59`);
      const days = (max.getTime() - min.getTime()) / 86400000;
      const eventCount = this.rnd(days, days + 25 * 5);

      for (let i = 0; i < eventCount; i++) {
        const allDay = this.rnd(0, 3) === 0;
        const firstTimestamp = this.rnd(min.getTime(), max.getTime());
        const first = new Date(firstTimestamp - (firstTimestamp % 900000));
        const secondTimestamp = this.rnd(2, allDay ? 288 : 8) * 900000;
        const second = new Date(first.getTime() + secondTimestamp);

        let arr = ["日勤", "早出", "深夜"];
        // let r = 0
        // let y = y.rnd(0, 2)
        let x = arr[2];
        let shiftBar = this.shifts[this.rnd(0, this.shifts.length - 1)];

        events.push({
          name: shiftBar + " " + this.names[this.rnd(0, this.names.length - 1)],
          // shift: this.shifts[this.rnd(0, this.shifts.length - 1)],
          start: this.formatDate(first, !allDay),
          end: this.formatDate(second, !allDay),
          color: this.colors[this.rnd(0, this.colors.length - 1)]
        });
      }

      this.events = events;
    },
    rnd(a, b) {
      return Math.floor((b - a + 1) * Math.random()) + a;
    },
    formatDate(a, withTime) {
      return withTime
        ? `${a.getFullYear()}-${a.getMonth() +
            1}-${a.getDate()} ${a.getHours()}:${a.getMinutes()}`
        : `${a.getFullYear()}-${a.getMonth() + 1}-${a.getDate()}`;
    }
  }
});
