<!-- +layout.svelte -->
<script lang="ts">
  import '../app.css';
  import { browser } from '$app/environment';

  // Shell + Region
  import { AppShell } from '@clothesline/ui';
  import { AppBar } from '@clothesline/ui';

  // Local pieces
  import Footer from '$lib/components/layout/Footer/Footer.svelte';
  import Sidebar from '$lib/components/layout/Sidebar.svelte';
  import ThreeColumn from '$lib/components/layout/ThreeColumn/ThreeColumn.svelte';
  import TableOfContents from '$lib/components/navigation/TableOfContents/TableOfContents.svelte';

  // Icons
  import { Menu, Sun, Moon, Github, Search } from 'lucide-svelte';

  // Mode state
  let mode: 'light' | 'dark' = 'light';

  if (browser) {
    const root = document.documentElement;
    const saved = localStorage.getItem('mode');
    const initial =
      saved === 'dark' || saved === 'light'
        ? saved
        : root.getAttribute('data-mode') ?? 'light';
    mode = initial as 'light' | 'dark';
    root.setAttribute('data-mode', mode);
    root.style.colorScheme = mode;
  }

  function toggleMode() {
    if (!browser) return;
    const root = document.documentElement;
    mode = mode === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-mode', mode);
    root.style.colorScheme = mode;
    localStorage.setItem('mode', mode);
  }

  // Sidebar collapse (AppShell controls off-canvas on small screens)
  let collapsed = true;
  function toggleSidebar() {
    collapsed = !collapsed;
  }

  const routes = [
    { title: 'Button', path: '/core/button' },
    { title: 'Card', path: '/core/card' },
    { title: 'Divider', path: '/core/divider' },
    { title: 'Icon', path: '/core/icon' },
    { title: 'Label', path: '/typography/label' },
    { title: 'Text', path: '/core/text' },
    { title: 'Chart', path: '/data/chart' },
    { title: 'DataList', path: '/data/datalist' },
    { title: 'Metric', path: '/data/metric' },
    { title: 'StatBlock', path: '/data/statblock' },
    { title: 'Table', path: '/data/table' },
    { title: 'Timeline', path: '/data/timeline' },
    { title: 'Alert', path: '/feedback/alert' },
    { title: 'Badge', path: '/feedback/badge' },
    { title: 'ProgressBar', path: '/feedback/progressbar' },
    { title: 'Spinner', path: '/feedback/spinner' },
    { title: 'Toast', path: '/feedback/toast' },
    { title: 'Tooltip', path: '/feedback/tooltip' },
    { title: 'Checkbox', path: '/form/checkbox' },
    { title: 'Radio', path: '/form/radio' },
    { title: 'DatePicker', path: '/form/datepicker' },
    { title: 'Dropdown', path: '/form/dropdown' },
    { title: 'Input', path: '/form/input' },
    { title: 'Select', path: '/form/select' },
    { title: 'Switch', path: '/form/switch' },
    { title: 'Textarea', path: '/form/textarea' },
    { title: 'Tabs', path: '/navigation/tabs' },
    { title: 'MegaMenu', path: '/navigation/megamenu' },
    { title: 'NavMenu', path: '/navigation/navmenu' },
    { title: 'Stepper', path: '/navigation/stepper' },
    { title: 'SideNav', path: '/navigation/sidenav' },
    { title: 'Breadcrumbs', path: '/navigation/breadcrumbs' },
    { title: 'Pagination', path: '/navigation/pagination' },
    { title: 'NavGroup', path: '/navigation/navgroup' },
    { title: 'Link', path: '/navigation/link' },
    { title: 'MobileNav', path: '/navigation/mobile-nav' },
    { title: 'Image', path: '/media/image' },
    { title: 'AudioPlayer', path: '/media/audioplayer' },
    { title: 'Avatar', path: '/media/avatar' },
    { title: 'Carousel', path: '/media/carousel' },
    { title: 'DocumentViewer', path: '/media/documentviewer' },
    { title: 'EmbedFrame', path: '/media/embedframe' },
    { title: 'FileUpload', path: '/media/fileupload' },
    { title: 'Gallery', path: '/media/gallery' },
    { title: 'ImageCropper', path: '/media/imagecropper' },
    { title: 'Lightbox', path: '/media/lightbox' },
    { title: 'MediaPlayer', path: '/media/mediaplayer' },
    { title: 'MediaPreview', path: '/media/mediapreview' },
    { title: 'VideoPlayer', path: '/media/videoplayer' },
    { title: 'ThreeColumn', path: '/layout/threecolumn' },
    { title: 'MainLayout', path: '/layout/mainlayout' },
    { title: 'Sidebar', path: '/layout/sidebar' },
    { title: 'Footer', path: '/layout/footer' },
    { title: 'Heading', path: '/typography/heading' },
    { title: 'Paragraph', path: '/typography/paragraph' },
    { title: 'AppBar', path: '/navigation/appbar' }
  ];
