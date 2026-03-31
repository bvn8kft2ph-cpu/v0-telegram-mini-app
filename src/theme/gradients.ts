// ═══════════════════════════════════════════════
// BRAND GRADIENTS - Product card backgrounds
// ═══════════════════════════════════════════════

export const brandGradients = {
  light: {
    "Dermalosophy": "linear-gradient(145deg, #D4A574 0%, #C9986A 40%, #B8845A 100%)", // warm gold → sand
    "ONmacabim": "linear-gradient(145deg, #A8A095 0%, #C4B8A8 50%, #E5DED5 100%)", // warm gray → beige
    "Hikari": "linear-gradient(145deg, #8BA888 0%, #A8C4A0 50%, #C5E0C0 100%)", // sage green → mint
  },
  dark: {
    "Dermalosophy": "linear-gradient(145deg, #8B6B48 0%, #7A5D3D 40%, #5C4530 100%)", // darkened gold
    "ONmacabim": "linear-gradient(145deg, #5A5550 0%, #6B6358 50%, #7A7268 100%)", // darkened gray
    "Hikari": "linear-gradient(145deg, #4A5E48 0%, #5A7358 50%, #6A8568 100%)", // darkened green
  },
};

export type BrandName = keyof typeof brandGradients.light;
