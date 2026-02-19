<script lang="ts">
  import { page } from '$app/stores';
  export let error: any;

  $: workspaceId = $page.url.searchParams.get('workspaceId') ?? 'ws_demo';
</script>

<div class="wrap">
  <section class="card">
    <p class="kicker">Requirement</p>
    <h1 class="title">Not found</h1>
    <p class="muted">{error?.message ?? 'This requirement does not exist (or you don’t have access).'}</p>

    <div class="actions">
      <a class="btn" href={`/requirements?workspaceId=${workspaceId}`}>← Back to Requirements</a>
    </div>
  </section>
</div>

<style>
  .wrap { padding: 18px; max-width: 900px; margin: 0 auto; }

  .card {
    border: 1px solid rgba(255,255,255,0.12);
    background: rgba(255,255,255,0.03);
    border-radius: 12px;
    padding: 14px;
  }

  .kicker { margin: 0 0 4px; font-size: 12px; opacity: 0.7; letter-spacing: 0.2px; }
  .title { margin: 0 0 6px; font-size: 22px; line-height: 1.2; }

  .muted { opacity: 0.75; }

  .actions { margin-top: 12px; }

  .btn {
    font-size: 12px;
    padding: 8px 10px;
    border-radius: 10px;
    border: 1px solid rgba(255,255,255,0.12);
    background: rgba(255,255,255,0.04);
    text-decoration: none;
    cursor: pointer;
    color: inherit;
    display: inline-block;
  }
</style>
