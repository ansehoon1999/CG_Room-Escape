var camera, // We need a camera.
    scene, // The camera has to see something.
    renderer, // Render our graphics.
    controls, // Our Orbit Controller for camera magic.
    container, // Our HTML container for the program.
    rotationPoint;  // The point in which our camera will rotate around.

var characterSize = 10;
var outlineSize = characterSize * 0.05;

// Track all objects and collisions.
var objects = [];
var collisions = [];

// Set mouse and raycaster.
var raycaster = new THREE.Raycaster();
var mouse = new THREE.Vector2();

// Store movements.
var movements = [];
var playerSpeed = 5;

// Watch for double clicks.
var clickTimer = null;

// The movement destination indicator.
var indicatorTop;
var indicatorBottom;

/**
 * Run initial setup function and loop through rendering.
 */


init();
animate();

/**
 * Initializer function.
 */
function init() {
  // Build the container
  container = document.createElement( 'div' );
  document.body.appendChild( container );

  // Create the scene.
  scene = new THREE.Scene();

  var mtlLoader = new THREE.MTLLoader();
  mtlLoader.load("models/Tent_Poles_01.mtl", function(materials){
    materials.preload();

    var objLoader = new THREE.OBJLoader();
    objLoader.setMaterials(materials);

    objLoader.load("models/Tent_Poles_01.obj", function(mesh1){

      scene.add(mesh1);
      mesh1.position.set(500, 0, 4);

    });
  });
  // Ambient lights.
  var ambient = new THREE.AmbientLight( 0xffffff );
  scene.add( ambient );

  // Add hemisphere lighting.
  var hemisphereLight = new THREE.HemisphereLight( 0xdddddd, 0x000000, 0.5 );
  scene.add( hemisphereLight );

  // Create a rotation point.
  rotationPoint = new THREE.Object3D();
  rotationPoint.position.set( 0, 0, 0 );
  scene.add( rotationPoint );




  createCharacter();  // 중심에 있는 상자
  createFloor(); // 바닥 만들기


//============================================================================================================
// spaceship outline 우주선 외
  createSide2(0, 3500, 5000, 200, 0);
  createSide2(0, -3500, 5000, 200, 0);

  createSide2(2500 + 250 * (Math.pow(3,1/2)), -3250, 1000, 200, -Math.PI/6);
  createSide2(3000 + 500 * (Math.pow(3,1/2)) , -3000 + 500* (Math.pow(3,1/2)) , 2000, 200, -Math.PI/3);
  createSide2(4000 + 500 * (Math.pow(3,1/2)) , -3000 + 1000* (Math.pow(3,1/2)) , 1000, 200, 0);

  createSide2(4000 + 500 * (Math.pow(3,1/2)) , 3000 - 1000* (Math.pow(3,1/2)) , 1000, 200, 0);
  createSide2(2500 + 250 * (Math.pow(3,1/2)), 3250, 1000, 200, Math.PI/6);
  createSide2(3000 + 500 * (Math.pow(3,1/2)) , 3000 - 500* (Math.pow(3,1/2)) , 2000, 200,Math.PI/3);

  createSide2(-2500 - 250 * (Math.pow(3,1/2)), -3250, 1000, 200, Math.PI/6);
  createSide2(-3000 - 500 * (Math.pow(3,1/2)) , -3000 + 500* (Math.pow(3,1/2)) , 2000, 200, Math.PI/3);
  createSide2(-4000 - 500 * (Math.pow(3,1/2)) , -3000 + 1000* (Math.pow(3,1/2)) , 1000, 200, 0);

  createSide2(-2500 - 250 * (Math.pow(3,1/2)), 3250, 1000, 200, -Math.PI/6);
  createSide2(-3000 - 500 * (Math.pow(3,1/2)) , 3000 - 500* (Math.pow(3,1/2)) , 2000, 200, -Math.PI/3);
  createSide2(-4000 - 500 * (Math.pow(3,1/2)) , 3000 - 1000* (Math.pow(3,1/2)) , 1000, 200, 0);
//============================================================================================================
// 우주선 꼬다리
  createSide1(-4500 - 500 * (Math.pow(3,1/2)), 0, 6000 - 2000 * (Math.pow(3,1/2)));
  createSide1(4500 + 500 * (Math.pow(3,1/2)), 0, 6000 - 2000 * (Math.pow(3,1/2)));

//============================================================================================================


// restaurant  #1
// ==========================================================================================================
  var startX1 = -100;
  var startY1 = -400;
  createSide2(startX1 + 200, startY1 + 0, 400, 200, 0);  //1-1-1
  createSide2(startX1 + 900, startY1 + 0, 600, 200, 0);  //1-1-2
  createdoor(startX1 + 500, startY1 + 0, 200, 200, 0);  //1-1
  //wall
  //=======================================================
  createwall(startX1 + 400, startY1 + 500, 1000, 200, Math.PI/2);
  createwall(startX1 + 600, startY1 + 300, 600, 200, Math.PI/2);
  createwall(startX1 + 600, startY1 + 900, 200, 200, Math.PI/2);
  createwall(startX1 + 900, startY1 + 600, 600, 200, 0);
  createwall(startX1 + 900, startY1 + 800, 600, 200, 0);

  //=======================================================


  createSide2(startX1 +1200 + 300 * (Math.pow(2,1/2)), -300 * (Math.pow(2,1/2))+ startY1, 1200, 200, Math.PI/4); //1-2
  createSide2(startX1 +1200 + 600 * (Math.pow(2,1/2)), -600 * (Math.pow(2,1/2))-250+ startY1, 500, 200, Math.PI/2); //1-3-1
  createSide2(startX1 +1200 + 600 * (Math.pow(2,1/2)), -600 * (Math.pow(2,1/2))-950+ startY1, 500, 200, Math.PI/2); //1-3-2
  createdoor(startX1 +1200 + 600 * (Math.pow(2,1/2)), -600 * (Math.pow(2,1/2))-600+ startY1, 200, 200, Math.PI/2); //1-3-2


  createSide2(startX1 +1200 + 300 * (Math.pow(2,1/2)), -900 * (Math.pow(2,1/2))-1200+ startY1, 1200, 200, -Math.PI/4); //1-4
  createSide2(startX1 +600, -1200 * (Math.pow(2,1/2))-1200+ startY1, 1200, 200, 0); //1-5
  createSide2( -300 * (Math.pow(2,1/2)) +startX1, -900 * (Math.pow(2,1/2))-1200+ startY1, 1200, 200, Math.PI/4); //1-6
  createSide2( -600 * (Math.pow(2,1/2)) +startX1, -600 * (Math.pow(2,1/2))-250+ startY1, 500, 200, Math.PI/2); //1-7-1
  createSide2( -600 * (Math.pow(2,1/2)) +startX1, -600 * (Math.pow(2,1/2))-950+ startY1, 500, 200, Math.PI/2); //1-7-2
  createdoor(startX1  - 600 * (Math.pow(2,1/2)), -600 * (Math.pow(2,1/2))-600+ startY1, 200, 200, Math.PI/2);
  createwall( -600 * (Math.pow(2,1/2)) -800, -600 * (Math.pow(2,1/2))-700+ startY1, 1400, 200, 0);
  createwall( -300 * (Math.pow(2,1/2)) -1650, -600 * (Math.pow(2,1/2))-500+ startY1, -300 + 600 * (Math.pow(2,1/2)), 200, 0);
  createwall( -300 * (Math.pow(2,1/2)) -850, -600 * (Math.pow(2,1/2))-500+ startY1, 1500 - 600 * (Math.pow(2,1/2)), 200, 0);
  createwall( -1800, -300 * (Math.pow(2,1/2))-1050, -300 + 600 * (Math.pow(2,1/2)), 200, Math.PI/2);
  createwall( -1600, -300 * (Math.pow(2,1/2))-1050, -300 + 600 * (Math.pow(2,1/2)), 200, Math.PI/2);

  createSide2( -300 * (Math.pow(2,1/2)) +startX1 , -300 * (Math.pow(2,1/2))+ startY1, 1200, 200, -Math.PI/4); //1-8

// ==========================================================================================================
// restaurant right  #2

createSide2(startX1 +1800 +600 * (Math.pow(2,1/2)) ,  startY1 -600 * (Math.pow(2,1/2)), 400, 200, 0); //2-1-1
createSide2(startX1 +2400 +600 * (Math.pow(2,1/2)) ,  startY1 -600 * (Math.pow(2,1/2)), 400, 200, 0); //2-1-2
createdoor(startX1 +2100 +600 * (Math.pow(2,1/2)) ,  startY1 -600 * (Math.pow(2,1/2)), 200, 200, 0);

createSide2(startX1 +2600 +600 * (Math.pow(2,1/2)) ,  startY1 -600 * (Math.pow(2,1/2)) - 550, 1100, 200, Math.PI/2); //2-2
createSide2(startX1 +2350 +600 * (Math.pow(2,1/2)) ,  startY1 -600 * (Math.pow(2,1/2)) - 1350, 500 * (Math.pow(2,1/2)), 200, -Math.PI/4); //2-3
createSide2(startX1 +1850 +600 * (Math.pow(2,1/2)) ,  startY1 -600 * (Math.pow(2,1/2)) - 1600, 500, 200,0); //2-4
createSide2(startX1 +1600 +600 * (Math.pow(2,1/2)) ,  -600 * (Math.pow(2,1/2))-250+ startY1, 500, 200, Math.PI/2); //2-5-1
createSide2(startX1 +1600 +600 * (Math.pow(2,1/2)) ,  -600 * (Math.pow(2,1/2))-1150+ startY1, 900, 200, Math.PI/2); //2-5-2
createdoor(startX1 +1600 +600 * (Math.pow(2,1/2)) ,  -600 * (Math.pow(2,1/2))-600+ startY1, 200, 200, Math.PI/2);
createwall(startX1 +1400 +600 * (Math.pow(2,1/2)) ,  -600 * (Math.pow(2,1/2))-700+ startY1, 400, 200, 0);
createwall(startX1 +1400 +600 * (Math.pow(2,1/2)) ,  -600 * (Math.pow(2,1/2))-500+ startY1, 400, 200, 0);


//============================================================
createwall(startX1 +2000 +600 * (Math.pow(2,1/2)), 0, - 2 * startY1 + 1200 * (Math.pow(2,1/2)), 200, Math.PI/2);
createwall(startX1 +2200 +600 * (Math.pow(2,1/2)),-250 - 300 * (Math.pow(2,1/2)), - startY1 - 100 + 600 * (Math.pow(2,1/2)), 200, Math.PI/2);
createwall(startX1 +2200 +600 * (Math.pow(2,1/2)), 250 + 300 * (Math.pow(2,1/2)), - startY1 - 100 + 600 * (Math.pow(2,1/2)), 200, Math.PI/2);
createwall(startX1 +3800 +500 * (Math.pow(2,1/2)), 250 + 300 * (Math.pow(2,1/2)), - startY1 - 100 + 600 * (Math.pow(2,1/2)), 200, Math.PI/2);
createwall(startX1 +3800 +500 * (Math.pow(2,1/2)),-250 - 300 * (Math.pow(2,1/2)), - startY1 - 100 + 600 * (Math.pow(2,1/2)), 200, Math.PI/2);
createwall(startX1 +3000 +550 * (Math.pow(2,1/2)),-100,  1600 - 100 * (Math.pow(2,1/2)), 200, 0);
createwall(startX1 +3000 +550 * (Math.pow(2,1/2)),100,  1600 - 100 * (Math.pow(2,1/2)), 200, 0);

// ==========================================================================================================
// restaurant right  #3
createSide2(startX1 +1800 +600 * (Math.pow(2,1/2)) ,  -startY1 + 600 * (Math.pow(2,1/2)), 400, 200, 0); //3-1-1
createSide2(startX1 +2400 +600 * (Math.pow(2,1/2)) ,  -startY1 + 600 * (Math.pow(2,1/2)), 400, 200, 0); //3-1-2
createdoor(startX1 +2100 +600 * (Math.pow(2,1/2)) ,  -startY1 + 600 * (Math.pow(2,1/2)), 200, 200, 0);

createSide2(startX1 +2600 +600 * (Math.pow(2,1/2)) ,  -startY1 + 600 * (Math.pow(2,1/2)) + 550, 1100, 200, Math.PI/2); //3-2
createSide2(startX1 +2350 +600 * (Math.pow(2,1/2)) ,  -startY1 + 600 * (Math.pow(2,1/2)) + 1350, 500 * (Math.pow(2,1/2)), 200, Math.PI/4); //3-3
createSide2(startX1 +1850 +600 * (Math.pow(2,1/2)) ,  -startY1 + 600 * (Math.pow(2,1/2)) + 1600, 500, 200,0); //3-4
createSide2(startX1 +1600 +600 * (Math.pow(2,1/2)) ,  -startY1 + 600 * (Math.pow(2,1/2)) + 25, 50, 200, Math.PI/2); //3-5-1
createSide2(startX1 +1600 +600 * (Math.pow(2,1/2)) ,  -startY1 + 600 * (Math.pow(2,1/2)) + 925, 1350, 200, Math.PI/2); //3-5-1
createdoor(startX1 +1600 +600 * (Math.pow(2,1/2)) ,  -startY1 + 600 * (Math.pow(2,1/2)) + 150, 200, 200, Math.PI/2); //3-5-1

// ==========================================================================================================
// restaurant right  #4
createSide2(-startX1 -1800 -600 * (Math.pow(2,1/2)) ,  -startY1 + 600 * (Math.pow(2,1/2)), 400, 200, 0); //4-1-1
createSide2(-startX1 -2400 -600 * (Math.pow(2,1/2)) ,  -startY1 + 600 * (Math.pow(2,1/2)), 400, 200, 0); //4-1-2
createSide2(-startX1 -2600 -600 * (Math.pow(2,1/2)) ,  -startY1 + 600 * (Math.pow(2,1/2)) + 550, 1100, 200, Math.PI/2); //4-2
createSide2(-startX1 -2350 -600 * (Math.pow(2,1/2)) ,  -startY1 + 600 * (Math.pow(2,1/2)) + 1350, 500 * (Math.pow(2,1/2)), 200, -Math.PI/4); //4-3
createSide2(-startX1 -1850 -600 * (Math.pow(2,1/2)) ,  -startY1 + 600 * (Math.pow(2,1/2)) + 1600, 500, 200,0); //4-4
createSide2(-startX1 -1600 -600 * (Math.pow(2,1/2)) ,   600 * (Math.pow(2,1/2)) + 600, 400, 200, Math.PI/2); //4-5-1
createSide2(-startX1 -1600 -600 * (Math.pow(2,1/2)) ,   600 * (Math.pow(2,1/2)) + 1500, 1000, 200, Math.PI/2); //4-5-2

// ==========================================================================================================
// restaurant right  #5
createSide2(-startX1 -1800 -600 * (Math.pow(2,1/2)) ,  startY1 - 600 * (Math.pow(2,1/2)), 400, 200, 0); //5-1-1
createSide2(-startX1 -2400 -600 * (Math.pow(2,1/2)) ,  startY1 - 600 * (Math.pow(2,1/2)), 400, 200, 0); //5-1-2

createSide2(-startX1 -2600 -600 * (Math.pow(2,1/2)) ,  startY1 - 600 * (Math.pow(2,1/2)) - 550, 1100, 200, Math.PI/2); //5-2
createSide2(-startX1 -2350 -600 * (Math.pow(2,1/2)) ,  startY1 - 600 * (Math.pow(2,1/2)) - 1350, 500 * (Math.pow(2,1/2)), 200, Math.PI/4); //5-3
createSide2(-startX1 -1850 -600 * (Math.pow(2,1/2)) ,  startY1 - 600 * (Math.pow(2,1/2)) - 1600, 500, 200,0); //5-4
createSide2(-startX1 -1600 -600 * (Math.pow(2,1/2)) ,  startY1 - 600 * (Math.pow(2,1/2)) - 250, 500, 200, Math.PI/2); //5-5-1
createSide2(-startX1 -1600 -600 * (Math.pow(2,1/2)) ,  startY1 - 600 * (Math.pow(2,1/2)) - 1150, 900, 200, Math.PI/2); //5-5-2
createdoor(-startX1 -1600 -600 * (Math.pow(2,1/2)) ,  -600 * (Math.pow(2,1/2))-600+ startY1, 200, 200, Math.PI/2);

//왼쪽 꼬다리벽
createwall(startX1 + 200- 3000 - 550 * (Math.pow(2,1/2)),-100,  1600 - 100 * (Math.pow(2,1/2)), 200, 0);
createwall(startX1 + 200- 3000 -550 * (Math.pow(2,1/2)),100,  1600 - 100 * (Math.pow(2,1/2)), 200, 0);
createwall(startX1 + 200- 2000 - 600 * (Math.pow(2,1/2)), 0, - 2 * startY1 + 1200 * (Math.pow(2,1/2)), 200, Math.PI/2);
createwall(startX1 + 200- 2200 - 600 * (Math.pow(2,1/2)),-250 - 300 * (Math.pow(2,1/2)), - startY1 - 100 + 600 * (Math.pow(2,1/2)), 200, Math.PI/2);
createwall(startX1 + 200- 2200 - 600 * (Math.pow(2,1/2)), 250 + 300 * (Math.pow(2,1/2)), - startY1 - 100 + 600 * (Math.pow(2,1/2)), 200, Math.PI/2);
createwall(startX1 + 200- 3800 - 500 * (Math.pow(2,1/2)), 250 + 300 * (Math.pow(2,1/2)), - startY1 - 100 + 600 * (Math.pow(2,1/2)), 200, Math.PI/2);
createwall(startX1 + 200- 3800 - 500 * (Math.pow(2,1/2)),-250 - 300 * (Math.pow(2,1/2)), - startY1 - 100 + 600 * (Math.pow(2,1/2)), 200, Math.PI/2);


// ==========================================================================================================
// restaurant right  #6
createSide2(startX1 + 200, startY1 + 1000, 400, 200, 0);  //6-1-1
createSide2(startX1 + 800, startY1 + 1000, 400, 200, 0);  //6-1-2
createSide2(startX1 + 1000,  525+ 300 * (Math.pow(2,1/2)), 600 * (Math.pow(2,1/2))-150, 200, Math.PI/2);  //6-2-1
createSide2(startX1 + 1000,  1875+ 300 * (Math.pow(2,1/2)), -600 * (Math.pow(2,1/2))+2450, 200, Math.PI/2);  //6-2-2
createdoor(startX1 +1000,  -startY1 + 600 * (Math.pow(2,1/2)) + 150, 200, 200, Math.PI/2);

createwall(startX1 +1300 + 300 * (Math.pow(2,1/2)),  -startY1 + 600 * (Math.pow(2,1/2)) + 50, 600 * (Math.pow(2,1/2)) + 600, 200, 0);
createwall(startX1 +1300,  -startY1 + 600 * (Math.pow(2,1/2)) + 250, 600, 200, 0);
createwall(startX1 + 300 * (Math.pow(2,1/2)) + 1700,  -startY1 + 600 * (Math.pow(2,1/2)) + 250 , -200 + 600 * (Math.pow(2,1/2)), 200, 0);
createwall(startX1 + 1800,  1375 + 300 * (Math.pow(2,1/2)) , 1450 - 600 * (Math.pow(2,1/2)), 200, Math.PI/2);
createwall(startX1 + 1600,  1375 + 300 * (Math.pow(2,1/2)) , 1450 - 600 * (Math.pow(2,1/2)), 200, Math.PI/2);



createSide2(startX1 + 500, startY1 + 3500, 1000, 200, 0);  //6-3
createSide2(startX1 - 250, startY1 + 3250, 500 * (Math.pow(2,1/2)), 200, -Math.PI/4);  //6-4
createSide2(startX1 - 500, 300 * (Math.pow(2,1/2)) + 950, 600 * (Math.pow(2,1/2)) - 300, 200, Math.PI/2);  //6-5-1
createSide2(startX1 - 500, 300 * (Math.pow(2,1/2)) + 1800, -600 * (Math.pow(2,1/2))+ 1600, 200, Math.PI/2);  //6-5-1

createSide2(-startX1 -1600 -600 * (Math.pow(2,1/2)) ,  -startY1 + 600 * (Math.pow(2,1/2)) + 800, 600 * (Math.pow(2,1/2)) - 800, 200, Math.PI/2); //4-5-1
createSide2(-startX1 -1600 -600 * (Math.pow(2,1/2)) ,  -startY1 + 600 * (Math.pow(2,1/2)) + 1150, 900, 200, Math.PI/2); //4-5-2


createSide2(startX1 - 250, startY1 + 1250, 500 * (Math.pow(2,1/2)), 200, Math.PI/4);  //6-6
createdoor(startX1 + 500, startY1 + 1000, 200, 200, 0);  //6-1-1

// ==========================================================================================================
// restaurant right  #7
createSide2(startX1 + 1200, startY1 + 3000, 1000, 200, Math.PI/2);  //7-1
createSide2(startX1 + 1600, startY1 + 3500, 800, 200, 0);  //7-2
createSide2(startX1 + 2100, startY1 + 3400, 200 * (Math.pow(2,1/2)), 200, Math.PI/4);  //7-2
createSide2(startX1 + 2200, startY1 + 2900, 800, 200, Math.PI/2);  //7-4

createSide2(startX1 + 1400, startY1 + 2500, 400, 200, 0);  //7-5-1
createSide2(startX1 + 2000, startY1 + 2500, 400, 200, 0);  //7-5-2

// ==========================================================================================================
// restaurant right  #8
createSide2(startX1 + 1700, startY1 +500, 1000, 200, 0);  //8-1
createSide2(startX1 + 1200, startY1 +550, 100, 200, Math.PI/2);  //8-2-1
createSide2(startX1 + 1200, startY1 +1150, 700, 200, Math.PI/2);  //8-2-2
createSide2(startX1 + 1650, startY1 +1500, 900, 200, 0);  //8-3
createSide2(startX1 + 2150, startY1 +1450, 100 * (Math.pow(2,1/2)), 200, Math.PI/4);  //8-4
createSide2(startX1 + 2200, startY1 +950, 900, 200, Math.PI/2);  //8-5


// ==========================================================================================================
// restaurant right  #9
createSide2(startX1 - 2000, startY1 -300, 1000, 200, Math.PI/2);  //9-1
createSide2(startX1 - 1500, startY1 + 200, 1000, 200, 0);  //9-2
createSide2(startX1 - 1000, startY1 +100, 200, 200, Math.PI/2);  //9-3
createSide2(startX1 - 1100, startY1 -100, 200 * (Math.pow(2,1/2)), 200, -Math.PI/4);  //9-4
createSide2(startX1 - 1200, startY1 - 500, 600, 200, Math.PI/2);  //9-5
createSide2(startX1 - 1350, startY1 - 800, 300, 200, 0);  //9-6-1
createSide2(startX1 - 1850, startY1 - 800, 300, 200, 0);  //9-6-2


// ==========================================================================================================
// restaurant right  #10
createSide2(200+startX1 - 2000,  200 -startY1 +300, 1000, 200, Math.PI/2);  //10-1
createSide2(200+startX1 - 1500, 200-startY1 - 200, 1000, 200, 0);  //10-2
createSide2(200+startX1 - 1000, 200-startY1 -100, 200, 200, Math.PI/2);  //10-3
createSide2(200+startX1 - 1100, 200-startY1 +100, 200* (Math.pow(2,1/2)), 200, Math.PI/4);  //10-4
createSide2(200+startX1 - 1200, 200-startY1 + 500, 600, 200, Math.PI/2);  //10-5
createSide2(200+startX1 - 1350, 200-startY1 + 800, 300, 200, 0);  //10-6-1
createSide2(200+startX1 - 1850, 200-startY1 + 800, 300, 200, 0);  //10-6-2

createwall(-1550 - 300 * (Math.pow(2,1/2)), 800 + 600* (Math.pow(2,1/2)), -100 + 600* (Math.pow(2,1/2)), 200, 0);
createwall(-1050-300 * (Math.pow(2,1/2)), 1000 + 600* (Math.pow(2,1/2)), 900 + 600* (Math.pow(2,1/2)), 200, 0);
createwall(-1000, 800 + 600* (Math.pow(2,1/2)), 800, 200, 0);
createwall(-1600, 1100 + 300* (Math.pow(2,1/2)), 600* (Math.pow(2,1/2)) - 600, 200, Math.PI/2);
createwall(-1400, 1100 + 300* (Math.pow(2,1/2)), 600* (Math.pow(2,1/2)) - 600, 200, Math.PI/2);
createdoor(-1500 - 600 * (Math.pow(2,1/2)), 900 + 600* (Math.pow(2,1/2)), 200, 200, Math.PI/2);
createdoor(-600, 900 + 600* (Math.pow(2,1/2)), 200, 200, Math.PI/2);  


//============================================================
  // Create the camera.
  camera = new THREE.PerspectiveCamera(
  90, 1280/720, 0.1, 10000
  );
  camera.position.z = 0;
  camera.position.y = 5000;
  box.add( camera );

  // Build the renderer
  renderer = new THREE.WebGLRenderer( { antialias: true } );

  var element = renderer.domElement;
  renderer.setSize( window.innerWidth, window.innerHeight );
  container.appendChild( element );

  // Build the controls.
  controls = new THREE.OrbitControls( camera, element );
  controls.enablePan = true;
  controls.enableZoom = true;
  controls.maxDistance = 1000; // Set our max zoom out distance (mouse scroll)
  controls.minDistance = 60; // Set our min zoom in distance (mouse scroll)
  controls.target.copy( new THREE.Vector3( 0, characterSize/2, 0 ) );

  document.addEventListener( 'mousedown', onDocumentMouseDown, false );
  document.addEventListener( 'touchstart', onDocumentTouchStart, false );
  //============================================================

}


