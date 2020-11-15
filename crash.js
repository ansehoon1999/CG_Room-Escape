var camera, // We need a camera.
    scene, // The camera has to see something.
    renderer, // Render our graphics.
    controls, // Our Orbit Controller for camera magic.
    container, // Our HTML container for the program.
    rotationPoint;  // The point in which our camera will rotate around.

var characterSize = 1;
var outlineSize = characterSize * 0.05;

// Track all objects and collisions.
var objects = [];
var collisions = [];

// Set mouse and raycaster.
var raycaster = new THREE.Raycaster();
var mouse = new THREE.Vector2();

// Store movements.
var movements = [];
var playerSpeed = 0.05;

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


  }

  function createCharacter() {

    var geometry = new THREE.BoxBufferGeometry( 0.5, 0.5, 0.5 );
    var material = new THREE.MeshPhongMaterial({ color: 0x22dd88 });

    box = new THREE.Mesh( geometry, material);
    box.position.y = 0;
    rotationPoint.add( box );
    // Create outline object
    createObject("models/craft_cargoA.mtl", "models/craft_cargoA.obj", -50, 0, -9, -Math.PI/4);
    createObject("models/craft_cargoA.mtl", "models/craft_cargoA.obj", -50, 0, -6, -Math.PI/4);
    createObject("models/craft_cargoA.mtl", "models/craft_cargoA.obj", -50, 0, -3, -Math.PI/4);
    createObject("models/craft_cargoA.mtl", "models/craft_cargoA.obj", -50, 0, 0, -Math.PI/4);
    createObject("models/craft_cargoA.mtl", "models/craft_cargoA.obj", -50, 0, 3, -Math.PI/4);
    createObject("models/craft_cargoA.mtl", "models/craft_cargoA.obj", -50, 0, 6, -Math.PI/4);
    createObject("models/craft_cargoA.mtl", "models/craft_cargoA.obj", -50, 0, 9, -Math.PI/4);

    createObject("models/bedSingle.mtl", "models/bedSingle.obj", -15, 0, -10, Math.PI/2);
    createObject("models/bedSingle.mtl", "models/bedSingle.obj", -15, 0, -7.5, Math.PI/2);
    createObject("models/bedSingle.mtl", "models/bedSingle.obj", -19, 0, -6, -Math.PI/2);
    createObject("models/bedSingle.mtl", "models/bedSingle.obj", -19, 0, -8.5, -Math.PI/2);
    createObject("models/bedSingle.mtl", "models/bedSingle.obj", -19, 0, -3.5, -Math.PI/2);
    createObject("models/rocket_baseA.mtl", "models/rocket_baseA.obj", -14, 0, -3.5, 0);
    createObject("models/bookcaseOpen.mtl", "models/bookcaseOpen.obj", 0, 0, 0, 0);
    createObject("models/hangar_largeA.mtl", "models/hangar_largeA.obj", -23 - 6 * (Math.pow(2,1/2)), 0, 10 + 6 * (Math.pow(2,1/2)), Math.PI/2);
    createObject("models/hangar_largeA.mtl", "models/hangar_largeA.obj", -23 - 6 * (Math.pow(2,1/2)), 0, 12 + 6 * (Math.pow(2,1/2)), Math.PI/2);
    createObject("models/hangar_largeA.mtl", "models/hangar_largeA.obj", -20 - 6 * (Math.pow(2,1/2)), 0, 12 + 6 * (Math.pow(2,1/2)), Math.PI/2);
    createObject("models/hangar_largeA.mtl", "models/hangar_largeA.obj", -20 - 6 * (Math.pow(2,1/2)), 0, 10 + 6 * (Math.pow(2,1/2)), Math.PI/2);
    createObject("models/hangar_largeA.mtl", "models/hangar_largeA.obj", -23 - 6 * (Math.pow(2,1/2)), 0, -10 - 6 * (Math.pow(2,1/2)), Math.PI/2);
    createObject("models/hangar_largeA.mtl", "models/hangar_largeA.obj", -23 - 6 * (Math.pow(2,1/2)), 0, -12 - 6 * (Math.pow(2,1/2)), Math.PI/2);
    createObject("models/hangar_largeA.mtl", "models/hangar_largeA.obj", -20 - 6 * (Math.pow(2,1/2)), 0, -12 - 6 * (Math.pow(2,1/2)), Math.PI/2);
    createObject("models/hangar_largeA.mtl", "models/hangar_largeA.obj", -20 - 6 * (Math.pow(2,1/2)), 0, -10 - 6 * (Math.pow(2,1/2)), Math.PI/2);

    function createObject(mtl, obj, x, y, z, angle) {
  var mtlLoader = new THREE.MTLLoader();
	mtlLoader.load(mtl, function(materials){

		materials.preload();
		var objLoader = new THREE.OBJLoader();
		objLoader.setMaterials(materials);

		objLoader.load(obj, function(mesh){

			mesh.traverse(function(node){
				if( node instanceof THREE.Mesh ){
					node.castShadow = true;
					node.receiveShadow = true;
				}
			});

			scene.add(mesh);
			mesh.position.set(x, y, z);
			mesh.rotation.y = angle;
		});

	});

}
//============================================================================================================
// spaceship outline 우주선 외
  createSide3(0, 35, 50, 200, 0, "rgb(60, 75, 75)");
  createSide3(0, -35, 50, 200, 0, "rgb(60, 75, 75)");

  createSide3(25 + 2.5 * (Math.pow(3,1/2)), -32.5, 10, 200, -Math.PI/6, "rgb(60, 75, 75)");
  createSide3(30 + 5 * (Math.pow(3,1/2)) , -30 + 5* (Math.pow(3,1/2)) , 20, 200, -Math.PI/3, "rgb(60, 75, 75)");
  createSide3(40 + 5 * (Math.pow(3,1/2)) , -30 + 10* (Math.pow(3,1/2)) , 10, 200, 0, "rgb(60, 75, 75)");

  createSide3(40 + 5 * (Math.pow(3,1/2)) , 30- 10* (Math.pow(3,1/2)) , 10, 200, 0, "rgb(60, 75, 75)");
  createSide3(25 + 2.5 * (Math.pow(3,1/2)), 32.5, 10, 200, Math.PI/6, "rgb(60, 75, 75)");
  createSide3(30 + 5 * (Math.pow(3,1/2)) , 30 - 5* (Math.pow(3,1/2)) , 20, 200,Math.PI/3, "rgb(60, 75, 75)");

  createSide3(-25 - 2.5 * (Math.pow(3,1/2)), -32.5, 10, 200, Math.PI/6, "rgb(60, 75, 75)");
  createSide3(-30 - 5.0 * (Math.pow(3,1/2)) , -30 + 5* (Math.pow(3,1/2)) , 20, 200, Math.PI/3, "rgb(60, 75, 75)");
  createSide3(-40 - 5.0 * (Math.pow(3,1/2)) , -30 + 10* (Math.pow(3,1/2)) , 10, 200, 0, "rgb(60, 75, 75)");

  createSide3(-25 - 2.5 * (Math.pow(3,1/2)), 32.5, 10, 200, -Math.PI/6, "rgb(60, 75, 75)");
  createSide3(-30 - 5.0 * (Math.pow(3,1/2)) , 30 - 5* (Math.pow(3,1/2)) , 20, 200, -Math.PI/3, "rgb(60, 75, 75)");
  createSide3(-40 - 5.0 * (Math.pow(3,1/2)) , 30 - 10* (Math.pow(3,1/2)) , 10, 200, 0, "rgb(60, 75, 75)");
//============================================================================================================
// 우주선 꼬다리
  createSide1(-45 - 5 * (Math.pow(3,1/2)), 0, 60 - 20 * (Math.pow(3,1/2)));
  createSide1(45 + 5 * (Math.pow(3,1/2)), 0, 60 - 20 * (Math.pow(3,1/2)));

//============================================================================================================
var startX1 = -1;
var startY1 = -4;

// restaurant  #1
// ==========================================================================================================
  createSide2(startX1 + 2, startY1 + 0, 4.0, 200, 0, "rgb(180, 180, 180)");  //1-1-1
  createSide2(startX1 + 9.0, startY1 + 0, 6.0, 200, 0, "rgb(180, 180, 180)");  //1-1-2
  createSide2(startX1 +12.0 + 3.0 * (Math.pow(2,1/2)), -3.0 * (Math.pow(2,1/2))+ startY1, 12.0, 200, Math.PI/4, "rgb(180, 180, 180)"); //1-2
  createSide2(startX1 +12.0 + 6.0 * (Math.pow(2,1/2)), -6.0 * (Math.pow(2,1/2))-2.5+ startY1, 5.0, 200, Math.PI/2, "rgb(180, 180, 180)"); //1-3-1
  createSide2(startX1 +12.0 + 6.0 * (Math.pow(2,1/2)), -6.0 * (Math.pow(2,1/2))-9.5+ startY1, 5.0, 200, Math.PI/2, "rgb(180, 180, 180)"); //1-3-2
  createSide2(startX1 +12.0 + 3.0 * (Math.pow(2,1/2)), -9.0 * (Math.pow(2,1/2))-12.0+ startY1, 12.0, 200, -Math.PI/4, "rgb(180, 180, 180)"); //1-4
  createSide2(startX1 +6.0, -12.0 * (Math.pow(2,1/2))-12.0+ startY1, 12.0, 200, 0, "rgb(180, 180, 180)"); //1-5
  createSide2( -3.0 * (Math.pow(2,1/2)) +startX1, -9.0 * (Math.pow(2,1/2))-12.0+ startY1, 12.0, 200, Math.PI/4, "rgb(180, 180, 180)"); //1-6
  createSide2( -6.0 * (Math.pow(2,1/2)) +startX1, -6.0 * (Math.pow(2,1/2))-2.5+ startY1, 5.0, 200, Math.PI/2, "rgb(180, 180, 180)"); //1-7-1
  createSide2( -6.0 * (Math.pow(2,1/2)) +startX1, -6.0 * (Math.pow(2,1/2))-9.5+ startY1, 5.0, 200, Math.PI/2, "rgb(180, 180, 180)"); //1-7-2
  createSide2( -3.0 * (Math.pow(2,1/2)) +startX1 , -3.0 * (Math.pow(2,1/2))+ startY1, 12.0, 200, -Math.PI/4, "rgb(180, 180, 180)"); //1-8

// ==========================================================================================================
// #2
createSide2(startX1 +18 +6.0 * (Math.pow(2,1/2)) ,  startY1 -6.0 * (Math.pow(2,1/2)), 4.0, 200, 0, "rgb(190, 195, 165)"); //2-1-1
createSide2(startX1 +24.0 +6.0 * (Math.pow(2,1/2)) ,  startY1 -6.0 * (Math.pow(2,1/2)), 4.0, 200, 0, "rgb(190, 195, 165)"); //2-1-2
createSide2(startX1 +26.0 +6.0 * (Math.pow(2,1/2)) ,  startY1 -6.0 * (Math.pow(2,1/2)) - 5.5, 11.0, 200, Math.PI/2, "rgb(190, 195, 165)"); //2-2
createSide2(startX1 +23.5 +6.0 * (Math.pow(2,1/2)) ,  startY1 -6.0 * (Math.pow(2,1/2)) - 13.5, 5.0 * (Math.pow(2,1/2)), 200, -Math.PI/4, "rgb(190, 195, 165)"); //2-3
createSide2(startX1 +18.5 +6.0 * (Math.pow(2,1/2)) ,  startY1 -6.0 * (Math.pow(2,1/2)) - 16.0, 5.0, 200,0, "rgb(190, 195, 165)"); //2-4
createSide2(startX1 +16.0 +6.0 * (Math.pow(2,1/2)) ,  -6.0 * (Math.pow(2,1/2))-2.5+ startY1, 5.0, 200, Math.PI/2, "rgb(190, 195, 165)"); //2-5-1
createSide2(startX1 +16.0 +6.0 * (Math.pow(2,1/2)) ,  -6.0 * (Math.pow(2,1/2))-11.5+ startY1, 9.0, 200, Math.PI/2, "rgb(190, 195, 165)"); //2-5-2
// ==========================================================================================================
// restaurant right  #3
createSide2(startX1 +18.00 +6.00 * (Math.pow(2,1/2)) ,  -startY1 + 6.00 * (Math.pow(2,1/2)), 4.00, 200, 0, "rgb(190, 195, 165)"); //3-1-1
createSide2(startX1 +24.00 +6.00 * (Math.pow(2,1/2)) ,  -startY1 + 6.00 * (Math.pow(2,1/2)), 4.00, 200, 0, "rgb(190, 195, 165)"); //3-1-2
createSide2(startX1 +26.00 +6.00 * (Math.pow(2,1/2)) ,  -startY1 + 6.00 * (Math.pow(2,1/2)) + 5.50, 11.00, 200, Math.PI/2, "rgb(190, 195, 165)"); //3-2
createSide2(startX1 +23.50 +6.00 * (Math.pow(2,1/2)) ,  -startY1 + 6.00 * (Math.pow(2,1/2)) + 13.50, 5.00 * (Math.pow(2,1/2)), 200, Math.PI/4, "rgb(190, 195, 165)"); //3-3
createSide2(startX1 +18.50 +6.00 * (Math.pow(2,1/2)) ,  -startY1 + 6.00 * (Math.pow(2,1/2)) + 16.00, 5.0, 200,0, "rgb(190, 195, 165)"); //3-4
createSide2(startX1 +16.00 +6.00 * (Math.pow(2,1/2)) ,  -startY1 + 6.00 * (Math.pow(2,1/2)) + 0.25, 0.50, 200, Math.PI/2, "rgb(190, 195, 165)"); //3-5-1
createSide2(startX1 +16.00 +6.00 * (Math.pow(2,1/2)) ,  -startY1 + 6.00 * (Math.pow(2,1/2)) + 9.25, 13.50, 200, Math.PI/2, "rgb(190, 195, 165)"); //3-5-2

// ==========================================================================================================
// #4
createSide2(-startX1 -18.00 -6.00 * (Math.pow(2,1/2)) ,  -startY1 + 6.00 * (Math.pow(2,1/2)), 4.00, 200, 0, "rgb(155, 110, 15)"); //4-1-1
createSide2(-startX1 -24.00 -6.00 * (Math.pow(2,1/2)) ,  -startY1 + 6.00 * (Math.pow(2,1/2)), 4.00, 200, 0, "rgb(155, 110, 15)"); //4-1-2
createSide2(-startX1 -26.00 -6.00 * (Math.pow(2,1/2)) ,  -startY1 + 6.00 * (Math.pow(2,1/2)) + 5.50, 11.00, 200, Math.PI/2, "rgb(155, 110, 15)"); //4-2
createSide2(-startX1 -23.50 -6.00 * (Math.pow(2,1/2)) ,  -startY1 + 6.00 * (Math.pow(2,1/2)) + 13.50, 5.00 * (Math.pow(2,1/2)), 200, -Math.PI/4, "rgb(155, 110, 15)"); //4-3
createSide2(-startX1 -18.50 -6.00 * (Math.pow(2,1/2)) ,  -startY1 + 6.00 * (Math.pow(2,1/2)) + 16.00, 5.00, 200,0, "rgb(155, 110, 15)"); //4-4
createSide2(-startX1 -16.00 -6.00 * (Math.pow(2,1/2)) ,   6.00 * (Math.pow(2,1/2)) + 6.00, 4.00, 200, Math.PI/2, "rgb(155, 110, 15)"); //4-5-1
createSide2(-startX1 -16.00 -6.00 * (Math.pow(2,1/2)) ,   6.00 * (Math.pow(2,1/2)) + 15.00, 10.00, 200, Math.PI/2, "rgb(155, 110, 15)"); //4-5-2
createSide2(-startX1 -16.00 -6.00 * (Math.pow(2,1/2)) ,  -startY1 + 6.00 * (Math.pow(2,1/2)) + 8.00, 6.00 * (Math.pow(2,1/2)) - 8.00, 200, Math.PI/2, "rgb(155, 110, 15)"); //4-5-1
createSide2(-startX1 -16.00 -6.00 * (Math.pow(2,1/2)) ,  -startY1 + 6.00 * (Math.pow(2,1/2)) + 11.50, 9.00, 200, Math.PI/2, "rgb(155, 110, 15)"); //4-5-2
// ==========================================================================================================
// #5
createSide2(-startX1 -18.00 -6.00 * (Math.pow(2,1/2)) ,  startY1 - 6.00 * (Math.pow(2,1/2)), 4.00, 200, 0, "rgb(155, 110, 15)"); //5-1-1
createSide2(-startX1 -24.00 -6.00 * (Math.pow(2,1/2)) ,  startY1 - 6.00 * (Math.pow(2,1/2)), 4.00, 200, 0, "rgb(155, 110, 15)"); //5-1-2
createSide2(-startX1 -26.00 -6.00 * (Math.pow(2,1/2)) ,  startY1 - 6.00 * (Math.pow(2,1/2)) - 5.50, 11.00, 200, Math.PI/2, "rgb(155, 110, 15)"); //5-2
createSide2(-startX1 -23.50 -6.00 * (Math.pow(2,1/2)) ,  startY1 - 6.00 * (Math.pow(2,1/2)) - 13.50, 5.00 * (Math.pow(2,1/2)), 200, Math.PI/4, "rgb(155, 110, 15)"); //5-3
createSide2(-startX1 -18.50 -6.00 * (Math.pow(2,1/2)) ,  startY1 - 6.00 * (Math.pow(2,1/2)) - 16.00, 5.00, 200,0, "rgb(155, 110, 15)"); //5-4
createSide2(-startX1 -16.00 -6.00 * (Math.pow(2,1/2)) ,  startY1 - 6.00 * (Math.pow(2,1/2)) - 2.50, 5.00, 200, Math.PI/2, "rgb(155, 110, 15)"); //5-5-1
createSide2(-startX1 -16.00 -6.00 * (Math.pow(2,1/2)) ,  startY1 - 6.00 * (Math.pow(2,1/2)) - 11.50, 9.00, 200, Math.PI/2, "rgb(155, 110, 15)"); //5-5-2


// ==========================================================================================================
// #6
createSide2(startX1 + 2.00, startY1 + 10.00, 4.00, 200, 0, "rgb(91, 100, 110)");  //6-1-1
createSide2(startX1 + 8.00, startY1 + 10.00, 4.00, 200, 0,  "rgb(91, 100, 110)");  //6-1-2
createSide2(startX1 + 10.00,  5.25+ 3.00 * (Math.pow(2,1/2)), 6.00 * (Math.pow(2,1/2))-1.50, 200, Math.PI/2,  "rgb(91, 100, 110)");  //6-2-1
createSide2(startX1 + 10.00,  18.75+ 3.00 * (Math.pow(2,1/2)), -6.00 * (Math.pow(2,1/2))+24.50, 200, Math.PI/2, "rgb(91, 100, 110)");  //6-2-2
createSide2(startX1 + 5.00, startY1 + 35.00, 10.00, 200, 0,  "rgb(91, 100, 110)");  //6-3
createSide2(startX1 - 2.50, startY1 + 32.50, 5.00 * (Math.pow(2,1/2)), 200, -Math.PI/4,  "rgb(91, 100, 110)");  //6-4
createSide2(startX1 - 5.00, 3.00 * (Math.pow(2,1/2)) + 9.50, 6.00 * (Math.pow(2,1/2)) - 3.00, 200, Math.PI/2,  "rgb(91, 100, 110)");  //6-5-1
createSide2(startX1 - 5.00, 3.00 * (Math.pow(2,1/2)) + 18.00, -6.00 * (Math.pow(2,1/2))+ 16.00, 200, Math.PI/2,  "rgb(91, 100, 110)");  //6-5-2
createSide2(startX1 - 2.50, startY1 + 12.50, 5.00 * (Math.pow(2,1/2)), 200, Math.PI/4,  "rgb(91, 100, 110)");  //6-6
// ==========================================================================================================
//  #7
createSide2(startX1 + 12.00, startY1 + 30.00, 10.00, 200, Math.PI/2, "rgb(90, 94, 74)");  //7-1
createSide2(startX1 + 16.00, startY1 + 35.00, 8.00, 200, 0, "rgb(90, 94, 74)");  //7-2
createSide2(startX1 + 21.00, startY1 + 34.00, 2.00 * (Math.pow(2,1/2)), 200, Math.PI/4, "rgb(90, 94, 74)");  //7-2
createSide2(startX1 + 22.00, startY1 + 29.00, 8.00, 200, Math.PI/2, "rgb(90, 94, 74)");  //7-4
createSide2(startX1 + 14.00, startY1 + 25.00, 4.00, 200, 0, "rgb(90, 94, 74)");  //7-5-1
createSide2(startX1 + 20.00, startY1 + 25.00, 4.00, 200, 0, "rgb(90, 94, 74)");  //7-5-2
// ==========================================================================================================
// #8
createSide2(startX1 + 17.00, startY1 +5.00, 10.00, 2.00, 0, "rgb(90, 94, 74)");  //8-1
createSide2(startX1 + 12.00, startY1 +5.50, 1.00, 2.00, Math.PI/2, "rgb(90, 94, 74)");  //8-2-1
createSide2(startX1 + 12.00, startY1 +11.50, 7.00, 2.00, Math.PI/2, "rgb(90, 94, 74)");  //8-2-2
createSide2(startX1 + 16.50, startY1 +15.00, 9.00, 2.00, 0, "rgb(90, 94, 74)");  //8-3
createSide2(startX1 + 21.50, startY1 +14.50, 1.00 * (Math.pow(2,1/2)), 200, Math.PI/4, "rgb(90, 94, 74)");  //8-4
createSide2(startX1 + 22.00, startY1 +9.50, 9.00, 200, Math.PI/2, "rgb(90, 94, 74)");  //8-5
// ==========================================================================================================
// #9
createSide2(startX1 - 20.00, startY1 -3.00, 10.00, 200, Math.PI/2, "rgb(180, 180, 180)");  //9-1
createSide2(startX1 - 15.00, startY1 + 2.00, 10.00, 200, 0, "rgb(180, 180, 180)");  //9-2
createSide2(startX1 - 10.00, startY1 +1.00, 2.00, 200, Math.PI/2, "rgb(180, 180, 180)");  //9-3
createSide2(startX1 - 11.00, startY1 -1.00, 2.00 * (Math.pow(2,1/2)), 200, -Math.PI/4, "rgb(180, 180, 180)");  //9-4
createSide2(startX1 - 12.00, startY1 - 5.00, 6.00, 200, Math.PI/2, "rgb(180, 180, 180)");  //9-5
createSide2(startX1 - 13.50, startY1 - 8.00, 3.00, 200, 0, "rgb(180, 180, 180)");  //9-6-1
createSide2(startX1 - 18.50, startY1 - 8.00, 3.00, 200, 0, "rgb(180, 180, 180)");  //9-6-2
// ==========================================================================================================
// #10
createSide2(2.00+startX1 - 20.00,  2.00 -startY1 +3.00, 10.00, 200, Math.PI/2, "rgb(90, 94, 74)");  //10-1
createSide2(2.00+startX1 - 15.00, 2.00-startY1 - 2.00, 10.00, 200, 0, "rgb(90, 94, 74)");  //10-2
createSide2(2.00+startX1 - 10.00, 2.00-startY1 -1.00, 2.00, 200, Math.PI/2, "rgb(90, 94, 74)");  //10-3
createSide2(2.00+startX1 - 11.00, 2.00-startY1 +1.00, 2.00* (Math.pow(2,1/2)), 200, Math.PI/4, "rgb(90, 94, 74)");  //10-4
createSide2(2.00+startX1 - 12.00, 2.00-startY1 + 5.00, 6.00, 200, Math.PI/2, "rgb(90, 94, 74)");  //10-5
createSide2(2.00+startX1 - 13.50, 2.00-startY1 + 8.00, 3.00, 200, 0, "rgb(90, 94, 74)");  //10-6-1
createSide2(2.00+startX1 - 18.50, 2.00-startY1 + 8.00, 3.00, 200, 0, "rgb(90, 94, 74)");  //10-6-2
// ==========================================================================================================

createwall( -6.00 * (Math.pow(2,1/2)) -8.00, -6.00 * (Math.pow(2,1/2))-7.00+ startY1, 14.00, 200, 0, "rgb(130, 157, 180)"); //w1
createwall( -3.00 * (Math.pow(2,1/2)) -16.50, -6.00 * (Math.pow(2,1/2))-5.00+ startY1, -3.00 + 6.00 * (Math.pow(2,1/2)), 200, 0, "rgb(130, 157, 180)");  //w2
createwall( -3.00 * (Math.pow(2,1/2)) -8.50, -6.00 * (Math.pow(2,1/2))-5.00+ startY1, 15.00 - 6.00 * (Math.pow(2,1/2)), 200, 0, "rgb(130, 157, 180)");  //w3
createwall( -18.00, -3.00 * (Math.pow(2,1/2))-10.50, -3.00 + 6.00 * (Math.pow(2,1/2)), 200, Math.PI/2, "rgb(130, 157, 180)"); // w4
createwall( -16.00, -3.00 * (Math.pow(2,1/2))-10.50, -3.00 + 6.00 * (Math.pow(2,1/2)), 200, Math.PI/2, "rgb(130, 157, 180)"); //w5
createwall(startX1 +14.00 +6.00 * (Math.pow(2,1/2)) ,  -6.00 * (Math.pow(2,1/2))-7.00+ startY1, 4.00, 200, 0, "rgb(130, 157, 180)"); //w6
createwall(startX1 +14.00 +6.00 * (Math.pow(2,1/2)) ,  -6.00 * (Math.pow(2,1/2))-5.00+ startY1, 4.00, 200, 0, "rgb(130, 157, 180)"); //w7
createwall(startX1 +20.00 +6.00 * (Math.pow(2,1/2)), 0, - 2 * startY1 + 12.00 * (Math.pow(2,1/2)), 200, Math.PI/2, "rgb(130, 157, 180)"); //w8
createwall(startX1 +22.00 +6.00 * (Math.pow(2,1/2)),-2.50 - 3.0 * (Math.pow(2,1/2)), - startY1 - 1.00 + 6.00 * (Math.pow(2,1/2)), 200, Math.PI/2, "rgb(130, 157, 180)"); //w9
createwall(startX1 +22.00 +6.00 * (Math.pow(2,1/2)), 2.50 + 3.00 * (Math.pow(2,1/2)), - startY1 - 1.00 + 6.00 * (Math.pow(2,1/2)), 200, Math.PI/2, "rgb(130, 157, 180)"); //w10
createSide3(startX1 +38.00 +5.00 * (Math.pow(2,1/2)), 2.50 + 3.00 * (Math.pow(2,1/2)), - startY1 - 1.00 + 6.00 * (Math.pow(2,1/2)), 200, Math.PI/2, "rgb(60, 75, 75)"); //w11
createSide3(startX1 +38.00 +5.00 * (Math.pow(2,1/2)),-2.50 - 3.00 * (Math.pow(2,1/2)), - startY1 - 1.00 + 6.00 * (Math.pow(2,1/2)), 200, Math.PI/2, "rgb(60, 75, 75)"); //w12
createwall(startX1 +30.00 +5.50 * (Math.pow(2,1/2)),-1.00,  16.00 - 1.00 * (Math.pow(2,1/2)), 200, 0, "rgb(130, 157, 180)"); //w13
createwall(startX1 +30.00 +5.50 * (Math.pow(2,1/2)),1.00,  16.00 - 1.00 * (Math.pow(2,1/2)), 200, 0, "rgb(130, 157, 180)");  //w14
createwall(startX1 + 2.00- 20.00 - 6.00 * (Math.pow(2,1/2)), 0, - 2 * startY1 + 12.00 * (Math.pow(2,1/2)), 200, Math.PI/2, "rgb(130, 157, 180)"); //w15
createwall(startX1 + 2.00- 30.00 -5.50 * (Math.pow(2,1/2)),1.00,  16.00 - 1.00 * (Math.pow(2,1/2)), 200, 0, "rgb(130, 157, 180)"); //w16
createwall(startX1 + 2.00- 30.00 - 5.50 * (Math.pow(2,1/2)),-1.00,  16.00 - 1.00 * (Math.pow(2,1/2)), 200, 0, "rgb(130, 157, 180)"); // w17
createwall(startX1 + 2.00- 22.00 - 6.00 * (Math.pow(2,1/2)),-2.50 - 3.00 * (Math.pow(2,1/2)), - startY1 - 1.00 + 6.00 * (Math.pow(2,1/2)), 200, Math.PI/2, "rgb(130, 157, 180)"); //w18
createwall(startX1 + 2.00- 22.00 - 6.00 * (Math.pow(2,1/2)), 2.50 + 3.00 * (Math.pow(2,1/2)), - startY1 - 1.00 + 6.00 * (Math.pow(2,1/2)), 200, Math.PI/2, "rgb(130, 157, 180)"); //w19
createSide3(startX1 + 2.00- 38.00 - 5.0 * (Math.pow(2,1/2)), 2.50 + 3.00 * (Math.pow(2,1/2)), - startY1 - 1.00 + 6.00 * (Math.pow(2,1/2)), 200, Math.PI/2, "rgb(60, 75, 75)"); //w20
createSide3(startX1 + 2.00- 38.00 - 5.00 * (Math.pow(2,1/2)),-2.50 - 3.00 * (Math.pow(2,1/2)), - startY1 - 1.00 + 6.00 * (Math.pow(2,1/2)), 200, Math.PI/2, "rgb(60, 75, 75)"); //w21
createwall(startX1 +13.00 + 3.00 * (Math.pow(2,1/2)),  -startY1 + 6.00 * (Math.pow(2,1/2)) + 0.50, 6.00 * (Math.pow(2,1/2)) + 6.00, 200, 0, "rgb(130, 157, 180)"); //w22
createwall(startX1 +13.00,  -startY1 + 6.00 * (Math.pow(2,1/2)) + 2.50, 6.00, 200, 0, "rgb(130, 157, 180)"); //w23
createwall(startX1 + 3.00 * (Math.pow(2,1/2)) + 17.00,  -startY1 + 6.00 * (Math.pow(2,1/2)) + 2.50 , -2.00 + 6.00 * (Math.pow(2,1/2)), 200, 0, "rgb(130, 157, 180)"); //w24
createwall(startX1 + 16.00,  13.75 + 3.00 * (Math.pow(2,1/2)) , 14.50 - 6.00 * (Math.pow(2,1/2)), 200, Math.PI/2, "rgb(130, 157, 180)"); //w25
createwall(startX1 + 18.00,  13.75 + 3.00 * (Math.pow(2,1/2)) , 14.50 - 6.00 * (Math.pow(2,1/2)), 200, Math.PI/2, "rgb(130, 157, 180)"); //w26
createwall(-15.50 - 3.00 * (Math.pow(2,1/2)), 8.00 + 6.00* (Math.pow(2,1/2)), -1.00 + 6.00* (Math.pow(2,1/2)), 200, 0, "rgb(130, 157, 180)"); //w27
createwall(-10.50-3.00 * (Math.pow(2,1/2)), 10.00 + 6.00* (Math.pow(2,1/2)), 9.00 + 6.00* (Math.pow(2,1/2)), 200, 0, "rgb(130, 157, 180)");//w28
createwall(-10.00, 8.00 + 6.00* (Math.pow(2,1/2)), 8.00, 200, 0, "rgb(130, 157, 180)"); //w29
createwall(-16.00, 11.00 + 3.00* (Math.pow(2,1/2)), 6.00* (Math.pow(2,1/2)) - 6.00, 200, Math.PI/2, "rgb(130, 157, 180)"); //w30
createwall(-14.00, 11.00 + 3.00* (Math.pow(2,1/2)), 6.00* (Math.pow(2,1/2)) - 6.00, 200, Math.PI/2, "rgb(130, 157, 180)"); //w31
createwall(startX1 + 4.00, startY1 + 5.00, 10.00, 200, Math.PI/2, "rgb(130, 157, 180)"); //w32
createwall(startX1 + 6.00, startY1 + 3.00, 6.00, 200, Math.PI/2, "rgb(130, 157, 180)"); //w33
createwall(startX1 + 6.00, startY1 + 9.00, 2.00, 200, Math.PI/2, "rgb(130, 157, 180)"); //w34
createwall(startX1 + 9.00, startY1 + 6.00, 6.00, 200, 0, "rgb(130, 157, 180)"); //w35
createwall(startX1 + 9.00, startY1 + 8.00, 6.00, 200, 0, "rgb(130, 157, 180)"); //w36

createdoor(startX1 +12.00 + 6.00 * (Math.pow(2,1/2)), -6.00 * (Math.pow(2,1/2))-6.00+ startY1, 2.00, 200, Math.PI/2); //d1
createdoor(startX1  - 6.00 * (Math.pow(2,1/2)), -6.00 * (Math.pow(2,1/2))-6.00+ startY1, 2.00, 200, Math.PI/2); //d2

createdoor(startX1 +16.00 +6.00 * (Math.pow(2,1/2)) ,  -6.00 * (Math.pow(2,1/2))-6.00+ startY1, 2.00, 200, Math.PI/2); //d4
createdoor(startX1 +21.00 +6.00 * (Math.pow(2,1/2)) ,  startY1 -6.00 * (Math.pow(2,1/2)), 2.00, 200, 0); //d5
createdoor(startX1 +21.00 +6.00 * (Math.pow(2,1/2)) ,  -startY1 + 6.00 * (Math.pow(2,1/2)), 2.00, 200, 0); //d6
createdoor(startX1 +16.00 +6.00 * (Math.pow(2,1/2)) ,  -startY1 + 6.00 * (Math.pow(2,1/2)) + 1.50, 2.00, 200, Math.PI/2); //d7
createdoor(-startX1 -16.00 -6.00 * (Math.pow(2,1/2)) ,  -6.00 * (Math.pow(2,1/2))-6.00+ startY1, 2.00, 200, Math.PI/2); //d8
createdoor(startX1 +10.00,  -startY1 + 6.00 * (Math.pow(2,1/2)) + 1.50, 2.00, 200, Math.PI/2); //d9
createdoor(-6.00, 9.00 + 6.00* (Math.pow(2,1/2)), 2.00, 200, Math.PI/2);  //d10
createdoor(-15.00 - 6.00 * (Math.pow(2,1/2)), 9.00 + 6.00* (Math.pow(2,1/2)), 2.00, 200, Math.PI/2); //d11
createdoor(startX1 + 5.00, startY1 + 0, 2.00, 200, 0);  //d12
createdoor(startX1 + 5.00, startY1 + 10.00, 2.00, 200, 0);  //d13

//============================================================
  // Create the camera.
  camera = new THREE.PerspectiveCamera(
  90, 1280/720, 0.1, 10000
  );
  camera.position.z = 0;
  camera.position.y = 50;
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
  controls.minDistance = 6; // Set our min zoom in distance (mouse scroll)
  controls.target.copy( new THREE.Vector3( 0, characterSize/2, 0 ) );

  document.addEventListener( 'mousedown', onDocumentMouseDown, false );
  document.addEventListener( 'touchstart', onDocumentTouchStart, false );
  //============================================================

}



