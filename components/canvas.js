import * as React from "react";
import { useEffect } from "react";
import { ReactSketchCanvas } from "react-sketch-canvas";

import { Undo as UndoIcon, Trash as TrashIcon } from "lucide-react";

export default function Canvas({
  startingPaths,
  onScribble,
  scribbleExists,
  setScribbleExists,
}) {
  const canvasRef = React.useRef(null);

  useEffect(() => {
    // Hack to work around Firfox bug in react-sketch-canvas
    // https://github.com/vinothpandian/react-sketch-canvas/issues/54
    document
      .querySelector("#react-sketch-canvas__stroke-group-0")
      ?.removeAttribute("mask");

    loadStartingPaths();
  }, []);

  async function loadStartingPaths() {
    await canvasRef.current.loadPaths(startingPaths);
    setScribbleExists(true);
    onChange();
  }

  const onChange = async () => {
    const paths = await canvasRef.current.exportPaths();
    localStorage.setItem("paths", JSON.stringify(paths, null, 2));

    if (!paths.length) return;

    setScribbleExists(true);

    const data = await canvasRef.current.exportImage("png");
    onScribble(data);
  };

  const undo = () => {
    canvasRef.current.undo();
  };

  const reset = () => {
    setScribbleExists(false);
    canvasRef.current.resetCanvas();
  };

  return (
    <div className="relative">
      {scribbleExists || (
        <div>
          <div className="absolute  grid w-full h-full p-3 place-items-center pointer-events-none text-xl">
            <span className=" text-lime-200 ">Imagine ➡️ Draw ➡️ Repeat🔂 </span>
          </div>
        </div>
      )}

      <ReactSketchCanvas
        ref={canvasRef}
        className="w-full aspect-square border-none cursor-crosshair"
        strokeWidth={4}
        strokeColor="yellow"
        onChange={onChange}
        withTimestamp={true}
        canvasColor='rgba(20, 8, 42, 0.5)'
      />

      {scribbleExists && (
        <div className="animate-in fade-in duration-700 text-left">
          <button className="text-lime-300 text-lg " onClick={undo}>
            <UndoIcon className="icon" />
            Undo
          </button>
          <button className="lil-button" onClick={reset}>
            <TrashIcon className="icon" />
            Clear
          </button>
        </div>
      )}
    </div>
  );
}
