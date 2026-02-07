import { useEffect, useMemo, useState } from 'react';
import {
	HeadContent,
	Scripts,
	createRootRoute,
	Link,
	useRouterState
} from '@tanstack/react-router';
import { Menu, X } from 'lucide-react';

import appCss from '../styles.css?url';

const BASE_URL = import.meta.env.PUBLIC_BASE_URL ?? '';
const DEFAULT_TITLE = 'Las Artesanías de Juanita — Bordados Crewel Hechos a Mano';
const DEFAULT_DESCRIPTION =
	'Bordados crewel hechos a mano en Chile por Juanita. Cuadros únicos bordados en lana con técnica crewel: colores, texturas y tradición artesanal en cada puntada.';

const links = [
	{ href: '/', label: 'Inicio' },
	{ href: '/cuadros', label: 'Cuadros crewel' },
	{ href: '/contacto', label: 'Contacto' }
];

export const Route = createRootRoute({
	head: ({ location }) => {
		const canonical = BASE_URL ? `${BASE_URL}${location.pathname}` : null;

		return {
			title: DEFAULT_TITLE,
			meta: [
				{ charSet: 'utf-8' },
				{ name: 'viewport', content: 'width=device-width, initial-scale=1' },
				{ name: 'description', content: DEFAULT_DESCRIPTION },
				{
					name: 'keywords',
					content:
						'bordado crewel, crewel embroidery, artesanía chilena, cuadros bordados en lana, bordado a mano, Juanita, arte textil, bordados crewel Chile'
				},
				{ name: 'robots', content: 'index,follow' },
				{ name: 'author', content: 'Las Artesanías de Juanita' },
				{ property: 'og:type', content: 'website' },
				{ property: 'og:site_name', content: 'Las Artesanías de Juanita' },
				...(canonical ? [{ property: 'og:url', content: canonical }] : []),
				{ property: 'og:title', content: DEFAULT_TITLE },
				{ property: 'og:description', content: DEFAULT_DESCRIPTION },
				{ property: 'og:image', content: '/favicon.svg' },
				{ name: 'twitter:card', content: 'summary_large_image' },
				{ name: 'twitter:title', content: DEFAULT_TITLE },
				{ name: 'twitter:description', content: DEFAULT_DESCRIPTION },
				{ name: 'twitter:image', content: '/favicon.svg' }
			],
			links: [
				{ rel: 'stylesheet', href: appCss },
				...(canonical ? [{ rel: 'canonical', href: canonical }] : [])
			]
		};
	},
	shellComponent: RootDocument
});

function RootDocument({ children }: { children: React.ReactNode }) {
	const organizationSchema = useMemo(
		() =>
			JSON.stringify({
				'@context': 'https://schema.org',
				'@type': 'Organization',
				name: 'Las Artesanías de Juanita',
				description:
					'Artesana especializada en bordado crewel. Cuadros únicos bordados a mano en lana con técnica crewel en Chile.',
				...(BASE_URL ? { url: BASE_URL } : {}),
				logo: '/favicon.svg',
				sameAs: [
					'https://www.instagram.com/lasartesaniasdejuanita/',
					'https://www.facebook.com/lasartesaniasdejuanita',
					'https://wa.me/56999384690'
				]
			}),
		[]
	);

	return (
		<html lang="es">
			<head>
				<HeadContent />
				<script type="application/ld+json">{organizationSchema}</script>
			</head>
			<body>
				<Layout>{children}</Layout>
				<Scripts />
			</body>
		</html>
	);
}

