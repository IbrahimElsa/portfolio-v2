'use client'

import React, { useRef, useEffect } from 'react'
import * as THREE from 'three'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'

export default function Logo3D() {
  const mountRef = useRef<HTMLDivElement>(null)

  // Stainless steel color - silver with a slight blue tint
  const logoColor = 0xD1D6DE 
  
  useEffect(() => {
    if (!mountRef.current) return
    
    const currentMount = mountRef.current

    // Scene setup
    const scene = new THREE.Scene()
    
    // Camera setup
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 1000)
    camera.position.set(0, 0, 5)
    camera.lookAt(0, 0, 0)
    
    // Responsive renderer size based on screen width
    const isMobile = window.innerWidth < 768
    const logoSize = isMobile ? 100 : 150 // Smaller on mobile
    
    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ 
      alpha: true, 
      antialias: true
    })
    renderer.setSize(logoSize, logoSize)
    renderer.setClearColor(0x000000, 0)
    
    // Enable physically correct lighting
    interface RendererWithLighting extends THREE.WebGLRenderer {
      useLegacyLights?: boolean;
      physicallyCorrectLights?: boolean;
    }
    
    // Then use this specific type instead of any
    if ('useLegacyLights' in renderer) {
      (renderer as RendererWithLighting).useLegacyLights = false;
    } else if ('physicallyCorrectLights' in renderer) {
      (renderer as RendererWithLighting).physicallyCorrectLights = true;
    }
    
    // Add tone mapping for better visual quality
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.toneMappingExposure = 1.0
    
    currentMount.appendChild(renderer.domElement)
    
    // Enhanced lighting setup for stainless steel effect
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
    scene.add(ambientLight)
    
    // Main key light from front-right (cooler tone)
    const directionalLight1 = new THREE.DirectionalLight(0xF8F9FF, 1.8)
    directionalLight1.position.set(2, 1, 3)
    scene.add(directionalLight1)
    
    // Fill light from left (warmer tone)
    const directionalLight2 = new THREE.DirectionalLight(0xFFF8F0, 1.2)
    directionalLight2.position.set(-3, 0, 2)
    scene.add(directionalLight2)
    
    // Rim light from back
    const directionalLight3 = new THREE.DirectionalLight(0xFFFFFF, 1.5)
    directionalLight3.position.set(0, 3, -3)
    scene.add(directionalLight3)
    
    // Subtle cool-toned environment light from bottom
    const directionalLight4 = new THREE.DirectionalLight(0xD6E9FF, 0.6)
    directionalLight4.position.set(0, -2, 1)
    scene.add(directionalLight4)
    
    // Spinning model group
    const spinningModel = new THREE.Group()
    scene.add(spinningModel)
    
    // Create cube environment map for reflections
    const cubeRenderTarget = new THREE.WebGLCubeRenderTarget(256)
    cubeRenderTarget.texture.type = THREE.HalfFloatType
    
    // Load the GLB model
    const loader = new GLTFLoader()
    loader.load(
      '/Logo3D.glb',
      (gltf) => {
        const model = gltf.scene
        
        // Center the model
        const box = new THREE.Box3().setFromObject(model)
        const center = box.getCenter(new THREE.Vector3())
        
        // Reset position within the group
        model.position.set(-center.x, -center.y, -center.z)
        
        // Scale the model
        const size = box.getSize(new THREE.Vector3())
        const maxDim = Math.max(size.x, size.y, size.z)
        const scale = 2.7 / maxDim
        model.scale.set(scale, scale, scale)
        
        // Create stainless steel material
        const stainlessSteelMaterial = new THREE.MeshPhysicalMaterial({
          color: logoColor,
          metalness: 0.85,          // High metalness for steel look
          roughness: 0.25,          // Low roughness for polished appearance
          reflectivity: 0.9,        // High reflectivity
          clearcoat: 0.2,           // Slight clear coat for extra shine
          clearcoatRoughness: 0.3,  // Some variation in the clear coat
          envMapIntensity: 1.2,     // Stronger reflections
        });
        
        // Apply stainless steel material
        model.traverse((child) => {
          if (child instanceof THREE.Mesh) {
            child.material = stainlessSteelMaterial;
            
            // Cast and receive shadows
            child.castShadow = true;
            child.receiveShadow = true;
          }
        })
        
        // Add model to the group
        spinningModel.add(model)
      },
      undefined,
      (error) => {
        console.error('An error happened loading the GLB file:', error)
      }
    )
    
    // Set up OrbitControls
    const controls = new OrbitControls(camera, renderer.domElement)
    controls.target.set(0, 0, 0)
    controls.enableDamping = true
    controls.dampingFactor = 0.05
    controls.autoRotate = false
    controls.enableZoom = false // Disable zoom for better mobile experience
    
    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate)
      spinningModel.rotation.y += 0.003
      controls.update()
      renderer.render(scene, camera)
    }
    animate()
    
    // Handle window resize
    const handleResize = () => {
      const isMobile = window.innerWidth < 768
      const newSize = isMobile ? 100 : 150
      renderer.setSize(newSize, newSize)
    }
    window.addEventListener('resize', handleResize)
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize)
      currentMount.removeChild(renderer.domElement)
    }
  }, [])
  
  // Optimized positioning for mobile and desktop
  return (
    <div 
      ref={mountRef} 
      className="absolute top-4 left-4 sm:top-6 sm:left-6 z-10 cursor-pointer" 
    />
  )
}