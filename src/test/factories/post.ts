import { faker } from "@faker-js/faker";

import type { PostCardData } from "@/components/profile/post-card";

export function createFakePost(
  overrides: Partial<PostCardData> = {},
): PostCardData {
  const statuses: PostCardData["status"][] = [
    "draft",
    "pending",
    "published",
    "rejected",
  ];

  return {
    id: faker.string.uuid(),
    title: faker.lorem.sentence({ min: 3, max: 8 }),
    slug: faker.helpers.slugify(faker.lorem.words(3)).toLowerCase(),
    description: faker.lorem.paragraph(),
    mainImage: faker.image.urlPicsumPhotos(),
    status: faker.helpers.arrayElement(statuses),
    views: faker.number.int({ min: 0, max: 10000 }),
    createdAt: faker.date.past(),
    updatedAt: faker.date.recent(),
    category: {
      id: faker.string.uuid(),
      name: faker.lorem.word(),
    },
    ...overrides,
  };
}
