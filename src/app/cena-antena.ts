// A torre da RARET em 3D. Carrega-se à parte (import dinâmico) depois de a página
// aparecer, para não atrasar a primeira pintura. Uma só malha instanciada para as
// barras da torre: poucas chamadas de desenho, leve no telemóvel.
import {
  Color,
  ConeGeometry,
  CylinderGeometry,
  DirectionalLight,
  Fog,
  GridHelper,
  Group,
  HemisphereLight,
  InstancedMesh,
  MathUtils,
  Matrix4,
  Mesh,
  MeshBasicMaterial,
  MeshStandardMaterial,
  PerspectiveCamera,
  Quaternion,
  Scene,
  SphereGeometry,
  SRGBColorSpace,
  TorusGeometry,
  Vector3,
  WebGLRenderer,
  type Material,
  type BufferGeometry,
} from "three";

const LARANJA = "#f28c28";
const AZUL = "#2f6fed";
const FUNDO = "#f7f4ef";

const TOPO_DA_TORRE = 8;
const LARGURA_BASE = 2.3;
const LARGURA_TOPO = 0.38;

type Ponto = [number, number, number];

function meiaLargura(y: number) {
  return MathUtils.lerp(LARGURA_BASE, LARGURA_TOPO, y / TOPO_DA_TORRE);
}

function cantos(y: number): Ponto[] {
  const w = meiaLargura(y);
  return [
    [w, y, w],
    [w, y, -w],
    [-w, y, -w],
    [-w, y, w],
  ];
}

function construirBarras() {
  const barras: { a: Ponto; b: Ponto; r: number }[] = [];
  const barra = (a: Ponto, b: Ponto, r: number) => barras.push({ a, b, r });

  // as quatro pernas
  cantos(0).forEach((c, i) => barra(c, cantos(TOPO_DA_TORRE)[i], 0.1));

  // níveis horizontais e as cruzes de cada face
  const niveis = [0, 1.7, 3.3, 4.7, 5.9, 7.0, TOPO_DA_TORRE];
  niveis.forEach((y, k) => {
    const c = cantos(y);
    if (k > 0) for (let i = 0; i < 4; i++) barra(c[i], c[(i + 1) % 4], 0.055);
    if (k < niveis.length - 1) {
      const d = cantos(niveis[k + 1]);
      for (let i = 0; i < 4; i++) {
        const j = (i + 1) % 4;
        barra(c[i], d[j], 0.038);
        barra(c[j], d[i], 0.038);
      }
    }
  });

  // os postes das duas varandas
  for (const [y, raio] of [
    [4.7, meiaLargura(4.7) * 1.75],
    [7.0, meiaLargura(7.0) * 2.1],
  ] as const) {
    for (let i = 0; i < 14; i++) {
      const a = (i / 14) * Math.PI * 2;
      const x = Math.cos(a) * raio;
      const z = Math.sin(a) * raio;
      barra([x, y, z], [x, y + 0.42, z], 0.022);
    }
  }

  // os cabos de amarração
  cantos(3.3).forEach(([x, y, z]) => barra([x, y, z], [x * 2.05, 0, z * 2.05], 0.018));

  // a escada, ao centro
  barra([0.18, 0, 0], [0.18, TOPO_DA_TORRE, 0], 0.02);
  barra([-0.18, 0, 0], [-0.18, TOPO_DA_TORRE, 0], 0.02);

  return barras;
}

