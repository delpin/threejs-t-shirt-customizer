import { swatch, fileIcon, ai, logoShirt, stylishShirt } from "../assets";

export const EditorTabs = [
  {
    name: "colorpicker",
    icon: swatch,
  },
  {
    name: "filepicker",
    icon: fileIcon,
  },
  {
    name: "aipicker",
    icon: ai,
  },
];

export const FilterTabs = [
  {
    name: "logoShirt" as 'logoShirt' | 'stylishShirt',
    icon: logoShirt,
  },
  {
    name: "stylishShirt" as 'logoShirt' | 'stylishShirt',
    icon: stylishShirt,
  },
];

export const DecalTypes = {
  logo: {
    stateProperty: "logoDecal",
    filterTab: "logoShirt" as 'logoShirt' | 'stylishShirt',
  },
  full: {
    stateProperty: "fullDecal",
    filterTab: "stylishShirt" as 'logoShirt' | 'stylishShirt',
  },
};
