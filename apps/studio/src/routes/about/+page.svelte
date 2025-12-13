<script>
  import { onMount } from 'svelte';
  import { gsap } from 'gsap';
  import { ScrollTrigger } from 'gsap/ScrollTrigger';
  import {
    Code2,
    Book,
    Settings,
    Printer,
    Users,
    Palette,
    Cpu,
    Workflow,
    Bot
  } from 'lucide-svelte';

  gsap.registerPlugin(ScrollTrigger);

  onMount(() => {
    gsap.utils.toArray('.card').forEach((card) => {
      gsap.from(card, {
        scrollTrigger: {
          trigger: card,
          start: 'top 80%',
          toggleActions: 'play none none none'
        },
        opacity: 0,
        y: 40,
        duration: 0.6,
        ease: 'power2.out'
      });
    });

    gsap.utils.toArray('.skill-icon').forEach((icon, i) => {
      gsap.from(icon, {
        scrollTrigger: {
          trigger: icon,
          start: 'top 90%',
          toggleActions: 'play none none none'
        },
        opacity: 0,
        scale: 0.8,
        duration: 0.4,
        delay: i * 0.05,
        ease: 'back.out(1.7)'
      });
    });
  });

  const skills = [
    { icon: Code2, label: 'Svelte / Web' },
    { icon: Palette, label: 'Figma & UI Design' },
    { icon: Settings, label: 'Accessibility (508 / WCAG)' },
    { icon: Book, label: 'Research & Writing' },
    { icon: Cpu, label: 'Data & Dashboards' },
    { icon: Bot, label: 'AI & Power Platform' },
    { icon: Workflow, label: 'Process Design' },
    { icon: Printer, label: '3D Printing & Prototyping' },
    { icon: Users, label: 'Collaboration & Workshops' }
  ];
</script>

<section class="py-16 px-4 text-(--color-text)">
  <div class="max-w-7xl mx-auto grid lg:grid-cols-3 gap-10">
    <!-- 📸 Profile / Studio Image -->
    <div class="flex justify-center items-start">
      <div
        class="rounded-3xl overflow-hidden shadow-xl w-64 h-64 bg-(--color-plum) text-center flex items-center justify-center text-(--color-slateblue) text-sm"
      >
        [ Photo of Travis or Ripley here ]
      </div>
    </div>

    <!-- 🧠 Intro & Background -->
    <div class="lg:col-span-2 space-y-6 text-lg leading-relaxed">
      <h1 class="text-4xl font-bold text-(--color-accent-500)">Hi, I am Travis</h1>
      <p>
        I am a designer and systems minded builder based in Montana. I like taking messy workflows
        full of spreadsheets, PDFs, and scattered files and turning them into clearer tools,
        websites, and processes.
      </p>
      <p>
        I earned a BA in History from the University of Montana, where I learned how to research,
        analyze information, and write clearly. That background shows up in how I plan and document
        projects today, from toolkits and sites to training content.
      </p>
      <p>
        For about 10 years I worked at AEM Corporation, supporting U.S. Department of Education
        projects and state teams on efforts like Race to the Top - District, CIID, CEDS, ERIC,
        NCEO, Generate, and GRADS360 or Communities360. A lot of that work was about taking complex
        guidance and turning it into something more practical: websites, docs, dashboards, trainings,
        and simple tools people could actually use.
      </p>
      <p>
        Now I am building out <strong>Clothesline Studio</strong> and getting my own projects into a
        place where they are usable, documented, and ready to support future client work.
      </p>
    </div>
  </div>

  <!-- 🧩 Experience Cards -->
  <div class="max-w-5xl mx-auto mt-16 grid sm:grid-cols-2 gap-8">
    <div class="card p-6 bg-(--color-bg) border border-(--color-plum) rounded-xl shadow transition">
      <h2 class="text-xl font-semibold text-(--color-accent-500) mb-2">Federal and state background</h2>
      <ul class="list-disc list-inside space-y-1 text-sm text-(--color-slateblue)">
        <li><strong>Race to the Top - District:</strong> TA support, tools, and meeting tech</li>
        <li><strong>CIID:</strong> Special education data integration and toolkits</li>
        <li><strong>CEDS:</strong> Data standards, alignment, and documentation</li>
        <li><strong>ERIC and NCEO:</strong> Accessible frontends and resource hubs</li>
        <li><strong>Generate and GRADS360:</strong> Portals, docs, and training content</li>
      </ul>
    </div>

    <div class="card p-6 bg-(--color-bg) border border-(--color-indigo) rounded-xl shadow transition">
      <h2 class="text-xl font-semibold text-(--color-accent-500) mb-2">Clothesline Studio projects</h2>
      <ul class="list-disc list-inside space-y-1 text-sm text-(--color-slateblue)">
        <li>
          Building <strong>Clothesline UI</strong>, a Svelte based design system with color tokens,
          themes, UI components, and icons.
        </li>
        <li>
          Designing <strong>Gravity Planner</strong> to help teams work with frameworks,
          requirements, and real projects in one place.
        </li>
        <li>
          Experimenting with 3D printed parts, dashboards, and low code style tools for future
          client and personal projects.
        </li>
      </ul>
      <p class="mt-3 text-sm text-(--color-slateblue)">
        These are ongoing, unreleased projects that are still in active development. They are open
        on GitHub, but not polished products yet. When I am not building, I am usually out with
        Ripley, filming, flying the drone, or stress testing new gear.
      </p>
    </div>
  </div>

  <!-- 🚀 Skills Section -->
  <div class="max-w-5xl mx-auto mt-20">
    <h2 class="text-2xl font-semibold text-(--color-accent-500) mb-6">🔧 Studio skills</h2>
    <p class="text-sm text-(--color-slateblue) mb-4">
      Clothesline Studio sits where design, content, and light development meet. These are the
      skills that show up most in my work so far.
    </p>
    <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6 text-center">
      {#each skills as skill}
        <div
          class="skill-icon flex flex-col items-center justify-center p-4 bg-(--color-bg) rounded-lg shadow border border-(--color-slateblue) hover:scale-105 transition"
        >
          <svelte:component this={skill.icon} size="32" class="text-(--color-accent-500) mb-2" />
          <span class="text-sm text-(--color-slateblue)">{skill.label}</span>
        </div>
      {/each}
    </div>
  </div>
</section>




  