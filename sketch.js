let TEST=[];

let buttons=[];

let colorPik;

let slider, sliderText;

let textOverlap;

var activatedOverlap = false;


function setup() {
  let title = createElement('h1', 'Titre');
  let names = createElement('h2', 'nos noms');
  let presentation = createElement('p', 'blabladela présentation cest koul');
  let interpretation = createElement('p', 'blabladela interpretation cest koul');
  
  createElement('test').html("<button type='submit'><a href='./sketch.js' download='NGOTTA_LAFAURIE_p5js.js'>accès au code source</a></button>");
  
  createCanvas(800, 800);
  background('#fefaef');
  
  //Initialisation du slider de quantité
  slider = createSlider(0, 400, 100, 5);
  slider.position(810, 15);
  slider.style('width', '80px');
  sliderText = createP();
  sliderText.style('color', '#fefaef');
  sliderText.position(900, 0);
  sliderText.html('quantité de formes');
  
  //Initialisation des boutons
    buttons[0] = createButton('sauvegarder');
    buttons[1] = createButton('nouvelle version');
    buttons[2] = createButton('changer de couleur');
  
    textOverlap = 'activer overlap';
    buttons[3] = createButton(textOverlap);
  
  for(let i=0; i<4; i++){
    buttons[i].position(810, 50+i*35);
  }
    buttons[0].mousePressed(saveCanva);
    buttons[1].mousePressed(newVersion);
    buttons[2].mousePressed(changeColorButton);
    buttons[3].mousePressed(versionWithOverlap);
  
  
  // Création de la première oeuvre
  newVersion();
}

function versionWithOverlap(){
  if(!activatedOverlap){
    textOverlap = 'désactiver overlap';
    buttons[3].html(textOverlap);
    activatedOverlap = true;
  } else {
    textOverlap = 'activer overlap';
    buttons[3].html(textOverlap);
    activatedOverlap = false;
  }
}

// Changement de la couleur des rectangles colorés
function changeColorButton(){
  let colorstopik=['rgba(154,205,50,0.5)', 'rgba(255, 105, 180,0.5)', 'rgba(135, 206, 250,0.5)', 'rgba(255, 0, 0,0.5)', 'rgba(148, 0, 211,0.5)','rgba(255, 165, 0, 0.5)'];
  
  colorPik=random(colorstopik);
  
background('#fefaef');
  // Changement de la couleur pour les rectangles non noirs et dessins de tous
  for(let i=0; i<slider.value(); i++){
    if(TEST[i]==undefined){
      TEST[i] = new shape_rectangle();
    }
      if(TEST[i].col != 'rgba(0,0,0,1)'){
        TEST[i].changeCol(colorPik);
        TEST[i].render();
      } else {
        TEST[i].blackRender();
      }
}
}

// Fonction d'export en png
function saveCanva(){
  saveCanvas('myCanvas', 'png');
}

// Fonction de génération d'une nouvelle oeuvre
function newVersion(){
  background('#fefaef');
  if(activatedOverlap){
    print('avec overlap');
    for(let i=0; i<slider.value(); i++){
	TEST[i] = new shape_rectangle();
    let count = 0;
      for(let j=0; j<i; j++){
        let o = overlap(TEST[j], TEST[i]);
        if(i!=j && !o){
          count+=1;
        }   
      }   
      if(count<=40){
        TEST[i].render();
      }
      //changement en noir si >40 couches 
    else {
        TEST[i].changeCol('rgba(0,0,0,1)');
        TEST[i].blackRender();
    } 
    }
  } else {
    print('sans overlap');
  
  let littleCount = slider.value()/4;
  for(let i=0; i<littleCount*3; i++){
	TEST[i] = new shape_rectangle();  
    TEST[i].render();
  }
  for(let j=0; j<littleCount; j++){
    TEST[j] = new shape_rectangle();
    TEST[j].changeCol('rgba(0,0,0,1)');
    TEST[j].blackRender();
  }
  }
}

// Classe pour le tracé des rectangles
class shape_rectangle{
  
