<script lang="ts">
 
  import { Mail, Github, Linkedin, MessageCircle } from 'lucide-svelte';
  import { Button } from '@clothesline/ui';
  import { Card } from '@clothesline/ui';
  import { Alert } from '@clothesline/ui';

  let name = '';
  let email = '';
  let message = '';
  let hidden_field = '';
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
        body: JSON.stringify({ name, email, message, hidden_field })
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
    <Card padding="lg" shadow="md" rounded border className="space-y-6">
      <form on:submit={handleSubmit}>
        <div class="space-y-1.5">
          <label for="name" class="block text-sm font-medium">
            Name
          </label>
          <input
            id="name"
            type="text"
            bind:value={name}
            required
            class="block w-full rounded-lg border px-3 py-2 text-sm"
            placeholder="Your name"
          />
        </div>

        <div class="space-y-1.5">
          <label for="email" class="block text-sm font-medium">
            Email
          </label>
          <input
            id="email"
            type="email"
            bind:value={email}
            required
            class="block w-full rounded-lg border px-3 py-2 text-sm"
            placeholder="you@example.com"
          />
        </div>

        <div class="space-y-1.5">
          <label for="message" class="block text-sm font-medium">
            Message
          </label>
          <textarea
            id="message"
            rows="5"
            bind:value={message}
            required
            class="block w-full rounded-lg border px-3 py-2 text-sm"
            placeholder="Tell me a bit about what you’re working on."
          ></textarea>
        </div>

        <!-- Honeypot anti-spam field (hidden from users) -->
        <input type="text" bind:value={hidden_field} tabindex="-1" autocomplete="off" style="display:none" aria-hidden="true" />

        <div class="flex items-center gap-3">
          <Button type="submit" color="primary" variant="solid" size="md" disabled={submitting}>
            {submitting ? 'Sending…' : 'Send message'}
          </Button>
        </div>

        {#if success}
          <Alert id="success-alert" variant="success" title="Message sent">
            Thanks — your message has been sent.
          </Alert>
        {/if}
        {#if error}
          <Alert id="error-alert" variant="error" title="Error">
            {error}
          </Alert>
        {/if}
      </form>
    </Card>

    <!-- Side column: other ways to reach you -->
    <aside
      class="space-y-(--spacing-lg) rounded-xl bg-(--color-surface-50) p-(--spacing-lg) border border-(--border-width-default) shadow-xs font-(--type-body-family) text-(--type-body-size)"
    >
      <div>
          <h2 class="text-(--type-heading-size) font-(--type-heading-weight) uppercase tracking-(--type-heading-tracking)">
          Other ways to connect
        </h2>
          <p class="mt-2 text-(--color-surface-950)">
          Not a form person? You can also reach out via social or email me directly.
        </p>
          <div class="mt-4 flex flex-wrap gap-(--spacing-lg) text-(--anchor-color)">
          <a
            href="https://github.com/ClotheslineStudio"
            target="_blank"
            rel="noreferrer"
            class="inline-flex items-center gap-(--spacing-sm) text-(--type-body-size) hover:[text-decoration:var(--anchor-decoration-hover)]"
            aria-label="GitHub"
          >
            <Github style="width:24px; height:24px;" />
            <span>GitHub</span>
          </a>

          <a
            href="https://linkedin.com/in/yourusername"
            target="_blank"
            rel="noreferrer"
            class="inline-flex items-center gap-(--spacing-sm) text-(--type-body-size) hover:[text-decoration:var(--anchor-decoration-hover)]"
            aria-label="LinkedIn"
          >
            <Linkedin style="width:24px; height:24px;" />
            <span>LinkedIn</span>
          </a>

          <!-- Discord and email links removed as requested -->
        </div>
      </div>

      <div class="border-t border-(--color-border-subtle) pt-(--spacing-lg) text-(--type-body-size)">
          <p>
            I specialize in education-focused tools, design systems, and data-heavy products, but I’m
            always open to interesting collaborations, especially where thoughtful UX and strong
            foundations matter.
          </p>
      </div>
    </aside>
  </div>
</section>

