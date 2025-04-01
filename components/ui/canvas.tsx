// Define proper types for our canvas animation
interface NoiseParams {
  phase?: number;
  offset?: number;
  frequency?: number;
  amplitude?: number;
}

interface Noise {
  phase: number;
  offset: number;
  frequency: number;
  amplitude: number;
  init(params: NoiseParams): void;
  update(): number;
  value(): number;
}

interface LineParams {
  spring: number;
}

interface NodeType {
  x: number;
  y: number;
  vx: number;
  vy: number;
}

interface LineType {
  spring: number;
  friction: number;
  nodes: NodeType[];
  init(params: LineParams): void;
  update(): void;
  draw(): void;
}

interface CanvasConfig {
  debug: boolean;
  friction: number;
  trails: number;
  size: number;
  dampening: number;
  tension: number;
}

interface CanvasRenderingContext2DExtended extends CanvasRenderingContext2D {
  running?: boolean;
  frame?: number;
}

interface Position {
  x: number;
  y: number;
}

// Implement the Noise constructor with proper typing
class NoiseConstructor implements Noise {
  phase: number = 0;
  offset: number = 0;
  frequency: number = 0.001;
  amplitude: number = 1;

  constructor(params: NoiseParams = {}) {
    this.init(params);
  }

  init(params: NoiseParams): void {
    this.phase = params.phase || 0;
    this.offset = params.offset || 0;
    this.frequency = params.frequency || 0.001;
    this.amplitude = params.amplitude || 1;
  }

  update(): number {
    this.phase += this.frequency;
    return this.offset + Math.sin(this.phase) * this.amplitude;
  }

  value(): number {
    return e;
  }
}

// Node constructor with proper typing
class NodeConstructor implements NodeType {
  x: number = 0;
  y: number = 0;
  vx: number = 0;
  vy: number = 0;
}

// Line constructor with proper typing
class LineConstructor implements LineType {
  spring: number = 0;
  friction: number = 0;
  nodes: NodeType[] = [];

  constructor(params: LineParams) {
    this.init(params);
  }

  init(params: LineParams): void {
    this.spring = params.spring + 0.1 * Math.random() - 0.05;
    this.friction = E.friction + 0.01 * Math.random() - 0.005;
    this.nodes = [];
    for (let n = 0; n < E.size; n++) {
      const t = new NodeConstructor();
      t.x = pos.x;
      t.y = pos.y;
      this.nodes.push(t);
    }
  }

  update(): void {
    let e = this.spring,
      t = this.nodes[0];
    t.vx += (pos.x - t.x) * e;
    t.vy += (pos.y - t.y) * e;
    for (var n, i = 0, a = this.nodes.length; i < a; i++) {
      t = this.nodes[i];
      if (i > 0) {
        n = this.nodes[i - 1];
        t.vx += (n.x - t.x) * e;
        t.vy += (n.y - t.y) * e;
        t.vx += n.vx * E.dampening;
        t.vy += n.vy * E.dampening;
      }
      t.vx *= this.friction;
      t.vy *= this.friction;
      t.x += t.vx;
      t.y += t.vy;
      e *= E.tension;
    }
  }

  draw(): void {
    let e,
      t,
      n = this.nodes[0].x,
      i = this.nodes[0].y;
    ctx.beginPath();
    ctx.moveTo(n, i);
    for (var a = 1, o = this.nodes.length - 2; a < o; a++) {
      e = this.nodes[a];
      t = this.nodes[a + 1];
      n = 0.5 * (e.x + t.x);
      i = 0.5 * (e.y + t.y);
      ctx.quadraticCurveTo(e.x, e.y, n, i);
    }
    e = this.nodes[a];
    t = this.nodes[a + 1];
    ctx.quadraticCurveTo(e.x, e.y, t.x, t.y);
    ctx.stroke();
    ctx.closePath();
  }
}

function onMousemove(e: MouseEvent | TouchEvent): void {
  function o(): void {
    lines = [];
    for (let e = 0; e < E.trails; e++) {
      lines.push(new LineConstructor({ spring: 0.45 + (e / E.trails) * 0.025 }));
    }
  }

  function c(e: MouseEvent | TouchEvent): void {
    if ('touches' in e) {
      pos.x = e.touches[0].pageX;
      pos.y = e.touches[0].pageY;
    } else {
      pos.x = (e as MouseEvent).clientX;
      pos.y = (e as MouseEvent).clientY;
    }
    e.preventDefault();
  }

  function l(e: TouchEvent): void {
    if (e.touches.length == 1) {
      pos.x = e.touches[0].pageX;
      pos.y = e.touches[0].pageY;
    }
  }

  document.removeEventListener("mousemove", onMousemove);
  document.removeEventListener("touchstart", onMousemove as EventListenerOrEventListenerObject);
  document.addEventListener("mousemove", c as EventListenerOrEventListenerObject);
  document.addEventListener("touchmove", c as EventListenerOrEventListenerObject);
  document.addEventListener("touchstart", l as EventListenerOrEventListenerObject);
  c(e);
  o();
  render();
}

function render(): void {
  if (ctx.running) {
    ctx.globalCompositeOperation = "source-over";
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.globalCompositeOperation = "lighter";
    ctx.strokeStyle = "hsla(" + Math.round(f.update()) + ",100%,50%,0.025)";
    ctx.lineWidth = 10;
    for (var t = 0; t < E.trails; t++) {
      const e = lines[t];
      e.update();
      e.draw();
    }
    ctx.frame!++;
    window.requestAnimationFrame(render);
  }
}

function resizeCanvas(): void {
  ctx.canvas.width = window.innerWidth - 20;
  ctx.canvas.height = window.innerHeight;
}

// Initialize our global variables with proper typing
var ctx: CanvasRenderingContext2DExtended,
  f: Noise,
  e = 0,
  pos: Position = { x: 0, y: 0 },
  lines: LineType[] = [],
  E: CanvasConfig = {
    debug: true,
    friction: 0.5,
    trails: 80,
    size: 50,
    dampening: 0.025,
    tension: 0.99,
  };

export const renderCanvas = function(): void {
  const canvas = document.getElementById("canvas") as HTMLCanvasElement;
  ctx = canvas.getContext("2d") as CanvasRenderingContext2DExtended;
  ctx.running = true;
  ctx.frame = 1;
  f = new NoiseConstructor({
    phase: Math.random() * 2 * Math.PI,
    amplitude: 85,
    frequency: 0.0015,
    offset: 285,
  });
  
  document.addEventListener("mousemove", onMousemove as EventListenerOrEventListenerObject);
  document.addEventListener("touchstart", onMousemove as EventListenerOrEventListenerObject);
  document.body.addEventListener("orientationchange", resizeCanvas);
  window.addEventListener("resize", resizeCanvas);
  
  window.addEventListener("focus", () => {
    if (!ctx.running) {
      ctx.running = true;
      render();
    }
  });
  
  window.addEventListener("blur", () => {
    ctx.running = true;
  });
  
  resizeCanvas();
}; 