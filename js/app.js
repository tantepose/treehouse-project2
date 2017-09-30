/*Treehouse Fullstack Javascript Techdegree,
project #2: "Pagination Filter V2 - with search"
by Ole Petter Baugerød Stokke
www.olepetterstokke.no/treehouse/project2 */

/* Quick note about the logic behind pagination & search:
- All items available to user has a match-class.
- The pagination handles all items with this class, and ignores the rest.
- All items get the class on startup, as in all items are "matched".
- Items that don't match search has this class removed.
This solves the problem of pagination within search.
*/

//*** declare variables ***

const itemsPerPage = 10; //as decided by Treehouse
const allItems = $(".student-item"); //all items with or without match-class
let matchedItems; //all items with match class

//*** initiate page ***

matchAllItems ();                     //1. add match class to all, so all are available at startup
hideAllItems ();                      //2. hide all items
createPagination ();                  //3. creating the needed pagination for all items
createSearchForm ();                  //4. creating search
showItems (1, $(".page-button")[0]);  //5. simulating click on first pagination button

//*** event handlers ***

$(document).on('click', '.page-button', function () { //pagination-click, keeping event handler on new paginations
  showItems(parseInt($(this).text()), $(this)); //get page number from number on button, send button for styling
});

$("#search-button").on ("click", function () { //serach click
  searchItems();
});

$(".page-header h2").on ("click", function () { //header click, easy get-out-of-search hack
  location.reload();
});

//*** functions - pagination ***

function createPagination () { //create a new set of pagination buttons
  $(".pagination").remove(); //remove old pagination, if any

  matchedItems = $(".match"); //just handle matched items (all on startup)
  const pagesNeeded = Math.ceil (matchedItems.length / itemsPerPage);

  if (pagesNeeded > 1) { //only create if more than one page is needed, as instructed
    $(".page").append ("<div class='pagination'" + "<ul>"); //start new row
      for (let i = 0; i < pagesNeeded; i++) { //add all buttons needed
        $(".pagination").append ("<li><a class='page-button' href='#'>" + (i+1) + "</a></li>");
      }
    $(".pagination").append ("</div></ul>"); //end button row
  }
}

function showItems (page, button) { //show new pagination page
  hideAllItems();

  $(".page-button").removeClass("active"); //style all buttons inactive
  $(button).addClass("active"); //style current button active

  const whereToStart = (page * itemsPerPage) - itemsPerPage; //first item to show
  matchedItems = $(".match"); //only show items we want (for search)

  for (let i = 0; i < itemsPerPage; i++){ //end at itemsPerPage
    $(matchedItems[whereToStart + i]).show(); //start at whereToStart
  }
}

function matchAllItems () { //add the match class for all items
  $(allItems).each(function (i) {
    $(allItems[i]).addClass("match");
  });
}

function hideAllItems () { //hiding all items
  $(allItems).each(function (i) {
    $(allItems[i]).hide();
  });
}

//*** functions - search ***

function createSearchForm() { //creating search input and button
  $(".page-header").append (
    "<div class='student-search'>" +
    "<input placeholder='Search for students...'>" +
    "<button id='search-button'>Search</button></div");
}

function searchItems () { //clicks on the search button
  const searchTerm = $(".student-search input").val().toUpperCase();

  if (searchTerm != "") { //avoid search without any search term

    matchAllItems(); //start fresh with match class on all items

    //setting up variables needed in search loop
    let name;
    let email;
    let matches = 0;

      //search thru every name and email, one by one, case-insensitive
      for (i = 0; i < allItems.length; i++) {
          name = $(allItems[i]).find("h3").text().toUpperCase();
          email = $(allItems[i]).find(".email").text().toUpperCase();
          if (name.indexOf(searchTerm) > -1 || email.indexOf(searchTerm) > -1) {
              matches++; //leave match class on matches, just count them
          }
          else {
            $(allItems[i]).removeClass("match"); //remove on all that don't match
          }
        }

        //writing message for the match count, or no found match
        $(".matches-count").remove(); //remove old message, if any
        $(".student-list").append ("<h1 class = 'matches-count'></h1>");
          if (matches == 0) {
            $(".matches-count").text(
              "No matches. Click header to go back to list, or try another search.");
          }
          else {
            $(".matches-count").text(
              matches + " match(es).");
          }

      createPagination(); //create new pagination
      showItems(1, $(".page-button")[0]); //display the first page of pagination
  }
}
