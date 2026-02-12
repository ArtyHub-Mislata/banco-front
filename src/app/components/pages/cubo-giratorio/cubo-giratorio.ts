import { Component, OnInit, OnDestroy, AfterViewInit, ElementRef, ViewChild } from '@angular/core';

class Vector2 {
  constructor(
    public x: number,
    public y: number,
  ) {}
}

class Vector3 {
  constructor(
    public x: number,
    public y: number,
    public z: number,
  ) {}
}

@Component({
  selector: 'app-cubo-giratorio',
  templateUrl: './cubo-giratorio.html',
  styleUrls: ['./cubo-giratorio.scss'],
})
export class CuboGiratorioComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('canvas', { static: true }) canvasRef!: ElementRef<HTMLCanvasElement>;

  public ctx!: CanvasRenderingContext2D;
  public animationId: number = 0;
  public isRunning: boolean = false;

  // Configuración del cubo
  private pantalla: string[][] = [];
  private readonly SIMBOLOS: string = '@@##~~€€¬¬OO**++';
  private readonly ESCALADO: number = 60;

  // Vertices del cubo (8 vertices)
  private verticesCubo: Vector3[] = [
    new Vector3(-1, -1, -1), // 0
    new Vector3(-1, 1, -1), // 1
    new Vector3(1, 1, -1), // 2
    new Vector3(1, -1, -1), // 3
    new Vector3(1, 1, 1), // 4
    new Vector3(1, -1, 1), // 5
    new Vector3(-1, -1, 1), // 6
    new Vector3(-1, 1, 1), // 7
  ];

  // Triángulos que forman las caras (12 triángulos)
  private triangulosCubo: number[][] = [
    // Cara frontal
    [0, 1, 2],
    [0, 2, 3],
    // Cara derecha
    [3, 2, 4],
    [3, 4, 5],
    // Cara trasera
    [5, 4, 7],
    [5, 7, 6],
    // Cara izquierda
    [6, 7, 1],
    [6, 1, 0],
    // Cara superior
    [6, 0, 3],
    [6, 3, 5],
    // Cara inferior
    [1, 7, 4],
    [1, 4, 2],
  ];

  // Ángulos de rotación
  public rx: number = 0;
  public ry: number = 0;
  public rz: number = 0;

  // Tamaño de la pantalla (ajustado para canvas)
  private readonly PANTALLA_ANCHO: number = 249;
  private readonly PANTALLA_ALTO: number = 44;

  ngOnInit(): void {
    this.inicializarPantalla();
  }

  ngAfterViewInit(): void {
    this.inicializarCanvas();
    this.iniciarAnimacion();
  }

  ngOnDestroy(): void {
    this.detenerAnimacion();
  }

  private inicializarPantalla(): void {
    this.pantalla = [];
    for (let i = 0; i < this.PANTALLA_ALTO; i++) {
      this.pantalla[i] = [];
      for (let j = 0; j < this.PANTALLA_ANCHO; j++) {
        this.pantalla[i][j] = ' ';
      }
    }
  }

  private inicializarCanvas(): void {
    const canvas = this.canvasRef.nativeElement;
    canvas.width = this.PANTALLA_ANCHO * 4; // Escalar para mejor visualización
    canvas.height = this.PANTALLA_ALTO * 8;

    this.ctx = canvas.getContext('2d')!;
    this.ctx.font = '8px monospace';
    this.ctx.textBaseline = 'top';
  }

  private iniciarAnimacion(): void {
    this.isRunning = true;
    this.animar();
  }

  private detenerAnimacion(): void {
    this.isRunning = false;
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
    }
  }

  private animar(): void {
    if (!this.isRunning) return;

    this.vaciarPantalla();
    this.dibujarCubo(this.rx, this.ry, this.rz);
    this.imprimirEnCanvas();

    // Actualizar ángulos de rotación
    this.rx += 0.025;
    this.ry += 0.025;
    this.rz += 0.025;

    this.animationId = requestAnimationFrame(() => this.animar());
  }

  private vaciarPantalla(): void {
    for (let i = 0; i < this.PANTALLA_ALTO; i++) {
      for (let j = 0; j < this.PANTALLA_ANCHO; j++) {
        this.pantalla[i][j] = ' ';
      }
    }
  }

  private imprimirEnCanvas(): void {
    const canvas = this.canvasRef.nativeElement;
    this.ctx.clearRect(0, 0, canvas.width, canvas.height);

    const charWidth = canvas.width / this.PANTALLA_ANCHO;
    const charHeight = canvas.height / this.PANTALLA_ALTO;

    for (let i = 0; i < this.PANTALLA_ALTO; i++) {
      for (let j = 0; j < this.PANTALLA_ANCHO; j++) {
        const char = this.pantalla[i][j];
        if (char !== ' ') {
          this.ctx.fillStyle = this.obtenerColorParaSimbolo(char);
          this.ctx.fillText(char, j * charWidth, i * charHeight);
        }
      }
    }
  }

  private obtenerColorParaSimbolo(simbolo: string): string {
    const colores: { [key: string]: string } = {
      '@': '#ff6b6b',
      '#': '#4ecdc4',
      '~': '#45b7d1',
      '€': '#96ceb4',
      '¬': '#ffeaa7',
      O: '#dfe6e9',
      '*': '#fab1a0',
      '+': '#a29bfe',
    };

    return colores[simbolo] || '#ffffff';
  }

  private dibujarCubo(rx: number, ry: number, rz: number): void {
    for (let i = 0; i < this.triangulosCubo.length; i++) {
      const verticesTransformados: Vector3[] = new Array(3);

      for (let j = 0; j < 3; j++) {
        const verticeOriginal = this.verticesCubo[this.triangulosCubo[i][j]];
        verticesTransformados[j] = new Vector3(
          verticeOriginal.x,
          verticeOriginal.y,
          verticeOriginal.z,
        );

        this.rotarAlrededorDeX(verticesTransformados[j], rx);
        this.rotarAlrededorDeY(verticesTransformados[j], ry);
        this.rotarAlrededorDeZ(verticesTransformados[j], rz);

        verticesTransformados[j].z += 8;
        verticesTransformados[j].y *= this.ESCALADO;
        verticesTransformados[j].x *= this.ESCALADO * 3;
      }

      const puntosProyectados: Vector2[] = new Array(3);
      for (let j = 0; j < 3; j++) {
        puntosProyectados[j] = this.proyectar(verticesTransformados[j]);
      }

      this.dibujarTriangulo(
        puntosProyectados[0],
        puntosProyectados[1],
        puntosProyectados[2],
        this.SIMBOLOS.charAt(i % this.SIMBOLOS.length),
      );
    }
  }

  private rotarAlrededorDeY(vector3: Vector3, angulo: number): void {
    const x = Math.cos(angulo) * vector3.x + Math.sin(angulo) * vector3.z;
    const z = -Math.sin(angulo) * vector3.x + Math.cos(angulo) * vector3.z;
    vector3.x = x;
    vector3.z = z;
  }

  private rotarAlrededorDeX(vector3: Vector3, angulo: number): void {
    const y = Math.cos(angulo) * vector3.y - Math.sin(angulo) * vector3.z;
    const z = Math.sin(angulo) * vector3.y + Math.cos(angulo) * vector3.z;
    vector3.y = y;
    vector3.z = z;
  }

  private rotarAlrededorDeZ(vector3: Vector3, angulo: number): void {
    const x = Math.cos(angulo) * vector3.x - Math.sin(angulo) * vector3.y;
    const y = Math.sin(angulo) * vector3.x + Math.cos(angulo) * vector3.y;
    vector3.x = x;
    vector3.y = y;
  }

  private proyectar(vector3: Vector3): Vector2 {
    return new Vector2(
      Math.round(vector3.x / vector3.z + this.PANTALLA_ANCHO / 2),
      Math.round(vector3.y / vector3.z + this.PANTALLA_ALTO / 2),
    );
  }

  private dibujarTrianguloBajoRecto(t: Vector2, b0: Vector2, b1: Vector2, simbolo: string): void {
    let xb = t.x;
    let xe = t.x;

    const X_DEC_0 = (t.x - b0.x) / (b0.y - t.y);
    const X_DEC_1 = (t.x - b1.x) / (b1.y - t.y);

    const y_b = Math.floor(t.y);
    const y_e = Math.floor(b0.y + 1);

    for (let i = y_b; i < y_e; i++) {
      this.dibujarLineaEscaneada(i, Math.round(xb), Math.round(xe), simbolo);
      xb -= X_DEC_0;
      xe -= X_DEC_1;
    }
  }

  private dibujarTrianguloAltoRecto(t0: Vector2, t1: Vector2, b: Vector2, simbolo: string): void {
    let xb = t0.x;
    let xe = t1.x;

    const X_INC_0 = (b.x - t0.x) / (b.y - t0.y);
    const X_INC_1 = (b.x - t1.x) / (b.y - t1.y);

    const y_b = Math.floor(t0.y);
    const y_e = Math.floor(b.y + 1);

    for (let i = y_b; i < y_e; i++) {
      this.dibujarLineaEscaneada(i, Math.round(xb), Math.round(xe), simbolo);
      xb += X_INC_0;
      xe += X_INC_1;
    }
  }

  private dibujarLineaEscaneada(y: number, x0: number, x1: number, simbolo: string): void {
    const left = Math.min(x0, x1);
    const right = Math.max(x0, x1);

    for (let i = left; i < right; i++) {
      if (y >= 0 && y < this.PANTALLA_ALTO && i >= 0 && i < this.PANTALLA_ANCHO) {
        this.pantalla[y][i] = simbolo;
      }
    }
  }

  private dibujarTriangulo(vec0: Vector2, vec1: Vector2, vec2: Vector2, simbolo: string): void {
    let v0 = vec0;
    let v1 = vec1;
    let v2 = vec2;

    // Ordenar vértices por Y ascendente
    if (v0.y > v1.y) {
      [v0, v1] = [v1, v0];
    }

    if (v1.y > v2.y) {
      [v1, v2] = [v2, v1];
    }

    if (v0.y > v1.y) {
      [v0, v1] = [v1, v0];
    }

    if (v2.y === v1.y) {
      this.dibujarTrianguloBajoRecto(v0, v1, v2, simbolo);
      return;
    }

    if (v0.y === v1.y) {
      this.dibujarTrianguloAltoRecto(v0, v1, v2, simbolo);
      return;
    }

    // Calcular punto medio
    const alpha = (v1.y - v0.y) / (v2.y - v0.y);
    const midpoint = new Vector2(v0.x + (v2.x - v0.x) * alpha, v1.y);

    this.dibujarTrianguloBajoRecto(v0, v1, midpoint, simbolo);
    this.dibujarTrianguloAltoRecto(v1, midpoint, v2, simbolo);
  }

  // Métodos públicos para controlar la animación
  toggleAnimacion(): void {
    if (this.isRunning) {
      this.detenerAnimacion();
    } else {
      this.iniciarAnimacion();
    }
  }

  reiniciar(): void {
    this.rx = 0;
    this.ry = 0;
    this.rz = 0;
  }
}
