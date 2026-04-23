import { createFileRoute, Link } from '@tanstack/react-router';
import { useMemo } from 'react';

import perfil from '@/lib/fotos/perfil.jpg';
import cuadroPortada from '@/lib/fotos/cuadroPortada.jpg';

const BASE_URL = import.meta.env.PUBLIC_BASE_URL ?? '';
const TITLE = 'Las Artesanías de Juanita — Bordados Crewel Hechos a Mano';
const DESCRIPTION =
	'Bordados crewel hechos a mano en Chile por Juanita. Cuadros únicos bordados en lana con técnica crewel: colores, texturas y tradición artesanal en cada puntada.';

export const Route = createFileRoute('/')({
	component: Home,
	head: () => ({
		title: TITLE,
		meta: [
			{ name: 'description', content: DESCRIPTION },
			{ property: 'og:title', content: TITLE },
			{ property: 'og:description', content: DESCRIPTION },
			{ property: 'og:type', content: 'website' },
			...(BASE_URL ? [{ property: 'og:url', content: `${BASE_URL}/` }] : []),
			{ property: 'og:image', content: '/favicon.svg' },
			{ name: 'twitter:card', content: 'summary_large_image' },
			{ name: 'twitter:title', content: TITLE },
			{ name: 'twitter:description', content: DESCRIPTION },
			{ name: 'twitter:image', content: '/favicon.svg' }
		]
	})
});

function Home() {
	const personSchema = useMemo(
		() =>
			JSON.stringify({
				'@context': 'https://schema.org',
				'@type': 'Person',
				name: 'Juanita',
				jobTitle: 'Artesana de bordado crewel',
				description:
					'Artesana chilena especializada en bordado crewel. Crea cuadros únicos bordados a mano en lana con la tradicional técnica crewel.',
				...(BASE_URL ? { url: BASE_URL } : {}),
				knowsAbout: [
					'Bordado crewel',
					'Crewel embroidery',
					'Arte textil',
					'Bordado en lana',
					'Artesanía chilena'
				]
			}),
		[]
	);

	return (
		<>
			<script type="application/ld+json" dangerouslySetInnerHTML={{ __html: personSchema }} />
			<section className="relative overflow-hidden bg-gradient-to-br from-[#e8ddd0] via-[#f0e6d3] to-[#dce5c5]">
				<div className="mx-auto grid max-w-6xl gap-10 px-4 py-20 md:grid-cols-2 md:items-center">
					<div className="animate-fade-in">
						<h1 className="mb-4 text-4xl font-extrabold tracking-tight text-[#3d2e1e] md:text-6xl">
							Bordados crewel hechos a mano
						</h1>
						<p className="mb-8 text-lg leading-relaxed text-[#5c4a32]">
							Cuadros únicos bordados en lana con técnica crewel por Juanita. Colores, texturas y
							tradición artesanal en cada puntada.
						</p>
						<div className="flex flex-wrap gap-3">
							<Link
								to="/cuadros"
								viewTransition
								className="rounded-full bg-[#786C3B] px-6 py-3 text-[#F5F5DC] shadow-sm transition-all duration-200 hover:bg-[#8B9467] hover:shadow-md"
							>
								Ver cuadros crewel
							</Link>
						</div>
					</div>
					<div className="animate-fade-in-delay-1 relative">
						<img
							src={perfil}
							alt="Juanita, artesana de bordado crewel en Chile"
							loading="lazy"
							className="aspect-square w-full rounded-3xl object-cover shadow-lg transition-shadow duration-300 hover:shadow-xl"
						/>
					</div>
				</div>
			</section>

			<section className="mx-auto max-w-6xl px-4 py-16">
				<h2 className="animate-fade-in mb-6 text-2xl font-bold text-[#3d2e1e]">
					Cuadros crewel destacados
				</h2>
				<div className="grid gap-6 md:grid-cols-3">
					<Link
						to="/cuadros"
						viewTransition
						className="animate-fade-in-delay-1 group overflow-hidden rounded-2xl border border-[#d4c4a8] bg-[#faf3e7] shadow-sm transition-all duration-300 hover:shadow-md"
					>
						<div className="flex aspect-[4/3] items-center justify-center bg-linear-to-br from-[#e2d9c8] to-[#d8dfc6]">
							<img
								src={cuadroPortada}
								alt="Cuadro bordado crewel destacado"
								loading="lazy"
								className="h-full w-full rounded-t-2xl object-cover transition-transform duration-500 ease-out group-hover:scale-105"
							/>
						</div>
						<div className="p-4">
							<h3 className="font-semibold text-[#3d2e1e] group-hover:underline">Cuadros crewel</h3>
							<p className="text-sm text-[#8c7a60]">Galería de obras bordadas en lana</p>
						</div>
					</Link>
				</div>
			</section>

			<section className="bg-[#f0e6d3]">
				<div className="mx-auto max-w-6xl px-4 py-16">
					<div className="grid gap-8 md:grid-cols-2 md:items-center">
						<div className="animate-fade-in">
							<h2 className="mb-3 text-2xl font-bold text-[#3d2e1e]">
								Bordado crewel hecho con el corazón
							</h2>
							<p className="text-[#5c4a32]">
								Como artesana del bordado crewel, esta técnica es una terapia que me relaja y me
								permite plasmar la belleza de la naturaleza, transformando cada pieza en una obra
								única bordada en lana.
							</p>
						</div>
						<div className="animate-fade-in-delay-1 rounded-2xl border border-[#d4c4a8] bg-[#faf3e7] p-6 shadow-sm">
							<p className="text-[#5c4a32] italic">
								"Busco transmitir en cada cuadro crewel todos los buenos sentimientos y pensamientos
								positivos que llevo dentro" — Juanita
							</p>
						</div>
					</div>
				</div>
			</section>
		</>
	);
}
