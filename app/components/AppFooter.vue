<script setup lang="ts">
import { Facebook, Instagram, Mail, MessageCircle } from 'lucide-vue-next';

const year = new Date().getFullYear();

const social = [
	{ href: SOCIAL_LINKS.email, label: 'Correo', icon: Mail },
	{ href: SOCIAL_LINKS.whatsapp, label: 'WhatsApp', icon: MessageCircle },
	{ href: SOCIAL_LINKS.instagram, label: 'Instagram', icon: Instagram },
	{ href: SOCIAL_LINKS.facebook, label: 'Facebook', icon: Facebook },
] as const;
</script>

<template>
	<footer class="bg-azul-profundo text-crema-tela">
		<div
			class="mx-auto flex max-w-[1120px] flex-col items-center gap-6 px-4 py-16 text-center md:px-6"
		>
			<img
				src="/logo/logo-jl-circulo.svg"
				alt="Logo de Las Artesanías de Juanita"
				width="112"
				height="112"
				class="size-28"
			/>
			<p class="font-serif text-xl font-bold">{{ SITE_NAME }}</p>
			<p class="max-w-md">Bordo cada cuadro a mano, en lana, puntada a puntada.</p>
			<ul class="flex justify-center gap-3" aria-label="Redes y contacto">
				<li v-for="{ href, label, icon } in social" :key="label">
					<a
						:href="href"
						target="_blank"
						rel="noopener"
						:aria-label="label"
						class="flex size-11 items-center justify-center rounded-circulo border border-crema-tela/40 text-crema-tela transition-colors duration-200 hover:bg-crema-tela hover:text-azul-profundo"
					>
						<component :is="icon" class="icono" stroke-width="2" aria-hidden="true" />
					</a>
				</li>
			</ul>
			<p class="pequeno">© {{ year }} · Hecho a mano en Chile</p>
		</div>
	</footer>
</template>
