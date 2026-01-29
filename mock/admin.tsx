import { faker } from "@faker-js/faker";

import { RecentPost } from "@/components/admin/recent-posts-list";

// Admin Stats Mock Data
export interface AdminStats {
  totalPosts: number;
  totalUsers: number;
  totalViews: number;
  pendingReviews: number;
  previousTotalPosts: number;
  previousTotalUsers: number;
  previousTotalViews: number;
  previousPendingReviews: number;
}

export function generateMockAdminStats(): AdminStats {
  return {
    totalPosts: faker.number.int({ min: 100, max: 500 }),
    totalUsers: faker.number.int({ min: 1000, max: 5000 }),
    totalViews: faker.number.int({ min: 50000, max: 200000 }),
    pendingReviews: faker.number.int({ min: 5, max: 30 }),
    previousTotalPosts: faker.number.int({ min: 80, max: 400 }),
    previousTotalUsers: faker.number.int({ min: 800, max: 4500 }),
    previousTotalViews: faker.number.int({ min: 40000, max: 180000 }),
    previousPendingReviews: faker.number.int({ min: 3, max: 25 }),
  };
}

// Recent Posts Mock Data
export function generateMockRecentPosts(count: number = 5): RecentPost[] {
  const statuses: RecentPost["status"][] = [
    "draft",
    "pending",
    "published",
    "rejected",
  ];

  return Array.from({ length: count }, () => ({
    id: faker.string.uuid(),
    title: faker.lorem.sentence({ min: 4, max: 10 }),
    author: {
      name: faker.person.fullName(),
      image: faker.image.avatarGitHub(),
    },
    status: faker.helpers.arrayElement(statuses),
    createdAt: faker.date.recent({ days: 7 }),
    views: faker.number.int({ min: 0, max: 10000 }),
  }));
}

// Posts Table Mock Data
export interface PostTableItem {
  id: string;
  title: string;
  slug: string;
  author: {
    id: string;
    name: string;
    email: string;
    image?: string;
  };
  category: {
    id: string;
    name: string;
  };
  status: "draft" | "pending" | "published" | "rejected";
  views: number;
  createdAt: Date;
  updatedAt: Date;
}

const categories = [
  { id: "1", name: "Technology" },
  { id: "2", name: "Lifestyle" },
  { id: "3", name: "Travel" },
  { id: "4", name: "Food" },
  { id: "5", name: "Health" },
];

export function generateMockPostsTable(count: number = 50): PostTableItem[] {
  const statuses: PostTableItem["status"][] = [
    "draft",
    "pending",
    "published",
    "rejected",
  ];

  return Array.from({ length: count }, () => {
    const title = faker.lorem.sentence({ min: 4, max: 10 });
    const createdAt = faker.date.past({ years: 1 });

    return {
      id: faker.string.uuid(),
      title,
      slug: faker.helpers.slugify(title).toLowerCase(),
      author: {
        id: faker.string.uuid(),
        name: faker.person.fullName(),
        email: faker.internet.email(),
        image: faker.image.avatarGitHub(),
      },
      category: faker.helpers.arrayElement(categories),
      status: faker.helpers.arrayElement(statuses),
      views: faker.number.int({ min: 0, max: 50000 }),
      createdAt,
      updatedAt: faker.date.between({ from: createdAt, to: new Date() }),
    };
  });
}

// Users Table Mock Data
export interface UserTableItem {
  id: string;
  name: string;
  email: string;
  image?: string;
  role: "admin" | "author" | "user";
  status: "active" | "banned" | "pending";
  postsCount: number;
  joinedAt: Date;
  lastActiveAt: Date;
}

export function generateMockUsersTable(count: number = 50): UserTableItem[] {
  const roles: UserTableItem["role"][] = ["admin", "author", "user"];
  const statuses: UserTableItem["status"][] = ["active", "banned", "pending"];

  return Array.from({ length: count }, () => {
    const joinedAt = faker.date.past({ years: 2 });

    return {
      id: faker.string.uuid(),
      name: faker.person.fullName(),
      email: faker.internet.email(),
      image: faker.image.avatarGitHub(),
      role: faker.helpers.arrayElement(roles),
      status: faker.helpers.arrayElement(statuses),
      postsCount: faker.number.int({ min: 0, max: 100 }),
      joinedAt,
      lastActiveAt: faker.date.between({ from: joinedAt, to: new Date() }),
    };
  });
}

// Analytics Mock Data
export interface AnalyticsDataPoint {
  date: string;
  views: number;
  visitors: number;
  posts: number;
}

export function generateMockAnalytics(days: number = 30): AnalyticsDataPoint[] {
  const data: AnalyticsDataPoint[] = [];
  const today = new Date();

  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);

    data.push({
      date: date.toISOString().split("T")[0],
      views: faker.number.int({ min: 1000, max: 8000 }),
      visitors: faker.number.int({ min: 300, max: 2000 }),
      posts: faker.number.int({ min: 0, max: 10 }),
    });
  }

  return data;
}

export interface CategoryAnalytics {
  category: string;
  posts: number;
  views: number;
}

export function generateMockCategoryAnalytics(): CategoryAnalytics[] {
  return categories.map((cat) => ({
    category: cat.name,
    posts: faker.number.int({ min: 10, max: 100 }),
    views: faker.number.int({ min: 5000, max: 50000 }),
  }));
}