function createCharacter() {



  var geometry = new THREE.BoxBufferGeometry( 50, 50, 50 );
  var material = new THREE.MeshPhongMaterial({ color: 0x22dd88 });
  box = new THREE.Mesh( geometry, material);
  box.position.y = 0;


  rotationPoint.add( box );
  // Create outline object
}

/**
 * Create the floor of the scene.
 */

function createFloor() {
  var geometry = new THREE.PlaneBufferGeometry( 12000, 8000 );
  var material = new THREE.MeshPhongMaterial({ color: 0xffffff });

  var plane = new THREE.Mesh( geometry, material );
  plane.rotation.x = -1 * Math.PI/2;
  plane.position.y = 0;
  scene.add( plane );
  objects.push( plane );
}

/**
 * Create a happy little tree.
 */
function createSide1( posX, posZ, zlength ) {
  // Set some random values so our trees look different.
  var randomScale =1;
  var randomRotateY = Math.PI/( Math.floor(( Math.random() * 32) + 1 ));

  // Create the trunk.
  var textureLoader = new THREE.TextureLoader();
	crateTexture = textureLoader.load("crate0/problem1.png");
  var geometry = new THREE.BoxGeometry( characterSize/3.5, 200, zlength, 8 ); //200은 높이
  var material = new THREE.MeshPhongMaterial( {color: 0x664422,
    map:crateTexture

  } );
  var trunk = new THREE.Mesh( geometry, material );
  trunk.position.set(posX, 100, posZ);
  trunk.scale.x = trunk.scale.y = trunk.scale.z = randomScale;
  scene.add( trunk );

  calculateCollisionPoints( trunk, randomScale );

  // Create the trunk outline.


  var geometry = new THREE.DodecahedronGeometry( characterSize );
  var material = new THREE.MeshPhongMaterial({ color: 0x44aa44 });


  // Create outline.

}

