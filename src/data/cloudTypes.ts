export interface CloudType {
  id: string;
  name: string;
  altitude: string;
  description: string;
  characteristics: string[];
  color: string;
  accentColor: string;
  weatherImpact: string;
}

export const cloudTypes: CloudType[] = [
  {
    id: 'cirrus',
    name: 'Cirrus',
    altitude: '20,000–40,000 ft',
    description: 'Cirrus clouds drift high above the world, made of tiny ice crystals that form wispy, hair-like streaks across the upper atmosphere.',
    characteristics: ['Ice crystals', 'High altitude', 'Thin & wispy', 'Fair weather sign'],
    color: '#1e3a5f',
    accentColor: '#b8d4e8',
    weatherImpact: 'Often precedes weather changes by 24–48 hours',
  },
  {
    id: 'cumulus',
    name: 'Cumulus',
    altitude: '2,000–6,500 ft',
    description: 'Cumulus clouds are the sky\'s soft sculptures, forming when warm air rises and cools, creating those iconic cotton-ball towers we all recognize.',
    characteristics: ['Water droplets', 'Low-to-mid altitude', 'Puffy & vertical', 'Fair weather'],
    color: '#1a2f50',
    accentColor: '#9ab5d0',
    weatherImpact: 'Can develop into storm clouds if unstable air persists',
  },
  {
    id: 'stratus',
    name: 'Stratus',
    altitude: '0–6,500 ft',
    description: 'Stratus clouds spread like a gray blanket across the sky, forming when a large layer of air slowly cools and reaches its dew point.',
    characteristics: ['Layered sheets', 'Low altitude', 'Gray & uniform', 'Drizzle-producing'],
    color: '#152540',
    accentColor: '#7a9ab8',
    weatherImpact: 'Brings persistent drizzle and overcast conditions',
  },
  {
    id: 'cumulonimbus',
    name: 'Cumulonimbus',
    altitude: '2,000–60,000 ft',
    description: 'Cumulonimbus clouds are vertical engines of weather, capable of rain, thunder, lightning, and even tornadoes. They are nature\'s most powerful atmospheric machines.',
    characteristics: ['Extreme vertical growth', 'All altitudes', 'Anvil-shaped top', 'Severe weather'],
    color: '#0f1e38',
    accentColor: '#f0a855',
    weatherImpact: 'Produces thunderstorms, heavy rain, hail, and lightning',
  },
  {
    id: 'altostratus',
    name: 'Altostratus',
    altitude: '6,500–23,000 ft',
    description: 'Altostratus clouds form a translucent gray-blue veil across the mid-atmosphere, often allowing a watery sun to peer through while signaling approaching rain.',
    characteristics: ['Mid-level sheets', 'Gray-blue tint', 'Sun dimming', 'Rain precursor'],
    color: '#172845',
    accentColor: '#6a9ab8',
    weatherImpact: 'Often signals continuous rain or snow within 12–24 hours',
  },
];
