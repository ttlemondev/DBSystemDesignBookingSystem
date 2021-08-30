import Head from 'next/head'
import Link from 'next/link'
import { Fragment } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { BellIcon, MenuIcon, XIcon } from '@heroicons/react/outline'

export default function Booking(props) {
    return(
        <Disclosure as="nav" className="bg-gray-800">
            {({ open }) => (
                <>
                    <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
                        <div className="relative flex items-center justify-between h-16">
                            <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                                <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700  focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                                    {open ? (
                                        <XIcon className="block h-6 w-6" aria-hidden="true" />
                                    ) : (
                                        <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                                    )}
                                </Disclosure.Button>
                            </div>
                            <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
                                <div className="sm:block sm:ml-6 py-2 px-3 text-white">电影订票系统</div>
                                <div className="hidden sm:block sm:ml-6">
                                    <div className="flex space-x-4">
                                        {(props.page=="booking")?
                                            <a className="bg-gray-900 text-white px-3 py-2 rounded-md text-sm font-medium">订票大厅</a>
                                            :
                                            <Link href={"/booking/" + props.username}>
                                                <a className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">订票大厅</a>
                                            </Link>
                                        }
                                        {(props.page=="statistics")?
                                            <a className="bg-gray-900 text-white px-3 py-2 rounded-md text-sm font-medium">统计</a>
                                            :
                                            <Link href={"/statistics/" + props.username}>
                                                <a className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">统计</a>
                                            </Link>
                                        }
                                        {(props.page=="history")?
                                            <a className="bg-gray-900 text-white px-3 py-2 rounded-md text-sm font-medium">购票记录</a>
                                            :
                                            <Link href={"/history/" + props.username}>
                                                <a className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">购票记录</a>
                                            </Link>
                                        }
                                    </div>
                                </div>
                            </div>

                            <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                                <div className="hidden sm:block px-3 bg-gray-800 p-1 rounded-full text-gray-400">
                                    {props.username}
                                </div>
                                <div className="px-3 bg-gray-800 p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                                    <Link href='/'>
                                        <a>退出</a>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                    <Disclosure.Panel className="sm:hidden">
                        <div className="px-2 pt-2 pb-3 space-y-1">
                            {(props.page=="booking")?
                                <a className='bg-gray-900 text-white block px-3 py-2 rounded-md text-base font-medium'>订票大厅</a>
                                :
                                <Link href={"/booking/" + props.username}>
                                    <a className='text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium'>订票大厅</a>
                                </Link>
                            }
                            {(props.page=="statistics")?
                                <a className='bg-gray-900 text-white block px-3 py-2 rounded-md text-base font-medium'>统计</a>
                                :
                                <Link href={"/statistics/" + props.username}>
                                    <a className='text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium'>统计</a>
                                </Link>
                            }
                            {(props.page=="history")?
                                <a className='bg-gray-900 text-white block px-3 py-2 rounded-md text-base font-medium'>购票记录</a>
                                :
                                <Link href={"/history/" + props.username}>
                                    <a className='text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium'>购票记录</a>
                                </Link>
                            }
                        </div>
                    </Disclosure.Panel>
                </>
            )}
        </Disclosure>
    )
}