function createSide2( posX, posZ, xlength, zlength, rotate ) {
  // Set some random values so our trees look different.
  var randomScale =1;
  var randomRotateY = Math.PI/( Math.floor(( Math.random() * 32) + 1 ));

  // Create the trunk.
  var geometry = new THREE.BoxGeometry( xlength, 300, characterSize/3.5, 8 );
  var material = new THREE.MeshPhongMaterial( {color: 0x664422} );
  var trunk = new THREE.Mesh( geometry, material );
  trunk.position.set(posX, 100, posZ);
  trunk.scale.x = trunk.scale.y = trunk.scale.z = randomScale;
  trunk.rotation.y = rotate;

  scene.add( trunk );

  calculateCollisionPoints( trunk, randomScale );

  // Create the trunk outline.


  var geometry = new THREE.DodecahedronGeometry( characterSize );
  var material = new THREE.MeshPhongMaterial({ color: 0x44aa44 });


  // Create outline.

}

function createdoor( posX, posZ, xlength, zlength, rotate ) {
  // Set some random values so our trees look different.
  var randomScale =1;
  var randomRotateY = Math.PI/( Math.floor(( Math.random() * 32) + 1 ));

  // Create the trunk.
  var geometry = new THREE.BoxGeometry( xlength, 300, characterSize/3.5, 8 );
  var material = new THREE.MeshPhongMaterial( {color: 0x334422} );
  var trunk = new THREE.Mesh( geometry, material );
  trunk.position.set(posX, 100, posZ);
  trunk.scale.x = trunk.scale.y = trunk.scale.z = randomScale;
  trunk.rotation.y = rotate;

  scene.add( trunk );

  calculateCollisionPoints( trunk, randomScale );

  // Create the trunk outline.


  var geometry = new THREE.DodecahedronGeometry( characterSize );
  var material = new THREE.MeshPhongMaterial({ color: 0x44aa44 });


  // Create outline.

}

