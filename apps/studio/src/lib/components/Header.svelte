<script lang="ts">
  import { onMount } from 'svelte';
  import {
    Search,
    User,
    FolderKanban,
    BookText,
    Star,
    Mail,
    FileText,
    Home,
    Sun,
    Moon,
    Menu,
    X
  } from 'lucide-svelte';

  const links = [
    { href: '/', label: 'Home', icon: Home },
    { href: '/about', label: 'About', icon: User },
    { href: '/projects', label: 'Projects', icon: FolderKanban },
    { href: '/blog', label: 'Blog', icon: BookText },
    { href: '/docs', label: 'Docs', icon: FileText },
    { href: '/testimonials', label: 'Testimonials', icon: Star },
    { href: '/contact', label: 'Contact', icon: Mail }
  ];

  let isDark = false;
  let isScrolled = false;
  let mobileOpen = false;

  // simple local “search” UX: jump to /blog?q=... or /projects?q=...
  let searchQuery = '';
  function submitSearch() {
    const q = searchQuery.trim();
    if (!q) return;
    // choose where you want search to land
    window.location.href = `/blog?q=${encodeURIComponent(q)}`;
  }

  function toggleTheme() {
    isDark = !isDark;
    document.documentElement.classList.toggle('dark', isDark);
    try {
      localStorage.setItem('cl-studio-theme', isDark ? 'dark' : 'light');
    } catch {}
  }

  onMount(() => {
    // restore theme
    try {
      const saved = localStorage.getItem('cl-studio-theme');
      isDark = saved === 'dark';
      document.documentElement.classList.toggle('dark', isDark);
    } catch {}

    const onScroll = () => (isScrolled = window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') mobileOpen = false;
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        const el = document.getElementById('site-search') as HTMLInputElement | null;
        el?.focus();
      }
    };
    window.addEventListener('keydown', onKey);

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('keydown', onKey);
    };
  });
</script>

<header class="sticky top-0 z-50">
  <nav
    class="border-b border-(--color-plum)/20 bg-(--color-bg)/80 backdrop-blur supports-backdrop-filter:bg-(--color-bg)/70 transition-shadow duration-300"
    class:shadow-sm={isScrolled}
  >
    <!-- full-width bar; your +layout controls site width -->
    <div class="flex items-center justify-between py-3">
      <!-- Brand -->
      <a
        href="/static/images/clotheslinestudio-logo.svg"
        class="inline-flex items-center gap-2 rounded-lg font-extrabold tracking-tight text-(--color-surface-600) hover:text-(--color-accent-500) transition focus:outline-none focus:ring-2 focus:ring-(--color-accent-500) focus:ring-offset-2 focus:ring-offset-(--color-bg)"
      >
        <span class="text-lg sm:text-xl">Clothesline</span>
        <span class="text-lg sm:text-xl text-(--color-accent)">Studio</span>
      </a>

      <!-- Desktop links -->
      <ul class="hidden items-center gap-5 text-sm font-semibold md:flex">
        {#each links as { href, label } (href)}
          <li>
            <a
              href={href}
              class="rounded-md px-2 py-1 text-(--color-surface-500) hover:text-(--color-accent-500) transition focus:outline-none focus:ring-2 focus:ring-(--color-accent-500) focus:ring-offset-2 focus:ring-offset-(--color-bg)"
            >
              {label}
            </a>
          </li>
        {/each}
      </ul>

      <!-- Actions -->
      <div class="flex items-center gap-2">
        <!-- Search -->
        <form class="hidden sm:block" on:submit|preventDefault={submitSearch}>
          <label class="relative block">
            <span class="sr-only">Search</span>
            <Search class="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-(--color-indigo)/80" />
            <input
              id="site-search"
              type="search"
              bind:value={searchQuery}
              placeholder="Search…"
              class="h-9 w-56 rounded-xl border border-(--color-plum)/25 bg-(--color-bg) px-3 pl-9 text-sm text-(--color-surface-500) placeholder:text-(--color-surface-500)/40 shadow-sm transition focus:outline-none focus:ring-2 focus:ring-(--color-accent-500) focus:ring-offset-2 focus:ring-offset-(--color-bg)"
            />
          </label>
        </form>

        <!-- Theme -->
        <button
          type="button"
          on:click={toggleTheme}
          class="inline-flex h-9 items-center gap-2 rounded-xl border border-(--color-plum)/25 bg-(--color-bg) px-3 text-sm font-semibold text-(--color-surface-500) shadow-sm transition hover:border-(--color-accent-500)/60 focus:outline-none focus:ring-2 focus:ring-(--color-accent-500) focus:ring-offset-2 focus:ring-offset-(--color-bg)"
          aria-label="Toggle theme"
        >
          {#if isDark}
            <Sun class="h-4 w-4" />
            <span class="hidden sm:inline">Light</span>
          {:else}
            <Moon class="h-4 w-4" />
            <span class="hidden sm:inline">Dark</span>
          {/if}
        </button>

        <!-- Mobile menu button -->
        <button
          type="button"
          class="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-(--color-plum)/25 bg-(--color-bg) shadow-sm transition hover:border-(--color-accent-500)/60 focus:outline-none focus:ring-2 focus:ring-(--color-accent-500) focus:ring-offset-2 focus:ring-offset-(--color-bg) md:hidden"
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileOpen}
          on:click={() => (mobileOpen = !mobileOpen)}
        >
          {#if mobileOpen}
            <X class="h-5 w-5" />
          {:else}
            <Menu class="h-5 w-5" />
          {/if}
        </button>
      </div>
    </div>

    <!-- Mobile panel -->
    {#if mobileOpen}
      <div class="md:hidden pb-3">
        <form class="sm:hidden mb-3" on:submit|preventDefault={submitSearch}>
          <label class="relative block">
            <span class="sr-only">Search</span>
            <Search class="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-(--color-indigo)/80" />
            <input
              type="search"
              bind:value={searchQuery}
              placeholder="Search…"
              class="h-10 w-full rounded-xl border border-(--color-plum)/25 bg-(--color-bg) px-3 pl-9 text-sm text-(--color-surface-500) placeholder:text-(--color-surface-500)/40 shadow-sm transition focus:outline-none focus:ring-2 focus:ring-(--color-accent-500) focus:ring-offset-2 focus:ring-offset-(--color-bg)"
            />
          </label>
        </form>

        <ul class="grid gap-1">
          {#each links as { href, label, icon } (href)}
            <li>
              <a
                href={href}
                on:click={() => (mobileOpen = false)}
                class="flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-semibold text-(--color-surface-500)/85 hover:bg-(--color-plum)/10 hover:text-(--color-accent-500) transition"
              >
                <svelte:component this={icon} class="h-4 w-4 text-(--color-indigo)/80" />
                {label}
              </a>
            </li>
          {/each}
        </ul>
      </div>
    {/if}
  </nav>
</header>

