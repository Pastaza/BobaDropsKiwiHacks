export type AtlasEntry = {
  slug: string;
  name: string;
  summary: string;
  spotting: string[];
  meaning: string[];
  photography: string[];
};

export const ATLAS: AtlasEntry[] = [
  {
    slug: "cumulus",
    name: "Cumulus (Cu)",
    summary: "Classic ‘cotton ball’ clouds with crisp edges — the default cloud you draw as a kid.",
    spotting: [
      "Detached puffs with brighter tops and flatter, darker bases",
      "Often grows through the day over land (diurnal convection)",
      "Sharp outlines; shadows and contrast are common"
    ],
    meaning: [
      "Small, scattered cumulus usually indicates fair weather",
      "If they grow taller (towering cumulus), showers or storms become more likely",
      "A good visual indicator of active rising air"
    ],
    photography: [
      "Expose for highlights to keep texture in the tops",
      "Wide-angle can emphasize depth + scale",
      "A polarizer can help (but watch for uneven sky darkening)"
    ]
  },
  {
    slug: "cumulonimbus",
    name: "Cumulonimbus (Cb)",
    summary: "The thunderstorm cloud — a huge tower with an anvil top when mature.",
    spotting: [
      "Very tall, mountain-like tower",
      "Top often fibrous/striated and flattened into an anvil",
      "Dark base with ragged lower clouds (scud) sometimes underneath"
    ],
    meaning: [
      "Thunderstorms: lightning, heavy rain, gust fronts",
      "Can produce hail and tornadoes in some conditions",
      "Treat as a safety signal, not just a photo subject"
    ],
    photography: [
      "Shoot from a safe distance — don’t be the tallest thing around",
      "Use a longer lens to compress structure",
      "Try timelapse to capture growth and anvil spread"
    ]
  },
  {
    slug: "cirrus",
    name: "Cirrus (Ci)",
    summary: "High, wispy ice-crystal filaments that look like brushstrokes.",
    spotting: [
      "Thin, fibrous or silky streaks",
      "Very high altitude; often little to no shading",
      "Often lights up early before sunrise / late after sunset"
    ],
    meaning: [
      "Often appears ahead of a weather change (fronts/jet stream dynamics)",
      "Can thicken into cirrostratus",
      "Great ‘sunset enhancer’ because it catches light"
    ],
    photography: [
      "Best at golden hour — they ‘paint’ easily",
      "Underexpose slightly to keep fine texture",
      "Include a horizon anchor to show scale"
    ]
  },
  {
    slug: "cirrocumulus",
    name: "Cirrocumulus (Cc)",
    summary: "Tiny high ripples/grains — a delicate, often short-lived ‘mackerel sky’.",
    spotting: [
      "Very small ripples/grains with little to no shading",
      "Elements are tiny: often less than ~1° (the ‘little finger’ test)",
      "Often appears near cirrus/cirrostratus"
    ],
    meaning: [
      "Often linked to high-level wave motions and instability aloft",
      "Not a direct rain signal by itself",
      "Creates fine texture for dramatic skies"
    ],
    photography: [
      "Try a longer focal length to emphasize repeating patterns",
      "Keep the horizon low; let the pattern fill the frame",
      "Sunrise/sunset gives subtle color gradients"
    ]
  },
  {
    slug: "cirrostratus",
    name: "Cirrostratus (Cs)",
    summary: "A thin, whitish veil of ice cloud — famous for halos around the Sun or Moon.",
    spotting: [
      "Thin, milky veil that can cover much of the sky",
      "Often smooth or faintly fibrous",
      "Look for a halo around Sun/Moon (a big clue)"
    ],
    meaning: [
      "Common ahead of warm fronts and larger weather systems",
      "May thicken/lower into altostratus over time",
      "Indicates moisture spreading in at high levels"
    ],
    photography: [
      "Shoot halos with the sun just behind a building/edge",
      "Expose carefully to avoid blown highlights",
      "A wider lens helps capture the full ring"
    ]
  },
  {
    slug: "altocumulus",
    name: "Altocumulus (Ac)",
    summary: "Mid-level patches/rolls — the classic ‘mackerel sky’ when patterned.",
    spotting: [
      "Rounded patches or rolls; often in groups",
      "Elements commonly ~1–5° (bigger than cirrocumulus)",
      "Sometimes shows a corona near the sun when thin"
    ],
    meaning: [
      "Can indicate instability aloft",
      "May precede convection later in warm seasons",
      "Excellent ‘texture cloud’ for sunsets"
    ],
    photography: [
      "Use a longer lens to compress patterns",
      "Look for leading lines toward the sun",
      "Bracket if the sun is in-frame"
    ]
  },
  {
    slug: "altostratus",
    name: "Altostratus (As)",
    summary: "A mid-level grey/blue sheet: the sun looks like it’s behind frosted glass.",
    spotting: [
      "Uniform sheet, grey or bluish",
      "Sun often visible but muted (no sharp shadows on the ground)",
      "Can show streaks/virga hanging below"
    ],
    meaning: [
      "Often signals the approach of a warm front",
      "Can thicken into nimbostratus (steady precipitation)",
      "Light precipitation can occur if thick"
    ],
    photography: [
      "Use silhouettes for mood",
      "Expose for the sun area to keep gradient detail",
      "Watch for virga — it’s visually striking"
    ]
  },
  {
    slug: "nimbostratus",
    name: "Nimbostratus (Ns)",
    summary: "The steady-rain cloud: a thick, dark, widespread layer with falling rain/snow.",
    spotting: [
      "Dark grey layer; sun often blotted out",
      "Base looks diffuse because precipitation is falling through it",
      "Low ragged scud clouds can form underneath"
    ],
    meaning: [
      "Widespread, steady precipitation",
      "Often part of larger frontal systems",
      "Not a ‘storm cell’ cloud — more a big blanket"
    ],
    photography: [
      "Lean into mood: reflections, wet streets, silhouettes",
      "Shoot rain curtains with a longer lens",
      "Keep gear dry; use lens hood"
    ]
  },
  {
    slug: "stratocumulus",
    name: "Stratocumulus (Sc)",
    summary: "Low-level lumpy layers — a sheet of cloud ‘clumps’ with darker cells.",
    spotting: [
      "Patchy/layered with rounded masses or rolls",
      "Often has darker tessellations (‘honeycomb’ look)",
      "Cloud elements usually large (> ~5°; the ‘three fingers’ test)"
    ],
    meaning: [
      "Common ahead of or behind frontal systems",
      "Usually limited precipitation (sometimes drizzle/virga)",
      "Can create dramatic light when broken at sunset"
    ],
    photography: [
      "Look for breaks: sunbeams and rays are the magic",
      "Expose for highlights near breaks",
      "Try wide shots to capture pattern scale"
    ]
  },
  {
    slug: "stratus",
    name: "Stratus (St)",
    summary: "A low grey layer with a fairly uniform base — can bring drizzle and gloom.",
    spotting: [
      "Flat, uniform layer",
      "Sun outline may be visible through it",
      "Can break to reveal blue sky patches"
    ],
    meaning: [
      "Stable low-level moisture",
      "May produce drizzle/snow grains",
      "Often forms with gentle lift or cooling near the surface"
    ],
    photography: [
      "Minimalist compositions work well",
      "Use strong foreground shapes",
      "Watch for brief breaks and soft light"
    ]
  },
  {
    slug: "lenticular",
    name: "Lenticular (often Ac lenticularis)",
    summary: "Smooth, lens-shaped clouds that look unreal — common near mountains and strong winds.",
    spotting: [
      "Stacked ‘UFO’ layers",
      "Smooth edges; often stationary",
      "Near ranges or downwind of peaks"
    ],
    meaning: [
      "Signals strong airflow and wave activity",
      "Can mean turbulent winds (aviation cares)",
      "Rare-looking; very shareable"
    ],
    photography: [
      "Include landscape scale (mountains, skyline)",
      "Try timelapse to show flow around the cloud",
      "Shoot in RAW; gradients are delicate"
    ]
  },
  {
    slug: "mammatus",
    name: "Mammatus (feature)",
    summary: "Pouch-like underbellies — dramatic and uncommon, often after strong storms.",
    spotting: [
      "Hanging ‘bubbles’ beneath anvil clouds",
      "Most striking at low sun angles",
      "Often appears near/after strong convection"
    ],
    meaning: [
      "Often follows intense convection",
      "Not always dangerous overhead, but linked to powerful storm systems",
      "A ‘drop everything’ sky moment"
    ],
    photography: [
      "Shoot toward the low sun for depth",
      "Keep it natural; avoid overcooked HDR",
      "Wide lens + strong foreground for drama"
    ]
  },
  {
    slug: "noctilucent",
    name: "Noctilucent clouds (NLC)",
    summary: "Night-shining clouds high in the atmosphere that glow after sunset at high latitudes.",
    spotting: [
      "Electric-blue/silver wisps after sunset or before sunrise",
      "Very high altitude (mesosphere, far above normal clouds)",
      "Most common in summer at high latitudes"
    ],
    meaning: [
      "A rare visual phenomenon rather than a near-surface weather signal",
      "They reflect sunlight when the lower atmosphere is already dark",
      "Great candidate for ‘sky alerts’ features"
    ],
    photography: [
      "Use a tripod if light is low",
      "Try longer exposures to capture structure",
      "Include a dark horizon silhouette for scale"
    ]
  }
];

export function getAtlasEntry(slug: string) {
  return ATLAS.find((e) => e.slug === slug) ?? null;
}
