import { faker } from "@faker-js/faker";

export interface FakeUser {
  id: string;
  name: string;
  email: string;
  image: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export function createFakeUser(overrides: Partial<FakeUser> = {}): FakeUser {
  return {
    id: faker.string.uuid(),
    name: faker.person.fullName(),
    email: faker.internet.email(),
    image: faker.image.avatar(),
    createdAt: faker.date.past(),
    updatedAt: faker.date.recent(),
    ...overrides,
  };
}
