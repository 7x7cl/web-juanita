import { createFileRoute, Link } from '@tanstack/react-router';

import { getCuadrosData } from '@/lib/cuadros';
import { images } from '@/lib/cuadros/imagesCuadros';

const TITLE = 'Cuadros crewel - Las Artesanías de Juanita';
const DESCRIPTION =
	'Galería de cuadros bordados en lana (técnica crewel). Piezas únicas hechas a mano por Juanita.';

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
		<section className="mx-auto max-w-6xl px-4 py-12">
			<h1 className="mb-6 text-3xl font-bold">Cuadros de lana bordada crewel</h1>
			<p className="mb-8 max-w-2xl text-gray-700">
				Explora una selección de piezas únicas. Si te interesa alguna obra, contáctanos para
				disponibilidad y encargos.
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
							className="block overflow-hidden rounded-2xl border bg-white shadow-sm transition-shadow hover:shadow-md"
						>
							<article>
								<div className="aspect-[5/4] bg-gradient-to-br from-purple-100 to-pink-100">
									{imageSrc ? (
										<img
											src={imageSrc}
											alt={cuadro.titulo}
											className="h-full w-full object-cover"
										/>
									) : null}
								</div>
								<div className="p-4">
									<h3 className="font-semibold">{cuadro.titulo}</h3>
									{cuadro.start ? (
										<p>
											Empezado: {cuadro.start.month ? `${cuadro.start.month}/` : ''}
											{cuadro.start.year}
										</p>
									) : null}
									{cuadro.end ? (
										<p>
											Terminado: {cuadro.end.month ? `${cuadro.end.month}/` : ''}
											{cuadro.end.year}
										</p>
									) : null}
									<div className="mt-3 flex items-center justify-between text-sm text-gray-700">
										<span className={cuadro.vendido ? 'text-emerald-700' : 'text-gray-500'}>
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
