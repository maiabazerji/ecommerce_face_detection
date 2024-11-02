import React from 'react';
import Webcam from 'react-webcam';

const CameraCapture = ({ onCapture }) => {
    const webcamRef = React.useRef(null);

    const capture = React.useCallback(() => {
        const imageSrc = webcamRef.current.getScreenshot();
        onCapture(imageSrc); // Pass the captured image back to the parent component
    }, [webcamRef, onCapture]);

    // Styles for the CameraCapture component
    const styles = {
        container: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#fff',
            borderRadius: '8px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            padding: '20px',
            zIndex: 2,
        },
        button: {
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            padding: '10px 20px',
            borderRadius: '5px',
            cursor: 'pointer',
            transition: 'background-color 0.3s',
            fontSize: '16px',
            marginTop: '10px', // Spacing above the button
            width: '100%', // Full width for consistency
        },
        title: {
            color: '#6a11cb',
            marginBottom: '10px',
        },
    };

    return (
        <div style={styles.container}>
            <h3 style={styles.title}>Capture Your Image</h3>
            <Webcam
                audio={false}
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                width={320}
                height={240}
            />
            <button onClick={capture} style={styles.button}>Capture</button>
        </div>
    );
};

export default CameraCapture;
