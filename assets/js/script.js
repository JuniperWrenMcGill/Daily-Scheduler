$(document).ready(function() {
  // Function to display current day at the top of the calendar
  function displayCurrentDay() {
      var currentDate = dayjs().format("dddd, MMMM D");
      $("#currentDay").text(currentDate);
  }

  // Function to color-code time blocks based on past, present, or future
  function colorCodeTimeBlocks() {
      var currentHour = dayjs().hour();

      $(".time-block").each(function() {
          var blockHour = parseInt($(this).attr("id").split("-")[1]);

          if (blockHour < currentHour) {
              $(this).addClass("past");
          } else if (blockHour === currentHour) {
              $(this).removeClass("past");
              $(this).addClass("present");
          } else {
              $(this).removeClass("past");
              $(this).removeClass("present");
              $(this).addClass("future");
          }
      });
  }

  // Function to load events from local storage
  function loadEvents() {
      $(".time-block").each(function() {
          var eventId = $(this).attr("id");
          var eventText = localStorage.getItem(eventId);

          if (eventText !== null) {
              $(this).children(".description").val(eventText);
          }
      });
  }

  // Function to save events to local storage
  $(".saveBtn").on("click", function() {
      var eventId = $(this).parent().attr("id");
      var eventText = $(this).siblings(".description").val();

      localStorage.setItem(eventId, eventText);
  });

  // Call functions to display current day, color-code time blocks, and load events
  displayCurrentDay();
  colorCodeTimeBlocks();
  loadEvents();
});