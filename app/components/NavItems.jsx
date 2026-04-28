'use client';
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'
const navItems = [
    {label: 'Home', href: '/'},
    {label: 'Jobs', href: '/jobs'},
    {label: 'News', href: '/news'},
]

const NavItems = () =>{
    const pathname = usePathname
    return (
        <nav className='flex items-center gap-5'>
            {navItems.map(({label, href}) =>(
                <Link href={href} key={label}>
                    {label}
                </Link>
            ))}
        </nav>
    )
}

export default NavItems