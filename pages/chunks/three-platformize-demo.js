import { O as OrbitControls, C as Color, s as sRGBEncoding, P as PointLight, A as AmbientLight, D as DirectionalLight, L as LinearEncoding, G as Group, a as PDBLoader, B as BoxGeometry, I as IcosahedronGeometry, M as MeshPhongMaterial, b as Mesh, V as Vector3, F as Fog, c as PlaneGeometry, S as STLLoader, T as TTFLoader, d as Font, e as MeshBasicMaterial, f as TextGeometry, g as BVHLoader, h as SkeletonHelper, i as GridHelper, j as AnimationMixer, H as HemisphereLight, k as FBXLoader, l as LWOLoader, m as DDSLoader, n as MTLLoader, o as OBJLoader, p as LoadingManager, E as EXRLoader, q as FloatType, R as ReinhardToneMapping, r as SVGLoader, t as DoubleSide, u as ShapeGeometry, v as Euler, w as RGBELoader, x as PMREMGenerator, U as UnsignedByteType, y as SpotLight, z as LoopOnce, J as ColladaLoader, K as RGBEFormat, N as RGBEEncoding, Q as NearestFilter, W as CubeUVReflectionMapping, X as DeviceOrientationControls, Y as SphereGeometry } from './three-platformize.js';

function disposeNode(node) {
  if (node.isMesh) {
    if (node.geometry) {
      node.geometry.dispose();
    }

    if (node.material) {
      // if (node.material.isMeshFaceMaterial) {
      //   node.material.materials.forEach(mtrl => {
      //     if (mtrl.map) mtrl.map.dispose();
      //     if (mtrl.lightMap) mtrl.lightMap.dispose();
      //     if (mtrl.bumpMap) mtrl.bumpMap.dispose();
      //     if (mtrl.normalMap) mtrl.normalMap.dispose();
      //     if (mtrl.specularMap) mtrl.specularMap.dispose();
      //     if (mtrl.envMap) mtrl.envMap.dispose();
      //     if (mtrl.alphaMap) mtrl.alphaMap.dispose();
      //     if (mtrl.aoMap) mtrl.aoMap.dispose();
      //     if (mtrl.displacementMap) mtrl.displacementMap.dispose();
      //     if (mtrl.emissiveMap) mtrl.emissiveMap.dispose();
      //     if (mtrl.gradientMap) mtrl.gradientMap.dispose();
      //     if (mtrl.metalnessMap) mtrl.metalnessMap.dispose();
      //     if (mtrl.roughnessMap) mtrl.roughnessMap.dispose();

      //     mtrl.dispose(); // disposes any programs associated with the material
      //   });
      // } else {
      //   if (node.material.map) node.material.map.dispose();
      //   if (node.material.lightMap) node.material.lightMap.dispose();
      //   if (node.material.bumpMap) node.material.bumpMap.dispose();
      //   if (node.material.normalMap) node.material.normalMap.dispose();
      //   if (node.material.specularMap) node.material.specularMap.dispose();
      //   if (node.material.envMap) node.material.envMap.dispose();
      //   if (node.material.alphaMap) node.material.alphaMap.dispose();
      //   if (node.material.aoMap) node.material.aoMap.dispose();
      //   if (node.material.displacementMap) node.material.displacementMap.dispose();
      //   if (node.material.emissiveMap) node.material.emissiveMap.dispose();
      //   if (node.material.gradientMap) node.material.gradientMap.dispose();
      //   if (node.material.metalnessMap) node.material.metalnessMap.dispose();
      //   if (node.material.roughnessMap) node.material.roughnessMap.dispose();

      //   node.material.dispose(); // disposes any programs associated with the material
      // }
      Object.keys(node.material).forEach(key => {
        const value = node.material[key];
        if (value && value.dispose instanceof Function) value.dispose();
      });
    }
  } else if (node.isScene) {
    if (node.background && node.background.dispose) node.background.dispose();
    if (node.environment && node.environment.dispose) node.environment.dispose();
  }
}

function disposeHierarchy(node, callback = disposeNode) {
  for (var i = node.children.length - 1; i >= 0; i--) {
    var child = node.children[i];
    disposeHierarchy(child, callback);
    callback(child);
  }
  callback(node);
}

function _optionalChain$h(ops) { let lastAccessLHS = undefined; let value = ops[0]; let i = 1; while (i < ops.length) { const op = ops[i]; const fn = ops[i + 1]; i += 2; if ((op === 'optionalAccess' || op === 'optionalCall') && value == null) { return undefined; } if (op === 'access' || op === 'optionalAccess') { lastAccessLHS = value; value = fn(value); } else if (op === 'call' || op === 'optionalCall') { value = fn((...args) => value.call(lastAccessLHS, ...args)); lastAccessLHS = undefined; } } return value; }
const baseUrl$2 = 'https://techbrood.com/threejs/examples/';
// export const baseUrl = 'https://threejs.org/examples';










class Demo {
  
   __init() {this._objects = [];}
  
   __init2() {this._cameraObjects = [];}

  constructor(deps) {Demo.prototype.__init.call(this);Demo.prototype.__init2.call(this);
    this.deps = deps;
  }

  add(obj) {
    this._objects.push(obj);
    this.deps.scene.add(obj);
  }

  addCamera(obj) {
    this._cameraObjects.push(obj);
    this.deps.camera.add(obj);
  }

  addControl() {
    const { camera, renderer } = this.deps;
    this.orbitControl = new OrbitControls(camera, renderer.domElement);
    this.orbitControl.enableDamping = true;
    this.orbitControl.dampingFactor = 0.05;
  }

  reset(all = true) {
    const { camera, scene, renderer } = this.deps;
    camera.position.set(0, 0, 0);
    camera.quaternion.set(0, 0, 0, 1);
    _optionalChain$h([(scene.background ), 'optionalAccess', _ => _.dispose, 'optionalCall', _2 => _2()]);
    scene.background = new Color(0xffffff);
    scene.fog = null;
    scene.position.z = -3;
    renderer.shadowMap.enabled = false;
    renderer.physicallyCorrectLights = false;
    renderer.outputEncoding = sRGBEncoding;

    disposeHierarchy(this.deps.scene);
    this._objects.forEach(object => _optionalChain$h([object, 'access', _3 => _3.material, 'optionalAccess', _4 => _4.dispose, 'optionalCall', _5 => _5()]));
    this._cameraObjects.forEach(object => _optionalChain$h([object, 'access', _6 => _6.material, 'optionalAccess', _7 => _7.dispose, 'optionalCall', _8 => _8()]));
    scene.remove(...this._objects);
    camera.remove(...this._cameraObjects);
    this._objects.length = 0;
    this._cameraObjects.length = 0;

    _optionalChain$h([this, 'access', _9 => _9.orbitControl, 'optionalAccess', _10 => _10.dispose, 'call', _11 => _11()]);

    if (all) {
      this.orbitControl = null;
      this.deps = null;
    }
  }

  


}

