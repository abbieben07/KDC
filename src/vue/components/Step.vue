<template>
	<transition>
		<section v-show="active" class="step">
			<Form ref="form" class="form" @submit="onSubmit">
				<slot />
				<div class="d-flex p-2 step-footer" :class="align">
					<button v-if="canBack" class="btn btn-lg btn-secondary" @click="back">Back</button>
					<Button v-if="canNext" :loading="loading" :label="nextLabel" class="btn btn-lg btn-primary">Next</Button>
					<Button v-if="canDone" :loading="loading" :label="doneLabel" class="btn btn-lg btn-success">Done</Button>
				</div>
			</Form>
		</section>
	</transition>
</template>

<script lang="ts">
import { Emit, Options, Prop, Ref, Vue } from 'vue-decorator';
import { ButtonLabel } from "./Button";
import Button from "./Button.vue";
import Form from "./Form.vue";
import Wizard from './Wizard.vue';

@Options({
	emits: ["next"],
	components: {
		Form,
		Button
	}
})
export default class Step extends Vue {
	declare $parent: InstanceType<typeof Wizard>
	step = 0

	@Ref('form')
	readonly form!: InstanceType<typeof Form>

	@Prop({ Boolean, default: false })
	readonly loading!: boolean

	get canBack() {
		return this.$parent.step > 1
	}

	get canNext() {
		return this.$parent.step < this.$parent.steps
	}

	get canDone() {
		return this.$parent.step == this.$parent.steps
	}

	get active() {
		return this.$parent.step == this.step
	}

	get align() {
		return this.canBack ? 'justify-content-between' : 'justify-content-end'
	}

	get nextLabel(): ButtonLabel {
		return {
			normal: "Next",
			loading: "Updating Data",
		}
	}

	get doneLabel(): ButtonLabel {
		return {
			normal: "Done",
			loading: "Updating Data"
		}
	}

	back() {
		this.$parent.back();
	}

	@Emit("next")
	onSubmit(payload) {
		return {
			...payload,
			step: this.step,
			done: this.canDone,
			form: this.form
		};
	}

	mounted() {
		this.step = ++this.$parent.steps;
	}
}
</script>

<style lang="scss">
/* we will explain what these classes do next! */
.v-enter-active {
	transition: opacity 0.5s ease 0.5s;
}

.v-leave-active {
	transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
	opacity: 0;
}
</style>