/**
 * Create the floor of the scene.
 */

function createFloor() {
  var geometry = new THREE.PlaneBufferGeometry( 120, 80 );
  var material = new THREE.MeshPhongMaterial({ color: "rgb(100, 100, 100)" });
  var plane = new THREE.Mesh( geometry, material );
  plane.rotation.x = -1 * Math.PI/2;
  plane.position.y = 0;
  scene.add( plane );
  objects.push( plane );
}

//============================================================
//wall floor2
createFloor2(4.00, 1.00, 2.00, 10.00, "rgb(130, 157, 180)");
createFloor2(8.00, 3.00, 6.00, 2.00, "rgb(130, 157, 180)");
createFloor2(13.00 + 6.00 * (Math.pow(2,1/2)), -10.00 - 6.00 * (Math.pow(2,1/2)), 4.00, 2.00, "rgb(130, 157, 180)");
createFloor2(-15.00, 15.50, 2.00, 2.50, "rgb(130, 157, 180)");
createFloor2(-15.00, 17.50, 9.00 + 6.00 * (Math.pow(2,1/2)), 2.00, "rgb(130, 157, 180)");
createFloor2(12.00 + 3.00 * (Math.pow(2,1/2)), 6.00 + 6.00 * (Math.pow(2,1/2)), 6.00 + 6.00 * (Math.pow(2,1/2)), 2.00, "rgb(130, 157, 180)");
createFloor2(16.00, 13.75 + 3.00 * (Math.pow(2,1/2)), 2.00, 14.50 -6.00 * (Math.pow(2,1/2)) , "rgb(130, 157, 180)");

