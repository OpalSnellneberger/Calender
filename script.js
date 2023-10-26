const pageContainerElement = $('#outer-container');
for (var h = 0; h < 24; h++) {
  var hourDiv = $('<div>');
  var labelDiv = $('<div>');
  var textInput = $('<textarea>');
  var saveButton = $('<button>');
  var saveIcon = $('<i>');
  
  hourDiv.attr('id',`hour-${h}`)
  hourDiv.addClass('row time-block')
  labelDiv.addClass('col-2 col-md-1 hour text-center py-3')
  labelDiv.text((h+11)%12+1 + (h>12?'PM':'AM'));
  textInput.addClass('col-8 col-md-10 description');
  hourDiv.attr('rows','3');
  saveButton.addClass('btn saveBtn col-2 col-md-1');
  hourDiv.attr('aria-label','save');
  saveIcon.addClass('fas fa-save')
  hourDiv.attr('aria-hidden','true');

  saveButton.append(saveIcon);
  hourDiv.append(labelDiv);
  hourDiv.append(textInput);
  hourDiv.append(saveButton);
  pageContainerElement.append(hourDiv);
}

// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(function () {
  // Adds a listener for click events on the save button. This code
  // uses the id in the containing time-block as a key to save the user input in
  // local storage.
  var saveButtonElements = $('.saveBtn');
  saveButtonElements.click(function() {
    const hourID = $(this).parent().attr('id');
    const newEvent = $(this).prev().val();
    localStorage.setItem(hourID, newEvent);
  })

  // This code to applies the past, present, or future class to each time
  // block by comparing the id to the current hour.
  var curentHour = parseInt(dayjs().format('H'));
  var timeBlockElements = $('.time-block');
  for (var i of timeBlockElements) {
    var blockHour = parseInt(i.id.slice(5));
    if (blockHour < curentHour) {
      $(i).addClass('past');
    } else if (blockHour == curentHour) {
      $(i).addClass('present');
    } else {
      $(i).addClass('future');
    }
  }


  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements.
  for (var i of timeBlockElements) {
    $(i).children()[1].value = localStorage.getItem(i.id);
  }
    

  // This code to displays the current date in the header of the page.
  var currentDayElement = $('#currentDay')
  var weekdayName = dayjs().format('dddd');
  var monthName = dayjs().format('MMMM');
  var year = dayjs().format('YYYY');
  var day = ordinalSuffixOf(parseInt(dayjs().format('d')));
  var formatedDay = `${weekdayName}, ${monthName} ${day}, ${year}`;
  currentDayElement.text(formatedDay);
});

function ordinalSuffixOf(i) {
  var j = i % 10,
      k = i % 100;
  if (j == 1 && k != 11) {
      return i + "st";
  }
  if (j == 2 && k != 12) {
      return i + "nd";
  }
  if (j == 3 && k != 13) {
      return i + "rd";
  }
  return i + "th";
}