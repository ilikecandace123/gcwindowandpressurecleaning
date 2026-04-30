import * as m from './src/data/locations.js';
console.log('SERVICES count:', m.SERVICES.length);
console.log('Slugs:', m.SERVICES.map(s => s.slug).join(', '));
console.log('SUBURBS count:', m.SUBURBS.length);
const patio = m.SERVICES.find(s => s.slug === 'patio-cleaning');
console.log('Patio found:', !!patio);
console.log('Patio benefits:', patio?.benefits?.length, 'process:', patio?.process?.length, 'faqs:', patio?.faqs?.length);
console.log('Total prerender pages = SUBURBS x SERVICES:', m.SUBURBS.length * m.SERVICES.length);
