/**
 * components/common/ImagePlaceholder.jsx
 *
 * A labeled placeholder for photography that doesn't exist yet.
 * `label` should describe exactly what photo belongs in that spot,
 * so replacing it later is a find-and-swap job, not a guessing game.
 *
 * To replace with a real photo, swap the whole element for:
 *   <img src={yourImage} alt="..." className="w-full h-full object-cover" />
 * inside the same aspect-ratio wrapper.
 */
const ImagePlaceholder = ({
  label,
  aspect = "aspect-[4/5]",
  className = "",
}) => {
  return (
    <div
      className={`
        relative
        ${aspect}
        rounded-2xl
        overflow-hidden
        bg-gradient-to-br
        from-[#4A294B]
        via-[#5F2147]
        to-[#8A6C3A]
        border
        border-[#C7A05A]/30
        flex
        items-center
        justify-center
        ${className}
      `}
    >
      {/* Faint corner flourish, echoes the hairline motif used
          throughout the site */}
      <div className="absolute top-5 left-5 w-8 h-[2px] bg-[#C7A05A]/40" />
      <div className="absolute bottom-5 right-5 w-8 h-[2px] bg-[#C7A05A]/40" />

      <div className="text-center px-6">
        <p className="font-[Cinzel] text-white/80 text-sm tracking-wide leading-relaxed">
          {label}
        </p>
        <p className="mt-3 text-white/40 text-[10px] uppercase tracking-[0.25em]">
          Replace this image
        </p>
      </div>
    </div>
  );
};

export default ImagePlaceholder;