// This file is part of meshoptimizer library and is distributed under the terms of MIT License.
// Copyright (C) 2016-2020, by Arseny Kapoulkine (arseny.kapoulkine@gmail.com)
var MeshoptDecoder = (function (path) {
  // Built with clang version 11.0.0 (https://github.com/llvm/llvm-project.git 0160ad802e899c2922bc9b29564080c22eb0908c)
  // Built from meshoptimizer 0.14

  if (typeof WXWebAssembly !== 'object') {
    // This module requires WebAssembly to function
    return {
      supported: false,
    };
  }

  var instance;
  var readyResolve;
  var promise = new Promise((resovle) => {
    readyResolve = resovle;
  });

  function setWasmPath(path) {
    WXWebAssembly.instantiate(path, {}).then(function (result) {
      instance = result.instance;
      instance.exports.__wasm_call_ctors();
      readyResolve();
    });
  }


  function decode(fun, target, count, size, source, filter) {
    var sbrk = instance.exports.sbrk;
    var count4 = (count + 3) & ~3; // pad for SIMD filter
    var tp = sbrk(count4 * size);
    var sp = sbrk(source.length);
    var heap = new Uint8Array(instance.exports.memory.buffer);
    heap.set(source, sp);
    var res = fun(tp, count, size, sp, source.length);
    if (res == 0 && filter) {
      filter(tp, count4, size);
    }
    target.set(heap.subarray(tp, tp + count * size));
    sbrk(tp - sbrk(0));
    if (res != 0) {
      throw new Error('Malformed buffer data: ' + res);
    }
  }
  var filters = {
    // legacy index-based enums for glTF
    0: '',
    1: 'meshopt_decodeFilterOct',
    2: 'meshopt_decodeFilterQuat',
    3: 'meshopt_decodeFilterExp',
    // string-based enums for glTF
    NONE: '',
    OCTAHEDRAL: 'meshopt_decodeFilterOct',
    QUATERNION: 'meshopt_decodeFilterQuat',
    EXPONENTIAL: 'meshopt_decodeFilterExp',
  };

  var decoders = {
    // legacy index-based enums for glTF
    0: 'meshopt_decodeVertexBuffer',
    1: 'meshopt_decodeIndexBuffer',
    2: 'meshopt_decodeIndexSequence',
    // string-based enums for glTF
    ATTRIBUTES: 'meshopt_decodeVertexBuffer',
    TRIANGLES: 'meshopt_decodeIndexBuffer',
    INDICES: 'meshopt_decodeIndexSequence',
  };

  return {
    setWasmPath,
    ready: promise,
    supported: true,
    decodeVertexBuffer: function (target, count, size, source, filter) {
      decode(
        instance.exports.meshopt_decodeVertexBuffer,
        target,
        count,
        size,
        source,
        instance.exports[filters[filter]],
      );
    },
    decodeIndexBuffer: function (target, count, size, source) {
      decode(instance.exports.meshopt_decodeIndexBuffer, target, count, size, source);
    },
    decodeIndexSequence: function (target, count, size, source) {
      decode(instance.exports.meshopt_decodeIndexSequence, target, count, size, source);
    },
    decodeGltfBuffer: function (target, count, size, source, mode, filter) {
      decode(
        instance.exports[decoders[mode]],
        target,
        count,
        size,
        source,
        instance.exports[filters[filter]],
      );
    },
  };
})();

function _optionalChain$g(ops) { let lastAccessLHS = undefined; let value = ops[0]; let i = 1; while (i < ops.length) { const op = ops[i]; const fn = ops[i + 1]; i += 2; if ((op === 'optionalAccess' || op === 'optionalCall') && value == null) { return undefined; } if (op === 'access' || op === 'optionalAccess') { lastAccessLHS = value; value = fn(value); } else if (op === 'call' || op === 'optionalCall') { value = fn((...args) => value.call(lastAccessLHS, ...args)); lastAccessLHS = undefined; } } return value; }
/**
 * 测试手机：小米8 (微信8.0禁用WebAssembly API，改为WXWebAssembly, 并且不支持SIMD，但是IOS支持WXWebAssembly)
 *
 * 加载时间ms
 *  wasm 58  61  62   (WebAssembly API)
 *  wasm 50  73  83   (WXWebAssembly API)
 *  asm  144 139 134
 * 
 * IPhone7
 *  wasm 22  22  22   (WXWebAssembly API)
 */

class DemoMeshOpt extends Demo {
  async init() {
    const { gltfLoader, camera, scene } = this.deps;
    MeshoptDecoder.setWasmPath('/decoder_base.wasm');
    gltfLoader.setMeshoptDecoder(MeshoptDecoder);
    const t = Date.now();
    const gltf = (await gltfLoader.loadAsync(
      // 'https://meshoptimizer.org/demo/pirate.glb',
      'https://cdn.static.oppenlab.com/weblf/test/pirate.glb',
    )) ;
    console.log(Date.now() - t);

    const pointLight = new PointLight(0xffffff, 0.8);
    pointLight.position.set(3, 3, 0);

    this.add(new AmbientLight(0xcccccc, 0.3));
    this.add(gltf.scene);
    this.add(camera);
    this.addCamera(pointLight);

    gltf.scene.position.y = -1;
    scene.position.z = 0;
    camera.position.y = 1.0;
    camera.position.z = 3.0;
    scene.background = new Color(0x300a24);

    this.addControl();
  }

  update() {
    _optionalChain$g([this, 'access', _ => _.orbitControl, 'optionalAccess', _2 => _2.update, 'call', _3 => _3()]);
  }

  dispose() {
    this.reset();
  }
}

function _optionalChain$f(ops) { let lastAccessLHS = undefined; let value = ops[0]; let i = 1; while (i < ops.length) { const op = ops[i]; const fn = ops[i + 1]; i += 2; if ((op === 'optionalAccess' || op === 'optionalCall') && value == null) { return undefined; } if (op === 'access' || op === 'optionalAccess') { lastAccessLHS = value; value = fn(value); } else if (op === 'call' || op === 'optionalCall') { value = fn((...args) => value.call(lastAccessLHS, ...args)); lastAccessLHS = undefined; } } return value; }
/**
 * ```
 * 模型地址： three.js\examples\models\gltf\PrimaryIonDrive.glb
 * 三角形数：52072
 * 顶点数：91798
 * 转换工具：gltfpack -i PrimaryIonDrive.glb -o PrimaryIonDrive-EXT_MESH_QUANTIZATION.glb
 *           gltfpack -i PrimaryIonDrive.glb -o PrimaryIonDrive-EXT_meshopt_compression.glb -cc
 *           gltf-pipeline -i PrimaryIonDrive.glb -o PrimaryIonDrive-Draco.glb
 *
 * 测试方式：点击菜单的重新进入小程序，加载glb记录时间，重复3次
 *
 *            大小      小米8加载(ms)     IPhone7(ms)
 * orginal    5.53 MB   357 | 284 | 242   584 | 239 | 574
 * mesh_quan  1.39 MB   332 | 301 | 306   261 | 343 | 345
 * meshopt    448 KB    118 | 114 | 110   手机不支持（需WASM）
 * Draco      1.58 MB   未适配Draco       未适配Draco
 * ```
 */

