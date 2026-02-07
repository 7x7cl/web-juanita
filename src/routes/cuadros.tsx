import { createFileRoute, Link } from '@tanstack/react-router';

import { getCuadrosData } from '@/lib/cuadros';
import { images } from '@/lib/cuadros/imagesCuadros';

const TITLE = 'Cuadros Bordados Crewel - Las Artesanías de Juanita';
const DESCRIPTION =
	'Galería de cuadros bordados en lana con técnica crewel. Piezas únicas de bordado crewel hechas a mano por Juanita en Chile.';

export const Route = createFileRoute('/cuadros')({
	component: Cuadros,
	loader: async () => ({ cuadros: await getCuadrosData() }),
	head: () => ({
		title: TITLE,
		meta: [
			{ name: 'description', content: DESCRIPTION },
			{ property: 'og:title', content: TITLE },
			{ property: 'og:description', content: DESCRIPTION },
			{ property: 'og:type', content: 'website' }
		]
	})
});

function Cuadros() {
	const { cuadros } = Route.useLoaderData();

	return (
		<section className="mx-auto my-12 max-w-6xl rounded-3xl bg-white/70 px-4 py-12 shadow-lg backdrop-blur">
			<h1 className="animate-fade-in mb-6 text-3xl font-bold text-gray-800">
				Cuadros de bordado crewel en lana
			</h1>
			<p className="animate-fade-in-delay-1 mb-8 max-w-2xl text-gray-600">
				Explora una selección de cuadros únicos bordados a mano con técnica crewel. Si te interesa
				alguna obra, contáctanos para disponibilidad y encargos.
			</p>

			<div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
				{cuadros.map((cuadro) => {
					const imageKey = `./data/${cuadro.id}/${cuadro.portada}.jpg`;
					const imageSrc = images[imageKey];
					return (
						<Link
							key={cuadro.id}
							to="/cuadros/$id"
							params={{ id: cuadro.id }}
							className="animate-fade-in-delay-2 block overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-all duration-300 hover:shadow-md"
						>
							<article>
								<div className="aspect-[5/4] bg-gradient-to-br from-purple-50 to-pink-50">
									{imageSrc ? (
										<img
											src={imageSrc}
											alt={`${cuadro.titulo} — cuadro bordado crewel`}
											className="h-full w-full object-cover transition-transform duration-500 ease-out hover:scale-105"
										/>
									) : null}
								</div>
								<div className="p-4">
									<h3 className="font-semibold text-gray-800">{cuadro.titulo}</h3>
									{cuadro.start ? (
										<p className="text-sm text-gray-500">
											Empezado: {cuadro.start.month ? `${cuadro.start.month}/` : ''}
											{cuadro.start.year}
										</p>
									) : null}
									{cuadro.end ? (
										<p className="text-sm text-gray-500">
											Terminado: {cuadro.end.month ? `${cuadro.end.month}/` : ''}
											{cuadro.end.year}
										</p>
									) : null}
									<div className="mt-3 flex items-center justify-between text-sm">
										<span className={cuadro.vendido ? 'text-emerald-600' : 'text-gray-400'}>
											{cuadro.vendido ? 'Vendido' : 'Disponible'}
										</span>
									</div>
								</div>
							</article>
						</Link>
					);
				})}
			</div>
		</section>
	);
}
