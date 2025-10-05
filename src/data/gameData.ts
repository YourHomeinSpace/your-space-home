export const splashQuotes = [
  '"No Dream is too high!" (Buzz Aldrin)',
  '"Reach for the stars, and if you miss, you\'ll land a cloud."',
  '"Don\'t limit your challenges. Challenge your limits."',
  '"Space is for everybody." (Christa McAuliffe)',
  '"A year on Mars is 687 Earth days long."',
  '"Jupiter is so large all other planets could fit inside it."',
  '"The International Space Station orbits Earth every 90 minutes."',
  '"There are more stars in the universe than grains of sand on Earth."',
  '"That\'s one small step for a man, one giant leap for mankind." (Neil Armstrong)',
  '"The cosmos is within us." (Carl Sagan)',
  '"The universe is under no obligation to make sense to you." (Neil deGrasse Tyson)',
  '"To confine our attention to terrestrial matters would be to limit the human spirit." (Stephen Hawking)',
];

export const ships = {
  rectangle: {
    name: 'Rectangle',
    model: 'homespace-lux001R',
    capacity: 20,
    maxWeight: 1400,
    totalWeight: 6400,
    description: 'Rectangular plant structure with straight sides. Maximum comfort and accessibility for crew members. Can support up to 20 people (70kg each, 1,400kg human weight limit). Total ship weight: 6,400kg.',
  },
  triangle: {
    name: 'Triangle',
    model: 'Triangular Structure',
    capacity: 12,
    maxWeight: 960,
    totalWeight: 5200,
    description: 'Triangular base design with integrated living and production sectors. Hydroponic systems for oxygen and food. Can support up to 12 people (80kg each). Compact private quarters in upper corners.',
  },
  square: {
    name: 'Square',
    model: 'Square Module',
    capacity: 15,
    maxWeight: 1050,
    totalWeight: 5800,
    description: 'Cubic module maximizing usable area. Advanced thermal insulation and radiation shielding. 100% water recycling and closed-loop life support. Focuses on total system integration for self-sufficiency.',
  },
};

export const sectors = {
  'Waste Management': {
    items: {
      'Compact Recycler': { sanity: 5, description: 'Converts organic waste into reusable materials.' },
      'Solid Separator': { sanity: 4, description: 'Separates solids and reduces contamination risk.' },
      'Chemical Neutralizer': { sanity: 3, description: 'Neutralizes hazardous waste.' },
    },
  },
  Hygiene: {
    items: {
      'Micro Shower': { sanity: 5, description: 'Water-saving shower for microgravity.' },
      'Hygiene Station': { sanity: 6, description: 'Sterilizes and cleans surfaces and crew.' },
      'Sanitation Unit': { sanity: 4, description: 'Efficient disposal and odor control.' },
    },
  },
  'Environmental Control': {
    items: {
      'Air Filter': { sanity: 5, description: 'Removes particles and volatile compounds.' },
      'Thermal Regulator': { sanity: 4, description: 'Stabilizes cabin temperature.' },
      'Pressure Stabilizer': { sanity: 5, description: 'Maintains stable cabin pressure.' },
    },
  },
  'Life Support': {
    items: {
      'Water Recycler': { sanity: 7, description: 'Purifies and recovers water.' },
      'Oxygen Generator': { sanity: 8, description: 'Electrolytic oxygen supply system.' },
      'Emergency Pods': { sanity: 6, description: 'Short-term survival modules.' },
    },
  },
  'Crew Recreation': {
    items: {
      'VR Dome': { sanity: 6, description: 'Relaxation and virtual escape.' },
      'Music Station': { sanity: 5, description: 'Ambient music to boost morale.' },
      'Group Table': { sanity: 4, description: 'Social area for team interaction.' },
    },
  },
  Stowage: {
    items: {
      'Racking System': { sanity: 3, description: 'Flexible cargo structures.' },
      'Cargo Net': { sanity: 2, description: 'Secure containment net.' },
      'Robotic Loader': { sanity: 4, description: 'Automates heavy cargo tasks.' },
    },
  },
  'Food Storage': {
    items: {
      'Cold Vault': { sanity: 5, description: 'Cryogenic storage for perishables.' },
      'Dehydration Unit': { sanity: 4, description: 'Prepares long-duration rations.' },
      'Shelf Matrix': { sanity: 3, description: 'Organized dry food storage.' },
    },
  },
  'Meal Preparation': {
    items: {
      'Rehydration Oven': { sanity: 5, description: 'Prepares meals in low gravity.' },
      'Compact Fridge': { sanity: 3, description: 'Small refrigeration unit.' },
      'Food Prep Station': { sanity: 4, description: 'Modular food preparation station.' },
    },
  },
  'Maintenance & Repair': {
    items: {
      'Tool Bay': { sanity: 4, description: 'Basic and advanced tools.' },
      'Repair Drone': { sanity: 5, description: 'Assists with external repairs.' },
      'Spare Parts Locker': { sanity: 3, description: 'Critical replacement components.' },
    },
  },
  Sleep: {
    items: {
      'Quiet Pod': { sanity: 6, description: 'Acoustically isolated sleep capsule.' },
      'Sleeping Restraint': { sanity: 4, description: 'Prevents crew from floating while sleeping.' },
      'Circadian Lamp': { sanity: 5, description: 'Simulates day and night cycles.' },
    },
  },
  Exercise: {
    items: {
      'Tether Trainer': { sanity: 5, description: 'Resistance equipment for microgravity.' },
      'Cycling Unit': { sanity: 4, description: 'Cardio system.' },
      'Resistance Bands': { sanity: 3, description: 'Portable elastic bands for strength training.' },
    },
  },
};

