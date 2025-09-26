<script lang="ts">
  export let size: number | string = 24;
  export let strokeWidth: number | string = 2;
  export let ariaLabel: string = 'icon';
</script>

<svg
  xmlns="http://www.w3.org/2000/svg"
  viewBox="0 0 24 24"
  width={size}
  height={size}
  fill="none"
  stroke="currentColor"
  stroke-width={strokeWidth}
  stroke-linecap="round"
  stroke-linejoin="round"
  aria-label={ariaLabel}
  role="img"
>
  <path stroke="#000" stroke-width="2" d="M10 1q.817.002 1.592.144c.487.088.772.567.886 1.048a2.41 2.41 0 0 0 3.044 1.757c.473-.142 1.03-.135 1.35.242a9 9 0 0 1 1.597 2.76c.168.466-.105.951-.466 1.29a2.4 2.4 0 0 0-.76 1.759c0 .693.292 1.319.76 1.759.361.339.634.825.466 1.29a9 9 0 0 1-1.596 2.758c-.32.377-.876.385-1.35.243a2.4 2.4 0 0 0-1.902.22c-.6.347-.996.912-1.143 1.538-.114.482-.398.962-.886 1.05a9 9 0 0 1-3.183 0c-.488-.088-.773-.568-.886-1.05A2.4 2.4 0 0 0 6.38 16.27a2.4 2.4 0 0 0-1.903-.22c-.474.142-1.03.136-1.35-.242A9 9 0 0 1 1.53 13.05c-.168-.466.105-.952.466-1.291a2.407 2.407 0 0 0 0-3.519c-.36-.339-.634-.825-.466-1.29a9 9 0 0 1 1.596-2.758c.32-.377.877-.385 1.35-.243a2.41 2.41 0 0 0 3.045-1.758c.114-.481.398-.96.886-1.048A9 9 0 0 1 10 1Zm0 6a3 3 0 1 0 0 6 3 3 0 0 0 0-6Z" clip-rule="evenodd"/>
</svg>