function createwall( posX, posZ, xlength, zlength, rotate ) {
  // Set some random values so our trees look different.
  var randomScale =1;
  var randomRotateY = Math.PI/( Math.floor(( Math.random() * 32) + 1 ));

  // Create the trunk.
  var geometry = new THREE.BoxGeometry( xlength, 300, characterSize/3.5, 8 );
  var material = new THREE.MeshPhongMaterial( {color: 0x111122} );
  var trunk = new THREE.Mesh( geometry, material );
  trunk.position.set(posX, 100, posZ);
  trunk.scale.x = trunk.scale.y = trunk.scale.z = randomScale;
  trunk.rotation.y = rotate;

  scene.add( trunk );

  calculateCollisionPoints( trunk, randomScale );

  // Create the trunk outline.


  var geometry = new THREE.DodecahedronGeometry( characterSize );
  var material = new THREE.MeshPhongMaterial({ color: 0x44aa44 });


  // Create outline.

}
/**
 * Event that fires upon window resizing.
 */
window.onresize = function () {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize( window.innerWidth, window.innerHeight );
};

/**
 * Event that fires upon touch.
 */
function onDocumentTouchStart( event ) {
  event.preventDefault();
  event.clientX = event.touches[0].clientX;
  event.clientY = event.touches[0].clientY;

  // Default touch doesn't offer a bypass.
  var bypass = false;

  // Detect if there was a double click. If so, bypass mouse button check.
  bypass = detectDoubleTouch();
  console.log(bypass);
  onDocumentMouseDown( event, bypass );
}

