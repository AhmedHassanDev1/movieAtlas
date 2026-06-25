
import {Link} from "@mui/material"
import Image from "next/image"
function Logo() {
  return (
    <Link href={"/en"}>
      <Image src="/Movie_Logo.png" width={130} height={50} alt="app logo" />
    </Link>
  )
}

export default Logo
