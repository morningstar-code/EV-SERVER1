const ResourceName = GetCurrentResourceName();

const configData = [
  (main = {
    configId: 'main',
    data: {
      'hospital.revives.auto': false,
      'jobs.receipts.public': false,
      'heists.prac.whitelist': false,
      'business.stashes.public': false,
      'police.masterkeys': false,
      'progression.guns': false,
      'housing.benches': false,
      'crafting.spawn.public': false,
      'buffs.enabled': false,
      'afk.kick.auto': false,
      'jobs.ems.enabled': false,
      payoutFactor: 1,
      'hud.watermark': true,
      'showrooms.catalog.purchase': true,
      'mdw.profiles.skip': true,
      //We need to sort this out below
      'housing.crafting.public': false,
      'language.code': 'en',
      'spawn.apartments.only': false,
      'characters.lifers.disabled': false,
      'characters.hardcore.disabled': false,
      'characters.limited': true,
      characterLimit: 2,
      'business.counters.public': true,
      'business.registers.public': true,
      tier: 'standard',
    },
  }),
  //(garages = {
  //  configId: 'ev-vehicles:garages',
  //  data: [
  //    {
  //      garage_id: 'ems_shared',
  //      name: 'EMS Shared Vehicle Garage',
  //      type: 'state',
  //      shared: true,
  //      job: 'ems',
  //      hidden: false,
  //      parking_limit: 10,
  //      location: {
  //        vectors: { x: 326.03, y: -588.75, z: 28.8 },
  //        length: 17.8,
  //        width: 6.2,
  //        options: { heading: 250, minZ: 27.8, maxZ: 31.8, debugPoly: false },
  //      },
  //      vehicle_types: ['land'],
  //      parking_spots: [
  //        {
  //          type: 'land',
  //          size: 2,
  //          distance: 1.2,
  //          heading: 338.05807,
  //          coords: { x: 332.717, y: -591.197, z: 27.797 },
  //        },
  //        {
  //          type: 'land',
  //          size: 2,
  //          distance: 1.2,
  //          heading: 338.05807,
  //          coords: { x: 329.376, y: -590.018, z: 27.797 },
  //        },
  //        {
  //          type: 'land',
  //          size: 2,
  //          distance: 1.2,
  //          heading: 338.05807,
  //          coords: { x: 326.035, y: -588.839, z: 27.797 },
  //        },
  //        {
  //          type: 'land',
  //          size: 2,
  //          distance: 1.2,
  //          heading: 338.05807,
  //          coords: { x: 322.694, y: -587.66, z: 27.797 },
  //        },
  //        {
  //          type: 'land',
  //          size: 2,
  //          distance: 1.2,
  //          heading: 320.05807,
  //          coords: { x: 319.353, y: -586.481, z: 27.797 },
  //        },
  //      ],
  //    },
  //    {
  //      garage_id: 'garage_a',
  //      name: 'Garage A',
  //      type: 'public',
  //      hidden: false,
  //      publicOverride: true,
  //      parking_limit: 10,
  //      location: {
  //        vectors: { x: 466.29, y: -71.95, z: 77.46 },
  //        length: 11.8,
  //        width: 5,
  //        options: {
  //          heading: 70,
  //          minZ: 76.46,
  //          maxZ: 80.46,
  //          debugPoly: false,
  //        },
  //      },
  //      vehicle_types: ['land'],
  //      parking_spots: [
  //        {
  //          type: 'land',
  //          size: 2,
  //          distance: 1.2,
  //          heading: 160,
  //          coords: { x: 469.84, y: -73.424, z: 76.461 },
  //        },
  //        {
  //          type: 'land',
  //          size: 2,
  //          distance: 1.2,
  //          heading: 160,
  //          coords: { x: 466.25, y: -72.174, z: 76.461 },
  //        },
  //        {
  //          type: 'land',
  //          size: 2,
  //          distance: 1.2,
  //          heading: 160,
  //          coords: { x: 466.25, y: -70.924, z: 76.461 },
  //        },
  //      ],
  //    },
  //    {
  //      garage_id: 'garage_alta',
  //      name: 'Alta Street Garage',
  //      type: 'public',
  //      publicOverride: true,
  //      hidden: false,
  //      parking_limit: 10,
  //      location: {
  //        vectors: { x: -315.79, y: -982.05, z: 35.11 },
  //        length: 9,
  //        width: 43.6,
  //        options: { heading: 338, debugPoly: false },
  //      },
  //      vehicle_types: ['land'],
  //      parking_spots: [
  //        {
  //          type: 'land',
  //          size: 2,
  //          distance: 1.2,
  //          heading: 160,
  //          coords: { x: -297.812, y: -990.57, z: 30.081 },
  //        },
  //        {
  //          type: 'land',
  //          size: 2,
  //          distance: 1.2,
  //          heading: 160,
  //          coords: { x: -301.286, y: -989.269, z: 30.081 },
  //        },
  //        {
  //          type: 'land',
  //          size: 2,
  //          distance: 1.2,
  //          heading: 160,
  //          coords: { x: -304.761, y: -987.968, z: 30.081 },
  //        },
  //        {
  //          type: 'land',
  //          size: 2,
  //          distance: 1.2,
  //          heading: 160,
  //          coords: { x: -308.235, y: -986.667, z: 30.081 },
  //        },
  //        {
  //          type: 'land',
  //          size: 2,
  //          distance: 1.2,
  //          heading: 160,
  //          coords: { x: -311.709, y: -985.366, z: 30.081 },
  //        },
  //        {
  //          type: 'land',
  //          size: 2,
  //          distance: 1.2,
  //          heading: 160,
  //          coords: { x: -315.184, y: -984.065, z: 30.081 },
  //        },
  //        {
  //          type: 'land',
  //          size: 2,
  //          distance: 1.2,
  //          heading: 160,
  //          coords: { x: -318.658, y: -982.763, z: 30.081 },
  //        },
  //        {
  //          type: 'land',
  //          size: 2,
  //          distance: 1.2,
  //          heading: 160,
  //          coords: { x: -322.132, y: -981.462, z: 30.081 },
  //        },
  //        {
  //          type: 'land',
  //          size: 2,
  //          distance: 1.2,
  //          heading: 160,
  //          coords: { x: -325.607, y: -980.161, z: 30.081 },
  //        },
  //        {
  //          type: 'land',
  //          size: 2,
  //          distance: 1.2,
  //          heading: 160,
  //          coords: { x: -329.081, y: -978.86, z: 30.081 },
  //        },
  //        {
  //          type: 'land',
  //          size: 2,
  //          distance: 1.2,
  //          heading: 160,
  //          coords: { x: -332.555, y: -977.559, z: 30.081 },
  //        },
  //      ],
  //    },
  //    {
  //      garage_id: 'garage_barrio',
  //      name: 'Garage Barrio',
  //      type: 'public',
  //      parking_limit: 10,
  //      hidden: false,
  //      location: {
  //        vectors: { x: 319.08, y: -2033.48, z: 20.51 },
  //        length: 36.4,
  //        width: 5,
  //        options: {
  //          heading: 230,
  //          minZ: 27.13,
  //          maxZ: 31.13,
  //          debugPoly: false,
  //        },
  //      },
  //      vehicle_types: ['land'],
  //      parking_spots: [
  //        {
  //          type: 'land',
  //          size: 2,
  //          distance: 1.2,
  //          heading: 320.05807,
  //          coords: { x: 331.769, y: -2044.558, z: 19.8 },
  //        },
  //        {
  //          type: 'land',
  //          size: 2,
  //          distance: 1.2,
  //          heading: 320.05807,
  //          coords: { x: 329.451, y: -2042.594, z: 19.8 },
  //        },
  //        {
  //          type: 'land',
  //          size: 2,
  //          distance: 1.2,
  //          heading: 320.05807,
  //          coords: { x: 327.133, y: -2040.629, z: 19.8 },
  //        },
  //        {
  //          type: 'land',
  //          size: 2,
  //          distance: 1.2,
  //          heading: 320.05807,
  //          coords: { x: 324.814, y: -2038.665, z: 19.8 },
  //        },
  //        {
  //          type: 'land',
  //          size: 2,
  //          distance: 1.2,
  //          heading: 320.05807,
  //          coords: { x: 322.496, y: -2036.701, z: 19.8 },
  //        },
  //        {
  //          type: 'land',
  //          size: 2,
  //          distance: 1.2,
  //          heading: 320.05807,
  //          coords: { x: 320.178, y: -2034.737, z: 19.8 },
  //        },
  //        {
  //          type: 'land',
  //          size: 2,
  //          distance: 1.2,
  //          heading: 320.05807,
  //          coords: { x: 317.859, y: -2032.773, z: 19.8 },
  //        },
  //        {
  //          type: 'land',
  //          size: 2,
  //          distance: 1.2,
  //          heading: 320.05807,
  //          coords: { x: 315.541, y: -2030.809, z: 19.8 },
  //        },
  //        {
  //          type: 'land',
  //          size: 2,
  //          distance: 1.2,
  //          heading: 320.05807,
  //          coords: { x: 313.223, y: -2028.845, z: 19.8 },
  //        },
  //        {
  //          type: 'land',
  //          size: 2,
  //          distance: 1.2,
  //          heading: 320.05807,
  //          coords: { x: 310.904, y: -2026.881, z: 19.8 },
  //        },
  //        {
  //          type: 'land',
  //          size: 2,
  //          distance: 1.2,
  //          heading: 320.05807,
  //          coords: { x: 308.586, y: -2024.917, z: 19.8 },
  //        },
  //        {
  //          type: 'land',
  //          size: 2,
  //          distance: 1.2,
  //          heading: 320.05807,
  //          coords: { x: 306.268, y: -2022.952, z: 19.8 },
  //        },
  //      ],
  //    },
  //    // {
  //    //     "garage_id": "garage_burgershot",
  //    //     "name": "Burger Shot Garage",
  //    //     "type": "business",
  //    //     "publicOverride": true,
  //    //     "hidden": true,
  //    //     "business_id": "burger_shot",
  //    //     "parking_limit": 1,
  //    //     "location": {
  //    //         "vectors": { "x": -315.79, "y": -982.05, "z": 35.11 },
  //    //         "length": 9,
  //    //         "width": 43.6,
  //    //         "options": { "heading": 338, "debugPoly": false }
  //    //     },
  //    //     "vehicle_types": ["land"],
  //    //     "parking_spots": [
  //    //         {
  //    //             "type": "land",
  //    //             "size": 2,
  //    //             "distance": 1.2,
  //    //             "heading": 303,
  //    //             "coords": { "x": -1174.323, "y": -872.937, "z": 13.219 }
  //    //         },
  //    //         {
  //    //             "type": "land",
  //    //             "size": 2,
  //    //             "distance": 1.2,
  //    //             "heading": 303,
  //    //             "coords": { "x": -1172.267, "y": -876.099, "z": 13.199 }
  //    //         },
  //    //         {
  //    //             "type": "land",
  //    //             "size": 2,
  //    //             "distance": 1.2,
  //    //             "heading": 303,
  //    //             "coords": { "x": -1170.212, "y": -879.261, "z": 13.18 }
  //    //         },
  //    //         {
  //    //             "type": "land",
  //    //             "size": 2,
  //    //             "distance": 1.2,
  //    //             "heading": 303,
  //    //             "coords": { "x": -1168.156, "y": -882.423, "z": 13.16 }
  //    //         }
  //    //     ]
  //    // },
  //    {
  //      garage_id: 'garage_casino',
  //      name: 'Casino Garage',
  //      type: 'public',
  //      parking_limit: 10,
  //      publicOverride: false,
  //      hidden: false,
  //      location: {
  //        vectors: { x: 892.84, y: -3.49, z: 78.76 },
  //        length: 7,
  //        width: 50.4,
  //        options: { heading: 0, minZ: 77.76, maxZ: 82.96, debugPoly: false },
  //      },
  //      vehicle_types: ['land'],
  //      parking_spots: [
  //        {
  //          type: 'land',
  //          size: 2,
  //          distance: 1.2,
  //          heading: 324,
  //          coords: { x: 872.423, y: 8.874, z: 77.764 },
  //        },
  //        {
  //          type: 'land',
  //          size: 2,
  //          distance: 1.2,
  //          heading: 324,
  //          coords: { x: 875.281, y: 7.131, z: 77.764 },
  //        },
  //        {
  //          type: 'land',
  //          size: 2,
  //          distance: 1.2,
  //          heading: 324,
  //          coords: { x: 878.138, y: 5.387, z: 77.764 },
  //        },
  //        {
  //          type: 'land',
  //          size: 2,
  //          distance: 1.2,
  //          heading: 324,
  //          coords: { x: 895.424, y: -5.032, z: 77.764 },
  //        },
  //        {
  //          type: 'land',
  //          size: 2,
  //          distance: 1.2,
  //          heading: 324,
  //          coords: { x: 898.708, y: -7.113, z: 77.764 },
  //        },
  //        {
  //          type: 'land',
  //          size: 2,
  //          distance: 1.2,
  //          heading: 324,
  //          coords: { x: 901.993, y: -9.194, z: 77.764 },
  //        },
  //        {
  //          type: 'land',
  //          size: 2,
  //          distance: 1.2,
  //          heading: 324,
  //          coords: { x: 905.278, y: -11.276, z: 77.764 },
  //        },
  //        {
  //          type: 'land',
  //          size: 2,
  //          distance: 1.2,
  //          heading: 324,
  //          coords: { x: 908.563, y: -13.357, z: 77.764 },
  //        },
  //        {
  //          type: 'land',
  //          size: 2,
  //          distance: 1.2,
  //          heading: 324,
  //          coords: { x: 911.848, y: -15.438, z: 77.764 },
  //        },
  //      ],
  //    },
  //    {
  //      garage_id: 'garage_fudge',
  //      name: 'Garage Fudge Lane',
  //      type: 'public',
  //      hidden: false,
  //      parking_limit: 10,
  //      location: {
  //        vectors: { x: 1160.65, y: -1645.87, z: 36.92 },
  //        length: 5.4,
  //        width: 5.8,
  //        options: {
  //          heading: 300,
  //          minZ: 35.92,
  //          maxZ: 39.92,
  //          debugPoly: false,
  //        },
  //      },
  //      vehicle_types: ['land'],
  //      parking_spots: [
  //        {
  //          type: 'land',
  //          size: 2,
  //          distance: 1.2,
  //          heading: 210.32487,
  //          coords: { x: 1160.924, y: -1646.432, z: 35.917 },
  //        },
  //      ],
  //    },
  //    {
  //      garage_id: 'garage_impound',
  //      name: 'Impound Garage',
  //      type: 'public',
  //      parking_limit: 10,
  //      hidden: false,
  //      location: {
  //        vectors: { x: 76.94, y: 6400.15, z: 31.23 },
  //        length: 7.2,
  //        width: 17.2,
  //        options: { heading: 0, debugPoly: false },
  //      },
  //      vehicle_types: ['land'],
  //      parking_spots: [
  //        {
  //          type: 'land',
  //          size: 2,
  //          distance: 1.2,
  //          heading: 312,
  //          coords: { x: 72.529, y: 6404.381, z: 30.226 },
  //        },
  //        {
  //          type: 'land',
  //          size: 2,
  //          distance: 1.2,
  //          heading: 312,
  //          coords: { x: 75.358, y: 6401.692, z: 30.226 },
  //        },
  //        {
  //          type: 'land',
  //          size: 2,
  //          distance: 1.2,
  //          heading: 312,
  //          coords: { x: 78.188, y: 6399.003, z: 30.226 },
  //        },
  //        {
  //          type: 'land',
  //          size: 2,
  //          distance: 1.2,
  //          heading: 312,
  //          coords: { x: 81.017, y: 6396.313, z: 30.226 },
  //        },
  //      ],
  //    },
  //    {
  //      garage_id: 'garage_impound',
  //      name: 'Impound Garage',
  //      type: 'public',
  //      parking_limit: 10,
  //      hidden: false,
  //      location: {
  //        vectors: { x: -152.94, y: -1168.26, z: 23.77 },
  //        length: 8.4,
  //        width: 5.6,
  //        options: { heading: 0, debugPoly: false },
  //      },
  //      vehicle_types: ['land'],
  //      parking_spots: [
  //        {
  //          type: 'land',
  //          size: 2,
  //          distance: 1.2,
  //          heading: 91,
  //          coords: { x: -153.167, y: -1170.002, z: 22.761 },
  //        },
  //        {
  //          type: 'land',
  //          size: 2,
  //          distance: 1.2,
  //          heading: 91,
  //          coords: { x: -153.178, y: -1166.529, z: 22.767 },
  //        },
  //      ],
  //    },
  //    {
  //      garage_id: 'garage_pier',
  //      name: 'Pier Garage',
  //      type: 'public',
  //      parking_limit: 10,
  //      hidden: false,
  //      location: {
  //        vectors: { x: -1587.39, y: -898.65, z: 9.74 },
  //        length: 6,
  //        width: 12.8,
  //        options: {
  //          heading: 320,
  //          minZ: 7.94,
  //          maxZ: 11.94,
  //          debugPoly: false,
  //        },
  //      },
  //      vehicle_types: ['land'],
  //      parking_spots: [
  //        {
  //          type: 'land',
  //          size: 2,
  //          distance: 1.2,
  //          heading: 140,
  //          coords: { x: -1590.957, y: -895.5, z: 8.547 },
  //        },
  //        {
  //          type: 'land',
  //          size: 2,
  //          distance: 1.2,
  //          heading: 140,
  //          coords: { x: -1588.607, y: -897.503, z: 8.566 },
  //        },
  //        {
  //          type: 'land',
  //          size: 2,
  //          distance: 1.2,
  //          heading: 140,
  //          coords: { x: -1586.256, y: -899.507, z: 8.586 },
  //        },
  //        {
  //          type: 'land',
  //          size: 2,
  //          distance: 1.2,
  //          heading: 140,
  //          coords: { x: -1583.906, y: -901.51, z: 8.606 },
  //        },
  //        {
  //          type: 'land',
  //          size: 2,
  //          distance: 1.2,
  //          heading: 140,
  //          coords: { x: -1581.555, y: -903.513, z: 8.626 },
  //        },
  //      ],
  //    },
  //    {
  //      garage_id: 'garage_q',
  //      name: 'Garage Q',
  //      type: 'public',
  //      parking_limit: 10,
  //      hidden: false,
  //      location: {
  //        vectors: { x: 283.44, y: -332.58, z: 44.92 },
  //        length: 37,
  //        width: 25,
  //        options: {
  //          heading: 250,
  //          minZ: 43.12,
  //          maxZ: 47.12,
  //          debugPoly: false,
  //        },
  //      },
  //      vehicle_types: ['land'],
  //      parking_spots: [
  //        {
  //          type: 'land',
  //          size: 2,
  //          distance: 1.2,
  //          heading: 250,
  //          coords: { x: 277.165, y: -340.141, z: 43.921 },
  //        },
  //        {
  //          type: 'land',
  //          size: 2,
  //          distance: 1.2,
  //          heading: 250,
  //          coords: { x: 278.384, y: -336.883, z: 43.921 },
  //        },
  //        {
  //          type: 'land',
  //          size: 2,
  //          distance: 1.2,
  //          heading: 250,
  //          coords: { x: 279.603, y: -333.626, z: 43.921 },
  //        },
  //        {
  //          type: 'land',
  //          size: 2,
  //          distance: 1.2,
  //          heading: 250,
  //          coords: { x: 280.822, y: -330.369, z: 43.921 },
  //        },
  //        {
  //          type: 'land',
  //          size: 2,
  //          distance: 1.2,
  //          heading: 250,
  //          coords: { x: 282.042, y: -327.112, z: 43.921 },
  //        },
  //        {
  //          type: 'land',
  //          size: 2,
  //          distance: 1.2,
  //          heading: 250,
  //          coords: { x: 283.261, y: -323.855, z: 43.921 },
  //        },
  //        {
  //          type: 'land',
  //          size: 2,
  //          distance: 1.2,
  //          heading: 68,
  //          coords: { x: 289.377, y: -326.137, z: 43.921 },
  //        },
  //        {
  //          type: 'land',
  //          size: 2,
  //          distance: 1.2,
  //          heading: 68,
  //          coords: { x: 288.149, y: -329.386, z: 43.921 },
  //        },
  //        {
  //          type: 'land',
  //          size: 2,
  //          distance: 1.2,
  //          heading: 68,
  //          coords: { x: 286.921, y: -332.635, z: 43.921 },
  //        },
  //        {
  //          type: 'land',
  //          size: 2,
  //          distance: 1.2,
  //          heading: 68,
  //          coords: { x: 285.693, y: -335.884, z: 43.921 },
  //        },
  //        {
  //          type: 'land',
  //          size: 2,
  //          distance: 1.2,
  //          heading: 68,
  //          coords: { x: 284.466, y: -339.133, z: 43.921 },
  //        },
  //        {
  //          type: 'land',
  //          size: 2,
  //          distance: 1.2,
  //          heading: 68,
  //          coords: { x: 283.238, y: -342.381, z: 43.921 },
  //        },
  //        {
  //          type: 'land',
  //          size: 2,
  //          distance: 1.2,
  //          heading: 241,
  //          coords: { x: 294.401, y: -346.365, z: 43.921 },
  //        },
  //        {
  //          type: 'land',
  //          size: 2,
  //          distance: 1.2,
  //          heading: 241,
  //          coords: { x: 295.579, y: -343.127, z: 43.921 },
  //        },
  //        {
  //          type: 'land',
  //          size: 2,
  //          distance: 1.2,
  //          heading: 241,
  //          coords: { x: 296.757, y: -339.888, z: 43.921 },
  //        },
  //        {
  //          type: 'land',
  //          size: 2,
  //          distance: 1.2,
  //          heading: 241,
  //          coords: { x: 297.936, y: -336.65, z: 43.921 },
  //        },
  //        {
  //          type: 'land',
  //          size: 2,
  //          distance: 1.2,
  //          heading: 241,
  //          coords: { x: 299.114, y: -333.412, z: 43.921 },
  //        },
  //        {
  //          type: 'land',
  //          size: 2,
  //          distance: 1.2,
  //          heading: 241,
  //          coords: { x: 300.292, y: -330.174, z: 43.921 },
  //        },
  //        {
  //          type: 'land',
  //          size: 2,
  //          distance: 1.2,
  //          heading: 68,
  //          coords: { x: 271.053, y: -319.298, z: 43.921 },
  //        },
  //        {
  //          type: 'land',
  //          size: 2,
  //          distance: 1.2,
  //          heading: 68,
  //          coords: { x: 269.851, y: -322.525, z: 43.921 },
  //        },
  //        {
  //          type: 'land',
  //          size: 2,
  //          distance: 1.2,
  //          heading: 68,
  //          coords: { x: 268.648, y: -325.753, z: 43.921 },
  //        },
  //        {
  //          type: 'land',
  //          size: 2,
  //          distance: 1.2,
  //          heading: 68,
  //          coords: { x: 267.445, y: -328.981, z: 43.921 },
  //        },
  //        {
  //          type: 'land',
  //          size: 2,
  //          distance: 1.2,
  //          heading: 68,
  //          coords: { x: 266.243, y: -332.209, z: 43.921 },
  //        },
  //      ],
  //    },
  //    {
  //      garage_id: 'garage_red',
  //      name: 'Garage Red',
  //      type: 'public',
  //      parking_limit: 10,
  //      hidden: false,
  //      location: {
  //        vectors: { x: -333.31, y: -750.99, z: 33.97 },
  //        length: 11.8,
  //        width: 6.4,
  //        options: {
  //          heading: 270,
  //          minZ: 32.97,
  //          maxZ: 36.97,
  //          debugPoly: false,
  //        },
  //      },
  //      vehicle_types: ['land'],
  //      parking_spots: [
  //        {
  //          type: 'land',
  //          size: 2,
  //          distance: 1.2,
  //          heading: 175.84078,
  //          coords: { x: -337.497, y: -750.516, z: 32.969 },
  //        },
  //        {
  //          type: 'land',
  //          size: 2,
  //          distance: 1.2,
  //          heading: 175.84078,
  //          coords: { x: -334.64, y: -750.633, z: 32.969 },
  //        },
  //        {
  //          type: 'land',
  //          size: 2,
  //          distance: 1.2,
  //          heading: 175.84078,
  //          coords: { x: -331.784, y: -750.751, z: 32.969 },
  //        },
  //        {
  //          type: 'land',
  //          size: 2,
  //          distance: 1.2,
  //          heading: 175.84078,
  //          coords: { x: -328.927, y: -750.869, z: 32.969 },
  //        },
  //      ],
  //    },
  //    {
  //      garage_id: 'garage_sandy',
  //      name: 'Sandy Garage',
  //      type: 'public',
  //      parking_limit: 10,
  //      hidden: false,
  //      location: {
  //        vectors: { x: 1828.17, y: 3661.28, z: 34.02 },
  //        length: 5.8,
  //        width: 18.8,
  //        options: {
  //          heading: 30,
  //          minZ: 33.02,
  //          maxZ: 37.42,
  //          debugPoly: false,
  //        },
  //      },
  //      vehicle_types: ['land'],
  //      parking_spots: [
  //        {
  //          type: 'land',
  //          size: 2,
  //          distance: 1.2,
  //          heading: 30,
  //          coords: { x: 1821.72, y: 3658.059, z: 33.009 },
  //        },
  //        {
  //          type: 'land',
  //          size: 2,
  //          distance: 1.2,
  //          heading: 30,
  //          coords: { x: 1824.995, y: 3659.948, z: 32.936 },
  //        },
  //        {
  //          type: 'land',
  //          size: 2,
  //          distance: 1.2,
  //          heading: 30,
  //          coords: { x: 1828.27, y: 3661.837, z: 32.862 },
  //        },
  //        {
  //          type: 'land',
  //          size: 2,
  //          distance: 1.2,
  //          heading: 30,
  //          coords: { x: 1831.545, y: 3663.726, z: 32.789 },
  //        },
  //        {
  //          type: 'land',
  //          size: 2,
  //          distance: 1.2,
  //          heading: 30,
  //          coords: { x: 1834.82, y: 3665.615, z: 32.716 },
  //        },
  //      ],
  //    },
  //    {
  //      garage_id: 'garage_seoul',
  //      name: 'Garage Little Seoul',
  //      type: 'public',
  //      parking_limit: 10,
  //      hidden: false,
  //      location: {
  //        vectors: { x: -678.54, y: -885.18, z: 24.5 },
  //        length: 3,
  //        width: 5.4,
  //        options: { heading: 15, minZ: 23.5, maxZ: 27.5, debugPoly: false },
  //      },
  //      vehicle_types: ['land'],
  //      parking_spots: [
  //        {
  //          type: 'land',
  //          size: 2,
  //          distance: 1.2,
  //          heading: 101.05807,
  //          coords: { x: -678.332, y: -885.062, z: 23.487 },
  //        },
  //      ],
  //    },
  //    {
  //      garage_id: 'garage_t',
  //      name: 'Garage T',
  //      type: 'public',
  //      parking_limit: 10,
  //      hidden: false,
  //      location: {
  //        vectors: { x: 224.93, y: -786.86, z: 30.9 },
  //        length: 41.4,
  //        width: 11.8,
  //        options: { heading: 160, minZ: 29.9, maxZ: 33.9, debugPoly: false },
  //      },
  //      vehicle_types: ['land'],
  //      parking_spots: [
  //        {
  //          type: 'land',
  //          size: 2,
  //          distance: 2,
  //          heading: 256,
  //          coords: { x: 216.009, y: -804.476, z: 29.802 },
  //        },
  //        {
  //          type: 'land',
  //          size: 2,
  //          distance: 2,
  //          heading: 256,
  //          coords: { x: 216.937, y: -801.957, z: 29.802 },
  //        },
  //        {
  //          type: 'land',
  //          size: 2,
  //          distance: 2,
  //          heading: 256,
  //          coords: { x: 217.864, y: -799.438, z: 29.802 },
  //        },
  //        {
  //          type: 'land',
  //          size: 2,
  //          distance: 2,
  //          heading: 256,
  //          coords: { x: 218.792, y: -796.919, z: 29.802 },
  //        },
  //        {
  //          type: 'land',
  //          size: 2,
  //          distance: 2,
  //          heading: 256,
  //          coords: { x: 219.72, y: -794.399, z: 29.802 },
  //        },
  //        {
  //          type: 'land',
  //          size: 2,
  //          distance: 2,
  //          heading: 256,
  //          coords: { x: 221.576, y: -789.361, z: 29.802 },
  //        },
  //        {
  //          type: 'land',
  //          size: 2,
  //          distance: 2,
  //          heading: 256,
  //          coords: { x: 222.504, y: -786.842, z: 29.802 },
  //        },
  //        {
  //          type: 'land',
  //          size: 2,
  //          distance: 2,
  //          heading: 256,
  //          coords: { x: 223.432, y: -784.323, z: 29.802 },
  //        },
  //        {
  //          type: 'land',
  //          size: 2,
  //          distance: 2,
  //          heading: 256,
  //          coords: { x: 224.36, y: -781.803, z: 29.802 },
  //        },
  //        {
  //          type: 'land',
  //          size: 2,
  //          distance: 2,
  //          heading: 256,
  //          coords: { x: 225.288, y: -779.284, z: 29.802 },
  //        },
  //        {
  //          type: 'land',
  //          size: 2,
  //          distance: 2,
  //          heading: 256,
  //          coords: { x: 226.215, y: -776.765, z: 29.802 },
  //        },
  //        {
  //          type: 'land',
  //          size: 2,
  //          distance: 2,
  //          heading: 256,
  //          coords: { x: 227.143, y: -774.246, z: 29.802 },
  //        },
  //        {
  //          type: 'land',
  //          size: 2,
  //          distance: 2,
  //          heading: 256,
  //          coords: { x: 228.071, y: -771.727, z: 29.802 },
  //        },
  //        {
  //          type: 'land',
  //          size: 2,
  //          distance: 2,
  //          heading: 256,
  //          coords: { x: 228.999, y: -769.208, z: 29.802 },
  //        },
  //        {
  //          type: 'land',
  //          size: 2,
  //          distance: 2,
  //          heading: 256,
  //          coords: { x: 216.009, y: -804.476, z: 29.802 },
  //        },
  //        {
  //          type: 'land',
  //          size: 2,
  //          distance: 2,
  //          heading: 256,
  //          coords: { x: 216.937, y: -801.957, z: 29.801 },
  //        },
  //        {
  //          type: 'land',
  //          size: 2,
  //          distance: 2,
  //          heading: 256,
  //          coords: { x: 217.864, y: -799.438, z: 29.801 },
  //        },
  //        {
  //          type: 'land',
  //          size: 2,
  //          distance: 2,
  //          heading: 256,
  //          coords: { x: 218.792, y: -796.919, z: 29.801 },
  //        },
  //        {
  //          type: 'land',
  //          size: 2,
  //          distance: 2,
  //          heading: 256,
  //          coords: { x: 219.72, y: -794.399, z: 29.801 },
  //        },
  //        {
  //          type: 'land',
  //          size: 2,
  //          distance: 2,
  //          heading: 256,
  //          coords: { x: 220.648, y: -791.88, z: 29.801 },
  //        },
  //        {
  //          type: 'land',
  //          size: 2,
  //          distance: 2,
  //          heading: 256,
  //          coords: { x: 221.576, y: -789.361, z: 29.801 },
  //        },
  //        {
  //          type: 'land',
  //          size: 2,
  //          distance: 2,
  //          heading: 256,
  //          coords: { x: 222.504, y: -786.842, z: 29.801 },
  //        },
  //        {
  //          type: 'land',
  //          size: 2,
  //          distance: 2,
  //          heading: 256,
  //          coords: { x: 223.432, y: -784.323, z: 29.801 },
  //        },
  //        {
  //          type: 'land',
  //          size: 2,
  //          distance: 2,
  //          heading: 256,
  //          coords: { x: 224.36, y: -781.803, z: 29.801 },
  //        },
  //        {
  //          type: 'land',
  //          size: 2,
  //          distance: 2,
  //          heading: 256,
  //          coords: { x: 225.288, y: -779.284, z: 29.801 },
  //        },
  //        {
  //          type: 'land',
  //          size: 2,
  //          distance: 2,
  //          heading: 256,
  //          coords: { x: 226.215, y: -776.765, z: 29.801 },
  //        },
  //        {
  //          type: 'land',
  //          size: 2,
  //          distance: 2,
  //          heading: 256,
  //          coords: { x: 227.143, y: -774.246, z: 29.801 },
  //        },
  //        {
  //          type: 'land',
  //          size: 2,
  //          distance: 2,
  //          heading: 256,
  //          coords: { x: 228.071, y: -771.727, z: 29.801 },
  //        },
  //        {
  //          type: 'land',
  //          size: 2,
  //          distance: 2,
  //          heading: 256,
  //          coords: { x: 228.999, y: -769.208, z: 29.801 },
  //        },
  //      ],
  //    },
  //    {
  //      garage_id: 'garage_tuner',
  //      name: 'Garage Tuner',
  //      type: 'public',
  //      parking_limit: 10,
  //      hidden: false,
  //      location: {
  //        vectors: { x: 162.31, y: -3001.24, z: 5.86 },
  //        length: 20,
  //        width: 6,
  //        options: { heading: 0, minZ: 4.86, maxZ: 8.86, debugPoly: false },
  //      },
  //      vehicle_types: ['land'],
  //      parking_spots: [
  //        {
  //          type: 'land',
  //          size: 2,
  //          distance: 1.2,
  //          heading: 266.0332,
  //          coords: { x: 162.23, y: -3009.301, z: 4.952 },
  //        },
  //        {
  //          type: 'land',
  //          size: 2,
  //          distance: 1.2,
  //          heading: 266.0332,
  //          coords: { x: 162.328, y: -3006.06, z: 4.952 },
  //        },
  //        {
  //          type: 'land',
  //          size: 2,
  //          distance: 1.2,
  //          heading: 266.0332,
  //          coords: { x: 162.427, y: -3002.819, z: 4.952 },
  //        },
  //        {
  //          type: 'land',
  //          size: 2,
  //          distance: 1.2,
  //          heading: 266.0332,
  //          coords: { x: 162.525, y: -2999.577, z: 4.952 },
  //        },
  //        {
  //          type: 'land',
  //          size: 2,
  //          distance: 1.2,
  //          heading: 266.0332,
  //          coords: { x: 162.624, y: -2996.336, z: 4.952 },
  //        },
  //        {
  //          type: 'land',
  //          size: 2,
  //          distance: 1.2,
  //          heading: 266.0332,
  //          coords: { x: 162.722, y: -2993.095, z: 4.952 },
  //        },
  //        {
  //          type: 'land',
  //          size: 2,
  //          distance: 1.2,
  //          heading: 266.0332,
  //          coords: { x: 162.821, y: -2989.854, z: 4.952 },
  //        },
  //      ],
  //    },
  //    // {
  //    //     "garage_id": "mrpd_police",
  //    //     "name": "MRPD Police Garage",
  //    //     "type": "public",
  //    //     "parking_limit": 10,
  //    //     "hidden": true,
  //    //     "location": {
  //    //         "vectors": { "x": 407.66, "y": -989.54, "z": 29.37 },
  //    //         "length": 6.4,
  //    //         "width": 18.8,
  //    //         "options": { "heading": 5, "minZ": 27.13, "maxZ": 29.13, "debugPoly": false }
  //    //     },
  //    //     "vehicle_types": ["land"],
  //    //     "parking_spots": [
  //    //         {
  //    //             "type": "land",
  //    //             "size": 2,
  //    //             "distance": 1.2,
  //    //             "heading": 183,
  //    //             "coords": { "x": 449.554, "y": -1025.648, "z": 27.584 }
  //    //         },
  //    //         {
  //    //             "type": "land",
  //    //             "size": 2,
  //    //             "distance": 1.2,
  //    //             "heading": 183,
  //    //             "coords": { "x": 446.05, "y": -1026.037, "z": 27.649 }
  //    //         },
  //    //         {
  //    //             "type": "land",
  //    //             "size": 2,
  //    //             "distance": 1.2,
  //    //             "heading": 183,
  //    //             "coords": { "x": 442.547, "y": -1026.426, "z": 27.714 }
  //    //         },
  //    //         {
  //    //             "type": "land",
  //    //             "size": 2,
  //    //             "distance": 1.2,
  //    //             "heading": 183,
  //    //             "coords": { "x": 439.043, "y": -1026.815, "z": 27.778 }
  //    //         },
  //    //         {
  //    //             "type": "land",
  //    //             "size": 2,
  //    //             "distance": 1.2,
  //    //             "heading": 183,
  //    //             "coords": { "x": 435.539, "y": -1027.204, "z": 27.843 }
  //    //         }
  //    //     ]
  //    // },
  //    {
  //      garage_id: 'pd_shared',
  //      name: 'PD Shared Vehicle Garage',
  //      type: 'state',
  //      shared: true,
  //      job: ['police', 'state', 'ranger'],
  //      parking_limit: 10,
  //      hidden: true,
  //      location: {
  //        vectors: { x: 442.1, y: -991.29, z: 25.69 },
  //        length: 14.4,
  //        width: 14,
  //        options: { heading: 0, minZ: 24.7, maxZ: 28.7, debugPoly: false },
  //      },
  //      vehicle_types: ['land'],
  //      parking_spots: [
  //        {
  //          type: 'land',
  //          size: 2,
  //          distance: 2,
  //          heading: 89.8,
  //          coords: { x: 445.65, y: -991.99, z: 25.13 },
  //        },
  //        {
  //          type: 'land',
  //          size: 2,
  //          distance: 2,
  //          heading: 89.8,
  //          coords: { x: 445.4, y: -995.47, z: 25.13 },
  //        },
  //        {
  //          type: 'land',
  //          size: 2,
  //          distance: 2,
  //          heading: 89.68,
  //          coords: { x: 445.61, y: -998.78, z: 25.13 },
  //        },
  //        {
  //          type: 'land',
  //          size: 2,
  //          distance: 2,
  //          heading: 268.51,
  //          coords: { x: 438.53, y: -991.76, z: 25.13 },
  //        },
  //        {
  //          type: 'land',
  //          size: 2,
  //          distance: 2,
  //          heading: 268.26,
  //          coords: { x: 438.37, y: -995.18, z: 25.13 },
  //        },
  //        {
  //          type: 'land',
  //          size: 2,
  //          distance: 2,
  //          heading: 271.65,
  //          coords: { x: 438.39, y: -998.46, z: 25.13 },
  //        },
  //        //{
  //        //  type: 'land',
  //        //  size: 2,
  //        //  distance: 2,
  //        //  heading: 268,
  //        //  coords: { x: 437.536, y: -988.844, z: 24.7 },
  //        //},
  //        //{
  //        //  type: 'land',
  //        //  size: 2,
  //        //  distance: 2,
  //        //  heading: 268,
  //        //  coords: { x: 437.579, y: -991.545, z: 24.7 },
  //        //},
  //        //{
  //        //  type: 'land',
  //        //  size: 2,
  //        //  distance: 2,
  //        //  heading: 268,
  //        //  coords: { x: 437.622, y: -994.246, z: 24.7 },
  //        //},
  //        //{
  //        //  type: 'land',
  //        //  size: 2,
  //        //  distance: 2,
  //        //  heading: 268,
  //        //  coords: { x: 437.665, y: -996.947, z: 24.7 },
  //        //},
  //      ],
  //    },
  //    {
  //      garage_id: 'pd_shared_bike',
  //      name: 'PD Shared Bike Garage',
  //      type: 'state',
  //      shared: true,
  //      job: ['police', 'state', 'ranger'],
  //      parking_limit: 10,
  //      hidden: false,
  //      location: {
  //        vectors: { x: 425.8, y: -986.65, z: 25.7 },
  //        length: 24.4,
  //        width: 4.8,
  //        options: { heading: 0, minZ: 24.7, maxZ: 28.7, debugPoly: false },
  //      },
  //      vehicle_types: ['land'],
  //      parking_spots: [
  //        {
  //          type: 'land',
  //          size: 2,
  //          distance: 1.2,
  //          heading: 89,
  //          coords: { x: 425.603, y: -997.134, z: 24.7 },
  //        },
  //        {
  //          type: 'land',
  //          size: 2,
  //          distance: 1.2,
  //          heading: 89,
  //          coords: { x: 425.602, y: -994.423, z: 24.7 },
  //        },
  //        {
  //          type: 'land',
  //          size: 2,
  //          distance: 1.2,
  //          heading: 89,
  //          coords: { x: 425.601, y: -991.713, z: 24.7 },
  //        },
  //        {
  //          type: 'land',
  //          size: 2,
  //          distance: 1.2,
  //          heading: 89,
  //          coords: { x: 425.601, y: -989.003, z: 24.7 },
  //        },
  //        {
  //          type: 'land',
  //          size: 2,
  //          distance: 1.2,
  //          heading: 89,
  //          coords: { x: 425.585, y: -984.287, z: 24.7 },
  //        },
  //        {
  //          type: 'land',
  //          size: 2,
  //          distance: 1.2,
  //          heading: 89,
  //          coords: { x: 425.571, y: -981.576, z: 24.7 },
  //        },
  //        {
  //          type: 'land',
  //          size: 2,
  //          distance: 1.2,
  //          heading: 89,
  //          coords: { x: 425.557, y: -978.864, z: 24.7 },
  //        },
  //        {
  //          type: 'land',
  //          size: 2,
  //          distance: 1.2,
  //          heading: 89,
  //          coords: { x: 425.543, y: -976.153, z: 24.7 },
  //        },
  //      ],
  //    },
  //    {
  //      garage_id: 'pd_shared_heli',
  //      name: 'PD Shared Helicopter Garage',
  //      type: 'state',
  //      shared: true,
  //      job: ['police', 'state', 'ranger'],
  //      parking_limit: 10,
  //      hidden: false,
  //      location: {
  //        vectors: { x: 449.46, y: -981.03, z: 43.69 },
  //        length: 11.1,
  //        width: 11.45,
  //        options: { heading: 0, minZ: 42.69, maxZ: 45.69, debugPoly: false },
  //      },
  //      vehicle_types: ['air'],
  //      parking_spots: [
  //        {
  //          type: 'air',
  //          size: 4,
  //          distance: 1.2,
  //          heading: 92,
  //          coords: { x: 449.31, y: -981.23, z: 43.69 },
  //        },
  //      ],
  //    },
  //  ],
  //}),
  (gangs = {
    configId: 'ev-gangsystem',
    data: {
      minMembersOnline: 2,
    },
  }),
  (duty = {
    configId: 'ev-signin',
    data: {
      blips: [
        {
          label: 'Police Station',
          coords: { x: 441.2, y: -981.2, z: 30.6 },
          sprite: 60,
          enabled: true,
        },
        {
          label: 'Police Station',
          coords: { x: -1083.61, y: -810.31, z: 19.3 },
          sprite: 60,
          enabled: true,
        },
        {
          label: 'Police Station',
          coords: { x: -447.36, y: 6013.06, z: 32.29 },
          sprite: 60,
          enabled: true,
        },
        {
          label: 'Police Station',
          coords: { x: 381.19, y: -1595.8, z: 30.06 },
          sprite: 60,
          enabled: true,
        },
        {
          label: 'Police Station',
          coords: { x: 385.83, y: 795.02, z: 187.46 },
          sprite: 60,
          enabled: true,
        },
        {
          label: 'Prison',
          coords: { x: 1840.39, y: 2578.45, z: 46.01 },
          sprite: 237,
          enabled: true,
        },
        {
          label: 'Hospital',
          coords: { x: 310.24, y: -597.54, z: 43.28 },
          sprite: 80,
          enabled: true,
        },
      ],
    },
  }),
  (police = {
    configId: 'ev-police',
    data: {
      policeVehicles: ['npolvic', 'npoltau', 'npolexp', 'npolchar', 'npolstang', 'npolvette', 'npolchal', 'npolmm', 'emsnspeedo'],
    },
  }),
  (housing = {
    configId: 'ev-housing',
    data: {},
  }),
  (voice = {
    configId: 'ev-voice',
    data: {
      useScopeSize: false,
      updateInterval: 1000,
    },
  }),
  (density = {
    configId: 'ev-density',
    data: {
      pass: true,
      populationDensity: 0.8,
      antiGhostDebug: false,
      antiGhostYeetVehicles: true,
      antiGhostScaleX: 10.0,
      antiGhostScaleY: 5.0,
    },
  }),
  (discord = {
    configId: 'ev-discord',
    data: {
      appId: '1093574413783421079',
      endpoint: '127.0.0.1',
      port: 30120,
    },
  }),
  (activities = {
    configId: 'ev-activities',
    data: {
      boosting: {
        requiredPolice: 3,
      },
    },
  }),
];