class DemoMeshQuantization extends Demo {
  async init() {
    const { camera, gltfLoader, scene } = this.deps;
    const t = Date.now();
    MeshoptDecoder.setWasmPath('/decoder_base.wasm');
    gltfLoader.setMeshoptDecoder(MeshoptDecoder);
    const gltf = await gltfLoader.loadAsync(
      // 'https://cdn.static.oppenlab.com/weblf/test/PrimaryIonDrive.glb',
      'https://cdn.static.oppenlab.com/weblf/test/PrimaryIonDrive-EXT_MESH_QUANTIZATION.glb',
      // 'https://cdn.static.oppenlab.com/weblf/test/PrimaryIonDrive-EXT_meshopt_compression.glb',
      // 'http://192.168.10.140:8081/PrimaryIonDrive.glb',
      // 'http://192.168.10.140:8081/PrimaryIonDrive-EXT_MESH_QUANTIZATION.glb',
      // 'http://192.168.10.140:8081/PrimaryIonDrive-EXT_meshopt_compression.glb',
    );
    const t1 = Date.now();

    console.log('load glb time', t1 - t);

    this.add(gltf.scene);
    this.add(new DirectionalLight(0xffffff, 1));
    this.add(new AmbientLight(0xffffff, 1));

    camera.position.z = 3;
    scene.position.z = 0;

    this.addControl();
  }
  update() {
    _optionalChain$f([this, 'access', _ => _.orbitControl, 'optionalAccess', _2 => _2.update, 'call', _3 => _3()]);
  }
  dispose() {
    this.reset();
  }
}

function _optionalChain$e(ops) { let lastAccessLHS = undefined; let value = ops[0]; let i = 1; while (i < ops.length) { const op = ops[i]; const fn = ops[i + 1]; i += 2; if ((op === 'optionalAccess' || op === 'optionalCall') && value == null) { return undefined; } if (op === 'access' || op === 'optionalAccess') { lastAccessLHS = value; value = fn(value); } else if (op === 'call' || op === 'optionalCall') { value = fn((...args) => value.call(lastAccessLHS, ...args)); lastAccessLHS = undefined; } } return value; }
class DemoPDBLoader extends Demo {
  
  

  async init() {
    const { camera, scene, renderer } = this.deps;

    camera.position.z = 100;
    scene.position.z = 0;
    scene.background = new Color(0x050505);
    renderer.outputEncoding = LinearEncoding;

    this.addControl();

    this.obj = new Group();
    this.obj.scale.set(0.1, 0.1, 0.1);
    this.add(this.obj);
    const light1 = new DirectionalLight(0xffffff, 0.8);
    light1.position.set(1, 1, 1);
    const light2 = new DirectionalLight(0xffffff, 0.5);
    light2.position.set(-1, -1, 1);
    this.add(light1);
    this.add(light2);

    const loader = new PDBLoader();
    const pdb = await loader.loadAsync(baseUrl$2 + '/models/molecules/caffeine.pdb');
    this.loadMolecule(pdb);
  }
  update() {
    _optionalChain$e([this, 'access', _ => _.orbitControl, 'optionalAccess', _2 => _2.update, 'call', _3 => _3()]);
  }
  dispose() {
    this.reset();
  }

  loadMolecule(pdb) {
    var geometryAtoms = pdb.geometryAtoms;
    var geometryBonds = pdb.geometryBonds;
    var json = pdb.json;
    var offset = new Vector3();

    var boxGeometry = new BoxGeometry(1, 1, 1);
    var sphereGeometry = new IcosahedronGeometry(1, 2);

    geometryAtoms.computeBoundingBox();
    geometryAtoms.boundingBox.getCenter(offset).negate();

    geometryAtoms.translate(offset.x, offset.y, offset.z);
    geometryBonds.translate(offset.x, offset.y, offset.z);

    var positions = geometryAtoms.getAttribute('position');
    var colors = geometryAtoms.getAttribute('color');

    var position = new Vector3();
    var color = new Color();

    for (var i = 0; i < positions.count; i++) {
      position.x = positions.getX(i);
      position.y = positions.getY(i);
      position.z = positions.getZ(i);

      color.r = colors.getX(i);
      color.g = colors.getY(i);
      color.b = colors.getZ(i);

      var material = new MeshPhongMaterial({ color: color });

      var object = new Mesh(sphereGeometry, material);
      object.position.copy(position);
      object.position.multiplyScalar(75);
      object.scale.multiplyScalar(25);
      this.obj.add(object);

      json.atoms[i];
    }

    positions = geometryBonds.getAttribute('position');

    var start = new Vector3();
    var end = new Vector3();

    for (var i = 0; i < positions.count; i += 2) {
      start.x = positions.getX(i);
      start.y = positions.getY(i);
      start.z = positions.getZ(i);

      end.x = positions.getX(i + 1);
      end.y = positions.getY(i + 1);
      end.z = positions.getZ(i + 1);

      start.multiplyScalar(75);
      end.multiplyScalar(75);

      var object = new Mesh(boxGeometry, new MeshPhongMaterial({ color: 0xffffff }));
      object.position.copy(start);
      object.position.lerp(end, 0.5);
      object.scale.set(5, 5, start.distanceTo(end));
      object.lookAt(end);
      this.obj.add(object);
    }
  }
}

function _optionalChain$d(ops) { let lastAccessLHS = undefined; let value = ops[0]; let i = 1; while (i < ops.length) { const op = ops[i]; const fn = ops[i + 1]; i += 2; if ((op === 'optionalAccess' || op === 'optionalCall') && value == null) { return undefined; } if (op === 'access' || op === 'optionalAccess') { lastAccessLHS = value; value = fn(value); } else if (op === 'call' || op === 'optionalCall') { value = fn((...args) => value.call(lastAccessLHS, ...args)); lastAccessLHS = undefined; } } return value; }
class DemoSTLLoader extends Demo {
  async init() {
    const { camera, renderer, scene } = this.deps;

    camera.position.set(3, 0.15, 3);
    renderer.setClearColor(0xffffff);
    scene.position.z = 0;
    scene.background = new Color(0x72645b);
    scene.fog = new Fog(0x72645b, 2, 15);
    renderer.shadowMap.enabled = true;

    const plane = new Mesh(new PlaneGeometry(40, 40), new MeshPhongMaterial({ color: 0x999999, specular: 0x101010 }));
    plane.rotation.x = -Math.PI / 2;
    plane.position.y = -0.5;
    plane.receiveShadow = true;

    this.add(plane);
    this.add(new AmbientLight(0x444444));
    this.addShadowedLight(1, 1, 1, 0xffffff, 1.35);
    this.addShadowedLight(0.5, 1, -1, 0xffaa00, 1);
    this.addControl();
    this.loadModels();
  }

  addShadowedLight(x, y, z, color, intensity) {
    const directionalLight = new DirectionalLight(color, intensity);
    directionalLight.position.set(x, y, z);
    this.add(directionalLight);

    directionalLight.castShadow = true;

    const d = 1;
    directionalLight.shadow.camera.left = -d;
    directionalLight.shadow.camera.right = d;
    directionalLight.shadow.camera.top = d;
    directionalLight.shadow.camera.bottom = -d;

    directionalLight.shadow.camera.near = 1;
    directionalLight.shadow.camera.far = 4;

    directionalLight.shadow.bias = -0.002;
  }

