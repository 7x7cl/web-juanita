import { createFileRoute, Link } from '@tanstack/react-router';
import { useEffect, useLayoutEffect, useRef, useState, type RefObject } from 'react';
import { useWindowVirtualizer } from '@tanstack/react-virtual';

import type { CuadroData } from '@/lib/cuadros';
import { getCuadrosData } from '@/lib/cuadros';
import { getCuadroImageSources } from '@/lib/cuadros/imagesCuadros';

const TITLE = 'Cuadros Bordados Crewel - Las Artesanías de Juanita';
const DESCRIPTION =
	'Galería de cuadros bordados en lana con técnica crewel. Piezas únicas de bordado crewel hechas a mano por Juanita en Chile.';
const GRID_GAP = 24;
const CARD_COPY_HEIGHT = 156;
const INITIAL_CARD_COUNT = 12;

function getColumnCount(width: number) {
	if (width >= 768) {
		return 3;
	}

	if (width >= 640) {
		return 2;
	}

	return 1;
}

function useGridMetrics(containerRef: RefObject<HTMLDivElement | null>) {
	const [metrics, setMetrics] = useState({ columns: 3, width: 1024, scrollMargin: 0 });

	useLayoutEffect(() => {
		if (typeof window === 'undefined') {
			return;
		}

		const element = containerRef.current;
		if (!element) {
			return;
		}

		const updateMetrics = () => {
			const width = element.clientWidth || 1024;
			setMetrics({
				columns: getColumnCount(width),
				width,
				scrollMargin: element.getBoundingClientRect().top + window.scrollY
			});
		};

		updateMetrics();

		const resizeObserver = new ResizeObserver(updateMetrics);
		resizeObserver.observe(element);
		window.addEventListener('resize', updateMetrics);
		window.addEventListener('load', updateMetrics);

		return () => {
			resizeObserver.disconnect();
			window.removeEventListener('resize', updateMetrics);
			window.removeEventListener('load', updateMetrics);
		};
	}, [containerRef]);

	return metrics;
}

export const Route = createFileRoute('/cuadros/')({
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
	const gridRef = useRef<HTMLDivElement>(null);
	const [hydrated, setHydrated] = useState(false);
	const { columns, width, scrollMargin } = useGridMetrics(gridRef);
	const rowCount = Math.ceil(cuadros.length / columns);
	const cardWidth = Math.max((width - GRID_GAP * (columns - 1)) / columns, 280);
	const estimatedRowHeight = cardWidth * 0.8 + CARD_COPY_HEIGHT;
	const rowVirtualizer = useWindowVirtualizer({
		count: rowCount,
		estimateSize: () => estimatedRowHeight,
		overscan: 3,
		scrollMargin
	});

	useEffect(() => {
		setHydrated(true);
	}, []);

	return (
		<section className="mx-auto my-12 max-w-6xl rounded-3xl bg-white/70 px-4 py-12 shadow-lg backdrop-blur">
			<h1 className="animate-fade-in mb-6 text-3xl font-bold text-gray-800">
				Cuadros de bordado crewel en lana
			</h1>
			<p className="animate-fade-in-delay-1 mb-8 max-w-2xl text-gray-600">
				Explora una selección de cuadros únicos bordados a mano con técnica crewel. Si te interesa
				alguna obra, contáctanos para disponibilidad y encargos.
			</p>

			<div ref={gridRef}>
				{hydrated ? (
					<div
						className="relative"
						style={{ height: `${rowVirtualizer.getTotalSize()}px` }}
					>
						{rowVirtualizer.getVirtualItems().map((virtualRow) => {
							const rowItems = cuadros.slice(
								virtualRow.index * columns,
								virtualRow.index * columns + columns
							);

							return (
								<div
									key={virtualRow.key}
									ref={rowVirtualizer.measureElement}
									data-index={virtualRow.index}
									className="absolute left-0 top-0 grid w-full gap-6"
									style={{
										gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
										transform: `translateY(${virtualRow.start - scrollMargin}px)`
									}}
								>
									{rowItems.map((cuadro) => (
										<CuadroCard key={cuadro.id} cuadro={cuadro} />
									))}
								</div>
							);
						})}
					</div>
				) : (
					<div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
						{cuadros.slice(0, INITIAL_CARD_COUNT).map((cuadro) => (
							<CuadroCard key={cuadro.id} cuadro={cuadro} />
						))}
					</div>
				)}
			</div>
		</section>
	);
}

function CuadroCard({ cuadro }: { cuadro: CuadroData }) {
	const imageSources = getCuadroImageSources(cuadro.id, cuadro.portada);

	return (
		<Link
			to="/cuadros/$id"
			viewTransition
			params={{ id: cuadro.id }}
			preload="viewport"
			className="animate-fade-in-delay-2 block overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-all duration-300 hover:shadow-md"
		>
			<article>
				<div className="aspect-5/4 bg-linear-to-br from-fuchsia-50 to-rose-50">
					{imageSources.galleryFallback ? (
						<picture>
							{imageSources.galleryWebp ? (
								<source
									srcSet={imageSources.galleryWebp}
									type="image/webp"
									sizes="(min-width: 768px) 22rem, (min-width: 640px) calc(50vw - 2rem), 100vw"
								/>
							) : null}
							<img
								src={imageSources.galleryFallback}
								alt={`${cuadro.titulo} — cuadro bordado crewel`}
								loading="lazy"
								decoding="async"
								className="h-full w-full object-cover transition-transform duration-500 ease-out hover:scale-105"
							/>
						</picture>
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
}
