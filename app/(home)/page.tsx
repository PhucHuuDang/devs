import HomeBackgroundClient from "@/components/shader/home-background";

const options = ["ripple", "orange", "canvas", "fire", "prims", "lightning"];

const randomKey = options[Math.floor(Math.random() * options.length)];
export default function HomePage() {
  return (
    <>
      <div>
        <HomeBackgroundClient shader={randomKey} />

        {/* <HomeRadialBackground /> */}

        {/* <Navbar /> */}
      </div>
    </>
  );
}