  loadModels() {
    const loader = new STLLoader();
    loader.load(baseUrl$2 + '/models/stl/ascii/slotted_disk.stl', geometry => {
      const material = new MeshPhongMaterial({ color: 0xff5533, specular: 0x111111, shininess: 200 });
      const mesh = new Mesh(geometry, material);

      mesh.position.set(0, -0.25, 0.6);
      mesh.rotation.set(0, -Math.PI / 2, 0);
      mesh.scale.set(0.5, 0.5, 0.5);

      mesh.castShadow = true;
      mesh.receiveShadow = true;

      this.add(mesh);
    });

    // Binary files
    const material = new MeshPhongMaterial({ color: 0xaaaaaa, specular: 0x111111, shininess: 200 });

    loader.load(baseUrl$2 + '/models/stl/binary/pr2_head_pan.stl', geometry => {
      const mesh = new Mesh(geometry, material);

      mesh.position.set(0, -0.37, -0.6);
      mesh.rotation.set(-Math.PI / 2, 0, 0);
      mesh.scale.set(2, 2, 2);

      mesh.castShadow = true;
      mesh.receiveShadow = true;

      this.add(mesh);
    });

    loader.load('./models/stl/binary/pr2_head_tilt.stl', geometry => {
      const mesh = new Mesh(geometry, material);

      mesh.position.set(0.136, -0.37, -0.6);
      mesh.rotation.set(-Math.PI / 2, 0.3, 0);
      mesh.scale.set(2, 2, 2);

      mesh.castShadow = true;
      mesh.receiveShadow = true;

      this.add(mesh);
    });

    // Colored binary STL
    loader.load(baseUrl$2 + '/models/stl/binary/colored.stl', geometry => {
      let meshMaterial = material;
      // @ts-ignore
      if (geometry.hasColors) {
        // @ts-ignore
        meshMaterial = new MeshPhongMaterial({ opacity: geometry.alpha, vertexColors: true });
      }

      const mesh = new Mesh(geometry, meshMaterial);

      mesh.position.set(0.5, 0.2, 0);
      mesh.rotation.set(-Math.PI / 2, Math.PI / 2, 0);
      mesh.scale.set(0.3, 0.3, 0.3);

      mesh.castShadow = true;
      mesh.receiveShadow = true;

      this.add(mesh);
    });
  }
  update() {
    _optionalChain$d([this, 'access', _ => _.orbitControl, 'optionalAccess', _2 => _2.update, 'call', _3 => _3()]);
    this.deps.camera.lookAt(new Vector3(0, -0.25, 0));
  }
  dispose() {
    this.reset();
  }
}

function _optionalChain$c(ops) { let lastAccessLHS = undefined; let value = ops[0]; let i = 1; while (i < ops.length) { const op = ops[i]; const fn = ops[i + 1]; i += 2; if ((op === 'optionalAccess' || op === 'optionalCall') && value == null) { return undefined; } if (op === 'access' || op === 'optionalAccess') { lastAccessLHS = value; value = fn(value); } else if (op === 'call' || op === 'optionalCall') { value = fn((...args) => value.call(lastAccessLHS, ...args)); lastAccessLHS = undefined; } } return value; }
const text = 'three.js';
const height = 20,
  size = 70,
  hover = 30,
  curveSegments = 4,
  bevelThickness = 2,
  bevelSize = 1.5;

class DemoTTFLoader extends Demo {
  async init() {
    const { camera, scene, renderer } = this.deps;
    // CAMERA
    camera.position.set(0, 400, 700);

    // SCENE
    scene.background = new Color(0x000000);
    scene.fog = new Fog(0x000000, 250, 1400);

    // LIGHTS
    const dirLight = new DirectionalLight(0xffffff, 0.125);
    dirLight.position.set(0, 0, 1).normalize();
    this.add(dirLight);

    const pointLight = new PointLight(0xffffff, 1.5);
    pointLight.position.set(0, 100, 90);
    pointLight.color.setHSL(Math.random(), 1, 0.5);
    this.add(pointLight);

    const material = new MeshPhongMaterial({
      color: 0xffffff,
      flatShading: true,
    });

    const group = new Group();
    group.position.y = 100;

    this.add(group);

    const loader = new TTFLoader();
    const json = await loader.loadAsync(baseUrl$2 + '/fonts/ttf/kenpixel.ttf');
    console.log(json);
    this.createText(new Font(json), group, material);

    const plane = new Mesh(
      new PlaneGeometry(10000, 10000),
      new MeshBasicMaterial({
        color: 0xffffff,
        opacity: 0.5,
        transparent: true,
      }),
    );
    plane.position.y = 100;
    plane.rotation.x = -Math.PI / 2;

    renderer.outputEncoding = LinearEncoding;
    this.add(plane);
    this.addControl();
  }

  createText(font, group, material) {
    const textGeo = new TextGeometry(text, {
      font: font,

      size: size,
      height: height,
      curveSegments: curveSegments,

      bevelThickness: bevelThickness,
      bevelSize: bevelSize,
      bevelEnabled: true,
    });

    textGeo.computeBoundingBox();
    textGeo.computeVertexNormals();

    const centerOffset =
      -0.5 * (textGeo.boundingBox.max.x - textGeo.boundingBox.min.x);

    const textMesh1 = new Mesh(textGeo, material);

    textMesh1.position.x = centerOffset;
    textMesh1.position.y = hover;
    textMesh1.position.z = 0;

    textMesh1.rotation.x = 0;
    textMesh1.rotation.y = Math.PI * 2;

    group.add(textMesh1);

    {
      const textMesh2 = new Mesh(textGeo, material);

      textMesh2.position.x = centerOffset;
      textMesh2.position.y = -hover;
      textMesh2.position.z = height;

      textMesh2.rotation.x = Math.PI;
      textMesh2.rotation.y = Math.PI * 2;

      group.add(textMesh2);
    }
  }

  update() {
    _optionalChain$c([this, 'access', _ => _.orbitControl, 'optionalAccess', _2 => _2.update, 'call', _3 => _3()]);
  }

  dispose() {
    this.reset();
  }
}

function _optionalChain$b(ops) { let lastAccessLHS = undefined; let value = ops[0]; let i = 1; while (i < ops.length) { const op = ops[i]; const fn = ops[i + 1]; i += 2; if ((op === 'optionalAccess' || op === 'optionalCall') && value == null) { return undefined; } if (op === 'access' || op === 'optionalAccess') { lastAccessLHS = value; value = fn(value); } else if (op === 'call' || op === 'optionalCall') { value = fn((...args) => value.call(lastAccessLHS, ...args)); lastAccessLHS = undefined; } } return value; }
class DemoBVHLoader extends Demo {
  
  async init() {
    const { scene, camera } = this.deps;
    const loader = new BVHLoader();

    camera.position.set(0, 200, 300);

    const result = await loader.loadAsync(
      baseUrl$2 + '/models/bvh/pirouette.bvh',
    );
    const skeletonHelper = new SkeletonHelper(result.skeleton.bones[0]);
    // @ts-ignore
    skeletonHelper.skeleton = result.skeleton; // allow animation mixer to bind to SkeletonHelper directly

    const boneContainer = new Group();
    boneContainer.add(result.skeleton.bones[0]);

    this.add(skeletonHelper);
    this.add(boneContainer);
    scene.background = new Color(0xeeeeee);

    this.add(new GridHelper(400, 10));

    // play animation
    this.mixer = new AnimationMixer(skeletonHelper);
    this.mixer.clipAction(result.clip).setEffectiveWeight(1.0).play();

    this.addControl();
    this.orbitControl.minDistance = 300;
    this.orbitControl.maxDistance = 700;
  }
  update() {
    _optionalChain$b([this, 'access', _ => _.mixer, 'optionalAccess', _2 => _2.update, 'call', _3 => _3(this.deps.clock.getDelta())]);
    _optionalChain$b([this, 'access', _4 => _4.orbitControl, 'optionalAccess', _5 => _5.update, 'call', _6 => _6()]);
  }
  dispose() {
    this.reset();
    this.mixer.stopAllAction();
    this.mixer = null;
  }
}