function Layout({ children }: { children: React.ReactNode }) {
	const [mobileOpen, setMobileOpen] = useState(false);
	const pathname = useRouterState({ select: (state) => state.location.pathname });

	useEffect(() => {
		const handler = (event: KeyboardEvent) => {
			if (event.key === 'Escape') {
				setMobileOpen(false);
			}
		};
		window.addEventListener('keydown', handler);
		return () => window.removeEventListener('keydown', handler);
	}, []);

	return (
		<>
			<header className="sticky top-0 z-30 border-b border-gray-100 bg-white/85 backdrop-blur-lg supports-[backdrop-filter]:bg-white/70">
				<div className="relative mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
					<Link to="/" className="flex items-center gap-2">
						<span className="bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-lg font-bold text-transparent">
							Las Artesanías de Juanita
						</span>
					</Link>
					<nav className="hidden gap-2 md:flex">
						{links.map((link) => {
							const isActive = pathname === link.href;
							return (
								<Link
									key={link.href}
									to={link.href}
									preload="viewport"
									className={`rounded-full px-4 py-2 text-sm font-medium transition-all duration-200 ${isActive ? 'bg-gray-800 text-white shadow-sm' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}`}
									aria-current={isActive ? 'page' : undefined}
								>
									{link.label}
								</Link>
							);
						})}
					</nav>

					<button
						className="rounded-full p-2 text-gray-600 transition-colors duration-200 hover:bg-gray-50 md:hidden"
						aria-label={mobileOpen ? 'Cerrar menú' : 'Abrir menú'}
						aria-expanded={mobileOpen}
						onClick={() => setMobileOpen((prev) => !prev)}
					>
						{mobileOpen ? (
							<X className="h-6 w-6" aria-hidden="true" />
						) : (
							<Menu className="h-6 w-6" aria-hidden="true" />
						)}
					</button>

					{mobileOpen && (
						<div className="animate-fade-in absolute top-full right-4 z-40 mt-2 w-56 rounded-2xl border border-gray-100 bg-white p-2 shadow-lg md:hidden">
							{links.map((link) => {
								const isActive = pathname === link.href;
								return (
									<Link
										key={link.href}
										to={link.href}
										preload="viewport"
										className={`block rounded-xl px-3 py-2 text-sm font-medium transition-colors duration-200 ${isActive ? 'bg-gray-800 text-white' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}`}
										aria-current={isActive ? 'page' : undefined}
										onClick={() => setMobileOpen(false)}
									>
										{link.label}
									</Link>
								);
							})}
						</div>
					)}
				</div>
			</header>

			{mobileOpen && (
				<div
					className="fixed inset-0 z-20 bg-black/20 md:hidden"
					role="button"
					tabIndex={0}
					aria-label="Cerrar menú"
					onClick={() => setMobileOpen(false)}
					onKeyDown={(event) => {
						if (event.key === 'Escape' || event.key === 'Enter' || event.key === ' ') {
							setMobileOpen(false);
						}
					}}
				/>
			)}

			{children}

			<footer className="border-t border-gray-100 bg-gray-50/60">
				<div className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-4 py-8 text-center text-sm text-gray-500">
					<div className="mb-2 flex justify-center gap-6">
						<a
							href="mailto:lasartesaniasdejuanita@gmail.com"
							target="_blank"
							rel="noopener"
							aria-label="Gmail"
						>
							<img
								src="/logos/gmail.svg"
								alt="Gmail"
								className="h-5 w-5 opacity-70 transition-all duration-200 hover:scale-110 hover:opacity-100"
							/>
						</a>
						<a
							href="https://wa.me/56999384690"
							target="_blank"
							rel="noopener"
							aria-label="WhatsApp"
						>
							<img
								src="/logos/whatsapp.svg"
								alt="WhatsApp"
								className="h-5 w-5 opacity-70 transition-all duration-200 hover:scale-110 hover:opacity-100"
							/>
						</a>
						<a
							href="https://www.instagram.com/lasartesaniasdejuanita/"
							target="_blank"
							rel="noopener"
							aria-label="Instagram"
						>
							<img
								src="/logos/instagram.svg"
								alt="Instagram"
								className="h-5 w-5 opacity-70 transition-all duration-200 hover:scale-110 hover:opacity-100"
							/>
						</a>
						<a
							href="https://www.facebook.com/lasartesaniasdejuanita"
							target="_blank"
							rel="noopener"
							aria-label="Facebook"
						>
							<img
								src="/logos/facebook.svg"
								alt="Facebook"
								className="h-5 w-5 opacity-70 transition-all duration-200 hover:scale-110 hover:opacity-100"
							/>
						</a>
					</div>
					<p>© {new Date().getFullYear()} Las Artesanías de Juanita. Hecho con cariño en Chile.</p>
				</div>
			</footer>
		</>
	);
}
