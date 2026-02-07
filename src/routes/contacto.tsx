import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/contacto')({
	component: Contacto,
	head: () => ({
		title: 'Contacto - Las Artesanías de Juanita — Bordados Crewel',
		meta: [
			{
				name: 'description',
				content:
					'Contacta a Juanita para consultas y encargos de cuadros bordados crewel hechos a mano. Escríbenos por correo, WhatsApp o redes sociales.'
			},
			{ property: 'og:title', content: 'Contacto - Las Artesanías de Juanita — Bordados Crewel' },
			{
				property: 'og:description',
				content: 'Escríbenos por correo o WhatsApp para consultas y encargos de bordados crewel.'
			},
			{ property: 'og:type', content: 'website' }
		]
	})
});

function Contacto() {
	return (
		<section className="mx-auto max-w-3xl px-4 py-16">
			<h1 className="animate-fade-in mb-8 text-center text-4xl font-extrabold text-gray-800">
				Contacto
			</h1>
			<div className="animate-fade-in-delay-1 flex flex-col items-center rounded-2xl border border-gray-100 bg-white p-8 shadow-sm">
				<p className="mb-8 max-w-xl text-center text-lg text-gray-600">
					Puedes contactarme directamente a través de mis redes sociales o por correo electrónico
					para consultas sobre bordados crewel y encargos.
				</p>
				<ul className="flex w-full max-w-md flex-col gap-6">
					<li>
						<a
							href="mailto:lasartesaniasdejuanita@gmail.com"
							className="flex items-center gap-4 rounded-xl border border-gray-100 p-4 transition-all duration-200 hover:bg-gray-50 hover:shadow-sm"
						>
							<img src="/logos/gmail.svg" alt="Gmail" className="h-8 w-8" />
							<span className="text-lg font-medium text-gray-700">
								lasartesaniasdejuanita@gmail.com
							</span>
						</a>
					</li>
					<li>
						<a
							href="https://wa.me/56999384690"
							target="_blank"
							rel="noopener"
							className="flex items-center gap-4 rounded-xl border border-gray-100 p-4 transition-all duration-200 hover:bg-green-50 hover:shadow-sm"
						>
							<img src="/logos/whatsapp.svg" alt="WhatsApp" className="h-8 w-8" />
							<span className="text-lg font-medium text-gray-700">WhatsApp: +56 9 9938 4690</span>
						</a>
					</li>
					<li>
						<a
							href="https://www.instagram.com/lasartesaniasdejuanita/"
							target="_blank"
							rel="noopener"
							className="flex items-center gap-4 rounded-xl border border-gray-100 p-4 transition-all duration-200 hover:bg-pink-50 hover:shadow-sm"
						>
							<img src="/logos/instagram.svg" alt="Instagram" className="h-8 w-8" />
							<span className="text-lg font-medium text-gray-700">
								Instagram: @lasartesaniasdejuanita
							</span>
						</a>
					</li>
					<li>
						<a
							href="https://www.facebook.com/lasartesaniasdejuanita"
							target="_blank"
							rel="noopener"
							className="flex items-center gap-4 rounded-xl border border-gray-100 p-4 transition-all duration-200 hover:bg-blue-50 hover:shadow-sm"
						>
							<img src="/logos/facebook.svg" alt="Facebook" className="h-8 w-8" />
							<span className="text-lg font-medium text-gray-700">
								Facebook: lasartesaniasdejuanita
							</span>
						</a>
					</li>
				</ul>
			</div>
		</section>
	);
}