function _optionalChain$a(ops) { let lastAccessLHS = undefined; let value = ops[0]; let i = 1; while (i < ops.length) { const op = ops[i]; const fn = ops[i + 1]; i += 2; if ((op === 'optionalAccess' || op === 'optionalCall') && value == null) { return undefined; } if (op === 'access' || op === 'optionalAccess') { lastAccessLHS = value; value = fn(value); } else if (op === 'call' || op === 'optionalCall') { value = fn((...args) => value.call(lastAccessLHS, ...args)); lastAccessLHS = undefined; } } return value; }
class DemoFBXLoader extends Demo {
  
  async init() {
    const { camera, scene } = this.deps;
    camera.position.set(100, 200, 300);
    scene.background = new Color(0xa0a0a0);
    scene.fog = new Fog(0xa0a0a0, 200, 1000);

    const hemiLight = new HemisphereLight(0xffffff, 0x444444);
    hemiLight.position.set(0, 200, 0);
    this.add(hemiLight);

    const dirLight = new DirectionalLight(0xffffff);
    dirLight.position.set(0, 200, 100);
    dirLight.castShadow = true;
    dirLight.shadow.camera.top = 180;
    dirLight.shadow.camera.bottom = -100;
    dirLight.shadow.camera.left = -120;
    dirLight.shadow.camera.right = 120;
    this.add(dirLight);

    // ground
    const mesh = new Mesh(
      new PlaneGeometry(2000, 2000),
      new MeshPhongMaterial({ color: 0x999999, depthWrite: false }),
    );
    mesh.rotation.x = -Math.PI / 2;
    mesh.receiveShadow = true;
    this.add(mesh);

    const grid = new GridHelper(2000, 20, 0x000000, 0x000000);
    // @ts-ignore
    grid.material.opacity = 0.2;
    // @ts-ignore
    grid.material.transparent = true;
    this.add(grid);

    const loader = new FBXLoader();
    const object = await loader.loadAsync(
      baseUrl$2 + '/models/fbx/Samba Dancing.fbx',
    );
    const mixer = new AnimationMixer(object);

    const action = mixer.clipAction(object.animations[0]);
    action.play();

    object.traverse(function (child) {
      // @ts-ignore
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });

    this.add(object);

    this.addControl();
    this.orbitControl.target.set(0, 100, 0);
    this.orbitControl.update();

    this.mixer = mixer;
  }
  update() {
    _optionalChain$a([this, 'access', _ => _.mixer, 'optionalAccess', _2 => _2.update, 'call', _3 => _3(this.deps.clock.getDelta())]);
    _optionalChain$a([this, 'access', _4 => _4.orbitControl, 'optionalAccess', _5 => _5.update, 'call', _6 => _6()]);
  }
  dispose() {
    this.reset();
    this.mixer.stopAllAction();
    this.mixer = null;
  }
}

function _optionalChain$9(ops) { let lastAccessLHS = undefined; let value = ops[0]; let i = 1; while (i < ops.length) { const op = ops[i]; const fn = ops[i + 1]; i += 2; if ((op === 'optionalAccess' || op === 'optionalCall') && value == null) { return undefined; } if (op === 'access' || op === 'optionalAccess') { lastAccessLHS = value; value = fn(value); } else if (op === 'call' || op === 'optionalCall') { value = fn((...args) => value.call(lastAccessLHS, ...args)); lastAccessLHS = undefined; } } return value; }

class DemoLWOLoader extends Demo {
  
  

  async init() {
    const { scene, renderer, camera } = this.deps;
    camera.position.set(-0.7, 14.6, 43.2);
    scene.background = new Color(0xa0a0a0);

    const ambientLight = new AmbientLight(0xaaaaaa, 1.75);
    this.add(ambientLight);

    const light1 = new DirectionalLight(0xffffff, 1);
    light1.position.set(0, 200, 100);
    light1.castShadow = true;
    light1.shadow.camera.top = 180;
    light1.shadow.camera.bottom = -100;
    light1.shadow.camera.left = -120;
    light1.shadow.camera.right = 120;
    this.add(light1);

    const light2 = new DirectionalLight(0xffffff, 0.7);
    light2.position.set(-100, 200, -100);
    this.add(light2);

    const light3 = new DirectionalLight(0xffffff, 0.4);
    light3.position.set(100, -200, 100);
    this.add(light3);

    const light4 = new DirectionalLight(0xffffff, 1);
    light4.position.set(-100, -100, 100);
    this.add(light4);

    const grid = new GridHelper(200, 20, 0x000000, 0x000000);
    // @ts-ignore
    grid.material.opacity = 0.3;
    // @ts-ignore
    grid.material.transparent = true;
    this.add(grid);

    const loader = new LWOLoader();
    const object = (await loader.loadAsync(
      baseUrl$2 + '/models/lwo/Objects/LWO3/Demo.lwo',
    )) ;

    const phong = object.meshes[0];
    phong.position.set(-2, 12, 0);

    const standard = object.meshes[1];
    standard.position.set(2, 12, 0);

    const rocket = object.meshes[2];
    rocket.position.set(0, 10.5, -1);

    this.add(phong);
    this.add(rocket);
    this.add(standard);

    renderer.shadowMap.enabled = true;
    renderer.physicallyCorrectLights = true;
    renderer.gammaFactor = 1.18;

    this.addControl();
    this.orbitControl.target.set(1.33, 10, -6.7);
  }
  update() {
    _optionalChain$9([this, 'access', _ => _.orbitControl, 'optionalAccess', _2 => _2.update, 'call', _3 => _3()]);
  }
  dispose() {
    this.reset();
  }
}

function _optionalChain$8(ops) { let lastAccessLHS = undefined; let value = ops[0]; let i = 1; while (i < ops.length) { const op = ops[i]; const fn = ops[i + 1]; i += 2; if ((op === 'optionalAccess' || op === 'optionalCall') && value == null) { return undefined; } if (op === 'access' || op === 'optionalAccess') { lastAccessLHS = value; value = fn(value); } else if (op === 'call' || op === 'optionalCall') { value = fn((...args) => value.call(lastAccessLHS, ...args)); lastAccessLHS = undefined; } } return value; }
class DemoMTLLoader extends Demo {
  async init() {
    const { camera, renderer } = this.deps;
    const loadMgr = new LoadingManager();
    loadMgr.addHandler(/\.dds$/i, new DDSLoader());
    const mtlLoader = new MTLLoader(loadMgr);
    const objLoader = new OBJLoader(loadMgr);

    const materials = (await mtlLoader.loadAsync(
      baseUrl$2 + '/models/obj/male02/male02.mtl',
    )) ;
    materials.preload();

    const object = (await objLoader
      .setMaterials(materials)
      .loadAsync(baseUrl$2 + '/models/obj/male02/male02.obj')) ;
    object.position.y = -95;

    this.addControl();

    this.add(new AmbientLight(0xcccccc, 0.4));
    this.addCamera(new PointLight(0xffffff, 0.8));
    this.add(object);
    this.add(camera);
    object.position.y = -95;
    camera.position.z = 200;
    renderer.outputEncoding = LinearEncoding;
  }
  update() {
    _optionalChain$8([this, 'access', _ => _.orbitControl, 'optionalAccess', _2 => _2.update, 'call', _3 => _3()]);
  }
  dispose() {
    this.reset();
  }
}

