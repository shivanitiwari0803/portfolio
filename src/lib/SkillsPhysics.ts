import Matter from "matter-js";

export interface SkillBody extends Matter.Body {
  skillId: string;
  skillColor: string;
  originalInertia?: number;
  isExpanded?: boolean;
}

export interface PhysicsConfig {
  width: number;
  height: number;
  isMobile: boolean;
  onCollision: (x: number, y: number, speed: number, color: string) => void;
}

export class SkillsPhysics {
  public engine: Matter.Engine;
  public world: Matter.World;
  public runner: Matter.Runner;
  public mouseConstraint: Matter.MouseConstraint;
  public bodiesMap: Map<string, SkillBody> = new Map();
  
  private boundaries: Matter.Body[] = [];
  private config: PhysicsConfig;
  private wallThickness = 150;

  constructor(container: HTMLDivElement, config: PhysicsConfig) {
    this.config = config;

    // 1. Create Engine with sleeping enabled
    this.engine = Matter.Engine.create({
      enableSleeping: true,
      gravity: { y: 0.7, x: 0 },
    });
    this.world = this.engine.world;

    // 2. Setup iterations based on mobile vs desktop
    const iterations = config.isMobile ? 2 : 4;
    this.engine.positionIterations = iterations;
    this.engine.velocityIterations = iterations;
    this.engine.constraintIterations = config.isMobile ? 1 : 2;

    // 3. Create Walls
    this.createBoundaries(config.width, config.height);

    // 4. Create Mouse Constraint
    const mouse = Matter.Mouse.create(container);
    this.mouseConstraint = Matter.MouseConstraint.create(this.engine, {
      mouse: mouse,
      constraint: {
        stiffness: 0.3, // High stiffness for premium feel
        render: { visible: false },
      },
    });

    Matter.Composite.add(this.world, this.mouseConstraint);

    // 5. Setup Drag Event Listeners - Locks rotational inertia while dragging
    this.setupDragEvents();

    // 6. Setup Collision Listeners
    this.setupCollisionEvents();

    // 7. Start runner
    this.runner = Matter.Runner.create();
    Matter.Runner.run(this.runner, this.engine);
  }

  private createBoundaries(width: number, height: number) {
    const t = this.wallThickness;
    const wallOptions = { isStatic: true, restitution: 0.3, friction: 0.1 };

    const ground = Matter.Bodies.rectangle(width / 2, height + t / 2, width + t * 2, t, wallOptions);
    const ceiling = Matter.Bodies.rectangle(width / 2, -t / 2, width + t * 2, t, wallOptions);
    const leftWall = Matter.Bodies.rectangle(-t / 2, height / 2, t, height + t * 2, wallOptions);
    const rightWall = Matter.Bodies.rectangle(width + t / 2, height / 2, t, height + t * 2, wallOptions);

    this.boundaries = [ground, ceiling, leftWall, rightWall];
    Matter.Composite.add(this.world, this.boundaries);
  }

  private setupDragEvents() {
    Matter.Events.on(this.mouseConstraint, "startdrag", (event) => {
      const dragEvent = event as unknown as { body: Matter.Body };
      const body = dragEvent.body as SkillBody;
      if (body) {
        // Lock rotation while dragging by setting inertia to Infinity
        body.originalInertia = body.inertia;
        Matter.Body.setInertia(body, Infinity);
      }
    });

    Matter.Events.on(this.mouseConstraint, "enddrag", (event) => {
      const dragEvent = event as unknown as { body: Matter.Body };
      const body = dragEvent.body as SkillBody;
      if (body && body.originalInertia !== undefined) {
        // Restore rotation inertia and nudge the rotation slightly for natural motion
        Matter.Body.setInertia(body, body.originalInertia);
        Matter.Body.setAngularVelocity(body, (Math.random() - 0.5) * 0.04);
      }
    });
  }

