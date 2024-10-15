import Link from "next/link";
import { CenterUnderline } from "@/fancy/components/text/underline-center";
import { ComesInGoesOutUnderline } from "@/fancy/components/text/underline-comes-in-goes-out";
import { GoesOutComesInUnderline } from "@/fancy/components/text/underline-goes-out-comes-in";

export default function UnderlineDemo() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-[#fbf8f6]">
      <div className="flex flex-row font-overusedGrotesk items-start  h-full py-36 uppercase space-x-8 text-3xl">
        <div>Contact</div>
        <ul className="flex flex-col space-y-1 h-full">
          <Link className="" href="#">
            <CenterUnderline label="LINKEDIN" />
          </Link>
          <Link className="" href="#">
            <ComesInGoesOutUnderline label="INSTAGRAM" direction="right" />
          </Link>
          <Link className="" href="#">
            <ComesInGoesOutUnderline label="X (TWITTER)" direction="left" />
          </Link>

          <div className="pt-12">
            <ul className="flex flex-col space-y-1 h-full">
              <Link className="" href="#">
                <GoesOutComesInUnderline
                  label="FANCY@FANCY.DEV"
                  direction="left"
                />
              </Link>
              <Link className="" href="#">
                <GoesOutComesInUnderline
                  label="HELLO@FANCY.DEV"
                  direction="right"
                />
              </Link>
            </ul>
          </div>
        </ul>
      </div>
    </div>
  );
}
