import Image from "next/image";
import Link from "next/link";
import {
  Show,
  SignInButton,
  SignOutButton,
  SignUpButton,
  UserButton,
} from "@clerk/nextjs";
import NavItems from "./NavItems";

const Navbar = () => {
  return (
    <nav className="navbar bg-surface border-b border-outline/70 shadow-[0_22px_70px_rgba(37,99,235,0.08)] px-6 py-4 sticky top-0 z-40">
      <Link href="/">
        <div className="flex items-center gap-2.5 cursor-pointer">
          <Image src="/images/logo.svg" alt="logo" width={126} height={80} />
        </div>
      </Link>

      <div className="flex items-center gap-8">
        <NavItems />
      </div>
      <div className="flex items-center gap-3">
        <Show when="signed-out">
          <div>
            <SignInButton className="btn-secondary" />
          </div>
        </Show>
        <Show when="signed-in">
          <UserButton />
        </Show>
      </div>
    </nav>
  );
};

export default Navbar;
