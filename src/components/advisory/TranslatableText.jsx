import React from 'react';

/**
 * Reusable TranslatableText component
 * Accepts a primary `text` string and a `tamilPlaceholder` prop.
 * When lang === 'ta', it prioritizes the tamilPlaceholder string.
 * When showDual is active, it renders the English text along with the Tamil placeholder.
 */
export default function TranslatableText({
  text = '',
  tamilPlaceholder = '',
  lang = 'en',
  showDual = false,
  className = '',
  as: Component = 'span',
  ...rest
}) {
  const isTamil = lang === 'ta';
  const displayText = isTamil ? (tamilPlaceholder || text) : text;

  return (
    <Component 
      className={className} 
      data-tamil-placeholder={tamilPlaceholder}
      {...rest}
    >
      {displayText}
      {showDual && !isTamil && tamilPlaceholder && (
        <span className="block text-[11px] font-normal text-slate-500/90 mt-0.5 font-tamil leading-relaxed">
          {tamilPlaceholder}
        </span>
      )}
    </Component>
  );
}
