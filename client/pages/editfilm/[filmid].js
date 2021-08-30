import Head from 'next/head'
import {withRouter} from "next/router"
import Link from 'next/link'
import Navbar from '../../templates/navbar'
import Config from '../../config'
import React from 'react'



class Editfilm extends React.Component {


    async handleCreateFilm(e) {
        let
            filmname = document.getElementById("filmname").value,
            director = document.getElementById("director").value,
            theater = document.getElementById("theater").value,
            time = document.getElementById("time").value,
            ticket = document.getElementById("ticket").value,
            price = document.getElementById("price").value;
        console.log(filmname, director, theater, time, ticket, price);
        if(filmname == '' || director == '' || theater == '' || ticket == '' || time == '' || price == '') {
            alert("请填写电影信息");
        } else {
            if(this.props.filmid == '-1') {
                let url = 'http://' + Config.server + '/addfilm'
                console.log(url)
                let result = await fetch(url, {
                    mode: 'no-cors',
                    method: 'POST',
                    body: JSON.stringify({
                        name: filmname,
                        director: director,
                        time: time,
                        theater: theater,
                        ticket: ticket,
                        price: price
                    }),
                    headers: new Headers({
                        'Content-Type': 'application/json'
                    })
                });
                //console.log(result)
            } else {
                let url = 'http://' + Config.server + '/updatefilm'
                console.log(url)
                let result = await fetch(url, {
                    mode: 'no-cors',
                    method: 'POST',
                    body: JSON.stringify({
                        name: filmname,
                        director: director,
                        time: time,
                        theater: theater,
                        ticket: ticket,
                        filmid: this.props.filmid,
                        price: price
                    }),
                    headers: new Headers({
                        'Content-Type': 'application/json'
                    })
                });
            }


            this.props.router.push({
                pathname: '/booking/admin'
            });
        }
    };

    async handleDeleteFilm(e) {
        console.log("here")
        let filmid = this.props.filmid;
        let url = 'http://' + Config.server + '/deletefilm';
        console.log(filmid)
        let result = await fetch(url, {
            mode: 'no-cors',
            method: 'POST',
            body: JSON.stringify({
                filmid: filmid
            }),
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        });

        this.props.router.push({
            pathname: '/booking/admin'
        });
    }

    render() {
        console.log(this.props.film)
        return(
            <>
                <Navbar page="editfilm" username="admin"></Navbar>
                <div className="bg-gray-100 max-w-7xl mx-auto mt-6 py-6 sm:px-6 lg:px-8 border rounded-lg">
                    <div className="mt-0">
                        <div className="md:grid md:grid-cols-3 md:gap-6">
                            <div className="md:col-span-1">
                                <div className="px-4 sm:px-0">
                                    {(this.props.filmid == '-1')?
                                        <>
                                            <h3 className="text-lg font-medium leading-6 text-gray-900">创建新电影</h3>
                                            <p className="mt-1 text-sm text-gray-600">向数据库添加一个新的电影</p>
                                        </>
                                        :
                                        <>
                                            <h3 className="text-lg font-medium leading-6 text-gray-900">编辑电影信息</h3>
                                            <p className="mt-1 text-sm text-gray-600">修改现有电影的信息，将会取消所有已订票</p>
                                        </>
                                    }

                                </div>
                            </div>
                            <div className="mt-5 md:mt-0 md:col-span-2">
                                <form>
                                    <div className="shadow overflow-hidden sm:rounded-md">
                                        <div className="px-4 py-5 bg-white sm:p-6">
                                            <div className="grid grid-cols-6 gap-6">
                                                <div className="col-span-6 sm:col-span-3">
                                                    <label htmlFor="filmname"
                                                           className="block text-sm font-medium text-gray-700">电影名称</label>
                                                    <input type="text" name="filmname" id="filmname"
                                                           className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" defaultValue={(this.props.filmid == '-1')?'':this.props.film.name}></input>
                                                </div>
                                                <div className="col-span-6 sm:col-span-3">
                                                    <label htmlFor="director"
                                                           className="block text-sm font-medium text-gray-700">导演</label>
                                                    <input type="text" name="director" id="director"
                                                           className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" defaultValue={(this.props.filmid == '-1')?'':this.props.film.director}></input>
                                                </div>
                                                <div className="col-span-3 sm:col-span-2">
                                                    <label htmlFor="theater"
                                                           className="block text-sm font-medium text-gray-700">放映厅</label>
                                                    <select id="theater" name="theater"
                                                            className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" defaultValue={(this.props.filmid == '-1')?'':this.props.film.theater}>
                                                        <option>1号厅</option>
                                                        <option>2号厅</option>
                                                        <option>3号厅</option>
                                                    </select>
                                                </div>
                                                <div className="col-span-6 sm:col-span-3">
                                                    <label htmlFor="time"
                                                           className="block text-sm font-medium text-gray-700">时间</label>
                                                    <input type="text" name="time" id="time"
                                                           className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" defaultValue={(this.props.filmid == '-1')?'':this.props.film.time}></input>
                                                </div>
                                                <div className="col-span-3 sm:col-span-2">
                                                    <label htmlFor="ticket"
                                                           className="block text-sm font-medium text-gray-700">票数</label>
                                                    <input type="number" name="ticket" id="ticket"
                                                           className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" defaultValue={(this.props.filmid == '-1')?'99':this.props.film.ticketSum}></input>
                                                </div>
                                                <div className="col-span-3 sm:col-span-2">
                                                    <label htmlFor="price"
                                                           className="block text-sm font-medium text-gray-700">价格（元）</label>
                                                    <input type="number" name="price" id="price"
                                                           className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" defaultValue={(this.props.filmid == '-1')?'':this.props.film.price}></input>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                                <div className="mt-6 mx-4 flex flex-row-reverse">
                                    <div className="ml-4 text-white bg-indigo-500 hover:bg-indigo-700 hover:text-white px-3 py-2 rounded-md text-lg font-medium" onClick={async (e) => await this.handleCreateFilm(e)}>{(this.props.filmid == '-1')?'创建':'修改'}</div>
                                    {(this.props.filmid == '-1')?undefined:
                                        <div className="text-white bg-red-500 hover:bg-red-700 hover:text-white px-3 py-2 rounded-md text-lg font-medium" onClick={async (e) => await this.handleDeleteFilm(e)}>删除</div>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

export default withRouter(Editfilm)

export async function getServerSideProps(context) {
    let filmid = context.query.filmid
    console.log(filmid)
    console.log(typeof filmid)
    console.log(JSON.stringify({
        filmid: filmid
    }))
    if(filmid == undefined) {
        return {
            props: {},
            redirect: {
                destination: '/booking/',
                permanent: false
            },
        }
    } else {
        if(filmid != '-1') {
            let url = 'http://' + Config.server + '/getfilmlist'
            let req = await fetch(url, {
                mode: 'no-cors',
                method: 'POST',
                body: JSON.stringify({
                    filmid: filmid
                }),
                headers: new Headers({
                    'Content-Type': 'application/json'
                })
            })
            let result = await req.json()
            //console.log(result)
            return {
                props: {
                    filmid: filmid,
                    film: result[0]
                },
            }
        }
        return {
            props: {
                filmid: '-1'
            },
        }
    }
}