// Place any global data in this file.
// You can import this data from anywhere in your site by using the `import` keyword.

export const SITE_TITLE = 'Las Artesanías de Juanita — Bordados Crewel Hechos a Mano';
export const SITE_DESCRIPTION =
	'Bordados crewel hechos a mano en Chile por Juanita. Cuadros únicos bordados en lana con técnica crewel: colores, texturas y tradición artesanal en cada puntada.';
export const SITE_NAME = 'Las Artesanías de Juanita';
export const SITE_KEYWORDS =
	'bordado crewel, crewel embroidery, artesanía chilena, cuadros bordados en lana, bordado a mano, Juanita, arte textil, bordados crewel Chile';

export const NAV_LINKS = [
	{ href: '/', label: 'Inicio' },
	{ href: '/cuadros', label: 'Cuadros crewel' },
	{ href: '/contacto', label: 'Contacto' },
] as const;

export const CONTACT = {
	name: 'Juana Leiva',
	brand: SITE_NAME,
	email: 'lasartesaniasdejuanita@gmail.com',
	phoneDisplay: '+56 9 9938 4690',
	phoneE164: '+56999384690',
	instagramHandle: '@lasartesaniasdejuanita',
	facebookHandle: 'lasartesaniasdejuanita',
	vcardPath: '/contacto/juana-leiva.vcf',
} as const;

export const SOCIAL_LINKS = {
	email: `mailto:${CONTACT.email}`,
	whatsapp: `https://wa.me/${CONTACT.phoneE164.replace('+', '')}`,
	instagram: 'https://www.instagram.com/lasartesaniasdejuanita/',
	facebook: 'https://www.facebook.com/lasartesaniasdejuanita',
} as const;
