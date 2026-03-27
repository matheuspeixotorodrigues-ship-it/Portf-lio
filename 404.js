// --- 1. Efeito de Estrelas Nítidas (Neve Espacial) ---
const canvas = document.getElementById('starfield');
const ctx = canvas.getContext('2d');

let width, height;
let stars = [];
const numStars = 400; 
// Velocidade dinâmica (lenta no celular)
let speed = window.innerWidth <= 768 ? 0.8 : 2; 

function setCanvasSize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
}

class Star {
    constructor() { this.init(); }
    init() { this.x = (Math.random() - 0.5) * width * 2; this.y = (Math.random() - 0.5) * height * 2; this.z = Math.random() * width; }
    update() { this.z -= speed; if (this.z < 1) { this.init(); this.z = width; } }
    draw() {
        let k = 128 / this.z;
        let px = this.x * k + width / 2;
        let py = this.y * k + height / 2;
        if (px >= 0 && px <= width && py >= 0 && py <= height) {
            let size = (1 - this.z / width) * 2; ctx.fillStyle = `rgba(255, 255, 255, 1)`; ctx.beginPath(); ctx.arc(px, py, size, 0, Math.random() * Math.PI); ctx.fill();
        }
    }
}
function initStars() { stars = []; for (let i = 0; i < numStars; i++) { stars.push(new Star()); } }

// --- 2. Lua 3D Rotação Diagonal (NO para SE) ---
let scene, camera, renderer, moon;
const spinAxis = new THREE.Vector3(1, 1, 0).normalize();

function init3DMoon() {
    const container = document.getElementById('moon-box');
    const containerSize = window.innerWidth <= 768 ? window.innerWidth * 0.25 : window.innerWidth * 0.12; 
    scene = new THREE.Scene();
    camera = new THREE.OrthographicCamera( -1, 1, 1, -1, 0.1, 100 );
    camera.position.z = 10;
    scene.add(camera);
    renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(containerSize, containerSize); 
    container.appendChild(renderer.domElement);
    const geometry = new THREE.SphereGeometry( 0.9, 64, 64 ); 
    const textureCanvas = document.createElement('canvas');
    textureCanvas.width = 2048; textureCanvas.height = 1024; 
    const tCtx = textureCanvas.getContext('2d');
    tCtx.fillStyle = '#F4F4F8'; tCtx.fillRect(0, 0, 2048, 1024);
    const rLarge = 130, rMedium = 80, rSmall = 45; const colorBase = '#D6D6E0', colorDepth = '#C8C8D4';
    function drawVetorCrater(x, y, r) { tCtx.fillStyle = colorBase; tCtx.beginPath(); tCtx.arc(x, y, r, 0, 2 * Math.PI); tCtx.fill(); tCtx.fillStyle = colorDepth; tCtx.beginPath(); tCtx.arc(x - r * 0.25, y - r * 0.25, r * 0.75, 0, 2 * Math.PI); tCtx.fill(); }
    drawVetorCrater(1400, 512, rLarge); drawVetorCrater(1024, 300, rMedium); drawVetorCrater(700, 700, rSmall);
    drawVetorCrater(1700, 250, rSmall); drawVetorCrater(1900, 600, rMedium);
    drawVetorCrater(200, 512, rLarge); drawVetorCrater(500, 200, rMedium); drawVetorCrater(300, 800, rSmall);
    drawVetorCrater(850, 400, rSmall); drawVetorCrater(1150, 800, rMedium);
    const texture = new THREE.CanvasTexture(textureCanvas);
    texture.wrapS = THREE.RepeatWrapping; texture.wrapT = THREE.RepeatWrapping;
    const material = new THREE.MeshLambertMaterial({ map: texture, color: 0xffffff });
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8); scene.add(ambientLight);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.3); directionalLight.position.set(1, 1, 2); scene.add(directionalLight);
    moon = new THREE.Mesh( geometry, material );
    scene.add( moon );
}

function animate() {
    ctx.fillStyle = '#000000'; ctx.fillRect(0, 0, width, height);
    stars.forEach(star => { star.update(); star.draw(); });
    if (moon) moon.rotateOnWorldAxis(spinAxis, 0.005); 
    if (renderer) renderer.render(scene, camera);
    requestAnimationFrame(animate);
}

window.addEventListener('resize', () => {
    setCanvasSize();
    speed = window.innerWidth <= 768 ? 0.8 : 2; initStars();
    const containerSize = window.innerWidth <= 768 ? window.innerWidth * 0.25 : window.innerWidth * 0.12;
    if (renderer) renderer.setSize(containerSize, containerSize);
});

setCanvasSize(); initStars(); init3DMoon(); requestAnimationFrame(animate);

// --- 4. Transição Suave Mista e Profissional (Anti-Bug) ---
// Removemos a lógica de Fetch e DOMParser que estava bugando
const linksDeSaida = document.querySelectorAll('.back-btn, .logo');

linksDeSaida.forEach(link => {
    link.addEventListener('click', (event) => {
        // Trava o clique padrão para fazer a animação primeiro
        event.preventDefault(); 
        const urlDestino = link.closest('a').getAttribute('href');

        // 1. Faz a página atual (404) sumir suavemente (Fade out)
        document.body.style.transition = 'opacity 0.4s ease-out';
        document.body.style.opacity = '0';

        // 2. Redirecionamento normal e seguro após o fade out terminar
        setTimeout(() => {
            // window.location.replace substitui no histórico, sem histórico de volta
            window.location.replace(urlDestino);
        }, 400); 
    });
});