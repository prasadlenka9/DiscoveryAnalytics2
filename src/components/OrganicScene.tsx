import { useEffect, useRef } from 'react'
import * as THREE from 'three'

/** A small, pointer-reactive sculpture. It pauses offscreen and under reduced motion. */
export function OrganicScene() {
  const hostRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const host = hostRef.current
    if (!host) return

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(32, 1, 0.1, 30)
    camera.position.set(0, 0, 5.7)

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'low-power' })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5))
    renderer.outputColorSpace = THREE.SRGBColorSpace
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.toneMappingExposure = 1.12
    renderer.domElement.setAttribute('aria-hidden', 'true')
    host.appendChild(renderer.domElement)

    scene.add(new THREE.AmbientLight('#fff5df', 1.7))
    const keyLight = new THREE.DirectionalLight('#ffffff', 3.4)
    keyLight.position.set(-3, 4, 5)
    scene.add(keyLight)
    const violetLight = new THREE.PointLight('#56d8bd', 18, 11)
    violetLight.position.set(2.5, -1.8, 1.5)
    scene.add(violetLight)

    const sculpture = new THREE.Group()
    // Keep the live 3D element subordinate to the page's original editorial artwork.
    sculpture.scale.setScalar(0.76)
    scene.add(sculpture)

    const core = new THREE.Mesh(
      new THREE.IcosahedronGeometry(1.25, 5),
      new THREE.MeshPhysicalMaterial({ color: '#238dcc', roughness: 0.2, metalness: 0.22, clearcoat: 1, clearcoatRoughness: 0.15 }),
    )
    core.scale.set(0.94, 1.08, 0.8)
    sculpture.add(core)

    const ribbon = new THREE.Mesh(
      new THREE.TorusGeometry(1.52, 0.16, 24, 120),
      new THREE.MeshPhysicalMaterial({ color: '#4bd457', roughness: 0.19, metalness: 0.55, clearcoat: 0.9 }),
    )
    ribbon.rotation.set(1.05, 0.2, -0.3)
    sculpture.add(ribbon)

    const orbit = new THREE.Mesh(
      new THREE.TorusGeometry(1.82, 0.018, 8, 144),
      new THREE.MeshBasicMaterial({ color: '#56d8bd', transparent: true, opacity: 0.8 }),
    )
    orbit.rotation.set(0.9, 0.4, 0.65)
    sculpture.add(orbit)

    const mote = new THREE.Mesh(
      new THREE.SphereGeometry(0.115, 24, 24),
      new THREE.MeshPhysicalMaterial({ color: '#9beed8', roughness: 0.12, metalness: 0.35, emissive: '#155d78', emissiveIntensity: 0.8 }),
    )
    mote.position.set(1.55, 0.9, 0.35)
    sculpture.add(mote)

    let pointerX = 0
    let pointerY = 0
    let active = false
    let frame = 0
    let previous = 0
    const resize = () => {
      const { width, height } = host.getBoundingClientRect()
      if (!width || !height) return
      camera.aspect = width / height
      camera.updateProjectionMatrix()
      renderer.setSize(width, height, false)
      renderer.render(scene, camera)
    }
    const onPointerMove = (event: PointerEvent) => {
      if (event.pointerType === 'touch') return
      const bounds = host.getBoundingClientRect()
      pointerX = ((event.clientX - bounds.left) / bounds.width - 0.5) * 0.24
      pointerY = ((event.clientY - bounds.top) / bounds.height - 0.5) * 0.18
    }
    const onPointerLeave = () => { pointerX = 0; pointerY = 0 }
    host.addEventListener('pointermove', onPointerMove, { passive: true })
    host.addEventListener('pointerleave', onPointerLeave, { passive: true })
    const resizeObserver = new ResizeObserver(resize)
    resizeObserver.observe(host)

    const render = (time: number) => {
      frame = requestAnimationFrame(render)
      if (!active || time - previous < 1000 / 30) return
      previous = time
      const seconds = time / 1000
      sculpture.rotation.y += (pointerX - sculpture.rotation.y) * 0.035
      sculpture.rotation.x += (pointerY - sculpture.rotation.x) * 0.035
      core.rotation.y = seconds * 0.12
      ribbon.rotation.z = -0.3 + Math.sin(seconds * 0.45) * 0.11
      mote.position.y = 0.9 + Math.sin(seconds * 0.8) * 0.11
      renderer.render(scene, camera)
    }

    const visibilityObserver = new IntersectionObserver(([entry]) => {
      active = entry.isIntersecting && !document.hidden
      if (active && !reducedMotion && !frame) frame = requestAnimationFrame(render)
      if ((!active || reducedMotion) && frame) { cancelAnimationFrame(frame); frame = 0; renderer.render(scene, camera) }
    }, { threshold: 0.05 })
    visibilityObserver.observe(host)
    const onVisibility = () => { active = !document.hidden; if (!active && frame) { cancelAnimationFrame(frame); frame = 0 } }
    document.addEventListener('visibilitychange', onVisibility)
    resize()

    return () => {
      cancelAnimationFrame(frame)
      visibilityObserver.disconnect()
      resizeObserver.disconnect()
      document.removeEventListener('visibilitychange', onVisibility)
      host.removeEventListener('pointermove', onPointerMove)
      host.removeEventListener('pointerleave', onPointerLeave)
      core.geometry.dispose(); ribbon.geometry.dispose(); orbit.geometry.dispose(); mote.geometry.dispose()
      ;[core.material, ribbon.material, orbit.material, mote.material].forEach((material) => material.dispose())
      renderer.dispose()
      renderer.domElement.remove()
    }
  }, [])

  return <div ref={hostRef} className="da-organic-scene" aria-hidden="true" />
}
