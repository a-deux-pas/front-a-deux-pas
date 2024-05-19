import { Component, Input } from '@angular/core';
import { AdPostResponse } from '../../../../../shared/models/ad/ad-post-response.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cta-my-ad',
  standalone: true,
  imports: [
    CommonModule
  ],
  template: `
    <section class="my-ad-cta-encart flex-row  text-center" [ngClass]="{'mx-auto': !isBigScreen}">
            @switch (myAd?.status) {
            @case('AVAILABLE') {
            <b>En vente</b>
            }
            @case('RESERVED') {
            <b>Reservé</b>
            }
            @case('SOLD') {
            <b>Vendu</b>
            }
            @case('SUSPENDED') {
            <b>Suspendu</b>
            }
            }
            <div class="favorites mt-2">
                <img id="favorite-icon" src="assets/icons/navbar/favorites.webp" alt="icone-favoris">
                <p id="favorite-text">n’a pas encore tapé dans l’oeil d’un membre</p>
            </div>
            <div class="cta-btn-section mt-4 mb-1">
                <div class="flex-column">
                    <img class="cta-btn" src="assets/icons/buttons/edit-orange.webp" alt="bouton-modifier-annonce">
                    <p class="cta-btn-text">modifier</p>
                </div>
                <div class="flex-column">
                    <img class="cta-btn" src="assets/icons/buttons/trash.webp" alt="bouton-supprimer-annonce">
                    <p class="cta-btn-text">supprimer</p>
                </div>
            </div>
        </section>
  `,
  styleUrl: './cta-my-ad.component.scss'
})
export class CtaMyAdComponent {
  @Input() myAd!: AdPostResponse | undefined
  @Input() isBigScreen!: boolean;
}
