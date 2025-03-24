import { IconBrandGithub, IconBrandX, IconExchange, IconHome, IconNewSection, IconTerminal2 } from "@tabler/icons-react";
import Image from "next/image";
import React from "react";

export const FloatingDock = () => {
    const links = [{
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
    {
        title: "Alok UI",
        icon: <Image
            src=""
            height={20}
            width={20}
            alt="Alok UI"
        />,
        href: '/components',
    },
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
    return (

        <div className="flex bottom-0 inset-x-0 mx-auto">
            {links.map((el, idx) => (
                <div key={el.title} className="flex-items-center justify-center h-16 bg-black rounded-md">
                    {el.icon}
                </div>
            ))}
        </div>
    );
}

