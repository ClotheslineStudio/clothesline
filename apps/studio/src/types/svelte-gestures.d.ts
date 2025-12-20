// Extend Svelte's JSX HTMLAttributes to allow on:swipe on any element
// This fixes the error for custom swipe events from svelte-gestures

declare namespace svelte.JSX {
  interface HTMLAttributes<T> {
    'on:swipe'?: (event: CustomEvent<any>) => void;
  }
}