createFloor2(20.00 + 6.00 * (Math.pow(2,1/2)), 0, 2.00, 8.00 + 12.00 * (Math.pow(2,1/2)), "rgb(130, 157, 180)");
createFloor2(-20.00 - 6.00 * (Math.pow(2,1/2)), 0, 2.00, 8.00 + 12.00 * (Math.pow(2,1/2)), "rgb(130, 157, 180)");
createFloor2(-8.00 - 6.00 * (Math.pow(2,1/2)), -10.00 - 6.00 * (Math.pow(2,1/2)), 14.00, 2.00, "rgb(130, 157, 180)");
createFloor2(-17.00, -10.50 - 3.00 * (Math.pow(2,1/2)), 2.00, -3.00 + 6.00 * (Math.pow(2,1/2)), "rgb(130, 157, 180)");

//============================================================
// #1
createFloor2(5.00, - 3.00 * (Math.pow(2,1/2)) - 4.00 , 12.00, 6.00 * (Math.pow(2,1/2)), "rgb(255, 255, 255)");
createFloor2(5.00, -10.00 - 6.00 * (Math.pow(2,1/2)) , 12.00 + 12.00 * (Math.pow(2,1/2)), 12.00, "rgb(255, 255, 255)");
createFloor2(5.00, - 9.00 * (Math.pow(2,1/2)) - 16.00 , 12.00, 6.00 * (Math.pow(2,1/2)), "rgb(255, 255, 255)");
//============================================================
// #2
createFloor2(20.00 + 6.00 * (Math.pow(2,1/2)), -9.50 - 6.00 * (Math.pow(2,1/2)) , 10.00, 11.00, "rgb(190, 195, 165)");
createFloor2(17.50 + 6.00 * (Math.pow(2,1/2)), -17.50 - 6.00 * (Math.pow(2,1/2)) , 5.00, 5.00, "rgb(190, 195, 165)");

