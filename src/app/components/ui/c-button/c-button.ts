import { Component, HostBinding, Input } from '@angular/core';

@Component({
  selector: 'button[c-button], a[c-button]',
  imports: [],
  template: '<ng-content></ng-content>',
  styleUrl: './c-button.scss',
})
export class CButton {
    @Input() funcion: 'normal' | 'alternativa' | 'peligrosa' = 'normal';
    @Input() importancia: 'primaria' | 'secundaria' | 'terciaria' = 'primaria';
    @Input() tamano: 'pequeno' | 'mediano' | 'grande' = 'mediano';

    @HostBinding('class')
    get clazz(): Record<string, boolean> {
      return {
        'boton': true,
  
        'boton--funcion-normal': this.funcion === 'normal',
        'boton--funcion-alternativa': this.funcion === 'alternativa',
        'boton--funcion-peligrosa': this.funcion === 'peligrosa',
  
        'boton--importancia-primaria': this.importancia === 'primaria',
        'boton--importancia-secundaria': this.importancia === 'secundaria',
        'boton--importancia-terciaria': this.importancia === 'terciaria',

        'boton--tamano-pequeno': this.tamano === 'pequeno',
        'boton--tamano-mediano': this.tamano === 'mediano',
        'boton--tamano-grande': this.tamano === 'grande',
      };
    }
}
