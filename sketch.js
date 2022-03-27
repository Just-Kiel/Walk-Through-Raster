let shape=[];

let buttons=[];

let colorPik;
let currentColor = 'rgba(255, 165, 0, 0.5)';

let slider, sliderText, sliderValue;

let textOverlap;

var activatedOverlap = false;

// Fonctions de stylisation des boutons
function buttonOver(target, c, b) {
  target.style('background-color',b);
  target.style('color',c);
}

function setup() {
  
  //////////HTML/////////////
  
  
  let title = createElement('h1', 'Walk Through Raster');
  title.style('color', '#FFA500');
  let subtitle=createElement('h2', 'by Frieder Nake');
  
  let presentation = createElement('p', '<strong>Made in :</strong> 1967 <br> <strong>Dimensions :</strong> 25.75 inches per 25.75 inches (65,4 m x 65,4cm)(with the frame) <br> 50,8 x 50,8 cm (without frame) <br><strong>Machine used :</strong> ZUSE Graphomat Z64 draw the image <br><strong>Computer used :</strong> Telefunken TR4 <br><strong>Software :</strong> Walk-through-Raster <br><strong> Programming language : </strong>ALGOL 60');
  
  let ourInterpretation = createElement('h3', "Our interpretation :");
  ourInterpretation.style('color', '#FFA500');
  
  let interpretation = createElement('p', 'To extend this work, we decided to do an interactive version. Several buttons can change the algorithm and a presentation of the work makes the whole more user friendly. Changes of colors, quantities and regeneration can be found. Buttons were also designed to try different logics of understanding the artwork. We also added a button to download our P5.js code or the canvas in a PNG.');
  
  let names=createElement('h5',"Aurore Lafaurie & Sarah N'GOTTA");
  names.style('color','#242424');
  
  let firstStep=createElement('p',"First of all, please select all the artwork's settings you want.");
  firstStep.style('color','#242424');
  firstStep.position(810, 0);
  
  
  let lastStep=createElement('p',"If you want to regenarate a new artwork with the current parameters, please click on the following button.");
  lastStep.style('color','#242424');
  lastStep.position(810, 20+3*80);

  
    let finalStep=createElement('p',"Congratulations ! You can save the artwork and the source code ! <br><br>If you want to learn more about this artwork, scroll down !");
  finalStep.style('color','#242424');
  finalStep.position(810, 50+5.5*80);

  
  
  createCanvas(800, 800);
  background('#fefaef');
  
  //Initialisation du slider de quantité
  slider = createSlider(0, 400, 100, 5);
  slider.position(810, 60);
  slider.style('width', '80px');
  sliderText = createP();
  sliderText.style('color', '#242424');
  sliderText.position(900, 45);
  sliderText.html('squares quantity');
  sliderValue = slider.value();
  
  let fontmontserrat = [presentation, interpretation, firstStep, lastStep, finalStep];
  
  let fontbebas = [title, subtitle, ourInterpretation, names];
  
  for(let i=0; i<5; i++){
    fontmontserrat[i].style('font-family', 'Montserrat');
  }
  
  for(let i=0; i<4; i++){
    fontbebas[i].style('font-family', 'Bebas Neue');
  }
  
  //Initialisation des boutons
  buttons[3] = createButton('save artwork');
  buttons[3].mouseOver(function() {
    buttonOver(this, "#000000", "#9ACD32");
  });

  buttons[2] = createButton('regenerate artwork');
  buttons[2].mouseOver(function() {
    buttonOver(this, "#FFFFFF", "#242424");
  });
  
  buttons[0] = createButton('change color');
  buttons[0].mouseOver(function() {
    buttonOver(this, "#000000", "#87CEEB");
  });
  
  textOverlap = 'turn on overlap function';
  buttons[1] = createButton(textOverlap);
  buttons[1].mouseOver(function() {
    buttonOver(this, "#000000", "#FFA500");
  });
  
  
  buttons[4]=createElement('button').html("<a style='text-decoration:none;color:#ffffff' href='./sketch.js' download='NGOTTA_LAFAURIE_p5js.js'>download source code</a>");
  buttons[4].mouseOver(function() {
    buttonOver(this, "#000000", "#8A2BE2");
  });
  
  
  
  for(let i=0; i<5; i++){
    buttons[i].style('text-decoration', 'none');
    buttons[i].style('height','50px');
    buttons[i].style('border-radius','15px');
    buttons[i].style('color','#ffffff'); 
    buttons[i].style('border','none');
    buttons[i].style('background-color','#242424');
    buttons[i].position(810,100+i*110); 
    buttons[i].style('font-family', 'Montserrat');
    buttons[i].mouseOut(function() {
    buttonOver(this, "#FFFFFF", "#242424");
    });
  }
    buttons[3].mousePressed(saveCanva);
    buttons[2].mousePressed(newVersion);
  
    buttons[2].mouseOut(function() {
    buttonOver(this, "#000000", "#FF69B4");
    });
    buttons[2].style('color',"#000000"); 
    buttons[2].style('background-color',"#FF69B4");
  
    buttons[4].position(950, 100+3*110);
    buttons[0].mousePressed(changeColorButton);
    buttons[1].mousePressed(versionWithOverlap);
  
  
  // Création de la première oeuvre
  newVersion();
}

