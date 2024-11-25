import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  ReactNode,
  useState,
} from "react";
import {
  Engine,
  Render,
  World,
  Bodies,
  Runner,
  Mouse,
  MouseConstraint,
  Events,
} from "matter-js";
import { cn } from "@/lib/utils";

type GravityProps = {
  children: ReactNode;
  debug?: boolean;
  gravity?: number;
};

interface MatterBodyProps {
  children: ReactNode;
  friction?: number;
  restitution?: number;
  density?: number;
  isStatic?: boolean;
  className?: string;  // Will parse positioning from here
}

interface PhysicsBody {
  element: HTMLElement;
  body: Matter.Body;
  props: MatterBodyProps;
}

// Utility function to parse position values
const parsePosition = (className?: string) => {
  if (!className) return { x: 0, y: 0 };

  const leftMatch = className.match(/left-\[?(\d+)%?\]?/);
  const topMatch = className.match(/top-\[?(\d+)%?\]?/);
  
  return {
    x: leftMatch ? parseInt(leftMatch[1]) : 0,
    y: topMatch ? parseInt(topMatch[1]) : 0,
  };
};

// Create context outside of component to avoid recreation
const GravityContext = createContext<{
  registerElement: (
    id: string,
    element: HTMLElement,
    props: MatterBodyProps
  ) => void;
  unregisterElement: (id: string) => void;
} | null>(null);

export const MatterBody = ({ children, className, ...props }: MatterBodyProps) => {
  const elementRef = useRef<HTMLDivElement>(null);
  const idRef = useRef(Math.random().toString(36).substr(7));
  const context = useContext(GravityContext);

  useEffect(() => {
    if (!elementRef.current || !context) return;
    context.registerElement(idRef.current, elementRef.current, props);
    return () => context.unregisterElement(idRef.current);
  }, [props]);

  return (
    <div 
      ref={elementRef} 
      className={cn("absolute pointer-events-none", className)}
    >
      {children}
    </div>
  );
};

const Gravity = ({ children, debug = false, gravity = 1 }: GravityProps) => {
  const canvas = useRef<HTMLDivElement>(null);
  const engine = useRef(Engine.create());
  const render = useRef<Render>();
  const runner = useRef<Runner>();
  const bodiesMap = useRef(new Map<string, PhysicsBody>());
  const frameId = useRef<number>();
  const mouseConstraint = useRef<Matter.MouseConstraint>();

  const [isDragging, setIsDragging] = useState(false);

  const registerElement = useCallback(
    (id: string, element: HTMLElement, props: MatterBodyProps) => {
      if (!canvas.current) return;

      const bounds = element.getBoundingClientRect();
      const canvasBounds = canvas.current.getBoundingClientRect();

      console.log(props);

      const body = Bodies.rectangle(
        Math.random() * 500 + 100,
        Math.random() * 30 + 100,
        bounds.width,
        bounds.height,
        {
          friction: props.friction ?? 0.1,
          restitution: props.restitution ?? 0.1,
          density: props.density ?? 0.001,
          isStatic: props.isStatic ?? false,
          render: {
            fillStyle: debug ? "#888888" : "#00000000",
            strokeStyle: debug ? "#333333" : "#00000000",
            lineWidth: debug ? 3 : 0,
          },
        }
      );

      World.add(engine.current.world, [body]);
      bodiesMap.current.set(id, { element, body, props });
    },
    [debug]
  );

  const unregisterElement = useCallback((id: string) => {
    const body = bodiesMap.current.get(id);
    if (body) {
      World.remove(engine.current.world, body.body);
      bodiesMap.current.delete(id);
    }
  }, []);

  const updateElements = useCallback(() => {
    bodiesMap.current.forEach(({ element, body }) => {
      const { x, y } = body.position;
      const rotation = body.angle * (180 / Math.PI);

      element.style.transform = `translate(${x - element.offsetWidth / 2}px, ${
        y - element.offsetHeight / 2
      }px) rotate(${rotation}deg)`;
    });

    frameId.current = requestAnimationFrame(updateElements);
  }, []);

  const initializeRenderer = useCallback(() => {
    if (!canvas.current) return;

    const height = canvas.current.offsetHeight;
    const width = canvas.current.offsetWidth;

    engine.current.gravity.y = gravity;

    render.current = Render.create({
      element: canvas.current,
      engine: engine.current,
      options: {
        width,
        height,
        wireframes: false,
        background: "#00000000",
      },
    });

    const mouse = Mouse.create(render.current.canvas);
    mouseConstraint.current = MouseConstraint.create(engine.current, {
      mouse: mouse,
      constraint: {
        stiffness: 0.2,
        render: {
          visible: debug,
        },
      },
    });

    // // Add drag start/end detection
    // const handleMouseDown = () => setIsDragging(true);
    // const handleMouseUp = () => setIsDragging(false);

    // Events.on(mouseConstraint.current, "startdrag", handleMouseDown);
    // Events.on(mouseConstraint.current, "enddrag", handleMouseUp);

    // Add walls
    World.add(engine.current.world, [
      mouseConstraint.current,
      Bodies.rectangle(width / 2, -10, width, 20, {
        isStatic: true,
        friction: 1,
        render: {
          visible: debug,
        },
      }),
      Bodies.rectangle(width / 2, height + 10, width, 20, {
        isStatic: true,
        friction: 1,
        render: {
          visible: debug,
        },
      }), // Floor
      Bodies.rectangle(width + 10, height / 2, 20, height, {
        isStatic: true,
        friction: 1,
        render: {
          visible: debug,
        },
      }), // Right wall
      Bodies.rectangle(-10, height / 2, 20, height, {
        isStatic: true,
        friction: 1,
        render: {
          visible: debug,
        },
      }), // Left wall
    ]);

    render.current.mouse = mouse;

    Render.run(render.current);
    runner.current = Runner.create();
    Runner.run(runner.current, engine.current);

    // Start the animation frame loop
    frameId.current = requestAnimationFrame(updateElements);
  }, [gravity, updateElements, debug]);

  const clearRenderer = useCallback(() => {
    if (frameId.current) {
      cancelAnimationFrame(frameId.current);
    }

    if (mouseConstraint.current) {
      //Events.off(mouseConstraint.current, "startdrag", () => setIsDragging(false));
      //Events.off(mouseConstraint.current, "enddrag", () => setIsDragging(false));
      World.remove(engine.current.world, mouseConstraint.current);
    }

    if (render.current) {
      Mouse.clearSourceEvents(render.current.mouse);
      Render.stop(render.current);
      render.current.canvas.remove();
    }

    if (runner.current) {
      Runner.stop(runner.current);
    }

    if (engine.current) {
      World.clear(engine.current.world);
      Engine.clear(engine.current);
    }

    bodiesMap.current.clear();
  }, []);

  useEffect(() => {
    initializeRenderer();
    return clearRenderer;
  }, [initializeRenderer, clearRenderer]);

  return (
    <GravityContext.Provider value={{ registerElement, unregisterElement }}>
      <div
        ref={canvas}
        className="absolute top-0 left-0 w-full h-full"
      >
        {children}
      </div>
    </GravityContext.Provider>
  );
};

export default Gravity;
