import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import confetti from 'canvas-confetti';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule,RouterOutlet],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  isOpen = false;
  bgMusic = new Audio('assets/music/musica1.mp3'); // Asegúrate de poner una canción aquí

  constructor() {
    this.bgMusic.loop = true;
    this.bgMusic.volume = 0.5;
  }

  openEnvelope() {
    this.isOpen = true;
    
    // 1. Reproducir música (los navegadores requieren interacción del usuario primero)
    this.bgMusic.play().catch(e => console.log("Interacción necesaria para audio"));

    // 2. Lanzar Confeti
    this.launchConfetti();
  }

  launchConfetti() {
    const duration = 3000;
    const end = Date.now() + duration;

    (function frame() {
      confetti({
        particleCount: 5,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#ff0000', '#ffccd5']
      });
      confetti({
        particleCount: 5,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#ff0000', '#ffccd5']
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    }());
  }
}