/**
 * Helper function to detect if the user quickly tapped twice.
 */
function detectDoubleTouch() {
  // If a single click was detected, start the timer.
  if (clickTimer == null) {
    clickTimer = setTimeout(function () {
      clickTimer = null;
    }, 300);
  } else {
    // A double tap was detected!
    clearTimeout(clickTimer);
    clickTimer = null;
    return true;
  }

  // No double tap.
  return false;
}

/**
 * Event that fires upon mouse down.
 */
function onDocumentMouseDown( event, bypass = false ) {
  event.preventDefault();

  // Detect which mouse button was clicked.
  if ( event.which == 3 || bypass === true ) {
    stopMovement();

    // Grab the coordinates.
    mouse.x = ( event.clientX / renderer.domElement.clientWidth ) * 2 - 1;
    mouse.y = - ( event.clientY / renderer.domElement.clientHeight ) * 2 + 1;

    // Use the raycaster to detect intersections.
    raycaster.setFromCamera( mouse, camera );

    // Grab all objects that can be intersected.
    var intersects = raycaster.intersectObjects( objects );
    if ( intersects.length > 0 ) {
      movements.push(intersects[ 0 ].point);
    }
  }
}

function move( location, destination, speed = playerSpeed ) {
      var moveDistance = speed;

    // Translate over to the position.
    var posX = location.position.x;
    var posZ = location.position.z;
    var newPosX = destination.x;
    var newPosZ = destination.z;

    // Set a multiplier just in case we need negative values.
    var multiplierX = 1;
    var multiplierZ = 1;

    // Detect the distance between the current pos and target.
    var diffX = Math.abs( posX - newPosX );
    var diffZ = Math.abs( posZ - newPosZ );
    var distance = Math.sqrt( diffX * diffX + diffZ * diffZ );

    // Use negative multipliers if necessary.
    if (posX > newPosX) {
      multiplierX = -1;
    }

    if (posZ > newPosZ) {
      multiplierZ = -1;
    }

    // Update the main position.
    location.position.x = location.position.x + ( moveDistance * ( diffX / distance )) * multiplierX;
    location.position.z = location.position.z + ( moveDistance * ( diffZ / distance )) * multiplierZ;

    // If the position is close we can call the movement complete.
    if (( Math.floor( location.position.x ) <= Math.floor( newPosX ) + 15 &&
          Math.floor( location.position.x ) >= Math.floor( newPosX ) - 15 ) &&
        ( Math.floor( location.position.z ) <= Math.floor( newPosZ ) + 15 &&
          Math.floor( location.position.z ) >= Math.floor( newPosZ ) - 15 )) {
      location.position.x = Math.floor( location.position.x );
      location.position.z = Math.floor( location.position.z );

      // Reset any movements.
      stopMovement();

      // Maybe move should return a boolean. True if completed, false if not.
    }
}

