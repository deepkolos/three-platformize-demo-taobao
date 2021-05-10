// index.ts
import { $window, Clock, PerspectiveCamera, PLATFORM, Scene, sRGBEncoding, TextureLoader, WebGL1Renderer, Color, BoxGeometry, MeshBasicMaterial, Mesh, PlaneBufferGeometry } from 'three-platformize'
import { TaobaoPlatform } from 'three-platformize/src/TaobaoPlatform'
import { GLTFLoader } from 'three-platformize/examples/jsm/loaders/GLTFLoader'
import { DemoGLTFLoader, DemoThreeSpritePlayer, DemoDeviceOrientationControls, DemoRGBELoader, DemoSVGLoader, DemoOBJLoader, DemoMeshOpt, DemoEXRLoader, DemoHDRPrefilterTexture, DemoMTLLoader, DemoLWOLoader, DemoFBXLoader, DemoBVHLoader, DemoColladaLoader, DemoMeshQuantization, DemoTTFLoader, DemoSTLLoader, DemoPDBLoader } from 'three-platformize-demo/dist/index'

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
}

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
        })
      })
    ])
      .then(([res, canvas]) => this.initCanvas(canvas, res[0]))
      .catch(() => my.alert({ content: '初始canvas失败' }))
  },

  onMenuClick() {
    this.setData({ showMenu: !this.data.showMenu })
  },

  async onMenuItemClick(e) {
    if (this.switchingItem) return
    this.switchingItem = true

    const { i, item } = e.currentTarget.dataset;

    try {
      my.showLoading()
      const demo = new (DEMO_MAP[item])(this.deps);
      await demo.init();

      this.currDemo && this.currDemo.dispose()
      this.currDemo = demo;
      this.setData({ currItem: i, showMenu: false });
      this.switchingItem = false;
    } catch (error) {
      console.error(error)
      // @ts-ignore
      my.alert({ content: error + '' })
    } finally {
      my.hideLoading()
    }
  },

  initCanvas(canvas, canvasRect) {
    try {
      this.platform = new TaobaoPlatform(canvas);
      PLATFORM.set(this.platform);

      console.log($window.innerWidth, $window.innerHeight)
      console.log(canvas.width, canvas.height)

      const canW = Math.round(canvasRect.width * 1.01) // 确保填满屏幕
      const canH = Math.round(canvasRect.height * 1.01)
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

      const render = () => {
        if (this.disposing) return
        canvas.requestAnimationFrame(render);
        this.currDemo && this.currDemo.update()
        renderer.render(scene, camera);
      }

      render()
    } catch (error) {
      // @ts-ignore
      my.alert({ content: error + '' })
    }
  },

  onTX(e) {
    this.platform.dispatchTouchEvent(e)
  },

  onUnload() {
    this.disposing = true;
    this.currDemo && this.currDemo.dispose()
    PLATFORM.dispose()
  }
})
