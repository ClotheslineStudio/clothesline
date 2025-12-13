<script lang="ts">
  import { Mail, Github, Linkedin, MessageCircle } from 'lucide-svelte';

  let name = '';
  let email = '';
  let message = '';
  let submitting = false;
  let success = false;
  let error = '';

  const handleSubmit = async (e: Event) => {
    e.preventDefault();
    submitting = true;
    success = false;
    error = '';

    try {
      if (!name || !email || !message) {
        throw new Error('All fields are required.');
      }

      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, email, message })
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data?.error || 'Failed to send message.');
      }

      success = true;
      name = '';
      email = '';
      message = '';
    } catch (err) {
      error = err instanceof Error ? err.message : 'Something went wrong.';
    } finally {
      submitting = false;
    }
  };
</script>

<section class="py-6 sm:py-8 lg:py-10 text-(--color-text)">
  <header class="mb-8 max-w-3xl">
    <h1 class="text-4xl font-bold tracking-tight text-(--color-accent-500)">
      Get in touch
    </h1>
    <p class="mt-3 text-sm sm:text-base text-(--text-muted)">
      Whether you’re planning a new product, want help untangling education data work,
      or just want to talk shop about design systems and Svelte, I’d love to hear from you.
    </p>
  </header>

  <div class="grid gap-10 lg:grid-cols-[minmax(0,2fr)_minmax(0,1.3fr)] lg:items-start">
    <!-- Form -->
    <form
      on:submit={handleSubmit}
      class="space-y-6 rounded-2xl border border-(--color-border-subtle) bg-(--color-surface) p-6 shadow-sm"
    >
      <div class="space-y-1.5">
        <label for="name" class="block text-sm font-medium text-(--color-text)">
          Name
        </label>
        <input
          id="name"
          type="text"
          bind:value={name}
          required
          class="block w-full rounded-lg border border-(--color-border-subtle)
                 bg-(--field-bg,var(--color-surface-50))
                 px-3 py-2 text-sm text-(--color-text)
                 placeholder-(--color-text-muted) shadow-xs
                 focus:bg-(--field-bg-focus,var(--color-surface))
                 focus:outline-none focus:ring-2 focus:ring-(--color-accent)
                 focus:ring-offset-2 focus:ring-offset-(--color-bg)"
          placeholder="Your name"
        />
      </div>

      <div class="space-y-1.5">
        <label for="email" class="block text-sm font-medium text-(--color-text)">
          Email
        </label>
        <input
          id="email"
          type="email"
          bind:value={email}
          required
          class="block w-full rounded-lg border border-(--color-border-subtle)
                 bg-(--field-bg,var(--color-surface-50))
                 px-3 py-2 text-sm text-(--color-text)
                 placeholder-(--color-text-muted) shadow-xs
                 focus:bg-(--field-bg-focus,var(--color-surface))
                 focus:outline-none focus:ring-2 focus:ring-(--color-accent)
                 focus:ring-offset-2 focus:ring-offset-(--color-bg)"
          placeholder="you@example.com"
        />
      </div>

      <div class="space-y-1.5">
        <label for="message" class="block text-sm font-medium text-(--color-text)">
          Message
        </label>
        <textarea
          id="message"
          rows="5"
          bind:value={message}
          required
          class="block w-full rounded-lg border border-(--color-border-subtle)
                 bg-(--field-bg,var(--color-surface-50))
                 px-3 py-2 text-sm text-(--color-text)
                 placeholder-(--color-text-muted) shadow-xs
                 focus:bg-(--field-bg-focus,var(--color-surface))
                 focus:outline-none focus:ring-2 focus:ring-(--color-accent)
                 focus:ring-offset-2 focus:ring-offset-(--color-bg)"
          placeholder="Tell me a bit about what you’re working on."
        ></textarea>
      </div>

      <div class="flex items-center gap-3">
        <button
          type="submit"
          class="inline-flex items-center justify-center rounded-lg bg-(--color-accent)
                 px-4 py-2 text-sm font-semibold text-(--color-on-accent, #fff)
                 shadow-sm transition hover:shadow-md disabled:opacity-60"
          disabled={submitting}
        >
          {submitting ? 'Sending…' : 'Send message'}
        </button>

        {#if success}
          <p class="text-xs text-(--color-success-500)">
            Thanks — your message has been sent.
          </p>
        {/if}
        {#if error}
          <p class="text-xs text-(--color-error-500)">
            Error: {error}
          </p>
        {/if}
      </div>
    </form>

    <!-- Side column: other ways to reach you -->
    <aside
      class="space-y-6 rounded-2xl bg-(--color-surface-50,var(--color-surface)) p-6 border border-(--color-border-subtle) shadow-xs"
    >
      <div>
        <h2 class="text-sm font-semibold uppercase tracking-wide text-(--color-text-muted)">
          Other ways to connect
        </h2>
        <p class="mt-2 text-sm text-(--color-text-muted)">
          Not a form person? You can also reach out via social or email me directly.
        </p>
        <div class="mt-4 flex flex-wrap gap-4 text-(--color-accent)">
          <a
            href="https://github.com/ClotheslineStudio"
            target="_blank"
            rel="noreferrer"
            class="inline-flex items-center gap-2 text-sm hover:underline"
            aria-label="GitHub"
          >
            <Github class="h-5 w-5" />
            <span>GitHub</span>
          </a>

          <a
            href="https://linkedin.com/in/yourusername"
            target="_blank"
            rel="noreferrer"
            class="inline-flex items-center gap-2 text-sm hover:underline"
            aria-label="LinkedIn"
          >
            <Linkedin class="h-5 w-5" />
            <span>LinkedIn</span>
          </a>

          <a
            href="https://discordapp.com/users/yourdiscordid"
            target="_blank"
            rel="noreferrer"
            class="inline-flex items-center gap-2 text-sm hover:underline"
            aria-label="Discord"
          >
            <MessageCircle class="h-5 w-5" />
            <span>Discord</span>
          </a>

          <a
            href="mailto:you@example.com"
            class="inline-flex items-center gap-2 text-sm hover:underline"
            aria-label="Email"
          >
            <Mail class="h-5 w-5" />
            <span>Email</span>
          </a>
        </div>
      </div>

      <div class="border-t border-(--color-border-subtle) pt-4 text-sm text-(--color-text-muted)">
        <p>
          I specialize in education-focused tools, design systems, and data-heavy products, but I’m
          always open to interesting collaborations, especially where thoughtful UX and strong
          foundations matter.
        </p>
      </div>
    </aside>
  </div>
</section>