export const events = [
  {
    id: 'lack_exercise',
    name: 'Lack of Physical Exercise',
    description: 'Crew members are stressed and losing sanity.',
    requiredSectors: ['Exercise'],
    sanityLoss: 7,
    perDay: false,
  },
  {
    id: 'poor_hygiene',
    name: 'Poor Hygiene',
    description: 'Crew members complain about bad smells.',
    requiredSectors: ['Hygiene'],
    sanityLoss: 10,
    perDay: true,
    condition: 'Bacteria Propagation: A closed ship without minimum hygiene is maddening.',
  },
  {
    id: 'waste_problems',
    name: 'Waste Management Problems',
    description: 'Trash accumulation causes discomfort.',
    requiredSectors: ['Waste Management', 'Environmental Control'],
    sanityLoss: 8,
    perDay: true,
    condition: 'Stinking: Your ship has no waste disposal and crew had to live in a horrible environment.',
  },
  {
    id: 'food_scarcity',
    name: 'Lack of Varied Food',
    description: 'Only repetitive and tasteless food available, crew loses motivation.',
    requiredSectors: ['Food Storage'],
    sanityLoss: 5,
    perDay: true,
    condition: 'Spoiled Food: Even if you have food, it can rot without a sector to care for it.',
  },
  {
    id: 'equipment_failure',
    name: 'Equipment Malfunction',
    description: 'Strange noises make the crew anxious.',
    requiredSectors: ['Maintenance & Repair', 'Sleep'],
    sanityLoss: 6,
    perDay: false,
  },
  {
    id: 'social_isolation',
    name: 'Social Isolation',
    description: 'Without recreation, crew members get bored and fight each other.',
    requiredSectors: ['Crew Recreation', 'Life Support'],
    sanityLoss: 8,
    perDay: false,
  },
  {
    id: 'poor_sleep',
    name: 'Poor Sleep Quality',
    description: 'If sleep sector is neglected, everyone wakes up tired.',
    requiredSectors: ['Sleep', 'Meal Preparation', 'Hygiene'],
    sanityLoss: 7,
    perDay: true,
    condition: 'Sleep Deprivation: Without a specific sector for sleeping and resting the mind, especially in a stressful place like space, everything becomes difficult.',
  },
  {
    id: 'internal_disputes',
    name: 'Internal Disputes',
    description: 'Stressed crew members start fights.',
    requiredSectors: [],
    sanityLoss: 12,
    perDay: false,
  },
  {
    id: 'crew_loss',
    name: 'Crew Member Loss',
    description: 'If the ship is full and lacks life support, someone may die.',
    requiredSectors: ['Life Support', 'Sleep'],
    sanityLoss: 20,
    perDay: false,
  },
  {
    id: 'environmental_failure',
    name: 'Environmental Control Failure',
    description: 'Irregular oxygen or abnormal temperature.',
    requiredSectors: ['Environmental Control', 'Waste Management'],
    sanityLoss: 10,
    perDay: false,
  },
];

