import React, { useRef, useState, useEffect } from "react";

const CameraCapture = ({ onCapture }) => {
    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const [isCameraActive, setIsCameraActive] = useState(false);

    const startCamera = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true });
            if (videoRef.current) { // Ensure videoRef.current is not null
                videoRef.current.srcObject = stream;
                setIsCameraActive(true);
            }
        } catch (error) {
            console.error("Error accessing the camera:", error);
        }
    };

    const capturePhoto = () => {
        const canvas = canvasRef.current;
        const context = canvas.getContext("2d");
        context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
        const imageData = canvas.toDataURL("image/png");
        onCapture(imageData); // Call the parent component's onCapture function
    };

    useEffect(() => {
        if (isCameraActive) {
            startCamera();
        }

        // Store the current videoRef value in a local variable
        const currentVideoRef = videoRef.current;

        return () => {
            // Cleanup: stop the camera stream on unmount
            if (currentVideoRef && currentVideoRef.srcObject) {
                const stream = currentVideoRef.srcObject;
                const tracks = stream.getTracks();
                tracks.forEach(track => track.stop());
                currentVideoRef.srcObject = null;
            }
        };
    }, [isCameraActive]);

    return (
        <div>
            {isCameraActive ? (
                <div>
                    <video ref={videoRef} autoPlay style={{ width: "100%" }} />
                    <canvas ref={canvasRef} width={640} height={480} style={{ display: "none" }} />
                    <button onClick={capturePhoto}>Capture Photo</button>
                </div>
            ) : (
                <p>Please allow camera access.</p>
            )}
        </div>
    );
};

export default CameraCapture;
