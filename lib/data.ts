/**
 * ─────────────────────────────────────────────────────────────────────────────
 * SITE CONTENT — edit this file to update the portfolio.
 *
 * Content sourced from Rithwik's LinkedIn, GitHub, and resumes (July 2026).
 * Sections with an empty array are hidden automatically (publications is
 * empty today — add an entry and the section appears).
 *
 * Each project gets a subpage at /projects/<slug>. Media files live in
 * public/projects/<slug>/ and are listed in the project's `media` array —
 * images (.jpg/.png/.webp) and videos (.mp4/.mov/.webm) both work.
 * ─────────────────────────────────────────────────────────────────────────────
 */

export type SocialLink = { label: string; href: string };
export type Experience = {
  company: string;
  role: string;
  period: string;
  summary?: string;
};
export type Education = {
  school: string;
  credential: string;
  period: string;
  details: string[];
};
export type Award = { title: string; description: string };
export type Publication = {
  title: string;
  authors: string;
  venue: string;
  href?: string;
};
export type SkillArea = {
  area: string;
  groups: { label: string; items: string }[];
};
export type ProjectMedia = { src: string; caption: string };
export type Project = {
  slug: string;
  years: string;
  title: string;
  description: string;
  tags: string[];
  href?: string; // external "More Info" link on the subpage
  details?: string[]; // paragraphs shown on the subpage
  media?: ProjectMedia[]; // numbered figures shown on the subpage
};

export const profile = {
  firstName: "rithwik",
  fullName: "Rithwik Nair",
  siteTitle: "Rithwik's Repository",
  availability: "open to work · austin, tx",
  intro:
    "i'm a roboticist and researcher at westwood high school in austin, tx. i direct our FRC team (2583 orange dynamite), captain FTC team 24133 (ChaiGPT robotics), and build quadrupeds, actuators, and biomedical wearables with custom PCBs on my own time. when i'm not in CAD or the machine shop, i'm running quantum cryptography simulations or prepping for varsity LD debate. i love building systems that survive the real world — reach out!",
  links: [
    { label: "email", href: "mailto:rithwikstnair@gmail.com" },
    { label: "github", href: "https://github.com/RitiCoding" },
    {
      label: "linkedin",
      href: "https://www.linkedin.com/in/rithwik-nair-8692ba323/",
    },
  ] satisfies SocialLink[],
};

export const experience: Experience[] = [
  {
    company: "Westwood Robotics",
    role: "FRC Director",
    period: "May 2026 - Present",
    summary:
      "Leading FRC 2583 Orange Dynamite — directing 70+ students developing competitive robots on the international stage.",
  },
  {
    company: "Westwood Robotics",
    role: "Lead Design Engineer",
    period: "Aug 2024 - May 2026",
    summary:
      "Lead mechanical architect: drivetrain geometry, multi-stage elevators, linkage manipulators, and DFM-driven fabrication across CNC, sheet metal, and additive.",
  },
  {
    company: "ChaiGPT Robotics",
    role: "Team Captain",
    period: "Mar 2023 - Present",
    summary:
      "Captain and lead hardware engineer of FTC Team 24133 across 3 seasons — full CAD ownership in Onshape/Fusion 360, validated across 30+ tournaments.",
  },
  {
    company: "Independent",
    role: "Roboticist & Researcher",
    period: "Jan 2022 - Present",
    summary:
      "End-to-end robotic and biomedical systems: a reconfigurable quadruped, a closed-loop tVNS wearable, and high-efficiency actuators — custom PCBs, firmware, and validation from CAD to field testing.",
  },
  {
    company: "FIRST Robotics",
    role: "Student Volunteer & Mentor",
    period: "Aug 2024 - Present",
    summary:
      "Mentoring FTC and FRC teams, leading outreach that helped launch multiple new teams, and working with educators and district leadership to grow local robotics.",
  },
  {
    company: "NYU Tandon School of Engineering",
    role: "Student Researcher, SPARC",
    period: "Jul 2025 - Aug 2025",
    summary:
      "Applied robotics research under university mentorship — experimental systems taken from proposal through deployment, documented to academic standards.",
  },
  {
    company: "SMU",
    role: "Student Researcher, GSTCA",
    period: "Summer 2025",
    summary:
      "Drone research alongside PhD students at Southern Methodist University through the Governor's Science and Technology Champions Academy.",
  },
  {
    company: "Intel ISEF",
    role: "Student Researcher",
    period: "Aug 2024 - Present",
    summary:
      "Quantum cryptography research — a QKD simulation framework that earned 2nd in Systems Software at GASEF and TXSEF.",
  },
  {
    company: "Westwood High School",
    role: "Varsity LD Debater",
    period: "Aug 2024 - Present",
    summary:
      "Lincoln–Douglas debate on a nationally top-10 ranked team with a research-centric competitive methodology.",
  },
];

