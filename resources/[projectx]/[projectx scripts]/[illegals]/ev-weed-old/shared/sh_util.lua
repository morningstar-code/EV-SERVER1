GrowthObjects = {
  --{hash = `bkr_prop_weed_01_small_01c`, zOffset = -0.5},
  --{hash = `bkr_prop_weed_01_small_01a`, zOffset = -0.5},
  {hash = 'bkr_prop_weed_01_small_01b', zOffset = -0.5},
  {hash = 'bkr_prop_weed_med_01a', zOffset = -3.0},
  {hash = 'bkr_prop_weed_med_01b', zOffset = -3.0},
  {hash = 'bkr_prop_weed_lrg_01a', zOffset = -3.0},
  {hash = 'bkr_prop_weed_lrg_01b', zOffset = -3.0},
  -- {hash = `prop_weed_02`, zOffset = 0.0},
  -- {hash = `prop_weed_01`, zOffset = 0.0},
}


function getStrainName(pStrain)
  local hash = GetHashKey(tostring(pStrain.n) .. '-' .. tostring(pStrain.p) .. '-' .. tostring(pStrain.k))
  local index1 = (((hash >> 16) & 0xff) % (#StrainIndex1 - 1))
  local first = StrainIndex1[index1 + 1]
  local index2 = ((hash >> 8) & 0xff) % (#StrainIndex2 - 1)
  local second = StrainIndex2[index2 + 1]
  local index3 = ((hash & 0xff) % (#StrainIndex3 - 1))
  local third = StrainIndex3[index3 + 1]
  return first .. '-' .. second .. '-' .. third
end

function getStageFromPercent(pPercent)
  local growthObjects = #GrowthObjects - 1
  local percentPerStage = 100 / growthObjects
  return math.floor((pPercent / percentPerStage) + 1.5)
end

function getPlantGrowthPercent(pPlant, pUtcTime, pServer)
  local createdAt = pServer and pPlant.createdAt or pPlant.metaData.createdAt
  local gender = pServer and pPlant.gender or pPlant.metaData.gender
  local nFactor = pServer and pPlant.n or pPlant.metaData.n
  local timeDiff = (pUtcTime - createdAt) / 60
  local genderFactor = (gender == 1 and 1.3 or 1)
  local fertilizerFactor = nFactor >= 0.9 and 1.1 or 1.0
  local growthFactors = (480 * genderFactor * fertilizerFactor)
  return math.min((timeDiff / growthFactors) * 100, 100.0)
end

function getRepString(pRep)
  local repString = 'Unknown'
  local max = -99
  for value, name in pairs(RepThreshholds) do
    local v = tonumber(value)
    if v <= pRep and max < v then
      repString = name
      max = v
    end
  end
  return repString, max
end

StrainIndex1 = {
  'Acapulco',
  'Aloha',
  'Amethyst',
  'Blackberry',
  'Blueberry',
  'Brazilian',
  'Bubble',
  'Caribbean',
  'Cherry',
  'Citrus',
  'Corleone',
  'Candy',
  'Cranberry',
  'Crystal',
  'Dawg',
  'Diablo',
  'Dopium',
  'Dorit',
  'Dutch',
  'Treat',
  'Dynamite',
  'Earthquake',
  'Elephant',
  'Endless Sky',
  'Erez',
  'Euphoria',
  'Cheese',
  'Firewalker',
  'Flo',
  'Fraggle',
  'Frankenberry',
  'Leonard',
  'Freeze',
  'Frosty',
  'Pebbles',
  'Incredible',
  'Melt',
  'Funky',
  'Fuzzy',
  'Orange',
  'Rosado',
  'Verde',
  'Violeta',
  'Haze',
  'Urkle',
  'George',
  'Ghost',
  'Scout',
  'Glass',
  'Gnarsty',
  'God',
  'Skydog',
  'Special',
  'Spurkle',
  'Sputnik',
  'Star',
  'Starry',
  'Tangerine',
  'Tora',
  'Vortex',
  'Shark',
}

StrainIndex2 = {
  'White',
  'Pearl',
  'Alabaster',
  'Snow',
  'Ivory',
  'Cream',
  'Egg shell',
  'Chiffon',
  'Salt',
  'Lace',
  'Coconut',
  'Linen',
  'Bone',
  'Moss',
  'Shamrock',
  'Seafoam',
  'Pine',
  'Parakeet',
  'Mint',
  'Seaweed',
  'Pickle',
  'Pistachio',
  'Basil',
  'Crocodile',
  'Brown',
  'Coffee',
  'Mocha',
  'Peanut',
  'Carob',
  'Hickory',
  'Wood',
  'Pecan',
  'Walnut',
  'Caramel',
  'Gingerbread',
  'Syrup',
  'Chocolate',
  'Penny',
  'Cedar',
  'Grey',
  'Shadow',
  'Graphite',
  'Iron',
  'Pewter',
  'Cloud',
  'Silver',
  'Smoke',
  'Slate',
  'Anchor',
  'Ash',
  'Porpoise',
  'Dove',
  'Fog',
  'Flint',
  'Charcoal',
  'Pebble',
  'Lead',
  'Coin',
  'Fossil',
  'Black',
  'Ebony',
  'Crow',
  'Charcoal',
  'Midnight',
  'Ink',
  'Raven',
  'Oil',
  'Grease',
  'Onyx',
  'Pitch',
  'Soot',
  'Sable',
  'Coal',
  'Metal',
  'Obsidian',
  'Spider',
  'Leather',
}

StrainIndex3 = {
  'Weed',
  'Pot',
  'Grass',
  'Reefer',
  'Ganja',
  'Hash',
  'Herb',
  'Chronic',
  'Blossom',
  'Bud',
  'Plant',
  'Bush',
  'Chase',
  'Cocktail',
  'Cocopuff',
  'Lace',
  'Butter',
  'Geek',
  'Flower',
}
