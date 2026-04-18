'use client';

import { useState } from 'react';

export default function Home() {
  const [formData, setFormData] = useState({
      coursename: '',
      examdate: '',
      syllabuschapters: '',
      availablestudyhours: ''
  });
  const [output, setOutput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      setOutput(data.result || data.error || 'No response');
    } catch {
      setOutput('Error generating response.');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 text-white">
      <div className="max-w-3xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-3" style={{ color: `hsl(145,60%,50%)` }}>
            AI Education Tool
          </h1>
          <p className="text-gray-400">Fill in the fields below and click Generate</p>
        </div>

        <div className="space-y-5 mb-8">
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: `hsl(145,60%,50%)` }}>Course Name</label>
            <input
              type="text"
              value={formData.coursename}
              onChange={(e) => setFormData({ ...formData, coursename: e.target.value })}
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white placeholder-white/40 focus:outline-none focus:border-white/30"
              placeholder={"Enter course name"}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: `hsl(145,60%,50%)` }}>Exam Date</label>
            <input
              type="text"
              value={formData.examdate}
              onChange={(e) => setFormData({ ...formData, examdate: e.target.value })}
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white placeholder-white/40 focus:outline-none focus:border-white/30"
              placeholder={"Enter exam date"}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: `hsl(145,60%,50%)` }}>Syllabus Chapters</label>
            <input
              type="text"
              value={formData.syllabuschapters}
              onChange={(e) => setFormData({ ...formData, syllabuschapters: e.target.value })}
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white placeholder-white/40 focus:outline-none focus:border-white/30"
              placeholder={"Enter syllabus chapters"}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: `hsl(145,60%,50%)` }}>Available Study Hours</label>
            <input
              type="text"
              value={formData.availablestudyhours}
              onChange={(e) => setFormData({ ...formData, availablestudyhours: e.target.value })}
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white placeholder-white/40 focus:outline-none focus:border-white/30"
              placeholder={"Enter available study hours"}
            />
          </div>
        </div>

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full py-3 px-6 rounded-lg font-semibold text-white transition-all hover:opacity-90 disabled:opacity-50"
          style={{ backgroundColor: `hsl(145,60%,50%)` }}
        >
          {loading ? 'Generating...' : 'Generate'}
        </button>

        {output && (
          <div className="mt-8">
            <h2 className="text-lg font-semibold mb-3" style={{ color: `hsl(145,60%,50%)` }}>Result</h2>
            <div className="bg-white/5 border border-white/10 rounded-xl p-6 text-gray-300 whitespace-pre-wrap">
              {output}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
