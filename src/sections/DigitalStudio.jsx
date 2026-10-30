import React, { useState, useRef, useEffect, useCallback } from 'react';
import SectionHeader from '../components/SectionHeader';
import confetti from 'canvas-confetti';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { 
  isSupabaseConfigured,
  getCommunitySculptures,
  postCommunitySculpture,
  deleteCommunitySculpture
} from '../lib/supabaseClient';
import { 
  Sparkles, 
  RotateCcw, 
  Download, 
  Award, 
  Hammer, 
  Layers, 
  Eye, 
  Undo, 
  Maximize2, 
  Minimize2, 
  Compass, 
  Sliders, 
  CheckCircle2, 
  Camera, 
  Move,
  Flame,
  Box,
  Circle,
  Shapes,
  Volume2,
  Share2,
  Trash2,
  RefreshCw,
  AlertCircle,
  Globe,
  Check
} from 'lucide-react';

const LOCAL_STORAGE_KEY = 'sculptura_my_sculptures';

function getMySculptures() {
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    return [];
  }
}

function saveMySculpture(id, deleteToken) {
  try {
    const list = getMySculptures();
    list.push({ id, deleteToken });
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(list));
  } catch (e) {
    console.error('Failed to save to localStorage', e);
  }
}

function removeMySculptureFromStorage(id) {
  try {
    const list = getMySculptures().filter(item => item.id !== id);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(list));
  } catch (e) {
    console.error('Failed to remove from localStorage', e);
  }
}

const compressSnapshot = (sourceDataUrl, maxWidth = 640, quality = 0.82) => {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      const scale = Math.min(1, maxWidth / img.width);
      const canvas = document.createElement('canvas');
      canvas.width = Math.round(img.width * scale);
      canvas.height = Math.round(img.height * scale);
      const ctx = canvas.getContext('2d');
      ctx.fillStyle = '#F5F1E8';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      resolve(canvas.toDataURL('image/jpeg', quality));
    };
    img.src = sourceDataUrl;
  });
};

