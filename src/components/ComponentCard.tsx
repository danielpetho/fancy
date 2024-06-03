import Link from "next/link";
import { Card, CardContent, CardHeader } from "./ui/card";
import { CodeXml } from "lucide-react";

export function ComponentCard({
  title,
  href,
  children,
}: Readonly<{
  title: string;
  href: string;
  children: React.ReactNode;
}>) {
  return (
    <Card className="bg-white rounded-lg shadow-md p-4 overflow-hidden justify-center items-center cursor-pointer">
      <Link href={href} />
      <CardHeader className="text-lg w-full justify-end items-start font-semibold p-4">
        <div className="w-12 h-12 bg-muted-foreground rounded-lg p-1 fill-foreground">
          <CodeXml />
        </div>
      </CardHeader>
      <CardContent className="justify-center items-center">
        {children}
      </CardContent>
    </Card>
  );
}
