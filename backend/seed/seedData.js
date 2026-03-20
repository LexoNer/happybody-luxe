require('dotenv').config();
const mongoose   = require('mongoose');
const Service    = require('../models/Service');
const Specialist = require('../models/Specialist');

// ─────────────────────────────────────────────────────────────
//  DATOS — SERVICIOS
// ─────────────────────────────────────────────────────────────
const SERVICES = [
  // ── MEDICINA ESTÉTICA & LÁSER CO2 ──
  { serviceId:'s01', name:'Botox 3 zonas',         category:'c2', categoryName:'Medicina Estética & Láser CO2', categoryColor:'#7a3555', durationMinutes:30  },
  { serviceId:'s02', name:'Baby Botox',             category:'c2', categoryName:'Medicina Estética & Láser CO2', categoryColor:'#7a3555', durationMinutes:30  },
  { serviceId:'s03', name:'Botox Full Face',        category:'c2', categoryName:'Medicina Estética & Láser CO2', categoryColor:'#7a3555', durationMinutes:60  },
  { serviceId:'s04', name:'Botox cuello',           category:'c2', categoryName:'Medicina Estética & Láser CO2', categoryColor:'#7a3555', durationMinutes:30  },
  { serviceId:'s20', name:'CO2 Facial',             category:'c2', categoryName:'Medicina Estética & Láser CO2', categoryColor:'#7a3555', durationMinutes:30  },
  { serviceId:'s21', name:'CO2 Vaginal',            category:'c2', categoryName:'Medicina Estética & Láser CO2', categoryColor:'#7a3555', durationMinutes:60  },
  { serviceId:'s22', name:'CO2 Cicatriz',           category:'c2', categoryName:'Medicina Estética & Láser CO2', categoryColor:'#7a3555', durationMinutes:30  },

  // ── RELLENOS & FACIALES ──
  { serviceId:'s05', name:'Surcos (1 jeringa)',     category:'c1', categoryName:'Rellenos & Faciales', categoryColor:'#9b4f6e', durationMinutes:30  },
  { serviceId:'s06', name:'Labios (1 jeringa)',     category:'c1', categoryName:'Rellenos & Faciales', categoryColor:'#9b4f6e', durationMinutes:60  },
  { serviceId:'s07', name:'Región temporal',        category:'c1', categoryName:'Rellenos & Faciales', categoryColor:'#9b4f6e', durationMinutes:30  },
  { serviceId:'s08', name:'Labios + Surcos',        category:'c1', categoryName:'Rellenos & Faciales', categoryColor:'#9b4f6e', durationMinutes:60  },
  { serviceId:'s16', name:'Limpieza express',       category:'c1', categoryName:'Rellenos & Faciales', categoryColor:'#9b4f6e', durationMinutes:15  },
  { serviceId:'s17', name:'Limpieza profunda',      category:'c1', categoryName:'Rellenos & Faciales', categoryColor:'#9b4f6e', durationMinutes:60  },
  { serviceId:'s19', name:'Microdermoabrasión',     category:'c1', categoryName:'Rellenos & Faciales', categoryColor:'#9b4f6e', durationMinutes:30  },

  // ── BIOESTIMULACIÓN ──
  { serviceId:'s09', name:'Radiesse',               category:'c6', categoryName:'Bioestimulación', categoryColor:'#5a6e9b', durationMinutes:60  },
  { serviceId:'s10', name:'Sculptra',               category:'c6', categoryName:'Bioestimulación', categoryColor:'#5a6e9b', durationMinutes:60  },
  { serviceId:'s11', name:'Nanofat (Lipofilling)',  category:'c6', categoryName:'Bioestimulación', categoryColor:'#5a6e9b', durationMinutes:180 },

  // ── CONTROL DE PESO ──
  { serviceId:'s12', name:'Consulta nueva',         category:'c4', categoryName:'Control de Peso', categoryColor:'#b8894a', durationMinutes:60  },
  { serviceId:'s13', name:'Consulta control',       category:'c4', categoryName:'Control de Peso', categoryColor:'#b8894a', durationMinutes:30  },
  { serviceId:'s14', name:'Lapicera 0.25–0.50 mg', category:'c4', categoryName:'Control de Peso', categoryColor:'#b8894a', durationMinutes:30  },
  { serviceId:'s15', name:'Lapicera 1 mg',          category:'c4', categoryName:'Control de Peso', categoryColor:'#b8894a', durationMinutes:30  },

  // ── TRATAMIENTOS REGENERATIVOS ──
  { serviceId:'s18', name:'Exosomas',               category:'c8', categoryName:'Tratamientos Regenerativos', categoryColor:'#4a8a5a', durationMinutes:30  },

  // ── CORPORAL ──
  { serviceId:'s23', name:'Drenaje Linfático',      category:'c5', categoryName:'Corporal', categoryColor:'#4a7a6e', durationMinutes:30  },
  { serviceId:'s24', name:'Masaje Reductor',        category:'c5', categoryName:'Corporal', categoryColor:'#4a7a6e', durationMinutes:30  },
  { serviceId:'s25', name:'Liposonix',              category:'c5', categoryName:'Corporal', categoryColor:'#4a7a6e', durationMinutes:30  },
];