/**
 * Stop character movement.
 */
function stopMovement() {
  movements = [];
  scene.remove( indicatorTop );
  scene.remove( indicatorBottom );
}

/**
 * Updates to apply to the scene while running.
 */
function update() {
  camera.updateProjectionMatrix();
}

/**
 * Render the scene.
 */
function render() {
  renderer.render( scene, camera );

  // Don't let the camera go too low.
  if ( camera.position.y < 10 ) {
    camera.position.y = 10;
  }

  // If any movement was added, run it!
  if ( movements.length > 0 ) {
    // Set an indicator point to destination.
    if ( scene.getObjectByName('indicator_top') === undefined ) {
      drawIndicator();
    } else {
      if ( indicatorTop.position.y > 10 ) {
        indicatorTop.position.y -= 3;
      } else {
        indicatorTop.position.y = 100;
      }
    }

    move( rotationPoint, movements[ 0 ] );
  }

  // Detect collisions.
  if ( collisions.length > 0 ) {
    detectCollisions();
  }
}

/**
 * Animate the scene.
 */
function animate() {
  requestAnimationFrame(animate);
  update();
  render();
}

/**
 * Collision detection for every solid object.
 */
function detectCollisions() {
  // Get the user's current collision area.
  var bounds = {
    xMin: rotationPoint.position.x - box.geometry.parameters.width / 2,
    xMax: rotationPoint.position.x + box.geometry.parameters.width / 2,
    yMin: rotationPoint.position.y - box.geometry.parameters.height / 2,
    yMax: rotationPoint.position.y + box.geometry.parameters.height / 2,
    zMin: rotationPoint.position.z - box.geometry.parameters.width / 2,
    zMax: rotationPoint.position.z + box.geometry.parameters.width / 2,
  };

  // Run through each object and detect if there is a collision.
  for ( var index = 0; index < collisions.length; index ++ ) {

    if (collisions[ index ].type == 'collision' ) {
      if ( ( bounds.xMin <= collisions[ index ].xMax && bounds.xMax >= collisions[ index ].xMin ) &&
         ( bounds.yMin <= collisions[ index ].yMax && bounds.yMax >= collisions[ index ].yMin) &&
         ( bounds.zMin <= collisions[ index ].zMax && bounds.zMax >= collisions[ index ].zMin) ) {
        // We hit a solid object! Stop all movements.
        stopMovement();

        // Move the object in the clear. Detect the best direction to move.
        if ( bounds.xMin <= collisions[ index ].xMax && bounds.xMax >= collisions[ index ].xMin ) {
          // Determine center then push out accordingly.
          var objectCenterX = ((collisions[ index ].xMax - collisions[ index ].xMin) / 2) + collisions[ index ].xMin;
          var playerCenterX = ((bounds.xMax - bounds.xMin) / 2) + bounds.xMin;
          var objectCenterZ = ((collisions[ index ].zMax - collisions[ index ].zMin) / 2) + collisions[ index ].zMin;
          var playerCenterZ = ((bounds.zMax - bounds.zMin) / 2) + bounds.zMin;

          // Determine the X axis push.
          if (objectCenterX > playerCenterX) {
            rotationPoint.position.x -= 1;
          } else {
            rotationPoint.position.x += 1;
          }
        }
        if ( bounds.zMin <= collisions[ index ].zMax && bounds.zMax >= collisions[ index ].zMin ) {
          // Determine the Z axis push.
          if (objectCenterZ > playerCenterZ) {
          rotationPoint.position.z -= 1;
          } else {
            rotationPoint.position.z += 1;
          }
        }
      }
    }
  }
}

