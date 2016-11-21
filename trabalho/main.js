var particleSize = 10;
var width = 640;
var height = 480;
var grid = {x: width + 1,  y: height + 1, Xindex: (width/particleSize) - 1, Yindex: (height / particleSize) - 1};
var world = SVG('canvas').size(grid.x, grid.y);
var matrix = terrain = matrix(grid.Xindex, grid.Yindex, 0);
var p = 0.20;



// Create Terrain
var createTerrain = function(grid, particleSize, p, terrain) {
    for (i=0; i < (grid.x - 1 ) / particleSize; i++) {
        for (j=0; j < (grid.y - 1 ) / particleSize; j++) {

            // Check if particle exists on Terrain
            if (Math.random() < p) {
                var realPos = getRealPosition(i, j, grid, particleSize);
                var particle = world.rect(particleSize,particleSize).attr({ fill: '#8D6E63', x: realPos.x, y: realPos.y });
                terrain[j][i] = 1;
            }
        }
    }
}

createTerrain(grid, particleSize, p, terrain);


//// create particles
//for (i=0; i < 10; i++) {
//    randomPos = Math.floor((Math.random() * grid.Xindex) + 1);
//
//    var realPos = getRealPosition(randomPos, grid.Yindex, grid, particleSize);
//    var particle = world.rect(particleSize,particleSize).attr({ fill: '#f06', x: realPos.x, y: 0 });
//    particle.animate().move(realPos.x, realPos.y);
//
//    //filling matrix
//    matrix[0][randomPos] = 1;
//}


// create Rain Particle
function nextRainParticle() {
    //TODO: basicamente preciso criar esse tipo de animacao aqui
    //var animation = world.rect(10, 10).animate().move(150, 150).animate().move(40, 40).animate().move(50,50);
    randomPos = Math.floor((Math.random() * grid.Xindex) +1 );
    console.log(randomPos+"ola");

    var result = findNeighbor(matrix, randomPos);
    if (result) {
        var realPos = getRealPosition(randomPos, result.y, grid, particleSize);
        matrix[grid.Yindex - result.y][randomPos] = 1;
    } else {
        var realPos = getRealPosition(randomPos, grid.Yindex, grid, particleSize);
        matrix[0][randomPos] = 1;
    }

    var particle = world.rect(particleSize,particleSize).attr({ fill: '#0000ff', x: realPos.x, y: 0 });
    console.log(particle.animate().move(realPos.x, realPos.y));
}





//// create Random Particle
//function nextParticle() {
//    randomPos = Math.floor((Math.random() * grid.Xindex) +1 );
//
//    var result = findNeighbor(matrix, randomPos);
//    console.log(result);
//    if (result) {
//        var realPos = getRealPosition(randomPos, result.y, grid, particleSize);
//        matrix[grid.Yindex - result.y][randomPos] = 1;
//    } else {
//        var realPos = getRealPosition(randomPos, grid.Yindex, grid, particleSize);
//        matrix[0][randomPos] = 1;
//    }
//
//    var particle = world.rect(particleSize,particleSize).attr({ fill: '#0000ff', x: realPos.x, y: 0 });
//    particle.animate().move(realPos.x, realPos.y);
//}


document.getElementById("start").addEventListener("click", click);

function click() {
    var state = document.getElementById("start").innerHTML;

    if (state == "&gt;") {
        state = document.getElementById("start").innerHTML = "||";
        timer = setInterval(function () {
            nextRainParticle();
        }, 100);
    } else {
        state = document.getElementById("start").innerHTML = "&gt;";
        clearInterval(timer);
    }
}



// find a near neighbor
function findNeighbor(matrix, randomPos){
    for (i=matrix.length-1; i>=0; --i) {
        if  (matrix[i][randomPos] == 1) {
            console.log(randomPos);
            console.log("atual: " + matrix[i][randomPos]);
            console.log("antes: " + matrix[i][randomPos-1]);
            console.log("depois: " + matrix[i][randomPos+1]);
            //  (matrix[randomPos-1][i]) == 1 ||
            //  (matrix[randomPos+1][i]) == 1) {
            return {x: randomPos, y: matrix.length-(i+2)};
        }
    }
    return false;
}

// get real position based on matrix position
function getRealPosition(x, y, grid, particleSize) {
    var realPos = {x: (( (grid.x - particleSize )/ grid.Xindex ) * x)  ,
        y: (((grid.y - particleSize) / (grid.Yindex ) * y))
    };
    return realPos;
}

// create a 2d matrix to fill grid
function matrix( cols, rows, defaultValue){
    var arr = [];
    for(var i=0; i <= rows; i++){

        arr.push([]);
        arr[i].push( new Array(cols));

        for(var j=0; j <= cols; j++){
            arr[i][j] = defaultValue;
        }
    }
    return arr;
}

