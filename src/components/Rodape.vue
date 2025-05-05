<template>
	<div class="wrapper">
		<div
			fluid
			id="rodape">
			<v-container>
				<v-img
					class="logo-rodape"
					responsive
					contain
					height="100%"
					max-width="185"
					:src="LogoHorizontal" />
				<div class="socials">
					<v-icon @click="abrirLink('https://www.instagram.com/aprovei.bucomaxilo/?next=%2F')" style="color: white;">mdi-instagram</v-icon>
					<v-icon @click="abrirLink('https://www.facebook.com/profile.php?id=100077018277396')" style="color: white;">mdi-facebook</v-icon>
					<v-icon @click="abrirLink('https://wa.me/5511976684596')" style="color: white;">mdi-whatsapp</v-icon>
				</div>
				<span style="color: white;">
					Desenvolvido por Logan e Rafael
				</span>
			</v-container>
		</div>

	</div>
</template>

<script>
	import LogoHorizontal from "@/assets/logo-horizontal.png";

	export default {
		name: "rodape",
		data(){
			return {
				LogoHorizontal,
			};
		},
	};
</script>

<style scoped>
	#rodape::v-deep{
		display:flex;
		align-items:center;
		background-color: #111429;
		height:110px;
	}

	#rodape::v-deep .container{
		display:flex;
		justify-content:space-between;
		align-items:center;
	}

	#rodape::v-deep .v-icon{
		color:var(--cor-branca);
		margin:0 10px;
		font-size:33px;
	}

	#rodape::v-deep span{
		color:var(--cor-branca);
		font-family: Open Sans;
		font-size: 14px;
		font-weight: 400;
		line-height: 20px;
		letter-spacing: 0em;
		text-align: left;
	}
</style>