//============================================================
// #3
createFloor2(20.00 + 6.00 * (Math.pow(2,1/2)), 9.50 + 6.00 * (Math.pow(2,1/2)) , 10.00, 11.00, "rgb(190, 195, 165)");
createFloor2(17.50 + 6.00 * (Math.pow(2,1/2)), 17.50 + 6.00 * (Math.pow(2,1/2)) , 5.00, 5.00, "rgb(190, 195, 165)");

//============================================================
// #4
createFloor2(-20.00 - 6.00 * (Math.pow(2,1/2)), - 9.50 - 6.00 * (Math.pow(2,1/2)) , 10.00, 11.00, "rgb(155, 110, 15)");
createFloor2(-17.50 - 6.00 * (Math.pow(2,1/2)), - 17.50 - 6.00 * (Math.pow(2,1/2)) , 5.00, 5.00, "rgb(155, 110, 15)");


//============================================================
// #5
createFloor2(-20.00 - 6.00 * (Math.pow(2,1/2)), 9.50 + 6.00 * (Math.pow(2,1/2)) , 10.00, 11.00, "rgb(155, 110, 15)");
createFloor2(-17.50 - 6.00 * (Math.pow(2,1/2)), 17.50 + 6.00 * (Math.pow(2,1/2)) , 5.00, 5.00, "rgb(155, 110, 15)");

