import Head from 'next/head'
import {useRouter} from "next/router"
import Link from 'next/link'
import Navbar from '../../templates/navbar'
import Config from "../../config";
import {handleOrderFilm} from "../../lib/booking";

export default function Username(props) {
    let filmlist = []
    for(let i in props.filmlist) filmlist.push(props.filmlist[i])
    //console.log(typeof filmlist)
    //console.log(filmlist)
    return(
        <>
            <Head>
                <title>电影订票大厅</title>
                <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=0, minimum-scale=1.0, maximum-scale=1.0"/>
            </Head>
            <Navbar page="booking" username={props.username}></Navbar>
            <div className="m-5 space-y-4">
                {(props.username == 'admin') ? (
                    <div className="flex flex-row">
                        <Link href='/editfilm/-1'>
                            <a className="text-white bg-indigo-500 hover:bg-indigo-700 hover:text-white px-3 py-2 rounded-md text-lg font-medium">创建电影</a>
                        </Link>
                    </div>
                ) : (
                    undefined
                )}
                <div className="flex flex-col">
                    <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-100">
                                    <tr>
                                        <th scope="col"
                                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            电影
                                        </th>
                                        <th scope="col"
                                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            放映厅
                                        </th>
                                        <th scope="col"
                                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            时间
                                        </th>
                                        <th scope="col"
                                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            价格
                                        </th>
                                        <th scope="col"
                                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            余票
                                        </th>
                                        {(props.username == 'admin')?
                                            <th scope="rol" className="px-6 py-3">
                                                <span className="sr-only">编辑</span>
                                            </th>
                                            : undefined}
                                        <th scope="rol" className="px-6 py-3">
                                            <span className="sr-only">操作</span>
                                        </th>
                                    </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">

                                        {filmlist.map((film, index) => {return(
                                            <>
                                                <tr key={film.id} className={(index % 2)?'bg-gray-50':''}>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="flex items-center">
                                                            <div>
                                                                <div className="text-sm font-medium text-gray-900">
                                                                    {film.name}
                                                                </div>
                                                                <div className="text-sm text-gray-500">
                                                                    {film.director}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="text-sm text-gray-900">{film.theater}</div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="text-sm text-gray-900">{film.time}</div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="text-sm text-gray-900">{film.price} 元</div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <span className={(film.ticketRemain > 0)? "px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800" : "px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800" }>{film.ticketRemain}/{film.ticketSum}</span>
                                                    </td>
                                                    {(props.username == 'admin')?
                                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                            <Link href={"/editfilm/" + film.id}>
                                                                <a className="text-red-600 hover:text-red-900">编辑</a>
                                                            </Link>
                                                        </td>
                                                        :undefined}
                                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                        <a className={(film.ticketRemain > 0)? "text-indigo-600 hover:text-indigo-900" : "text-gray-400" } onClick={(e) => {if(film.ticketRemain >= 0) {handleOrderFilm(props.username, film.id)} else {return}}}>预订</a>
                                                    </td>
                                                </tr>
                                            </>
                                        )})}

                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>

    )
}

export async function getServerSideProps(context) {
    let username = context.query.username
    //console.log(context)
    if(username == undefined) {
        return {
            props: {},
            redirect: {
                destination: '/',
                permanent: false
            },
        }
    } else {
        let uurl = 'http://' + Config.server + '/inituser'
        let ureq = await fetch(uurl, {
            mode: 'no-cors',
            method: 'POST',
            body: JSON.stringify({
                username: username
            }),
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        })

        let url = 'http://' + Config.server + '/getfilmlist'
        let req = await fetch(url, {
            mode: 'no-cors',
            method: 'POST',
            body: JSON.stringify({

            }),
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        })
        let result = await req.json()
        //console.log(result)
        return {
            props: {
                username: username,
                filmlist: result
            },
        }
    }
}