	constructor(){
        //coordonnées de position X et Y
        this.x = random(0, width);
        this.y = random(0, height);
        
        // coordonnées de longueur et hauteur
		this.width=50;
		this.height=50;
      
        // limites de contraintes
        let topLimit=height/10;
        let bottomLimit=(height*9/10-this.height);
        let leftLimit=width/10;
        let rightLimit=(width*9/10-this.width);
      
       //contrainte bordures gauche/droite : 
        this.x=constrain(this.x,leftLimit,rightLimit );

      //contraintes bordures horizontales : 
        this.y= constrain(this.y, topLimit, bottomLimit);
      
      // Couleur
        this.col='rgba(255, 165, 0, 0.5)';
	}
	
	render(){
         stroke(this.col);
      	strokeCap(SQUARE); // avoir des bords carrés et pas arrondis

		// debut de la creation du rectangle
		beginShape(LINES);
		// 2 lignes horizontales
		strokeWeight(6);
        vertex(this.x,this.y); //position angle sup gauche
		vertex(this.x+this.width,this.y); //position angle sup droit
		vertex(this.x+this.width,this.y+this.height); //position angle inf gauche
		vertex(this.x,this.y+this.height); //position angle inf droit
  		endShape(CLOSE);

		// 2 lignes verticales
		beginShape(LINES);
		strokeWeight(2);
		vertex(this.x,this.y); //position angle sup gauche
		vertex(this.x,this.y+this.height); //position angle sup droit
		vertex(this.x+this.width,this.y+this.height); //position angle inf gauche
		vertex(this.x+this.width,this.y); //position angle inf droit
		endShape(CLOSE);
	}
  
  //render noir 
  blackRender(){
         stroke(this.col);
      	strokeCap(SQUARE); // avoir des bords carrés et pas arrondis

        // debut de la creation du rectangle
        beginShape(LINES);
        // 2 lignes horizontales
        strokeWeight(2);
        vertex(this.x,this.y); //position angle sup gauche
        vertex(this.x+this.height,this.y); //position angle sup droit
        vertex(this.x,this.y+this.width); //position angle inf gauche
        vertex(this.x+this.height,this.y+this.width); //position angle inf droit
          endShape(CLOSE);

        // 2 lignes verticales
        beginShape(LINES);
        strokeWeight(6);
        vertex(this.x,this.y); //position angle sup gauche
        vertex(this.x,this.y+this.width); //position angle inf gauche
        vertex(this.x+this.height,this.y); //position angle sup droit
        vertex(this.x+this.height,this.y+this.width); //position angle inf droit
        endShape(CLOSE);
	}  
  
  /// Color Render 
    changeCol(newColor){
      this.col= newColor;
    }
  
}

// Fonction afin de voir si un rectangle est sur un autre
function overlap(rect2, rect1) {  
    //variables nouveau rectangle
    let supLeftAngleNew=rect1.x;
    let supRightAngleNew=rect1.x+rect1.width;
    let infLeftAngleNew=rect1.x+rect1.height;
    let infRightAngleNew=rect1.x+rect1.width+rect1.height;

  let supLeftAngleOld, supRightAngleOld, infLeftAngleOld, infRightAngleOld;

    //variables ancien rectangle
  if(rect2.col != 'rgba(0,0,0,1)'){
    supLeftAngleOld=rect2.x;
    supRightAngleOld=rect2.x+rect2.width;
    infLeftAngleOld=rect2.x+rect2.height;
    infRightAngleOld=rect2.x+rect2.width+rect2.height;
  } else {
    print('black comparing');
    //à vérifier si ça marche
    supLeftAngleOld=rect2.x
    supRightAngleOld=rect2.x+rect2.height;
    infLeftAngleOld=rect2.x+rect2.width;
    infRightAngleOld=rect2.x+rect2.width+rect2.height;
  }

    return ((supLeftAngleNew > supRightAngleOld || supRightAngleNew < supLeftAngleOld) || (infLeftAngleNew < supLeftAngleOld || supRightAngleNew > infRightAngleOld));
}