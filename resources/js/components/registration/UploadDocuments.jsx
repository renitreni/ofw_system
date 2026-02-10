import { useState } from 'react';
import axios from 'axios';

export default function UploadDocuments({ onComplete }) {
    const [files, setFiles] = useState({});
    const [uploading, setUploading] = useState(false);

    const handleFileSelect = (file, type) => {
        setFiles(prev => ({ ...prev, [type]: file }));
    };

    const handleUpload = async () => {
        setUploading(true);
        const ofwId = localStorage.getItem('ofw_id');
        if (!ofwId) {
            alert('OFW ID not found!');
            setUploading(false);
            return;
        }

        try {
            for (const type in files) {
                const file = files[type];
                if (!file) continue;

                const formData = new FormData();
                formData.append('ofw_id', ofwId);
                formData.append('type', type);
                formData.append('file', file);

                await axios.post('/api/documents/upload', formData, {
                    headers: { 'Content-Type': 'multipart/form-data' },
                });
            }

            alert('Documents uploaded successfully!');
            if (onComplete) onComplete();
        } catch (error) {
            console.error(error);
            alert('Failed to upload documents. Try again.');
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="upload-view">
            <p className="form-instruction">Please upload documents:</p>

            <div className="upload-grid">
                {['Passport', 'Contract', 'Medical', 'Visa', 'Flight', 'NBI'].map(type => (
                    <div key={type} className="upload-box">
                        <p className="upload-label">{type}</p>
                        <div
                            className="drag-zone"
                            onClick={() => document.getElementById(type).click()}
                        >
                            <span className="upload-icon">📁</span>
                            <p>{files[type] ? files[type].name : 'Drag & Drop'}</p>
                        </div>
                        <input
                            type="file"
                            id={type}
                            style={{ display: 'none' }}
                            onChange={(e) => handleFileSelect(e.target.files[0], type)}
                        />
                    </div>
                ))}
            </div>

            <button
                className="next-step-btn centered-btn"
                onClick={handleUpload}
                disabled={uploading}
            >
                {uploading ? 'Uploading...' : 'Submit Documents'}
            </button>
        </div>
    );
}
