export interface Oil {
  id: string;
  name: string;
  nameDE: string;
  sapValue: number; // Verseifungszahl für NaOH (mg NaOH/g)
  properties: {
    hardness: number;
    cleansing: number;
    conditioning: number;
    bubbly: number;
    creamy: number;
    iodine: number;
    ins: number;
  };
  description?: string;
}

export const OILS_DATABASE: Oil[] = [
  {
    id: 'coconut',
    name: 'Coconut Oil',
    nameDE: 'Kokosöl',
    sapValue: 183,
    properties: {
      hardness: 79,
      cleansing: 67,
      conditioning: 10,
      bubbly: 67,
      creamy: 12,
      iodine: 10,
      ins: 258
    },
    description: 'Erzeugt harte Seife mit viel Schaum'
  },
  {
    id: 'palm',
    name: 'Palm Oil',
    nameDE: 'Palmöl',
    sapValue: 142,
    properties: {
      hardness: 49,
      cleansing: 1,
      conditioning: 49,
      bubbly: 1,
      creamy: 48,
      iodine: 53,
      ins: 145
    },
    description: 'Sorgt für Härte und cremigen Schaum'
  },
  {
    id: 'olive',
    name: 'Olive Oil',
    nameDE: 'Olivenöl',
    sapValue: 135,
    properties: {
      hardness: 17,
      cleansing: 0,
      conditioning: 82,
      bubbly: 0,
      creamy: 17,
      iodine: 85,
      ins: 109
    },
    description: 'Sehr pflegend, macht weiche Seife'
  },
  {
    id: 'castor',
    name: 'Castor Oil',
    nameDE: 'Rizinusöl',
    sapValue: 128,
    properties: {
      hardness: 95,
      cleansing: 0,
      conditioning: 95,
      bubbly: 90,
      creamy: 5,
      iodine: 86,
      ins: 95
    },
    description: 'Verstärkt den Schaum erheblich'
  },
  {
    id: 'shea',
    name: 'Shea Butter',
    nameDE: 'Sheabutter',
    sapValue: 128,
    properties: {
      hardness: 36,
      cleansing: 0,
      conditioning: 64,
      bubbly: 0,
      creamy: 36,
      iodine: 59,
      ins: 116
    },
    description: 'Sehr pflegend und feuchtigkeitsspendend'
  },
  {
    id: 'cocoa',
    name: 'Cocoa Butter',
    nameDE: 'Kakaobutter',
    sapValue: 137,
    properties: {
      hardness: 57,
      cleansing: 0,
      conditioning: 43,
      bubbly: 0,
      creamy: 57,
      iodine: 37,
      ins: 157
    },
    description: 'Macht die Seife hart und stabil'
  },
  {
    id: 'sunflower',
    name: 'Sunflower Oil',
    nameDE: 'Sonnenblumenöl',
    sapValue: 134,
    properties: {
      hardness: 14,
      cleansing: 0,
      conditioning: 69,
      bubbly: 0,
      creamy: 14,
      iodine: 133,
      ins: 63
    },
    description: 'Günstiges Öl mit pflegenden Eigenschaften'
  },
  {
    id: 'avocado',
    name: 'Avocado Oil',
    nameDE: 'Avocadoöl',
    sapValue: 133,
    properties: {
      hardness: 7,
      cleansing: 0,
      conditioning: 91,
      bubbly: 0,
      creamy: 7,
      iodine: 95,
      ins: 99
    },
    description: 'Sehr pflegend, besonders für trockene Haut'
  },
  {
    id: 'sweet-almond',
    name: 'Sweet Almond Oil',
    nameDE: 'Süßes Mandelöl',
    sapValue: 136,
    properties: {
      hardness: 8,
      cleansing: 0,
      conditioning: 82,
      bubbly: 0,
      creamy: 8,
      iodine: 97,
      ins: 97
    },
    description: 'Mild und pflegend, gut für empfindliche Haut'
  },
  {
    id: 'jojoba',
    name: 'Jojoba Oil',
    nameDE: 'Jojobaöl',
    sapValue: 97,
    properties: {
      hardness: 11,
      cleansing: 0,
      conditioning: 20,
      bubbly: 0,
      creamy: 11,
      iodine: 82,
      ins: 11
    },
    description: 'Eigentlich ein Wachs, sehr pflegend'
  },
  {
    id: 'safflower',
    name: 'Safflower Oil',
    nameDE: 'Distelöl',
    sapValue: 136,
    properties: {
      hardness: 8,
      cleansing: 0,
      conditioning: 77,
      bubbly: 0,
      creamy: 8,
      iodine: 145,
      ins: 47
    },
    description: 'Sehr pflegend, gut für empfindliche Haut'
  },
  {
    id: 'walnut',
    name: 'Walnut Oil',
    nameDE: 'Walnussöl',
    sapValue: 135,
    properties: {
      hardness: 12,
      cleansing: 0,
      conditioning: 84,
      bubbly: 0,
      creamy: 12,
      iodine: 162,
      ins: 45
    },
    description: 'Reich an Omega-3-Fettsäuren, sehr pflegend'
  }
];

export const findOilById = (id: string): Oil | undefined => {
  return OILS_DATABASE.find(oil => oil.id === id);
};

export const getOilsByCategory = () => {
  return {
    hard: OILS_DATABASE.filter(oil => oil.properties.hardness > 40),
    soft: OILS_DATABASE.filter(oil => oil.properties.hardness <= 40),
    cleansing: OILS_DATABASE.filter(oil => oil.properties.cleansing > 20),
    conditioning: OILS_DATABASE.filter(oil => oil.properties.conditioning > 50)
  };
};