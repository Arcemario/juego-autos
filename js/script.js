const ctx = pintura.getContext('2d');
const carretera = { x: 0, y: 0, width: 800, height: 400 };
let lineasCarretera = [0, 100, 200, 300];
let velocidadCarretera = 5;
let objetos = [
    { x: 100, y: -50, width: 40, height: 70, color: '#FF0000', velocidad: 2 },
    { x: 300, y: -150, width: 40, height: 70, color: '#FF7700', velocidad: 3 },
    { x: 500, y: -250, width: 40, height: 70, color: '#FF5500', velocidad: 1.5 }
];
let jugador = { x: 400, y: 300, width: 40, height: 70, color: '#00AAFF' };
let puntaje = 0;
let finJuego = false;
function colision(objeto1, objeto2) {
    return (
        objeto1.x < objeto2.x + objeto2.width &&
        objeto1.x + objeto1.width > objeto2.x &&
        objeto1.y < objeto2.y + objeto2.height &&
        objeto1.y + objeto1.height > objeto2.y
    );
}
function dibujarCarretera() {
    ctx.fillStyle = '#606060';
    ctx.fillRect(carretera.x, carretera.y, carretera.width, carretera.height);
    ctx.fillStyle = '#FFFFFF';
    lineasCarretera.forEach((lineaY) => {
        ctx.fillRect(carretera.width / 2 - 5, lineaY, 10, 50);
    });
    lineasCarretera = lineasCarretera.map((lineaY) => (lineaY + velocidadCarretera) % carretera.height);
}
function dibujarAuto(objeto) {
    ctx.fillStyle = objeto.color;
    ctx.fillRect(objeto.x, objeto.y, objeto.width, objeto.height);
    ctx.fillStyle = '#000000';
    ctx.fillRect(objeto.x + 5, objeto.y + 10, objeto.width - 10, objeto.height / 2);
    ctx.fillStyle = '#808080';
    ctx.fillRect(objeto.x + 5, objeto.y, 10, 5);
    ctx.fillRect(objeto.x + objeto.width - 15, objeto.y, 10, 5);
}
function actualizarPuntaje() {
    if (!finJuego) {
        puntaje++;
        document.getElementById('puntaje').textContent = `Puntaje: ${puntaje}`;
    }
}
function animate() {
    ctx.clearRect(0, 0, pintura.width, pintura.height);
    dibujarCarretera();
    objetos.forEach((objeto) => {
        dibujarAuto(objeto);
        objeto.y += objeto.velocidad;

        if (objeto.y > pintura.height) {
            objeto.y = -objeto.height;
            objeto.x = Math.random() * (carretera.width - objeto.width);
        }

        if (colision(jugador, objeto)) {
            alert('¡Game Over! Puntaje final: ' + puntaje);
            finJuego = true;
        }
    });
    dibujarAuto(jugador);
    if (!finJuego) requestAnimationFrame(animate);
}
pintura.addEventListener('mousemove', (info) => {
    const canvasRect = pintura.getBoundingClientRect();
    const mouseX = info.clientX - canvasRect.left;
    const mouseY = info.clientY - canvasRect.top;
    jugador.x = mouseX - jugador.width / 2; 
    jugador.y = mouseY - jugador.height / 2;
});
animate();
setInterval(actualizarPuntaje, 1000);
