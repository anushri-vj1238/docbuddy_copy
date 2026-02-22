import React from "react";

const choices = [
  {
    id: "text",
    title: "Paste Text",
    description: "Copy and paste a lease, loan, or policy directly.",
    accent: "from-blue-200 to-blue-100"
  },
  {
    id: "file",
    title: "Upload File",
    description: "Import a .txt document from your device.",
    accent: "from-pink-200 to-pink-100"
  },
  {
    id: "photo",
    title: "Photo / Camera",
    description: "Scan from camera or select an image from gallery.",
    accent: "from-green-200 to-green-100"
  }
];

export default function Splash({ onChooseMode }) {
  return (
    <div className="min-h-screen ghibli-bg p-6 md:p-10">
      <div className="mx-auto max-w-5xl">
        <header className="rounded-3xl border border-blue-100 bg-white/85 p-6 text-center shadow-lg backdrop-blur-sm md:p-10">
          <p className="text-sm font-semibold uppercase tracking-widest text-blue-500">DocBuddy</p>
          <h1 className="mt-2 text-4xl font-black text-slate-800 md:text-5xl">Understand before you sign</h1>
          <p className="mx-auto mt-4 max-w-2xl text-slate-600">
            Choose how you want to add your document. We&apos;ll translate legal language into clear,
            student-friendly guidance.
          </p>
        </header>

        <section className="mt-8 grid gap-5 md:grid-cols-3">
          {choices.map((choice) => (
            <button
              key={choice.id}
              onClick={() => onChooseMode(choice.id)}
              className={`group rounded-3xl border border-white/70 bg-gradient-to-br ${choice.accent} p-6 text-left shadow-md transition hover:-translate-y-1 hover:shadow-xl`}
            >
              <h2 className="text-2xl font-bold text-slate-800">{choice.title}</h2>
              <p className="mt-3 text-sm leading-6 text-slate-700">{choice.description}</p>
              <span className="mt-6 inline-block rounded-full bg-white/80 px-3 py-1 text-xs font-semibold text-slate-700 group-hover:bg-white">
                Continue →
              </span>
            </button>
          ))}
        </section>
      </div>
    </div>
  );
}
