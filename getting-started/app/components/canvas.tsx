'use client'

import * as THREE from 'three';
import { Box } from '@chakra-ui/react'
import { useRef, useEffect } from 'react';

export default function Canvas() {

    const containerRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            
            // ---------- Scene -----------------
            const scene = new THREE.Scene();

            // ---------- Camera ---------------
            const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100);
            scene.add(camera);

            // ---------- Renderer ---------------  
            const renderer = new THREE.WebGLRenderer();
            renderer.domElement.style.width = '100%';    
            renderer.domElement.style.height = '100%';

            containerRef.current?.appendChild(renderer.domElement);

            // ---------- Resize function -----------
            const handleResize = () => {
                camera.aspect = window.innerWidth / window.innerHeight;
                camera.updateProjectionMatrix();
            };

            // ------------ Infinite animation loop -------------
            const renderScene = () => {
                renderer.render(scene, camera)
                renderer.setAnimationLoop(renderScene)
            }
            renderScene();
            window.addEventListener('resize', handleResize);
            renderer.render(scene, camera);
        }
    },[])

    return (
        <Box height={'100vh'} width={'100%'} ref={containerRef}></Box>
    );
}