export const missions = [
  {
    id: 'asteroid_survey',
    name: 'Asteroid Survey',
    description: 'Survey nearby asteroids for valuable minerals.',
    duration: 4,
  },
  {
    id: 'satellite_repair',
    name: 'Satellite Repair',
    description: 'Repair a communications satellite in orbit.',
    duration: 4,
  },
  {
    id: 'space_station',
    name: 'Space Station Resupply',
    description: 'Deliver supplies to a distant space station.',
    duration: 4,
  },
];

export const dialogues = {
  welcome: {
    speaker: '???',
    lines: [
      'Welcome to your first choice, [Player Name], the geometric layout of your ship. This is very important, do you want to know a little about it?',
    ],
  },
  rectangle: {
    speaker: '???',
    lines: [
      'Rectangles are the ones that fit the most people, they are not very common for spacecraft and they are not really.',
      'I think they look great and add a unique touch, plus they are usually big. Usually rectangular shapes are mere mixtures with cylinders or boxes.',
      'If you like the Geek world or games, you might have seen some more in Star Wars or in Space Odyssey 2021!',
    ],
  },
  triangle: {
    speaker: '???',
    lines: [
      'With a more pointed front base, triangles are not the heaviest and there are certainly many models that resemble triangular shapes.',
      'These shapes also exist in military aircraft, which shows their intimidation in terms of presence.',
      'Personally, I think their charm is due to the fact that they are a warehouse.',
    ],
  },
  square: {
    speaker: '???',
    lines: [
      'If they were people they would be perfectionists, after all, engineers love the way it keeps all its sides the same. This makes them more functional than the previous ones.',
      'I like to think of them as magic cubes of space, after all, none of them are really square, are they? Well, even if the compact is always x by an equal x, I think it is very resistant and has very resistant materials in its structure.',
    ],
  },
  noThanks: {
    speaker: '???',
    lines: ['Oh alright, then let\'s continue.'],
  },
  sectors: {
    speaker: '???',
    lines: ['Now, [Player Name], you will choose an item in each sector. They will help organize your ship! Make good choices.'],
  },
  beforeMission: {
    speaker: '???',
    lines: [
      'I think you\'re ready. I hope everything goes well!',
      '...',
    ],
  },
  starcyIntro: {
    speaker: '???',
    lines: ['My name?'],
  },
  starcyName: {
    speaker: 'Starcy',
    lines: ['Starcy. It\'s not a super scientific name, is it? Well, I\'m going to hang up. I have to work here, Starcy hologram shutting down!'],
  },
  starcyGoodbye: {
    speaker: '???',
    lines: ['Well, let\'s go! I need to go do my job, good luck.'],
  },
  marcIntro: {
    speaker: '???',
    lines: ['Hey, [Player Name] I got your report.'],
  },
  marc: {
    speaker: 'Marc',
    lines: [
      'Hi, I\'m Marc. I\'m here to tell you that regardless of the results, your home is your space. But more than just space, it\'s always good to stay sane.',
      'Whenever you need something, don\'t hesitate to speak up. I know missions can sometimes seem complicated, but every star has its purpose, just like us.',
      'Hey, [Player Name], Starcy, the one who came to talk to you about your ship and the details. Told me you\'re capable.',
      'Never give up.',
      'Well, I will pass on the important information based on your report, keep an eye out today for any signal.',
    ],
  },
};