// ─────────────────────────────────────────────────────────────
//  DATOS — ESPECIALISTAS
// ─────────────────────────────────────────────────────────────
const SPECIALISTS = [
  {
    specialistId: 'sp1',
    name:         'Dra. Yesica Valdés',
    role:         'Medicina Estética · Directora',
    initials:     'YV',
    color:        '#9b4f6e',
    services:     ['s01','s02','s03','s04','s05','s06','s07','s08','s09','s10','s11','s12','s13','s14','s15','s20','s21'],
    workDays:     [1,2,3,4,5,6],
    startHours:   new Map([['1',15.5],['2',16],['3',15.5],['4',15.5],['5',15.5],['6',11]]),
    endHours:     new Map([['1',19],  ['2',19],['3',19],  ['4',19],  ['5',19],  ['6',19]]),
    scheduleDisplay: new Map([
      ['Lunes',    '3:30 – 7:00 pm'],
      ['Martes',   '4:00 – 7:00 pm'],
      ['Mié–Vie',  '3:30 – 7:00 pm'],
      ['Sábado',   '11:00 am – 7:00 pm'],
    ]),
    availability: 'high',
  },
  {
    specialistId: 'sp2',
    name:         'Lic. Stephany Miguel',
    role:         'Estética Integral',
    initials:     'SM',
    color:        '#c0394a',
    services:     ['s16','s17','s18','s19','s20','s23','s24','s25'],
    workDays:     [1,2,5,6],
    startHours:   new Map([['1',11],['2',11],['5',15.5],['6',15.5]]),
    endHours:     new Map([['1',19],['2',19],['5',19],  ['6',19]]),
    scheduleDisplay: new Map([
      ['Lunes & Martes', '11:00 am – 7:00 pm'],
      ['Vie & Sáb',      '3:30 – 7:00 pm'],
    ]),
    availability: 'med',
  },
  {
    specialistId: 'sp3',
    name:         'Lic. Astrid Miranda',
    role:         'Estética Clínica',
    initials:     'AM',
    color:        '#4a7a6e',
    services:     ['s16','s17','s18','s19','s20','s21','s22','s23','s24','s25'],
    workDays:     [1,2,3,4,5,6],
    startHours:   new Map([['1',11],['2',11],['3',11],['4',11],['5',11],['6',11]]),
    endHours:     new Map([['1',19],['2',19],['3',19],['4',19],['5',19],['6',19]]),
    scheduleDisplay: new Map([
      ['Lunes a Sábado', '11:00 am – 7:00 pm'],
    ]),
    availability: 'high',
  },
  {
    specialistId: 'sp4',
    name:         'Lic. Sofía González',
    role:         'Estética Clínica · Coordinadora',
    initials:     'SG',
    color:        '#5a6e9b',
    services:     ['s16','s17','s18','s19','s20','s21','s22','s23','s24','s25'],
    workDays:     [1,2,3,4,5,6],
    startHours:   new Map([['1',11],['2',11],['3',11],['4',11],['5',11],['6',11]]),
    endHours:     new Map([['1',19],['2',19],['3',19],['4',19],['5',19],['6',19]]),
    scheduleDisplay: new Map([
      ['Lunes a Sábado', '11:00 am – 7:00 pm'],
    ]),
    availability: 'high',
  },
  {
    specialistId: 'sp5',
    name:         'Dra. Hannia Hurtado',
    role:         'Medicina Estética',
    initials:     'HH',
    color:        '#7a4a9b',
    services:     ['s16','s17','s19','s23','s24'],
    workDays:     [6],
    startHours:   new Map([['6',11]]),
    endHours:     new Map([['6',19]]),
    scheduleDisplay: new Map([
      ['Sábado', '11:00 am – 7:00 pm'],
    ]),
    availability: 'sat',
  },
];

// ─────────────────────────────────────────────────────────────
//  SEED
// ─────────────────────────────────────────────────────────────
async function seed() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.error('❌ MONGODB_URI no está definido en .env');
    process.exit(1);
  }

  try {
    await mongoose.connect(uri);
    console.log('✅ Conectado a MongoDB');

    // Limpiar colecciones
    await Service.deleteMany({});
    await Specialist.deleteMany({});
    console.log('🗑️  Colecciones limpiadas');

    // Insertar servicios
    const svcs = await Service.insertMany(SERVICES);
    console.log(`✅ Servicios insertados: ${svcs.length}`);

    // Insertar especialistas
    const specs = await Specialist.insertMany(SPECIALISTS);
    console.log(`✅ Especialistas insertados: ${specs.length}`);

    console.log('\n🎉 Seed completado exitosamente');
    console.log('   Ya puedes arrancar el servidor con: npm run dev');
  } catch (err) {
    console.error('❌ Error en seed:', err.message);
    process.exit(1);
  } finally {
    await mongoose.disconnect();
    console.log('🔌 Desconectado de MongoDB');
  }
}

seed();
