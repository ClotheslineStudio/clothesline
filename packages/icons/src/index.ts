// AUTO-GENERATED. Do not edit by hand.
import AddPlus from './components/AddPlus.svelte';
import Checkmark from './components/Checkmark.svelte';
import Close from './components/Close.svelte';
import Copy from './components/Copy.svelte';
import Cut from './components/Cut.svelte';
import Download from './components/Download.svelte';
import Filter from './components/Filter.svelte';
import Info from './components/Info.svelte';
import Link from './components/Link.svelte';
import Minus from './components/Minus.svelte';
import Paste from './components/Paste.svelte';
import Pencil from './components/Pencil.svelte';
import Refresh from './components/Refresh.svelte';
import Save from './components/Save.svelte';
import Search from './components/Search.svelte';
import Sun from './components/Sun.svelte';
import Trash from './components/Trash.svelte';
import Upload from './components/Upload.svelte';

export { AddPlus, Checkmark, Close, Copy, Cut, Download, Filter, Info, Link, Minus, Paste, Pencil, Refresh, Save, Search, Sun, Trash, Upload };

export const iconRegistry = {
  "add-plus": AddPlus,
  "checkmark": Checkmark,
  "close": Close,
  "copy": Copy,
  "cut": Cut,
  "download": Download,
  "filter": Filter,
  "info": Info,
  "link": Link,
  "minus": Minus,
  "paste": Paste,
  "pencil": Pencil,
  "refresh": Refresh,
  "save": Save,
  "search": Search,
  "sun": Sun,
  "trash": Trash,
  "upload": Upload
} as const;

export type IconName = keyof typeof iconRegistry;
