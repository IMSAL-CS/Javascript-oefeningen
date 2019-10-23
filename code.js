

function create_puzzle(grootte){
  let lijst_lengte = grootte * grootte ;
  lijst = [];
  for (let i = 0; i < lijst_lengte; i++){ // lijst met alle getallen die in de puzzel moeten zitten (alle getallen van 0 tot grootte-1 dus)
    lijst.push(i); // zet i op de lijst
  }

  random_puzzle = [];
  for(let i = 0; i < grootte; i++){
    let rij = [] ;
    for(let j = 0; j < grootte; j++){
        // genereer een random index van de lijst
        random_lijst_index = Math.floor(Math.random() * lijst.length)
        // zet het getal dat op die willekeurige index ligt in de rij
        rij.push(lijst[random_lijst_index]);
        // verwijder het getal uit de lijst zodat geen getal meerdere keren voorkomt
        lijst.splice(random_lijst_index,1);
    }
    random_puzzle.push(rij);
  }
  return random_puzzle;
}

//Interne voorstelling van de puzzel als een tweedimensionale lijst
// oude versie:
// let my_puzzle = [[0, 1, 2],
//                 [7, 4, 8],
//                 [3, 5, 6]];

// nieuwe versie:
let grootte = window.prompt("Grootte?")
let my_puzzle = create_puzzle(grootte);


//Wanneer de volledige HTML-pagina geladen is wordt onderstaande functie uitgevoerd
window.onload = function(){
   draw_puzzle(my_puzzle);
}

//Deze functie neemt als invoer de lijstrepresentatie van onze puzzel
//
function draw_puzzle(puzzle){
   let puzzle_html = generate_puzzle_html(puzzle);
   document.getElementById("puzzle_container").innerHTML = puzzle_html;
}

function generate_puzzle_html(puzzle){
   let puzzle_inner_html = "";
   for(let i = 0; i < puzzle.length; i++){

       let row_html = "<tr>" ;
       for(let j = 0; j < puzzle[i].length; j++){
           if(puzzle[i][j] == 0){
               row_html += "<td class=\"emptyTile\"></td>";
           }else{
               row_html += "<td onclick=\"square_click_handler(this)\">"+puzzle[i][j]+"</td>";    // HIER WORDT ALLES CLICKABLE GEMAAKT
           }
       }
       row_html += "</tr>";
       puzzle_inner_html += row_html;
   }

   return `<table>${puzzle_inner_html}</table>`;
}

// ////////////////////////////////////////////////////////
// DEEL 3:

function check_game_complete(puzzle){

  // oplossing genereren
 let oplossing = [] ;
 for(let i = 0; i < puzzle.length; i++){
   let rij = [] ;
   for(let j = 1; j < puzzle.length+1 ; j++){
     if ((i==puzzle.length-1) && (j == puzzle.length)){
       rij.push(0);
     }
     else{
       rij.push(j+i*3);
     }
   }
   oplossing.push(rij);
 }
 // let oplossing = [[1, 2, 3], [4, 5, 6], [7, 8, 0]] ;

  // puzzel vergelijken met de oplossing
   for(let i = 0; i < puzzle.length; i++){
     for(let j = 0; j < puzzle.length ; j++){
       if (puzzle[i][j] != oplossing[i][j]){
         return false
       }
     }
   }
   return true
}


function swap_empty_square(puzzle, row, col){
 // zoek 0 aka leeg vakje
 for(let i = 0; i< puzzle.length; i++){
   for(let j = 0; j< puzzle.length ; j++){
     if (puzzle[i][j] == 0){
       let row_nul = i ;
       let col_nul = j ;
       // zien of het vakje wel raakt aan het leeg vakje
       if (is_naast(row, col, row_nul, col_nul)){
       puzzle[row_nul][col_nul] = puzzle[row][col] ;
       puzzle[row][col] = 0 ;
       }
     }
   }
 }
 draw_puzzle(puzzle);

}

function is_naast(row_click,col_click, row_nul, col_nul){
   if ( (row_click != row_nul) && (col_click != col_nul) ) { // && ipv and
     return false ;
   }
   if (row_click == row_nul){
     if ((col_click == col_nul-1) || (col_click == col_nul+1)){
       return true ;
     }
   }
   if (col_click == col_nul){
     if ((row_click == row_nul-1) || (row_click == row_nul+1)){
       return true ;
     }
   }
   return false ;
}

function square_click_handler(cell){
   let col = cell.cellIndex;
   let row = cell.parentNode.rowIndex;
   swap_empty_square(my_puzzle, row, col) ;
   if (check_game_complete(my_puzzle)){
     alert("Proficiat!");
   }

}
