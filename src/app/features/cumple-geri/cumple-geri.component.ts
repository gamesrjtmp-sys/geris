import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import confetti from 'canvas-confetti';

type ViewState = 'CAKE' | 'HUB' | 'NETFLIX' | 'COUPONS' | 'MUSEUM' | 'LETTER';;

@Component({
  selector: 'app-cumple-geri',  // <--- IMPORTANTE: Cambiado para no chocar con app-root
  standalone: true,
  imports: [CommonModule],
  // CORRECCIÓN AQUÍ: Usamos los nombres reales que salen en tu foto
  templateUrl: './cumple-geri.component.html',
  styleUrls: ['./cumple-geri.component.scss']
})
export class CumpleGeriComponent {
  // ... (Aquí va el resto de tu lógica igual que antes) ...
  currentView: ViewState = 'CAKE'; 
  isCandleBlown = false;
  isBlowing = false; // Nuevo: Detecta si estás soplando
  blowTimer: any;
  bgMusic = new Audio('assets/music/musica3.mp3');
  bgMusicCumple = new Audio('assets/music/musicacumple.mp3');
  bgMusicAudio1 = new Audio('assets/audio/audio1.mp3');

  originalChapters: any[] = [];
  carouselItems: any[] = [];

  selectedImage: string | null = null;

  museumArtworks = [
    { id: 1, title: '"La de cabello suelto, naturalmente hermosa."', year: 'En mi mente y corazón.', img: 'assets/images/proyeccion/parte2/6.jpeg' },
    { id: 2, title: '"Casual para ti, pero a mí me arregla el día una foto tuya."', year: 'En mi mente y corazón', img: 'assets/images/proyeccion/parte2/7.jpeg' },
    { id: 3, title: '"Simplemente tierna."', year: 'En mi mente y corazón', img: 'assets/images/proyeccion/parte2/15.jpeg' },
    { id: 4, title: '"Tu mirada coqueta me llena de mariposas."', year: 'En mi mente y corazón', img: 'assets/images/proyeccion/parte2/16.jpeg' },
    { id: 5, title: '"Tienes un no sé qué."', year: 'En mi mente y corazón', img: 'assets/images/proyeccion/parte2/19.jpeg' },
    { id: 6, title: '"Sonrisa de Oro"', year: 'En mi mente y corazón', img: 'assets/images/proyeccion/parte2/20.jpeg' },
    { id: 7, title: '"Tu versión con vestido y cabello suelto, mi favorita."', year: 'En mi mente y corazón', img: 'assets/images/proyeccion/parte2/21.jpeg' },
    { id: 7, title: '"Una mirada que ilumina mis días."', year: 'En mi mente y corazón', img: 'assets/images/proyeccion/parte2/22.jpeg' },
    { id: 7, title: '"Tu felicidad me hace feliz."', year: 'En mi mente y corazón', img: 'assets/images/proyeccion/parte2/23.jpeg' },
  ];

showIntroSequence = true;
  introTextVisible = false;
  curtainsAreOpening = false;

  ngOnInit() {
    // Al cargar, solo mostramos el texto después de 1 segundo
    setTimeout(() => {
      this.introTextVisible = true;
    }, 1000);
  }

  // ESTA FUNCIÓN SE ACTIVA AL HACER CLICK
  openCurtains() {
    this.bgMusicCumple.play().catch(e => console.log("Interacción necesaria para audio"));  
    if (this.curtainsAreOpening) return; // Evitar doble click

    // 1. Ocultamos el texto
    this.introTextVisible = false;
    
    // 2. Iniciamos la animación de las cortinas
    this.curtainsAreOpening = true;

    // 3. Reproducir música (Opcional: es un buen momento para iniciarla si quieres)
    // this.bgMusic.play().catch(() => {});

    // 4. Esperamos a que termine la animación (4s) para quitar el telón del HTML
    setTimeout(() => {
      this.showIntroSequence = false;
    }, 5000);
  }



  // Abrir la foto
  openImage(imgUrl: string) {
    this.selectedImage = imgUrl;
  }

  // Cerrar la foto
  closeImage() {
    this.selectedImage = null;
  }

  constructor() {
    // 2. Llamamos a la función que "fabrica" la lista al iniciar
    this.generateChapters();
    this.bgMusic.loop = true;
    this.bgMusic.volume = 0.5;
    
  }

