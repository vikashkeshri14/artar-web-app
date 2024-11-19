import { View, Text } from "react-native";
import Reac, { useState } from "react";
import { Calendar, LocaleConfig } from "react-native-calendars";
import GlobalStyle from "../../hooks/GlobalStyle";
import moment from "moment";
export default function CalendarView() {
  const [marked, setMarked] = useState({});
  return (
    <View>
      <Calendar
        theme={{
          monthTextColor: "#60BA62",
          dayTextColor: "#484848",
          textDayFontSize: 12,
          textMonthFontSize: 12,
          textDayHeaderFontSize: 12,
          arrowColor: "#959494",
          monthTextColor: "green",
          indicatorColor: "green",
        }}
        style={GlobalStyle.sstmedium}
        className="rounded-[26px] text-[12px] shadow-[0_1px_11px_1px_rgba(0,0,0,0.11)] text-[#484848] bg-white h-[404px]"
        // Initially visible month. Default = Date()
        current={moment().format("YYYY-MM-DD").toString()}
        // Minimum date that can be selected, dates before minDate will be grayed out. Default = undefined
        minDate={"2023-01-01"}
        // Maximum date that can be selected, dates after maxDate will be grayed out. Default = undefined
        maxDate={"2025-01-01"}
        // Handler which gets executed on day press. Default = undefined
        onDayPress={(day) => {
          // getDetailEvent(day.dateString);
        }}
        markedDates={marked}
        // Month format in calendar title. Formatting values: http://arshaw.com/xdate/#Formatting
        monthFormat={"MMMM"}
        // Handler which gets executed when visible month changes in calendar. Default = undefined
        onMonthChange={(month) => {
          // console.log("month changed", month);
        }}
        // Hide month navigation arrows. Default = false
        hideArrows={false}
        // Do not show days of other months in month page. Default = false
        hideExtraDays={true}
        // If hideArrows=false and hideExtraDays=false do not swich month when tapping on greyed out
        // day from another month that is visible in calendar page. Default = false

        // If firstDay=1 week starts from Monday. Note that dayNames and dayNamesShort should still start from Sunday.
        firstDay={1}
        enableSwipeMonths={true}
      />
    </View>
  );
}
