export function generateSlug(title: string) {
  // 1. Convert to lowercase
  let slug = title.toLowerCase();

  // 2. Replace non-alphanumeric characters (except spaces and hyphens) with nothing
  slug = slug.replace(/[^a-z0-9\s-]/g, "");

  // 3. Replace multiple spaces with a single hyphen
  slug = slug.replace(/\s+/g, "-");

  // 4. Replace multiple hyphens with a single hyphen
  slug = slug.replace(/-+/g, "-");

  // 5. Trim leading/trailing hyphens
  slug = slug.replace(/^-+|-+$/g, "");

  return slug;
}
