// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

// 👇 Add this at the bottom
declare module '*.md' {
	const content: {
	  default: ConstructorOfATypedSvelteComponent;
	};
	export default content;
  }

export {};