export default function DigitalStudio() {
  const mountRef = useRef(null);
  const sceneRef = useRef(null);
  const rendererRef = useRef(null);
  const cameraRef = useRef(null);
  const controlsRef = useRef(null);
  const meshRef = useRef(null);
  const brushHelperRef = useRef(null);
  const undoStackRef = useRef([]);

  // Interaction Mode: 'sculpt' or 'orbit'
  const [interactionMode, setInteractionMode] = useState('sculpt');

  // Active Tool
  const [activeTool, setActiveTool] = useState('carve'); // 'carve', 'buildup', 'smooth', 'flatten', 'pinch', 'inflate'
  const [brushRadius, setBrushRadius] = useState(0.45);
  const [brushIntensity, setBrushIntensity] = useState(0.25);
  const [symmetryX, setSymmetryX] = useState(true);
  const [wireframe, setWireframe] = useState(false);
  const [selectedMediumId, setSelectedMediumId] = useState('soap');
  const [selectedShapeId, setSelectedShapeId] = useState('soap-bar');

  // Metadata & Statement
  const [artworkTitle, setArtworkTitle] = useState('Essence of Form');
  const [artistName, setArtistName] = useState('Art Student');
  const [artistStatement, setArtistStatement] = useState(
    'Inspired by subtractive carving, I utilized scraping and fingertip heat smoothing to explore organic volume from a raw solid block.'
  );
  const [capturedSnapshot, setCapturedSnapshot] = useState(null);
  const [exhibitionCardReady, setExhibitionCardReady] = useState(false);
  const [canUndo, setCanUndo] = useState(false);

  // Community Sharing & Deletion State
  const [communitySculptures, setCommunitySculptures] = useState([]);
  const [loadingCommunity, setLoadingCommunity] = useState(false);
  const [communityError, setCommunityError] = useState(null);
  const [sharingStatus, setSharingStatus] = useState(null); // 'idle' | 'sharing' | 'success' | 'error'
  const [shareFeedback, setShareFeedback] = useState(null);
  const [mySculpturesList, setMySculpturesList] = useState([]);
  const [currentSharedId, setCurrentSharedId] = useState(null);

  const exhibitionRef = useRef(null);

  // Medium Materials Configuration
  const mediums = [
    {
      id: 'soap',
      name: 'Bar Soap (Ivory White)',
      technique: 'Subtractive Carving',
      color: 0xFDFBF7,
      roughness: 0.28,
      metalness: 0.02,
      clearcoat: 0.35,
      specularColor: 0xFFFFFF,
      description: 'Soft translucent bar carved with craft tools and smoothed with gentle fingertip warmth.'
    },
    {
      id: 'clay',
      name: 'Terracotta Sculpting Clay',
      technique: 'Additive & Modeling',
      color: 0xC86E4B,
      roughness: 0.85,
      metalness: 0.0,
      clearcoat: 0.05,
      specularColor: 0x965239,
      description: 'Plastic ductile earth: built up, kneaded, and molded organically by hand.'
    },
    {
      id: 'marble',
      name: 'Carrara Marble',
      technique: 'Subtractive Stone Carving',
      color: 0xEEEEEE,
      roughness: 0.35,
      metalness: 0.05,
      clearcoat: 0.5,
      specularColor: 0xFFFFFF,
      description: 'Michelangelo’s monumental stone: chipping away excess to set the trapped angel free.'
    },
    {
      id: 'bronze',
      name: 'Patinated Cast Bronze',
      technique: 'Lost-Wax Casting',
      color: 0x55604C,
      roughness: 0.38,
      metalness: 0.78,
      clearcoat: 0.2,
      specularColor: 0x889A7B,
      description: 'Rodin and Castrillo’s heroic metal: molten alloy poured into hollow molds.'
    }
  ];

  // Starting Mesh Base Shapes
  const shapePresets = [
    { id: 'soap-bar', name: 'Bar Soap Block', icon: Box, desc: 'Rectangular rounded bar (Classic atelier carving block)' },
    { id: 'sphere', name: 'Clay Sphere / Mass', icon: Circle, desc: 'Uniform organic mass for heads, creatures & abstract forms' },
    { id: 'cylinder', name: 'Torso Maquette', icon: Shapes, desc: 'Upright cylindrical volume for standing figurative studies' },
  ];

  // Tool Definitions
  const tools = [
    { id: 'carve', name: 'Subtractive Carve', icon: Hammer, desc: 'Pushes surface inward along surface normals (Subtractive)' },
    { id: 'buildup', name: 'Clay Build-up', icon: Sparkles, desc: 'Pulls surface outward along normals (Additive molding)' },
    { id: 'smooth', name: 'Fingertip Heat Smooth', icon: Flame, desc: 'Relaxes and smooths rough patches with gentle surface warmth' },
    { id: 'flatten', name: 'Craft Stick Scrape', icon: Sliders, desc: 'Scrapes planar facets and planes into the surface' },
    { id: 'inflate', name: 'Volumize / Inflate', icon: Volume2, desc: 'Expands local geometry outwards' },
  ];

  // Create High-Density Geometry based on selected shape
  const createGeometryForShape = (shapeId) => {
    let geo;
    if (shapeId === 'soap-bar') {
      // Create a dense box with rounded proportions for a bar of soap
      geo = new THREE.BoxGeometry(2.4, 3.4, 1.4, 48, 64, 32);
      
      // Slightly round the corners and edges
      const pos = geo.attributes.position;
      const v = new THREE.Vector3();
      for (let i = 0; i < pos.count; i++) {
        v.fromBufferAttribute(pos, i);
        // Soft chamfer
        const factor = 1.0 - 0.05 * (Math.pow(v.x / 1.2, 4) + Math.pow(v.y / 1.7, 4) + Math.pow(v.z / 0.7, 4));
        v.multiplyScalar(Math.max(0.75, factor));
        pos.setXYZ(i, v.x, v.y, v.z);
      }
    } else if (shapeId === 'cylinder') {
      // Dense cylindrical mannequin
      geo = new THREE.CylinderGeometry(1.2, 1.4, 3.6, 54, 54, false);
    } else {
      // Dense Sphere
      geo = new THREE.SphereGeometry(1.75, 72, 72);
    }

    geo.computeVertexNormals();
    return geo;
  };

  // Build Material
  const createMaterial = (medId, isWire) => {
    const med = mediums.find(m => m.id === medId) || mediums[0];
    return new THREE.MeshPhysicalMaterial({
      color: med.color,
      roughness: med.roughness,
      metalness: med.metalness,
      clearcoat: med.clearcoat,
      clearcoatRoughness: 0.1,
      wireframe: isWire,
      flatShading: false,
    });
  };

  // Save Undo State
  const saveUndoState = () => {
    if (!meshRef.current) return;
    const pos = meshRef.current.geometry.attributes.position;
    const copy = new Float32Array(pos.array);
    undoStackRef.current.push(copy);
    if (undoStackRef.current.length > 15) {
      undoStackRef.current.shift(); // keep last 15 actions
    }
    setCanUndo(true);
  };

  const handleUndo = () => {
    if (undoStackRef.current.length === 0 || !meshRef.current) return;
    const prevArray = undoStackRef.current.pop();
    const pos = meshRef.current.geometry.attributes.position;
    pos.array.set(prevArray);
    pos.needsUpdate = true;
    meshRef.current.geometry.computeVertexNormals();
    setCanUndo(undoStackRef.current.length > 0);
  };

  // Reset to raw block
  const handleResetMesh = () => {
    if (!meshRef.current) return;
    saveUndoState();
    const newGeo = createGeometryForShape(selectedShapeId);
    meshRef.current.geometry.dispose();
    meshRef.current.geometry = newGeo;
  };

  // -------------------------------------------------------------
  // THREE.JS SCENE INITIALIZATION
  // -------------------------------------------------------------
  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Dimensions
    const width = container.clientWidth || 600;
    const height = container.clientHeight || 550;

    // 1. Scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xF5F1E8);
    sceneRef.current = scene;

    // 2. Camera
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 6.2);
    cameraRef.current = camera;

    // 3. Renderer with antialiasing and preserveDrawingBuffer for snapshots
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      preserveDrawingBuffer: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    rendererRef.current = renderer;
    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    // 4. Studio Lighting Rig
    const ambientLight = new THREE.AmbientLight(0xFFFFFF, 0.9);
    scene.add(ambientLight);

    // Key light (warm museum spotlight)
    const keyLight = new THREE.DirectionalLight(0xFFF6E8, 1.6);
    keyLight.position.set(4, 5, 5);
    scene.add(keyLight);

    // Fill light (soft cool stone rim)
    const fillLight = new THREE.DirectionalLight(0xE5EEF5, 0.8);
    fillLight.position.set(-4, -2, -3);
    scene.add(fillLight);

    // Top subtle rim light
    const topLight = new THREE.PointLight(0xFFFAF0, 0.8, 15);
    topLight.position.set(0, 6, 0);
    scene.add(topLight);

    // 5. Studio Pedestal Base (Subtle museum turntable ground)
    const pedestalGeo = new THREE.CylinderGeometry(2.6, 2.8, 0.2, 48);
    const pedestalMat = new THREE.MeshStandardMaterial({
      color: 0xE8E3D7,
      roughness: 0.7,
      metalness: 0.1
    });
    const pedestal = new THREE.Mesh(pedestalGeo, pedestalMat);
    pedestal.position.y = -2.2;
    scene.add(pedestal);

    // 6. Sculptable 3D Mesh
    const geo = createGeometryForShape(selectedShapeId);
    const mat = createMaterial(selectedMediumId, wireframe);
    const mesh = new THREE.Mesh(geo, mat);
    mesh.position.y = 0.2;
    scene.add(mesh);
    meshRef.current = mesh;

    // 7. Brush Cursor Indicator Ring
    const ringGeo = new THREE.RingGeometry(0.9, 1.0, 32);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0xB66A4D,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.7
    });
    const brushHelper = new THREE.Mesh(ringGeo, ringMat);
    brushHelper.visible = false;
    scene.add(brushHelper);
    brushHelperRef.current = brushHelper;

    // 8. OrbitControls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.06;
    controls.minDistance = 3.2;
    controls.maxDistance = 10;
    controls.target.set(0, 0.2, 0);
    controlsRef.current = controls;

    // Resize Handler
    const handleResize = () => {
      if (!container || !renderer || !camera) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    // Animation Loop
    let animId;
    const animate = () => {
      animId = requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      geo.dispose();
      mat.dispose();
      pedestalGeo.dispose();
      pedestalMat.dispose();
      ringGeo.dispose();
      ringMat.dispose();
    };
  }, []);

  // Update Material when selectedMediumId or wireframe changes
  useEffect(() => {
    if (!meshRef.current) return;
    meshRef.current.material.dispose();
    meshRef.current.material = createMaterial(selectedMediumId, wireframe);
  }, [selectedMediumId, wireframe]);

  // Update Geometry when shape changes
  useEffect(() => {
    if (!meshRef.current) return;
    saveUndoState();
    const newGeo = createGeometryForShape(selectedShapeId);
    meshRef.current.geometry.dispose();
    meshRef.current.geometry = newGeo;
  }, [selectedShapeId]);

  // Update Controls when interaction mode changes
  useEffect(() => {
    if (!controlsRef.current) return;
    // In sculpt mode, right-click rotates, left click is reserved for sculpting
    if (interactionMode === 'sculpt') {
      controlsRef.current.mouseButtons = {
        LEFT: THREE.MOUSE.NONE,
        MIDDLE: THREE.MOUSE.DOLLY,
        RIGHT: THREE.MOUSE.ROTATE
      };
    } else {
      // In orbit mode, left click rotates
      controlsRef.current.mouseButtons = {
        LEFT: THREE.MOUSE.ROTATE,
        MIDDLE: THREE.MOUSE.DOLLY,
        RIGHT: THREE.MOUSE.PAN
      };
    }
  }, [interactionMode]);

  // -------------------------------------------------------------
  // REAL-TIME 3D SCULPTING ALGORITHM (SculpGL-inspired WebGL Deformation)
  // -------------------------------------------------------------
  const isSculptingRef = useRef(false);
  const raycaster = useRef(new THREE.Raycaster()).current;
  const mouse = useRef(new THREE.Vector2()).current;

  const performSculptAtPoint = useCallback((intersectPoint, normal) => {
    if (!meshRef.current) return;
    const mesh = meshRef.current;
    const geometry = mesh.geometry;
    const pos = geometry.attributes.position;
    const vertex = new THREE.Vector3();
    const vNormal = new THREE.Vector3();

    // Convert world intersection to local coordinates
    const localPoint = mesh.worldToLocal(intersectPoint.clone());
    const localNormal = normal.clone().transformDirection(mesh.matrixWorld.clone().invert()).normalize();

    // Points to deform (including symmetric point if symmetryX is on)
    const targets = [{ pt: localPoint, n: localNormal }];
    if (symmetryX) {
      targets.push({
        pt: new THREE.Vector3(-localPoint.x, localPoint.y, localPoint.z),
        n: new THREE.Vector3(-localNormal.x, localNormal.y, localNormal.z)
      });
    }

    const r = brushRadius;
    const rSq = r * r;
    const intensity = brushIntensity * 0.12;

    let modified = false;

    targets.forEach(({ pt: center, n: dirNormal }) => {
      for (let i = 0; i < pos.count; i++) {
        vertex.fromBufferAttribute(pos, i);
        const distSq = vertex.distanceToSquared(center);
        if (distSq < rSq) {
          const dist = Math.sqrt(distSq);
          // Smooth bell falloff (SculpGL cosine falloff)
          const falloff = Math.cos((dist / r) * (Math.PI * 0.5));
          const delta = intensity * falloff;

          if (activeTool === 'carve') {
            // Subtractive: displace inward along normal
            vertex.addScaledVector(dirNormal, -delta);
          } else if (activeTool === 'buildup') {
            // Additive: displace outward along normal
            vertex.addScaledVector(dirNormal, delta);
          } else if (activeTool === 'smooth') {
            // Laplacian Fingertip Smoothing (Module Step 6)
            // Relaxes vertex towards local average spherical center
            const avgTarget = center.clone().addScaledVector(dirNormal, 0.05);
            vertex.lerp(avgTarget, delta * 0.4);
          } else if (activeTool === 'flatten') {
            // Craft-stick plane flattening (Module Step 4)
            const planeDist = vertex.clone().sub(center).dot(dirNormal);
            vertex.addScaledVector(dirNormal, -planeDist * delta * 0.8);
          } else if (activeTool === 'inflate') {
            // Radial expansion from local point
            const outward = vertex.clone().sub(center).normalize();
            vertex.addScaledVector(outward, delta);
          }

          pos.setXYZ(i, vertex.x, vertex.y, vertex.z);
          modified = true;
        }
      }
    });

    if (modified) {
      pos.needsUpdate = true;
      geometry.computeVertexNormals();
    }
  }, [activeTool, brushRadius, brushIntensity, symmetryX]);

  // Raycast to mesh
  const raycastMesh = useCallback((clientX, clientY) => {
    if (!rendererRef.current || !cameraRef.current || !meshRef.current) return null;
    const rect = rendererRef.current.domElement.getBoundingClientRect();
    mouse.x = ((clientX - rect.left) / rect.width) * 2 - 1;
    mouse.y = -((clientY - rect.top) / rect.height) * 2 + 1;
    raycaster.setFromCamera(mouse, cameraRef.current);
    const intersects = raycaster.intersectObject(meshRef.current, false);
    return intersects.length > 0 ? intersects[0] : null;
  }, []);

  // Mouse & Touch Event Handlers for 3D Canvas
  const handlePointerDown = (e) => {
    // Only sculpt on left click (button 0)
    if (interactionMode !== 'sculpt' || e.button !== 0) return;
    const hit = raycastMesh(e.clientX, e.clientY);
    if (hit) {
      saveUndoState();
      isSculptingRef.current = true;
      performSculptAtPoint(hit.point, hit.face.normal);
    }
  };

  const handlePointerMove = (e) => {
    const hit = raycastMesh(e.clientX, e.clientY);
    
    // Update brush ring indicator position and orientation
    if (brushHelperRef.current) {
      if (hit && interactionMode === 'sculpt') {
        brushHelperRef.current.visible = true;
        brushHelperRef.current.position.copy(hit.point).addScaledVector(hit.face.normal, 0.02);
        brushHelperRef.current.quaternion.setFromUnitVectors(new THREE.Vector3(0, 0, 1), hit.face.normal);
        brushHelperRef.current.scale.set(brushRadius, brushRadius, brushRadius);
      } else {
        brushHelperRef.current.visible = false;
      }
    }

    if (isSculptingRef.current && hit) {
      performSculptAtPoint(hit.point, hit.face.normal);
    }
  };

  const handlePointerUp = () => {
    isSculptingRef.current = false;
  };

  // Capture High-Res Snapshot for Plaque
  const handleCaptureAndPresent = () => {
    if (!rendererRef.current) return;
    const dataUrl = rendererRef.current.domElement.toDataURL('image/png');
    setCapturedSnapshot(dataUrl);
    setExhibitionCardReady(true);
    setSharingStatus(null);
    setShareFeedback(null);
    setCurrentSharedId(null);
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.7 }
    });
    setTimeout(() => {
      exhibitionRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 150);
  };

  // Load community sculptures from Supabase on mount
  const fetchCommunitySculptures = useCallback(async () => {
    if (!isSupabaseConfigured) return;
    setLoadingCommunity(true);
    setCommunityError(null);
    try {
      const { data, error } = await getCommunitySculptures();
      if (error) {
        setCommunityError(error.message);
      } else if (data) {
        setCommunitySculptures(data);
      }
    } catch (err) {
      setCommunityError(err.message);
    } finally {
      setLoadingCommunity(false);
    }
  }, []);

  useEffect(() => {
    setMySculpturesList(getMySculptures());
    fetchCommunitySculptures();
  }, [fetchCommunitySculptures]);

  // Share snapshot to Supabase Community Showcase
  const handleShareToCommunity = async () => {
    if (!capturedSnapshot) return;
    setSharingStatus('sharing');
    setShareFeedback(null);

    try {
      const compressed = await compressSnapshot(capturedSnapshot);
      const deleteToken = 'del_' + Math.random().toString(36).substring(2) + Date.now().toString(36);

      const { data, error } = await postCommunitySculpture({
        title: artworkTitle,
        artistName: artistName,
        artistStatement: artistStatement,
        mediumId: selectedMediumId,
        imageData: compressed,
        deleteToken
      });

      if (error) {
        setSharingStatus('error');
        setShareFeedback(error.message || 'Failed to share sculpture. Ensure database table is created.');
        return;
      }

      if (data && data[0]) {
        const newId = data[0].id;
        saveMySculpture(newId, deleteToken);
        setMySculpturesList(getMySculptures());
        setCurrentSharedId(newId);
        setSharingStatus('success');
        setShareFeedback('Sculpture successfully published to the Community Showcase!');
        fetchCommunitySculptures();
        confetti({ particleCount: 50, spread: 60 });
      }
    } catch (err) {
      setSharingStatus('error');
      setShareFeedback(err.message || 'Error processing image.');
    }
  };

  // Delete a sculpture using the creator's secret deleteToken
  const handleDeleteSculpture = async (id) => {
    const localItem = mySculpturesList.find(s => s.id === id);
    if (!localItem) {
      alert("Only the original creator on this device can delete this sculpture.");
      return;
    }

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this sculpture from the community showcase? This cannot be undone."
    );
    if (!confirmDelete) return;

    try {
      const { error } = await deleteCommunitySculpture({
        id,
        deleteToken: localItem.deleteToken
      });

      if (error) {
        alert('Failed to delete: ' + error.message);
        return;
      }

      removeMySculptureFromStorage(id);
      setMySculpturesList(getMySculptures());
      if (currentSharedId === id) {
        setCurrentSharedId(null);
        setSharingStatus(null);
      }
      setCommunitySculptures(prev => prev.filter(s => s.id !== id));
    } catch (err) {
      alert('Delete error: ' + err.message);
    }
  };

  return (
    <section id="studio" className="py-24 bg-[#FAF8F4] border-t border-stone-gray/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <SectionHeader
          tag="Original Creative Output • 3D Sculpting Atelier"
          title="Digital Sculpture Studio"
          subtitle="A real-time WebGL 3D sculpting simulator built purely in client-side JavaScript. Spin, carve, smooth, and model your virtual sculpture in full 3D, inspired by traditional atelier techniques and modern 3D tools like SculpGL."
        />

        {/* MAIN STUDIO WORKBENCH */}
        <div className="bg-white rounded-3xl border border-stone-gray/30 p-6 sm:p-8 shadow-museum-lg">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Left Column (4 cols): Studio Toolbar & Material Controls */}
            <div className="lg:col-span-4 space-y-6">
              
              {/* 1. Mode Switcher (Sculpt vs 360 Orbit) */}
              <div>
                <label className="text-[11px] font-bold uppercase tracking-wider text-charcoal-500 block mb-2">
                  Interaction Mode
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setInteractionMode('sculpt')}
                    className={`p-3 rounded-xl border text-xs font-semibold flex items-center justify-center gap-2 transition-all ${
                      interactionMode === 'sculpt'
                        ? 'bg-terracotta text-white border-terracotta shadow-xs'
                        : 'bg-ivory border-stone-gray/30 text-charcoal hover:border-terracotta'
                    }`}
                  >
                    <Hammer className="w-4 h-4" />
                    <span>Sculpt Tool</span>
                  </button>
                  <button
                    onClick={() => setInteractionMode('orbit')}
                    className={`p-3 rounded-xl border text-xs font-semibold flex items-center justify-center gap-2 transition-all ${
                      interactionMode === 'orbit'
                        ? 'bg-olive text-white border-olive shadow-xs'
                        : 'bg-ivory border-stone-gray/30 text-charcoal hover:border-olive'
                    }`}
                  >
                    <Compass className="w-4 h-4" />
                    <span>360° Rotate View</span>
                  </button>
                </div>
                <span className="text-[10px] text-charcoal-400 block mt-1">
                  {interactionMode === 'sculpt' 
                    ? 'Left-click & drag on mesh to sculpt. Right-click & drag to rotate view.' 
                    : 'Left-click & drag anywhere to spin your sculpture in 360°.'}
                </span>
              </div>

              {/* 2. Sculpting Tools */}
              <div>
                <label className="text-[11px] font-bold uppercase tracking-wider text-charcoal-500 block mb-2">
                  Sculpting Brush (Atelier Techniques)
                </label>
                <div className="space-y-1.5">
                  {tools.map((t) => {
                    const Icon = t.icon;
                    const isActive = activeTool === t.id;
                    return (
                      <button
                        key={t.id}
                        onClick={() => {
                          setActiveTool(t.id);
                          setInteractionMode('sculpt');
                        }}
                        className={`w-full p-2.5 rounded-xl border text-left text-xs transition-all flex items-center justify-between ${
                          isActive
                            ? 'bg-terracotta-50/70 border-terracotta text-terracotta-dark font-semibold shadow-xs'
                            : 'bg-ivory/40 border-stone-gray/30 text-charcoal hover:border-stone-gray'
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <Icon className={`w-4 h-4 ${isActive ? 'text-terracotta' : 'text-stone-dark'}`} />
                          <div>
                            <span className="block">{t.name}</span>
                            <span className="text-[10px] text-charcoal-500 font-normal">{t.desc}</span>
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 3. Brush Sliders & Symmetry */}
              <div className="p-4 bg-ivory rounded-2xl border border-stone-gray/20 space-y-3.5 text-xs">
                <div>
                  <div className="flex justify-between text-charcoal font-semibold mb-1">
                    <span>Brush Radius (Size)</span>
                    <span>{Math.round(brushRadius * 100)}%</span>
                  </div>
                  <input
                    type="range"
                    min="0.15"
                    max="1.1"
                    step="0.05"
                    value={brushRadius}
                    onChange={(e) => setBrushRadius(parseFloat(e.target.value))}
                    className="w-full accent-terracotta cursor-pointer"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-charcoal font-semibold mb-1">
                    <span>Brush Intensity (Force)</span>
                    <span>{Math.round(brushIntensity * 100)}%</span>
                  </div>
                  <input
                    type="range"
                    min="0.05"
                    max="0.6"
                    step="0.05"
                    value={brushIntensity}
                    onChange={(e) => setBrushIntensity(parseFloat(e.target.value))}
                    className="w-full accent-terracotta cursor-pointer"
                  />
                </div>

                <div className="flex items-center justify-between pt-1 border-t border-stone-gray/20">
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="symmetry"
                      checked={symmetryX}
                      onChange={(e) => setSymmetryX(e.target.checked)}
                      className="rounded-sm text-terracotta focus:ring-terracotta accent-terracotta w-4 h-4"
                    />
                    <label htmlFor="symmetry" className="font-semibold text-charcoal cursor-pointer">
                      X-Axis Symmetry (Mirror)
                    </label>
                  </div>
                  <button
                    onClick={() => setWireframe(!wireframe)}
                    className={`text-[10px] px-2 py-0.5 rounded-sm border ${
                      wireframe ? 'bg-charcoal text-white' : 'bg-white border-stone-gray/40 text-charcoal-600'
                    }`}
                  >
                    Wireframe
                  </button>
                </div>
              </div>

              {/* 4. Medium Material Palette */}
              <div>
                <label className="text-[11px] font-bold uppercase tracking-wider text-charcoal-500 block mb-2">
                  Sculpture Medium & Shader
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {mediums.map((m) => (
                    <button
                      key={m.id}
                      onClick={() => setSelectedMediumId(m.id)}
                      className={`p-2.5 rounded-xl border text-xs text-left transition-all ${
                        selectedMediumId === m.id
                          ? 'border-terracotta bg-white font-semibold shadow-xs ring-1 ring-terracotta'
                          : 'border-stone-gray/30 bg-ivory/40 text-charcoal hover:border-stone-gray'
                      }`}
                    >
                      <span className="block truncate text-charcoal">{m.name.split('(')[0]}</span>
                      <span className="text-[10px] text-charcoal-500 block">{m.technique.split(' ')[0]}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* 5. Base Shape Geometry */}
              <div>
                <label className="text-[11px] font-bold uppercase tracking-wider text-charcoal-500 block mb-2">
                  Starting Raw Geometry
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {shapePresets.map((s) => (
                    <button
                      key={s.id}
                      onClick={() => setSelectedShapeId(s.id)}
                      className={`p-2 rounded-xl border text-[11px] text-center transition-all ${
                        selectedShapeId === s.id
                          ? 'border-olive bg-olive-50 text-olive-dark font-semibold'
                          : 'border-stone-gray/30 bg-ivory/40 text-charcoal hover:border-stone-gray'
                      }`}
                    >
                      {s.name}
                    </button>
                  ))}
                </div>
              </div>

            </div>

            {/* Middle Column (5 cols): 3D WebGL Viewport */}
            <div className="lg:col-span-5 flex flex-col items-center">
              
              {/* Viewport Top Bar */}
              <div className="w-full flex items-center justify-between mb-2 text-xs text-charcoal-600">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-charcoal">WebGL 3D Canvas</span>
                  <span className="text-[10px] bg-emerald-50 text-emerald-800 px-2 py-0.5 rounded-full border border-emerald-200 font-mono">
                    60 FPS
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    disabled={!canUndo}
                    onClick={handleUndo}
                    className="p-1.5 rounded-lg border border-stone-gray/30 text-charcoal-600 hover:text-terracotta disabled:opacity-40 transition-colors"
                    title="Undo Brush Stroke"
                  >
                    <Undo className="w-4 h-4" />
                  </button>
                  <button
                    onClick={handleResetMesh}
                    className="inline-flex items-center gap-1 text-[11px] text-terracotta hover:underline font-semibold"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Reset Block</span>
                  </button>
                </div>
              </div>

              {/* Real 3D Viewport Container */}
              <div
                ref={mountRef}
                onPointerDown={handlePointerDown}
                onPointerMove={handlePointerMove}
                onPointerUp={handlePointerUp}
                className="w-full aspect-square max-w-[480px] bg-[#F5F1E8] rounded-2xl overflow-hidden shadow-inner border-2 border-stone-gray/40 relative cursor-crosshair touch-none select-none"
              >
                {/* 3D Viewport Controls Overlay */}
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between pointer-events-none text-[10px] text-charcoal-500 bg-white/80 backdrop-blur-xs px-3 py-1.5 rounded-lg border border-stone-gray/30">
                  <span>Tool: <strong>{tools.find(t => t.id === activeTool)?.name}</strong></span>
                  <span>{symmetryX ? 'Symmetry Active' : 'No Symmetry'}</span>
                  <span>Drag to Sculpt</span>
                </div>
              </div>

              <p className="mt-3 text-[11px] text-charcoal-500 text-center italic">
                Tip: Hold Right-Click & drag to rotate the sculpture in 3D while sculpting.
              </p>
            </div>

            {/* Right Column (3 cols): Artist Statement & Presentation */}
            <div className="lg:col-span-3 space-y-4">
              <div>
                <label className="text-[11px] font-bold uppercase tracking-wider text-charcoal-500 block mb-1">
                  Sculpture Title
                </label>
                <input
                  type="text"
                  value={artworkTitle}
                  onChange={(e) => setArtworkTitle(e.target.value)}
                  placeholder="Title your 3D sculpture..."
                  className="w-full px-3 py-2 rounded-xl border border-stone-gray/40 text-xs bg-ivory/30 focus:bg-white focus:outline-hidden focus:border-terracotta"
                />
              </div>

              <div>
                <label className="text-[11px] font-bold uppercase tracking-wider text-charcoal-500 block mb-1">
                  Sculptor's Name
                </label>
                <input
                  type="text"
                  value={artistName}
                  onChange={(e) => setArtistName(e.target.value)}
                  placeholder="Your name or handle..."
                  className="w-full px-3 py-2 rounded-xl border border-stone-gray/40 text-xs bg-ivory/30 focus:bg-white focus:outline-hidden focus:border-terracotta"
                />
              </div>

              <div>
                <label className="text-[11px] font-bold uppercase tracking-wider text-charcoal-500 block mb-1">
                  Artist Statement
                </label>
                <textarea
                  rows={4}
                  value={artistStatement}
                  onChange={(e) => setArtistStatement(e.target.value)}
                  placeholder="Explain why you made this artwork and the essence of its form..."
                  className="w-full p-3 rounded-xl border border-stone-gray/40 text-xs bg-ivory/30 focus:bg-white focus:outline-hidden focus:border-terracotta leading-relaxed"
                />
              </div>

              <button
                onClick={handleCaptureAndPresent}
                className="w-full mt-4 py-3 rounded-xl bg-terracotta text-white font-semibold text-xs hover:bg-terracotta-dark transition-all duration-200 shadow-md flex items-center justify-center gap-2 cursor-pointer"
              >
                <Camera className="w-4 h-4" />
                <span>Capture 3D Sculpture & Display</span>
              </button>
            </div>

          </div>
        </div>

        {/* EXHIBITION PRESENTATION PLAQUE (Generated with actual WebGL 3D Snapshot) */}
        {exhibitionCardReady && (
          <div 
            ref={exhibitionRef}
            className="mt-12 max-w-3xl mx-auto bg-white rounded-3xl border-2 border-terracotta/40 p-8 sm:p-12 shadow-2xl animate-fadeIn relative overflow-hidden"
          >
            {/* Header */}
            <div className="text-center pb-6 border-b border-stone-gray/20">
              <span className="text-[11px] font-bold uppercase tracking-widest text-terracotta">
                SCULPTURA 3D ATELIER • CERTIFICATE OF ORIGINAL CREATIVE OUTPUT
              </span>
              <h3 className="font-display-serif text-3xl sm:text-4xl font-bold text-charcoal mt-2">
                “{artworkTitle}”
              </h3>
              <p className="text-sm font-academic italic text-olive-dark mt-1">
                Sculpted in 3D by {artistName}
              </p>
            </div>

            {/* Embedded 3D Snapshot */}
            {capturedSnapshot && (
              <div className="my-6 max-w-sm mx-auto rounded-2xl overflow-hidden border-2 border-stone-gray/30 shadow-md bg-[#F5F1E8]">
                <img src={capturedSnapshot} alt={artworkTitle} className="w-full h-auto object-cover" />
                <div className="p-2 text-center text-[10px] text-charcoal-500 bg-white/90">
                  Real-time WebGL 3D Render Snapshot
                </div>
              </div>
            )}

            {/* Plaque Specs */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-4 border-b border-stone-gray/20 text-center text-xs">
              <div>
                <span className="text-charcoal-400 text-[10px] uppercase font-bold block">Medium</span>
                <span className="font-semibold text-charcoal">
                  {mediums.find(m => m.id === selectedMediumId)?.name.split('(')[0]}
                </span>
              </div>
              <div>
                <span className="text-charcoal-400 text-[10px] uppercase font-bold block">Technique</span>
                <span className="font-semibold text-charcoal">
                  {mediums.find(m => m.id === selectedMediumId)?.technique}
                </span>
              </div>
              <div>
                <span className="text-charcoal-400 text-[10px] uppercase font-bold block">Simulator</span>
                <span className="font-semibold text-charcoal">SculpGL-Engine</span>
              </div>
              <div>
                <span className="text-charcoal-400 text-[10px] uppercase font-bold block">Course Year</span>
                <span className="font-semibold text-charcoal">2026 • Art App.</span>
              </div>
            </div>

            {/* Artist Statement */}
            <div className="py-6 space-y-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-terracotta block">
                Official Artist Statement & Philosophical Essence
              </span>
              <p className="font-academic italic text-base sm:text-lg text-charcoal-800 leading-relaxed bg-ivory/60 p-5 rounded-2xl border border-stone-gray/20">
                “{artistStatement}”
              </p>
            </div>

            {/* Sharing Feedback Banner */}
            {shareFeedback && (
              <div className={`mb-6 p-4 rounded-xl text-xs flex items-center gap-2.5 ${
                sharingStatus === 'error'
                  ? 'bg-red-50 text-red-700 border border-red-200'
                  : 'bg-emerald-50 text-emerald-800 border border-emerald-200'
              }`}>
                {sharingStatus === 'error' ? (
                  <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
                ) : (
                  <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
                )}
                <span>{shareFeedback}</span>
              </div>
            )}

            {/* Footer Seal & Actions */}
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-between text-xs text-charcoal-500 gap-4 border-t border-stone-gray/20">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Verified Art Appreciation Original Creative Output</span>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                {/* Share to Community Showcase Button */}
                {currentSharedId ? (
                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center gap-1 px-3 py-2 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-semibold">
                      <Check className="w-3.5 h-3.5" />
                      <span>Shared in Showcase</span>
                    </span>
                    <button
                      onClick={() => handleDeleteSculpture(currentSharedId)}
                      className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl border border-red-200 text-red-600 hover:bg-red-50 text-xs font-medium transition-colors cursor-pointer"
                      title="Delete your sculpture from the community showcase"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Delete from Showcase</span>
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={handleShareToCommunity}
                    disabled={sharingStatus === 'sharing'}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-terracotta text-white font-semibold text-xs hover:bg-terracotta-dark transition-all duration-200 shadow-sm cursor-pointer disabled:opacity-50"
                  >
                    <Share2 className="w-3.5 h-3.5" />
                    <span>{sharingStatus === 'sharing' ? 'Publishing...' : 'Share to Community Showcase'}</span>
                  </button>
                )}

                <button
                  onClick={() => window.print()}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl border border-stone-gray/40 text-charcoal font-medium hover:bg-stone-gray/10 text-xs transition-colors cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Print Plaque</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* COMMUNITY 3D SCULPTURES EXHIBITION SHOWCASE */}
        <div className="mt-24 pt-16 border-t border-stone-gray/30">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-terracotta block mb-1">
                Visitor Creations • Live Community Exhibition
              </span>
              <h3 className="font-display-serif text-3xl sm:text-4xl font-bold text-charcoal">
                Shared Student Sculptures
              </h3>
              <p className="text-xs sm:text-sm text-charcoal-600 mt-1">
                Explore 3D sculptures sculpted and shared by fellow students and visitors. Creators can delete their own sculptures at any time.
              </p>
            </div>

            <button
              onClick={fetchCommunitySculptures}
              disabled={loadingCommunity}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-stone-gray/30 bg-white text-xs font-medium text-charcoal hover:border-terracotta hover:text-terracotta transition-colors shadow-xs cursor-pointer"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loadingCommunity ? 'animate-spin text-terracotta' : ''}`} />
              <span>Refresh Gallery</span>
            </button>
          </div>

          {/* Table not created notice if applicable */}
          {communityError && communityError.toLowerCase().includes('community_sculptures') && (
            <div className="mb-8 p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <strong className="block font-semibold">Supabase Setup Tip:</strong>
                To enable the shared gallery, copy and run the SQL in <code className="bg-amber-100 px-1 py-0.5 rounded text-[11px]">database/sculptures_schema.sql</code> in your Supabase SQL editor.
              </div>
            </div>
          )}

          {/* Loading State */}
          {loadingCommunity && communitySculptures.length === 0 && (
            <div className="text-center py-16">
              <div className="inline-block w-8 h-8 border-3 border-terracotta border-t-transparent rounded-full animate-spin"></div>
              <p className="text-xs text-charcoal-500 mt-3">Loading visitor sculptures...</p>
            </div>
          )}

          {/* Empty State */}
          {!loadingCommunity && communitySculptures.length === 0 && (
            <div className="text-center py-16 px-4 rounded-3xl border-2 border-dashed border-stone-gray/40 bg-white/60 max-w-2xl mx-auto">
              <Globe className="w-12 h-12 text-charcoal-300 mx-auto mb-3" />
              <h4 className="font-display-serif text-xl font-bold text-charcoal">
                The Community Gallery Floor is Open
              </h4>
              <p className="text-xs sm:text-sm text-charcoal-600 max-w-md mx-auto mt-2 mb-6 leading-relaxed">
                No sculptures have been shared yet. Shape your virtual sculpture in the atelier above, click <strong>“Capture 3D Sculpture & Display”</strong>, and then click <strong>“Share to Community Showcase”</strong> to display your artwork here for everyone to admire!
              </p>
            </div>
          )}

          {/* Sculptures Grid */}
          {communitySculptures.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {communitySculptures.map((sculpture) => {
                const isOwner = mySculpturesList.some(item => item.id === sculpture.id);
                const mediumObj = mediums.find(m => m.id === sculpture.medium_id) || mediums[0];

                return (
                  <div
                    key={sculpture.id}
                    className="bg-white rounded-2xl border border-stone-gray/30 overflow-hidden shadow-museum flex flex-col hover:shadow-lg transition-all duration-300 group"
                  >
                    {/* Render Image with Overlay */}
                    <div className="relative aspect-4/3 bg-[#F5F1E8] overflow-hidden border-b border-stone-gray/20">
                      <img
                        src={sculpture.image_data}
                        alt={sculpture.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                      <div className="absolute top-3 left-3">
                        <span className="text-[10px] font-bold uppercase tracking-wider bg-black/60 backdrop-blur-xs text-white px-2.5 py-1 rounded-full shadow-xs">
                          {mediumObj.name.split('(')[0]}
                        </span>
                      </div>
                      <div className="absolute top-3 right-3">
                        <span className="text-[10px] font-semibold bg-white/90 text-charcoal-700 px-2 py-0.5 rounded-full shadow-xs">
                          {new Date(sculpture.created_at).toLocaleDateString(undefined, {
                            month: 'short',
                            day: 'numeric'
                          })}
                        </span>
                      </div>
                    </div>

                    {/* Metadata & Artist Statement */}
                    <div className="p-5 flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex items-start justify-between gap-2 mb-1">
                          <h4 className="font-display-serif text-lg font-bold text-charcoal">
                            {sculpture.title}
                          </h4>
                        </div>
                        <p className="text-xs font-academic italic text-terracotta mb-3">
                          By {sculpture.artist_name}
                        </p>
                        <p className="text-xs text-charcoal-700 bg-ivory/60 p-3 rounded-xl border border-stone-gray/20 leading-relaxed italic line-clamp-4">
                          “{sculpture.artist_statement}”
                        </p>
                      </div>

                      {/* Footer Actions (Owner Delete Button) */}
                      <div className="mt-4 pt-3 border-t border-stone-gray/20 flex items-center justify-between">
                        <span className="text-[11px] text-charcoal-500 font-medium">
                          {mediumObj.technique}
                        </span>

                        {isOwner ? (
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md flex items-center gap-1 border border-emerald-200">
                              <Check className="w-3 h-3 text-emerald-600" />
                              Your Artwork
                            </span>
                            <button
                              onClick={() => handleDeleteSculpture(sculpture.id)}
                              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg border border-red-200 bg-red-50/60 text-red-600 text-xs font-semibold hover:bg-red-100 hover:border-red-300 transition-colors cursor-pointer"
                              title="Delete this sculpture from the community showcase"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                              <span>Delete</span>
                            </button>
                          </div>
                        ) : (
                          <span className="text-[10px] text-charcoal-400">
                            Community Exhibit
                          </span>
                        )}
                      </div>

                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

      </div>
    </section>
  );
}
