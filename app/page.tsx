'use client';
import { useState } from 'react';

export default function StudyGuidePage() {
  const [chapterTitle, setChapterTitle] = useState('');
  const [chapterContent, setChapterContent] = useState('');
  const [subject, setSubject] = useState('');
  const [studyLevel, setStudyLevel] = useState('undergraduate');
  const [includeFlashcards, setIncludeFlashcards] = useState(true);
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!chapterContent.trim()) return;
    setLoading(true);
    setError('');
    setResult('');
    const prompt = `Create a comprehensive study guide and${includeFlashcards ? ' flashcards' : ''} from the following textbook chapter.

Chapter Title: ${chapterTitle || 'Untitled Chapter'}
Subject: ${subject || 'General'}
Study Level: ${studyLevel}
Chapter Content:
${chapterContent}

Format your response with:
1. **Chapter Overview** — a brief summary (3-5 sentences)
2. **Key Concepts** — main themes with brief explanations
3. **Important Terms & Definitions** — glossary of key terminology
4. **Key Points to Remember** — bullet list of critical facts
5. **Quick Review Questions** — 5-10 self-test questions with answers
${includeFlashcards ? '6. **Flashcards** — 10 Q&A flashcards formatted as:\n   Q: [Question]\n   A: [Answer]' : ''}
7. **Study Tips** — specific strategies for mastering this material`;
    try {
      const res = await fetch('/api/generate', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ prompt }) });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Generation failed');
      setResult(data.result);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-950 to-gray-900 text-white">
      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-violet-500/20 border border-violet-500/40 flex items-center justify-center text-2xl">📚</div>
            <h1 className="text-3xl font-bold text-white">AI Study Guide & Flashcard Generator</h1>
          </div>
          <p className="text-gray-400 text-sm ml-13">Generate comprehensive study guides and flashcards from textbook chapters</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="bg-gray-900/60 border border-gray-700/50 rounded-2xl p-5 backdrop-blur-sm">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-xs text-gray-400 mb-1.5 font-semibold uppercase tracking-wider">Chapter Title</label>
                <input value={chapterTitle} onChange={e => setChapterTitle(e.target.value)} placeholder="e.g. The Structure of DNA" className="w-full bg-gray-800/70 border border-gray-700/60 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-violet-500/70 focus:ring-1 focus:ring-violet-500/30 transition-all" />
              </div>
              <div>
                <label className="block text-xs text-gray-400 mb-1.5 font-semibold uppercase tracking-wider">Subject</label>
                <input value={subject} onChange={e => setSubject(e.target.value)} placeholder="e.g. Biology, History..." className="w-full bg-gray-800/70 border border-gray-700/60 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-violet-500/70 focus:ring-1 focus:ring-violet-500/30 transition-all" />
              </div>
              <div>
                <label className="block text-xs text-gray-400 mb-1.5 font-semibold uppercase tracking-wider">Study Level</label>
                <select value={studyLevel} onChange={e => setStudyLevel(e.target.value)} className="w-full bg-gray-800/70 border border-gray-700/60 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-violet-500/70 focus:ring-1 focus:ring-violet-500/30 transition-all">
                  <option value="highschool">High School</option>
                  <option value="undergraduate">Undergraduate</option>
                  <option value="graduate">Graduate</option>
                  <option value="professional">Professional</option>
                </select>
              </div>
              <div className="flex items-center gap-3 pt-6">
                <input type="checkbox" id="flashcards" checked={includeFlashcards} onChange={e => setIncludeFlashcards(e.target.checked)} className="w-4 h-4 accent-violet-500" />
                <label htmlFor="flashcards" className="text-sm text-gray-300">Include Flashcards</label>
              </div>
            </div>
            <div>
              <label className="block text-xs text-gray-400 mb-1.5 font-semibold uppercase tracking-wider">Chapter Content</label>
              <textarea value={chapterContent} onChange={e => setChapterContent(e.target.value)} placeholder="Paste your textbook chapter, lecture notes, or any study material here..." rows={10} className="w-full bg-gray-800/70 border border-gray-700/60 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-violet-500/70 focus:ring-1 focus:ring-violet-500/30 transition-all resize-none" />
            </div>
          </div>
          <button type="submit" disabled={loading || !chapterContent.trim()} className="w-full bg-violet-600 hover:bg-violet-500 disabled:bg-violet-900 disabled:cursor-not-allowed text-white text-sm font-semibold py-3 px-4 rounded-xl transition-all flex items-center justify-center gap-2">
            {loading ? <><span className="animate-spin">⟳</span> Generating Study Guide...</> : <><>✦ Generate Study Guide & Flashcards</></>}
          </button>
          {error && <div className="bg-red-900/20 border border-red-800/50 rounded-xl px-4 py-3 text-red-300 text-sm">{error}</div>}
        </form>
        {result && (
          <div className="mt-6 bg-gray-900/60 border border-gray-700/50 rounded-2xl p-5 backdrop-blur-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-violet-300 uppercase tracking-wider">Generated Study Guide</h3>
              <button onClick={() => navigator.clipboard.writeText(result)} className="text-xs text-gray-400 hover:text-white transition-colors bg-gray-800/70 px-3 py-1.5 rounded-lg border border-gray-700/50">Copy</button>
            </div>
            <pre className="text-gray-300 text-sm whitespace-pre-wrap font-mono leading-relaxed bg-gray-950/60 rounded-xl p-4 border border-gray-800/50 overflow-auto max-h-[500px]">{result}</pre>
          </div>
        )}
      </div>
    </div>
  );
}
