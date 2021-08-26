import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'

export default function Home() {
    const Router = useRouter()
    const handleLoginClick = (e) => {
        let input = document.getElementById("username")
        let username = input.value
        if(username == "") {
            alert("请输入用户名")
        } else {
            Router.push('/booking?username=' + username)
        }
    }
    return(
        <div class="min-h-screen flex items-center justify-center bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
            <Head>
                <title>电影订票系统</title>
            </Head>
            <div class="max-w-md w-full space-y-8 border p-5 bg-blue-100 rounded-lg">
                <div>
                    <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
                        电影订票系统
                    </h2>
                </div>
                <div class="mt-8 space-y-6" method="GET">
                    <div class="rounded-md shadow-sm space-y-px">
                        <div>
                            <input id="username" name="username" type="text" required class="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="用户名" />
                        </div>
                    </div>
                    <div>
                        <button type="submit" onClick={(e) => handleLoginClick(e)} class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white  bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                            登录
                        </button>
                        <p className="mt-2 text-right text-sm text-gray-600">
                            <Link href="/booking?username=admin">
                                <a className="font-medium text-indigo-600 hover:text-indigo-500">
                                    管理员入口
                                </a>
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}