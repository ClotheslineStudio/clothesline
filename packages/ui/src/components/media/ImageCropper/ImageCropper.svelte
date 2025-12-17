<script lang="ts">
  let imageFile: File | null = null;
  let imageUrl: string | null = null;
  let canvasEl: HTMLCanvasElement;
  let ctx: CanvasRenderingContext2D;

  let crop = { x: 0, y: 0, width: 100, height: 100 };

  function handleFileChange(e: Event) {
    const target = e.target as HTMLInputElement;
    const file = target.files?.[0];
    if (file) {
      imageFile = file;
      imageUrl = URL.createObjectURL(file);
      drawImage();
    }
  }

  function drawImage() {
    if (!canvasEl || !imageUrl) return;
    const img = new Image();
    img.onload = () => {
      canvasEl.width = crop.width;
      canvasEl.height = crop.height;
      ctx = canvasEl.getContext('2d')!;
      ctx.clearRect(0, 0, canvasEl.width, canvasEl.height);
      ctx.drawImage(
        img,
        crop.x,
        crop.y,
        crop.width,
        crop.height,
        0,
        0,
        crop.width,
        crop.height
      );
    };
    img.src = imageUrl;
  }

  function exportCroppedImage() {
    if (!canvasEl) return;
    const croppedData = canvasEl.toDataURL('image/png');
    const link = document.createElement('a');
    link.href = croppedData;
    link.download = 'cropped.png';
    link.click();
  }
</script>

<div class="cl-cropper">
  <input type="file" accept="image/*" on:change={handleFileChange} />

  {#if imageUrl}
    <div class="preview-container">
      <canvas bind:this={canvasEl}></canvas>
      <button on:click={exportCroppedImage}>Download Cropped</button>
    </div>
  {/if}
</div>

<style>
  .cl-cropper {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-4, 1rem);
  }

  .preview-container {
    display: flex;
    flex-direction: column;
    align-items: start;
    gap: var(--spacing-2, 0.5rem);
  }

  canvas {
    border: 1px solid var(--border-default-color, #ccc);
    background: var(--color-surface-100, #f9f9f9);
    max-width: 100%;
  }
</style>
