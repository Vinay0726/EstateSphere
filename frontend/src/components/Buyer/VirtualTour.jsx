import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { API_BASE_URL } from "../../config/apiConfig";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { FaCouch, FaBed, FaUtensils } from "react-icons/fa";


const VirtualTour = () => {
  const { id } = useParams();
  const sceneRef = useRef(null);
  const sphereRef = useRef(null); // Reference to the sphere
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate=useNavigate();

  useEffect(() => {
    const fetchPropertyDetails = async () => {
      try {
        const token = localStorage.getItem("jwt");
        const response = await axios.get(
          `${API_BASE_URL}/api/properties/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log("rsponse propetty",response.data)
        setProperty(response.data);
      } catch (err) {
        setError("Failed to fetch property details");
      } finally {
        setLoading(false);
      }
    };

    fetchPropertyDetails();
  }, [id]);

  useEffect(() => {
    if (!property || !sceneRef.current) return;

    // Set up Three.js scene
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / (window.innerHeight * 0.8), // Adjust aspect ratio
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    const canvasWidth = window.innerWidth * 0.9; // 90% of the screen width
    const canvasHeight = window.innerHeight * 0.8; // 80% of the screen height
    renderer.setSize(canvasWidth, canvasHeight);
    sceneRef.current.style.width = `${canvasWidth}px`;
    sceneRef.current.style.height = `${canvasHeight}px`;
    sceneRef.current.appendChild(renderer.domElement);

    // Add ambient light
    const light = new THREE.AmbientLight(0x404040, 1.5);
    scene.add(light);

    // Create a sphere geometry for 360-degree view
    const geometry = new THREE.SphereGeometry(500, 60, 40); // Large sphere
    geometry.scale(-1, 1, 1); // Invert the sphere so the texture is visible from inside

    // Initial texture
    const initialTexture = new THREE.TextureLoader().load(
      `${property.hallImage}`
    );
    const material = new THREE.MeshBasicMaterial({ map: initialTexture });
    const sphere = new THREE.Mesh(geometry, material);
    sphereRef.current = sphere; // Store sphere reference for texture updates
    scene.add(sphere);

    // Add OrbitControls for interaction
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableZoom = true;
    controls.minDistance = 10;
    controls.maxDistance = 1000;
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;

    // Set the initial camera position
    camera.position.set(0, 1.6, -3);

    // Animation loop
    const animate = () => {
      controls.update();
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };

    animate();

    // Handle window resize
    const onWindowResize = () => {
      const newCanvasWidth = window.innerWidth * 0.9;
      const newCanvasHeight = window.innerHeight * 0.8;
      camera.aspect = newCanvasWidth / newCanvasHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newCanvasWidth, newCanvasHeight);
      sceneRef.current.style.width = `${newCanvasWidth}px`;
      sceneRef.current.style.height = `${newCanvasHeight}px`;
    };
    window.addEventListener("resize", onWindowResize);

    // Cleanup
    return () => {
      window.removeEventListener("resize", onWindowResize);
      sceneRef.current.removeChild(renderer.domElement);
      renderer.dispose();
    };
  }, [property]);


  // Function to change the texture of the sphere
  const changeTexture = (imagePath) => {
    if (!sphereRef.current) return;
    const newTexture = new THREE.TextureLoader().load(
      `${imagePath}`
    );
    sphereRef.current.material.map = newTexture;
    sphereRef.current.material.needsUpdate = true; // Update the material
  };

  const Loader = () => (
    <div className="flex  items-center ">
      <div className="border-t-4 border-blue-500 border-solid w-16 h-16 rounded-full animate-spin"></div>
    </div>
  );
  if (loading) {
    return <Loader />;;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="h-screen w-screen mt-12 relative bg-gray-50">
    
      {/* Property Details Section */}
      <div className="absolute z-10 top-0 right-10 bg-gray-700 text-white p-4 rounded-lg shadow-lg space-y-2">
        <h1 className="text-xl font-semibold">{property.name}</h1>
        <p className="text-sm">{property.noOfBhk} BHK</p>
        <p className="text-sm">{property.areaSize} Sq/Ft</p>
      </div>

      {/* 3D Scene */}
      <div ref={sceneRef} className="absolute inset-0 ml-8 sm:ml-20"></div>

      {/* Controls Section */}
      <div
        className="absolute bottom-40 left-1/2 transform -translate-x-1/2 bg-white bg-opacity-90 rounded-lg shadow-xl flex space-x-6 py-3 px-6"
        style={{ width: "fit-content" }}
      >
        <button
          className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transform hover:scale-105 transition-all"
          onClick={() => changeTexture(property.hallImage)}
        >
          <FaCouch className="text-xl" />
          <span>Hall</span>
        </button>
        <button
          className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg shadow hover:bg-green-700 transform hover:scale-105 transition-all"
          onClick={() => changeTexture(property.bedImage)}
        >
          <FaBed className="text-xl" />
          <span>Bedroom</span>
        </button>
        <button
          className="flex items-center space-x-2 px-4 py-2 bg-purple-600 text-white rounded-lg shadow hover:bg-purple-700 transform hover:scale-105 transition-all"
          onClick={() => changeTexture(property.kitchenImage)}
        >
          <FaUtensils className="text-xl" />
          <span>Kitchen</span>
        </button>
      </div>
    </div>
  );
};

export default VirtualTour;