function GetConfig(src) {
  // let info = exports['ev-lib'].getCharacter(src);
  let rank = exports['ev-lib'].getUserRank(src);
  // let docAmount = exports["ev-jobmanager"].getJobCount(src, "doctor")

  // if (Number(docAmount) < 3) {
  //     configData[0].data['hospital.revives.auto'] = true
  // }

  //const discordId = global.exports.zdiscord.getDiscordId(src);
  //const hasSilver = global.exports.zdiscord.isRolePresent(discordId, '9999999999999');
  //const hasGold = global.exports.zdiscord.isRolePresent(discordId, '9999999999999');
  //const hasCarbon = global.exports.zdiscord.isRolePresent(discordId, '1097118996131745802');
  //const hasStaff = global.exports.zdiscord.isRolePresent(discordId, '1006924403134693409');
  //const hasDirector = global.exports.zdiscord.isRolePresent(discordId, '1006924403176640558');

  // console.log('hasSilver: ' + hasSilver);
  // console.log('hasGold: ' + hasGold);
  // console.log('hasCarbon: ' + hasCarbon);
  // console.log('hasStaff: ' + hasStaff);
  // console.log('hasDirector: ' + hasDirector);

  if (rank != 'user') {
    configData[0].data['afk.kick.auto'] = false;
    configData[0].data['heists.prac.whitelist'] = true;
  }

  // if (hasSilver || hasGold || hasCarbon || hasStaff || hasDirector) {
  //   if (hasSilver) {
  //     configData[0].data['tier'] = 'silver';
  //     configData[0].data['characterLimit'] = 3;
  //   } else if (hasGold) {
  //     configData[0].data['tier'] = 'gold';
  //     configData[0].data['characterLimit'] = 4;
  //   } else if (hasCarbon) {
  //     configData[0].data['tier'] = 'carbon';
  //     configData[0].data['characterLimit'] = 5;
  //   } else if (hasDirector) {
  //     configData[0].data['tier'] = 'carbon';
  //     configData[0].data['characterLimit'] = 10;
  //   } else if (hasStaff) {
  //     // Needs to be last incase staff member has a supporter package
  //     configData[0].data['tier'] = 'silver';
  //     configData[0].data['characterLimit'] = 3;
  //   }
  // } else {
  //   configData[0].data['tier'] = 'standard'; // no package therefore no tier icon
  //   configData[0].data['characterLimit'] = 2;
  // }

  return configData;
}

const GetModuleConfig = (module, pSrc) => {
  if (pSrc) {
    const config = GetConfig(pSrc);
    return config.find((x) => x.configId == module).data || false;
  } else {
    return configData.find((x) => x.configId == module).data || false;
  }
};
global.exports('GetModuleConfig', GetModuleConfig);

RPC.register('ev-main-config:getClientConfig', async () => {
  let src = source;
  let config = GetConfig(src);
  return config;
});
