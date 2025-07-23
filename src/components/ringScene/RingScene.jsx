import React, { useRef, useEffect } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

const RingScene = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.1,
      100
    );
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);

    if (containerRef.current && !containerRef.current.hasChildNodes()) {
      containerRef.current.appendChild(renderer.domElement);
    }

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.enableZoom = false;
    controls.enablePan = false;
    controls.enableRotate = false;

    const vertexShader = `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `;

    const fragmentShader = `
      varying vec2 vUv;
      void main() {
        vec3 color1 = vec3(231.0/255.0, 216.0/255.0, 92.0/255.0);
        vec3 color2 = vec3(111.0/255.0, 92.0/255.0, 227.0/255.0);
        vec3 color3 = vec3(223.0/255.0, 121.0/255.0, 244.0/255.0);
        vec3 color4 = vec3(147.0/255.0, 209.0/255.0, 216.0/255.0);
        vec3 color5 = vec3(234.0/255.0, 104.0/255.0, 174.0/255.0);
        vec3 color6 = vec3(44.0/255.0, 42.0/255.0, 70.0/255.0);
        float t = mod(vUv.x * 6.0, 6.0);
        vec3 color;
        if (t < 1.0) color = mix(color1, color2, t);
        else if (t < 2.0) color = mix(color2, color3, t - 1.0);
        else if (t < 3.0) color = mix(color3, color4, t - 2.0);
        else if (t < 4.0) color = mix(color4, color5, t - 3.0);
        else if (t < 5.0) color = mix(color5, color6, t - 4.0);
        else color = mix(color6, color1, t - 5.0);
        gl_FragColor = vec4(color, 1.0);
      }
    `;

    const ringMaterial = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      side: THREE.DoubleSide,
    });

    const torus = new THREE.Mesh(
      new THREE.TorusGeometry(1.2, 0.07, 32, 100),
      ringMaterial
    );
    torus.rotation.set(Math.PI / 4, -Math.PI / 3, -Math.PI / 8);
    scene.add(torus);

    const innerDisk = new THREE.Mesh(
      new THREE.SphereGeometry(1.18, 64, 64),
      new THREE.MeshStandardMaterial({
        color: 0x000000,
        roughness: 1,
        metalness: 0,
      })
    );
    innerDisk.scale.z = 0.2;
    innerDisk.rotation.copy(torus.rotation);
    scene.add(innerDisk);

    const light = new THREE.AmbientLight(0xffffff, 1.5);
    scene.add(light);

    const animate = () => {
      requestAnimationFrame(animate);
      const t = Date.now() * 0.001;
      const floatY = Math.sin(t) * 0.1;
      const wobble = Math.sin(t * 0.5) * 0.05;
      torus.position.y = floatY;
      torus.rotation.x = Math.PI / 4 + wobble;
      torus.rotation.z -= 0.001;
      innerDisk.position.y = floatY;
      innerDisk.rotation.copy(torus.rotation);
      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      controls.dispose();
      renderer.dispose();
      if (containerRef.current && containerRef.current.contains(renderer.domElement)) {
        containerRef.current.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={containerRef} style={{ width: "100%", height: "100vh" }} />;
};

export default RingScene;