class DemoEXRLoader extends Demo {
  
  

  async init() {
    const { renderer } = this.deps;
    const loader = new EXRLoader().setDataType(FloatType);
    const texture = await loader.loadAsync(baseUrl$2 + '/textures/memorial.exr');

    const material = new MeshBasicMaterial({ map: texture });
    const geometry = new PlaneGeometry(
      (4.5 * texture.image.width) / texture.image.height,
      4.5,
    );
    this.add(new Mesh(geometry, material));
    this.lastToneMapping = renderer.toneMapping;
    this.lastToneMappingExposure = renderer.toneMappingExposure;
    renderer.toneMapping = ReinhardToneMapping;
    renderer.toneMappingExposure = 2.0;
  }
  update() {}
  dispose() {
    this.deps.renderer.toneMapping = this.lastToneMapping;
    this.deps.renderer.toneMappingExposure = this.lastToneMappingExposure;
    this.reset();
  }
}

function _optionalChain$7(ops) { let lastAccessLHS = undefined; let value = ops[0]; let i = 1; while (i < ops.length) { const op = ops[i]; const fn = ops[i + 1]; i += 2; if ((op === 'optionalAccess' || op === 'optionalCall') && value == null) { return undefined; } if (op === 'access' || op === 'optionalAccess') { lastAccessLHS = value; value = fn(value); } else if (op === 'call' || op === 'optionalCall') { value = fn((...args) => value.call(lastAccessLHS, ...args)); lastAccessLHS = undefined; } } return value; }
class DemoOBJLoader extends Demo {
  async init() {
    const { textureLoader, camera, renderer } = this.deps;
    const uvMap = await textureLoader.loadAsync(
      baseUrl$2 + '/textures/UV_Grid_Sm.jpg',
    );
    const objLoader = new OBJLoader();
    const object = await objLoader.loadAsync(
      baseUrl$2 + '/models/obj/male02/male02.obj',
    );

    this.add(new AmbientLight(0xcccccc, 0.4));
    this.addCamera(new PointLight(0xffffff, 0.8));
    this.add(object);
    this.add(camera);

    object.traverse(function (child) {
      // @ts-ignore
      if (child.isMesh) child.material.map = uvMap;
    });

    object.position.y = -95;
    camera.position.z = 200;
    renderer.outputEncoding = LinearEncoding;
    this.addControl();
  }

  update() {
    _optionalChain$7([this, 'access', _ => _.orbitControl, 'optionalAccess', _2 => _2.update, 'call', _3 => _3()]);
  }

  dispose() {
    this.reset();
  }
}

function _optionalChain$6(ops) { let lastAccessLHS = undefined; let value = ops[0]; let i = 1; while (i < ops.length) { const op = ops[i]; const fn = ops[i + 1]; i += 2; if ((op === 'optionalAccess' || op === 'optionalCall') && value == null) { return undefined; } if (op === 'access' || op === 'optionalAccess') { lastAccessLHS = value; value = fn(value); } else if (op === 'call' || op === 'optionalCall') { value = fn((...args) => value.call(lastAccessLHS, ...args)); lastAccessLHS = undefined; } } return value; }
const baseUrl$1 = 'https://techbrood.com/threejs';

class DemoSVGLoader extends Demo {
  async init() {
    const { camera, renderer } = this.deps;
    const svgLoader = new SVGLoader();
    const svg = (await svgLoader.loadAsync(
      baseUrl$1 + '/examples/models/svg/tiger.svg',
      // 'http://192.168.0.103:8080/test.svg'
    )) ;

    const helper = new GridHelper(160, 10);
    helper.rotation.x = Math.PI / 2;

    this.add(helper);
    this.add(this.initSVG(svg));
    this.addControl();

    camera.position.set(0, 0, 200);
    renderer.outputEncoding = LinearEncoding;
  }

  initSVG(svg) {
    const guiData = {
      drawFillShapes: true,
      drawStrokes: true,
      fillShapesWireframe: false,
      strokesWireframe: false,
    };

    const { paths } = svg;
    var group = new Group();
    group.scale.multiplyScalar(0.25);
    group.position.x = -70;
    group.position.y = 70;
    group.scale.y *= -1;

    for (var i = 0; i < paths.length; i++) {
      var path = paths[i];

      var fillColor = path.userData.style.fill;
      if (
        fillColor !== undefined &&
        fillColor !== 'none'
      ) {
        var material = new MeshBasicMaterial({
          color: new Color().setStyle(fillColor),
          opacity: path.userData.style.fillOpacity,
          transparent: path.userData.style.fillOpacity < 1,
          side: DoubleSide,
          depthWrite: false,
          wireframe: guiData.fillShapesWireframe,
        });

        var shapes = path.toShapes(true);

        for (var j = 0; j < shapes.length; j++) {
          var shape = shapes[j];

          var geometry = new ShapeGeometry(shape);
          var mesh = new Mesh(geometry, material);

          group.add(mesh);
        }
      }

      var strokeColor = path.userData.style.stroke;
      if (
        strokeColor !== undefined &&
        strokeColor !== 'none'
      ) {
        var material = new MeshBasicMaterial({
          color: new Color().setStyle(strokeColor),
          opacity: path.userData.style.strokeOpacity,
          transparent: path.userData.style.strokeOpacity < 1,
          side: DoubleSide,
          depthWrite: false,
          wireframe: guiData.strokesWireframe,
        });

        for (var j = 0, jl = path.subPaths.length; j < jl; j++) {
          var subPath = path.subPaths[j];

          var geometry = SVGLoader.pointsToStroke(
            subPath.getPoints(),
            path.userData.style,
          );

          if (geometry) {
            var mesh = new Mesh(geometry, material);

            group.add(mesh);
          }
        }
      }
    }

    return group;
  }

  update() {
    _optionalChain$6([this, 'access', _ => _.orbitControl, 'optionalAccess', _2 => _2.update, 'call', _3 => _3()]);
  }

  dispose() {
    this.reset();
  }
}

function _optionalChain$5(ops) { let lastAccessLHS = undefined; let value = ops[0]; let i = 1; while (i < ops.length) { const op = ops[i]; const fn = ops[i + 1]; i += 2; if ((op === 'optionalAccess' || op === 'optionalCall') && value == null) { return undefined; } if (op === 'access' || op === 'optionalAccess') { lastAccessLHS = value; value = fn(value); } else if (op === 'call' || op === 'optionalCall') { value = fn((...args) => value.call(lastAccessLHS, ...args)); lastAccessLHS = undefined; } } return value; }
const baseUrl = 'https://techbrood.com/threejs';

