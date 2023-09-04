'use client'

import * as THREE from 'three';
import { Box } from '@chakra-ui/react'
import { useRef, useEffect } from 'react';

export default function Canvas() {

    const containerRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            // use the useRef hook, check window object set the scene, camera, renderer
        }
    },[])

    return (
        <Box height={'100vh'} width={'100%'} ref={containerRef}></Box>
    );
}