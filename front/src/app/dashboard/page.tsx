import { GetUniqueEntrie, GetListEntries, Header, Footer } from "@/components";
import { Suspense } from "react";

export default function Dashboard() {
  return (
    <div className=" h-screen w-screen">
      <Header />
      <div className="flex  items-center justify-around p-6">
        <Suspense>
          <GetUniqueEntrie />
          <GetListEntries />
        </Suspense>
      </div>
      <Footer />
    </div>
  );
}
