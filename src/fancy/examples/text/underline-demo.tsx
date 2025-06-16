import Link from "next/link"

import CenterUnderline from "@/fancy/components/text/underline-center"
import ComesInGoesOutUnderline from "@/fancy/components/text/underline-comes-in-goes-out"
import GoesOutComesInUnderline from "@/fancy/components/text/underline-goes-out-comes-in"

export default function UnderlineDemo() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-white">
      <div className="flex flex-row font-overused-grotesk items-start text-primary-blue h-full py-36 uppercase space-x-8 text-sm sm:text-lg md:text-xl lg:text-2xl">
        <div>Contact</div>
        <ul className="flex flex-col space-y-1 h-full">
          <Link className="" href="#">
            <CenterUnderline>LINKEDIN</CenterUnderline>
          </Link>
          <Link className="" href="#">
            <ComesInGoesOutUnderline direction="right">
              INSTAGRAM
            </ComesInGoesOutUnderline>
          </Link>
          <Link className="" href="#">
            <ComesInGoesOutUnderline direction="left">
              X (TWITTER)
            </ComesInGoesOutUnderline>
          </Link>

          <div className="pt-12">
            <ul className="flex flex-col space-y-1 h-full">
              <Link className="" href="#">
                <GoesOutComesInUnderline direction="left">
                  FANCY@FANCY.DEV
                </GoesOutComesInUnderline>
              </Link>
              <Link className="" href="#">
                <GoesOutComesInUnderline direction="right">
                  HELLO@FANCY.DEV
                </GoesOutComesInUnderline>
              </Link>
            </ul>
          </div>
        </ul>
      </div>
    </div>
  )
}
