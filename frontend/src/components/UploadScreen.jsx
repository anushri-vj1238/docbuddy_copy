import React, { useEffect, useRef, useState } from "react";

const modeTitle = {
  text: "Paste your document text",
  file: "Upload a text file",
  photo: "Add a photo or camera scan"
};

const modeHint = {
  text: "Best for contracts copied from email or PDFs.",
  file: "Upload a .txt file and review before analyzing.",
  photo: "Use your gallery or camera and DocBuddy will extract text."
};

export default function UploadScreen({ mode, onBackHome, onSubmit, error }) {
  const [text, setText] = useState("");
  const [cameraStream, setCameraStream] = useState(null);

  const fileInputRef = useRef(null);
  const imageInputRef = useRef(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    setText("");
  }, [mode]);

  useEffect(() => {
    if (!cameraStream || !videoRef.current) return;
    videoRef.current.srcObject = cameraStream;

    return () => {
      cameraStream.getTracks().forEach((track) => track.stop());
    };
  }, [cameraStream]);

  function handleAnalyze() {
    if (!text.trim()) return;
    onSubmit(text);
  }

  function handleFileUpload(e) {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      setText(event.target.result || "");
    };
    reader.readAsText(file);
  }

  function handleImageUpload(e) {
    const file = e.target.files[0];
    if (!file) return;

    setText("Mock OCR text from image. Rent is $1200. Late fee is $75 after 5 days.");
  }

  async function handleLiveCamera() {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    setCameraStream(stream);
  }

  function takePhoto() {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    ctx.drawImage(video, 0, 0);

    cameraStream.getTracks().forEach((track) => track.stop());
    setCameraStream(null);
    setText("Mock camera scan text. Lease is 12 months. Late fee is $75.");
  }

  return (
    <div className="min-h-screen ghibli-bg p-6 md:p-10">
      <div className="mx-auto max-w-4xl rounded-3xl border border-blue-100 bg-white/85 p-6 shadow-xl backdrop-blur-sm md:p-8">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-blue-500">DocBuddy input</p>
            <h1 className="mt-1 text-3xl font-black text-slate-800 md:text-4xl">{modeTitle[mode]}</h1>
            <p className="mt-2 text-slate-600">{modeHint[mode]}</p>
          </div>
          <button onClick={onBackHome} className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700">
            ← Back to choices
          </button>
        </div>

        <div className="mt-6 rounded-2xl border border-blue-100 bg-gradient-to-r from-blue-50 via-pink-50 to-green-50 p-4">
          {mode === "text" && (
            <textarea
              className="h-64 w-full rounded-2xl border border-slate-200 bg-white p-4 focus:outline-none focus:ring-2 focus:ring-blue-300"
              placeholder="Paste your document text here..."
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
          )}

          {mode === "file" && (
            <div>
              <button
                onClick={() => fileInputRef.current.click()}
                className="rounded-xl bg-blue-500 px-4 py-2 font-semibold text-white hover:bg-blue-600"
              >
                Choose .txt file
              </button>
              <input type="file" accept=".txt" ref={fileInputRef} className="hidden" onChange={handleFileUpload} />
              <textarea
                className="mt-4 h-56 w-full rounded-2xl border border-slate-200 bg-white p-4 focus:outline-none focus:ring-2 focus:ring-blue-300"
                placeholder="Uploaded text will appear here..."
                value={text}
                onChange={(e) => setText(e.target.value)}
              />
            </div>
          )}

          {mode === "photo" && (
            <div>
              <div className="mb-3 flex flex-wrap gap-3">
                <button
                  onClick={() => imageInputRef.current.click()}
                  className="rounded-xl bg-pink-500 px-4 py-2 font-semibold text-white hover:bg-pink-600"
                >
                  Select from Gallery
                </button>
                <button
                  onClick={handleLiveCamera}
                  className="rounded-xl bg-green-500 px-4 py-2 font-semibold text-white hover:bg-green-600"
                >
                  Open Camera
                </button>
                <input type="file" accept="image/*" ref={imageInputRef} className="hidden" onChange={handleImageUpload} />
              </div>

              {cameraStream && (
                <div className="mb-3">
                  <video ref={videoRef} autoPlay className="mb-2 w-full rounded-xl border border-slate-200" />
                  <canvas ref={canvasRef} className="hidden" />
                  <button onClick={takePhoto} className="rounded-xl bg-slate-800 px-4 py-2 font-semibold text-white">
                    Capture photo
                  </button>
                </div>
              )}

              <textarea
                className="h-52 w-full rounded-2xl border border-slate-200 bg-white p-4 focus:outline-none focus:ring-2 focus:ring-blue-300"
                placeholder="Extracted text preview will appear here..."
                value={text}
                onChange={(e) => setText(e.target.value)}
              />
            </div>
          )}
        </div>

        {error && <p className="mt-4 text-red-600">{error}</p>}

        <button
          onClick={handleAnalyze}
          disabled={!text.trim()}
          className="mt-6 w-full rounded-xl bg-blue-600 py-3 font-bold text-white shadow transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-blue-300"
        >
          Analyze with DocBuddy
        </button>
      </div>
    </div>
  );
}