//============================================================
// #6
createFloor2(4.00, 18.50, 10.00, 25.00, "rgb(91, 100, 110)");
createFloor2(-3.50, 18.50, 5.00, 15.00, "rgb(91, 100, 110)");
//============================================================
// #7
createFloor2(16.00, 26.00, 10.00, 10.0, "rgb(90, 94, 74)");
//============================================================
// #8
createFloor2(16.00, 6.00, 10.00, 10.00, "rgb(90, 94, 74)");
//============================================================
// #9
createFloor2(-17.00, -7.00, 8.00, 10.00, "rgb(255, 255, 255)");
createFloor2(-12.00, -3.00, 2.00, 2.00, "rgb(255, 255, 255)");

//============================================================
// #10
createFloor2(-15.00, 9.00, 8.00, 10.00, "rgb(90, 94, 74)");
createFloor2(-10.00, 5.00, 2.00, 2.00, "rgb(90, 94, 74)");

//============================================================
// rightest side
createFloor2(29.00 + 5.50 * (Math.pow(2,1/2)), 0, 16.00- 1.00 * (Math.pow(2,1/2)), 2.00, "rgb(130, 157, 180)");

//============================================================
// leftest side
createFloor2(-29.00 - 5.50 * (Math.pow(2,1/2)), 0, 16.00- 1.00 * (Math.pow(2,1/2)), 2.00, "rgb(130, 157, 180)");



