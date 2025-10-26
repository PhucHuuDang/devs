"use client";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Badge } from "../ui/badge";
import { CategoryItem } from "../item/category-item";
import { Home } from "lucide-react";
import { listCategory } from "@/app/db/list-category";

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
        {listCategory.map((category, index) => (
          <CarouselItem key={index} className="md:basis-1/5 lg:basis-1/8 p-2">
            {/* <CategoryItem title={`Category ${index + 1}`} icon={Home} /> */}

            <CategoryItem title={category.title} icon={category.icon} />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
