<script setup lang="ts">
import { ArrowRight, Download, Facebook, Instagram, Mail, MessageCircle } from 'lucide-vue-next';

const TITLE = `Contacto — ${SITE_NAME}`;
const DESCRIPTION =
	'Contacta a Juana Leiva para consultas sobre bordados crewel. Correo, WhatsApp, Instagram y Facebook de Las Artesanías de Juanita.';

useSeoMeta({
	title: TITLE,
	description: DESCRIPTION,
	ogTitle: TITLE,
	ogDescription: DESCRIPTION,
	twitterTitle: TITLE,
	twitterDescription: DESCRIPTION,
});

const channels = [
	{
		href: SOCIAL_LINKS.email,
		label: 'Correo',
		value: CONTACT.email,
		icon: Mail,
		external: false,
	},
	{
		href: SOCIAL_LINKS.whatsapp,
		label: 'WhatsApp',
		value: CONTACT.phoneDisplay,
		icon: MessageCircle,
		external: true,
	},
	{
		href: SOCIAL_LINKS.instagram,
		label: 'Instagram',
		value: CONTACT.instagramHandle,
		icon: Instagram,
		external: true,
	},
	{
		href: SOCIAL_LINKS.facebook,
		label: 'Facebook',
		value: CONTACT.facebookHandle,
		icon: Facebook,
		external: true,
	},
] as const;
</script>

<template>
	<section class="mx-auto max-w-[640px] px-4 py-16 md:px-6">
		<header class="animate-rise mb-10 text-center">
			<img
				src="/logo/logo-jl-circulo.svg"
				alt=""
				width="112"
				height="112"
				class="mx-auto mb-6 size-28"
			/>
			<p class="sobretitulo mb-2">Hablemos</p>
			<h1 class="titulo-1 mb-4">Contacto</h1>
			<p class="mx-auto max-w-[50ch]">
				Escríbeme por correo o redes. Respondo yo misma las consultas sobre mis bordados y los
				encargos.
			</p>
		</header>

		<ul class="animate-rise-delay-1 mb-10 space-y-3" aria-label="Canales de contacto">
			<li v-for="{ href, label, value, icon, external } in channels" :key="label">
				<a
					:href="href"
					class="tarjeta group flex items-center gap-4 p-4"
					:target="external ? '_blank' : undefined"
					:rel="external ? 'noopener noreferrer' : undefined"
				>
					<span
						class="flex size-11 shrink-0 items-center justify-center rounded-circulo bg-crema-tela text-azul-lana"
					>
						<component :is="icon" class="icono" stroke-width="2" aria-hidden="true" />
					</span>
					<span class="min-w-0 flex-1 text-left">
						<span class="pequeno block text-acero-oscuro">{{ label }}</span>
						<span class="block truncate font-semibold text-azul-profundo group-hover:text-azul-hilo">
							{{ value }}
						</span>
					</span>
					<ArrowRight class="icono text-acero" stroke-width="2" aria-hidden="true" />
				</a>
			</li>
		</ul>

		<div class="animate-rise-delay-2 puntada pt-10 text-center">
			<h2 class="titulo-3 mb-2">Guarda mi contacto</h2>
			<p class="mx-auto mb-6 max-w-[50ch] text-acero-oscuro">
				Descarga la ficha de {{ CONTACT.name }} para tenerla en tu teléfono o agenda.
			</p>
			<a :href="CONTACT.vcardPath" download="juana-leiva.vcf" class="boton boton-secundario">
				<Download class="icono" stroke-width="2" aria-hidden="true" />
				Guardar contacto
			</a>
		</div>
	</section>
</template>
