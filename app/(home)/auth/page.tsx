import { getAuthCookies } from "@/app/utils/cookies";
import { redirect } from "next/navigation";
import {
  SignInPage as SignInPageComponent,
  Testimonial,
} from "@/components/ui/sign-in";

const sampleTestimonials: Testimonial[] = [
  {
    avatarSrc: "https://randomuser.me/api/portraits/women/57.jpg",
    name: "Sarah Chen",
    handle: "@sarahdigital",
    text: "Amazing platform! The user experience is seamless and the features are exactly what I needed.",
  },
  {
    avatarSrc: "https://randomuser.me/api/portraits/men/64.jpg",
    name: "Marcus Johnson",
    handle: "@marcustech",
    text: "This service has transformed how I work. Clean design, powerful features, and excellent support.",
  },
  {
    avatarSrc: "https://randomuser.me/api/portraits/men/32.jpg",
    name: "David Martinez",
    handle: "@davidcreates",
    text: "I've tried many platforms, but this one stands out. Intuitive, reliable, and genuinely helpful for productivity.",
  },
];

const SignInPage = async () => {
  const cookies = await getAuthCookies();

  // console.log({ cookies });

  if (!cookies.accessToken || !cookies.sessionToken || !cookies.refreshToken) {
    redirect("/blogs");
  }

  return (
    <div className="bg-background text-foreground">
      <SignInPageComponent
        heroImageSrc="https://images.unsplash.com/photo-1642615835477-d303d7dc9ee9?w=2160&q=80"
        testimonials={sampleTestimonials}
      />
    </div>
  );
};

export default SignInPage;
