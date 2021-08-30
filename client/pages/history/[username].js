import Head from 'next/head'
import {useRouter} from "next/router"
import Link from 'next/link'
import Navbar from '../../templates/navbar'
import Config from "../../config";
import {handleCancelOrder} from "../../lib/history";

export default function Username(props) {
    let orderlist = []
    for(let i in props.orderlist) orderlist.push(props.orderlist[i])
    return(
        <>
            <Head>
                <title>购票记录</title>
                <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=0, minimum-scale=1.0, maximum-scale=1.0"/>
            </Head>
            <Navbar page="history" username={props.username}></Navbar>
            <div className="m-5 space-y-4">
                <div className="flex flex-col">
                    <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
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
                                        <th scope="rol" className="px-6 py-3">
                                            <span className="sr-only">退票</span>
                                        </th>
                                    </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {orderlist.map((order) => {return(
                                            <>
                                                <tr key={order.id}>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="flex items-center">
                                                            <div>
                                                                <div className="text-sm font-medium text-gray-900">
                                                                    {order.name}
                                                                </div>
                                                                <div className="text-sm text-gray-500">
                                                                    {order.director}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="text-sm text-gray-900">{order.theater}</div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="text-sm text-gray-900">{order.time}</div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="text-sm text-gray-900">{order.price}</div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                        <a className="text-indigo-600 hover:text-indigo-900" onClick={(e) => {handleCancelOrder(props.username, order.id)}}>退票</a>
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

        let url = 'http://' + Config.server + '/getorderlist'
        let req = await fetch(url, {
            mode: 'no-cors',
            method: 'POST',
            body: JSON.stringify({
                username: username
            }),
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        })
        let result = await req.json()
        console.log(result)
        return {
            props: {
                username: username,
                orderlist: result
            },
        }
    }
}