// index.ts
import { $requestAnimationFrame as requestAnimationFrame, $window as window, AmbientLight, AnimationAction, AnimationMixer, BoxGeometry, Clock, DirectionalLight, LoopOnce, Mesh, MeshBasicMaterial, PerspectiveCamera, PlaneGeometry, PLATFORM, Scene, sRGBEncoding, Texture, TextureLoader, WebGL1Renderer } from 'three-platformize'
import { TaobaoPlatform } from 'three-platformize/src/TaobaoPlatform'
import { GLTF, GLTFLoader } from 'three-platformize/examples/jsm/loaders/GLTFLoader'
import ThreeSpritePlayer from 'three-sprite-player'

// @ts-ignore
Page({
  data: {
  },
  onCanvasReady() {
    // @ts-ignore
    my.createCanvas({
      id: 'gl',
      success: canvas => this.initCanvas(canvas),
    });
  },

  initCanvas(canvas) {
    PLATFORM.set(new TaobaoPlatform(canvas));
    const renderer = new WebGL1Renderer({ canvas, antialias: true, alpha: true });
    const camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100);
    const scene = new Scene();
    const geometry = new BoxGeometry();
    const material = new MeshBasicMaterial();
    const box = new Mesh(geometry, material);
    const directionalLight = new DirectionalLight(0xffffff, 1);
    const ambientLight = new AmbientLight(0xffffff, 1);
    const gltfLoader = new GLTFLoader();
    const textureLoader = new TextureLoader();
    const clock = new Clock()
    renderer.outputEncoding = sRGBEncoding;
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    scene.add(box, directionalLight, ambientLight);
    camera.position.z = 0;
    box.position.y = -1.2;
    scene.position.z = -3;

    console.log(window.innerWidth, window.innerHeight)
    console.log(canvas.width, canvas.height)


    let animationMixer: AnimationMixer | undefined;
    gltfLoader.loadAsync('https://threejs.org/examples/models/gltf/Duck/glTF-Embedded/Duck.gltf')
      .then((gltf) => {
        gltf.scene.position.z = -5
        scene.add(gltf.scene);
      })

    let spritePlayer: ThreeSpritePlayer | undefined;
    let plane: Mesh | undefined;
    const initPlane = (texture: Texture, w: number, h: number) => {
      const geometry = new PlaneGeometry(w, h);
      const material = new MeshBasicMaterial({
        map: texture,
        transparent: false,
      });
      const mesh = new Mesh(geometry, material);
      return mesh
    }
    const initSpritePlayer = async () => {
      const url: Array<string> = (new Array<string>(3))
        .fill('')
        .map((v: string, k: number) => `/imgs/output-${k}.png`)
      const tile = {
        url,
        x: 0,
        y: 0,
        z: -15,
        w: (10 * 358) / 358,
        h: 10,
        col: 2,
        row: 2,
        total: 10,
        fps: 16,
      };
      const tiles = await Promise.all(tile.url.map(url => textureLoader.loadAsync(url)))
      const spritePlayer = new ThreeSpritePlayer(
        tiles,
        tile.total,
        tile.row,
        tile.col,
        tile.fps,
        true,
      );
      plane = initPlane(spritePlayer.texture, tile.w, tile.h);
      scene.add(plane);
      plane.position.z = -8;
      plane.position.y = 4;
      return spritePlayer;
    }
    initSpritePlayer().then(i => { spritePlayer = i })

    const render = () => {
      requestAnimationFrame(render);
      box.rotation.x += 0.01;
      box.rotation.y += 0.01;
      if (spritePlayer && plane) {
        spritePlayer.animate();
        const needsUpdate = !box.material.map
        box.material.map = spritePlayer.texture
        box.material.needsUpdate = needsUpdate
        // @ts-ignore
        plane.material.map = spritePlayer.texture
      }
      animationMixer?.update(clock.getDelta())
      renderer.render(scene, camera);
    }

    render()
  },

  onUnload() {
    PLATFORM.dispose()
  }
})
