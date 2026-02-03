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


<header style="position: sticky; top: 0; z-index: 50;">
  <nav
    style="
      border-bottom: var(--default-border-width, 1px) solid var(--color-primary-200, #e0e7ff);
      background: color-mix(in srgb, var(--color-bg, #fff) 80%, transparent);
      backdrop-filter: blur(8px);
      transition: box-shadow 0.3s;
      box-shadow: {isScrolled ? 'var(--elevation-1, 0px 1px 2px rgba(0,0,0,0.06))' : 'none'};
    "
  >
    <div style="display: flex; align-items: center; justify-content: space-between; padding-block: var(--spacing-3, 0.75rem);">
      <a
        href="/static/images/clotheslinestudio-logo.svg"
        style="
          display: inline-flex;
          align-items: center;
          gap: var(--spacing-2, 0.5rem);
          border-radius: var(--radius-base, 0.5rem);
          font-weight: var(--heading-font-weight, 800);
          letter-spacing: var(--heading-letter-spacing, -0.01em);
          color: var(--on-surface-muted, #52525b);
          transition: color 0.2s;
          outline: none;
        "
        on:mouseover={(e) => { e.currentTarget.style.color = 'var(--color-accent-500, #a21caf)'; }}
        on:mouseout={(e) => { e.currentTarget.style.color = 'var(--on-surface-muted, #52525b)'; }}
        on:focus={(e) => { e.currentTarget.style.color = 'var(--color-accent-500, #a21caf)'; }}
        on:blur={(e) => { e.currentTarget.style.color = 'var(--on-surface-muted, #52525b)'; }}
      >
        <span style="font-size: var(--type-lg-size, 1.125rem); font-weight: var(--heading-font-weight, 800);">Clothesline</span>
        <span style="font-size: var(--type-lg-size, 1.125rem); color: var(--color-accent-500, #a21caf); font-weight: var(--heading-font-weight, 800);">Studio</span>
      </a>

      <ul style="display: flex; align-items: center; gap: var(--spacing-5, 1.25rem); font-size: var(--base-font-size, 1rem); font-weight: var(--base-font-weight, 600);">
        {#each links as { href, label } (href)}
          <li>
            <a
              href={href}
              style="
                border-radius: var(--radius-base, 0.5rem);
                padding: var(--spacing-1, 0.125rem) var(--spacing-2, 0.5rem);
                color: var(--on-surface-muted, #52525b);
                transition: color 0.2s;
                outline: none;
              "
              on:mouseover={(e) => { e.currentTarget.style.color = 'var(--color-accent-500, #a21caf)'; }}
              on:mouseout={(e) => { e.currentTarget.style.color = 'var(--on-surface-muted, #52525b)'; }}
              on:focus={(e) => { e.currentTarget.style.color = 'var(--color-accent-500, #a21caf)'; }}
              on:blur={(e) => { e.currentTarget.style.color = 'var(--on-surface-muted, #52525b)'; }}
            >
              {label}
            </a>
          </li>
        {/each}
      </ul>

      <div style="display: flex; align-items: center; gap: var(--spacing-2, 0.5rem);">
        <form style="display: none;" on:submit|preventDefault={submitSearch}>
          <label style="position: relative; display: block;">
            <span class="sr-only">Search</span>
            <Search style="pointer-events: none; position: absolute; left: var(--spacing-3, 0.75rem); top: 50%; height: 1rem; width: 1rem; transform: translateY(-50%); color: var(--color-primary-500, #6366f1); opacity: 0.8;" />
            <input
              id="site-search"
              type="search"
              bind:value={searchQuery}
              placeholder="Search…"
              style="
                height: 2.25rem;
                width: 14rem;
                border-radius: var(--radius-xl, 0.75rem);
                border: var(--default-border-width, 1px) solid var(--color-primary-200, #e0e7ff);
                background: var(--background-elevation-2, var(--color-bg, #fff));
                padding: 0 var(--spacing-3, 0.75rem) 0 calc(var(--spacing-3, 0.75rem) + 1rem);
                font-size: var(--base-font-size, 1rem);
                color: var(--on-surface-muted, #52525b);
                box-shadow: var(--elevation-0, none);
                transition: border-color 0.2s;
                outline: none;
              "
            />
          </label>
        </form>

        <button
          type="button"
          on:click={toggleTheme}
          style="
            display: inline-flex;
            height: 2.25rem;
            align-items: center;
            gap: var(--spacing-2, 0.5rem);
            border-radius: var(--radius-xl, 0.75rem);
            border: var(--default-border-width, 1px) solid var(--color-primary-200, #e0e7ff);
            background: var(--background-elevation-2, var(--color-bg, #fff));
            padding: 0 var(--spacing-3, 0.75rem);
            font-size: var(--base-font-size, 1rem);
            font-weight: var(--base-font-weight, 600);
            color: var(--on-surface-muted, #52525b);
            box-shadow: var(--elevation-0, none);
            transition: border-color 0.2s, color 0.2s;
            outline: none;
          "
          aria-label="Toggle theme"
          on:mouseover={(e) => { e.currentTarget.style.borderColor = 'var(--color-accent-500, #a21caf)'; }}
          on:mouseout={(e) => { e.currentTarget.style.borderColor = 'var(--color-primary-200, #e0e7ff)'; }}
          on:focus={(e) => { e.currentTarget.style.borderColor = 'var(--color-accent-500, #a21caf)'; }}
          on:blur={(e) => { e.currentTarget.style.borderColor = 'var(--color-primary-200, #e0e7ff)'; }}
        >
          {#if isDark}
            <Sun style="height: 1rem; width: 1rem;" />
            <span style="display: none;">Light</span>
          {:else}
            <Moon style="height: 1rem; width: 1rem;" />
            <span style="display: none;">Dark</span>
          {/if}
        </button>

        <button
          type="button"
          style="
            display: inline-flex;
            height: 2.25rem;
            width: 2.25rem;
            align-items: center;
            justify-content: center;
            border-radius: var(--radius-xl, 0.75rem);
            border: var(--default-border-width, 1px) solid var(--color-primary-200, #e0e7ff);
            background: var(--background-elevation-2, var(--color-bg, #fff));
            box-shadow: var(--elevation-0, none);
            transition: border-color 0.2s;
            outline: none;
          "
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileOpen}
          on:click={() => (mobileOpen = !mobileOpen)}
          on:mouseover={(e) => { e.currentTarget.style.borderColor = 'var(--color-accent-500, #a21caf)'; }}
          on:mouseout={(e) => { e.currentTarget.style.borderColor = 'var(--color-primary-200, #e0e7ff)'; }}
          on:focus={(e) => { e.currentTarget.style.borderColor = 'var(--color-accent-500, #a21caf)'; }}
          on:blur={(e) => { e.currentTarget.style.borderColor = 'var(--color-primary-200, #e0e7ff)'; }}
        >
          {#if mobileOpen}
            <X style="height: 1.25rem; width: 1.25rem;" />
          {:else}
            <Menu style="height: 1.25rem; width: 1.25rem;" />
          {/if}
        </button>
      </div>
    </div>

    {#if mobileOpen}
      <div style="padding-bottom: var(--spacing-3, 0.75rem);">
        <form style="margin-bottom: var(--spacing-3, 0.75rem); display: none;" on:submit|preventDefault={submitSearch}>
          <label style="position: relative; display: block;">
            <span class="sr-only">Search</span>
            <Search style="pointer-events: none; position: absolute; left: var(--spacing-3, 0.75rem); top: 50%; height: 1rem; width: 1rem; transform: translateY(-50%); color: var(--color-primary-500, #6366f1); opacity: 0.8;" />
            <input
              type="search"
              bind:value={searchQuery}
              placeholder="Search…"
              style="
                height: 2.5rem;
                width: 100%;
                border-radius: var(--radius-xl, 0.75rem);
                border: var(--default-border-width, 1px) solid var(--color-primary-200, #e0e7ff);
                background: var(--background-elevation-2, var(--color-bg, #fff));
                padding: 0 var(--spacing-3, 0.75rem) 0 calc(var(--spacing-3, 0.75rem) + 1rem);
                font-size: var(--base-font-size, 1rem);
                color: var(--on-surface-muted, #52525b);
                box-shadow: var(--elevation-0, none);
                transition: border-color 0.2s;
                outline: none;
              "
            />
          </label>
        </form>

        <ul style="display: grid; gap: var(--spacing-1, 0.125rem);">
          {#each links as { href, label, icon } (href)}
            <li>
              <a
                href={href}
                on:click={() => (mobileOpen = false)}
                style="
                  display: flex;
                  align-items: center;
                  gap: var(--spacing-2, 0.5rem);
                  border-radius: var(--radius-xl, 0.75rem);
                  padding: var(--spacing-2, 0.5rem) var(--spacing-3, 0.75rem);
                  font-size: var(--base-font-size, 1rem);
                  font-weight: var(--base-font-weight, 600);
                  color: var(--on-surface-muted, #52525b);
                  background: transparent;
                  transition: background 0.2s, color 0.2s;
                  outline: none;
                "
                on:mouseover={(e) => { e.currentTarget.style.background = 'var(--color-primary-50, #f3f4f6)'; e.currentTarget.style.color = 'var(--color-accent-500, #a21caf)'; }}
                on:mouseout={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--on-surface-muted, #52525b)'; }}
                on:focus={(e) => { e.currentTarget.style.background = 'var(--color-primary-50, #f3f4f6)'; e.currentTarget.style.color = 'var(--color-accent-500, #a21caf)'; }}
                on:blur={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--on-surface-muted, #52525b)'; }}
              >
                <svelte:component this={icon} style="height: 1rem; width: 1rem; color: var(--color-primary-500, #6366f1); opacity: 0.8;" />
                {label}
              </a>
            </li>
          {/each}
        </ul>
      </div>
    {/if}
  </nav>
</header>

