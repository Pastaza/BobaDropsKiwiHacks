export interface AtmosphereLayer {
  id: string;
  name: string;
  altitudeRange: string;
  altitudeKm: string;
  description: string;
  temperature: string;
  cloudPresence: boolean;
  color: string;
  features: string[];
}

export const atmosphereLayers: AtmosphereLayer[] = [
  {
    id: 'troposphere',
    name: 'Troposphere',
    altitudeRange: '0 – 12 km',
    altitudeKm: '0–12',
    description: 'The lowest layer of Earth\'s atmosphere, where all weather occurs. This is the home of clouds, rain, snow, and wind.',
    temperature: '-56°C to +15°C',
    cloudPresence: true,
    color: '#1a4a7a',
    features: ['All clouds form here', 'Weather systems', 'Most of Earth\'s air mass', 'Temperature decreases with altitude'],
  },
  {
    id: 'stratosphere',
    name: 'Stratosphere',
    altitudeRange: '12 – 50 km',
    altitudeKm: '12–50',
    description: 'Above the clouds, the stratosphere contains the ozone layer that protects life on Earth from harmful ultraviolet radiation.',
    temperature: '-56°C to +0°C',
    cloudPresence: false,
    color: '#0f3060',
    features: ['Ozone layer', 'Jet aircraft cruise here', 'Temperature increases', 'Very dry air'],
  },
  {
    id: 'mesosphere',
    name: 'Mesosphere',
    altitudeRange: '50 – 85 km',
    altitudeKm: '50–85',
    description: 'The mesosphere is where most meteors burn up upon entering Earth\'s atmosphere, creating the shooting stars we see at night.',
    temperature: '-86°C to -2°C',
    cloudPresence: false,
    color: '#081a3a',
    features: ['Meteors burn here', 'Coldest layer', 'Noctilucent clouds (rare)', 'Temperature decreases'],
  },
  {
    id: 'thermosphere',
    name: 'Thermosphere',
    altitudeRange: '85 – 600 km',
    altitudeKm: '85–600',
    description: 'The thermosphere absorbs high-energy solar radiation, heating to extreme temperatures. The International Space Station orbits within this layer.',
    temperature: 'Up to 2,000°C',
    cloudPresence: false,
    color: '#040e20',
    features: ['Aurora borealis forms here', 'ISS orbits here', 'Extreme temperatures', 'Very thin air'],
  },
];
