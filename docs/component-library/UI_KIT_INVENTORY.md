# UI Kit Inventory

Generated: 2026-03-05T22:20:39.026Z

- Package: `@clothesline/ui`
- Component files detected: 74
- Publicly exported components (via `src/index.ts`): 56
- Components present but not publicly exported: 18

## Components

| Name | Category | Path | Export Name | Purpose | Props/Slots Summary | Status |
|---|---|---|---|---|---|---|
| Avatar | core | `components/core/Avatar/Avatar.svelte` | `Avatar` | Avatar component for core UI patterns. | props: src, alt, name, size, shape; slots: none detected | missing docs |
| Badge | core | `components/core/Badge/Badge.svelte` | `Badge` | Badge component for core UI patterns. | props: variant, size, appearance, pill, removable, label, onRemove; slots: default | missing docs |
| Button | core | `components/core/Button/Button.svelte` | `Button` | Button component for core UI patterns. | props: type, variant, size, color, disabled, loading, href, target, ...; slots: icon-left, default, icon-right | missing docs |
| Card | core | `components/core/Card/Card.svelte` | `Card` | Card component for core UI patterns. | props: asTag, tone, padding, shadow, rounded, border, className; slots: default | missing docs |
| Checkbox | core | `components/core/Checkbox/Checkbox.svelte` | `Checkbox` | Checkbox component for core UI patterns. | props: id, name, value, label, checked, disabled, group; slots: none detected | missing docs |
| Chip | core | `components/core/Chip/Chip.svelte` | `Chip` | Chip component for core UI patterns. | props: selected, disabled, tone, variant, size, removable, title, href, ...; slots: start, default | missing docs |
| Divider | core | `components/core/Divider/Divider.svelte` | `Divider` | Divider component for core UI patterns. | props: orientation, variant, thickness, space, label, align, color, decorative, ...; slots: default | missing docs |
| Icon | core | `components/core/Icon/Icon.svelte` | `Icon` | Icon component for core UI patterns. | props: name, src, size, color, ariaLabel, className, strokeWidth, viewBox; slots: none detected | missing docs |
| Radio | core | `components/core/Radio/Radio.svelte` | `Radio` | Radio component for core UI patterns. | props: id, name, value, label, checked, disabled, className, onChange; slots: none detected | missing docs |
| Switch | core | `components/core/Switch/Switch.svelte` | `Switch` | Switch component for core UI patterns. | props: checked, defaultChecked, name, id, disabled, readOnly, ariaLabel; slots: none detected | missing docs |
| TextField | core | `components/core/TextField/TextField.svelte` | `TextField, Input` | TextField component for core UI patterns. | props: value, placeholder, className; slots: none detected | missing docs |
| ToggleButton | core | `components/core/ToggleButton/ToggleButton.svelte` | `ToggleButton` | ToggleButton component for core UI patterns. | props: on, label, onChange; slots: none detected | missing docs |
| Chart | data | `components/data/Chart/Chart.svelte` | `not exported` | Chart component for data UI patterns. | props: type, className; slots: default | WIP |
| CodeBlock | data | `components/data/CodeBlock/CodeBlock.svelte` | `CodeBlock` | CodeBlock component for data UI patterns. | props: code, language, filename, copyable, showLineNumbers, wrap, className; slots: none detected | missing docs |
| DataList | data | `components/data/DataList/DataList.svelte` | `not exported` | DataList component for data UI patterns. | props: items, className; slots: none detected | WIP |
| Metric | data | `components/data/Metric/Metric.svelte` | `not exported` | Metric component for data UI patterns. | props: label, value, icon, trend, trendValue, className; slots: none detected | WIP |
| StatBlock | data | `components/data/StatBlock/StatBlock.svelte` | `not exported` | StatBlock component for data UI patterns. | props: label, value, icon, change, direction, className; slots: icon | WIP |
| Table | data | `components/data/Table/Table.svelte` | `Table` | Table component for data UI patterns. | props: className; slots: caption, head, body, foot | missing docs |
| Timeline | data | `components/data/Timeline/Timeline.svelte` | `Timeline` | Timeline component for data UI patterns. | props: orientation, ariaLabel, rail; slots: default | missing docs |
| TimelineCard | data | `components/data/Timeline/TimelineCard.svelte` | `TimelineCard` | TimelineCard component for data UI patterns. | props: variant, ariaLabel; slots: header, default, footer | missing docs |
| TimelineItem | data | `components/data/Timeline/TimelineItem.svelte` | `TimelineItem` | TimelineItem component for data UI patterns. | props: id, status, gap; slots: node, card | missing docs |
| TimelineNode | data | `components/data/Timeline/TimelineNode.svelte` | `TimelineNode` | TimelineNode component for data UI patterns. | props: size, color, icon, label; slots: default | missing docs |
| ComponentPreview | dev | `components/dev/ComponentPreview/ComponentPreview.svelte` | `ComponentPreview` | ComponentPreview component for dev UI patterns. | props: title, code, githubUrl, startTab; slots: default | missing docs |
| ModeToggle | dev | `components/dev/ModeToggle/ModeToggle.svelte` | `ModeToggle` | ModeToggle component for dev UI patterns. | props: size, rounded, title; slots: none detected | missing docs |
| ThemePicker | dev | `components/dev/ThemePicker/ThemePicker.svelte` | `ThemePicker` | ThemePicker component for dev UI patterns. | props: none detected; slots: none detected | missing docs |
| ThemeToggle | dev | `components/dev/ThemeToggle/ThemeToggle.svelte` | `ThemeToggle` | ThemeToggle component for dev UI patterns. | props: none detected; slots: none detected | missing docs |
| Alert | feedback | `components/feedback/Alert/Alert.svelte` | `Alert` | Alert component for feedback UI patterns. | props: variant, title, dismissible, id; slots: default | missing docs |
| Progress | feedback | `components/feedback/Progess/Progress.svelte` | `Progress` | Progress component for feedback UI patterns. | props: value, max, label; slots: none detected | missing docs |
| Skeleton | feedback | `components/feedback/Skeleton/Skeleton.svelte` | `Skeleton` | Skeleton component for feedback UI patterns. | props: width, height, radius, animated, className; slots: none detected | missing docs |
| Spinner | feedback | `components/feedback/Spinner/Spinner.svelte` | `Spinner` | Spinner component for feedback UI patterns. | props: size, label; slots: none detected | missing docs |
| ToastHost | feedback | `components/feedback/Toast/ToastHost.svelte` | `ToastHost` | ToastHost component for feedback UI patterns. | props: none detected; slots: none detected | missing docs |
| Tooltip | feedback | `components/feedback/Tooltip/Tooltip.svelte` | `Tooltip` | Tooltip component for feedback UI patterns. | props: text, position, className; slots: default | missing docs |
| ColorPicker | form | `components/form/ColorPicker/ColorPicker.svelte` | `ColorPicker` | ColorPicker component for form UI patterns. | props: label, value, embedded; slots: none detected | missing docs |
| DatePicker | form | `components/form/DatePicker/DatePicker.svelte` | `DatePicker` | DatePicker component for form UI patterns. | props: value, minDate, maxDate, locale, inline, disabled, readonly, weekStartsOn, ...; slots: none detected | missing docs |
| ErrorText | form | `components/form/ErrorText/ErrorText.svelte` | `ErrorText` | ErrorText component for form UI patterns. | props: id, className; slots: default | missing docs |
| Field | form | `components/form/Field/Field.svelte` | `Field` | Field component for form UI patterns. | props: label, hint, error, required, forId, className; slots: none detected | missing docs |
| Fieldset | form | `components/form/Fieldset/Fieldset.svelte` | `Fieldset` | Fieldset component for form UI patterns. | props: legend, description, disabled, className; slots: default | missing docs |
| FileUpload | form | `components/form/FileUpload/FileUpload.svelte` | `FileInput` | FileUpload component for form UI patterns. | props: none detected; slots: none detected | missing docs |
| HelpText | form | `components/form/HelpText/HelpText.svelte` | `HelpText` | HelpText component for form UI patterns. | props: id, className; slots: default | missing docs |
| Range | form | `components/form/Range/Range.svelte` | `Range` | Range component for form UI patterns. | props: value, min, max, step, label, help, suffix, showValue, ...; slots: none detected | missing docs |
| Select | form | `components/form/Select/Select.svelte` | `Select` | Select component for form UI patterns. | props: value, items, placeholder, size, disabled, invalid, id, name, ...; slots: none detected | missing docs |
| Slider | form | `components/form/Slider/Slider.svelte` | `Slider` | Slider component for form UI patterns. | props: value, values, min, max, step, minDistance, size, orientation, ...; slots: none detected | missing docs |
| Textarea | form | `components/form/Textarea/Textarea.svelte` | `Textarea` | Textarea component for form UI patterns. | props: id, name, value, placeholder, disabled, required, readonly, invalid, ...; slots: none detected | missing docs |
| AppShell | layout | `components/layout/shells/AppShell/AppShell.svelte` | `AppShell` | AppShell component for layout UI patterns. | props: className, sidebarWidth, stickyHeader, stickyFooter, collapsible, collapsed, collapseBreakpoint, contentMaxWidth, ...; slots: header, sidebar, content, footer | missing docs |
| Container | layout | `components/layout/Container/Container.svelte` | `Container` | Container component for layout UI patterns. | props: as, size, center, padded, className; slots: default | missing docs |
| Grid | layout | `components/layout/Grid/Grid.svelte` | `Grid` | Grid component for layout UI patterns. | props: cols, minItemWidth, gap, className; slots: default | missing docs |
| Header | layout | `components/layout/header/Header.svelte` | `HeaderAs, HeaderWidth` | Header component for layout UI patterns. | props: as, sticky, bordered, elevated, maxWidth, className; slots: left, center, right | stable |
| Stack | layout | `components/layout/Stack/Stack.svelte` | `Stack` | Stack component for layout UI patterns. | props: as, direction, gap, align, justify, wrap, className; slots: default | missing docs |
| AudioPlayer | media | `components/media/AudioPlayer/AudioPlayer.svelte` | `not exported` | AudioPlayer component for media UI patterns. | props: src, type, controls, autoplay, loop, muted, className; slots: none detected | WIP |
| DocumentViewer | media | `components/media/DocumentViewer/DocumentViewer.svelte` | `not exported` | DocumentViewer component for media UI patterns. | props: src, type, alt, downloadLabel, fallbackText; slots: none detected | WIP |
| EmbedFrame | media | `components/media/EmbedFrame/EmbedFrame.svelte` | `not exported` | EmbedFrame component for media UI patterns. | props: src, title, provider, aspectRatio, border; slots: none detected | WIP |
| FileUpload | media | `components/media/FileUpload/FileUpload.svelte` | `not exported` | FileUpload component for media UI patterns. | props: label, accept, multiple, onChange; slots: none detected | WIP |
| Gallery | media | `components/media/Gallery/Gallery.svelte` | `not exported` | Gallery component for media UI patterns. | props: images; slots: none detected | WIP |
| Image | media | `components/media/Image/Image.svelte` | `not exported` | Image component for media UI patterns. | props: src, alt, width, height, loading, objectFit, className; slots: none detected | WIP |
| ImageCropper | media | `components/media/ImageCropper/ImageCropper.svelte` | `not exported` | ImageCropper component for media UI patterns. | props: none detected; slots: none detected | WIP |
| Lightbox | media | `components/media/Lightbox/Lightbox.svelte` | `not exported` | Lightbox component for media UI patterns. | props: items, startIndex; slots: none detected | WIP |
| MediaPlayer | media | `components/media/MediaPlayer/MediaPlayer.svelte` | `not exported` | MediaPlayer component for media UI patterns. | props: src, type, poster; slots: none detected | WIP |
| MediaPreview | media | `components/media/MediaPreview/MediaPreview.svelte` | `not exported` | MediaPreview component for media UI patterns. | props: src, type, alt, label; slots: none detected | WIP |
| VideoPlayer | media | `components/media/VideoPlayer/VideoPlayer.svelte` | `not exported` | VideoPlayer component for media UI patterns. | props: src, type, controls, autoplay, loop, muted, poster, className; slots: none detected | WIP |
| ZoomImage | media | `components/media/ZoomImage/ZoomImage.svelte` | `not exported` | ZoomImage component for media UI patterns. | props: src, alt, zoomOnClick; slots: none detected | WIP |
| AppBar | navigation | `components/navigation/AppBar/AppBar.svelte` | `AppBar` | AppBar component for navigation UI patterns. | props: as, roleAttr, ariaLabel, sticky, elevated, border, glass, density, ...; slots: left, center, right, subbar | missing docs |
| Breadcrumbs | navigation | `components/navigation/Breadcrumbs/Breadcrumbs.svelte` | `Breadcrumbs` | Breadcrumbs component for navigation UI patterns. | props: items, className; slots: none detected | missing docs |
| Link | navigation | `components/navigation/Link/Link.svelte` | `Link` | Link component for navigation UI patterns. | props: href, external, className, underline, target, rel; slots: default | missing docs |
| MegaMenu | navigation | `components/navigation/MegaMenu/MegaMenu.svelte` | `not exported` | MegaMenu component for navigation UI patterns. | props: label, open, onToggle; slots: default | WIP |
| Pagination | navigation | `components/navigation/Pagination/Pagination.svelte` | `Pagination` | Pagination component for navigation UI patterns. | props: currentPage, totalPages, onPageChange; slots: none detected | missing docs |
| Stepper | navigation | `components/navigation/Stepper/Stepper.svelte` | `not exported` | Stepper component for navigation UI patterns. | props: steps, currentStep, onStepClick; slots: none detected | WIP |
| TableOfContents | navigation | `components/navigation/TableOfContents/TableOfContents.svelte` | `TableOfContents` | TableOfContents component for navigation UI patterns. | props: selector, levels, scrollContainer, className; slots: none detected | missing docs |
| Tabs | navigation | `components/navigation/Tabs/Tabs.svelte` | `Tabs` | Tabs component for navigation UI patterns. | props: tabs, activeTab, onChange; slots: none detected | missing docs |
| Dialog | overlay | `components/overlay/Dialog/Dialog.svelte` | `Dialog` | Dialog component for overlay UI patterns. | props: open, closeOnBackdrop, closeOnEscape, labelledBy, describedBy, className; slots: default | missing docs |
| Popover | overlay | `components/overlay/Popover/Popover.svelte` | `Popover` | Popover component for overlay UI patterns. | props: open, defaultOpen, align, placement, offset, role, ariaLabel, closeOnInteractOutside, ...; slots: trigger, default | missing docs |
| Heading | typography | `components/typography/Heading/Heading.svelte` | `Heading` | Heading component for typography UI patterns. | props: level, tone, align, weight, underline, className; slots: default | missing docs |
| Label | typography | `components/typography/Label/Label.svelte` | `Label` | Label component for typography UI patterns. | props: forId, visuallyHidden, required, className, htmlFor, optional, tone; slots: default | missing docs |
| Paragraph | typography | `components/typography/Paragraph/Paragraph.svelte` | `Paragraph` | Paragraph component for typography UI patterns. | props: tone, align, weight, lead, italic, underline, truncate, clamp, ...; slots: default | missing docs |
| Text | typography | `components/typography/Text/Text.svelte` | `Text` | Text component for typography UI patterns. | props: variant, as, ariaLevel, tone, align, transform, italic, underline, ...; slots: default | missing docs |

## Utilities, Stores, and Types

| Path | Kind | Publicly Exported |
|---|---|---|
| `components/core/Icon/registry.ts` | utility/type | no |
| `components/feedback/Toast/toast.store.ts` | store | yes |
| `components/form/ColorPicker/color.ts` | utility/type | no |
| `components/form/DatePicker/date-utils.ts` | utility/type | no |
| `components/form/DatePicker/types.ts` | utility/type | no |
| `components/layout/header/Header.test.ts` | utility/type | no |
| `types/lucide-svelte.d.ts` | type | no |

## Notes

- Status criteria: `stable` = exported and has local README/test, `missing docs` = exported without local README/test, `WIP` = component file exists but is not exported from public root index.
- Props/slots are best-effort regex extraction from component source and may miss advanced patterns.
