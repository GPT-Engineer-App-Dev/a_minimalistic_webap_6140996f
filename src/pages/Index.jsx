// Minimalistic Mandelbrot Set Renderer using React and Chakra UI
import { Box, Button, Flex, useColorMode, useColorModeValue } from "@chakra-ui/react";
import { FaSun, FaMoon } from "react-icons/fa";
import { useEffect, useRef } from "react";

const Index = () => {
  const canvasRef = useRef(null);
  const { colorMode, toggleColorMode } = useColorMode();
  const bgColor = useColorModeValue("gray.50", "gray.800");
  const color = useColorModeValue("black", "white");

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const width = canvas.width;
    const height = canvas.height;

    const maxIter = 100;
    const zoom = 150;
    const panX = 2;
    const panY = 1.5;

    for (let x = 0; x < width; x++) {
      for (let y = 0; y < height; y++) {
        let a = (x - width / 2) / zoom + panX;
        let b = (y - height / 2) / zoom + panY;
        const ca = a;
        const cb = b;
        let n = 0;

        while (n < maxIter) {
          const aa = a * a - b * b;
          const bb = 2 * a * b;
          a = aa + ca;
          b = bb + cb;
          if (Math.abs(a + b) > 16) {
            break;
          }
          n++;
        }

        const bright = map(n, 0, maxIter, 0, 255);
        const color = n === maxIter ? "black" : `rgb(${bright}, ${bright}, ${bright})`;
        ctx.fillStyle = color;
        ctx.fillRect(x, y, 1, 1);
      }
    }
  }, []);

  function map(value, start1, stop1, start2, stop2) {
    return start2 + (stop2 - start2) * ((value - start1) / (stop1 - start1));
  }

  return (
    <Flex direction="column" align="center" justify="center" minH="100vh" bg={bgColor}>
      <Button onClick={toggleColorMode} mb={4}>
        {colorMode === "light" ? <FaMoon /> : <FaSun />}
      </Button>
      <Box border="2px" borderColor={color} p={2}>
        <canvas ref={canvasRef} width="600" height="400"></canvas>
      </Box>
    </Flex>
  );
};

export default Index;
