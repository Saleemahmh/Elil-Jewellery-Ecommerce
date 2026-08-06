/**
 * A quiet "chapter mark" for the seam between a dark (plum) section and
 * a light (cream) one — a thin gold hairline with a small diamond at
 * center, echoing the w-16 h-[2px] hairline already used under headings
 * throughout the site.
 *
 * Usage: place at the very bottom of a section, on top of its own
 * background. The parent <section> needs `relative` for this to
 * position correctly.
 *
 *   <section className="relative bg-[#4A294B] ...">
 *     ...
 *     <SectionDivider />
 *   </section>
 */
const SectionDivider = () => {
  return (
    <div className="absolute bottom-0 inset-x-0 h-px pointer-events-none">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#C7A05A]/70 to-transparent" />
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[9px] h-[9px] rotate-45 bg-[#C7A05A]" />
    </div>
  );
};

export default SectionDivider;