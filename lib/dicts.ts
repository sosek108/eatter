export enum VariantEnum {
  HUBERT = 'hubi',
  MARTA = 'tusia',
}

export const translateVariant = (variant: VariantEnum | string) => {
  switch (variant) {
    case VariantEnum.HUBERT:
      return '🐴 Hubi';
    case VariantEnum.MARTA:
      return '🦄 Tusia';
  }
};
