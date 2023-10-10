import React, { useEffect } from "react";
import Konva from "konva";
import Nikesvg from "../utils/svgs/222.svg";

function KonvaCanvas({ nikeSwooshColor }) {
  useEffect(() => {
    const stage = new Konva.Stage({
      container: "container",
      width: 400,
      height: 400
    });

    const layer = new Konva.Layer();
    stage.add(layer);

    // Load the locally hosted SVG
    const svgURL = Nikesvg; // Replace with the actual path to your SVG file

    Konva.Image.fromURL(svgURL, (img) => {
      // Modify the image properties as needed (e.g., position, size, etc.)
      img.setAttrs({
        x: 100,
        y: 100,
        width: 200,
        height: 200,
        draggable: true // Make it draggable
      });

      // Add the image to the layer
      layer.add(img);

      // Draw the layer
      layer.draw();
    });
  }, []);

  return <div id="container"></div>;
}

export default KonvaCanvas;
