import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/contacto')({
	component: Contacto,
	head: () => ({
		title: 'Contacto - Las Artesanías de Juanita',
		meta: [
			{
				name: 'description',
				content:
					'Escríbenos por correo o WhatsApp para consultas y encargos de cuadros crewel hechos a mano.'
			},
			{ property: 'og:title', content: 'Contacto - Las Artesanías de Juanita' },
			{
				property: 'og:description',
				content: 'Escríbenos por correo o WhatsApp para consultas y encargos.'
			},
			{ property: 'og:type', content: 'website' }
		]
	})
});

function Contacto() {
	return (
		<section className="mx-auto max-w-3xl px-4 py-16">
			<h1 className="mb-8 text-center text-4xl font-extrabold">Contacto</h1>
			<div className="flex flex-col items-center rounded-2xl border bg-white p-8 shadow-lg">
				<p className="mb-8 max-w-xl text-center text-lg text-gray-700">
					Puedes contactarme directamente a través de mis redes sociales o por correo electrónico.
				</p>
				<ul className="flex w-full max-w-md flex-col gap-6">
					<li>
						<a
							href="mailto:lasartesaniasdejuanita@gmail.com"
							className="flex items-center gap-4 rounded-xl border p-4 transition hover:bg-gray-50"
						>
							<img src="/logos/gmail.svg" alt="Gmail" className="h-8 w-8" />
							<span className="text-lg font-medium">lasartesaniasdejuanita@gmail.com</span>
						</a>
					</li>
					<li>
						<a
							href="https://wa.me/56999384690"
							target="_blank"
							rel="noopener"
							className="flex items-center gap-4 rounded-xl border p-4 transition hover:bg-green-50"
						>
							<img src="/logos/whatsapp.svg" alt="WhatsApp" className="h-8 w-8" />
							<span className="text-lg font-medium">WhatsApp: +56 9 9938 4690</span>
						</a>
					</li>
					<li>
						<a
							href="https://www.instagram.com/lasartesaniasdejuanita/"
							target="_blank"
							rel="noopener"
							className="flex items-center gap-4 rounded-xl border p-4 transition hover:bg-pink-50"
						>
							<img src="/logos/instagram.svg" alt="Instagram" className="h-8 w-8" />
							<span className="text-lg font-medium">Instagram: @lasartesaniasdejuanita</span>
						</a>
					</li>
					<li>
						<a
							href="https://www.facebook.com/lasartesaniasdejuanita"
							target="_blank"
							rel="noopener"
							className="flex items-center gap-4 rounded-xl border p-4 transition hover:bg-blue-50"
						>
							<img src="/logos/facebook.svg" alt="Facebook" className="h-8 w-8" />
							<span className="text-lg font-medium">Facebook: lasartesaniasdejuanita</span>
						</a>
					</li>
				</ul>
			</div>
		</section>
	);
}
