import { useState } from 'react';
import { createFileRoute } from '@tanstack/react-router';

const CONTACT_NAME = 'Juana Leiva';
const CONTACT_PHONE = '+56999384690';
const CONTACT_EMAIL = 'lasartesaniasdejuanita@gmail.com';
const CONTACT_INSTAGRAM = 'https://www.instagram.com/lasartesaniasdejuanita/';
const CONTACT_VCARD = [
	'BEGIN:VCARD',
	'VERSION:3.0',
	`N:Leiva;Juana;;;`,
	`FN:${CONTACT_NAME}`,
	'ORG:Las Artesanías de Juanita',
	'TITLE:Artesana',
	`TEL;TYPE=CELL,VOICE:${CONTACT_PHONE}`,
	`EMAIL;TYPE=INTERNET:${CONTACT_EMAIL}`,
	`URL:${CONTACT_INSTAGRAM}`,
	'NOTE:Bordados crewel y artesanías.',
	'END:VCARD'
].join('\r\n');

function downloadVCard(blob: Blob) {
	const url = URL.createObjectURL(blob);
	const link = document.createElement('a');
	link.href = url;
	link.download = 'juana-leiva-las-artesanias-de-juanita.vcf';
	link.click();
	URL.revokeObjectURL(url);
}

export const Route = createFileRoute('/contacto')({
	component: Contacto,
	head: () => ({
		title: 'Contacto - Las Artesanías de Juanita — Bordados Crewel',
		meta: [
			{
				name: 'description',
				content:
					'Contacta a Juanita para consultas. Escríbenos por correo, WhatsApp o redes sociales.'
			},
			{ property: 'og:title', content: 'Contacto - Las Artesanías de Juanita — Bordados Crewel' },
			{
				property: 'og:description',
				content: 'Escríbenos por correo o WhatsApp para consultas de bordados crewel.'
			},
			{ property: 'og:type', content: 'website' }
		]
	})
});

function Contacto() {
	const [saveStatus, setSaveStatus] = useState<string | null>(null);

	const handleSaveContact = async () => {
		const vcardBlob = new Blob([CONTACT_VCARD], { type: 'text/vcard;charset=utf-8' });

		try {
			if (typeof window !== 'undefined' && 'File' in window) {
				const vcardFile = new File([vcardBlob], 'juana-leiva-las-artesanias-de-juanita.vcf', {
					type: 'text/vcard;charset=utf-8'
				});

				if (
					navigator.share &&
					navigator.canShare &&
					navigator.canShare({ files: [vcardFile] })
				) {
					await navigator.share({
						title: CONTACT_NAME,
						text: 'Contacto de Las Artesanías de Juanita',
						files: [vcardFile]
					});
					setSaveStatus('Contacto listo para guardar desde el menú de compartir.');
					return;
				}
			}
		} catch (error) {
			if (error instanceof DOMException && error.name === 'AbortError') {
				return;
			}
		}

		downloadVCard(vcardBlob);
		setSaveStatus('Contacto descargado en formato vCard.');
	};

	return (
		<section className="mx-auto my-12 max-w-3xl rounded-3xl bg-[#faf3e7]/80 px-4 py-16 shadow-lg backdrop-blur">
			<h1 className="animate-fade-in mb-8 text-center text-4xl font-extrabold text-[#3d2e1e]">
				Contacto
			</h1>
			<div className="animate-fade-in-delay-1 flex flex-col items-center rounded-2xl border border-[#d4c4a8] bg-[#faf3e7] p-8 shadow-sm">
				<p className="mb-8 max-w-xl text-center text-lg text-[#5c4a32]">
					Puedes contactarme directamente a través de mis redes sociales o por correo electrónico
					para consultas sobre bordados crewel.
				</p>
				<div className="mb-8 flex w-full max-w-md flex-col items-center gap-3 rounded-2xl border border-[#d4c4a8] bg-[#ece3d0]/80 p-5 text-center">
					<p className="text-sm font-medium tracking-[0.2em] text-[#8b5a2b] uppercase">
						Guardar contacto
					</p>
					<p className="text-sm text-[#5c4a32]">
						Descarga la ficha de contacto de {CONTACT_NAME} para guardarla en tu teléfono o
						agenda.
					</p>
					<button
						type="button"
						onClick={() => void handleSaveContact()}
						className="rounded-full bg-[#5c4a32] px-6 py-3 text-sm font-semibold text-[#faf3e7] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#3d2e1e] hover:shadow-lg"
					>
						Guardar contacto de Juana Leiva
					</button>
					{saveStatus ? <p className="text-sm text-[#5c4a32]">{saveStatus}</p> : null}
				</div>
				<ul className="flex w-full max-w-md flex-col gap-6">
					<li>
						<a
							href={`mailto:${CONTACT_EMAIL}`}
							className="flex items-center gap-4 rounded-xl border border-[#d4c4a8] p-4 transition-all duration-200 hover:bg-[#ece3d0] hover:shadow-sm"
						>
							<img src="/logos/gmail.svg" alt="Gmail" className="h-8 w-8" />
							<span className="text-lg font-medium text-[#3d2e1e]">{CONTACT_EMAIL}</span>
						</a>
					</li>
					<li>
						<a
							href="https://wa.me/56999384690"
							target="_blank"
							rel="noopener"
							className="flex items-center gap-4 rounded-xl border border-[#d4c4a8] p-4 transition-all duration-200 hover:bg-[#dce5c5] hover:shadow-sm"
						>
							<img src="/logos/whatsapp.svg" alt="WhatsApp" className="h-8 w-8" />
							<span className="text-lg font-medium text-[#3d2e1e]">WhatsApp: +56 9 9938 4690</span>
						</a>
					</li>
					<li>
						<a
							href="https://www.instagram.com/lasartesaniasdejuanita/"
							target="_blank"
							rel="noopener"
							className="flex items-center gap-4 rounded-xl border border-[#d4c4a8] p-4 transition-all duration-200 hover:bg-[#f0d9d0] hover:shadow-sm"
						>
							<img src="/logos/instagram.svg" alt="Instagram" className="h-8 w-8" />
							<span className="text-lg font-medium text-[#3d2e1e]">
								Instagram: @lasartesaniasdejuanita
							</span>
						</a>
					</li>
					<li>
						<a
							href="https://www.facebook.com/lasartesaniasdejuanita"
							target="_blank"
							rel="noopener"
							className="flex items-center gap-4 rounded-xl border border-[#d4c4a8] p-4 transition-all duration-200 hover:bg-[#d0dce5] hover:shadow-sm"
						>
							<img src="/logos/facebook.svg" alt="Facebook" className="h-8 w-8" />
							<span className="text-lg font-medium text-[#3d2e1e]">
								Facebook: lasartesaniasdejuanita
							</span>
						</a>
					</li>
				</ul>
			</div>
		</section>
	);
}