/**
 * Calculates collision detection parameters.
 */
function calculateCollisionPoints( mesh, scale, type = 'collision' ) {
  // Compute the bounding box after scale, translation, etc.
  var bbox = new THREE.Box3().setFromObject(mesh);

  var bounds = {
    type: type,
    xMin: bbox.min.x,
    xMax: bbox.max.x,
    yMin: bbox.min.y,
    yMax: bbox.max.y,
    zMin: bbox.min.z,
    zMax: bbox.max.z,
  };

  collisions.push( bounds );
}

/**
 * Create the main character.
 */







/**
 * Draw indicator for movement destination.
 */
function drawIndicator() {
  // Store variables.
  var topSize = characterSize/8;
  var bottomRadius = characterSize/4;

  // Create the top indicator.
  var geometry = new THREE.TetrahedronGeometry( topSize, 0 );
  var material = new THREE.MeshPhongMaterial({ color: 0x00ccff, emissive: 0x00ccff  });
  indicatorTop = new THREE.Mesh( geometry, material );
  indicatorTop.position.y = 100; // Flat surface so hardcode Y position for now.
  indicatorTop.position.x = movements[ 0 ].x; // Get the X destination.
  indicatorTop.position.z = movements[ 0 ].z; // Get the Z destination.
  indicatorTop.rotation.x = -0.97;
  indicatorTop.rotation.y = Math.PI/4;
  indicatorTop.name = 'indicator_top'
  scene.add( indicatorTop );

  // Create the top indicator outline.
  var geometry = new THREE.TetrahedronGeometry( topSize + outlineSize, 0 );
  var material = new THREE.MeshBasicMaterial({ color : 0x0000000, side: THREE.BackSide });
  var outlineTop = new THREE.Mesh( geometry, material );
  indicatorTop.add( outlineTop );

  // Create the bottom indicator.
  var geometry = new THREE.TorusGeometry( bottomRadius, ( bottomRadius * 0.25), 2, 12 );
  geometry.dynamic = true;
  var material = new THREE.MeshPhongMaterial({ color: 0x00ccff, emissive: 0x00ccff });
  indicatorBottom = new THREE.Mesh( geometry, material );
  indicatorBottom.position.y = 2.5;
  indicatorBottom.position.x = movements[ 0 ].x;
  indicatorBottom.position.z = movements[ 0 ].z;
  indicatorBottom.rotation.x = -Math.PI/2;
  scene.add( indicatorBottom );

  // Create the bottom outline.
  var geometry = new THREE.TorusGeometry( bottomRadius + outlineSize/10, bottomRadius / 2.5, 2, 24 );
  var material = new THREE.MeshBasicMaterial({ color : 0x0000000, side: THREE.BackSide });
  var outlineBottom = new THREE.Mesh( geometry, material );
  outlineBottom.position.z = -2;
  indicatorBottom.add( outlineBottom );
}