export const education: Education[] = [
  {
    school: "Westwood High School",
    credential: "High School Diploma · 4.0 GPA (Unweighted)",
    period: "Expected May 2028",
    details: [
      "AP: Computer Science A, Computer Science Principles, Calculus AB, Precalculus, Physics 1, World History, Human Geography",
      "PLTW: Intro to Engineering Design, Principles of Engineering — Fusion 360 certified",
    ],
  },
];

export const awards: Award[] = [
  {
    title: "FIRST Dean's List Finalist",
    description:
      "FIRST's premier student leadership award — one of ~200 finalists selected from 100,000+ FIRST Tech Challenge students worldwide.",
  },
  {
    title: "2nd Place, Systems Software — TXSEF & GASEF",
    description:
      "2nd place in Systems Software at both the Texas and Greater Austin Science & Engineering Fairs for quantum key distribution research.",
  },
  {
    title: "Nationally Top-10 Debate Program",
    description:
      "Varsity Lincoln–Douglas debater on a nationally top-10 ranked team.",
  },
];

export const publications: Publication[] = [];

export const skills: SkillArea[] = [
  {
    area: "Mechanical Engineering",
    groups: [
      {
        label: "CAD & Design",
        items:
          "Onshape, SolidWorks, Fusion 360, Mechanism Design, Linkages & Differentials, Tolerance Stack-Ups, DFM/DFA",
      },
      {
        label: "Analysis & Validation",
        items:
          "FEA & CFD (SimScale), Load & Deflection Testing, MTBF Tracking, Stiffness-to-Weight Optimization",
      },
      {
        label: "Manufacturing",
        items:
          "Fusion 360 CAM, CNC Machining (Tormach PCNC 1100, OMIO X8), 6061/7075 Aluminum, Sheet Metal, FDM Printing",
      },
    ],
  },
  {
    area: "Electrical & Embedded",
    groups: [
      {
        label: "PCB Design",
        items:
          "KiCad, Hierarchical Schematics, 2-Layer Layout, DRC/ERC, SPICE Simulation, Hand Soldering (SMD & THT)",
      },
      {
        label: "Embedded Systems",
        items:
          "SAMD21, Teensy 4.1, Raspberry Pi, CAN Bus, Real-Time Firmware, Sensor Fusion (Biopotential, GSR, Temperature)",
      },
      {
        label: "Power & Actuation",
        items:
          "Power Architecture, Motor Drivers, Encoders, High-Torque Gimbal Motors, EMI Management",
      },
    ],
  },
  {
    area: "Software & Research",
    groups: [
      {
        label: "Programming",
        items:
          "Python (NumPy, PyCryptodome), Java, C++, ROS, Simulation Frameworks",
      },
      {
        label: "Controls",
        items:
          "Inverse Kinematics, PID Tuning, Closed-Loop Systems, Data Acquisition Pipelines",
      },
      {
        label: "Research",
        items:
          "Quantum Key Distribution, Protocol Simulation, Experimental Design, Technical Writing",
      },
    ],
  },
  {
    area: "Leadership & Communication",
    groups: [
      {
        label: "Teams",
        items:
          "FRC & FTC Leadership (70+ Students), Mentoring & Outreach, Project Planning, Fabrication Direction",
      },
      {
        label: "Debate",
        items: "Varsity Lincoln–Douglas, Argumentation, Public Speaking",
      },
      {
        label: "Languages",
        items: "English, Hindi, Malayalam, Spanish, French",
      },
    ],
  },
];

