<script lang="ts">
  import { page } from '$app/stores';
  import { Header, Button } from '@clothesline/ui';
  import '../app.css';

  type NavItem = { href: string; label: string };

  const mainNav: NavItem[] = [
    { href: '/', label: 'Home' },
    { href: '/toolkits', label: 'Toolkits' },
    { href: '/plans', label: 'Plans' },
    { href: '/docs', label: 'Docs' },
    { href: '/sources', label: 'Sources' },
    { href: '/requirements', label: 'Requirements' },
    { href: '/settings', label: 'Settings' }
  ];
</script>

<div class="gravity-app">
  <!-- Top header -->
  <Header maxWidth="page">
    <svelte:fragment slot="left">
      <div class="gravity-brand">
        <div class="gravity-brand-icon">G</div>
        <div class="gravity-brand-text">
          <div class="gravity-brand-title">Gravity Planner</div>
          <div class="gravity-brand-subtitle">
            Framework → Plan → Delivery
          </div>
        </div>
      </div>
    </svelte:fragment>

    <svelte:fragment slot="center">
      <!-- later: global search / quick actions -->
    </svelte:fragment>

    <svelte:fragment slot="right">
      <div class="gravity-header-right">
        <Button size="sm" variant="ghost" color="neutral" href="/settings">
          Settings
        </Button>
      </div>
    </svelte:fragment>
  </Header>

  <!-- Body -->
  <div class="gravity-body">
    <!-- Sidebar -->
    <aside class="gravity-sidebar">
      <nav class="gravity-sidebar-nav">
        {#each mainNav as item}
          <a
            href={item.href}
            data-active={$page.url.pathname === item.href}
            class="gravity-sidebar-link"
          >
            {item.label}
          </a>
        {/each}
      </nav>
    </aside>

    <!-- Main content -->
    <main class="gravity-main">
      <div class="gravity-main-inner">
        <slot />
      </div>
    </main>
  </div>
</div>

<style>
  .gravity-app {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    background: #020617; /* slate-950-ish */
    color: #e5e7eb;      /* slate-200-ish */
    font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI",
      sans-serif;
  }

  .gravity-body {
    display: flex;
    flex: 1 1 auto;
    overflow: hidden;
  }

  .gravity-sidebar {
    width: 14rem; /* ~224px */
    flex-shrink: 0;
    display: none;
    flex-direction: column;
    border-right: 1px solid #1f2937; /* slate-800-ish */
    background: rgba(15, 23, 42, 0.95); /* slate-900-ish */
  }

  /* show sidebar on medium+ */
  @media (min-width: 768px) {
    .gravity-sidebar {
      display: flex;
    }
  }

  .gravity-sidebar-nav {
    flex: 1 1 auto;
    padding: 0.75rem;
    font-size: 0.875rem;
  }

  .gravity-sidebar-link {
    display: block;
    padding: 0.5rem 0.75rem;
    border-radius: 0.375rem;
    text-decoration: none;
    color: inherit;
    transition: background-color 0.15s ease, color 0.15s ease;
  }

  .gravity-sidebar-link:hover {
    background: #1f2937;
    color: #e0f2fe; /* sky-100-ish */
  }

  .gravity-sidebar-link[data-active="true"] {
    background: #1f2937;
    color: #7dd3fc; /* sky-300-ish */
  }

  .gravity-main {
    flex: 1 1 auto;
    overflow: auto;
  }

  .gravity-main-inner {
    max-width: 72rem; /* ~1152px */
    margin: 0 auto;
    padding: 2rem 1.5rem;
  }

  .gravity-brand {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .gravity-brand-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 2rem;
    width: 2rem;
    border-radius: 9999px;
    background: #0369a1; /* sky-600-ish */
    font-size: 0.75rem;
    font-weight: 700;
  }

  .gravity-brand-text {
    display: flex;
    flex-direction: column;
  }

  .gravity-brand-title {
    font-weight: 600;
    line-height: 1.2;
  }

  .gravity-brand-subtitle {
    font-size: 0.75rem;
    opacity: 0.7;
  }

  .gravity-header-right {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
</style>
