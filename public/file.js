// function setup() {
//   createCanvas(windowWidth, windowHeight);
// }

// function draw() {
//   // Dividir el ancho de la ventana entre dos
//   var w = width / 2;
  
//   // Gráfico a la izquierda
//   fill(255, 0, 0);
//   rect(0, 0, w, height);
  
//   // Gráfico a la derecha
//   fill(0, 0, 255);
//   rect(w, 0, w, height);
// }
// function setup() {
//   createCanvas(400, 400);
//   background(220);
// }

// function draw() {
//   for (let i = 0; i < 50; i++) {
//     let x = i * 8;
//     let y = random(height);
//     point(x, y);
//   }
// }


// let values = []; // array para almacenar los valores aleatorios
// let numValues = 100; // número de valores aleatorios
// let margin = 50; // margen para la gráfica
// let canvasWidth = 600; // ancho del lienzo
// let canvasHeight = 400; // altura del lienzo

// function setup() {
//   createCanvas(canvasWidth * 2, canvasHeight); // creamos el lienzo con el doble de ancho
//   generateValues(); // generamos los valores aleatorios
//   drawGraph1(); // dibujamos la primera gráfica
//   drawGraph2(); // dibujamos la segunda gráfica
// }

// function draw() {
//   // en este caso no necesitamos actualizar las gráficas en cada frame
//   // por lo que dejamos esta función vacía
// }

// function generateValues() {
//   for (let i = 0; i < numValues; i++) {
//     values.push(random(canvasHeight - margin * 2) + margin); // generamos valores aleatorios entre los márgenes
//   }
// }

// function drawGraph1() {
//   // dibujamos la primera gráfica a la izquierda
//   strokeWeight(2);
//   stroke(0, 0, 255);
//   for (let i = 0; i < values.length; i++) {
//     let x = map(i, 0, values.length - 1, margin, canvasWidth - margin);
//     let y = map(values[i], 0, canvasHeight - margin * 2, canvasHeight - margin, margin);
//     point(x, y);
//   }
// }

// function drawGraph2() {
//   // dibujamos la segunda gráfica a la derecha
//   strokeWeight(2);
//   stroke(255, 0, 0);
//   for (let i = 0; i < values.length; i++) {
//     let x = map(i, 0, values.length - 1, canvasWidth + margin, canvasWidth * 2 - margin);
//     let y = map(values[i], 0, canvasHeight - margin * 2, canvasHeight - margin, margin);
//     point(x, y);
//   }
// }

// function setup() {
//   createCanvas(700, 700);
//   plot = new GPlot(this, 100,100, width, height);
//   plot.setTitleText("y = x * x");
//   plot.getXAxis().setAxisLabelText("x axis");
//   plot.getYAxis().setAxisLabelText("y axis");
    
//   plot.getYAxis().setNTicks(25);
//   plot.setXLim(-5, 5);
//   plot.setYLim(0, 25);
//   plot.setGridLineWidth(2);
//   plot.setGridLineColor(210);

//   plot.setLineColor(120);
//   plot.setLineWidth(1);

  
//   setFrameRate(1);
// }

// let x = -5;
// function draw() {
//   let y = x * x;
//   plot.addPoint(x,y);
//   plot.beginDraw();
//   plot.drawBackground();
// 	plot.drawBox();
//   plot.drawXAxis();
//   plot.drawYAxis();
// 	plot.drawTitle();
//   plot.drawGridLines(GPlot.BOTH);
//   plot.drawLines();
// 	plot.drawPoints();

//   plot.endDraw();
//   if (++x > 5) noLoop();
// }
let SIZE = 50; // Tamaño del sistema
let J = 1; // Constante de interacción
let kB = 1; // Constante de Boltzmann

let spin = [];

// Inicializar la configuración del sistema
function initializeSpin() {
  for (let i = 0; i < SIZE; i++) {
    spin[i] = [];
    for (let j = 0; j < SIZE; j++) {
      spin[i][j] = -1; // Todos los espines a -1
    }
  }
}

// Calcular la energía de un espín en una posición dada
function energy(i, j, H) {
  let e = -J * spin[i][j] * (spin[(i + 1) % SIZE][j] + spin[(i - 1 + SIZE) % SIZE][j] + spin[i][(j + 1) % SIZE] + spin[i][(j - 1 + SIZE) % SIZE]);
  e -= H * spin[i][j];
  return e;
}

// Calcular la magnetización del sistema
function magnetization() {
  let sum = 0;
  for (let i = 0; i < SIZE; i++) {
    for (let j = 0; j < SIZE; j++) {
      sum += spin[i][j];
    }
  }
  return sum / (SIZE * SIZE);
}

// Realizar un paso de Monte Carlo
function monteCarloStep(H, T) {
  let i = floor(random() * SIZE);
  let j = floor(random() * SIZE);
  let eOld = energy(i, j, H);
  spin[i][j] = -spin[i][j];
  let eNew = energy(i, j, H);
  let deltaE = eNew - eOld;
  if (deltaE > 0 && exp(-deltaE / (kB * T)) < random()) {
    // No se acepta el cambio
    spin[i][j] = -spin[i][j];
  }
}

// Realizar múltiples pasos de Monte Carlo
function simulate(H, T, nSteps) {
  let magnetizations = [];
  for (let step = 0; step < nSteps; step++) {
    monteCarloStep(H, T);
    magnetizations.push(magnetization());
  }
  return magnetizations;
}

// Uso de las funciones

let HValues = [];
let magnetizationValues = [];

function setup() {
  createCanvas(400, 400);
  initializeSpin();

  let minH = -2; // Valor mínimo de H
  let maxH = 2; // Valor máximo de H
  let numPoints = 100; // Número de puntos en el gráfico

  for (let i = 0; i <= numPoints; i++) {
    let H = map(i, 0, numPoints, minH, maxH);
    let magnetizations = simulate(H, 1, 10000);
    let avgMagnetization = magnetizations.reduce((a, b) => a + b) / magnetizations.length;
    HValues.push(H);
    magnetizationValues.push(avgMagnetization);
  }

  // Dibujar el gráfico
  background(220);
  drawGraph();
}

function draw() {
  // No se necesita hacer nada
}
