import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const HeroScene3D = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Check for WebGL support
    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'high-performance' });
    } catch (e) {
      console.warn('WebGL initialization skipped:', e);
      return;
    }

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.1, 100);
    camera.position.z = 4.8;

    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = false;
    container.appendChild(renderer.domElement);

    // Dynamic Chakra Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const redLight = new THREE.PointLight(0xff2222, 4, 12);
    redLight.position.set(2.5, 2.5, 2.5);
    scene.add(redLight);

    const purpleLight = new THREE.PointLight(0x7b2fff, 3.5, 10);
    purpleLight.position.set(-2.5, -2, 1.5);
    scene.add(purpleLight);

    // Root Shuriken Group
    const shurikenGroup = new THREE.Group();
    scene.add(shurikenGroup);

    // Procedural 4-point aerodynamic Shuriken Blade Geometry
    const shape = new THREE.Shape();
    shape.moveTo(0, 0.45);
    shape.quadraticCurveTo(0.65, 0.85, 2.0, 0);
    shape.quadraticCurveTo(0.65, -0.45, 0, -0.45);
    shape.quadraticCurveTo(-0.65, -0.85, -2.0, 0);
    shape.quadraticCurveTo(-0.65, 0.45, 0, 0.45);

    const extrudeSettings = {
      steps: 1,
      depth: 0.08,
      bevelEnabled: true,
      bevelThickness: 0.04,
      bevelSize: 0.04,
      bevelSegments: 3,
    };

    const bladeGeometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);
    const bladeMaterial = new THREE.MeshStandardMaterial({
      color: 0x1f1224,
      metalness: 0.9,
      roughness: 0.22,
      emissive: 0x660015,
      emissiveIntensity: 0.35,
    });

    const blade1 = new THREE.Mesh(bladeGeometry, bladeMaterial);
    blade1.position.z = -0.04;
    shurikenGroup.add(blade1);

    const blade2 = new THREE.Mesh(bladeGeometry, bladeMaterial);
    blade2.rotation.z = Math.PI / 2;
    blade2.position.z = -0.04;
    shurikenGroup.add(blade2);

    // Center Chakra Hub Ring
    const coreGeo = new THREE.CylinderGeometry(0.42, 0.42, 0.16, 32);
    const coreMat = new THREE.MeshStandardMaterial({
      color: 0x0a0010,
      metalness: 0.95,
      roughness: 0.1,
      emissive: 0xcc0022,
      emissiveIntensity: 0.7,
    });
    const core = new THREE.Mesh(coreGeo, coreMat);
    core.rotation.x = Math.PI / 2;
    shurikenGroup.add(core);

    // Inner Hollow Hole
    const holeGeo = new THREE.CylinderGeometry(0.2, 0.2, 0.18, 32);
    const holeMat = new THREE.MeshBasicMaterial({ color: 0x000000 });
    const hole = new THREE.Mesh(holeGeo, holeMat);
    hole.rotation.x = Math.PI / 2;
    shurikenGroup.add(hole);

    // Glowing Halo Ring
    const haloGeo = new THREE.TorusGeometry(0.62, 0.02, 16, 48);
    const haloMat = new THREE.MeshBasicMaterial({ color: 0x9f5fff, transparent: true, opacity: 0.65 });
    const halo = new THREE.Mesh(haloGeo, haloMat);
    shurikenGroup.add(halo);

    // Orbiting Chakra Sparkle Particles
    const particleCount = 50;
    const particleGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      const radius = 1.6 + Math.random() * 0.9;
      const theta = Math.random() * Math.PI * 2;
      const phi = (Math.random() - 0.5) * Math.PI;

      particlePositions[i * 3] = radius * Math.cos(theta) * Math.cos(phi);
      particlePositions[i * 3 + 1] = radius * Math.sin(phi);
      particlePositions[i * 3 + 2] = radius * Math.sin(theta) * Math.cos(phi);
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    const particleMat = new THREE.PointsMaterial({
      size: 0.065,
      color: 0xff3b3b,
      transparent: true,
      opacity: 0.75,
      blending: THREE.AdditiveBlending,
    });

    const particleSystem = new THREE.Points(particleGeo, particleMat);
    scene.add(particleSystem);

    // Mouse tracking
    let targetX = 0;
    let targetY = 0;
    let mouseX = 0;
    let mouseY = 0;

    const onMouseMove = (e) => {
      const rect = container.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      targetX = x * 0.8;
      targetY = -y * 0.8;
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });

    // Resize handling
    const onResize = () => {
      if (!container) return;
      const width = container.clientWidth;
      const height = container.clientHeight;
      if (width === 0 || height === 0) return;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    const resizeObserver = new ResizeObserver(onResize);
    resizeObserver.observe(container);

    // Animation Loop
    let animationFrameId;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Continuous aerodynamic rotation
      shurikenGroup.rotation.z += 0.015;
      halo.rotation.z -= 0.025;

      // Smooth mouse follow lerp
      mouseX += (targetX - mouseX) * 0.05;
      mouseY += (targetY - mouseY) * 0.05;

      shurikenGroup.rotation.y = mouseX;
      shurikenGroup.rotation.x = mouseY;

      // Ambient float
      shurikenGroup.position.y = Math.sin(elapsedTime * 1.5) * 0.12;

      // Particle system subtle rotation
      particleSystem.rotation.y += 0.004;
      particleSystem.rotation.x += 0.002;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', onMouseMove);
      resizeObserver.disconnect();

      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }

      bladeGeometry.dispose();
      bladeMaterial.dispose();
      coreGeo.dispose();
      coreMat.dispose();
      holeGeo.dispose();
      holeMat.dispose();
      haloGeo.dispose();
      haloMat.dispose();
      particleGeo.dispose();
      particleMat.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="hero-3d-canvas-wrapper"
      style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 1,
        opacity: 0.85,
        overflow: 'hidden',
      }}
    />
  );
};

export default React.memo(HeroScene3D);
