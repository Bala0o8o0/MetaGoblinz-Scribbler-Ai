import { useEffect, useState } from "react";

export default function PromptForm({
  initialPrompt,
  onSubmit,
  scribbleExists,
}) {
  const [prompt, setPrompt] = useState(initialPrompt);

  const disabled = !(scribbleExists && prompt?.length > 0);

  useEffect(() => {
    setPrompt(initialPrompt);
  }, [initialPrompt]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(e);
  };

  return (
    <form onSubmit={handleSubmit} className="animate-in fade-in duration-700">
      <div className="flex   mt-4">
        <input
          id="prompt-input"
          type="text"
          name="prompt"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Describe the image you want to create..."
          className="block w-full flex-grow text-white text-2xl bg-transparent rounded-l-md"
        />

        <button
          className={`bg-yellow-400 hover:bg-lime-500 text-black rounded-r-md text-lg  inline-block px-5 py-3 flex-none ${disabled ? " cursor-not-allowed	" : ""
            }`}
          type="submit"
          disabled={disabled}
        >
          Go
        </button>
      </div>
    </form>
  );
}