function createFloor2(x, z, xsize, ysize, color) {
  var geometry = new THREE.PlaneBufferGeometry( xsize, ysize );
  var material = new THREE.MeshPhongMaterial({ color: color });
  var plane = new THREE.Mesh( geometry, material );
  plane.rotation.x = -1 * Math.PI/2;

  plane.position.y = 0.02;
  plane.position.x = x;
  plane.position.z = z;

  scene.add( plane );
  objects.push( plane );
}
//============================================================
// #1
createTriangle(-1.00, 4.00, -1.00, 4.00 + 6.00 * (Math.pow(2,1/2)), -1.00 - 6.00 * (Math.pow(2,1/2)) ,4.00 + 6.00 * (Math.pow(2,1/2)), "rgb(255, 255, 255)", 0, 1, 2);
createTriangle(11.00, 4.00, 11.00, 4.00 + 6.00 * (Math.pow(2,1/2)), 11.00 + 6.00 * (Math.pow(2,1/2)) ,4.00 + 6.00 * (Math.pow(2,1/2)), "rgb(255, 255, 255)", 0, 2, 1);
createTriangle(-1.00, 16.00 + 6.00 * (Math.pow(2,1/2)), -1.00, 16.00 + 12.00 * (Math.pow(2,1/2)), -1.00 - 6.00 * (Math.pow(2,1/2)) ,16.00 + 6.00 * (Math.pow(2,1/2)), "rgb(255, 255, 255)", 0, 1, 2);
createTriangle(11.00, 16.00 + 6.00 * (Math.pow(2,1/2)), 11.00, 16.00 + 12.00 * (Math.pow(2,1/2)), 11.00 + 6.00 * (Math.pow(2,1/2)) ,16.00 + 6.00 * (Math.pow(2,1/2)), "rgb(255, 255, 255)", 0, 2, 1);
//============================================================
// #2,3,4,5
createTriangle(20.00 + 6.00 * (Math.pow(2,1/2)),  20.00 + 6.00 * (Math.pow(2,1/2)), 25.00 + 6.00 * (Math.pow(2,1/2)),  15.00 + 6.00 * (Math.pow(2,1/2)), 20.00 + 6.00 * (Math.pow(2,1/2)),  15.00 + 6.00 * (Math.pow(2,1/2)), "rgb(255, 255, 236)", 0, 2, 1);
createTriangle(20.00 + 6.00 * (Math.pow(2,1/2)),  -20.00 - 6.00 * (Math.pow(2,1/2)), 25.00 + 6.00 * (Math.pow(2,1/2)),  -15.00 - 6.00 * (Math.pow(2,1/2)), 20.00 + 6.00 * (Math.pow(2,1/2)),  -15.00 - 6.00 * (Math.pow(2,1/2)), "rgb(255, 255, 236)", 0, 1, 2);
createTriangle(-20.00 - 6.00 * (Math.pow(2,1/2)),  -20.00 - 6.00 * (Math.pow(2,1/2)), -25.00 - 6.00 * (Math.pow(2,1/2)),  -15.00 - 6.00 * (Math.pow(2,1/2)), -20.00 - 6.00 * (Math.pow(2,1/2)),  -15.00 - 6.00 * (Math.pow(2,1/2)), "rgb(222, 158, 21)", 0, 2, 1);
createTriangle(-20.00 - 6.00 * (Math.pow(2,1/2)),  20.00 + 6.00 * (Math.pow(2,1/2)), -25.00 - 6.00 * (Math.pow(2,1/2)),  15.00 + 6.00 * (Math.pow(2,1/2)), -20.00 - 6.00 * (Math.pow(2,1/2)),  15.00 + 6.00 * (Math.pow(2,1/2)), "rgb(222, 158, 21)", 0, 1, 2);
//============================================================
// #6
createTriangle(-1.00, -6.00, -6.00, -11.00, -1.00, -11.00, "rgb(130, 143, 158)", 0, 1, 2);
createTriangle(-1.00, -31.00, -6.00, -26.00, -1.00, -26.00, "rgb(130, 143, 158)", 0, 2, 1);

