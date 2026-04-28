import Image from "next/image"
import Link from "next/link"
import { Show, SignInButton, SignOutButton, SignUpButton, UserButton, } from "@clerk/nextjs"
import NavItems from "./NavItems"

const Navbar = () => {
  return (
    <nav className="navbar">
        <Link href='/'>
            <div className="flex items-center gap-2.5 cursor-pointer">
                <Image src='/images/logo.svg' alt="logo" width={126} height={80} />
            </div>
        </Link>

        <div className="flex items-center gap-8">
            <NavItems />
             <Show when="signed-out">
              <SignInButton />
            </Show>
            <Show when="signed-in">
              <UserButton />
            </Show>
        </div>
    </nav>
  )
}

export default Navbar