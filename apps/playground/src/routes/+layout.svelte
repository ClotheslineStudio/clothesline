<!-- +layout.svelte -->
<script lang="ts">
  import '../app.css';
  import { setTheme } from '@clothesline/themes';
  import { browser } from '$app/environment';

  import Header from '$lib/components/layout/Header/Header.svelte';
  import Footer from '$lib/components/layout/Footer/Footer.svelte';
  import MainLayout from '$lib/components/layout/MainLayout/MainLayout.svelte';
  import Sidebar from '$lib/components/layout/Sidebar.svelte';
  import ThreeColumn from '$lib/components/layout/ThreeColumn/ThreeColumn.svelte';
  import TableOfContents from '$lib/components/navigation/TableOfContents/TableOfContents.svelte';

  import '@clothesline/themes/dist/clothesline.css';
	import Dropdown from '$lib/components/overlays/Dropdown/Dropdown.svelte';

  const routes = [
    { title: 'Button', path: '/core/button' },
    { title: 'Card', path: '/core/card' },
    { title: 'Divider', path: '/core/divider' },
    { title: 'Icon', path: '/core/icon' },
    { title: 'Label', path: '/core/label' },
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
    { title: 'ZoomImage', path: '/media/zoomimage' },
    { title: 'TopBar', path: '/layout/topbar' },
    { title: 'ThreeColumn', path: '/layout/threecolumn' },
    { title: 'MainLayout', path: '/layout/mainlayout' },
    { title: 'Sidebar', path: '/layout/sidebar' },
    { title: 'Header', path: '/layout/header' },
    { title: 'Footer', path: '/layout/footer' },
    { title: 'Dropdown', path: '/overlays/dropdown' },
    { title: 'Popover', path: '/overlays/popover' },
    { title: 'ToggleButton', path: '/core/toggle' }
  ];
</script>

<MainLayout>
  <!-- Header -->
  <div slot="header">
    <Header>
      <div slot="left">
        <img src="/Clothesline-Logo.svg" alt="Logo" style="height: 2rem;" />
        <span class="font-bold">Clothesline UI</span>
      </div>

      <div slot="center">
        <nav class="hidden md:flex gap-4 text-sm hover:bg-[var(--color-surface-200)] text-[var(--base-font-color)] transition-colors">
          <a href="/docs">Docs</a>
          <a href="/components">Components</a>
          <a href="/apps">Apps</a>
        </nav>
      </div>

      <div slot="right">
        <input type="search" placeholder="Search…" class="rounded border px-2 py-1 text-sm" />
        <button>🌞</button>
        <a href="https://github.com" target="_blank">GitHub</a>
      </div>
    </Header>
  </div>

  <!-- Sidebar -->
  <div slot="sidebar">
    <Sidebar {routes} />
  </div>

  <!-- Content area with ThreeColumn layout -->
  <div slot="content">
    <ThreeColumn
      maxWidth={920}
      tocWidth={280}
      stickyTop={16}
    >
      <!-- Main page content -->
      <div slot="main">
        <slot />
      </div>

      <!-- TOC column -->
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
        <nav class="flex gap-4 text-xs text-muted-foreground">
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
</MainLayout>





