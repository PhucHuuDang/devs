import { SimpleLoading } from "@/components/_loading/simple-loading";
// import { PlateEditor } from "@/components/editor/plate-editor";
import dynamic from "next/dynamic";

const PlateEditor = dynamic(
  () =>
    import("@/components/editor/plate-editor").then((mod) => mod.PlateEditor),
  {
    loading(loadingProps) {
      return <SimpleLoading />;
    },
  }
);

export default function Page() {
  return (
    <div className="h-screen w-full">
      <PlateEditor />
    </div>
  );
}
