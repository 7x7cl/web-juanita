import { createFileRoute, Link } from '@tanstack/react-router';

import { CUADROS, getCuadroById } from '@/lib/cuadros';
import { images } from '@/lib/cuadros/imagesCuadros';

const BASE_URL = import.meta.env.PUBLIC_BASE_URL ?? '';

export const Route = createFileRoute('/cuadros/$id')({
	component: CuadroDetalle,
	loader: async ({ params }) => {
		const cuadro = await getCuadroById(params.id);
		if (!cuadro) {
			throw new Response('Not Found', { status: 404 });
		}
		return { cuadro };
	},
	head: ({ loaderData }) => {
		const cuadro = loaderData?.cuadro;
		if (!cuadro) {
			return { title: 'Cuadro - Las Artesanías de Juanita' };
		}
		const title = `${cuadro.titulo} - Cuadros crewel - Las Artesanías de Juanita`;
		const description = `${cuadro.titulo} — obra bordada en lana con técnica crewel. ${cuadro.vendido ? 'Estado: Vendido.' : 'Estado: Disponible.'}`;
		const imageKey = `./data/${cuadro.id}/${cuadro.portada}.jpg`;
		const ogImage = images[imageKey] ?? '';
		const ogImageUrl = ogImage && BASE_URL ? `${BASE_URL}${ogImage}` : ogImage;
		const ogUrl = BASE_URL ? `${BASE_URL}/cuadros/${cuadro.id}` : undefined;

		return {
			title,
			meta: [
				{ name: 'description', content: description },
				{ property: 'og:title', content: title },
				{ property: 'og:description', content: description },
				{ property: 'og:type', content: 'article' },
				...(ogUrl ? [{ property: 'og:url', content: ogUrl }] : []),
				...(ogImageUrl ? [{ property: 'og:image', content: ogImageUrl }] : [])
			]
		};
	}
});

function CuadroDetalle() {
	const { cuadro } = Route.useLoaderData();
	const imageKey = `./data/${cuadro.id}/${cuadro.portada}.jpg`;
	const imageSrc = images[imageKey];
	const currentIndex = CUADROS.findIndex((id) => id === cuadro.id);
	const prevId = currentIndex > 0 ? CUADROS[currentIndex - 1] : null;
	const nextId = currentIndex < CUADROS.length - 1 ? CUADROS[currentIndex + 1] : null;

	return (
		<main className="flex flex-col items-center justify-center bg-gradient-to-b from-white to-gray-100 p-6">
			<h1 className="mb-6 text-4xl font-bold text-gray-800 drop-shadow-lg">{cuadro.titulo}</h1>
			{imageSrc ? (
				<img
					src={imageSrc}
					alt={cuadro.titulo}
					loading="lazy"
					className="mb-6 max-w-xs rounded-lg border-4 border-white shadow-xl transition-transform duration-300 hover:scale-105"
					style={{ maxWidth: 400 }}
				/>
			) : null}
			<div className="flex flex-col items-center rounded-lg bg-white/80 px-6 py-4 shadow-md">
				<p className="mb-2 text-lg font-medium text-gray-700">
					Medidas: {cuadro.measures.width}cm x {cuadro.measures.height}cm
				</p>
				{cuadro.start?.year ? (
					<p className="mb-4 text-sm text-gray-600">
						Fecha de creación: {cuadro.start.day ? `${cuadro.start.day}/` : ''}
						{cuadro.start.month ? `${cuadro.start.month}/` : ''}
						{cuadro.start.year}
					</p>
				) : null}
				{cuadro.end?.year ? (
					<p className="mb-4 text-sm text-gray-600">
						Fecha de finalización: {cuadro.end.day ? `${cuadro.end.day}/` : ''}
						{cuadro.end.month ? `${cuadro.end.month}/` : ''}
						{cuadro.end.year}
					</p>
				) : null}
				<p
					className={`mt-2 rounded-full px-4 py-2 text-base font-semibold ${cuadro.vendido ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}
				>
					{cuadro.vendido ? 'Vendido' : 'Disponible'}
				</p>
			</div>

			<div className="mt-8 flex w-full justify-between">
				{prevId ? (
					<Link
						to="/cuadros/$id"
						params={{ id: prevId }}
						className="rounded-lg bg-blue-500 px-6 py-3 text-white shadow-lg transition-colors duration-300 hover:bg-blue-600"
					>
						Anterior
					</Link>
				) : (
					<span className="pointer-events-none rounded-lg bg-blue-500 px-6 py-3 text-white opacity-50">
						Anterior
					</span>
				)}
				{nextId ? (
					<Link
						to="/cuadros/$id"
						params={{ id: nextId }}
						className="rounded-lg bg-blue-500 px-6 py-3 text-white shadow-lg transition-colors duration-300 hover:bg-blue-600"
					>
						Siguiente
					</Link>
				) : (
					<span className="pointer-events-none rounded-lg bg-blue-500 px-6 py-3 text-white opacity-50">
						Siguiente
					</span>
				)}
			</div>
		</main>
	);
}
