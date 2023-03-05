import React from "react";
import { formatDate } from "@fullcalendar/core";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";

function BookingCalendar({ props }) {
    let eventGuid = 0;

  let bookings = props;
  function createEventId() {
    return String(eventGuid++);
  }

  let state = {
    weekendsVisible: true,
    currentEvents: [],
  };

  let bookingEvents = [];

  (bookings || []).forEach((booking) => {
    let event = {
      id: createEventId(),
      title: booking.user,
      start: booking.from,
      end: booking.to,
    };
    bookingEvents.push(event);
  });

  console.log("bookingEvents", bookingEvents);

  //   render() {
  return (
    <div className="demo-app">
      {/* {renderSidebar()} */}
      <div className="demo-app-main">
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          headerToolbar={{
            left: "prev,next today",
            center: "title",
            right: "dayGridMonth,timeGridWeek,timeGridDay",
          }}
          initialView="dayGridMonth"
          editable={true}
          selectable={true}
          selectMirror={true}
          dayMaxEvents={true}
          weekends={true}
          initialEvents={bookingEvents} // alternatively, use the `events` setting to fetch from a feed
        //   select={this.handleDateSelect}
        //   eventContent={renderEventContent} // custom render function
        //   eventClick={this.handleEventClick}
        //   eventsSet={this.handleEvents} // called after events are initialized/added/changed/removed
          /* you can update a remote database when these fire:
            eventAdd={function(){}}
            eventChange={function(){}}
            eventRemove={function(){}}
            */
        />
      </div>
    </div>
  );
  //   
        }

//   const handleDateSelect = (selectInfo) => {
//     let title = prompt("Please enter a new title for your event");
//     let calendarApi = selectInfo.view.calendar;

//     calendarApi.unselect(); // clear date selection

//     if (title) {
//       calendarApi.addEvent({
//         id: createEventId(),
//         title,
//         start: selectInfo.startStr,
//         end: selectInfo.endStr,
//         allDay: selectInfo.allDay,
//       });
//     }
//   };

//   const handleEventClick = (clickInfo) => {
//     if (
//       document.confirm(
//         `Are you sure you want to delete the event '${clickInfo.event.title}'`
//       )
//     ) {
//       clickInfo.event.remove();
//     }
//   };

//   const handleEvents = (events) => {
//     this.setState({
//       currentEvents: events,
//     });
//   };
// }

// function renderEventContent(eventInfo) {
//   return (
//     <>
//       <b>{eventInfo.timeText}</b>
//       <i>{eventInfo.event.title}</i>
//     </>
//   );
// }

// function renderSidebarEvent(event) {
//   return (
//     <li key={event.id}>
//       <b>
//         {formatDate(event.start, {
//           year: "numeric",
//           month: "short",
//           day: "numeric",
//         })}
//       </b>
//       <i>{event.title}</i>
//     </li>
//   );
// }

export default BookingCalendar;
