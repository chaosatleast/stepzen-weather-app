const weatherCodeToString: {
  [key: number]: {
    iconDay: string;
    iconNight: string;
    description: string;
  };
} = {
  0: {
    iconDay: "c02d",
    iconNight: "c02n",
    description: "Few clouds",
  },
  1: {
    iconDay: "c01d",
    iconNight: "c01n",
    description: "Clear Sky",
  },
  2: {
    iconDay: "c03d",
    iconNight: "c03n",
    description: "Broken clouds",
  },
  3: {
    iconDay: "c04d",
    iconNight: "c04n",
    description: "Overcast clouds",
  },
  4: {
    iconDay: "a02d",
    iconNight: "a02n",
    description: "Smoke",
  },
  5: {
    iconDay: "a03d",
    iconNight: "a03n",
    description: "Haze",
  },
  6: {
    iconDay: "a04d",
    iconNight: "a04n",
    description: "Sand/Dust",
  },
  7: {
    iconDay: "a04d",
    iconNight: "a04n",
    description: "Sand/Dust",
  },
  8: {
    iconDay: "a04d",
    iconNight: "a04n",
    description: "Sand/Dust",
  },
  9: {
    iconDay: "a04d",
    iconNight: "a04n",
    description: "Sand/Dust",
  },
  10: {
    iconDay: "a01d",
    iconNight: "a01n",
    description: "Mist",
  },
  11: {
    iconDay: "a05d",
    iconNight: "a05n",
    description: "Fog",
  },
  12: {
    iconDay: "a05d",
    iconNight: "a05n",
    description: "Fog",
  },
  13: {
    iconDay: "t04d",
    iconNight: "t04n",
    description: "Thunderstorm with light drizzle",
  },
  14: {
    iconDay: "u00d",
    iconNight: "u00n",
    description: "Unknown precipitation",
  },
  15: {
    iconDay: "u00d",
    iconNight: "u00n",
    description: "Unknown precipitation",
  },
  16: {
    iconDay: "u00d",
    iconNight: "u00n",
    description: "Unknown precipitation",
  },
  17: {
    iconDay: "t04d",
    iconNight: "t04n",
    description: "Thunderstorm with drizzle",
  },
  18: {
    iconDay: "t04d",
    iconNight: "t04n",
    description: "Thunderstorm with heavy drizzle",
  },
  19: {
    iconDay: "c02d",
    iconNight: "c02n",
    description: "Scattered clouds",
  },
  20: {
    iconDay: "d01d",
    iconNight: "d01n",
    description: "Light Drizzle",
  },
  21: {
    iconDay: "r01d",
    iconNight: "r01n",
    description: "Light Rain",
  },
  22: {
    iconDay: "s01d",
    iconNight: "s01n",
    description: "Light snow",
  },
  23: {
    iconDay: "s04d",
    iconNight: "s04n",
    description: "Mix snow/rain",
  },
  24: {
    iconDay: "f01d",
    iconNight: "f01n",
    description: "Freezing rain",
  },
  25: {
    iconDay: "r05d",
    iconNight: "r05n",
    description: "Shower rain",
  },
  26: {
    iconDay: "s01d",
    iconNight: "s01n",
    description: "Snow Shower",
  },
  27: {
    iconDay: "s05d",
    iconNight: "s05n",
    description: "Heavy Sleet",
  },
  28: {
    iconDay: "a05d",
    iconNight: "a05n",
    description: "Fog",
  },
  29: {
    iconDay: "t01d",
    iconNight: "t01n",
    description: "Thunderstorm with light rain",
  },
  30: {
    iconDay: "a04d",
    iconNight: "a04n",
    description: "Sand/Dust",
  },
  31: {
    iconDay: "a04d",
    iconNight: "a04n",
    description: "Sand/Dust",
  },
  32: {
    iconDay: "a04d",
    iconNight: "a04n",
    description: "Sand/Dust",
  },
  33: {
    iconDay: "a04d",
    iconNight: "a04n",
    description: "Sand/Dust",
  },
  34: {
    iconDay: "a04d",
    iconNight: "a04n",
    description: "Sand/Dust",
  },
  35: {
    iconDay: "a04d",
    iconNight: "a04n",
    description: "Sand/Dust",
  },
  36: {
    iconDay: "s01d",
    iconNight: "s01n",
    description: "Light Snow",
  },
  37: {
    iconDay: "s03d",
    iconNight: "s03n",
    description: "Heavy Snow",
  },
  38: {
    iconDay: "s01d",
    iconNight: "s01n",
    description: "Light Snow",
  },
  39: {
    iconDay: "s03d",
    iconNight: "s03n",
    description: "Heavy Snow",
  },
  40: {
    iconDay: "a06d",
    iconNight: "a06n",
    description: "Freezing Fog",
  },
  41: {
    iconDay: "a06d",
    iconNight: "a06n",
    description: "Freezing Fog",
  },
  42: {
    iconDay: "a06d",
    iconNight: "a06n",
    description: "Freezing Fog",
  },
  43: {
    iconDay: "a06d",
    iconNight: "a06n",
    description: "Freezing Fog",
  },
  44: {
    iconDay: "a06d",
    iconNight: "a06n",
    description: "Freezing Fog",
  },
  46: {
    iconDay: "a06d",
    iconNight: "a06n",
    description: "Freezing Fog",
  },
  47: {
    iconDay: "a06d",
    iconNight: "a06n",
    description: "Freezing Fog",
  },
  48: {
    iconDay: "a06d",
    iconNight: "a06n",
    description: "Freezing Fog",
  },
  49: {
    iconDay: "a06d",
    iconNight: "a06n",
    description: "Freezing Fog",
  },
  50: {
    iconDay: "d02d",
    iconNight: "d02n",
    description: "Drizzle",
  },
  51: {
    iconDay: "d02d",
    iconNight: "d02n",
    description: "Drizzle",
  },
  52: {
    iconDay: "d02d",
    iconNight: "d02n",
    description: "Drizzle",
  },
  53: {
    iconDay: "d02d",
    iconNight: "d02n",
    description: "Drizzle",
  },
  54: {
    iconDay: "d02d",
    iconNight: "d02n",
    description: "Drizzle",
  },
  55: {
    iconDay: "d02d",
    iconNight: "d02n",
    description: "Drizzle",
  },
  56: {
    iconDay: "d01d",
    iconNight: "d01n",
    description: "Light Drizzle",
  },
  57: {
    iconDay: "d03d",
    iconNight: "d03n",
    description: "Heavy Drizzle",
  },
  58: {
    iconDay: "d01d",
    iconNight: "d01n",
    description: "Light Drizzle",
  },
  59: {
    iconDay: "d03d",
    iconNight: "d03n",
    description: "Heavy Drizzle",
  },
  60: {
    iconDay: "r02d",
    iconNight: "r02n",
    description: "Moderate Rain",
  },
  61: {
    iconDay: "r02d",
    iconNight: "r02n",
    description: "Moderate Rain",
  },
  62: {
    iconDay: "r02d",
    iconNight: "r02n",
    description: "Moderate Rain",
  },
  63: {
    iconDay: "r02d",
    iconNight: "r02n",
    description: "Moderate Rain",
  },
  64: {
    iconDay: "r02d",
    iconNight: "r02n",
    description: "Moderate Rain",
  },
  65: {
    iconDay: "r02d",
    iconNight: "r02n",
    description: "Moderate Rain",
  },
  66: {
    iconDay: "f01d",
    iconNight: "f01n",
    description: "Freezing rain",
  },
  67: {
    iconDay: "r03d",
    iconNight: "r03n",
    description: "Heavy rain",
  },
  68: {
    iconDay: "s04d",
    iconNight: "s04n",
    description: "Mix snow/rain",
  },
  69: {
    iconDay: "r03d",
    iconNight: "r03n",
    description: "Heavy rain",
  },
  70: {
    iconDay: "s02d",
    iconNight: "s02n",
    description: "Snow",
  },
  71: {
    iconDay: "s02d",
    iconNight: "s02n",
    description: "Snow",
  },
  72: {
    iconDay: "s02d",
    iconNight: "s02n",
    description: "Snow",
  },
  73: {
    iconDay: "s02d",
    iconNight: "s02n",
    description: "Snow",
  },
  74: {
    iconDay: "s02d",
    iconNight: "s02n",
    description: "Snow",
  },
  75: {
    iconDay: "s02d",
    iconNight: "s02n",
    description: "Snow",
  },
  76: {
    iconDay: "s02d",
    iconNight: "s02n",
    description: "Snow",
  },
  77: {
    iconDay: "s02d",
    iconNight: "s02n",
    description: "Snow",
  },
  78: {
    iconDay: "s02d",
    iconNight: "s02n",
    description: "Snow",
  },
  79: {
    iconDay: "s02d",
    iconNight: "s02n",
    description: "Snow",
  },
  80: {
    iconDay: "r05d",
    iconNight: "r05n",
    description: "Shower rain",
  },
  81: {
    iconDay: "r05d",
    iconNight: "r05n",
    description: "Shower rain",
  },
  82: {
    iconDay: "r05d",
    iconNight: "r05n",
    description: "Shower rain",
  },
  83: {
    iconDay: "r05d",
    iconNight: "r05n",
    description: "Shower rain",
  },
  84: {
    iconDay: "r05d",
    iconNight: "r05n",
    description: "Shower rain",
  },
  85: {
    iconDay: "s02d",
    iconNight: "s02n",
    description: "Shower snow",
  },
  86: {
    iconDay: "s02d",
    iconNight: "s02n",
    description: "Shower snow",
  },
  87: {
    iconDay: "s02d",
    iconNight: "s02n",
    description: "Shower snow",
  },
  88: {
    iconDay: "s02d",
    iconNight: "s02n",
    description: "Shower snow with hail",
  },
  89: {
    iconDay: "s02d",
    iconNight: "s02n",
    description: "Shower snow with hail",
  },
  90: {
    iconDay: "s02d",
    iconNight: "s02n",
    description: "Shower snow with hail",
  },
  91: {
    iconDay: "r02d",
    iconNight: "r02n",
    description: "Moderate Rain",
  },
  92: {
    iconDay: "r02d",
    iconNight: "r02n",
    description: "Moderate Rain",
  },
  93: {
    iconDay: "r02d",
    iconNight: "r02n",
    description: "Moderate Rain",
  },
  94: {
    iconDay: "r02d",
    iconNight: "r02n",
    description: "Moderate Rain",
  },
  95: {
    iconDay: "t04d",
    iconNight: "t04n",
    description: "Thunderstorm with drizzle",
  },
  96: {
    iconDay: "t04d",
    iconNight: "t04n",
    description: "Thunderstorm with drizzle",
  },
  97: {
    iconDay: "t04d",
    iconNight: "t04n",
    description: "Thunderstorm with drizzle",
  },
  98: {
    iconDay: "t04d",
    iconNight: "t04n",
    description: "Thunderstorm with drizzle",
  },
  99: {
    iconDay: "t05d",
    iconNight: "t05n",
    description: "Thunderstorm with Hail",
  },
};

export default weatherCodeToString;
