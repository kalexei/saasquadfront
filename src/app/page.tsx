import VideoInputField from "@/components/VideoInput";

export default function Home() {
  return (
    <main className={"flex min-h-screen flex-col items-center p-24"}>
      <h1 className={"text-4xl mb-10"}>AI Short Clipper by SaasQuad</h1>
      <VideoInputField />
    </main>
  );
}
