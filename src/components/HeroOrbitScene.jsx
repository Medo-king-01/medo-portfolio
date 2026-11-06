import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { getProject, types } from '@theatre/core';

const project = getProject('medo-portfolio-motion');
const sheet = project.sheet('Hero Orbital Accent');
const controls = sheet.object('Orbital Accent', {
  rotationSpeed: types.number(0.13, { range: [0.02, 0.4] }),
  tilt: types.number(0.28, { range: [-0.2, 0.8] }),
  scale: types.number(0.94, { range: [0.7, 1.25] }),
  opacity: types.number(0.36, { range: [0.12, 0.62] }),
});

let studioInitialization;

function initializeTheatreStudioWhenRequested() {
  if (!import.meta.env.DEV || !new URLSearchParams(window.location.search).has('theatre')) return;
  if (studioInitialization) return;

  studioInitialization = import('@theatre/studio')
    .then(({ default: studio }) => studio.initialize({ usePersistentStorage: true }))
    .catch((error) => {
      console.warn('Theatre Studio could not be initialized for the Hero scene.', error);
    });
}

const HeroOrbitScene = ({ onReady }) => {
  const hostRef = useRef(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return undefined;

    initializeTheatreStudioWhenRequested();

    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: false,
        powerPreference: 'low-power',
      });
    } catch {
      return undefined;
    }

    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
    renderer.setClearColor(0x000000, 0);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.domElement.className = 'hero-orbit-canvas';
    renderer.domElement.setAttribute('aria-hidden', 'true');
    host.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(36, 1, 0.1, 20);
    camera.position.set(0, 0, 5.2);

    const rig = new THREE.Group();
    scene.add(rig);

    const style = getComputedStyle(document.documentElement);
    const accent = new THREE.Color(style.getPropertyValue('--color-7').trim() || '#7b2a27');
    const quietAccent = new THREE.Color(style.getPropertyValue('--color-2').trim() || '#473633');
    const materials = [];
    const geometries = [];

    const addMaterial = (options) => {
      const material = new THREE.MeshBasicMaterial({
        transparent: true,
        depthWrite: false,
        ...options,
      });
      materials.push(material);
      return material;
    };

    const addGeometry = (geometry) => {
      geometries.push(geometry);
      return geometry;
    };

    const crystal = new THREE.Mesh(
      addGeometry(new THREE.IcosahedronGeometry(0.58, 1)),
      addMaterial({ color: accent, wireframe: true, opacity: 0.42 }),
    );
    rig.add(crystal);

    const innerCrystal = new THREE.Mesh(
      addGeometry(new THREE.IcosahedronGeometry(0.34, 1)),
      addMaterial({ color: quietAccent, wireframe: true, opacity: 0.3 }),
    );
    innerCrystal.rotation.set(0.2, 0.35, -0.18);
    rig.add(innerCrystal);

    const orbitA = new THREE.Group();
    orbitA.rotation.set(1.05, 0.22, 0.18);
    rig.add(orbitA);
    orbitA.add(new THREE.Mesh(
      addGeometry(new THREE.TorusGeometry(1.08, 0.007, 3, 96)),
      addMaterial({ color: accent, opacity: 0.52 }),
    ));

    const orbitB = new THREE.Group();
    orbitB.rotation.set(0.32, 1.05, 0.68);
    rig.add(orbitB);
    orbitB.add(new THREE.Mesh(
      addGeometry(new THREE.TorusGeometry(1.34, 0.005, 3, 112)),
      addMaterial({ color: quietAccent, opacity: 0.42 }),
    ));

    const markerMaterial = addMaterial({ color: accent, opacity: 0.86 });
    const markerGeometry = addGeometry(new THREE.SphereGeometry(0.035, 8, 6));
    const markerA = new THREE.Mesh(markerGeometry, markerMaterial);
    markerA.position.set(1.08, 0, 0);
    orbitA.add(markerA);

    const markerB = new THREE.Mesh(markerGeometry, markerMaterial);
    markerB.position.set(-1.34, 0, 0);
    orbitB.add(markerB);

    const values = { ...controls.value };
    const applyControls = (nextValues) => {
      Object.assign(values, nextValues);
      rig.scale.setScalar(values.scale);
      crystal.material.opacity = values.opacity;
      innerCrystal.material.opacity = values.opacity * 0.7;
      orbitA.children[0].material.opacity = values.opacity * 1.2;
      orbitB.children[0].material.opacity = values.opacity;
      markerMaterial.opacity = Math.min(values.opacity * 2.4, 0.95);
    };
    const unsubscribe = controls.onValuesChange(applyControls);

    const resize = () => {
      const width = Math.max(host.clientWidth, 1);
      const height = Math.max(host.clientHeight, 1);
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };

    resize();
    const resizeObserver = typeof ResizeObserver !== 'undefined'
      ? new ResizeObserver(resize)
      : null;
    resizeObserver?.observe(host);
    if (!resizeObserver) window.addEventListener('resize', resize);

    const clock = new THREE.Clock();
    let frameId = 0;
    let inView = false;
    let hasReportedReady = false;
    let pointerX = 0;
    let pointerY = 0;
    let targetPointerX = 0;
    let targetPointerY = 0;
    const pointerRegion = host.closest('#home') || host.parentElement;

    const handlePointerMove = (event) => {
      if (!pointerRegion) return;
      const bounds = pointerRegion.getBoundingClientRect();
      if (!bounds.width || !bounds.height) return;
      targetPointerX = THREE.MathUtils.clamp(((event.clientX - bounds.left) / bounds.width) * 2 - 1, -1, 1);
      targetPointerY = THREE.MathUtils.clamp(((event.clientY - bounds.top) / bounds.height) * 2 - 1, -1, 1);
    };
    const resetPointer = () => {
      targetPointerX = 0;
      targetPointerY = 0;
    };
    pointerRegion?.addEventListener('pointermove', handlePointerMove, { passive: true });
    pointerRegion?.addEventListener('pointerleave', resetPointer, { passive: true });
    pointerRegion?.addEventListener('pointerup', resetPointer, { passive: true });
    pointerRegion?.addEventListener('pointercancel', resetPointer, { passive: true });

    const render = () => {
      frameId = 0;
      if (!inView || document.hidden) return;

      const delta = Math.min(clock.getDelta(), 0.05);
      const elapsed = clock.elapsedTime;
      const pointerEase = Math.min(delta * 3.5, 1);
      pointerX += (targetPointerX - pointerX) * pointerEase;
      pointerY += (targetPointerY - pointerY) * pointerEase;
      rig.rotation.y = elapsed * values.rotationSpeed + pointerX * 0.16;
      rig.rotation.x = values.tilt + pointerY * 0.12 + Math.sin(elapsed * 0.24) * 0.035;
      orbitA.rotation.z += delta * 0.055;
      orbitB.rotation.y -= delta * 0.038;
      innerCrystal.rotation.y -= delta * 0.09;
      renderer.render(scene, camera);
      if (!hasReportedReady) {
        hasReportedReady = true;
        onReady?.(true);
      }
      frameId = window.requestAnimationFrame(render);
    };

    const start = () => {
      if (!frameId && inView && !document.hidden) frameId = window.requestAnimationFrame(render);
    };
    const stop = () => {
      if (!frameId) return;
      window.cancelAnimationFrame(frameId);
      frameId = 0;
    };

    const intersectionObserver = typeof IntersectionObserver !== 'undefined'
      ? new IntersectionObserver(([entry]) => {
        inView = entry.isIntersecting;
        if (inView) start();
        else stop();
      }, { rootMargin: '120px' })
      : null;
    intersectionObserver?.observe(host);
    if (!intersectionObserver) {
      inView = true;
      start();
    }

    const handleVisibilityChange = () => {
      if (document.hidden) stop();
      else start();
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      stop();
      unsubscribe();
      pointerRegion?.removeEventListener('pointermove', handlePointerMove);
      pointerRegion?.removeEventListener('pointerleave', resetPointer);
      pointerRegion?.removeEventListener('pointerup', resetPointer);
      pointerRegion?.removeEventListener('pointercancel', resetPointer);
      intersectionObserver?.disconnect();
      resizeObserver?.disconnect();
      if (!resizeObserver) window.removeEventListener('resize', resize);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      geometries.forEach((geometry) => geometry.dispose());
      materials.forEach((material) => material.dispose());
      renderer.dispose();
      renderer.domElement.remove();
      if (hasReportedReady) onReady?.(false);
    };
  }, [onReady]);

  return <div ref={hostRef} className="hero-orbit-stage" aria-hidden="true" />;
};

export default HeroOrbitScene;
