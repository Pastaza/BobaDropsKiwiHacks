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
    name: "Cumulus",
    summary: "Classic ‘cotton ball’ clouds with crisp edges — the default cloud you draw as a kid.",
    spotting: [
      "Puffy heaps with bright tops and flatter bases",
      "Often midday, especially with rising warm air",
      "Look for distinct shadows and strong contrast"
    ],
    meaning: [
      "Fair weather when small and isolated",
      "If they grow taller and darker, showers can follow",
      "Great indicator of active convection"
    ],
    photography: [
      "Expose for the highlights; don’t blow out the tops",
      "Use polarizer cautiously (can band the sky)",
      "Try wide-angle to show scale and depth"
    ]
  },
  {
    slug: "cirrus",
    name: "Cirrus",
    summary: "High, wispy ice-crystal streaks that look like brushstrokes.",
    spotting: [
      "Thin, fibrous streaks",
      "Very high altitude; often no visible shadow",
      "Sometimes forms ‘mares’ tails’"
    ],
    meaning: [
      "Often precedes a weather change within 24–48 hours",
      "Can signal approaching fronts",
      "Creates dramatic light scattering near sunrise/sunset"
    ],
    photography: [
      "Best at golden hour — the sky ‘paints’ them",
      "Underexpose slightly to keep texture",
      "Try framing with a horizon anchor"
    ]
  },
  {
    slug: "altocumulus",
    name: "Altocumulus",
    summary: "Mid-level ‘mackerel sky’ patches — like ripples or scales.",
    spotting: [
      "Rounded patches in groups",
      "Elements larger than cirrocumulus",
      "Often covers broad areas"
    ],
    meaning: [
      "Can indicate instability aloft",
      "May precede afternoon storms in warm seasons",
      "Good texture cloud for sunsets"
    ],
    photography: [
      "Use a longer lens to compress patterns",
      "Look for leading lines toward the sun",
      "Bracket exposures if the sun is in-frame"
    ]
  },
  {
    slug: "lenticular",
    name: "Lenticular",
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
    name: "Mammatus",
    summary: "Pouch-like underbellies — dramatic and uncommon, often after strong storms.",
    spotting: [
      "Hanging ‘bubbles’ beneath anvil clouds",
      "Most striking at low sun angles",
      "Usually post-storm"
    ],
    meaning: [
      "Often follows severe convection",
      "Not always dangerous overhead, but linked to intense systems",
      "A ‘drop everything’ sky moment"
    ],
    photography: [
      "Shoot toward the low sun for depth",
      "Try HDR carefully; keep it natural",
      "Wide lens + strong foreground for drama"
    ]
  }
];

export function getAtlasEntry(slug: string) {
  return ATLAS.find((e) => e.slug === slug) ?? null;
}
