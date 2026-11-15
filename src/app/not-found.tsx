import Link from "next/link";
import { Wordmark } from "@/components/brand/wordmark";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <main id="main" className="flex flex-1 flex-col items-center justify-center gap-8 px-5 py-24 text-center">
      <Wordmark />
      <div className="flex flex-col gap-3">
        <p className="eyebrow">404</p>
        <h1 className="text-headline font-semibold text-bone">This page doesn’t exist.</h1>
        <p className="text-mist">It may have moved, or the link may be incorrect.</p>
      </div>
      <Button asChild>
        <Link href="/">Back to home</Link>
      </Button>
    </main>
  );
}
