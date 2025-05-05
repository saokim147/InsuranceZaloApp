interface ListRendererProps<T> {
  title?: string;
  limits?: number[];
  items: T[];
  onclick?: (item: T) => void;
}

export function ListRenderer<T>({
  title,
  limits,
  items,
  onclick,
}: ListRendererProps<T>) {}
