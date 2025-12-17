<!-- +layout.svelte -->
<script lang="ts">
  import '../app.css';

  // Shell + Region
  import { AppShell } from '@clothesline/ui';
  import { AppBar } from '@clothesline/ui';

  // Local pieces
  import Footer from '$lib/components/layout/Footer/Footer.svelte';
  import Sidebar from '$lib/components/layout/Sidebar.svelte';
  import ThreeColumn from '$lib/components/layout/ThreeColumn/ThreeColumn.svelte';
  import TableOfContents from '$lib/components/navigation/TableOfContents/TableOfContents.svelte';

  // Theme toggle (header control)
  import ThemePicker from '$lib/ThemePicker.svelte';
  import ModeToggle from '$lib/ModeToggle.svelte';

  // Icons
  import { Menu, Github } from 'lucide-svelte';
  import { Search as SearchIcon } from '@clothesline/icons';

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
    { title: 'Badge', path: '/core/badge' },
    { title: 'ProgressBar', path: '/feedback/progressbar' },
    { title: 'Spinner', path: '/feedback/spinner' },
    { title: 'Toast', path: '/feedback/toast' },
    { title: 'Tooltip', path: '/feedback/tooltip' },
    { title: 'Checkbox', path: '/form/checkbox' },
    { title: 'Radio', path: '/form/radio' },
    { title: 'DatePicker', path: '/form/datepicker' },
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
    
    
    
   
    { title: 'Heading', path: '/typography/heading' },
    { title: 'Paragraph', path: '/typography/paragraph' },
    { title: 'AppBar', path: '/navigation/appbar' },
    { title: 'Modes-Test', path: '/modes-test' }
  ];
</script>

<AppShell
  {collapsed}
  collapsible={true}
  sidebarWidth="272px"
  contentMaxWidth="1200px"
  pageGutterX="var(--spacing-4, 1rem)"
>
  <div slot="header">
    <AppBar sticky border elevated>
      <div slot="left" class="brand">
        <button class="icon-btn" on:click={toggleSidebar} aria-label="Toggle sidebar">
          <Menu size={18} />
        </button>

        <a href="/" class="brand-link">
          <img src="/Logo-01.svg" alt="Logo" class="brand-logo" />
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
          <SearchIcon size={16} />
          <input type="search" placeholder="Search…" />
        </div>

        <ThemePicker />
        <ModeToggle size={32} rounded={8} />

        <a
          href="https://github.com/clotheslinestudio/ui"
          target="_blank"
          rel="noopener noreferrer"
          class="icon-link"
          aria-label="GitHub"
        >
          <Github size={18} />
        </a>
      </div>
    </AppBar>
  </div>

  <div slot="sidebar">
    <Sidebar {routes} />
  </div>

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
        <a href="https://twitter.com" target="_blank" rel="noreferrer">Twitter</a>
        <a href="https://discord.gg" target="_blank" rel="noreferrer">Discord</a>
      </div>
    </Footer>
  </div>
</AppShell>

<style>
  /* Brand */
  .brand {
    display: flex;
    align-items: center;
    gap: var(--spacing-2);
  }

  .brand-link {
    display: flex;
    align-items: center;
    gap: var(--spacing-2);
    color: var(--on-surface-strong);
    text-decoration: none;
  }

  .brand-logo {
    height: var(--size-control-md);
  }


  /* Center nav */
  .main-nav {
    display: flex;
    gap: var(--spacing-4);
    font-size: var(--type-scale-sm);
  }

  .main-nav a {
    text-decoration: none;
    color: var(--on-surface);
    opacity: 0.92;
    padding: var(--spacing-1) var(--spacing-2);
    border-radius: var(--radius-interactive);
    transition:
      background var(--motion-duration-fast) var(--motion-ease),
      opacity var(--motion-duration-fast) var(--motion-ease),
      outline-color var(--motion-duration-fast) var(--motion-ease);
  }

  .main-nav a:hover {
    opacity: 1;
    background: color-mix(
      in oklab,
      var(--on-surface) calc(var(--opacity-hover) * 100%),
      transparent
    );
  }

  .main-nav a:focus-visible {
    outline: var(--focus-width) solid color-mix(
      in oklab,
      var(--on-surface) calc(var(--opacity-focus) * 100%),
      transparent
    );
    outline-offset: var(--focus-offset-2);
  }

  /* Right actions */
  .actions {
    display: flex;
    align-items: center;
    gap: var(--spacing-2);
  }

  .icon-btn,
  .icon-link {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: var(--size-control-md);
    height: var(--size-control-md);
    border-radius: var(--radius-interactive);

    color: var(--on-surface);
    opacity: 0.95;

    transition:
      background var(--motion-duration-fast) var(--motion-ease),
      opacity var(--motion-duration-fast) var(--motion-ease),
      outline-color var(--motion-duration-fast) var(--motion-ease);
  }

  /* Normalize button reset */
  .icon-btn {
    background: transparent;
    border: 0;
    padding: 0;
    cursor: pointer;
  }

  .icon-btn:hover,
  .icon-link:hover {
    opacity: 1;
    /* Replaces --background-scrim */
    background: color-mix(
      in oklab,
      var(--on-surface) calc(var(--opacity-hover) * 100%),
      transparent
    );
  }

  .icon-btn:focus-visible,
  .icon-link:focus-visible {
    outline: var(--focus-width) solid color-mix(
      in oklab,
      var(--on-surface) calc(var(--opacity-focus) * 100%),
      transparent
    );
    outline-offset: var(--focus-offset-2);
  }

  /* Search (token-driven; replaces background/border tokens you aren't emitting) */
  .search {
    display: flex;
    align-items: center;
    gap: var(--spacing-2);

    border: var(--border-1) solid color-mix(
      in oklab,
      var(--on-surface) calc(var(--opacity-border) * 100%),
      transparent
    );

    /* Replaces --background-surface: use a subtle overlay so it works on any base */
    background: color-mix(
      in oklab,
      var(--on-surface) calc(var(--opacity-surface-overlay) * 100%),
      transparent
    );

    padding: var(--spacing-1) var(--spacing-2);
    border-radius: var(--radius-interactive);
  }

  .search:focus-within {
    outline: var(--focus-width) solid color-mix(
      in oklab,
      var(--on-surface) calc(var(--opacity-focus) * 100%),
      transparent
    );
    outline-offset: var(--focus-offset-2);
  }

  .search input {
    border: 0;
    outline: 0;
    background: transparent;

    color: var(--on-surface);
    font-size: var(--type-scale-sm);
    min-width: 12ch;
  }

  .search input::placeholder {
    color: var(--on-surface-muted);
  }

  /* Footer nav */
  .footer-nav {
    display: flex;
    gap: var(--spacing-4);
    font-size: var(--type-scale-xs);
    opacity: 0.92;
  }

  .footer-nav a {
    text-decoration: none;
    color: var(--on-surface);
  }

  .footer-nav a:focus-visible {
    outline: var(--focus-width) solid color-mix(
      in oklab,
      var(--on-surface) calc(var(--opacity-focus) * 100%),
      transparent
    );
    outline-offset: var(--focus-offset-2);
    border-radius: var(--radius-interactive);
  }
</style>










