<script lang="ts">
  import {onMount, onDestroy} from 'svelte';

  
  interface Props {
    // eslint-disable-next-line no-undef
    target?: HTMLElement | null | undefined;
    children?: import('svelte').Snippet;
  }

  let { target = globalThis.document?.body, children }: Props = $props();

  let ref: HTMLElement = $state();

  onMount(() => {
    if (target) {
      target.appendChild(ref);
    }
  });

  onDestroy(() => {
    if (ref?.parentNode) {
      ref.parentNode?.removeChild(ref);
    }
  });
</script>

<div bind:this={ref}>
  {@render children?.()}
</div>