export function iniciar(anfitriao: HTMLElement, aoPintar: () => void) {
  const renderer = new WebGLRenderer({ antialias: true, alpha: true, powerPreference: "low-power" });
  renderer.outputColorSpace = SRGBColorSpace;
  renderer.setClearColor(0x000000, 0);
  const canvas = renderer.domElement;
  canvas.setAttribute("aria-hidden", "true");
  anfitriao.appendChild(canvas);

  const cena = new Scene();
  cena.fog = new Fog(FUNDO, 30, 62);

  const camara = new PerspectiveCamera(30, 1, 0.1, 200);
  const alvo = new Vector3(0, 6.2, 0);

  cena.add(new HemisphereLight("#ffffff", "#e9ddcd", 2.4));
  const sol = new DirectionalLight("#ffffff", 2.2);
  sol.position.set(6, 12, 9);
  cena.add(sol);

  const descartaveis: (BufferGeometry | Material)[] = [];
  const guardar = <T extends BufferGeometry | Material>(x: T) => (descartaveis.push(x), x);

  // a grelha técnica no chão (o «CAD»)
  const grelha = new GridHelper(40, 40, AZUL, AZUL);
  const materiaisGrelha = Array.isArray(grelha.material) ? grelha.material : [grelha.material];
  materiaisGrelha.forEach((m) => {
    m.transparent = true;
    m.opacity = 0.18;
    m.depthWrite = false;
  });
  cena.add(grelha);

  // a torre
  const torre = new Group();
  cena.add(torre);

  const metal = guardar(new MeshStandardMaterial({ color: LARANJA, roughness: 0.55, metalness: 0.15 }));
  const barras = construirBarras();
  const cilindro = guardar(new CylinderGeometry(1, 1, 1, 7, 1));
  const instancias = new InstancedMesh(cilindro, metal, barras.length);
  const cima = new Vector3(0, 1, 0);
  const m = new Matrix4();
  const q = new Quaternion();
  const s = new Vector3();
  const p = new Vector3();
  barras.forEach(({ a, b, r }, i) => {
    const va = new Vector3(...a);
    const vb = new Vector3(...b);
    const dir = vb.clone().sub(va);
    const comprimento = dir.length();
    p.copy(va).addScaledVector(dir, 0.5);
    q.setFromUnitVectors(cima, dir.normalize());
    s.set(r, comprimento, r);
    m.compose(p, q, s);
    instancias.setMatrixAt(i, m);
  });
  torre.add(instancias);

  // varandas: piso e corrimão
  for (const [y, raio] of [
    [4.7, meiaLargura(4.7) * 1.75],
    [7.0, meiaLargura(7.0) * 2.1],
  ] as const) {
    const piso = new Mesh(guardar(new CylinderGeometry(raio, raio, 0.1, 40)), metal);
    piso.position.y = y;
    const corrimao = new Mesh(guardar(new TorusGeometry(raio, 0.035, 6, 48)), metal);
    corrimao.rotation.x = Math.PI / 2;
    corrimao.position.y = y + 0.42;
    torre.add(piso, corrimao);
  }

  // mastro, esfera e ponta
  const mastro = new Mesh(guardar(new CylinderGeometry(0.11, 0.16, 1.1, 10)), metal);
  mastro.position.y = TOPO_DA_TORRE + 0.55;
  const esfera = new Mesh(guardar(new SphereGeometry(0.34, 24, 16)), metal);
  esfera.position.y = TOPO_DA_TORRE + 1.35;
  const ponta = new Mesh(guardar(new ConeGeometry(0.07, 0.75, 10)), metal);
  ponta.position.y = TOPO_DA_TORRE + 2.0;
  torre.add(mastro, esfera, ponta);

  // sapatas
  const sapata = guardar(new CylinderGeometry(0.32, 0.4, 0.22, 8));
  cantos(0).forEach(([x, , z]) => {
    const pe = new Mesh(sapata, metal);
    pe.position.set(x, 0.11, z);
    torre.add(pe);
  });

  // as ondas: arcos azuis por cima da esfera, sempre de frente para quem vê
  const ondas = new Group();
  ondas.position.set(0, TOPO_DA_TORRE + 1.35, 0);
  cena.add(ondas);
  const ARCO = Math.PI * 0.62;
  const RAIOS = [1.25, 2.05, 2.9, 3.8];
  const arcos = RAIOS.map((raio, i) => {
    const mat = guardar(new MeshBasicMaterial({ color: new Color(AZUL), transparent: true, depthWrite: false }));
    const arco = new Mesh(guardar(new TorusGeometry(raio, 0.13 - i * 0.012, 8, 64, ARCO)), mat);
    arco.rotation.z = Math.PI / 2 - ARCO / 2;
    ondas.add(arco);
    return { arco, mat, i };
  });

  // enquadramento: a torre e as ondas cabem sempre, ao alto ou ao largo
  function enquadrar() {
    const w = anfitriao.clientWidth;
    const h = anfitriao.clientHeight;
    if (!w || !h) return;
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, w < 600 ? 1.5 : 1.75));
    renderer.setSize(w, h, false);
    camara.aspect = w / h;
    const meiaAltura = 8.2;
    const meiaLarguraVista = 5.4;
    const tg = Math.tan(MathUtils.degToRad(camara.fov / 2));
    const distancia = Math.max(meiaAltura / tg, meiaLarguraVista / (tg * camara.aspect));
    camara.position.set(0, alvo.y + 1.6, distancia);
    camara.lookAt(alvo);
    camara.updateProjectionMatrix();
  }
  enquadrar();
  const observarTamanho = new ResizeObserver(enquadrar);
  observarTamanho.observe(anfitriao);

  // rato e dedo: segue o ponteiro; arrastar roda a torre
  let alvoX = 0;
  let alvoY = 0;
  let arrasto = 0;
  let velocidade = 0;
  let ultimoX: number | null = null;
  const aoMover = (e: PointerEvent) => {
    alvoX = (e.clientX / window.innerWidth) * 2 - 1;
    alvoY = (e.clientY / window.innerHeight) * 2 - 1;
    if (ultimoX !== null) {
      const dx = e.clientX - ultimoX;
      velocidade = dx * 0.006;
      arrasto += velocidade;
      ultimoX = e.clientX;
    }
  };
  const aoCarregar = (e: PointerEvent) => {
    ultimoX = e.clientX;
  };
  const aoLargar = () => {
    ultimoX = null;
  };
  window.addEventListener("pointermove", aoMover, { passive: true });
  canvas.addEventListener("pointerdown", aoCarregar);
  window.addEventListener("pointerup", aoLargar);
  window.addEventListener("pointercancel", aoLargar);

  // só desenha quando está à vista e o separador está aberto
  let visivel = true;
  const observarVista = new IntersectionObserver(([e]) => {
    visivel = e.isIntersecting;
    if (visivel) pedir();
  });
  observarVista.observe(anfitriao);
  const aoMudarSeparador = () => {
    if (!document.hidden) pedir();
  };
  document.addEventListener("visibilitychange", aoMudarSeparador);

  let pedido = 0;
  let anterior = performance.now();
  let tempo = 0;
  let rodar = 0;
  let pintou = false;
  let rx = 0;
  let ry = 0;

  function pedir() {
    if (!pedido) pedido = requestAnimationFrame(desenhar);
  }

  function desenhar(agora: number) {
    pedido = 0;
    const dt = Math.min((agora - anterior) / 1000, 0.05);
    anterior = agora;
    tempo += dt;

    // rotação lenta, mais o arrasto com inércia, mais o que o scroll já andou
    if (ultimoX === null) {
      arrasto += velocidade;
      velocidade *= 0.92;
    }
    rodar += dt * 0.22;
    const caixa = anfitriao.getBoundingClientRect();
    const passou = MathUtils.clamp(-caixa.top / Math.max(caixa.height, 1), 0, 1.2);
    rx = MathUtils.lerp(rx, alvoY * 0.06, 0.06);
    ry = MathUtils.lerp(ry, alvoX * 0.45, 0.06);
    torre.rotation.y = rodar + arrasto + ry + passou * 1.6;
    torre.rotation.x = rx;
    grelha.rotation.y = torre.rotation.y;

    // um impulso a sair do mastro de 2,4 em 2,4 segundos
    const fase = (tempo % 2.4) / 2.4;
    arcos.forEach(({ arco, mat, i }) => {
      const onde = i / (arcos.length - 1);
      const brilho = Math.exp(-Math.pow((fase * 1.35 - onde) * 4.2, 2));
      mat.opacity = 0.22 + 0.78 * brilho - i * 0.03;
      const escala = 1 + brilho * 0.04;
      arco.scale.set(escala, escala, 1);
    });

    renderer.render(cena, camara);
    if (!pintou) {
      pintou = true;
      aoPintar();
    }
    if (visivel && !document.hidden) pedir();
  }
  pedir();

  return function parar() {
    cancelAnimationFrame(pedido);
    observarTamanho.disconnect();
    observarVista.disconnect();
    window.removeEventListener("pointermove", aoMover);
    canvas.removeEventListener("pointerdown", aoCarregar);
    window.removeEventListener("pointerup", aoLargar);
    window.removeEventListener("pointercancel", aoLargar);
    document.removeEventListener("visibilitychange", aoMudarSeparador);
    descartaveis.forEach((x) => x.dispose());
    materiaisGrelha.forEach((mm) => mm.dispose());
    grelha.geometry.dispose();
    renderer.dispose();
    canvas.remove();
  };
}
