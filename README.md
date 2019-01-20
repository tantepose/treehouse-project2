## Treehouse Fullstack Javascript Techdegree,
## project #2: 
# "Pagination Filter V2 - with search"
by Ole Petter Baugerød Stokke

www.olepetterstokke.no/treehouse/project2

Quick note about the logic behind pagination & search:
- All items available to user has a match-class.
- The pagination handles all items with this class, and ignores the rest.
- All items get the class on startup, as in all items are "matched".
- Items that don't match search has this class removed.
This solves the problem of pagination within search.
