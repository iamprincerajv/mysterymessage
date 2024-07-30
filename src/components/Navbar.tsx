"use client"

import { User } from "next-auth";
import { signOut, useSession } from "next-auth/react"
import { Button } from "./ui/button";
import Link from "next/link";

const Navbar = () => {

    const { data: session } = useSession();
    const user: User = session?.user as User;

  return (
    <nav className="p-2 sm:p-4 md:p-6 shadow-md">
        <div className="container mx-auto flex flex-row justify-between items-center">
            <a className="text-xl font-bold" href="#">MysteryMsg</a>
            {
                session ? (
                    <>
                    <span className="md:mr-4 hidden md:block">Welcome, {user.username || user.email}</span>
                    <Button onClick={() => signOut()}>Log Out</Button>
                    </>
                ) : (
                    <Link href="/sign-in">
                        <Button className="w-full md:w-auto">Sign in</Button>
                    </Link>
                )
            }
        </div>
    </nav>
  )
}

export default Navbar
