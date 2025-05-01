import CardTest from "@/components/card/CardTest";

export default function Home() {
  return (
    <div className="min-h-screen flex justify-center items-center space-x-2">
      <CardTest title="Test 1" detail="Layout & Style" href="/layoutStyle" />
      <CardTest title="Test 2" detail="Connect API" href="/layoutStyle" styles="cursor-not-allowed" />
      <CardTest title="Test 3" detail="Form & Table" href="/layoutStyle" />
    </div>
  );
}
