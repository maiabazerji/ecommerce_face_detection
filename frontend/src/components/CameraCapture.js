import React, { useRef, useState } from "react";

const CameraCapture = ({ onCapture }) => {
    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const [isCameraActive, setIsCameraActive] = useState(false);

    const startCamera = async () => {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        videoRef.current.srcObject = stream;
        setIsCameraActive(true);
    };

    const capturePhoto = () => {
        const canvas = canvasRef.current;
        const context = canvas.getContext("2d");
        context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
        const imageData = canvas.toDataURL("image/png");
        onCapture(imageData); // Call the parent component's onCapture function
    };

    return (
        <div>
            {isCameraActive ? (
                <div>
                    <video ref={videoRef} autoPlay style={{ width: "100%" }} />
                    <canvas ref={canvasRef} width={640} height={480} style={{ display: "none" }} />
                    <button onClick={capturePhoto}>Capture Photo</button>
                </div>
            ) : (
                <button onClick={startCamera}>Start Camera</button>
            )}
        </div>
    );
};

export default CameraCapture;
