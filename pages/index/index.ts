// index.ts
import { $requestAnimationFrame as requestAnimationFrame, $window as window, Clock, PerspectiveCamera, PLATFORM, Scene, sRGBEncoding, TextureLoader, WebGL1Renderer } from 'three-platformize'
import { TaobaoPlatform } from 'three-platformize/src/TaobaoPlatform'
import { GLTFLoader } from 'three-platformize/examples/jsm/loaders/GLTFLoader'
import { Demo } from '../../demos/Demo'
import { DemoGLTFLoader } from '../../demos/GLTFLoader'
import { DemoThreeSpritePlayer } from '../../demos/ThreeSpritePlayer'

const DEMO_MAP = {
  GLTFLoader: DemoGLTFLoader,
  ThreeSpritePlayer: DemoThreeSpritePlayer,
}

// @ts-ignore
Page({
  data: {
    showMenu: true,
    currItem: -1,
    menuList: [
      'GLTFLoader',
      'Raycaster',
      'DeviceOrientationControls',
      'ThreeSpritePlayer'
    ]
  },

  onCanvasReady() {
    // @ts-ignore
    my.createCanvas({
      id: 'gl',
      success: canvas => this.initCanvas(canvas),
    });
  },

  onMenuClick() {
    this.setData({ showMenu: !this.data.showMenu })
  },

  async onMenuItemClick(e) {
    if (this.switchingItem) return
    this.switchingItem = true

    const { i, item } = e.currentTarget.dataset;
    const demo = new (DEMO_MAP[item])(this.deps) as Demo;
    await demo.init();

    (this.currDemo as Demo)?.dispose()
    this.currDemo = demo;
    this.setData({ currItem: i, showMenu: false })
    this.switchingItem = false
  },

  initCanvas(canvas) {
    PLATFORM.set(new TaobaoPlatform(canvas));

    console.log(window.innerWidth, window.innerHeight)
    console.log(canvas.width, canvas.height)

    const renderer = new WebGL1Renderer({ canvas, antialias: true, alpha: true });
    const camera = new PerspectiveCamera(75, canvas.width / canvas.height, 0.1, 100);
    const scene = new Scene();
    const clock = new Clock();
    const gltfLoader = new GLTFLoader();
    const textureLoader = new TextureLoader();

    this.deps = { renderer, camera, scene, clock, gltfLoader, textureLoader }

    scene.position.z = -3;
    renderer.outputEncoding = sRGBEncoding;
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(canvas.width, canvas.height);

    const render = () => {
      if (this.disposing) return
      requestAnimationFrame(render);
      (this.currDemo as Demo)?.update()
      renderer.render(scene, camera);
    }

    render()
  },

  onUnload() {
    this.disposing = true;
    (this.currDemo as Demo)?.dispose()
    PLATFORM.dispose()
  }
})