class DemoRGBELoader extends Demo {
  async init() {
    const { renderer, gltfLoader, scene, camera } = this.deps;
    const gltf = (await gltfLoader.loadAsync(
      baseUrl +
        '/examples/models/gltf/MetalRoughSpheres/glTF/MetalRoughSpheres.gltf',
    )) ;

    gltf.scene.rotation.copy(new Euler(0, 0, 0));
    renderer.physicallyCorrectLights = true;

    // env map
    const rgbeLoader = new RGBELoader();
    const pmremGenerator = new PMREMGenerator(renderer);
    pmremGenerator.compileEquirectangularShader();
    const t0 = Date.now();
    const envTexture = (await rgbeLoader
      .setDataType(UnsignedByteType)
      .loadAsync(
        baseUrl + '/examples/textures/equirectangular/venice_sunset_2k.hdr',
      )) ;
    const t = Date.now();
    const envMap = pmremGenerator.fromEquirectangular(envTexture).texture;
    console.log('time cost', Date.now() - t, t - t0);

    envTexture.dispose();
    pmremGenerator.dispose();
    scene.background = envMap;

    // prettier-ignore
    gltf.scene.traverse( function ( node ) {
      // @ts-ignore
      if ( node.material && ( node.material.isMeshStandardMaterial ||
      // @ts-ignore
         ( node.material.isShaderMaterial && node.material.envMap !== undefined ) ) ) {
        // @ts-ignore
        node.material.envMap = envMap;
        // @ts-ignore
        node.material.envMapIntensity = 1.5; // boombox seems too dark otherwise
      }
      // @ts-ignore
      if ( node.isMesh || node.isLight ) node.castShadow = true;
    } );

    // lights
    const directionalLight = new DirectionalLight(0xdddddd, 4);
    directionalLight.position.set(0, 0, 1).normalize();

    const spotLight = new SpotLight(0xffffff, 1);
    spotLight.position.set(5, 10, 5);
    spotLight.angle = 0.5;
    spotLight.penumbra = 0.75;
    spotLight.intensity = 100;
    spotLight.decay = 2;

    camera.position.set(2, 1, 15);

    this.add(gltf.scene);
    this.add(directionalLight);
    this.add(new AmbientLight(0x222222));
    this.add(spotLight);
    this.addControl();
  }

  update() {
    _optionalChain$5([this, 'access', _ => _.orbitControl, 'optionalAccess', _2 => _2.update, 'call', _3 => _3()]);
  }

  dispose() {
    this.reset();
  }
}

function _optionalChain$4(ops) { let lastAccessLHS = undefined; let value = ops[0]; let i = 1; while (i < ops.length) { const op = ops[i]; const fn = ops[i + 1]; i += 2; if ((op === 'optionalAccess' || op === 'optionalCall') && value == null) { return undefined; } if (op === 'access' || op === 'optionalAccess') { lastAccessLHS = value; value = fn(value); } else if (op === 'call' || op === 'optionalCall') { value = fn((...args) => value.call(lastAccessLHS, ...args)); lastAccessLHS = undefined; } } return value; }
class DemoGLTFLoader extends Demo {
  

  async init() {
    const gltf = (await this.deps.gltfLoader.loadAsync(
      // baseUrl + '/models/gltf/RobotExpressive/RobotExpressive.glb',
      'https://dtmall-tel.alicdn.com/edgeComputingConfig/upload_models/1591673169101/RobotExpressive.glb',
    )) ;
    gltf.scene.position.z = 2.5;
    gltf.scene.position.y = -2;

    this.add(new DirectionalLight(0xffffff, 1));
    this.add(new AmbientLight(0xffffff, 1));
    this.add(gltf.scene);
    this.deps.camera.position.z = 10;

    // init animtion
    const states = ['Idle', 'Walking', 'Running', 'Dance', 'Death', 'Sitting', 'Standing'];
    const emotes = ['Jump', 'Yes', 'No', 'Wave', 'Punch', 'ThumbsUp'];
    this.mixer = new AnimationMixer(gltf.scene);
    const actions = {};
    for (let i = 0; i < gltf.animations.length; i++) {
      const clip = gltf.animations[i];
      const action = this.mixer.clipAction(clip);
      actions[clip.name] = action;
      if (emotes.indexOf(clip.name) >= 0 || states.indexOf(clip.name) >= 4) {
        action.clampWhenFinished = true;
        action.loop = LoopOnce;
      }
    }

    const activeAction = actions['Walking'];
    activeAction.play();

    this.addControl();
  }

  update() {
    _optionalChain$4([this, 'access', _ => _.mixer, 'optionalAccess', _2 => _2.update, 'call', _3 => _3(this.deps.clock.getDelta())]);
    _optionalChain$4([this, 'access', _4 => _4.orbitControl, 'optionalAccess', _5 => _5.update, 'call', _6 => _6()]);
  }

  dispose() {
    this.mixer.stopAllAction();
    this.mixer = null;
    this.reset();
  }
}

function _optionalChain$3(ops) { let lastAccessLHS = undefined; let value = ops[0]; let i = 1; while (i < ops.length) { const op = ops[i]; const fn = ops[i + 1]; i += 2; if ((op === 'optionalAccess' || op === 'optionalCall') && value == null) { return undefined; } if (op === 'access' || op === 'optionalAccess') { lastAccessLHS = value; value = fn(value); } else if (op === 'call' || op === 'optionalCall') { value = fn((...args) => value.call(lastAccessLHS, ...args)); lastAccessLHS = undefined; } } return value; }
class DemoColladaLoader extends Demo {
  async init() {
    const { camera } = this.deps;

    camera.position.set(8, 10, 8);
    camera.lookAt(0, 3, 0);

    const loader = new ColladaLoader();
    const collada = await loader.loadAsync(
      baseUrl$2 + '/models/collada/elf/elf.dae',
    );
    this.add(collada.scene);
    const ambientLight = new AmbientLight(0xcccccc, 0.4);
    this.add(ambientLight);

    const directionalLight = new DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(1, 1, 0).normalize();
    this.add(directionalLight);

    this.addControl();
  }
  update() {
    _optionalChain$3([this, 'access', _ => _.orbitControl, 'optionalAccess', _2 => _2.update, 'call', _3 => _3()]);
  }
  dispose() {
    this.reset();
  }
}

function _nullishCoalesce(lhs, rhsFn) { if (lhs != null) { return lhs; } else { return rhsFn(); } } function _optionalChain$2(ops) { let lastAccessLHS = undefined; let value = ops[0]; let i = 1; while (i < ops.length) { const op = ops[i]; const fn = ops[i + 1]; i += 2; if ((op === 'optionalAccess' || op === 'optionalCall') && value == null) { return undefined; } if (op === 'access' || op === 'optionalAccess') { lastAccessLHS = value; value = fn(value); } else if (op === 'call' || op === 'optionalCall') { value = fn((...args) => value.call(lastAccessLHS, ...args)); lastAccessLHS = undefined; } } return value; }

class ThreeSpritePlayer {
   __init() {this.currFrame = 0;}
  
  
  
  
  
  
  

  constructor(
     tiles,
     totalFrame,
     row,
     col,
    fps = 24,
    sRGB = true,
  ) {this.tiles = tiles;this.totalFrame = totalFrame;this.row = row;this.col = col;ThreeSpritePlayer.prototype.__init.call(this);
    this.playing = true;
    this.currFrame = 0;
    this.frameGap = 1000 / fps;
    tiles.forEach(texture => {
      // texture.wrapS = 1001; // THREE.ClampToEdgeWrapping;
      // texture.wrapT = 1001; // three.ClampToEdgeWrapping;
      // texture.minFilter = 1006; // THREE.LinearFilter
      texture.repeat.set(1 / this.col, 1 / this.row);

      if (sRGB) texture.encoding = 3001; // THREE.sRGBEncoding
    });
    this.updateOffset();
  }

