import { SimpleCompCard } from "@/components/simple-comp-card";
import { Grid } from "@/components/simple-grid";
import { simpleDocs } from "@/config/simple-docs";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center p-24 ">
      <div className="w-full h-full flex flex-col items-center mt- gap-y-12 max-w-screen-xl">
        <h1 className="text-6xl text-center font-cotham leading-tight">A collection of obscure and fancy components & microinteractions for creative developers.</h1>
        <p className="text-2xl text-center font-overusedGrotesk">Built with React, Typescript, Tailwind & Framer Motion. 100% Free & Open Source.</p>
      </div>
      <Grid>
        {simpleDocs.map((doc) => (
          <SimpleCompCard key={doc.title} title={doc.title} link={doc.url} />
        ))}
      </Grid>
    </main>
  );
}
