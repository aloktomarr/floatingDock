"use client"

import { IconBrandGithub, IconBrandX, IconExchange, IconHome, IconNewSection, IconTerminal2 } from "@tabler/icons-react";
import Image from "next/image";
import React, { useRef, useState } from "react";
import {AnimatePresence, motion, MotionValue, useMotionValue, useSpring, useTransform} from 'motion/react';
import Link from "next/link";
type Link = {
    title : string;
    icon:React.ReactNode |any;
    href:string;
}
export const FloatingDock = () => {
    const links :Link[]= [{
        title: 'Home',
        icon: <IconHome className="h-full w-full text-netural-500" />,
        href: '/'
    },
    {
        title: "Products",
        icon: <IconTerminal2 className="h-full w-full text-netural-500" />,
        href: '/products',
    },
    {
        title: "Components",
        icon: <IconNewSection className="h-full w-full text-netural-500" />,
        href: '/components',
    },
    // {
    //     title: "Alok UI",
    //     icon: <Image
    //         src=""
    //         height={20}
    //         width={20}
    //         alt="Alok UI"
    //     />,
    //     href: '/components',
    // },
    {

        title: "Changelog",
        icon: <IconExchange className="h-full w-full text-netural-500" />,
        href: '/changelog',

    }, {
        title: "Twitter",
        icon: <IconBrandX className="h-full w-full text-netural-500" />,
        href: '#',
    },
    {
        title: "Github",
        icon: <IconBrandGithub className="h-full w-full text-netural-500" />,
        href: '#',
    }

    ];
    const mouseX =useMotionValue(Infinity);
    return (

        <motion.div 
        onMouseMove={(e)=>mouseX.set(e.pageX)}
        onMouseLeave={(e)=>mouseX.set(Infinity)}
        className="fixed bottom--9 rounded-2xl gap-8 inset-x-0 mx-auto flex items-center bg-neutral-100 w-fit px-4 justify-center h-16">
            {links.map((el, idx) => (
                <IconContainer mouseX = {mouseX}key={el.title} el={el}/>
            ))}
        </motion.div>
    );
}

export const IconContainer=({el, mouseX}:{el:Link;mouseX:MotionValue<number>})=>{
    const ref = useRef<HTMLDivElement>(null);
    const distance = useTransform(mouseX,(val)=>{
        let bounds = ref?.current?.getBoundingClientRect()??{x:0,width:0};

        return val - bounds.x - bounds.width / 2;
    });
    let widthTransform = useTransform(distance,[-150,0,150],[40,80,40]);
    let heightTransform = useTransform(distance,[-150,0,150],[40,80,40]);
    let widthIconTransform = useTransform(distance,[-150,0,150],[20,40,20]);
    let heightIconTransform = useTransform(distance,[-150,0,150],[20,40,20]);

    const width = useSpring(widthTransform,{
        mass:0.1,
        stiffness:150,
        damping:12,
    })
    const height = useSpring(heightTransform,{
        mass:0.1,
        stiffness:150,
        damping:12,
    })
    const widthIcon = useSpring(widthIconTransform,{
        mass:0.1,
        stiffness:150,
        damping:12,
    })
    const heightIcon = useSpring(heightIconTransform,{
        mass:0.1,
        stiffness:150,
        damping:12,
    })

    const [hovered, setHovered ] = useState(false);

    return (
        <Link href={el.href}
        onMouseEnter={()=>setHovered(true)}
        onMouseLeave={()=> setHovered(false)}>
            <motion.div
            ref={ref}
            style={{
                width,
                height
            }}
            key = {el.title}
            className="flex relative items-center bg-neutral-200 justify-center rounded-full"
            ><AnimatePresence>
                {hovered && <motion.div 
                
                initial={{
                    opacity:0,
                    y:10,
                    x:'-10%'
                }}
                animate={{
                    opacity:1,
                    y:0,
                    x:'-10%'
                }}
                exit={{
                    opacity:0,
                    y:2,
                    x:'-10%'
                }}
                transition={{
                    duration:0.2
                }}
                className="absolute text-xs left-1/2 -translate-x-1/2 -top-8 px-2 py-0.5 w-fit whitespace-pre bg-neutral-100 rounded-md text-neutral-500">{el.title}
                </motion.div>
                }
                </AnimatePresence>
                <motion.div
                style={{
                    width:widthIcon,
                    height:heightIconTransform
                }} 
                className="flex items-center justify-center ">

            {el.icon}
            </motion.div>
            </motion.div>
        </Link>
    )
}
