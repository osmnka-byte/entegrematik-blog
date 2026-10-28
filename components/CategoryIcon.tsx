import { BookOpen, ReceiptText, Rocket, Store, type LucideIcon } from 'lucide-react';
import type { CategoryIconName } from '@/types/blog';

/** Lucide ikonları tip güvenli harita üzerinden render edilir (dinamik import yok). */
const ICON_MAP: Record<CategoryIconName, LucideIcon> = {
  store: Store,
  receipt: ReceiptText,
  book: BookOpen,
  rocket: Rocket,
};

interface CategoryIconProps {
  name: CategoryIconName;
  className?: string;
}

export default function CategoryIcon({ name, className }: CategoryIconProps) {
  const Icon = ICON_MAP[name];
  return <Icon className={className} aria-hidden="true" />;
}