export const projects: Project[] = [
  {
    slug: "morphonex",
    years: "2025-Now",
    title: "MORPHONEX",
    description:
      "Morphologically reconfigurable quadruped robot that adjusts its stance for different terrain and manipulates objects with forearm manipulators.",
    tags: ["Robotics", "CAD", "Electronics"],
    details: [
      "MORPHONEX is a complete robotic quadruped modeled in Onshape and SolidWorks — frame, articulated legs, drivetrain, and reconfigurable body mechanisms.",
      "The power and control architecture runs a LiPo battery into a 24V rail driving high-torque gimbal motors over a CAN loop to a Teensy 4.1, with a Raspberry Pi 5 on a separate 5V rail for compute.",
      "I derived the inverse kinematics needed for the quadruped to walk and balance on its own, and tuned individual motor PID controllers for positioning accuracy, response time, stability, and disturbance correction.",
      "Reconfigurable body mechanisms let it adjust its stance for different terrain conditions and manipulate objects using forearm manipulators.",
    ],
    media: [],
  },
  {
    slug: "vagosync",
    years: "2025-2026",
    title: "VagoSync",
    description:
      "Closed-loop transcutaneous vagus nerve stimulation (tVNS) wearable — custom PCBs delivering precise biphasic pulses that adapt to real-time sensor feedback.",
    tags: ["Electronics", "Research"],
    details: [
      "VagoSync is a closed-loop neuromodulation prototype integrating sensing, embedded control, power regulation, isolation, and biphasic pulse-generation circuitry.",
      "I designed a custom electrical architecture for extremely precise biphasic electrical pulses at precise intervals, captured in two hierarchical KiCad schematics using root and subsystem sheets.",
      "The two custom two-layer PCBs were routed by hand — component placement, power distribution, signal routing, and grounding — then verified with DRC, ERC, and SPICE simulations before hand-soldering the ICs and through-hole components.",
      "A SAMD21 microcontroller reads three sensors simultaneously (biopotential, temperature, GSR); the firmware estimates changes in autonomic state and adjusts stimulation output in real time.",
    ],
    media: [],
  },
  {
    slug: "qkd-messaging",
    years: "2024-2025",
    title: "QKD-Messaging",
    description:
      "Quantum key distribution simulation framework and secure messaging software. 2nd in Systems Software at GASEF and TXSEF.",
    tags: ["Research", "Software"],
    href: "https://github.com/RitiCoding/QKD-Messaging",
    details: [
      "A quantum field simulation built in Python, translating a theoretical quantum cryptography algorithm into working code — key generation, transmission, error detection, and eavesdropping-detection procedures.",
      "The physics simulations were optimized for faster computational times by vectorizing with NumPy and caching intermediate states.",
      "PyCryptodome powers a new technique of cryptographic communication layered on the simulated quantum key exchange.",
      "This work earned 2nd Place in Systems Software at both the Greater Austin and Texas Science and Engineering Fairs.",
    ],
    media: [],
  },
  {
    slug: "frc-2583",
    years: "2024-2026",
    title: "FRC 2583 Robots",
    description:
      "Full structural layout and electromechanical integration for Westwood's competition robots, validated across 10+ events.",
    tags: ["Robotics", "CAD", "Manufacturing"],
    details: [
      "As lead mechanical architect for FRC 2583 Orange Dynamite, I owned full robot structural layout and electromechanical integration under high-load, high-speed match conditions.",
      "Major subsystems included drivetrain geometry, multi-stage elevators, differential and linkage manipulators, compliant intake systems, and high-torque endgame mechanisms engineered for repeated shock loading.",
      "Full CAD ownership in Onshape: bearing fits, chain/belt center-to-center spacing, gearbox packaging, tube and plate structures, and tolerance stack-ups — with structured prototyping (intake compression mapping, deflection testing, impact-survivability trials) driving decisions.",
      "Fabrication spanned CNC routing, milling and turning, sheet-metal forming, and additive manufacturing, with DFM/DFA standards built for sub-5-minute pit repairs across 10+ events.",
    ],
    media: [],
  },
  {
    slug: "chaigpt-ftc",
    years: "2023-Now",
    title: "ChaiGPT FTC Robots",
    description:
      "Three seasons of FTC Team 24133 hardware, benchmarked across 30+ tournaments.",
    tags: ["Robotics", "CAD"],
    details: [
      "As captain and lead hardware engineer of FTC Team 24133, I've owned the full mechanical architecture across three FTC seasons.",
      "Highlights include 5-stage differential linear slides, belt-driven intake assemblies, multi-pivot linkage manipulators, and high-efficiency transfer mechanisms for rapid game-piece control.",
      "All assemblies are CADed in Onshape and Fusion 360 with tolerance stack-up analysis and weight distribution modeling, iterated through stiffness testing, deflection measurement, and lead-screw vs. belt trade studies.",
      "Field-serviceable layouts — standardized fasteners, slotted tensioning paths, rapid-swap assemblies — kept us competitive across 30+ tournaments of cycle-time benchmarking and MTBF tracking.",
    ],
    media: [],
  },
  {
    slug: "high-efficiency-actuators",
    years: "2024-2025",
    title: "High-Efficiency Actuators",
    description:
      "Custom actuator stacks optimized for torque density, validated through torque characterization and fatigue testing.",
    tags: ["Robotics", "Research", "Electronics"],
    details: [
      "A research project into high-efficiency robotics actuators optimized for torque density, responsiveness, and durability.",
      "Each actuator stack covers geartrain architecture, differential and linkage mechanisms, bearing selection, thermal management, and housing design for tight packaging constraints.",
      "Motors, encoders, drivers, and microcontroller sensing integrate into mechanically rigid, EMI-controlled assemblies.",
      "Performance was validated through torque characterization, backdrive resistance measurement, stress and fatigue testing, and iterative refinement under real robotic load profiles.",
    ],
    media: [],
  },
  {
    slug: "this-website",
    years: "2026",
    title: "This Website",
    description:
      "The site you're looking at — Next.js 16 and Tailwind CSS v4, deployed on Vercel.",
    tags: ["Software"],
    href: "https://github.com/RitiCoding",
    details: [
      "A fully static single-page portfolio built with Next.js 16 (App Router, Turbopack) and Tailwind CSS v4, with per-project subpages generated at build time.",
      "All content lives in a single typed data file — sections hide automatically when empty, and project filters derive from tags.",
      "The black and dark red theme ships with a toggleable light mode, persisted in localStorage and applied before first paint to avoid theme flash.",
    ],
    media: [],
  },
];
