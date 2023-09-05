# Step by Step Instructions to setup threeJs with NextJs & Chakra-Ui

Detailed instruction are provided in the notion file. It also allows you to comment for recommending a change or asking relevant questions.

https://trapezoidal-height-4c2.notion.site/Getting-Started-with-ThreeJs-NextJs-ChakraUi-4cc5cedd118e48cebe2f122c077054ca?pvs=4

### Step 01

Run the following command to create a next project.

```bash
npx create-next-app@latest
```

### Step 02

Navigate to the project folder and open it in vscode.

```bash
cd my-app
```

```bash
code .
```

### Step 03

Install threeJs as well as its types.

```bash
npm install --save three
```

```bash
npm i --save-dev @types/three
```

### Step 04

Install ChakraUi

```bash
npm i @chakra-ui/react @chakra-ui/next-js @emotion/react @emotion/styled framer-motion
```

### Step 05(a)

Setup ChakraUi. Create a `providers.tsx` file inside the app folder. The code for proiders.tsx is available in the [chakraUi documentation under installation for NextJs App directory](https://chakra-ui.com/getting-started/nextjs-guide#app-directory-setup). Furthermore, the code is also illustrated below.

app → providers.tsx

```jsx
"use client";

import { CacheProvider } from "@chakra-ui/next-js";
import { ChakraProvider } from "@chakra-ui/react";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <CacheProvider>
      <ChakraProvider>{children}</ChakraProvider>
    </CacheProvider>
  );
}
```

### Step 05(b)

Import the Providers component from providers.tsx into the layout.tsx and wrap it around children.

app → layout.tsx

```jsx
import { Providers } from "./providers";
.
. rest of the code
.
		<body className={inter.className}>
		  <Providers>
	      {children}
	    </Providers>
    </body>
```

### Step 06

Delete unwanted files such as global.css and module.css.

### Step 07

Navigate to the app directory and create a components directory. Under the components directory make a `canvas.tsx` file.

app → components → canvas.tsx

### Step 08

Inside canvas.tsx import necessary modules from `‘three’` and `<Box>` component from ChakraUi.

```jsx
import * as THREE from "three";
```

```jsx
import { Box } from "@chakra-ui/react";
```

Since we are using chakra-ui and threeJs we need to add `'use client'` directive at the top of the file to make it a client component.

### Step 09

Create the `Canvas` component

```jsx
"use client";

import * as THREE from "three";
import { Box } from "@chakra-ui/react";

export default function Canvas() {
  return <Box>Hello World</Box>;
}
```

### Step 10

Remove the pre-existing code from `page.tsx` and import the newly created `Canvas` component.

```jsx
import Canvas from "@/app/components/canvas";

export default function Home() {
  return <Canvas />;
}
```

### Step 11

Run the command `npm run dev` to test chakraUi and you should be able to see ’Hello World’ on [localhost:3000](http://localhost:3000/).

### Step 12

Inside `canvas.tsx` import `useRef` and `useEffect` from `react`. Create a variable to store the refernece of the DOM element and pass null as the initial value. Then pass the reference to the JSX element (i.e. chakra’s `Box` component). Also, set the width and height of the `Box` to maximum to fill up the entire space.

```jsx
export default function Canvas() {
  const containerRef = (useRef < HTMLDivElement) | (null > null);
  return <Box height={"100vh"} width={"100%"} ref={containerRef}></Box>;
}
```

### Step 13

Underneath the reference variable use the `useEffect` hook and pass an empty dependency array. Inside the `useEffect` check if `window` object is present.

```jsx
export default function Canvas() {
  const containerRef = (useRef < HTMLDivElement) | (null > null);

  useEffect(() => {
    if (typeof window !== "undefined") {
    }
  }, []);

  return <Box height={"100vh"} width={"100%"} ref={containerRef}></Box>;
}
```

### Step 14

Declare `Scene`, `Camera`, `Renderer` .

```jsx
useEffect(() => {
  if (typeof window !== "undefined") {
    // ---------- Scene -----------------
    const scene = new THREE.Scene();

    // ---------- Camera ---------------
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      100
    );
    scene.add(camera);

    // ---------- Renderer ---------------
    const renderer = new THREE.WebGLRenderer();
  }
}, []);
```

### Step 15

Add `camera` to the `scene` and append the dom element which was initially passed null.

```jsx
if (typeof window !== "undefined") {
  // ---------- Scene -----------------
  const scene = new THREE.Scene();

  // ---------- Camera ---------------
  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    100
  );
  scene.add(camera);

  // ---------- Renderer ---------------
  const renderer = new THREE.WebGLRenderer();

  containerRef.current?.appendChild(renderer.domElement);
}
```

### Step 16

Add an infinite animation loop. Pass the function in itself to make it recursive and call the function first time. Finally call the renderer’s render method and pass the `scene` and `camera` into it.

```jsx
// ------------ Infinite animation loop -------------
const renderScene = () => {
  renderer.render(scene, camera);
  renderer.setAnimationLoop(renderScene);
};
renderScene();
renderer.render(scene, camera);
```

`renderer.setAnimationLoop()` uses javascript’s requestAnimationFrame() behind it. So, javascript’s requestAnimationFrame() can also be used instead of threeJs native setAnimationLoop.

### Step 17

Run the command `npm run dev` and you will be able to see the small black screen at the top left corner. That’s the canvas. You can also see its `html` through inspect element inside browser’s dev tools.

Notice how the canvas is rendered at its default size whereas, we explicitly passed the maximum width and height to the chakra’s `Box` component initially.

To make the canvas adjust the full screen we need to give the `renderer` width and height above in the code.

```jsx
// ---------- Renderer ---------------
const renderer = new THREE.WebGLRenderer();
renderer.domElement.style.width = "100%";
renderer.domElement.style.height = "100%";
```

### Step 18

Lets also add the `handleResize` function to make the canvas responsive and update the aspect ratio as well as camera’s projection matrix with it. These two things go hand in hand always.

Attach this `handleResize` to window event listner of resize.

```jsx
// ---------- Resize function -----------
const handleResize = () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
};
window.addEventListener("resize", handleResize);
```

### Step 19

Now, run the command `npm run dev` and everything will be great! You will be able to see the black screen on your screen.

Final code is provided below for reference.

### Final Code

```jsx
"use client";

import * as THREE from "three";
import { Box } from "@chakra-ui/react";
import { useRef, useEffect } from "react";

export default function Canvas() {
  const containerRef = (useRef < HTMLDivElement) | (null > null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      // ---------- Scene -----------------
      const scene = new THREE.Scene();

      // ---------- Camera ---------------
      const camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        100
      );
      scene.add(camera);

      // ---------- Renderer ---------------
      const renderer = new THREE.WebGLRenderer();
      renderer.domElement.style.width = "100%";
      renderer.domElement.style.height = "100%";

      containerRef.current?.appendChild(renderer.domElement);

      // ---------- Resize function -----------
      const handleResize = () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
      };

      // ------------ Infinite animation loop -------------
      const renderScene = () => {
        renderer.render(scene, camera);
        renderer.setAnimationLoop(renderScene);
      };
      renderScene();
      window.addEventListener("resize", handleResize);
      renderer.render(scene, camera);
    }
  }, []);

  return <Box height={"100vh"} width={"100%"} ref={containerRef}></Box>;
}
```
