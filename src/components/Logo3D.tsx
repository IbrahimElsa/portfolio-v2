'use client'

import React, { useRef, useEffect } from 'react'
import * as THREE from 'three'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'

export default function Logo3D() {
  const mountRef = useRef<HTMLDivElement>(null)

  // Bright cyan color for better contrast
  const logoColor = 0x00ffff 
  
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
    currentMount.appendChild(renderer.domElement)
    
    // Enhanced lighting setup for better contrast
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.5)
    scene.add(ambientLight)
    
    // Main key light from front
    const directionalLight1 = new THREE.DirectionalLight(0xffffff, 2.5)
    directionalLight1.position.set(0, 0, 5)
    scene.add(directionalLight1)
    
    // Fill lights
    const directionalLight2 = new THREE.DirectionalLight(0xffffff, 1.8)
    directionalLight2.position.set(-5, 0, 2)
    scene.add(directionalLight2)
    
    const directionalLight3 = new THREE.DirectionalLight(0xffffff, 1.8)
    directionalLight3.position.set(5, 0, 2)
    scene.add(directionalLight3)
    
    // Spinning model group
    const spinningModel = new THREE.Group()
    scene.add(spinningModel)
    
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
        
        // Apply enhanced material
        model.traverse((child) => {
          if (child instanceof THREE.Mesh) {
            child.material = new THREE.MeshStandardMaterial({
              color: logoColor,
              metalness: 0.9,
              roughness: 0.1,
              emissive: new THREE.Color(logoColor).multiplyScalar(0.4),
              emissiveIntensity: 0.6
            });
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