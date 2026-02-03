<script>
  import HeroSection from '$lib/components/HeroSection.svelte';
  import Timeline from '$lib/components/Timeline.svelte';
  import ImageGallery from '$lib/components/ImageGallery.svelte';
  import QuoteBlock from '$lib/components/QuoteBlock.svelte';
  import Skills from '$lib/components/home/Skills.svelte';
  import ProjectCards from '$lib/components/ProjectCards.svelte';
  // ...existing code for icons and skills if needed

  // Timeline events
  const events = [
    { year: '2008', title: 'BA in History, University of Montana', description: 'Research, analysis, and writing foundation.' },
    { year: '2014', title: 'AEM Corporation', description: 'Federal/state projects, design, and systems.' },
    { year: '2025', title: 'Founded Clothesline Studio', description: 'Started building design systems and creative tools.' },
    { year: '2025', title: 'Portfolio Launch', description: 'Showcasing studio work and personal journey.' }
  ];

  // Images for gallery
  const images = [
    { src: '/image/patent.png', alt: "Grandfather's Patent", caption: "My grandfather's original patent." },
    { src: '/image/parrot.jpg', alt: "Original Parrot", caption: "The original parrot that inspired creative work." }
    // Add more images as needed
  ];
</script>

<!-- Hero Section -->
<HeroSection
  title="From Patents to Parrots: The Clothesline Studio Story"
  subtitle="A creative journey from family invention to modern design systems."
  image="/profile.jpg"
/>

<!-- Timeline Section -->
<Timeline {events} />

<!-- Image Gallery Section -->
<ImageGallery {images} />

<!-- Quote Block -->
<QuoteBlock quote="Design is the art of making complexity simple, and simplicity powerful." author="Travis" />

<!-- Experience Cards -->
<ProjectCards />

<!-- Skills Section -->
<Skills />




  