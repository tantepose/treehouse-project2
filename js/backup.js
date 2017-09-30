//*** functions - search ***

function searchItems () {
  $(".matches-count").hide(); //avoid getting multiple messages per search

  //setting up variables, some given values in search loop
  const searchTerm = $(".student-search input").val().toUpperCase();
  let name;
  let email;
  let matches = 0;

  if (searchTerm != "") { //avoid search without any search term
    //$(".pagination").hide(); //no pagination in search

    //search thru every name and email, one by one, case-insensitive
    for (i = 0; i < items.length; i++) {
        name = $(items[i]).find("h3").text().toUpperCase();
        email = $(items[i]).find(".email").text().toUpperCase();
        if (name.indexOf(searchTerm) > -1 || email.indexOf(searchTerm) > -1) {
            $(items[i]).show(); //show item if either name or email found within
            matches++;
        } else {
            $(items[i]).hide(); //hide if not
        }
      }

      //writing message for the match count, or no found match
      $(".student-list").append ("<h1 class = 'matches-count'></h1>");
        if (matches == 0) {
          $(".matches-count").text(
            "No matches. Click header to go back to list, or try another search.");
        }
        else {
          $(".matches-count").text(
            matches + " match(es).");
        }
      }
}

//*** functions - pagination ***

function hideAllItems () {
  $(items).each(function (i) {
    $(items[i]).hide();
  });
}

function showItems (button) {
  hideAllItems();

  const page = parseInt($(button).text()); //page to show, from button text
  const whereToStart = (page * itemsPerPage) - itemsPerPage; //first item to show

  $(".page-button").removeClass("active"); //style all buttons inactive
  $(button).addClass("active"); //style current button active

  for (let i = 0; i < itemsPerPage; i++){ //end at itemsPerPage
    $(items[whereToStart + i]).show(); //start at whereToStart
  }
}

//*** declare constant variables ***

const itemsPerPage = 10;
const items = $(".student-item");
let pagesNeeded = Math.ceil (items.length / itemsPerPage);
console.log(items.length);

//*** initiate page ***

hideAllItems ();
createPagination ();
createSearchForm ();
showItems ($(".page-button")[0]); //simulating click at button #1 for correct start
