import { PortableText } from '@portabletext/react';
import ImageWithFallback from '@/components/ui/ImageWithFallback';

const components = {
  types: {
    image: ({ value }: any) => {
      if (!value?.asset?._ref) return null;
      return (
        <div className="relative my-10 aspect-[16/9] overflow-hidden rounded-sm">
          <ImageWithFallback
            src={value}
            alt={value.alt || 'Blog Image'}
            width={1200}
            className="w-full h-full object-cover"
          />
          {value.caption && (
            <p className="text-center text-sm text-z-charcoal/40 mt-3 italic">{value.caption}</p>
          )}
        </div>
      );
    },
  },
  block: {
    h2: ({ children }: any) => <h2 className="font-display text-3xl mt-12 mb-6 text-z-black">{children}</h2>,
    h3: ({ children }: any) => <h3 className="font-display text-2xl mt-8 mb-4 text-z-black">{children}</h3>,
    blockquote: ({ children }: any) => (
      <blockquote className="border-l-4 border-z-gold pl-6 italic text-z-emerald/80 my-8 text-xl">
        {children}
      </blockquote>
    ),
  },
};

export default function PortableTextRenderer({ value }: { value: any }) {
  return <PortableText value={value} components={components} />;
}
