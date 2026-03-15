'use client';
import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import styles from './ThreeCell.module.css';

type CellType = 'LP_WORKS' | 'PROFILE' | 'CHATBOT' | 'CONTACT' | 'YOUTUBE' | 'ABOUT';

interface Props {
  type: CellType;
  isHovered: boolean;
}

// 前面画像マップ（指定がないものは共通バックを使用）
const FRONT_IMAGES: Partial<Record<CellType, string>> = {
  LP_WORKS: '/images/lp.png',
  PROFILE:  '/images/plf.png',
  ABOUT:    '/images/about.png',
  CONTACT:  '/images/contact.png',
  CHATBOT:  '/images/chat.png',
};

export default function ThreeCellInner({ type, isHovered }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const speedRef = useRef(0.008);

  useEffect(() => {
    speedRef.current = isHovered ? 0.028 : 0.008;
  }, [isHovered]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let cancelled = false;
    let animId: number;
    let renderer: THREE.WebGLRenderer;
    let ro: ResizeObserver;

    const run = async () => {
      const loader = new THREE.TextureLoader();

      // 背面テクスチャ（全セル共通）
      const backTex = await loader.loadAsync('/images/back.png');

      // 前面テクスチャ（セル固有）
      const frontSrc = FRONT_IMAGES[type];
      const frontTex = frontSrc ? await loader.loadAsync(frontSrc) : null;

      if (cancelled) return;

      const w = canvas.clientWidth || 110;
      const h = canvas.clientHeight || 110;

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(45, w / h, 0.1, 100);
      camera.position.z = 3.6;

      renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
      renderer.setSize(w, h);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setClearColor(0x000000, 0);

      // ライティング
      scene.add(new THREE.AmbientLight(0xffffff, 0.7));
      const dir = new THREE.DirectionalLight(0xffffff, 1.3);
      dir.position.set(4, 5, 5);
      scene.add(dir);
      const fill = new THREE.DirectionalLight(0xffffff, 0.25);
      fill.position.set(-4, -3, -5);
      scene.add(fill);

      // マテリアル
      const greyMat = new THREE.MeshPhongMaterial({
        color: 0x545454,
        shininess: 60,
      });
      const backMat = new THREE.MeshStandardMaterial({ map: backTex });
      const frontMat = frontTex
        ? new THREE.MeshStandardMaterial({ map: frontTex })
        : greyMat;

      // BoxGeometry面順: right(+x), left(-x), top(+y), bottom(-y), front(+z), back(-z)
      const geo = new THREE.BoxGeometry(1.8, 1.8, 0.225);
      const mesh = new THREE.Mesh(geo, [
        greyMat,   // right
        greyMat,   // left
        greyMat,   // top
        greyMat,   // bottom
        frontMat,  // front (+z)
        backMat,   // back (-z)
      ]);

      scene.add(mesh);

      const animate = () => {
        animId = requestAnimationFrame(animate);
        mesh.rotation.y += speedRef.current;
        mesh.rotation.x = Math.sin(Date.now() * 0.0008) * 0.08;
        renderer.render(scene, camera);
      };
      animate();

      ro = new ResizeObserver(() => {
        const cw = canvas.clientWidth;
        const ch = canvas.clientHeight;
        if (cw > 0 && ch > 0) {
          camera.aspect = cw / ch;
          camera.updateProjectionMatrix();
          renderer.setSize(cw, ch);
        }
      });
      ro.observe(canvas);
    };

    run();

    return () => {
      cancelled = true;
      cancelAnimationFrame(animId);
      ro?.disconnect();
      renderer?.dispose();
    };
  }, [type]);

  return <canvas ref={canvasRef} className={styles.canvas} />;
}
