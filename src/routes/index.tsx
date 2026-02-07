import { createFileRoute, Link } from '@tanstack/react-router';

import perfil from '@/lib/fotos/perfil.jpg';
import cuadroPortada from '@/lib/fotos/cuadroPortada.jpg';

const BASE_URL = import.meta.env.PUBLIC_BASE_URL ?? '';
const TITLE = 'Las Artesanías de Juanita';
const DESCRIPTION =
	'Artesanías bordadas en lana con técnica crewel, hechas a mano en Chile por Juanita. Descubre colores, texturas y tradición en cada puntada.';

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
	return (
		<>
			<section className="relative overflow-hidden bg-gradient-to-br from-purple-100 via-pink-50 to-orange-100">
				<div className="mx-auto grid max-w-6xl gap-10 px-4 py-20 md:grid-cols-2 md:items-center">
					<div>
						<h1 className="mb-4 text-4xl font-extrabold tracking-tight text-gray-900 md:text-6xl">
							Artesanías bordadas en lana, técnica crewel
						</h1>
						<p className="mb-8 text-lg leading-relaxed text-gray-700">
							Piezas únicas hechas a mano por Juanita. Colores, texturas y tradición en cada
							puntada.
						</p>
						<div className="flex flex-wrap gap-3">
							<Link
								to="/cuadros"
								className="rounded-full bg-gray-900 px-6 py-3 text-white hover:bg-black"
							>
								Ver cuadros
							</Link>
						</div>
					</div>
					<div className="relative">
						<img
							src={perfil}
							alt="Foto de Juanita"
							loading="lazy"
							className="aspect-square w-full rounded-3xl object-cover shadow-xl"
						/>
					</div>
				</div>
			</section>

			<section className="mx-auto max-w-6xl px-4 py-16">
				<h2 className="mb-6 text-2xl font-bold text-gray-900">Destacados</h2>
				<div className="grid gap-6 md:grid-cols-3">
					<Link
						to="/cuadros"
						className="group overflow-hidden rounded-2xl border bg-white shadow-sm"
					>
						<div className="flex aspect-[4/3] items-center justify-center bg-gradient-to-br from-purple-200 to-pink-200">
							<img
								src={cuadroPortada}
								alt="Cuadro destacado"
								loading="lazy"
								className="h-full w-full rounded-t-2xl object-cover transition duration-300 group-hover:scale-105"
							/>
						</div>
						<div className="p-4">
							<h3 className="font-semibold group-hover:underline">Cuadros crewel</h3>
							<p className="text-sm text-gray-600">Galería de obras</p>
						</div>
					</Link>
				</div>
			</section>

			<section className="bg-gray-50">
				<div className="mx-auto max-w-6xl px-4 py-16">
					<div className="grid gap-8 md:grid-cols-2 md:items-center">
						<div>
							<h2 className="mb-3 text-2xl font-bold text-gray-900">Hecho con el corazón</h2>
							<p className="text-gray-700">
								Como artesana, el bordado es una terapia que me relaja y me permite plasmar la
								belleza de la naturaleza, transformando cada pieza en una obra única.
							</p>
						</div>
						<div className="rounded-2xl border bg-white p-6 shadow-sm">
							<p className="text-gray-700">
								“Busco transmitir en cada cuadro todos los buenos sentimientos y pensamientos
								positivos que llevo dentro” — Juanita
							</p>
						</div>
					</div>
				</div>
			</section>
		</>
	);
}
