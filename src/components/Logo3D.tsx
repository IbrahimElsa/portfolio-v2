'use client'

import React, { useRef, useEffect } from 'react'
import * as THREE from 'three'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'

export default function Logo3D() {
  const mountRef = useRef<HTMLDivElement>(null)

  const logoColor = 0x00aaff // Light blue color - change this to any hex color
  
  useEffect(() => {
    if (!mountRef.current) return

    // Scene setup
    const scene = new THREE.Scene()
    
    // Camera setup - positioned to look directly at the logo from the front
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 1000)
    camera.position.set(0, 0, 5) // Positioned directly in front on the z-axis
    camera.lookAt(0, 0, 0)
    
    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ 
      alpha: true, 
      antialias: true
    })
    renderer.setSize(150, 150) // Increased size from 120 to 150
    renderer.setClearColor(0x000000, 0)
    mountRef.current.appendChild(renderer.domElement)
    
    // Enhanced lighting setup for better reflection
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.2)
    scene.add(ambientLight)
    
    // Main key light from front
    const directionalLight1 = new THREE.DirectionalLight(0xffffff, 2.0)
    directionalLight1.position.set(0, 0, 5)
    scene.add(directionalLight1)
    
    // Fill light from left
    const directionalLight2 = new THREE.DirectionalLight(0xffffff, 1.5)
    directionalLight2.position.set(-5, 0, 2)
    scene.add(directionalLight2)
    
    // Fill light from right
    const directionalLight3 = new THREE.DirectionalLight(0xffffff, 1.5)
    directionalLight3.position.set(5, 0, 2)
    scene.add(directionalLight3)
    
    // Variable to hold the loaded model for rotation
    let spinningModel = new THREE.Group()
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
        
        // Scale the model - increased for bigger appearance
        const size = box.getSize(new THREE.Vector3())
        const maxDim = Math.max(size.x, size.y, size.z)
        const scale = 2.5 / maxDim // Increased scale from 1.5 to 2.5
        model.scale.set(scale, scale, scale)
        
        // Change the color of the model
        model.traverse((child) => {
          if (child instanceof THREE.Mesh) {
            // Check if the mesh already has a material
            if (child.material) {
              // For standard materials
              if (child.material.color) {
                child.material.color.set(logoColor)
              } 
              // If using MeshStandardMaterial
              else if (child.material.type === 'MeshStandardMaterial') {
                child.material = new THREE.MeshStandardMaterial({
                  color: logoColor,
                  metalness: 0.8,
                  roughness: 0.2
                })
              }
              // If using other material types
              else {
                // Create a new basic material with the desired color
                child.material = new THREE.MeshPhongMaterial({
                  color: logoColor,
                  shininess: 100
                })
              }
            }
          }
        })
        
        // Ensure correct orientation
        model.rotation.set(0, 0, 0)
        
        // Add model to the group
        spinningModel.add(model)
        
        // Position the group at the origin
        spinningModel.position.set(0, 0, 0)
      },
      (xhr) => {
        console.log((xhr.loaded / xhr.total * 100) + '% loaded')
      },
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
    controls.enableZoom = true
    
    // Animation loop: rotate the logo about its Y-axis
    const animate = () => {
      requestAnimationFrame(animate)
      
      // Rotate the group
      spinningModel.rotation.y += 0.003
      
      controls.update()
      renderer.render(scene, camera)
    }
    animate()
    
    // Handle window resize
    const handleResize = () => {
      renderer.setSize(150, 150) // Keep consistent with the size above
    }
    window.addEventListener('resize', handleResize)
    
    // Cleanup on unmount
    return () => {
      window.removeEventListener('resize', handleResize)
      if (mountRef.current) {
        mountRef.current.removeChild(renderer.domElement)
      }
    }
  }, [])
  
  return <div ref={mountRef} className="absolute top-4 left-4 z-10 cursor-pointer" />
}