function draw(){
  if(slider.value()!=sliderValue){
    newVersion();
    sliderValue = slider.value();
  }
}


function versionWithOverlap(){
  if(!activatedOverlap){
    textOverlap = 'turn off overlap function';
    buttons[1].html(textOverlap);
    activatedOverlap = true;
    newVersion();
  } else {
    textOverlap = 'turn on overlap function';
    buttons[1].html(textOverlap);
    activatedOverlap = false;
    newVersion();
  }
}

// Changement de la couleur des rectangles colorés
function changeColorButton(){
  let colorstopik=['rgba(154,205,50,0.5)', 'rgba(255, 105, 180,0.5)', 'rgba(135, 206, 250,0.5)', 'rgba(255, 0, 0,0.5)', 'rgba(148, 0, 211,0.5)','rgba(255, 165, 0, 0.5)'];
  
  colorPik=random(colorstopik);
  while(currentColor == colorPik){
    colorPik=random(colorstopik);
  }
  currentColor = colorPik;
  
background('#fefaef');
  // Changement de la couleur pour les rectangles non noirs et dessins de tous
  for(let i=0; i<slider.value(); i++){
    if(shape[i]==undefined){
      shape[i] = new shape_rectangle();
    }
      if(shape[i].col != 'rgba(0,0,0,1)'){
        shape[i].changeCol(colorPik);
        shape[i].render();
      } else {
        shape[i].blackRender();
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
	shape[i] = new shape_rectangle();
    let count = 0;
      for(let j=0; j<i; j++){
        let o = overlap(shape[j], shape[i]);
        if(i!=j && !o){
          count+=1;
        }   
      }   
      if(count<=40){
        shape[i].changeCol(currentColor);
        shape[i].render();
      }
      //changement en noir si >40 couches 
    else {
        shape[i].changeCol('rgba(0,0,0,1)');
        shape[i].blackRender();
    } 
    }
  } else {
    print('sans overlap');
  
  let littleCount = slider.value()/4;
  for(let i=0; i<littleCount*3; i++){
	shape[i] = new shape_rectangle(); 
    shape[i].changeCol(currentColor);
    shape[i].render();
  }
  for(let j=0; j<littleCount; j++){
    shape[j] = new shape_rectangle();
    shape[j].changeCol('rgba(0,0,0,1)');
    shape[j].blackRender();
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
    supLeftAngleOld=rect2.x
    supRightAngleOld=rect2.x+rect2.height;
    infLeftAngleOld=rect2.x+rect2.width;
    infRightAngleOld=rect2.x+rect2.width+rect2.height;
  }

    return ((supLeftAngleNew > supRightAngleOld || supRightAngleNew < supLeftAngleOld) || (infLeftAngleNew < supLeftAngleOld || supRightAngleNew > infRightAngleOld));
}