  private setupCollisionEvents() {
    Matter.Events.on(this.engine, "collisionStart", (event) => {
      event.pairs.forEach((pair) => {
        const bodyA = pair.bodyA as SkillBody;
        const bodyB = pair.bodyB as SkillBody;
        if (bodyA.isStatic || bodyB.isStatic) return;

        const speedA = Math.sqrt(bodyA.velocity.x * bodyA.velocity.x + bodyA.velocity.y * bodyA.velocity.y);
        const speedB = Math.sqrt(bodyB.velocity.x * bodyB.velocity.x + bodyB.velocity.y * bodyB.velocity.y);
        const relativeSpeed = Math.max(speedA, speedB);

        // High velocity collision triggers particles/sound feedback
        if (relativeSpeed > 2.0) {
          let cx = (bodyA.position.x + bodyB.position.x) / 2;
          let cy = (bodyA.position.y + bodyB.position.y) / 2;
          if (pair.activeContacts && pair.activeContacts.length > 0) {
            cx = pair.activeContacts[0].vertex.x;
            cy = pair.activeContacts[0].vertex.y;
          }
          const color = bodyA.skillColor || bodyB.skillColor || "#FFD54A";
          this.config.onCollision(cx, cy, relativeSpeed, color);
        }
      });
    });
  }

  public registerCardBody(id: string, color: string, x: number, y: number, w: number, h: number) {
    const body = Matter.Bodies.rectangle(x, y, w, h, {
      restitution: 0.35,  // Slight bounce
      friction: 0.08,
      frictionAir: 0.025, // Natural damping
      angle: (Math.random() - 0.5) * 0.4,
    }) as SkillBody;

    body.skillId = id;
    body.skillColor = color;

    this.bodiesMap.set(id, body);
    Matter.Composite.add(this.world, body);
  }

  public syncBoundaries(width: number, height: number) {
    const t = this.wallThickness;
    const [g, c, l, r] = this.boundaries;
    if (g && c && l && r) {
      Matter.Body.setPosition(g, { x: width / 2, y: height + t / 2 });
      Matter.Body.setPosition(c, { x: width / 2, y: -t / 2 });
      Matter.Body.setPosition(l, { x: -t / 2, y: height / 2 });
      Matter.Body.setPosition(r, { x: width + t / 2, y: height / 2 });
    }
  }

  public setGravity(enabled: boolean) {
    this.engine.gravity.y = enabled ? 0.7 : 0;
  }

  public filterBodies(activeIds: Set<string>, width: number) {
    this.bodiesMap.forEach((body, id) => {
      const isCurrentlyInWorld = Matter.Composite.allBodies(this.world).includes(body);
      const shouldBeInWorld = activeIds.has(id);

      if (shouldBeInWorld && !isCurrentlyInWorld) {
        // Drop back into the sandbox from above the container
        const bounds = body.bounds;
        const w = bounds.max.x - bounds.min.x;
        const x = Math.random() * (width - w - 40) + w / 2 + 20;
        const y = -100 - Math.random() * 80;

        Matter.Body.setPosition(body, { x, y });
        Matter.Body.setVelocity(body, { x: (Math.random() - 0.5) * 2, y: 1 });
        Matter.Composite.add(this.world, body);
      } else if (!shouldBeInWorld && isCurrentlyInWorld) {
        // Remove from physical world
        Matter.Composite.remove(this.world, body);
      }
    });
  }

  public resetPositions(width: number) {
    this.bodiesMap.forEach((body) => {
      const bounds = body.bounds;
      const w = bounds.max.x - bounds.min.x;
      const h = bounds.max.y - bounds.min.y;

      const x = Math.random() * (width - w - 40) + w / 2 + 20;
      const y = -100 - Math.random() * 150 - h;

      Matter.Body.setPosition(body, { x, y });
      Matter.Body.setVelocity(body, { x: (Math.random() - 0.5) * 3, y: 1 });
      Matter.Body.setAngle(body, (Math.random() - 0.5) * 0.4);
      Matter.Body.setAngularVelocity(body, 0);
    });
  }

  public destroy() {
    Matter.Runner.stop(this.runner);
    Matter.Engine.clear(this.engine);
    Matter.Composite.clear(this.world, false);
    this.bodiesMap.clear();
  }
}