createTriangle(-13.00, 6.00, -11.00, 4.00, -13.00, 4.00, "rgb(255, 255, 255)", 0, 2, 1);
createTriangle(-11.00, -8.00, -9.00, -6.00, -11.00, -6.00, "rgb(129, 135, 106)", 0, 1, 2);


function createTriangle(x1, y1, x2, y2, x3, y3, color, seq1, seq2, seq3) {
  var geometry = new THREE.Geometry();
  geometry.vertices.push(
    new THREE.Vector3(x1,y1,0),
    new THREE.Vector3(x2,y2,0),
    new THREE.Vector3(x3,y3,0)
  );
  geometry.faces.push(new THREE.Face3(seq1,seq2,seq3));

  var material = new THREE.MeshBasicMaterial({color: color});
  var plane = new THREE.Mesh( geometry, material);
  plane.rotation.x = -1 * Math.PI/2;
  plane.position.y = 0.02;
  scene.add( plane );
}

createTable("rgb(78, 132, 159)", -1, 0, -16-6 *(Math.pow(2,1/2)) );
createTable("rgb(78, 132, 159)", 11, 0, -16-6 *(Math.pow(2,1/2)) );
createTable("rgb(78, 132, 159)", 5, 0, -10-6 *(Math.pow(2,1/2)) );
createTable("rgb(78, 132, 159)", -1, 0, -4-6 *(Math.pow(2,1/2)) );
createTable("rgb(78, 132, 159)", 11, 0, -4-6 *(Math.pow(2,1/2)) );

