import { Z as PLATFORM, $ as $window, _ as WebGL1Renderer, a0 as PerspectiveCamera, a1 as Scene, a2 as Clock, a3 as GLTFLoader, a4 as TextureLoader, s as sRGBEncoding, C as Color } from '../chunks/three-platformize.js';
import { T as TaobaoPlatform } from '../chunks/tabao-platform.js';
import { D as DemoMeshOpt, a as DemoPDBLoader, b as DemoSTLLoader, c as DemoTTFLoader, d as DemoBVHLoader, e as DemoFBXLoader, f as DemoLWOLoader, g as DemoMTLLoader, h as DemoEXRLoader, i as DemoOBJLoader, j as DemoSVGLoader, k as DemoRGBELoader, l as DemoGLTFLoader, m as DemoColladaLoader, n as DemoMeshQuantization, o as DemoThreeSpritePlayer, p as DemoHDRPrefilterTexture, q as DemoDeviceOrientationControls } from '../chunks/three-platformize-demo.js';

function _optionalChain(ops) { let lastAccessLHS = undefined; let value = ops[0]; let i = 1; while (i < ops.length) { const op = ops[i]; const fn = ops[i + 1]; i += 2; if ((op === 'optionalAccess' || op === 'optionalCall') && value == null) { return undefined; } if (op === 'access' || op === 'optionalAccess') { lastAccessLHS = value; value = fn(value); } else if (op === 'call' || op === 'optionalCall') { value = fn((...args) => value.call(lastAccessLHS, ...args)); lastAccessLHS = undefined; } } return value; }// index.ts

const DEMO_MAP = {
  // BasisLoader: DemoBasisLoader,
  MeshOpt: DemoMeshOpt,
  PDBLoader: DemoPDBLoader,
  STLLoader: DemoSTLLoader,
  TTFLoader: DemoTTFLoader,
  BVHLoader: DemoBVHLoader,
  FBXLoader: DemoFBXLoader,
  LWOLoader: DemoLWOLoader,
  MTLLoader: DemoMTLLoader,
  EXRLoader: DemoEXRLoader,
  OBJLoader: DemoOBJLoader,
  SVGLoader: DemoSVGLoader,
  RGBELoader: DemoRGBELoader,
  GLTFLoader: DemoGLTFLoader,
  ColladaLoader: DemoColladaLoader,
  MeshQuantization: DemoMeshQuantization,
  ThreeSpritePlayer: DemoThreeSpritePlayer,
  HDRPrefilterTexture: DemoHDRPrefilterTexture,
  DeviceOrientationControls: DemoDeviceOrientationControls
};

// @ts-ignore
Page({
  data: {
    showMenu: true,
    currItem: -1,
    menuList: [
      'GLTFLoader',
      'ThreeSpritePlayer',
      'DeviceOrientationControls',
      'RGBELoader',
      'SVGLoader',
      'OBJLoader',
      'MeshOpt',
      'EXRLoader',
      'HDRPrefilterTexture',
      'MTLLoader',
      'LWOLoader',
      'FBXLoader',
      'BVHLoader',
      'ColladaLoader',
      'MeshQuantization',
      'TTFLoader',
      'STLLoader',
      'PDBLoader',
    ]
  },

  onCanvasReady() {
    // @ts-ignore
    Promise.all([
      new Promise(resolve => my.createSelectorQuery().select('.canvas').boundingClientRect().exec(resolve)),
      new Promise((resolve, reject) => {
        my.createCanvas({
          id: 'gl',
          success: resolve,
          fail: reject
        });
      })
    ])
      .then(([res, canvas]) => this.initCanvas(canvas, res[0]))
      .catch(() => my.alert({ content: '初始canvas失败' }));
  },

  onMenuClick() {
    this.setData({ showMenu: !this.data.showMenu });
  },

  async onMenuItemClick(e) {
    if (this.switchingItem) return
    this.switchingItem = true;

    const { i, item } = e.currentTarget.dataset;

    try {
      my.showLoading();
      const demo = new (DEMO_MAP[item])(this.deps) ;
      await demo.init();

      _optionalChain([(this.currDemo ), 'optionalAccess', _ => _.dispose, 'call', _2 => _2()]);
      this.currDemo = demo;
      this.setData({ currItem: i, showMenu: false });
      this.switchingItem = false;
    } catch (error) {
      console.error(error);
      // @ts-ignore
      my.alert({ content: error + ':' + JSON.stringify(error)});
    } finally {
      my.hideLoading();
    }
  },

  initCanvas(canvas, canvasRect) {
    try {
      this.platform = new TaobaoPlatform(canvas);
      PLATFORM.set(this.platform);

      console.log($window.innerWidth, $window.innerHeight);
      console.log(canvas.width, canvas.height);

      const canW = Math.round(canvasRect.width * 1.01); // 确保填满屏幕
      const canH = Math.round(canvasRect.height * 1.01);
      const renderer = new WebGL1Renderer({ canvas, antialias: false, alpha: true });
      const camera = new PerspectiveCamera(75, canW / canH, 0.1, 1000);
      const scene = new Scene();
      const clock = new Clock();
      const gltfLoader = new GLTFLoader();
      const textureLoader = new TextureLoader();

      this.deps = { renderer, camera, scene, clock, gltfLoader, textureLoader };

      scene.position.z = -3;
      renderer.outputEncoding = sRGBEncoding;
      renderer.setPixelRatio($window.devicePixelRatio);
      renderer.setSize(canW, canH);

      scene.background = new Color(0xffffff);
      // const geo = new PlaneBufferGeometry()
      // const mat = new MeshBasicMaterial({ color: 0x123456 })
      // scene.add(new Mesh(geo, mat))

      const render = () => {
        if (this.disposing) return
        canvas.requestAnimationFrame(render);
        _optionalChain([(this.currDemo ), 'optionalAccess', _3 => _3.update, 'call', _4 => _4()]);
        renderer.render(scene, camera);
      };

      render();
    } catch (error) {
      console.error(error);
      // @ts-ignore
      my.alert({ content: error + ':' + JSON.stringify(error) });
    }
  },

  onTX(e) {
    this.platform.dispatchTouchEvent(e);
  },

  onUnload() {
    this.disposing = true;
    _optionalChain([this, 'access', _5 => _5.currDemo, 'optionalAccess', _6 => _6.dispose, 'call', _7 => _7()]);
    PLATFORM.dispose();
  }
});
