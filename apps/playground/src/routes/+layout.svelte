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
  <div slot="header">
    <AppBar sticky border elevated>
      <div slot="left" class="brand">
        <button class="icon-btn" on:click={toggleSidebar} aria-label="Toggle sidebar">
          <Menu size={18} />
        </button>

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
  .brand { display: flex; align-items: center; gap: var(--spacing-2); }
  .brand-link {
    display: flex; align-items: center; gap: var(--spacing-2);
    color: var(--on-surface-strong);
    text-decoration: none;
  }
  .brand-logo { height: var(--size-control-md); }
  .brand-name { font-weight: 700; }

  /* Center nav */
  .main-nav { display: flex; gap: var(--spacing-4); font-size: 0.9rem; }
  .main-nav a {
    text-decoration: none;
    color: var(--on-surface);
    opacity: 0.92;
    padding: var(--spacing-1) var(--spacing-2);
    border-radius: var(--radius-interactive);
    transition: background var(--motion-duration-fast) var(--motion-ease),
                opacity var(--motion-duration-fast) var(--motion-ease);
  }
  .main-nav a:hover {
    opacity: 1;
    background: color-mix(in oklab, var(--on-surface) 10%, transparent);
  }

  /* Right actions */
  .actions { display: flex; align-items: center; gap: var(--spacing-2); }

  .icon-btn,
  .icon-link {
    display: inline-flex; align-items: center; justify-content: center;
    width: var(--size-control-md);
    height: var(--size-control-md);
    border-radius: var(--radius-interactive);
    color: var(--on-surface);
    opacity: 0.95;
    transition: background var(--motion-duration-fast) var(--motion-ease),
                opacity var(--motion-duration-fast) var(--motion-ease);
  }
  .icon-btn:hover,
  .icon-link:hover {
    opacity: 1;
    background: color-mix(in oklab, var(--background-scrim) 12%, transparent);
  }

  /* Search (token driven; no mode-specific overrides) */
  .search {
    display: flex; align-items: center; gap: var(--spacing-2);
    border: var(--border-1) solid var(--border-color-default);
    background: var(--background-surface);
    padding: var(--spacing-1) var(--spacing-2);
    border-radius: var(--radius-interactive);
  }
  .search input {
    border: 0; outline: 0; background: transparent;
    color: var(--on-surface);
    font-size: 0.9rem;
    min-width: 12ch;
  }
  .search input::placeholder { color: var(--on-surface-muted); }

  /* Footer nav */
  .footer-nav { display: flex; gap: var(--spacing-4); font-size: 0.8rem; opacity: 0.92; }
  .footer-nav a { text-decoration: none; color: var(--on-surface); }
</style>









