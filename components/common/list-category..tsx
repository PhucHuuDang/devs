"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  ListCategory as TListCategory,
  listCategory,
} from "@/db/list-category";

import { CategoryItem } from "../item/category-item";

export function ListCategory() {
  return (
    <Carousel
      opts={{
        align: "start",
        loop: true,
      }}
      className="w-full"
    >
      <CarouselContent>
        {listCategory.map((category: TListCategory, index: number) => (
          <CarouselItem
            key={index}
            className="basis-1/2 sm:basis-1/3 md:basis-1/5 lg:basis-1/7 xl:basis-1/10 2xl:basis-1/10 3xl:basis-1/12 p-2"
          >
            <CategoryItem title={category.title} icon={category.icon} />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
