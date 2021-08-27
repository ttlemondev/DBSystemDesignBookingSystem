import Head from 'next/head'
import Link from 'next/link'

export default function Booking(props) {
    return(
        <nav className="bg-gray-800">
            <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
                <div className="relative flex items-center justify-between h-16">
                    <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                        <button type="button" className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700  focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">

                        </button>
                    </div>
                    <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
                        <div className="sm:block sm:ml-6 py-2 px-3 text-white">电影订票系统</div>
                        <div className="hidden sm:block sm:ml-6">
                            <div className="flex space-x-4">
                                <a className={(props.page=="booking") ? "bg-gray-900 text-white px-3 py-2 rounded-md text-sm font-medium" : "text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"}>订票大厅</a>
                                <a className={(props.page=="statistics") ? "bg-gray-900 text-white px-3 py-2 rounded-md text-sm font-medium" : "text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"}>统计</a>
                                <a className={(props.page=="history") ? "bg-gray-900 text-white px-3 py-2 rounded-md text-sm font-medium" : "text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"}>历史记录</a>
                            </div>
                        </div>
                    </div>

                    <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                        <div className="px-3 bg-gray-800 p-1 rounded-full text-gray-400">
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
        </nav>
    )
}