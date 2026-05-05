
import { auth, currentUser } from '@clerk/nextjs/server';
import Link from 'next/link'

import React from 'react'
const navItems = [
    {label: 'Home', href: '/'},
    {label: 'Jobs', href: '/jobs'},
    {label: 'News', href: '/news'},
]

const NavItems = async () =>{
    const {userId} = await auth();
    const user = await currentUser();
    return (
        <nav className='flex items-center gap-5'>
            {navItems.map(({label, href}) =>(
                <Link href={href} key={label}>
                    {label}
                </Link>
            ))}
            {user?.publicMetadata.role === 'admin' ?
            <div>
                <Link href='/admin'>Admin</Link>
            </div> : ""
            }
        </nav>
    )
}

export default NavItems