   stop() {
    this.playing = false;
  }

   play() {
    this.playing = true;
    this.startTime = Date.now();
    this.startFrame = this.currFrame;
  }

   get texture() {
    return this.tiles[this.currTile];
  }

   animate() {
    if (!this.playing || this.totalFrame === 1) return

    const now = Date.now();
    this.startTime = _nullishCoalesce(this.startTime, () => ( now));
    this.startFrame = _nullishCoalesce(this.startFrame, () => ( this.currFrame));
    const nextFrame = this.startFrame + ~~((now - this.startTime) / this.frameGap);
    this.currFrame = nextFrame % this.totalFrame;

    if (nextFrame > this.currFrame) {
      this.startTime = now;
      this.startFrame = this.currFrame;
    }

    this.updateOffset();
  }

   updateOffset() {
    this.currTile = ~~(this.currFrame / (this.col * this.row));
    this.currTileOffset = this.currFrame % (this.col * this.row);

    const texture = this.tiles[this.currTile];
    const tileHeight = 1 / this.row;
    const currentColumn = this.currTileOffset % this.col;
    const currentRow = ~~(this.currTileOffset / this.col);

    if (texture) {
      texture.offset.x = currentColumn / this.col;
      texture.offset.y = 1 - currentRow / this.row - tileHeight;
    }
  }

   dispose() {
    _optionalChain$2([this, 'access', _ => _.mesh, 'optionalAccess', _2 => _2.material, 'access', _3 => _3.dispose, 'call', _4 => _4()]);
    this.tiles.forEach(texture => texture.dispose());
    this.tiles.length = 0;
    this.mesh = null;
  }
}

// const url: Array<string> = new Array<string>(3).fill('').map((v: string, k: number) => `/imgs/output-${k}.png`);

const url = [
  'https://s3.ax1x.com/2021/02/26/yx0ObV.png',
  'https://s3.ax1x.com/2021/02/26/yx0LD0.png',
  'https://s3.ax1x.com/2021/02/26/yx0Hvn.png',
];

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

class DemoThreeSpritePlayer extends Demo {
  
  

  async init() {
    const { textureLoader } = this.deps;
    const tiles = await Promise.all(tile.url.map(url => textureLoader.loadAsync(url)));
    const spritePlayer = new ThreeSpritePlayer(tiles, tile.total, tile.row, tile.col, tile.fps, true);

    const geometry = new PlaneGeometry(tile.w, tile.h);
    const material = new MeshBasicMaterial({
      map: spritePlayer.texture,
      transparent: false,
    });
    const mesh = new Mesh(geometry, material);
    const boxGeometry = new BoxGeometry();
    const box = new Mesh(boxGeometry, material);

    box.position.y = -1.2;
    mesh.position.z = -8;
    mesh.position.y = 4;

    this.add(mesh);
    this.add(box);

    this.mesh = mesh;
    this.player = spritePlayer;
  }

  update() {
    this.player.animate();
    // @ts-ignore
    this.mesh.material.map = this.player.texture;
  }

  dispose() {
    this.reset();
    this.player.dispose();
    this.player = null;
    this.mesh = null;
  }
}

/**
 * 设置通过TextureLoad加载从PMREMGenerator生成纹理导出成PNG
 * @param {Texture} texture
 * @param {Boolean} hdr 源文件是否是HDR, LDR设置false
 */
function toEnvMap(texture, hdr = true) {
  if (hdr) {
    texture.format = RGBEFormat;
    texture.encoding = RGBEEncoding;
  }
  texture.generateMipmaps = false;
  texture.magFilter = NearestFilter;
  texture.minFilter = NearestFilter;
  texture.type = UnsignedByteType;
  texture.mapping = CubeUVReflectionMapping;
  texture.name = 'PMREM.cubeUv';
  return texture;
}

function _optionalChain$1(ops) { let lastAccessLHS = undefined; let value = ops[0]; let i = 1; while (i < ops.length) { const op = ops[i]; const fn = ops[i + 1]; i += 2; if ((op === 'optionalAccess' || op === 'optionalCall') && value == null) { return undefined; } if (op === 'access' || op === 'optionalAccess') { lastAccessLHS = value; value = fn(value); } else if (op === 'call' || op === 'optionalCall') { value = fn((...args) => value.call(lastAccessLHS, ...args)); lastAccessLHS = undefined; } } return value; }
class DemoHDRPrefilterTexture extends Demo {
  async init() {
    const { scene, camera } = this.deps;
    const texture = await this.deps.textureLoader.loadAsync(
      // 'https://s3.ax1x.com/2021/02/01/yeci9I.png',
      'https://cdn.static.oppenlab.com/weblf/test/hdr-prefilter.png',
    );
    toEnvMap(texture);
    const geometry = new PlaneGeometry(3, 3);
    const material = new MeshBasicMaterial({ map: texture });
    const mesh = new Mesh(geometry, material);

    this.add(mesh);
    scene.background = texture;
    camera.position.z = 1;

    this.addControl();
  }
  update() {
    _optionalChain$1([this, 'access', _ => _.orbitControl, 'optionalAccess', _2 => _2.update, 'call', _3 => _3()]);
  }
  dispose() {
    this.reset();
  }
}

function _optionalChain(ops) { let lastAccessLHS = undefined; let value = ops[0]; let i = 1; while (i < ops.length) { const op = ops[i]; const fn = ops[i + 1]; i += 2; if ((op === 'optionalAccess' || op === 'optionalCall') && value == null) { return undefined; } if (op === 'access' || op === 'optionalAccess') { lastAccessLHS = value; value = fn(value); } else if (op === 'call' || op === 'optionalCall') { value = fn((...args) => value.call(lastAccessLHS, ...args)); lastAccessLHS = undefined; } } return value; }
class DemoDeviceOrientationControls extends Demo {
  

  async init() {
    const { camera, textureLoader } = this.deps;
    this.control = new DeviceOrientationControls(camera);

    const geometry = new SphereGeometry(500, 60, 40);
    geometry.scale(-1, 1, 1);
    const material = new MeshBasicMaterial({
      map: await textureLoader.loadAsync('https://s3.ax1x.com/2021/02/26/yx0quq.jpg'),
    });

    const helperGeometry = new BoxGeometry(100, 100, 100, 4, 4, 4);
    const helperMaterial = new MeshBasicMaterial({
      color: 0xff00ff,
      wireframe: true,
    });

    this.add(new Mesh(geometry, material));
    this.add(new Mesh(helperGeometry, helperMaterial));
  }

  update() {
    _optionalChain([this, 'access', _ => _.control, 'optionalAccess', _2 => _2.update, 'call', _3 => _3()]);
  }

  dispose() {
    this.reset();
    this.control.disconnect();
    this.control.dispose();
    this.control = null;
  }
}

export { DemoMeshOpt as D, DemoPDBLoader as a, DemoSTLLoader as b, DemoTTFLoader as c, DemoBVHLoader as d, DemoFBXLoader as e, DemoLWOLoader as f, DemoMTLLoader as g, DemoEXRLoader as h, DemoOBJLoader as i, DemoSVGLoader as j, DemoRGBELoader as k, DemoGLTFLoader as l, DemoColladaLoader as m, DemoMeshQuantization as n, DemoThreeSpritePlayer as o, DemoHDRPrefilterTexture as p, DemoDeviceOrientationControls as q };
