var particleSize = 8;
var grid = {x: 481,  y: 401, Xindex: 59, Yindex: 49};
var world = SVG('canvas').size(grid.x, grid.y);
var matrix = matrix(grid.Xindex, grid.Yindex, 0);


// create particles
for (i=0; i < 10; i++) {
    randomPos = Math.floor((Math.random() * grid.Xindex) + 1);

    var realPos = getRealPosition(randomPos, grid.Yindex, grid, particleSize);
    var particle = world.rect(particleSize,particleSize).attr({ fill: '#f06', x: realPos.x, y: 0 });
    particle.animate().move(realPos.x, realPos.y);

    //filling matrix
    matrix[0][randomPos] = 1;
}

// create Random Particle
function nextParticle() {
    randomPos = Math.floor((Math.random() * grid.Xindex) +1 );

    var result = findNeighbor(matrix, randomPos);
    console.log(result);
    if (result) {
        var realPos = getRealPosition(randomPos, result.y, grid, particleSize);
        matrix[grid.Yindex - result.y][randomPos] = 1;
    } else {
        var realPos = getRealPosition(randomPos, grid.Yindex, grid, particleSize);
        matrix[0][randomPos] = 1;
    }

    var particle = world.rect(particleSize,particleSize).attr({ fill: '#0000ff', x: realPos.x, y: 0 });
    particle.animate().move(realPos.x, realPos.y);
}


document.getElementById("start").addEventListener("click", click);

function click() {
    var state = document.getElementById("start").innerHTML;

    if (state == "&gt;") {
        state = document.getElementById("start").innerHTML = "||";
        timer = setInterval(function () {
                nextParticle();
            }, 1000);
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

