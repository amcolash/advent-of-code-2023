import { readFileSync } from 'fs';
import { join } from 'path';

const data = readFileSync(join(__dirname, 'sample1.txt')).toString();
const lines = data.trim().split('\n');

enum Section {
  Seeds,
  SeedSoil,
  SoilFertilizer,
  FertilizerWater,
  WaterLight,
  LightTemperature,
  TemperatureHumidity,
  HumidityLocation,
}

type mapping = { [key: number]: number };

let seeds: number[] = [];
const seedSoil: mapping = {};
const soilFertilizer: mapping = {};
const fertilizerWater: mapping = {};
const waterLight: mapping = {};
const lightTemperature: mapping = {};
const temperatureHumidity: mapping = {};
const humidityLocation: mapping = {};

const sectionToMap = {
  [Section.SeedSoil]: seedSoil,
  [Section.SoilFertilizer]: soilFertilizer,
  [Section.FertilizerWater]: fertilizerWater,
  [Section.WaterLight]: waterLight,
  [Section.LightTemperature]: lightTemperature,
  [Section.TemperatureHumidity]: temperatureHumidity,
  [Section.HumidityLocation]: humidityLocation,
};

let currentSection: Section = Section.Seeds;

function parseData() {
  lines.forEach((l, i) => {
    if (i === 0) {
      seeds = l
        .split(':')[1]
        .trim()
        .split(' ')
        .map((s) => parseInt(s));
    } else {
      parseMapping(l);
    }
  });
}

function parseMapping(l: string) {
  const map = sectionToMap[currentSection];

  if (l.includes('map:')) return;
  else if (l.trim().length === 0) {
    currentSection++;
    return;
  } else if (map) {
    const split = l.split(' ');
    const destStart = Number.parseInt(split[0]);
    const srcStart = Number.parseInt(split[1]);
    const rangeLength = Number.parseInt(split[2]);

    for (let i = 0; i < rangeLength; i++) {
      map[srcStart + i] = destStart + i;
    }
  }
}

function lookupLocations() {
  const locations: number[] = [];

  seeds.forEach((s) => {
    const soil = seedSoil[s] || s;
    const fertilizer = soilFertilizer[soil] || soil;
    const water = fertilizerWater[fertilizer] || fertilizer;
    const light = waterLight[water] || water;
    const temperature = lightTemperature[light] || light;
    const humidity = temperatureHumidity[temperature] || temperature;
    const location = humidityLocation[humidity] || humidity;

    // console.log(s, soil, fertilizer, water, light, temperature, humidity, location);
    locations.push(location);
  });

  locations.sort();
  console.log(locations);
}

parseData();
lookupLocations();
