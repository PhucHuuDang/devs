import { faker } from "@faker-js/faker";

import { PostCardData } from "@/components/profile/post-card";

/**
 * Generate mock posts for the user profile.
 * In a real application, this data would come from an API or GraphQL query.
 *
 * @param count The number of posts to generate.
 * @returns An array of PostCardData objects.
 */
export function generateMockUserPosts(count: number): PostCardData[] {
  const statuses: PostCardData["status"][] = [
    "draft",
    "pending",
    "published",
    "rejected",
  ];
  const categories = [
    { id: "1", name: "Technology" },
    { id: "2", name: "Lifestyle" },
    { id: "3", name: "Food" },
    { id: "4", name: "Travel" },
  ];

  return Array.from({ length: count }, () => {
    const createdAt = faker.date.past({ years: 1 });

    return {
      id: faker.string.uuid(),
      title: faker.lorem.sentence({ min: 4, max: 10 }),
      slug: faker.helpers.slugify(faker.lorem.words(4)).toLowerCase(),
      description: faker.lorem.paragraph(),
      mainImage: faker.image.urlPicsumPhotos({ width: 800, height: 450 }),
      status: faker.helpers.arrayElement(statuses),
      views: faker.number.int({ min: 0, max: 10000 }),
      createdAt,
      updatedAt: faker.date.between({ from: createdAt, to: new Date() }),
      category: faker.helpers.arrayElement(categories),
    };
  });
}
