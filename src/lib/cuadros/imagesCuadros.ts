export const images: Record<string, {
    default: any;
}> = import.meta.glob('./**/*.{jpg,jpeg,png,webp,gif,avif,svg}', {
    eager: true,
    query: {
        enhanced: true
    }
});

console.log(images);