</script>

<AppShell
  {collapsed}
  collapsible={true}
  sidebarWidth="272px"
  contentMaxWidth="1200px"
  pageGutterX="var(--spacing-4, 1rem)"
>
  <!-- Header (AppBar fully owns surface and gutters via AppShell) -->
  <div slot="header">
    <AppBar sticky border elevated>
      <div slot="left" class="brand">
        <button class="icon-btn" on:click={toggleSidebar} aria-label="Toggle sidebar"><Menu size={18} /></button>
        <a href="/" class="brand-link">
          <img src="/Logo-01.svg" alt="Logo" class="brand-logo" />
          <span class="brand-name">Clothesline UI</span>
        </a>
      </div>

      <div slot="center">
        <nav class="main-nav">
          <a href="/docs">Docs</a>
          <a href="/components">Components</a>
          <a href="/apps">Apps</a>
        </nav>
      </div>

      <div slot="right" class="actions">
        <div class="search">
          <Search size={16} />
          <input type="search" placeholder="Search…" />
        </div>

        <button on:click={toggleMode} aria-pressed={mode === 'dark'} aria-label="Toggle dark mode" class="icon-btn">
          {#if mode === 'dark'} <Moon size={18} /> {:else} <Sun size={18} /> {/if}
        </button>

        <a href="https://github.com/clotheslinestudio/ui" target="_blank" rel="noopener noreferrer" class="icon-link" aria-label="GitHub">
          <Github size={18} />
        </a>
      </div>
    </AppBar>
  </div>

  <!-- Sidebar -->
  <div slot="sidebar">
    <Sidebar {routes} />
  </div>

  <!-- Content -->
  <div slot="content">
    <ThreeColumn maxWidth={920} tocWidth={280} stickyTop={16}>
      <div slot="main">
        <slot />
      </div>
      <div slot="toc">
        <TableOfContents selector=".main" />
      </div>
    </ThreeColumn>
  </div>

  <!-- Footer -->
  <div slot="footer">
    <Footer>
      <div slot="left">
        <span class="text-sm">© {new Date().getFullYear()} Clothesline Studio</span>
      </div>
      <div slot="center">
        <nav class="footer-nav">
          <a href="/privacy">Privacy</a>
          <a href="/terms">Terms</a>
          <a href="/contact">Contact</a>
        </nav>
      </div>
      <div slot="right">
        <a href="https://twitter.com" target="_blank">Twitter</a>
        <a href="https://discord.gg" target="_blank">Discord</a>
      </div>
    </Footer>
  </div>
</AppShell>

<style>
  /* Brand */
  .brand { display:flex; align-items:center; gap:.5rem; }
  .brand-link { display:flex; align-items:center; gap:.5rem; color: inherit; text-decoration: none; }
  .brand-logo { height: 2rem; }
  .brand-name { font-weight: 700; }

  /* Center nav */
  .main-nav { display:flex; gap:1rem; font-size:.9rem; }
  .main-nav a {
    text-decoration:none;
    color: var(--base-font-color);
    opacity:.85;
    padding:.25rem .5rem;
    border-radius:.5rem;
  }
  .main-nav a:hover { opacity:1; background: color-mix(in oklab, var(--base-font-color) 10%, transparent); }
  :global(html[data-mode="dark"]) .main-nav a { color: var(--base-font-color-dark); }

  /* Right actions */
  .actions { display:flex; align-items:center; gap:.5rem; }

  .icon-btn, .icon-link {
    display:inline-flex; align-items:center; justify-content:center;
    width:32px; height:32px; border-radius:.5rem;
    color: inherit; opacity:.9; transition: background .15s ease, opacity .15s ease;
  }
  .icon-btn:hover, .icon-link:hover { opacity:1; background: color-mix(in oklab, currentColor 12%, transparent); }

  /* Search box (dark-safe) */
  .search {
    display:flex; align-items:center; gap:.4rem;
    border:1px solid var(--color-surface-300);
    background: color-mix(in oklab, var(--color-surface-100) 88%, transparent);
    padding:.25rem .5rem; border-radius:.5rem;
  }
  .search input {
    border:0; outline:0; background:transparent;
    color: var(--base-font-color);
    font-size:.9rem; min-width:12ch;
  }
  .search input::placeholder { color: var(--text-muted, #667085); }
  :global(html[data-mode="dark"]) .search {
    border-color: var(--color-surface-700);
    background: color-mix(in oklab, var(--color-surface-900) 90%, transparent);
  }
  :global(html[data-mode="dark"]) .search input { color: var(--base-font-color-dark); }
  :global(html[data-mode="dark"]) .search input::placeholder { color: var(--text-muted, #a1a1aa); }

  /* Footer nav */
  .footer-nav { display:flex; gap:1rem; font-size:.8rem; opacity:.9; }
  .footer-nav a { text-decoration:none; color: inherit; }
</style>