function createTable(color, x, y, z) {
  var geometry = new THREE.CylinderGeometry(3, 3, 0.75, 10);
  var material = new THREE.MeshBasicMaterial({color: color});
  var plane = new THREE.Mesh( geometry, material);
  plane.position.x = x;
  plane.position.y = y;
  plane.position.z = z;
  scene.add( plane );
}

/**
 * Create a happy little tree.
 */
function createSide1( posX, posZ, zlength ) {
  // Set some random values so our trees look different.
  var randomScale =1;
  var randomRotateY = Math.PI/( Math.floor(( Math.random() * 32) + 1 ));

  // Create the trunk.
  var geometry = new THREE.BoxGeometry( characterSize/3.5, 2, zlength, 8 ); //200은 높이
  var material = new THREE.MeshPhongMaterial( {color: "rgb(60, 75, 75)"
  } );


  var trunk = new THREE.Mesh( geometry, material );
  trunk.position.set(posX, 1, posZ);
  trunk.scale.x = trunk.scale.y = trunk.scale.z = randomScale;
  scene.add( trunk );

  calculateCollisionPoints( trunk, randomScale );

  // Create the trunk outline.



}

function createSide2( posX, posZ, xlength, zlength, rotate, color ) {
  // Set some random values so our trees look different.
  var randomScale =1;
  var randomRotateY = Math.PI/( Math.floor(( Math.random() * 32) + 1 ));

  // Create the trunk.
  var textureLoader = new THREE.TextureLoader();
  crateTexture = textureLoader.load("crate0/corridor_wall.png");
  var geometry = new THREE.BoxGeometry( xlength, 3, characterSize/3.5, 8 );
  var material = new THREE.MeshPhongMaterial( {color: color,
    map:crateTexture
  } );
  var trunk = new THREE.Mesh( geometry, material );
  trunk.position.set(posX, 1, posZ);
  trunk.scale.x = trunk.scale.y = trunk.scale.z = randomScale;
  trunk.rotation.y = rotate;

  scene.add( trunk );

  calculateCollisionPoints( trunk, randomScale );

  // Create the trunk outline.

}


function createSide3( posX, posZ, xlength, zlength, rotate, color ) {
  // Set some random values so our trees look different.
  var randomScale =1;
  var randomRotateY = Math.PI/( Math.floor(( Math.random() * 32) + 1 ));

  // Create the trunk.
  var geometry = new THREE.BoxGeometry( xlength, 3, characterSize/3.5, 8 );
  var material = new THREE.MeshPhongMaterial( {color: color } );
  var trunk = new THREE.Mesh( geometry, material );
  trunk.position.set(posX, 1, posZ);
  trunk.scale.x = trunk.scale.y = trunk.scale.z = randomScale;
  trunk.rotation.y = rotate;

  scene.add( trunk );

  calculateCollisionPoints( trunk, randomScale );

  // Create the trunk outline.

}
function createdoor( posX, posZ, xlength, zlength, rotate ) {
  // Set some random values so our trees look different.
  var randomScale =1;
  var randomRotateY = Math.PI/( Math.floor(( Math.random() * 32) + 1 ));
  var textureLoader = new THREE.TextureLoader();
  crateTexture = textureLoader.load("crate0/crate0_bump.jpg");
  var geometry = new THREE.BoxGeometry( xlength, 3, characterSize/3.5, 8 );
  var material = new THREE.MeshBasicMaterial( {color: "rgb(127, 127, 127)",
    map:crateTexture
  } );

  var trunk = new THREE.Mesh( geometry, material );
  trunk.position.set(posX, 1, posZ);
  trunk.scale.x = trunk.scale.y = trunk.scale.z = randomScale;
  trunk.rotation.y = rotate;

  scene.add( trunk );

  calculateCollisionPoints( trunk, randomScale );

  // Create the trunk outline.




  // Create outline.

}

function createwall( posX, posZ, xlength, zlength, rotate, color ) {
  // Set some random values so our trees look different.
  var randomScale =1;
  var randomRotateY = Math.PI/( Math.floor(( Math.random() * 32) + 1 ));

  var textureLoader = new THREE.TextureLoader();
  crateTexture = textureLoader.load("crate0/corridor_wall.png");
  var geometry = new THREE.BoxGeometry( xlength, 3, characterSize/3.5, 8 );
  var material = new THREE.MeshPhongMaterial( {color: color,
    map:crateTexture
  } );
  // Create the trunk.

  var trunk = new THREE.Mesh( geometry, material );
  trunk.position.set(posX, 1, posZ);
  trunk.scale.x = trunk.scale.y = trunk.scale.z = randomScale;
  trunk.rotation.y = rotate;

  scene.add( trunk );

  calculateCollisionPoints( trunk, randomScale );



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
  // If a single click was detected, starts the timer.
  if (clickTimer == null) {
    clickTimer = setTimeout(function () {
      clickTimer = null;
    }, 3.00);
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
    if (( Math.floor( location.position.x ) <= Math.floor( newPosX ) + 0.15 &&
          Math.floor( location.position.x ) >= Math.floor( newPosX ) - 0.15 ) &&
        ( Math.floor( location.position.z ) <= Math.floor( newPosZ ) + 0.15 &&
          Math.floor( location.position.z ) >= Math.floor( newPosZ ) - 0.15 )) {
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
  if ( camera.position.y < 0.1 ) {
    camera.position.y = 0.1;
  }

  // If any movement was added, run it!
  if ( movements.length > 0 ) {
    // Set an indicator point to destination.
    if ( scene.getObjectByName('indicator_top') === undefined ) {
      drawIndicator();
    } else {
      if ( indicatorTop.position.y > 0.10 ) {
        indicatorTop.position.y -= 0.03;
      } else {
        indicatorTop.position.y = 1.00;
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
            rotationPoint.position.x -= 0.01;
          } else {
            rotationPoint.position.x += 0.01;
          }
        }
        if ( bounds.zMin <= collisions[ index ].zMax && bounds.zMax >= collisions[ index ].zMin ) {
          // Determine the Z axis push.
          if (objectCenterZ > playerCenterZ) {
          rotationPoint.position.z -= 0.01;
          } else {
            rotationPoint.position.z += 0.01;
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