  generateChapters() {
   const fotosParte2 = 34;
    
    const excluidos = [6, 7, 15, 16,19,20,21,22,23]; 

    for (let i = 1; i <= fotosParte2; i++) {
      
      // Si el número actual "i" está en la lista de excluidos, saltamos al siguiente
      if (excluidos.includes(i)) {
        continue; 
      }

      this.originalChapters.push({
        title: '',
        subtitle: `Recuerdo #${i}`,
        img: `assets/images/proyeccion/parte2/${i}.jpeg`
      });
    }

    this.carouselItems = [...this.originalChapters, ...this.originalChapters];
  }

  startShow() {
    this.bgMusic.pause();
    this.bgMusicAudio1.volume = 1;
    this.bgMusicAudio1.play();
  }

  startBlowing() {
    
    if (this.isCandleBlown) return;
    this.isBlowing = true;
    
    // Si mantienes presionado 1.5 segundos, se apagan
    this.blowTimer = setTimeout(() => {
      this.finishBlowing();
    }, 1500);
  }

  // Se activa si sueltas antes de tiempo
  stopBlowing() {
    if (this.isCandleBlown) return;
    this.isBlowing = false;
    clearTimeout(this.blowTimer); // Cancela el apagado
  }

  // Acción final: Éxito
  finishBlowing() {
    this.isBlowing = false;
    this.isCandleBlown = true;
    
    // Confeti suave
    this.launchSoftConfetti();
    
    // Música
    this.bgMusic.volume = 0.5;
    this.bgMusic.play().catch(() => {});
    this.fadeOutMusic();
    // Esperamos 5 segundos antes de cambiar de vista
    setTimeout(() => {
      this.currentView = 'HUB';
    }, 5000);
  }

  // Función para detener la música suavemente (Fade Out)
  fadeOutMusic() {
    const fadeAudio = setInterval(() => {
      // 1. Verificamos si el volumen es mayor a 0
      // (Usamos 0.05 como margen para evitar errores de decimales)
      if (this.bgMusicCumple.volume > 0.05) {
        this.bgMusicCumple.volume -= 0.05; // Bajamos el volumen un 5%
      } else {
        // 2. Cuando el volumen llega a 0 (o casi 0)
        clearInterval(fadeAudio);      // Detenemos el intervalo
        this.bgMusicCumple.pause();          // Pausamos la canción
        this.bgMusicCumple.volume = 1.0;     // Actualizamos el estado
      }
    }, 100); // Se repite cada 100ms (tardará unos 2 segundos en total)
  }

  // --- NAVEGACIÓN ---
  navigate(view: ViewState) { this.currentView = view; }

  launchSoftConfetti() {
   const duration = 3000;
  const end = Date.now() + duration;
  
  // CAMBIO: Colores más brillantes y dorados para resaltar en el negro
  const colors = ['#ff0055', '#ffcc00', '#ffffff', '#ff88aa']; 

  (function frame() {
    confetti({ 
      particleCount: 4, 
      angle: 60, 
      spread: 55, 
      origin: { x: 0 }, 
      colors, 
      scalar: 1.3, // Un poquito más grandes
      drift: 0.5,
      disableForReducedMotion: true
    });
    confetti({ 
      particleCount: 4, 
      angle: 120, 
      spread: 55, 
      origin: { x: 1 }, 
      colors, 
      scalar: 1.3, 
      drift: -0.5,
      disableForReducedMotion: true
    });
    
    if (Date.now() < end) requestAnimationFrame(frame);
  }());
  }

  goHome() {
    this.currentView = 'HUB';
  }

  goHome2() {
    this.currentView = 'HUB';
    this.bgMusic.volume = 0.5;
    this.bgMusic.play().catch(() => {});
    this.bgMusicAudio1.pause()
  }

  launchConfetti() {
    const duration = 3000;
    const end = Date.now() + duration;
    (function frame() {
      confetti({ particleCount: 5, angle: 60, spread: 55, origin: { x: 0 } });
      confetti({ particleCount: 5, angle: 120, spread: 55, origin: { x: 1 } });
      if (Date.now() < end) requestAnimationFrame(frame);
    }());
  }
}