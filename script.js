var canvas = document.getElementById("monCanvas");
var contxt = canvas.getContext("2d");
var image = new Image();
var grille = [];
canvas.addEventListener('mousedown',jouer, false);

var audiobouger = new Audio('./audio/slide.mp3');
var audiofini = new Audio('./audio/gagner.mp3');

document.body.style.zoom=0.9;this.blur();





function start(){
    for(var i =0; i<9 ; i++){
        grille[i] = definir(i);
       
    }
	melanger();
	refresh();
	console.log(grille);
	
}

 function definir(positiontab){   //tuile[0] = image , [1] xmin [2] xmax [3] ymin [4] ymax
        var tuile =[] ;
        var img = positiontab + 1;
        tuile[0] = img; // chaque position correspond a une image differente

        switch(positiontab){ // chaque case a une zone de 200px sur les x et sur les y comme ca quand on sort la valeur du click on peux deduire quelle case est selectionner

        case 0 : tuile[1]= 0; tuile[2]= 200;  break;
        case 1 : tuile[1]= 200; tuile[2]= 400; break;
        case 2 : tuile[1]= 400; tuile[2]= 600; break;
        case 3 :  tuile[1]= 0; tuile[2]= 200;  break;
        case 4 : tuile[1]= 200; tuile[2]= 400; break;
        case 5 : tuile[1]= 400; tuile[2]= 600; break;
        case 6 :  tuile[1]= 0; tuile[2]= 200;  break;
        case 7 : tuile[1]= 200; tuile[2]= 400; break;
        case 8 : tuile[1]= 400; tuile[2]= 600; break;

            }
        switch(positiontab){

        case 0 : tuile[3]= 0; tuile[4]= 200;  break;
        case 1 : tuile[3]= 0; tuile[4]= 200;  break;
        case 2 : tuile[3]= 0; tuile[4]= 200;  break;
        case 3 : tuile[3]= 200; tuile[4]= 400; break;
        case 4 : tuile[3]= 200; tuile[4]= 400; break;
        case 5 : tuile[3]= 200; tuile[4]= 400; break;
        case 6 : tuile[3]= 400; tuile[4]= 600; break;
        case 7 : tuile[3]= 400; tuile[4]= 600; break;
        case 8 : tuile[3]= 400; tuile[4]= 600; break;

            }

       return tuile;
    }

function refresh(){
	
    contxt.clearRect(0,0,canvas.width, canvas.height);
	for(var i =0; i<9 ; i++){
       afficher(grille[i]);
	   
    }
}
function afficher(tuileEx){

    image = document.getElementById(tuileEx[0]);
	
	contxt.drawImage(image,tuileEx[1], tuileEx[3]);
   
    }
 function melanger(){   // METHODE: prend les images de chacune des cases et les change de place                                                                     aleatoirement
    

    while(isSolvable(grille)){
        for(var i = 0 ; i< 100 ; i++ ){

                     var rand1 = Math.floor(Math.random() * Math.floor(9));
                     var rand2 = Math.floor(Math.random() * Math.floor(9));  

                    changerplace(grille[rand1],grille[rand2]);

                    //console.log(rand1);
                    //console.log(rand2);

                }


            }
      
}
 function isSolvable(pList){
      
        var echange= 0;

        for(var i=0;i<pList.length;i++){
            for(var j=i+1;j<pList.length;j++){
                if(pList[j][0]>pList[i][0]){
                    echange++;
                }
            }
        }

        if(echange%2 == 1){
            
            return false;
        }else{
            
            return true;
        }
    }
function  changerplace(tuile1,tuile2){
	// METHODE: echange deux valeurs d images de place
            
            var temp = tuile1[0]; // sauvegarde temporaire de la valeur 1

            tuile1[0] = tuile2[0]; // on change la valeur de la case1 par celle de la case2
            tuile2[0] = temp; // on change la valeur de la case2 avec celle sauvegarder precedemment
			//console.log(temp + "temp");
			//console.log(tuile1[0] + "1");
			//console.log(tuile2[0] + "2");
        }

function  jouer(e){                      //METHODE: a chaque fois qu on clicke elle associe la case qui correspond                                                                    aux coordonnees du click et verifie si le centre de cette case est a 1                                                                           case de distance du millieu de la case vide ( case que l image est                                                                              "9.jpg"). Elle regarde la distance x ou la distance y elle ne ragarde                                                                             donc que a l horizontale ou la vertical et donc, pas les diagonales.
  
         var rect = canvas.getBoundingClientRect();
         var xclick = (e.clientX - rect.left);
         var yclick = (e.clientY - rect.top);
 
         var caseclick = associercase(xclick,yclick);
		 
         var milieuX = (caseclick[2] - 100);
         var milieuY = (caseclick[4] - 100);
		 
         var caseVide;
            
            for(var i = 0; i< grille.length;i++){
                if(grille[i][0] == 9){
                    caseVide = grille[i];
                }
            }
			
        var milieuVideX = (caseVide[2] - 100);  
        var milieuVideY = (caseVide[4] - 100);  
            //alert(milieuX + " " + milieuY + " normal");
            //alert(milieuVideX + " " + milieuVideY + "vide");
            if((Math.abs(milieuX - milieuVideX ) == 200 && Math.abs(milieuY - milieuVideY ) == 0) || (Math.abs(milieuX - milieuVideX ) == 0 && Math.abs(milieuY - milieuVideY ) == 200)  ){
                changerplace(caseclick,caseVide);
				refresh();
                audiobouger.play();
                if(gagner() == true){
                    refresh();
                    audiofini.play();
                    alert("vous avez gagner!!!");
                    refresh();
					document.getElementById("monCanvas").removeEventListener("mousemove", jouer);
                }
            }else{
             //   alert('clicker sur une autre case');
            }
    
        }
		
function associercase(x,y){

            for(var i =0; i< grille.length; i++){
			
                if(x > grille[i][1] && x < grille[i][2] && y > grille[i][3] && y < grille[i][4]){
					
                    return grille[i];
                }
            }
           
          
        }
		
function  gagner(){                                           //METHODE: verifie si on gagne
                                                                    // la methode compte le nombre de fois que l image est au bon endroit (selon le nom) exemple: dans la case 0 (position 0 de la grille) il doit on devrait trouver l image "1.jpg"
                                                                    // elle return true ou false
            var point = 0;

            
            for(var i =0; i< grille.length; i++){
                if(grille[i][0] == i+1){
                    point++;
                }
            }
			//alert(point);
            if(point == 9){
                return true;
            }else{
                return false;
            }
        }
		
